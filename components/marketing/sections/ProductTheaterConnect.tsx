'use client';

import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { ConnectTheaterDemo } from '@/components/marketing/theater/demos/ConnectTheaterDemo';
import {
  CONNECTED_APP_FIXTURES_ACME,
  THEATER_DEMO_FIXTURES,
} from '@/lib/marketing-demo-data';

const connectFooter = (
  <div className="mt-10 flex justify-center">
    <Link
      href="/connected-apps"
      className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
    >
      Explore connected apps
    </Link>
  </div>
);

/**
 * Connect theater: static peek on phone; auto-play on md+.
 * Inlines its own section padding for full bottom-gap control.
 */
export function ProductTheaterConnect() {
  const caption = THEATER_DEMO_FIXTURES.connect.caption;

  return (
    <section id="connect" className="bg-mm-background pt-10 pb-10 lg:pt-12 lg:pb-12">
      <div className="mm-content">
        <h2 className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl">
          Stay on top of everything, without the mental overload.
        </h2>
        <p className="mt-4 max-w-[640px] text-lg text-mm-on-surface-variant lg:text-xl">
          MindMesh connects to the tools you already use, reads across all of them, and surfaces what matters — so you never have to prompt it, chase it, or babysit it.
        </p>

        <div className="mt-10">
          <TheaterMobilePeek
            caption={caption}
            footer={connectFooter}
            frameHeightPx={640}
          >
            <ProductFrame sticky={false}>
              <StaticConnectedApps
                variant="marketing"
                apps={CONNECTED_APP_FIXTURES_ACME}
                scrollProgress={1}
              />
            </ProductFrame>
          </TheaterMobilePeek>

          <div className="hidden md:block">
            <TheaterScrollSection
              theaterId="connect"
              caption={caption}
              footer={connectFooter}
              lightWindow
              noSticky
            >
              <ConnectTheaterDemo />
            </TheaterScrollSection>
          </div>
        </div>
      </div>
      <MarketingSectionDivider className="mt-12 lg:mt-16" />
    </section>
  );
}
