'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import type { HomeSectionId } from './HomeSectionContext';

const CLEAR_DELAY_MS = 80;

type SectionHoverContextType = {
  hoveredSectionId: HomeSectionId | null;
  cutoutRect: DOMRect | null;
  setHoveredSection: (id: HomeSectionId, rect: DOMRect) => void;
  clearHoveredSection: () => void;
  updateCutoutRect: (rect: DOMRect) => void;
};

const SectionHoverContext = createContext<SectionHoverContextType | null>(null);

export function SectionHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSectionId, setHoveredSectionId] = useState<HomeSectionId | null>(null);
  const [cutoutRect, setCutoutRect] = useState<DOMRect | null>(null);
  const clearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setHoveredSection = useCallback((id: HomeSectionId, rect: DOMRect) => {
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = null;
    }
    setHoveredSectionId(id);
    setCutoutRect(rect);
  }, []);

  const clearHoveredSection = useCallback(() => {
    if (clearTimeoutRef.current) return;
    clearTimeoutRef.current = setTimeout(() => {
      clearTimeoutRef.current = null;
      setHoveredSectionId(null);
      setCutoutRect(null);
    }, CLEAR_DELAY_MS);
  }, []);

  const updateCutoutRect = useCallback((rect: DOMRect) => {
    setCutoutRect(rect);
  }, []);

  return (
    <SectionHoverContext.Provider value={{ hoveredSectionId, cutoutRect, setHoveredSection, clearHoveredSection, updateCutoutRect }}>
      {children}
    </SectionHoverContext.Provider>
  );
}

export function useSectionHover() {
  return useContext(SectionHoverContext);
}
