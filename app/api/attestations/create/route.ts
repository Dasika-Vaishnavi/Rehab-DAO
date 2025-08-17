import { NextRequest, NextResponse } from 'next/server';
import { eas } from '@/lib/eas';
import { SESSION_SCHEMA } from '@/lib/session-schema';

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
      sessionType
    });

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

    return NextResponse.json({
      success: true,
      attestationUID,
      message: 'Session attestation created successfully'
    });

  } catch (error) {
    console.error('Error creating attestation:', error);
    return NextResponse.json(
      { error: 'Failed to create attestation' },
      { status: 500 }
    );
  }
}
