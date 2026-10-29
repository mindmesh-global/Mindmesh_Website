'use client';

import { useEffect, useRef, useState } from 'react';
import { MarketingSensorPanel } from '@/components/marketing/theater/marketing/MarketingSensorPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SENSOR_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import { getSensorVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

const AUTO_PLAY_DURATION_MS = 5000;

export function SensorTheaterDemo() {
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
  const visual = getSensorVisualStateFromProgress(
    effectiveProgress,
    SENSOR_THEATER_FIXTURES.query,
    SENSOR_THEATER_FIXTURES.results.length
  );

  return (
    <div
      className="relative min-h-[280px]"
      data-sensor-theater-demo
      data-sensor-theater-paused={isPaused ? 'true' : 'false'}
      data-sensor-theater-step={step}
      data-sensor-scroll-progress={effectiveProgress.toFixed(3)}
      data-sensor-hold={visual.showHold ? 'true' : 'false'}
    >
      <MarketingSensorPanel
        queryCharIndex={visual.queryCharIndex}
        resultMotions={visual.resultMotions}
        highlightProgress={visual.highlightProgress}
        confirmOpacity={visual.confirmOpacity}
      />
    </div>
  );
}
