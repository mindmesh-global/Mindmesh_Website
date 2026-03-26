'use client';

import { DashboardViewModeProvider } from '@/context/DashboardViewModeContext';
import DashboardFullBleedPortal from '@/components/DashboardFullBleedPortal';

export function DashboardViewModeRoot({ children }: { children: React.ReactNode }) {
  return (
    <DashboardViewModeProvider>
      {children}
      <DashboardFullBleedPortal />
    </DashboardViewModeProvider>
  );
}
