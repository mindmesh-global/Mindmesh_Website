'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useScrollSection } from '@/hooks/useScrollSection';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  getTheaterStep,
  getTheaterWrapperMinHeightClass,
  type TheaterId,
} from '@/lib/marketing-theater-scroll';
import { ProductFrame } from './ProductFrame';
import { TheaterScrollProvider } from './TheaterScrollContext';

export type TheaterScrollSectionProps = {
  theaterId: TheaterId;
  /** Demo content rendered inside sticky ProductFrame. */
  children: ReactNode;
  /** Caption below the frame (P1-T06–08 reduced-motion copy). */
  caption?: string;
  /** Depth links below caption; sticks with the frame (avoids overlap). */
  footer?: ReactNode;
  /** Optional left rail (Connect theater; Phase 4). */
  sidebar?: ReactNode;
  className?: string;
  lightWindow?: boolean;
  /** Disable sticky positioning — use when animation is auto-played, not scroll-driven. */
  noSticky?: boolean;
};

/**
 * Tall scroll wrapper + sticky ProductFrame + scroll context.
 * Place inside MarketingSection below headline/subhead (P1-T15 anatomy).
 */
export function TheaterScrollSection({
  theaterId,
  children,
  caption,
  footer,
  sidebar,
  className,
  lightWindow,
  noSticky = false,
}: TheaterScrollSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollState = useScrollSection({ theaterId });

  // Lightweight in-view state for noSticky: single passive scroll listener,
  // no RAF loop — avoids the three-section jank of useScrollSection.
  const noStickyRef = useRef<HTMLDivElement>(null);
  const [noStickyInView, setNoStickyInView] = useState(false);
  useEffect(() => {
    if (!noSticky) return;
    const check = () => {
      const el = noStickyRef.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      setNoStickyInView(bottom > 0 && top < window.innerHeight);
    };
    check(); // initial check after mount
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noSticky]);

  const noStickyState = useMemo(() => ({
    ref: noStickyRef,
    progress: 0,
    step: getTheaterStep(theaterId, 0),
    isInView: noStickyInView,
    isPaused: !noStickyInView || prefersReducedMotion,
  }), [theaterId, noStickyInView, prefersReducedMotion]);

  const activeState = noSticky ? noStickyState : scrollState;
  const wrapperClass = noSticky ? 'relative' : getTheaterWrapperMinHeightClass(theaterId, prefersReducedMotion);

  return (
    <div
      ref={noSticky ? noStickyRef : scrollState.ref}
      className={`${wrapperClass}${className ? ` ${className}` : ''}`}
      data-theater={noSticky ? undefined : theaterId}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
    >
      <TheaterScrollProvider value={activeState}>
        <ProductFrame
          caption={caption}
          footer={footer}
          sidebar={sidebar}
          sticky={noSticky ? false : !prefersReducedMotion}
          lightWindow={lightWindow}
        >
          {children}
        </ProductFrame>
      </TheaterScrollProvider>
    </div>
  );
}
