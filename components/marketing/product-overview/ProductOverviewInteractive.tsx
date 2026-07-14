'use client';

import dynamic from 'next/dynamic';
import { ProductOverviewSkeleton } from './ProductOverviewSkeleton';

const ProductOverviewDesktop = dynamic(
  () =>
    import('./ProductOverviewDesktop').then((mod) => ({
      default: mod.ProductOverviewDesktop,
    })),
  {
    ssr: false,
    loading: () => <ProductOverviewSkeleton variant="desktop" />,
  }
);

const ProductOverviewMobile = dynamic(
  () =>
    import('./ProductOverviewMobile').then((mod) => ({
      default: mod.ProductOverviewMobile,
    })),
  {
    ssr: false,
    loading: () => <ProductOverviewSkeleton variant="mobile" />,
  }
);

/**
 * Dynamically loaded interactive overview body (P11-T11 / P12-T03 / P12-T10).
 *
 * Visibility is CSS-driven so reduced-motion desktop users get the click
 * tour without waiting on JS hydration (no scrub dependency).
 * - Click tour: mobile always (Linear-style peek frame); desktop when
 *   prefers-reduced-motion
 * - Motion desktop: md+ and motion allowed only
 */
export function ProductOverviewInteractive() {
  return (
    <>
      <div
        className="block md:hidden motion-reduce:!block"
        data-overview-static-tour
      >
        <ProductOverviewMobile />
      </div>
      {/*
        No overflow-x-clip here: the widened frame breakout (P12-T04 / P12-T06)
        extends past the 1120px column. Clipping this wrapper cuts the chrome
        borders on both sides.
      */}
      <div className="hidden md:block motion-reduce:!hidden" data-overview-motion-only>
        <ProductOverviewDesktop />
      </div>
    </>
  );
}
