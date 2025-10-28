import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth-service';
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

    const {
      email,
      password,
      name,
      companyName,
      numPrinters,
      country,
      industry,
    } = await request.json();

    console.log('📝 Signup request for:', email);

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Create user
    console.log('🔐 Creating new user:', email);
    const result = await createUser(email, password, name, 'admin', {
      companyName,
      numPrinters,
      country,
      industry,
    });

    if (!result.success) {
      console.log('❌ User creation failed:', result.error);
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create user' },
        { status: 400 }
      );
    }

    console.log('✅ User created successfully:', email);
    // Return user data
    return NextResponse.json(
      { success: true, user: result.user },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Signup API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: `Signup failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
