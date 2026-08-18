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
  // Waitlist-only: hide pricing until billing launches. 307 so we can restore /billing later.
  // Restore steps: docs/unhide-billing.md
  '/billing': '/#cta',
  '/subscription': '/#cta',
};

const PERMANENT_HASH_REDIRECTS = new Set(['/features', '/waitlist']);

export function middleware(request: NextRequest) {
  const destination = HASH_REDIRECTS[request.nextUrl.pathname];
  if (destination) {
    const status = PERMANENT_HASH_REDIRECTS.has(request.nextUrl.pathname) ? 308 : 307;
    return NextResponse.redirect(new URL(destination, request.url), status);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/features', '/waitlist', '/billing', '/subscription'],
};
