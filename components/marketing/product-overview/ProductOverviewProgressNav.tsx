'use client';

import { useCallback, useId, useRef, type KeyboardEvent } from 'react';
import {
  PRODUCT_OVERVIEW_NAV,
  PRODUCT_OVERVIEW_SCENE_COUNT,
  type ProductOverviewSceneId,
} from '@/lib/marketing-product-overview-data';

export type ProductOverviewProgressNavProps = {
  activeScene: ProductOverviewSceneId;
  onSelectScene: (scene: ProductOverviewSceneId) => void;
  /** When true, tabs are visible but not interactive (reduced-motion pin). */
  interactive?: boolean;
  /**
   * `wrap` (default): flex-wrap centered grid.
   * `scroll`: single horizontal row with overflow scroll (mobile peek).
   */
  layout?: 'wrap' | 'scroll';
  className?: string;
};

/**
 * Scene progress navigation for the product overview (P11-T10).
 * Labels + selected state (not color alone); keyboard arrow support.
 */
export function ProductOverviewProgressNav({
  activeScene,
  onSelectScene,
  interactive = true,
  layout = 'wrap',
  className,
}: ProductOverviewProgressNavProps) {
  const labelId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusScene = useCallback((scene: ProductOverviewSceneId) => {
    const index = scene - 1;
    tabRefs.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return;

      let next: ProductOverviewSceneId | null = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = (
          activeScene === PRODUCT_OVERVIEW_SCENE_COUNT
            ? 1
            : ((activeScene + 1) as ProductOverviewSceneId)
        );
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        next = (
          activeScene === 1
            ? PRODUCT_OVERVIEW_SCENE_COUNT
            : ((activeScene - 1) as ProductOverviewSceneId)
        );
      } else if (event.key === 'Home') {
        next = 1;
      } else if (event.key === 'End') {
        next = PRODUCT_OVERVIEW_SCENE_COUNT;
      }

      if (!next) return;
      event.preventDefault();
      onSelectScene(next);
      focusScene(next);
    },
    [activeScene, focusScene, interactive, onSelectScene]
  );

  const scrollLayout = layout === 'scroll';

  return (
    <div
      className={['space-y-3', scrollLayout ? 'text-left' : 'text-center', className]
        .filter(Boolean)
        .join(' ')}
      data-overview-progress-nav
      data-overview-progress-layout={layout}
      data-overview-progress-interactive={interactive ? 'true' : 'false'}
    >
      <p id={labelId} className="text-xs font-medium text-mm-on-surface-variant">
        Product overview
        <span className="ml-2 tabular-nums text-mm-on-surface">
          {activeScene} / {PRODUCT_OVERVIEW_SCENE_COUNT} ·{' '}
          {PRODUCT_OVERVIEW_NAV[activeScene - 1].label}
        </span>
      </p>
      <div
        role="tablist"
        aria-labelledby={labelId}
        aria-orientation="horizontal"
        className={
          scrollLayout
            ? 'flex flex-nowrap justify-start gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'flex flex-wrap justify-center gap-2'
        }
        onKeyDown={handleKeyDown}
      >
        {PRODUCT_OVERVIEW_NAV.map((item) => {
          const selected = item.scene === activeScene;
          return (
            <button
              key={item.scene}
              ref={(node) => {
                tabRefs.current[item.scene - 1] = node;
              }}
              type="button"
              role="tab"
              id={`overview-scene-tab-${item.scene}`}
              aria-selected={selected}
              aria-controls={`overview-scene-panel-${item.scene}`}
              tabIndex={selected ? 0 : -1}
              disabled={!interactive}
              onClick={() => {
                if (!interactive) return;
                onSelectScene(item.scene);
              }}
              className={[
                'inline-flex min-h-11 min-w-[2.75rem] items-center gap-2 rounded-md border px-3 py-2.5 text-left text-xs font-medium transition-[opacity,transform]',
                scrollLayout ? 'shrink-0 whitespace-nowrap' : '',
                selected
                  ? 'border-mm-primary bg-mm-primary/15 text-mm-on-surface ring-1 ring-mm-primary/40'
                  : 'border-mm-outline-variant/60 text-mm-on-surface-variant hover:border-mm-outline-variant hover:text-mm-on-surface',
                !interactive ? 'cursor-default opacity-90' : '',
              ].join(' ')}
              data-overview-progress-tab={item.scene}
              data-overview-progress-selected={selected ? 'true' : 'false'}
            >
              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums',
                  selected
                    ? 'bg-mm-primary text-mm-on-primary'
                    : 'bg-mm-surface-container-high text-mm-on-surface-variant',
                ].join(' ')}
                aria-hidden
              >
                {item.scene}
              </span>
              <span>{item.label}</span>
              {selected ? (
                <span className="sr-only">(current scene)</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
