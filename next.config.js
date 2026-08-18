const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  // Keep HTML reports on disk; do not auto-open browser (CI / agent friendly).
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  /**
   * Image optimization enabled (P6-T12). Local PNGs/JPGs go through `/_next/image`.
   * SVG badges keep per-Image `unoptimized` (Next does not optimize SVG by default).
   */
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 defaults to [75] only; allow 100 for dashboard gem mark.
    qualities: [75, 100],
  },
  /**
   * Legacy macOS Hero URL redirects (P6-T02 / P1-T19).
   * Hash destinations (`/features` → `/#features`, `/waitlist` → `/#cta`) are
   * handled in `middleware.ts` (config redirects cannot preserve fragments).
   * `/dashboard` is intentionally not redirected.
   * `/sensor&mascot` uses a client hash-aware shim (P8-T14); do not add a
   * competing config 308 that would skip `#mascot` → `/mascot` branching.
   */
  async redirects() {
    return [
      {
        source: '/app-directory',
        destination: '/connected-apps',
        permanent: true,
      },
      // `/subscription` and `/billing` redirect to `/#cta` in middleware.ts
      // while the site is waitlist-only (hash destinations cannot live here).
      {
        source: '/docs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/social',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
