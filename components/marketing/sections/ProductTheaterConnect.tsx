'use client';

import Link from 'next/link';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { ProductFrame } from '@/components/marketing/theater/ProductFrame';
import { TheaterMobilePeek } from '@/components/marketing/theater/TheaterMobilePeek';
import { TheaterScrollSection } from '@/components/marketing/theater/TheaterScrollSection';
import { ConnectTheaterDemo } from '@/components/marketing/theater/demos/ConnectTheaterDemo';
import {
  CONNECTED_APP_FIXTURES_ACME,
  THEATER_DEMO_FIXTURES,
} from '@/lib/marketing-demo-data';

const connectFooter = (
  <p>
    <Link
      href="/connected-apps"
      className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
    >
      Explore connected apps →
    </Link>
  </p>
);

/**
 * Connect theater: static Linear-style zoomed peek on phone; scroll scrub on md+.
 */
export function ProductTheaterConnect() {
  const caption = THEATER_DEMO_FIXTURES.connect.caption;

  return (
    <MarketingSection
      id="connect"
      title="Bring every app into one place."
      subtitle="Connect the tools you already use. MindMesh reads them as sources, without replacing them."
      withDivider
      compactTop
    >
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
        >
          <ConnectTheaterDemo />
        </TheaterScrollSection>
      </div>
    </MarketingSection>
  );
}
