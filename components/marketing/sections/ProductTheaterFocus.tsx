'use client';

import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollProvider } from '@/components/marketing/theater/TheaterScrollContext';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { FocusTheaterDemo } from '@/components/marketing/theater/demos/FocusTheaterDemo';
import { useStaticTheaterScroll } from '@/components/marketing/theater/useStaticTheaterScroll';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

const focusFooter = (
  <div className="mt-10 flex justify-center">
    <Link
      href="/yesterdays-narrative"
      className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
    >
      See daily narrative
    </Link>
  </div>
);

export function ProductTheaterFocus() {
  const caption = THEATER_DEMO_FIXTURES.focus.caption;
  const staticScroll = useStaticTheaterScroll('focus', 1);

  return (
    <section id="focus" className="bg-mm-background pt-10 pb-10 lg:pt-12 lg:pb-12">
      <div className="mm-content">
        <h2 className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl">
          What matters for right now.
        </h2>
        <p className="mt-4 max-w-[640px] text-lg text-mm-on-surface-variant lg:text-xl">
          Ranked signals across your apps narrow to a clear next focus, with a clear reason why.
        </p>

        <div className="mt-10">
          <TheaterMobilePeek caption={caption} footer={focusFooter} frameHeightPx={600}>
            <ProductFrame sticky={false}>
              <TheaterScrollProvider value={staticScroll}>
                <FocusTheaterDemo forceFinal />
              </TheaterScrollProvider>
            </ProductFrame>
          </TheaterMobilePeek>

          <div className="hidden md:block">
            <TheaterScrollSection
              theaterId="focus"
              caption={caption}
              footer={focusFooter}
              lightWindow
              noSticky
            >
              <FocusTheaterDemo />
            </TheaterScrollSection>
          </div>
        </div>
      </div>

      <MarketingSectionDivider className="mt-12 lg:mt-16" />
    </section>
  );
}
