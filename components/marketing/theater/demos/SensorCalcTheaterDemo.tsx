'use client';

import { useEffect, useRef, useState } from 'react';
import { MarketingSensorCalcPanel } from '@/components/marketing/theater/marketing/MarketingSensorCalcPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SENSOR_CALC_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import { getSensorCalcVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

const AUTO_PLAY_DURATION_MS = 4000;

export function SensorCalcTheaterDemo() {
  const scroll = useTheaterScroll();
  const { isPaused, step } = scroll;
  const [autoProgress, setAutoProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      startTimeRef.current = null;
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      return;
    }
    if (startTimeRef.current === null) startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - (startTimeRef.current ?? now)) / AUTO_PLAY_DURATION_MS);
      setAutoProgress(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); } else { rafRef.current = null; }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [isPaused]);

  const effectiveProgress = Math.max(scroll.progress, autoProgress);
  const visual = getSensorCalcVisualStateFromProgress(
    effectiveProgress,
    SENSOR_CALC_THEATER_FIXTURES.query
  );

  return (
    <div
      className="relative min-h-[280px]"
      data-sensor-calc-theater-demo
      data-sensor-calc-theater-paused={isPaused ? 'true' : 'false'}
      data-sensor-calc-theater-step={step}
      data-sensor-calc-scroll-progress={effectiveProgress.toFixed(3)}
      data-sensor-calc-hold={visual.showHold ? 'true' : 'false'}
    >
      <MarketingSensorCalcPanel
        queryCharIndex={visual.queryCharIndex}
        resolveOpacity={visual.resolveOpacity}
        resultMotion={visual.resultMotion}
        secondaryOpacity={visual.secondaryOpacity}
      />
    </div>
  );
}
