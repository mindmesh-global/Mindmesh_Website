'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MascotChatbot from '@/components/MascotChatbot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { useOptionalDashboardViewMode } from '@/context/DashboardViewModeContext';
import {
  isMindmeshDashboardChromeRoute,
  isMindmeshOverlayRoute,
} from '@/lib/mindmesh-legacy-routes';

export default function ConditionalOverlays() {
  const overlay = useUIOverlay();
  const onboarding = useOnboardingTour();
  const pathname = usePathname();
  const dashboardVm = useOptionalDashboardViewMode();

  useEffect(() => {
    if (overlay && pathname && !isMindmeshOverlayRoute(pathname)) {
      overlay.setHasScrolledToBottom(false);
    }
  }, [pathname, overlay]);

  useEffect(() => {
    if (!overlay?.mascotTooltipVisible) return;
    const preventScroll = (e: WheelEvent) => e.preventDefault();
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    return () => document.body.removeEventListener('wheel', preventScroll);
  }, [overlay?.mascotTooltipVisible]);

  if (dashboardVm?.viewMode === 'desktop' && isMindmeshDashboardChromeRoute(pathname)) {
    return null;
  }

  if (!overlay || !onboarding) return null;
  const { showMascot, showSensorBar } = overlay;

  if (!isMindmeshOverlayRoute(pathname)) return null;

  return (
    <>
      {showSensorBar && <SensorBarSpotlight showTooltip={false} />}
      {showMascot && <MascotChatbot showTooltip={false} />}
    </>
  );
}
