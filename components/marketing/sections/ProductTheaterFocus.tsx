import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { FocusTheaterDemo, TheaterScrollSection } from '@/components/marketing/theater';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

export function ProductTheaterFocus() {
  return (
    <MarketingSection
      id="focus"
      title="What matters for right now."
      subtitle="Ranked signals across your apps narrow to a clear next focus, with a clear reason why."
      withDivider
      compactTop
    >
      <TheaterScrollSection
        theaterId="focus"
        caption={THEATER_DEMO_FIXTURES.focus.caption}
        footer={
          <p>
            <Link
              href="/yesterdays-narrative"
              className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
            >
              See daily narrative →
            </Link>
          </p>
        }
      >
        <FocusTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
