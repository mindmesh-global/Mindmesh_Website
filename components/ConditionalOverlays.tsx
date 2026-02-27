'use client';

import CatMascot from '@/components/CatMascot';
import SensorBarSpotlight from '@/components/SensorBarSpotlight';
import { useUIOverlay } from '@/context/UIOverlayContext';

export default function ConditionalOverlays() {
  const overlay = useUIOverlay();
  if (!overlay) return null;
  const { showMascot, showSensorBar } = overlay;
  return (
    <>
      {showSensorBar && <SensorBarSpotlight />}
      {showMascot && <CatMascot />}
    </>
  );
}
