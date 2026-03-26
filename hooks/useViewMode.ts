'use client';

import { useDashboardViewMode } from '@/context/DashboardViewModeContext';
import type { ViewMode } from '@/context/DashboardViewModeContext';

export function useViewMode(): {
  viewMode: ViewMode;
  toggleViewMode: () => void;
} {
  const { viewMode, toggleViewMode } = useDashboardViewMode();
  return { viewMode, toggleViewMode };
}
