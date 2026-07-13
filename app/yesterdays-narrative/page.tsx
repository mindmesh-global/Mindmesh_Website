import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/yesterdays-narrative'];

const pageDescription =
  'A clear recap of yesterday so you start today with context, not clutter. MindMesh turns the prior day into a structured narrative you can trust.';

export const metadata: Metadata = {
  title: "Yesterday's Narrative",
  description: pageDescription,
  openGraph: {
    title: "MindMesh | Yesterday's Narrative",
    description: pageDescription,
    url: 'https://mindmesh.global/yesterdays-narrative',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MindMesh | Yesterday's Narrative",
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const capabilityCards = [
  {
    title: 'The arc of the day',
    description:
      'See what moved across email, meetings, and open threads in one short read, not a firehose of raw activity.',
  },
  {
    title: 'What is still open',
    description:
      'Surface unfinished replies, pending decisions, and follow-ups so today starts with clarity instead of residue.',
  },
  {
    title: 'Highlights, not noise',
    description:
      'Keep the signal: the threads and meetings that actually defined yesterday, without every ping competing for attention.',
  },
  {
    title: 'Context for Focus',
    description:
      "Yesterday's Narrative feeds the same Prioritize path as Focus: one clear picture of what mattered, then what to do next.",
  },
] as const;

export default function YesterdaysNarrativePage() {
  return (
    <MarketingDepthLayout
      eyebrow="Daily narrative"
      title="A clear recap of yesterday"
      subtitle="So you start today with context, not clutter. MindMesh turns the previous day into a structured narrative you can trust."
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Yesterday summary without the inbox crawl.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Turn yesterday&apos;s noise into a structured recap: what moved, what is still open, and
              what deserves your attention today, without drowning in raw activity.
            </p>
            <p className="mt-8">
              <Link
                href="/inbox"
                className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Explore Inbox →
              </Link>
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container shadow-mm-elevated">
            <Image
              src="/images/yesterdays-narrative-mockup.png"
              alt="Yesterday's Narrative card: day summary, emails, events, highlights, and todos"
              width={560}
              height={420}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Designed for real memory, not more overload.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Most tools show a firehose of activity. MindMesh helps you understand it: a calmer,
            human-shaped summary so you remember the arc of the day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilityCards.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6"
              >
                <h3 className="font-display text-lg font-semibold text-mm-on-background">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Private by design.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Yesterday&apos;s Narrative is built on the same local-first architecture as the rest of
            MindMesh: organize and retrieve your work context with care, without turning your day into
            a data product.
          </p>
          <p className="mt-8">
            <Link
              href="/security"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Learn about security →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Start today with context, not clutter.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Join the waitlist for early access to MindMesh, the cognitive layer for modern work.
          </p>
          <p className="mt-8">
            <Link
              href={MARKETING_CTA_HREF}
              className="inline-flex rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Join waitlist
            </Link>
          </p>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
