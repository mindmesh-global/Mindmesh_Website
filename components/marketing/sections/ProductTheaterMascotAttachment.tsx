'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { TheaterScrollSection } from '@/components/marketing/theater';
import {
  MASCOT_ATTACHMENT_THEATER_FIXTURES,
  MASCOT_ATTACHMENT_THEATER_SECTION,
} from '@/lib/marketing-sensor-mascot-content';

const MascotAttachmentTheaterDemo = dynamic(
  () =>
    import('@/components/marketing/theater/demos/MascotAttachmentTheaterDemo').then(
      (mod) => ({
        default: mod.MascotAttachmentTheaterDemo,
      })
    ),
  { ssr: false }
);

/**
 * Mascot attachment-search depth-page scroll theater (P10-T07).
 * Second scrub story after email-count; theaterId mascotAttachment.
 */
export function ProductTheaterMascotAttachment() {
  const theater = MASCOT_ATTACHMENT_THEATER_SECTION;

  return (
    <MarketingSection
      id="mascot-attachment-theater"
      title={theater.title}
      subtitle={theater.subtitle}
      className="relative isolate"
    >
      <TheaterScrollSection
        theaterId="mascotAttachment"
        caption={MASCOT_ATTACHMENT_THEATER_FIXTURES.caption}
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
        <MascotAttachmentTheaterDemo />
      </TheaterScrollSection>
    </MarketingSection>
  );
}
