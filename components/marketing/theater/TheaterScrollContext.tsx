'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { UseScrollSectionResult } from '@/hooks/useScrollSection';

const TheaterScrollContext = createContext<UseScrollSectionResult | null>(null);

type TheaterScrollProviderProps = {
  value: UseScrollSectionResult;
  children: ReactNode;
};

/** Provides scroll state from `useScrollSection` to frame content (P3-T05). */
export function TheaterScrollProvider({ value, children }: TheaterScrollProviderProps) {
  return (
    <TheaterScrollContext.Provider value={value}>{children}</TheaterScrollContext.Provider>
  );
}

/** Read theater scroll state inside `ProductFrame` children (Phase 4 animations). */
export function useTheaterScroll(): UseScrollSectionResult {
  const value = useContext(TheaterScrollContext);
  if (!value) {
    throw new Error('useTheaterScroll must be used within TheaterScrollProvider');
  }
  return value;
}

/** Optional accessor when provider may be absent (static Phase 2 frames). */
export function useOptionalTheaterScroll(): UseScrollSectionResult | null {
  return useContext(TheaterScrollContext);
}
