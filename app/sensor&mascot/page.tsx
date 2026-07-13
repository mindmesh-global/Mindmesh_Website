import type { Metadata } from 'next';
import Link from 'next/link';
import { LegacySensorMascotRedirect } from '@/components/marketing/LegacySensorMascotRedirect';

/**
 * Legacy combined Sensor & Mascot URL (P8-T14).
 * Client shim branches on hash; no-JS users get explicit links.
 * Kept out of sitemap; noindex (P7-T11).
 */
export const metadata: Metadata = {
  title: 'Sensor & Mascot',
  description:
    'This page has moved. Explore Sensor and Mascot on their dedicated MindMesh pages.',
  robots: { index: false, follow: false },
};

export default function LegacySensorMascotPage() {
  return (
    <div
      data-marketing-theme="dark"
      className="flex min-h-screen flex-col items-center justify-center bg-mm-background px-6 py-16 font-body text-mm-on-background antialiased"
    >
      <LegacySensorMascotRedirect />
      <div className="mx-auto w-full max-w-md text-center">
        <p className="text-sm font-medium text-mm-on-surface-variant">Moved</p>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-mm-on-background">
          This page has moved
        </h1>
        <p className="mt-4 text-base text-mm-on-surface-variant">
          Sensor and Mascot now have their own pages. Redirecting you now.
        </p>
        <noscript>
          <p className="mt-4 text-sm text-mm-on-surface-variant">
            JavaScript is off, so choose a destination below.
          </p>
        </noscript>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/sensor"
            className="inline-flex rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
          >
            Go to Sensor
          </Link>
          <Link
            href="/mascot"
            className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
          >
            Go to Mascot →
          </Link>
        </div>
      </div>
    </div>
  );
}
