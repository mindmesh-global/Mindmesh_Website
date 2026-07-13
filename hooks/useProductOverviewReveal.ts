'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Hold duration before the mount reveal starts (P12-T02 beat 1). */
const REVEAL_HOLD_MS = 200;

/**
 * Hero -> Product Overview mount reveal state (P12-T02 beat sheet / P12-T06).
 *
 * Starts `false` (pre-reveal state) and flips to `true` after a fixed hold,
 * once per mount. Reduced-motion visitors get `true` immediately: no hold,
 * no growth, matching the global Phase 12 motion contract.
 */
export function useProductOverviewReveal(): boolean {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setRevealed(true), REVEAL_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return revealed;
}
