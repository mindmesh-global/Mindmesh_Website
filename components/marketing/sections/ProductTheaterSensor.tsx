'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { SensorDesktopWrapper } from '@/components/marketing/theater/SensorDesktopWrapper';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { SENSOR_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';

const SensorTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/SensorTheaterDemo').then((mod) => ({
      default: mod.SensorTheaterDemo,
    })),
  { ssr: false }
);

export function ProductTheaterSensor() {
  return (
    <MarketingSection
      id="sensor-theater"
      title="Ask anything. Act instantly."
      subtitle="Sensor opens over any app with a global shortcut — type a command, get an answer, return to what you were doing."
      className="relative isolate"
      compactTop
    >
      <SensorDesktopWrapper>
        <SensorTheaterDemo />
      </SensorDesktopWrapper>

      <div className="mm-content mt-6">
        <p className="text-sm text-mm-on-surface-variant">
          {SENSOR_THEATER_FIXTURES.caption}
        </p>
      </div>
    </MarketingSection>
  );
}
