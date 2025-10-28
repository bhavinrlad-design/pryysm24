import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { 
        status: 'ok',
        message: 'Diagnostics endpoint working'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Diagnostics failed' },
      { status: 500 }
    );
  }
}
