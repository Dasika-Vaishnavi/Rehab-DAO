import { NextRequest, NextResponse } from 'next/server';
import { cdpDataService } from '@/lib/cdp-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const attestationUid = searchParams.get('uid');
    const therapistId = searchParams.get('therapistId');
    const patientHash = searchParams.get('patientHash');
    const sessionDate = searchParams.get('sessionDate');

    // If specific UID is provided, get that attestation
    if (attestationUid) {
      const result = await cdpDataService.getAttestationByUid(attestationUid);
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          attestation: result.data,
          message: result.message
        });
      } else {
        return NextResponse.json(
          { error: result.error },
          { status: 404 }
        );
      }
    }

    // Otherwise, get all attestations with optional filters
    const filters: any = {};
    
    if (therapistId) {
      filters.filter = { ...filters.filter, therapistId };
    }
    
    if (patientHash) {
      filters.filter = { ...filters.filter, patientHash };
    }
    
    if (sessionDate) {
      filters.filter = { ...filters.filter, sessionDate };
    }

    const result = await cdpDataService.getAttestations(filters);

    if (result.success) {
      return NextResponse.json({
        success: true,
        attestations: result.data,
        count: result.data?.length || 0,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error fetching attestations from CDP:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attestations from CDP' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attestationUid, updates } = body;

    if (!attestationUid) {
      return NextResponse.json(
        { error: 'Attestation UID is required' },
        { status: 400 }
      );
    }

    const result = await cdpDataService.updateAttestation(attestationUid, updates);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error updating attestation in CDP:', error);
    return NextResponse.json(
      { error: 'Failed to update attestation in CDP' },
      { status: 500 }
    );
  }
}
