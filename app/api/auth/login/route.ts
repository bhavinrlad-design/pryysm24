import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-service';
import { ensurePrismaConnected } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection is available
    try {
      await ensurePrismaConnected();
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      );
    }

    const { email, password } = await request.json();
    console.log('🔐 Login request for:', email);

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    console.log('🔍 Authenticating user:', email);
    const result = await authenticateUser(email, password);
    console.log('✅ Auth result:', { success: result.success, hasUser: !!result.user, error: result.error });

    if (!result.success) {
      console.log('❌ Authentication failed:', result.error);
      return NextResponse.json(
        { success: false, error: result.error || 'Authentication failed' },
        { status: 401 }
      );
    }

    // Return user data
    return NextResponse.json(
      { 
        success: true, 
        user: {
          ...result.user,
          role: (result.user?.role === 'master' ? 'master' : 'admin') as 'admin' | 'master'
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Login API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: `Login failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
