'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { SensorWindowsWrapper } from '@/components/marketing/theater/SensorWindowsWrapper';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { SENSOR_CALC_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';

const SensorCalcTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/SensorCalcTheaterDemo').then((mod) => ({
      default: mod.SensorCalcTheaterDemo,
    })),
  { ssr: false }
);

export function ProductTheaterSensorCalc() {
  return (
    <MarketingSection
      id="sensor-calc-theater"
      title="Quick answers, not another tab."
      subtitle="Type a calculation, unit conversion, or quick lookup — Sensor answers in the bar without opening anything new."
      className="relative isolate"
      compactTop
    >
      <SensorWindowsWrapper>
        <SensorCalcTheaterDemo />
      </SensorWindowsWrapper>

      <div className="mm-content mt-6">
        <p className="text-sm text-mm-on-surface-variant">
          {SENSOR_CALC_THEATER_FIXTURES.caption}
        </p>
      </div>
    </MarketingSection>
  );
}
