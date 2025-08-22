import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rewrite requests that begin with /am to the same path without the /am prefix.
// This allows the app router to serve pages while keeping /am in the browser URL.
export function middleware(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  // Only act on paths starting with /am
  if (pathname.startsWith('/am')) {
    // Remove the /am prefix
    const newPath = pathname === '/am' ? '/' : pathname.replace(/^\/am/, '');

    const url = request.nextUrl.clone();
    url.pathname = newPath;

    // Propagate locale to the rewritten request via request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', 'am');

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });

    // Optional: set a cookie for client-side usage
    response.cookies.set('locale', 'am', { path: '/' });

    // Keep query and hash intact (nextUrl already includes search)
    return response;
  }

  return undefined;
}

export const config = {
  // Match both the exact /am path and any nested path under /am
  matcher: ['/am', '/am/:path*'],
};
