import { NextRequest, NextResponse } from 'next/server';
import { cdpService } from '@/lib/cdp-service';

export async function GET(request: NextRequest) {
  try {
    // Check if CDP service is available
    if (!cdpService.isAvailable()) {
      return NextResponse.json(
        { error: 'CDP SDK not available' },
        { status: 400 }
      );
    }

    // Get market data as an example
    const marketData = await cdpService.getMarketData();
    
    const response = {
      message: 'CDP SDK initialized successfully',
      apiKeyName: '7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0',
      status: 'configured',
      marketData
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('CDP API Error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize CDP SDK' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!cdpService.isAvailable()) {
      return NextResponse.json(
        { error: 'CDP SDK not available' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Example: Create a new CDP position
    if (body.action === 'createPosition') {
      const position = await cdpService.createPosition(body.positionData);
      return NextResponse.json({
        message: 'CDP position created successfully',
        position,
        status: 'success'
      });
    }

    // Example: Get user positions
    if (body.action === 'getPositions' && body.userId) {
      const positions = await cdpService.getUserPositions(body.userId);
      return NextResponse.json({
        message: 'User positions retrieved successfully',
        positions,
        status: 'success'
      });
    }

    return NextResponse.json({
      message: 'CDP operation received',
      data: body,
      status: 'success'
    });
  } catch (error) {
    console.error('CDP POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to process CDP operation' },
      { status: 500 }
    );
  }
}
