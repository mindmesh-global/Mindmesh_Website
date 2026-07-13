'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { TheaterScrollSection } from '@/components/marketing/theater';
import {
  SENSOR_CALC_THEATER_FIXTURES,
  SENSOR_CALC_THEATER_SECTION,
} from '@/lib/marketing-sensor-mascot-content';

const SensorCalcTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/SensorCalcTheaterDemo').then((mod) => ({
      default: mod.SensorCalcTheaterDemo,
    })),
  { ssr: false }
);

/**
 * Sensor calc depth-page scroll theater (P10-T04).
 * Second scrub story after Open Cal; theaterId sensorCalc.
 */
export function ProductTheaterSensorCalc() {
  const theater = SENSOR_CALC_THEATER_SECTION;

  return (
    <MarketingSection
      id="sensor-calc-theater"
      title={theater.title}
      subtitle={theater.subtitle}
      className="relative isolate"
    >
      <TheaterScrollSection
        theaterId="sensorCalc"
        caption={SENSOR_CALC_THEATER_FIXTURES.caption}
        footer={
          <p>
            <Link
              href={theater.footer.href}
              className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
            >
              {theater.footer.label}
            </Link>
          </p>
        }
      >
        <SensorCalcTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
