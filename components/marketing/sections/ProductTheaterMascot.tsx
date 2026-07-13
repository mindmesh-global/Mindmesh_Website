'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { TheaterScrollSection } from '@/components/marketing/theater';
import { MASCOT_PAGE_CONTENT, MASCOT_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';

const MascotTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/MascotTheaterDemo').then((mod) => ({
      default: mod.MascotTheaterDemo,
    })),
  { ssr: false }
);

/**
 * Mascot depth-page scroll theater (P8-T12).
 * Demo is dynamically imported so it does not block first paint of the H1.
 */
export function ProductTheaterMascot() {
  const { theater } = MASCOT_PAGE_CONTENT;

  return (
    <MarketingSection
      id="mascot-theater"
      title={theater.title}
      subtitle={theater.subtitle}
      className="relative isolate"
    >
      <TheaterScrollSection
        theaterId="mascot"
        caption={MASCOT_THEATER_FIXTURES.caption}
        footer={
          <p>
            <Link
              href={theater.footer.href}
              className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
            >
              {theater.footer.label}
            </Link>
          </p>
        }
      >
        <MascotTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
