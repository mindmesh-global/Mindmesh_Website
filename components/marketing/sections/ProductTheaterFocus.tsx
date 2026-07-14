'use client';

import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollProvider } from '@/components/marketing/theater/TheaterScrollContext';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { FocusTheaterDemo } from '@/components/marketing/theater/demos/FocusTheaterDemo';
import { useStaticTheaterScroll } from '@/components/marketing/theater/useStaticTheaterScroll';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

const focusFooter = (
  <p>
    <Link
      href="/yesterdays-narrative"
      className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
    >
      See daily narrative →
    </Link>
  </p>
);

/**
 * Focus theater: static Linear-style zoomed peek on phone; scroll scrub on md+.
 */
export function ProductTheaterFocus() {
  const caption = THEATER_DEMO_FIXTURES.focus.caption;
  const staticScroll = useStaticTheaterScroll('focus', 1);

  return (
    <MarketingSection
      id="focus"
      title="What matters for right now."
      subtitle="Ranked signals across your apps narrow to a clear next focus, with a clear reason why."
      withDivider
      compactTop
    >
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
        >
          <FocusTheaterDemo />
        </TheaterScrollSection>
      </div>
    </MarketingSection>
  );
}
