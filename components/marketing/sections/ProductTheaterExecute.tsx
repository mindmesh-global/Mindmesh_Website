import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { ExecuteTheaterDemo, TheaterScrollSection } from '@/components/marketing/theater';
import { THEATER_DEMO_FIXTURES } from '@/lib/marketing-demo-data';

export function ProductTheaterExecute() {
  return (
    <MarketingSection
      id="execute"
      title="MindMesh prepares the work. You stay in control."
      subtitle="Draft, schedule, and stage task updates in one place. Sends and writes wait for your approval."
      withDivider
    >
      <TheaterScrollSection
        theaterId="execute"
        caption={THEATER_DEMO_FIXTURES.execute.caption}
        footer={
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
        }
      >
        <ExecuteTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
