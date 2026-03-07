'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MascotChatbot from '@/components/MascotChatbot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import IntroGreetingTooltip from '@/components/IntroGreetingTooltip';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';

const MINDMESH_PAGES = ['/', '/dashboard'];

export default function ConditionalOverlays() {
  const overlay = useUIOverlay();
  const onboarding = useOnboardingTour();
  const pathname = usePathname();
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (overlay && pathname && !MINDMESH_PAGES.includes(pathname)) {
      overlay.setHasScrolledToBottom(false);
    }
  }, [pathname, overlay]);

  if (!overlay || !onboarding) return null;
  const { showMascot, showSensorBar, activeWindowType } = overlay;

  const isMindmeshPage = pathname && MINDMESH_PAGES.includes(pathname);
  const isMindmeshWindowOnTop = pathname !== '/' || activeWindowType === 'home';
  const showTooltips = Boolean(isMindmeshPage && isTabVisible && isMindmeshWindowOnTop);
  const showMascotTooltip = showTooltips && onboarding.introCompleted && !onboarding.mascotTourCompleted;
  const showSensorBarTooltip = Boolean(showSensorBar && showTooltips && onboarding.mascotTourCompleted && !onboarding.sensorBarCompleted);

  if (!isMindmeshPage) return null;

  return (
    <>
      {pathname === '/' && <IntroGreetingTooltip />}
      {showSensorBar && showTooltips && <SensorBarSpotlight showTooltip={showSensorBarTooltip} />}
      {showMascot && <MascotChatbot showTooltip={showMascotTooltip} />}
    </>
  );
}
