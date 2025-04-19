import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = req.cookies.get('authToken')?.value; // Get the token from cookies
    console.log("Token:", token);
    const url = req.nextUrl.clone();
    console.log("pathname:",url.pathname);

    // Check if the token exists and starts with "Bearer "
  if (!token && !url.pathname.startsWith('/login') ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Validate the token by making a request to an external API
    const response = await fetch('http://88.99.55.86:3000/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });


        if (url.pathname.startsWith('/login') && response.ok) {
            return NextResponse.redirect(new URL('/profile', req.url));
        }

    // If the response is not 200, redirect to /login
    if (!response.ok && !url.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/profile', '/reservation' ,'/login' ], // Protect API routes, /profile, and /reservation
};