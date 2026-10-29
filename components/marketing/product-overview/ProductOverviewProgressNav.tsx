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
  interactive?: boolean;
  layout?: 'wrap' | 'scroll';
  className?: string;
};

/**
 * Apple Dynamic Island-style scene picker: a single floating pill with all
 * scenes inline. Active scene gets an inner highlight pill.
 */
export function ProductOverviewProgressNav({
  activeScene,
  onSelectScene,
  interactive = true,
  className,
}: ProductOverviewProgressNavProps) {
  const labelId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusScene = useCallback((scene: ProductOverviewSceneId) => {
    tabRefs.current[scene - 1]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return;
      let next: ProductOverviewSceneId | null = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = activeScene === PRODUCT_OVERVIEW_SCENE_COUNT
          ? 1
          : ((activeScene + 1) as ProductOverviewSceneId);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        next = activeScene === 1
          ? PRODUCT_OVERVIEW_SCENE_COUNT
          : ((activeScene - 1) as ProductOverviewSceneId);
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

  return (
    <div
      className={['flex justify-center', className].filter(Boolean).join(' ')}
      data-overview-progress-nav
      data-overview-progress-interactive={interactive ? 'true' : 'false'}
    >
      {/* Island pill */}
      <div
        role="tablist"
        aria-label="Product overview scenes"
        aria-orientation="horizontal"
        id={labelId}
        className="flex items-center gap-1 overflow-x-auto rounded-full p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          background: 'rgba(6,10,22,0.80)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow:
            '0 2px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
        onKeyDown={handleKeyDown}
      >
        {PRODUCT_OVERVIEW_NAV.map((item) => {
          const selected = item.scene === activeScene;
          return (
            <button
              key={item.scene}
              ref={(node) => { tabRefs.current[item.scene - 1] = node; }}
              type="button"
              role="tab"
              id={`overview-scene-tab-${item.scene}`}
              aria-selected={selected}
              aria-controls={`overview-scene-panel-${item.scene}`}
              tabIndex={selected ? 0 : -1}
              disabled={!interactive}
              onClick={() => { if (interactive) onSelectScene(item.scene); }}
              className={[
                'shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                interactive ? 'cursor-pointer' : 'cursor-default',
                selected
                  ? 'text-white'
                  : 'text-white/70 hover:text-white/90',
              ].join(' ')}
              style={selected ? {
                background: 'rgba(255,255,255,0.13)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
              } : undefined}
              data-overview-progress-tab={item.scene}
              data-overview-progress-selected={selected ? 'true' : 'false'}
            >
              {item.label}
              {selected && <span className="sr-only"> (current scene)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
