'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';
import DashboardDesktopShell from '@/components/dashboard/view-shells/DashboardDesktopShell';
import { isMindmeshDashboardChromeRoute } from '@/lib/mindmesh-legacy-routes';

/** Full-viewport dashboard layout above legacy chrome (dock, side icons). */
export default function DashboardFullBleedPortal() {
  const { viewMode } = useDashboardViewMode();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || typeof document === 'undefined') return null;
  if (viewMode !== 'desktop') return null;
  if (!isMindmeshDashboardChromeRoute(pathname)) return null;

  return createPortal(
    <div
      id="mindmesh-marketing-scroll"
      className="mindmesh-marketing-root fixed inset-0 z-[200000] overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#0a0a14', color: '#a1a1aa' }}
      role="document"
      aria-label="MindMesh marketing"
    >
      <DashboardDesktopShell />
    </div>,
    document.body
  );
}
