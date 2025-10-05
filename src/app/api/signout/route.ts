import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out user:', error);
      return NextResponse.json(
        { error: 'Failed to sign out user' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      { message: 'Successfully signed out' },
      { status: 200 }
    );

    // Clear Supabase auth cookies
    response.cookies.delete('sb-access-token');
    response.cookies.delete('sb-refresh-token');
    
    // Also clear any other potential auth cookies
    const authCookies = [
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
      'sb-auth-token'
    ];

    authCookies.forEach(cookieName => {
      response.cookies.delete(cookieName);
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
      });
    });

    return response;

  } catch (error) {
    console.error('Unexpected error in /api/signout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support GET requests for convenience
export async function GET() {
  return POST();
}
