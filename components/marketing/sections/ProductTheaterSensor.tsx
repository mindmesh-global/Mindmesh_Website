'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { TheaterScrollSection } from '@/components/marketing/theater';
import { SENSOR_PAGE_CONTENT, SENSOR_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';

const SensorTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/SensorTheaterDemo').then((mod) => ({
      default: mod.SensorTheaterDemo,
    })),
  { ssr: false }
);

/**
 * Sensor depth-page scroll theater (P8-T10).
 * Demo is dynamically imported so it does not block first paint of the H1.
 */
export function ProductTheaterSensor() {
  const { theater } = SENSOR_PAGE_CONTENT;

  return (
    <MarketingSection
      id="sensor-theater"
      title={theater.title}
      subtitle={theater.subtitle}
      className="relative isolate"
    >
      <TheaterScrollSection
        theaterId="sensor"
        caption={SENSOR_THEATER_FIXTURES.caption}
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
        <SensorTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
