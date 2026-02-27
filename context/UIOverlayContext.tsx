'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type UIOverlayContextType = {
  showMascot: boolean;
  showSensorBar: boolean;
  setShowMascot: (v: boolean) => void;
  setShowSensorBar: (v: boolean) => void;
};

const UIOverlayContext = createContext<UIOverlayContextType | null>(null);

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [showMascot, setShowMascotState] = useState(true);
  const [showSensorBar, setShowSensorBarState] = useState(true);
  const setShowMascot = useCallback((v: boolean) => setShowMascotState(v), []);
  const setShowSensorBar = useCallback((v: boolean) => setShowSensorBarState(v), []);

  return (
    <UIOverlayContext.Provider
      value={{ showMascot, showSensorBar, setShowMascot, setShowSensorBar }}
    >
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const ctx = useContext(UIOverlayContext);
  return ctx;
}
