'use client';

import { MarketingSensorCalcPanel } from '@/components/marketing/theater/marketing/MarketingSensorCalcPanel';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SENSOR_CALC_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import { getSensorCalcVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Sensor calc theater demo (P10-T03).
 * Idle → type 15% of 240 → Calculating… → result 36 → Open Calculator secondary.
 * Motion: transform + opacity only. No SensorBarSpotlight / Lottie.
 */
export function SensorCalcTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getSensorCalcVisualStateFromProgress(
    progress,
    SENSOR_CALC_THEATER_FIXTURES.query
  );

  return (
    <div
      className="relative min-h-[280px]"
      data-sensor-calc-theater-demo
      data-sensor-calc-theater-paused={isPaused ? 'true' : 'false'}
      data-sensor-calc-theater-step={step}
      data-sensor-calc-scroll-progress={progress.toFixed(3)}
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
