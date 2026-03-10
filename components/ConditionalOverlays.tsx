'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MascotChatbot from '@/components/MascotChatbot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import IntroGreetingTooltip from '@/components/IntroGreetingTooltip';
import DropdownOverlayTooltip from '@/components/DropdownOverlayTooltip';
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

  // Prevent user scroll during mascot tour (so programmatic scroll works) but allow programmatic scroll
  useEffect(() => {
    if (!overlay?.mascotTooltipVisible) return;
    const preventScroll = (e: WheelEvent) => e.preventDefault();
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    return () => document.body.removeEventListener('wheel', preventScroll);
  }, [overlay?.mascotTooltipVisible]);

  if (!overlay || !onboarding) return null;
  const { showMascot, showSensorBar, activeWindowType } = overlay;

  const isMindmeshPage = pathname && MINDMESH_PAGES.includes(pathname);
  const isMindmeshWindowOnTop = pathname !== '/' || activeWindowType === 'home';
  const showTooltips = Boolean(isMindmeshPage && isTabVisible && isMindmeshWindowOnTop);
  const showMascotTooltip = showTooltips && onboarding.introCompleted && !onboarding.mascotTourCompleted;
  const showSensorBarTooltip = Boolean(showSensorBar && showTooltips && onboarding.mascotTourCompleted && !onboarding.sensorBarCompleted);
  const showDropdownTooltip = Boolean(showTooltips && onboarding.sensorBarCompleted && !onboarding.dropdownTooltipCompleted);

  if (!isMindmeshPage) return null;

  return (
    <>
      {pathname === '/' && <IntroGreetingTooltip />}
      {showSensorBar && showTooltips && <SensorBarSpotlight showTooltip={showSensorBarTooltip} />}
      {showDropdownTooltip && <DropdownOverlayTooltip />}
      {showMascot && <MascotChatbot showTooltip={showMascotTooltip} />}
    </>
  );
}
