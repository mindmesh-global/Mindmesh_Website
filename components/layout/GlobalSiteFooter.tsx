'use client';

import { usePathname } from 'next/navigation';
import SiteFooter from '@/components/layout/SiteFooter';
import { useOptionalDashboardViewMode } from '@/context/DashboardViewModeContext';
import { isMindmeshHeroRoute } from '@/lib/mindmesh-hero-routes';

export default function GlobalSiteFooter() {
  const pathname = usePathname();
  const dashboardVm = useOptionalDashboardViewMode();

  if (!pathname || pathname === '/' || pathname === '/dashboard') {
    return null;
  }

  /* macOS window view: no full-page marketing footer (navy block with links) */
  if (dashboardVm?.viewMode === 'scrollable' && isMindmeshHeroRoute(pathname)) {
    return null;
  }

  return <SiteFooter />;
}
