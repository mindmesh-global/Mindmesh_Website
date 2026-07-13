import { PRODUCT_OVERVIEW_NAV } from '@/lib/marketing-product-overview-data';

type ProductOverviewSkeletonProps = {
  variant?: 'desktop' | 'mobile';
};

function FrameChromeSkeleton({ sceneLabel }: { sceneLabel?: string }) {
  return (
    <div
      className="theater-frame-chrome flex flex-col overflow-hidden rounded-lg border border-mm-outline-variant bg-mm-surface-container-high shadow-mm-elevated"
      aria-hidden
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-mm-outline-variant/60 bg-mm-surface px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-mm-outline-variant" />
          <span className="h-2.5 w-2.5 rounded-full bg-mm-outline-variant" />
          <span className="h-2.5 w-2.5 rounded-full bg-mm-outline-variant" />
        </div>
        <span className="text-sm font-medium text-mm-on-surface">MindMesh</span>
        {sceneLabel ? (
          <span className="rounded-md bg-mm-primary/10 px-2 py-0.5 text-xs text-mm-primary">
            {sceneLabel}
          </span>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="hidden w-[220px] shrink-0 border-r border-mm-outline-variant/60 bg-mm-surface p-3 md:block">
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-8 rounded-md bg-mm-surface-container-high/80"
              />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-mm-surface p-4 md:p-5">
          <div className="mb-4 h-5 w-2/3 rounded bg-mm-surface-container-high/80" />
          <div className="mb-2 h-4 w-1/2 rounded bg-mm-surface-container-high/60" />
          <div className="mt-4 space-y-3">
            <div className="h-20 rounded-lg bg-mm-surface-container-high/70" />
            <div className="h-16 rounded-lg bg-mm-surface-container-high/50" />
            <div className="h-16 rounded-lg bg-mm-surface-container-high/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dimensionally stable loading shell for the product overview (P11-T11).
 * Matches live frame chrome heights so dynamic import does not shift layout.
 */
export function ProductOverviewSkeleton({
  variant = 'desktop',
}: ProductOverviewSkeletonProps) {
  if (variant === 'mobile') {
    return (
      <div className="space-y-10" data-product-overview-skeleton="mobile">
        {PRODUCT_OVERVIEW_NAV.map((item) => (
          <div key={item.scene} className="relative">
            <FrameChromeSkeleton sceneLabel={item.label} />
            <div className="mt-4 h-4 w-3/4 rounded bg-mm-surface-container-high/50" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative"
      data-product-overview-skeleton="desktop"
      data-theater="productOverview"
    >
      {/*
        Same wide/reveal attributes as the real frame (P12-T06), pinned to
        the pre-reveal state, so swapping skeleton -> real content never
        changes width or visual scale - only the inner content changes.
        Height matches normal document flow (no 180vh scrub runway).
      */}
      <div data-overview-frame-bleed="true">
        <div
          data-overview-frame-wide="true"
          data-overview-revealed="false"
        >
          <FrameChromeSkeleton sceneLabel={PRODUCT_OVERVIEW_NAV[0].label} />
          <div className="mt-4 h-10 rounded-md bg-mm-surface-container-high/40" />
          <div className="mt-3 h-4 w-4/5 rounded bg-mm-surface-container-high/50" />
        </div>
      </div>
    </div>
  );
}
