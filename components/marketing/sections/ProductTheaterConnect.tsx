import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { ConnectTheaterDemo, TheaterScrollSection } from '@/components/marketing/theater';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

export function ProductTheaterConnect() {
  return (
    <MarketingSection
      id="connect"
      title="Bring every app into one place."
      subtitle="Connect the tools you already use. MindMesh reads them as sources, without replacing them."
      withDivider
      compactTop
    >
      <TheaterScrollSection
        theaterId="connect"
        caption={THEATER_DEMO_FIXTURES.connect.caption}
        footer={
          <p>
            <Link
              href="/connected-apps"
              className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
            >
              Explore connected apps →
            </Link>
          </p>
        }
      >
        <ConnectTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
