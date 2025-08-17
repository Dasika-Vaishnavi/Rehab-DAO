import { NextRequest, NextResponse } from 'next/server';
import { eas } from '@/lib/eas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const attestationUID = searchParams.get('uid');

    if (!attestationUID) {
      return NextResponse.json(
        { error: 'Attestation UID is required' },
        { status: 400 }
      );
    }

    // Check if EAS is available
    if (!eas) {
      return NextResponse.json(
        { error: 'EAS service not available' },
        { status: 503 }
      );
    }

    // Fetch the attestation
    const attestation = await eas.getAttestation(attestationUID);

    if (!attestation) {
      return NextResponse.json(
        { error: 'Attestation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      attestation: {
        uid: attestation.uid,
        schema: attestation.schema,
        attester: attestation.attester,
        recipient: attestation.recipient,
        expirationTime: attestation.expirationTime,
        revocable: attestation.revocable,
        data: attestation.data,
        time: attestation.time,
        revocationTime: attestation.revocationTime,
        refUID: attestation.refUID,
        isOffchain: attestation.isOffchain
      }
    });

  } catch (error) {
    console.error('Error fetching attestation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attestation' },
      { status: 500 }
    );
  }
}
