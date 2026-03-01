'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CatMascot from '@/components/CatMascot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import { useUIOverlay } from '@/context/UIOverlayContext';

const MINDMESH_PAGES = ['/', '/dashboard'];

export default function ConditionalOverlays() {
  const overlay = useUIOverlay();
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

  if (!overlay) return null;
  const { showMascot, showSensorBar, activeWindowType, hasScrolledToBottom } = overlay;

  const isMindmeshPage = pathname && MINDMESH_PAGES.includes(pathname);
  const isMindmeshWindowOnTop = pathname !== '/' || activeWindowType === 'home';
  const showTooltips = Boolean(isMindmeshPage && isTabVisible && isMindmeshWindowOnTop);
  const showSensorBarTooltip = Boolean(showSensorBar && showTooltips && hasScrolledToBottom);

  if (!isMindmeshPage) return null;

  return (
    <>
      {showSensorBarTooltip && <SensorBarSpotlight />}
      {showMascot && <CatMascot showTooltip={showTooltips} />}
    </>
  );
}
