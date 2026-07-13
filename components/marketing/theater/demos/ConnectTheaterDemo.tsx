'use client';

import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { CONNECTED_APP_FIXTURES_ACME } from '@/lib/marketing-demo-data';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';

/**
 * Scroll-driven Connect theater demo (P4-T02).
 * Consumes TheaterScrollProvider progress; animates via transform/opacity only.
 */
export function ConnectTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();

  return (
    <div
      data-connect-theater-demo
      data-connect-theater-paused={isPaused ? 'true' : 'false'}
      data-connect-theater-step={step}
    >
      <StaticConnectedApps
        variant="marketing"
        apps={CONNECTED_APP_FIXTURES_ACME}
        scrollProgress={progress}
      />
    </div>
  );
}
