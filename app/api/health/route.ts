import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      status: 'healthy',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT || '8080',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✓ SET' : '✗ MISSING',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✓ SET' : '✗ MISSING',
        DATABASE_URL: process.env.DATABASE_URL ? '✓ SET' : '✗ MISSING',
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
