'use client';

import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollProvider } from '@/components/marketing/theater/TheaterScrollContext';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { ExecuteTheaterDemo } from '@/components/marketing/theater/demos/ExecuteTheaterDemo';
import { useStaticTheaterScroll } from '@/components/marketing/theater/useStaticTheaterScroll';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

const executeFooter = (
  <div className="flex flex-wrap gap-x-6 gap-y-2">
    <Link
      href="/inbox"
      className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
    >
      Open inbox →
    </Link>
    <Link
      href="/upcoming-events"
      className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
    >
      Upcoming events →
    </Link>
  </div>
);

/**
 * Execute theater: static Linear-style zoomed peek on phone; scroll scrub on md+.
 */
export function ProductTheaterExecute() {
  const caption = THEATER_DEMO_FIXTURES.execute.caption;
  const staticScroll = useStaticTheaterScroll('execute', 1);

  return (
    <MarketingSection
      id="execute"
      title="MindMesh prepares the work. You stay in control."
      subtitle="Draft, schedule, and stage task updates in one place. Sends and writes wait for your approval."
      withDivider
    >
      <TheaterMobilePeek caption={caption} footer={executeFooter} frameHeightPx={680}>
        <ProductFrame sticky={false}>
          <TheaterScrollProvider value={staticScroll}>
            <ExecuteTheaterDemo forceFinal />
          </TheaterScrollProvider>
        </ProductFrame>
      </TheaterMobilePeek>

      <div className="hidden md:block">
        <TheaterScrollSection
          theaterId="execute"
          caption={caption}
          footer={executeFooter}
        >
          <ExecuteTheaterDemo />
        </TheaterScrollSection>
      </div>
    </MarketingSection>
  );
}
