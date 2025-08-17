import { NextRequest, NextResponse } from 'next/server';
import { eas } from '@/lib/eas';
import { SESSION_SCHEMA } from '@/lib/session-schema';
import { cdpDataService, AttestationPayload } from '@/lib/cdp-data-service';

// Import ethers for hashing
const { ethers } = require('ethers');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionCompleted,
      sessionDate,
      therapistInfo,
      patientInfo,
      sessionDuration,
      sessionType
    } = body;

    // Validate required fields
    if (!sessionCompleted || !sessionDate || !therapistInfo || !patientInfo || !sessionDuration || !sessionType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash sensitive information for anonymity
    const therapistID = SESSION_SCHEMA.hashTherapistInfo(therapistInfo);
    const patientHash = SESSION_SCHEMA.hashPatientInfo(patientInfo);

    // Encode the session data
    const encodedData = SESSION_SCHEMA.encodeSessionData({
      sessionCompleted,
      sessionDate,
      therapistID,
      patientHash,
      sessionDuration,
      sessionType,
      timestamp: Math.floor(Date.now() / 1000),
      notes: `Session completed on ${sessionDate}`,
      sessionHash: ethers.keccak256(ethers.toUtf8Bytes(`${sessionDate}-${therapistID}-${patientHash}`))
    });

    // Check if EAS is available
    if (!eas) {
      return NextResponse.json(
        { error: 'EAS service not available' },
        { status: 503 }
      );
    }

    // Create the attestation
    const tx = await eas.attest({
      schema: process.env.EAS_SCHEMA_UID!,
      data: {
        recipient: '0x0000000000000000000000000000000000000000', // Anonymous recipient
        expirationTime: 0, // No expiration
        revocable: true,
        data: encodedData,
      },
    });

    // Wait for transaction confirmation
    const attestationUID = await tx.wait();
    
    console.log('Issued attestation UID:', attestationUID);

    // Store attestation data in CDP
    const attestationPayload: AttestationPayload = {
      attestationUid: attestationUID,
      sessionCompleted,
      sessionDate,
      therapistId: therapistID,
      patientHash: patientHash,
      sessionDuration,
      sessionType,
      createdAt: new Date().toISOString(),
      network: process.env.NEXT_PUBLIC_NETWORK || 'sepolia',
      schemaUid: process.env.EAS_SCHEMA_UID || ''
    };

    // Store in CDP (this will run in parallel with EAS attestation)
    const cdpResult = await cdpDataService.storeAttestation(attestationPayload);
    
    console.log('CDP storage result:', cdpResult);

    return NextResponse.json({
      success: true,
      attestationUID,
      cdpStorage: cdpResult.success,
      message: 'Session attestation created successfully and stored in CDP'
    });

  } catch (error) {
    console.error('Error creating attestation:', error);
    return NextResponse.json(
      { error: 'Failed to create attestation' },
      { status: 500 }
    );
  }
}
