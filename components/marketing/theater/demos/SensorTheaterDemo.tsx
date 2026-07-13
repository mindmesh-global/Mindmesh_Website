'use client';

import { MarketingSensorPanel } from '@/components/marketing/theater/marketing/MarketingSensorPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SENSOR_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import { getSensorVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Sensor theater demo (P8-T09).
 * Idle → type Open Cal → results → Calendar highlight → confirm chip.
 * Motion: transform + opacity only. No SensorBarSpotlight / Lottie.
 */
export function SensorTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getSensorVisualStateFromProgress(
    progress,
    SENSOR_THEATER_FIXTURES.query,
    SENSOR_THEATER_FIXTURES.results.length
  );

  return (
    <div
      className="relative min-h-[280px]"
      data-sensor-theater-demo
      data-sensor-theater-paused={isPaused ? 'true' : 'false'}
      data-sensor-theater-step={step}
      data-sensor-scroll-progress={progress.toFixed(3)}
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
