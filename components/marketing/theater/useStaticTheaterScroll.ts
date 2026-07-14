'use client';

import { useMemo, useRef } from 'react';
import type { UseScrollSectionResult } from '@/hooks/useScrollSection';
import {
  getTheaterStep,
  type TheaterId,
} from '@/lib/marketing-theater-scroll';

/**
 * Fixed theater scroll state for mobile static peeks (no scrub runway).
 */
export function useStaticTheaterScroll(
  theaterId: TheaterId,
  progress = 1
): UseScrollSectionResult {
  const ref = useRef<HTMLDivElement | null>(null);
  return useMemo(
    () => ({
      ref,
      progress,
      step: getTheaterStep(theaterId, progress),
      isInView: true,
      isPaused: false,
    }),
    [theaterId, progress]
  );
}
