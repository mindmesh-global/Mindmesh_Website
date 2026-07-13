'use client';

import type { ReactNode } from 'react';
import { useScrollSection } from '@/hooks/useScrollSection';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
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
}: TheaterScrollSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollState = useScrollSection({ theaterId });
  const wrapperClass = getTheaterWrapperMinHeightClass(theaterId, prefersReducedMotion);

  return (
    <div
      ref={scrollState.ref}
      className={`${wrapperClass}${className ? ` ${className}` : ''}`}
      data-theater={theaterId}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-theater-in-view={scrollState.isInView ? 'true' : 'false'}
      data-theater-paused={scrollState.isPaused ? 'true' : 'false'}
      data-theater-progress={scrollState.progress.toFixed(3)}
    >
      <TheaterScrollProvider value={scrollState}>
        <ProductFrame
          caption={caption}
          footer={footer}
          sidebar={sidebar}
          sticky={!prefersReducedMotion}
        >
          {children}
        </ProductFrame>
      </TheaterScrollProvider>
    </div>
  );
}
