'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MascotChatbot from '@/components/MascotChatbot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { useOptionalDashboardViewMode } from '@/context/DashboardViewModeContext';
import { isMindmeshHeroRoute, MINDMESH_HERO_ROUTES } from '@/lib/mindmesh-hero-routes';

const MINDMESH_PAGES: readonly string[] = MINDMESH_HERO_ROUTES;

export default function ConditionalOverlays() {
  const overlay = useUIOverlay();
  const onboarding = useOnboardingTour();
  const pathname = usePathname();
  const dashboardVm = useOptionalDashboardViewMode();

  useEffect(() => {
    if (overlay && pathname && !MINDMESH_PAGES.includes(pathname)) {
      overlay.setHasScrolledToBottom(false);
    }
  }, [pathname, overlay]);

  useEffect(() => {
    if (!overlay?.mascotTooltipVisible) return;
    const preventScroll = (e: WheelEvent) => e.preventDefault();
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    return () => document.body.removeEventListener('wheel', preventScroll);
  }, [overlay?.mascotTooltipVisible]);

  if (dashboardVm?.viewMode === 'desktop' && isMindmeshHeroRoute(pathname)) {
    return null;
  }

  if (!overlay || !onboarding) return null;
  const { showMascot, showSensorBar } = overlay;

  const isMindmeshPage = pathname && MINDMESH_PAGES.includes(pathname);
  const showMascotTooltip = false;
  const showSensorBarTooltip = false;

  if (!isMindmeshPage) return null;

  return (
    <>
      {showSensorBar && <SensorBarSpotlight showTooltip={showSensorBarTooltip} />}
      {showMascot && <MascotChatbot showTooltip={showMascotTooltip} />}
    </>
  );
}
