import { PRODUCT_OVERVIEW_NAV } from '@/lib/marketing-product-overview-data';

type ProductOverviewSkeletonProps = {
  variant?: 'desktop' | 'mobile';
};

function FrameChromeSkeleton({ sceneLabel }: { sceneLabel?: string }) {
  return (
    <div
      data-light-window=""
      className="theater-frame-chrome flex flex-col overflow-hidden rounded-xl"
      style={{
        border: '1px solid rgba(0,0,0,0.18)',
        boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
      }}
      aria-hidden
    >
      {/* macOS light title bar */}
      <div
        className="relative flex h-8 shrink-0 items-center px-3"
        style={{ background: 'linear-gradient(180deg, #f0f0f2 0%, #e8e8ea 100%)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>MindMesh</span>
          {sceneLabel ? (
            <span className="ml-2 rounded-md px-2 py-0.5 text-xs" style={{ background: 'rgba(0,102,204,0.08)', color: '#0066cc' }}>
              {sceneLabel}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden" style={{ background: '#ffffff' }}>
        <div className="hidden w-[220px] shrink-0 border-r p-3 md:block" style={{ background: '#f2f2f7', borderColor: '#d1d1d6' }}>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 rounded-md" style={{ background: '#e5e5ea' }} />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4 md:p-5" style={{ background: '#ffffff' }}>
          <div className="mb-4 h-5 w-2/3 rounded" style={{ background: '#e5e5ea' }} />
          <div className="mb-2 h-4 w-1/2 rounded" style={{ background: '#ebebed' }} />
          <div className="mt-4 space-y-3">
            <div className="h-20 rounded-lg" style={{ background: '#e5e5ea' }} />
            <div className="h-16 rounded-lg" style={{ background: '#ebebed' }} />
            <div className="h-16 rounded-lg" style={{ background: '#f0f0f2' }} />
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
      <div className="space-y-5" data-product-overview-skeleton="mobile">
        <div data-overview-mobile-peek="">
          <div data-overview-mobile-peek-frame="">
            <FrameChromeSkeleton />
          </div>
        </div>
        <div className="mx-auto h-4 w-3/4 rounded bg-mm-surface-container-high/50" />
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
