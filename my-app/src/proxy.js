// src/proxy.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// ==========================================
// 1. HELPER FUNCTION (For API Routes & Pages)
// ==========================================
export async function getSessionData(request = null) {
  let cookieValue = undefined;
  if (request && typeof request.cookies?.get === 'function') {
    cookieValue = request.cookies.get('session')?.value;
  } else {
    try {
      const cookieStore = await cookies();
      cookieValue = cookieStore.get('session')?.value;
    } catch {
      cookieValue = undefined;
    }
  }
  if (!cookieValue) return null;
  try { return JSON.parse(cookieValue); } catch { return null; }
}

// ==========================================
// 2. HELPER FUNCTION (For API Routes & Pages)
// ==========================================
export async function checkIsAdmin(request = null) {
  const sessionData = await getSessionData(request);
  return sessionData?.user?.role === 'admin';
}

// ==========================================
// 3. THE MAIN ROUTING FUNCTION (For Next.js Engine)
// ==========================================
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  
  let userRole = null;

  if (sessionCookie?.value) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      userRole = sessionData?.user?.role;
    } catch {
      userRole = null;
    }
  }

  // Security Gate Routing Rules
  if (!userRole) {
    return NextResponse.redirect(new URL('/login?error=auth_required', request.url));
  }

  // if (pathname.startsWith('/store') && userRole !== 'admin') {
  //   return NextResponse.redirect(new URL('/dashboard?error=unauthorized', request.url));
  // }

  return NextResponse.next();
}

// ==========================================
// 4. THE ROUTE TARGET MATCHERS
// ==========================================
export const config = {
  matcher: ['/dashboard/:path*', '/store/:path*', '/cart/:path*', '/checkout/:path*'],
};