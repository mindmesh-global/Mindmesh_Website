import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/upcoming-events'];

const pageDescription =
  'See what is ahead before it takes over your afternoon. MindMesh gives you a clear view of upcoming meetings and commitments so you can prepare, not scramble.';

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Upcoming Events',
    description: pageDescription,
    url: 'https://mindmesh.global/upcoming-events',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Upcoming Events',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const capabilityCards = [
  {
    title: 'What is next, at a glance',
    description:
      'Scan the meetings and commitments that will shape your afternoon without opening every calendar tab.',
  },
  {
    title: 'Context before the call',
    description:
      'Upcoming events sit next to inbox and priority signals so you know why a meeting matters before it starts.',
  },
  {
    title: 'Prep that Execute can act on',
    description:
      'The same calendar context that powers Focus also feeds Execute: block prep time, draft the reply, show up ready.',
  },
  {
    title: 'Clarity over cognitive load',
    description:
      'A crystalline view of what is ahead, designed for mental clarity instead of another dense calendar wall.',
  },
] as const;

export default function UpcomingEventsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Upcoming events"
      title="See what is ahead before it takes over your afternoon"
      subtitle="MindMesh gives you a clear view of upcoming meetings and commitments so you can prepare, not scramble."
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Calendar intelligence built for focus.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Connected calendars surface the next meetings that matter. Pair them with inbox and
              priority context so the day stays intentional instead of reactive.
            </p>
            <p className="mt-8">
              <Link
                href="/connected-apps"
                className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Connect your calendars →
              </Link>
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container shadow-mm-elevated">
            <Image
              src="/images/upcoming-events-mockup.png"
              alt="MindMesh Upcoming Events: next meetings and commitments in a clear schedule view"
              width={1200}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built for Prioritize and Execute.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Upcoming events are not a separate calendar app. They are part of the same cognitive
            layer that finds your one priority and helps you get it done.
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
            Calendar connections use the same local-first, privacy-conscious architecture as the
            rest of MindMesh. Organize and retrieve schedule context with care.
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
            Know what is ahead. Get it done.
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
