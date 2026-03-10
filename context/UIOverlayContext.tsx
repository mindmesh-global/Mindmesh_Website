'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ActiveWindowType = 'home' | 'features' | 'docs' | 'social' | 'subscription' | 'contact' | 'appDirectory' | null;

type UIOverlayContextType = {
  showMascot: boolean;
  showSensorBar: boolean;
  activeWindowType: ActiveWindowType;
  hasScrolledToBottom: boolean;
  openOverlayDropdown: boolean;
  mascotTooltipVisible: boolean;
  setShowMascot: (v: boolean) => void;
  setShowSensorBar: (v: boolean) => void;
  setActiveWindowType: (v: ActiveWindowType) => void;
  setHasScrolledToBottom: (v: boolean) => void;
  setOpenOverlayDropdown: (v: boolean) => void;
  setMascotTooltipVisible: (v: boolean) => void;
};

const UIOverlayContext = createContext<UIOverlayContextType | null>(null);

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [showMascot, setShowMascotState] = useState(true);
  const [showSensorBar, setShowSensorBarState] = useState(false);
  const [activeWindowType, setActiveWindowTypeState] = useState<ActiveWindowType>('home');
  const [hasScrolledToBottom, setHasScrolledToBottomState] = useState(false);
  const [openOverlayDropdown, setOpenOverlayDropdownState] = useState(false);
  const [mascotTooltipVisible, setMascotTooltipVisibleState] = useState(false);
  const setShowMascot = useCallback((v: boolean) => setShowMascotState(v), []);
  const setShowSensorBar = useCallback((v: boolean) => setShowSensorBarState(v), []);
  const setActiveWindowType = useCallback((v: ActiveWindowType) => setActiveWindowTypeState(v), []);
  const setHasScrolledToBottom = useCallback((v: boolean) => setHasScrolledToBottomState(v), []);
  const setOpenOverlayDropdown = useCallback((v: boolean) => setOpenOverlayDropdownState(v), []);
  const setMascotTooltipVisible = useCallback((v: boolean) => setMascotTooltipVisibleState(v), []);

  return (
    <UIOverlayContext.Provider
      value={{ showMascot, showSensorBar, activeWindowType, hasScrolledToBottom, openOverlayDropdown, mascotTooltipVisible, setShowMascot, setShowSensorBar, setActiveWindowType, setHasScrolledToBottom, setOpenOverlayDropdown, setMascotTooltipVisible }}
    >
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const ctx = useContext(UIOverlayContext);
  return ctx;
}
