'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ActiveWindowType = 'home' | 'features' | 'docs' | 'social' | 'subscription' | 'contact' | null;

type UIOverlayContextType = {
  showMascot: boolean;
  showSensorBar: boolean;
  activeWindowType: ActiveWindowType;
  hasScrolledToBottom: boolean;
  setShowMascot: (v: boolean) => void;
  setShowSensorBar: (v: boolean) => void;
  setActiveWindowType: (v: ActiveWindowType) => void;
  setHasScrolledToBottom: (v: boolean) => void;
};

const UIOverlayContext = createContext<UIOverlayContextType | null>(null);

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [showMascot, setShowMascotState] = useState(true);
  const [showSensorBar, setShowSensorBarState] = useState(true);
  const [activeWindowType, setActiveWindowTypeState] = useState<ActiveWindowType>('home');
  const [hasScrolledToBottom, setHasScrolledToBottomState] = useState(false);
  const setShowMascot = useCallback((v: boolean) => setShowMascotState(v), []);
  const setShowSensorBar = useCallback((v: boolean) => setShowSensorBarState(v), []);
  const setActiveWindowType = useCallback((v: ActiveWindowType) => setActiveWindowTypeState(v), []);
  const setHasScrolledToBottom = useCallback((v: boolean) => setHasScrolledToBottomState(v), []);

  return (
    <UIOverlayContext.Provider
      value={{ showMascot, showSensorBar, activeWindowType, hasScrolledToBottom, setShowMascot, setShowSensorBar, setActiveWindowType, setHasScrolledToBottom }}
    >
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const ctx = useContext(UIOverlayContext);
  return ctx;
}
