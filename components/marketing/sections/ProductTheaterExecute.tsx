'use client';

import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollProvider } from '@/components/marketing/theater/TheaterScrollContext';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { ExecuteTheaterDemo } from '@/components/marketing/theater/demos/ExecuteTheaterDemo';
import { useStaticTheaterScroll } from '@/components/marketing/theater/useStaticTheaterScroll';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

const executeFooter = (
  <div className="mt-10 flex justify-center gap-4">
    <Link
      href="/inbox"
      className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
    >
      Open inbox
    </Link>
    <Link
      href="/upcoming-events"
      className="inline-flex items-center gap-2 rounded-md border border-mm-outline-variant px-5 py-2.5 text-sm font-medium text-mm-on-background transition-colors hover:border-mm-outline"
    >
      Upcoming events
    </Link>
  </div>
);

export function ProductTheaterExecute() {
  const caption = THEATER_DEMO_FIXTURES.execute.caption;
  const staticScroll = useStaticTheaterScroll('execute', 1);

  return (
    <section id="execute" className="bg-mm-background pt-10 pb-10 lg:pt-12 lg:pb-12">
      <div className="mm-content">
        <h2 className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl">
          MindMesh prepares the work. You stay in control.
        </h2>
        <p className="mt-4 max-w-[640px] text-lg text-mm-on-surface-variant lg:text-xl">
          Draft, schedule, and stage task updates in one place. Sends and writes wait for your approval.
        </p>

        <div className="mt-10">
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
              lightWindow
              noSticky
            >
              <ExecuteTheaterDemo />
            </TheaterScrollSection>
          </div>
        </div>
      </div>

      <MarketingSectionDivider className="mt-12 lg:mt-16" />
    </section>
  );
}
