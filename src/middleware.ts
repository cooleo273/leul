import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Single middleware: rewrite /am and /am/* to the same path without the prefix,
// set x-locale header and a cookie so server and client can localize.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/am' || pathname.startsWith('/am/')) {
    const newPath = pathname === '/am' ? '/' : pathname.replace(/^\/am/, '');

    const url = request.nextUrl.clone();
    url.pathname = newPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', 'am');

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  // Limit the cookie to /am so it won't affect English pages
  response.cookies.set('locale', 'am', { path: '/am' });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
