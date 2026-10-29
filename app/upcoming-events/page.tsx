import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import { EventsSceneWrapper } from './EventsSceneWrapper';

const pageDescription =
  "See what's coming across every client's calendar — before it owns your day. MindMesh surfaces upcoming meetings with the context you need to walk in prepared.";

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
    title: "Every client's calendar, one view",
    description:
      'Connect Google Calendar and Outlook Calendar for each client. MindMesh shows your full day across all accounts — no switching between calendar apps.',
  },
  {
    title: 'Conflict detection across clients',
    description:
      'When two meetings overlap across different client calendars, MindMesh flags it automatically so you can resolve it before it becomes a problem.',
  },
  {
    title: 'Context before the call',
    description:
      "Each meeting sits alongside the email threads and Jira context that are relevant to it. You know what the call is really about before it starts.",
  },
  {
    title: 'Create, update, and block — from within MindMesh',
    description:
      'MindMesh can create new events, update existing ones, and block prep time — all staged for your approval before anything changes in your calendar. No need to open the calendar app.',
  },
] as const;

export default function UpcomingEventsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Upcoming events"
      title="Know what's coming — before it owns your day."
      subtitle="MindMesh reads every client's calendar and surfaces your upcoming meetings with the context you need to walk in prepared."
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Every meeting, across every client.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              As a fractional professional you might have a Google Calendar for one client and
              Outlook Calendar for another. MindMesh reads them both so your full day is visible in
              one place — with automatic conflict detection across client calendars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/connected-apps"
                className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
              >
                See connected apps
              </Link>
              <Link
                href={MARKETING_CTA_HREF}
                className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
              >
                Download MindMesh
              </Link>
            </div>
          </div>

          {/* Animated events demo */}
          <div
            data-light-window=""
            className="overflow-hidden rounded-xl p-4 md:p-5"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              minHeight: '400px',
            }}
          >
            <EventsSceneWrapper />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built for professionals who work across multiple clients.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Most calendar tools are built for one company. MindMesh Upcoming Events is built for
            the reality of fractional work — multiple clients, multiple calendars, zero surprises.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilityCards.map(({ title, description }) => (
              <div
                key={title}
                data-light-window=""
                className="rounded-xl p-6"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow:
                    '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                }}
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
            Read-only. Approval-gated writes.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Calendar connections are read-only by default. When MindMesh stages a calendar
            block or event update, it waits in an approval queue — nothing changes in your
            calendar until you confirm it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
