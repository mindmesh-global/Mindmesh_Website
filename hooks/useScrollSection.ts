'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  getReducedMotionFinalProgress,
  getTheaterStep,
  measureTheaterScrollProgress,
  type TheaterId,
} from '@/lib/marketing-theater-scroll';

export type UseScrollSectionOptions = {
  theaterId: TheaterId;
  /**
   * Reserved for API compatibility. Progress uses `start end` → `end start`
   * on the wrapper element (P1-T15 theater scroll distance).
   */
  offset?: readonly [string, string];
  rootMargin?: string;
  threshold?: number | number[];
};

export type UseScrollSectionResult = {
  ref: React.RefObject<HTMLDivElement | null>;
  /** Effective scroll progress (0–1), pinned when reduced motion. */
  progress: number;
  /** Beat index from theater progress steps (P3-T01). */
  step: number;
  isInView: boolean;
  /** True when off-screen or reduced motion; scroll-driven updates pause. */
  isPaused: boolean;
};

function isElementInViewport(rect: DOMRect): boolean {
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export { measureTheaterScrollProgress };

export function useScrollSection({
  theaterId,
  rootMargin = '0px',
  threshold = 0,
}: UseScrollSectionOptions): UseScrollSectionResult {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const isInViewRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafIdRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion || !isInViewRef.current) return;

    const rect = element.getBoundingClientRect();
    if (rect.height <= 0) return;

    const next = measureTheaterScrollProgress(element);
    setScrollProgress((prev) => (prev === next ? prev : next));
  }, [prefersReducedMotion]);

  const bootstrapScrollState = useCallback(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return false;

    const rect = element.getBoundingClientRect();
    if (rect.height <= 0) return false;

    const inView = isElementInViewport(rect);
    isInViewRef.current = inView;
    setIsInView((prev) => (prev === inView ? prev : inView));
    setScrollProgress(measureTheaterScrollProgress(element));
    return true;
  }, [prefersReducedMotion]);

  const scheduleProgressUpdate = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateProgress();
    });
  }, [updateProgress]);

  const syncProgressAfterMount = useCallback(() => {
    if (prefersReducedMotion) return;
    if (!bootstrapScrollState()) {
      updateProgress();
    }
    scheduleProgressUpdate();
    window.requestAnimationFrame(() => {
      bootstrapScrollState();
      updateProgress();
      window.requestAnimationFrame(updateProgress);
    });
  }, [bootstrapScrollState, prefersReducedMotion, scheduleProgressUpdate, updateProgress]);

  /** Sync progress when wrapper geometry first becomes available (dynamic import / layout shift). */
  useLayoutEffect(() => {
    if (prefersReducedMotion) return undefined;

    let cancelled = false;
    let frameId = 0;
    let attempts = 0;

    const retryUntilReady = () => {
      if (cancelled) return;
      if (bootstrapScrollState()) return;
      if (attempts >= 40) return;
      attempts += 1;
      frameId = window.requestAnimationFrame(retryUntilReady);
    };

    retryUntilReady();
    const t0 = window.setTimeout(retryUntilReady, 0);
    const t100 = window.setTimeout(retryUntilReady, 100);
    const t350 = window.setTimeout(retryUntilReady, 350);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(t0);
      window.clearTimeout(t100);
      window.clearTimeout(t350);
    };
  }, [bootstrapScrollState, prefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          syncProgressAfterMount();
          window.setTimeout(scheduleProgressUpdate, 100);
          window.setTimeout(scheduleProgressUpdate, 350);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, scheduleProgressUpdate, syncProgressAfterMount, threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return undefined;

    const resizeObserver = new ResizeObserver(() => {
      scheduleProgressUpdate();
    });
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [prefersReducedMotion, scheduleProgressUpdate]);

  /** Track progress every frame while visible (covers smooth scroll-to-hash). */
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return undefined;

    let rafId = 0;
    const tick = () => {
      updateProgress();
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isInView, prefersReducedMotion, updateProgress]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const onScrollOrResize = () => {
      scheduleProgressUpdate();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    window.addEventListener('hashchange', onScrollOrResize);
    window.addEventListener('scrollend', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('hashchange', onScrollOrResize);
      window.removeEventListener('scrollend', onScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [prefersReducedMotion, scheduleProgressUpdate]);

  const reducedMotionProgress = getReducedMotionFinalProgress(theaterId);
  const isPaused = !isInView || prefersReducedMotion;
  const progress = prefersReducedMotion ? reducedMotionProgress : scrollProgress;

  const step = useMemo(
    () => getTheaterStep(theaterId, progress),
    [theaterId, progress]
  );

  return {
    ref,
    progress,
    step,
    isInView,
    isPaused,
  };
}
