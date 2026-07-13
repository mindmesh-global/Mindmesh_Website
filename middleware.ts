import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Legacy Hero URLs that must land on homepage section hashes.
 * `next.config.js` redirects cannot preserve `#fragment` in destinations
 * (P6-T02 / P6-T04). Path-only Hero redirects live in `next.config.js`.
 */
const HASH_REDIRECTS: Record<string, string> = {
  '/features': '/#features',
  '/waitlist': '/#cta',
};

export function middleware(request: NextRequest) {
  const destination = HASH_REDIRECTS[request.nextUrl.pathname];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/features', '/waitlist'],
};
