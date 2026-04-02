'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ViewMode = 'desktop' | 'scrollable';

const STORAGE_KEY = 'mindmesh-dashboard-view';

export type DashboardViewModeContextValue = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
};

const DashboardViewModeContext = createContext<DashboardViewModeContextValue | null>(null);

export function DashboardViewModeProvider({ children }: { children: ReactNode }) {
  // `desktop` = full-page scroll marketing shell first; `scrollable` = window/Hero. localStorage overrides after hydrate.
  const [viewMode, setViewModeState] = useState<ViewMode>('desktop');

  // useLayoutEffect (not useEffect) so we apply saved mode before the browser paints — avoids a flash of desktop when user chose scroll view.
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'desktop' || raw === 'scrollable') {
        setViewModeState(raw);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewModeState((prev) => {
      const next: ViewMode = prev === 'desktop' ? 'scrollable' : 'desktop';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ viewMode, setViewMode, toggleViewMode }),
    [viewMode, setViewMode, toggleViewMode]
  );

  return (
    <DashboardViewModeContext.Provider value={value}>{children}</DashboardViewModeContext.Provider>
  );
}

export function useDashboardViewMode(): DashboardViewModeContextValue {
  const ctx = useContext(DashboardViewModeContext);
  if (!ctx) {
    throw new Error('useDashboardViewMode must be used within DashboardViewModeProvider');
  }
  return ctx;
}

/** Safe on components that may render outside the provider (returns null). */
export function useOptionalDashboardViewMode(): DashboardViewModeContextValue | null {
  return useContext(DashboardViewModeContext);
}

/** @deprecated use useDashboardViewMode */
export function useDashboardViewModeContext(): DashboardViewModeContextValue {
  return useDashboardViewMode();
}
