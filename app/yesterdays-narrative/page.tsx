import type { Metadata } from 'next';
import Link from 'next/link';
import { NarrativeSceneWrapper } from './NarrativeSceneWrapper';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';


const pageDescription =
  "Yesterday's Narrative writes a structured recap of your day — highlights, decisions, open loops, all linked to their sources. The professional record that writes itself.";

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
    title: 'Highlights with evidence',
    description:
      'Up to 8 key moments from the day, each linked back to the email, Slack thread, or calendar event that made it matter. Nothing asserted without a source.',
  },
  {
    title: 'Decisions, blockers, open loops',
    description:
      'Structured sections for what was decided, what is blocked (with risk level and mitigation), and what threads are still waiting — not buried in a summary paragraph.',
  },
  {
    title: 'Browsable history',
    description:
      'Every day is stored and searchable. Go back two weeks, two months, or further. When performance review season arrives, the record is already written.',
  },
  {
    title: 'Activity by topic',
    description:
      'Time bucketed by area of work — meetings, client work, deep work — with counts for emails, events, Slack messages, and Jira tasks. An honest picture of where the day actually went.',
  },
] as const;

export default function YesterdaysNarrativePage() {
  return (
    <MarketingDepthLayout
      eyebrow="Yesterday's narrative"
      title="Your work, journaled. Every day."
      subtitle="MindMesh writes a structured recap of your day across every client — so three months from now, when you need to remember what you shipped, who you unblocked, and what's still open, it's all there."
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Not a log. Your work story, written.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Most tools give you a raw feed of activity. MindMesh reads across your connected apps
              and at the end of each day writes a structured journal — what moved, what was decided,
              and what&apos;s still open. So when you need to look back months later, you won&apos;t
              be piecing together fragments. It&apos;s already written.
            </p>
            <p className="mt-8">
              <Link
                href={MARKETING_CTA_HREF}
                className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
              >
                Download MindMesh
              </Link>
            </p>
          </div>
          <div
            data-light-window=""
            className="overflow-hidden rounded-xl p-4 md:p-5"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
          >
            <NarrativeSceneWrapper />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Everything a day produces, structured.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Not just a summary — a complete daily record across every source, with the structure
            needed to actually use it later.
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
                <h3 className="font-display text-lg font-semibold text-mm-on-background">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              The professional record that writes itself.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Every quarter, fractional leaders face the same problem: what did I actually do for
              this client? What did I ship? What did I unblock? What decisions did I make? Most
              professionals spend hours reconstructing this from scattered emails and notes.
            </p>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Yesterday&apos;s Narrative does it automatically. Every working day generates a
              structured record — highlights, decisions, open loops — each linked to its source. By
              the time your quarterly review arrives, ninety days of detailed professional records
              are already written.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {[
              { stat: '90 days', label: 'of structured daily records by the end of a quarter' },
              { stat: 'All sources', label: 'read and synthesised into one narrative per day' },
              { stat: 'Every claim', label: 'linked back to its source — email, event, or thread' },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                data-light-window=""
                className="rounded-xl px-6 py-4"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow:
                    '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                }}
              >
                <p className="font-display text-2xl font-bold text-mm-on-background">{stat}</p>
                <p className="mt-0.5 text-sm text-mm-on-surface-variant">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Private by design.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Yesterday&apos;s Narrative is built on the same local-first architecture as the rest of
            MindMesh: your daily records are stored on your device, not uploaded to a cloud server.
            Your professional history is yours.
          </p>
          <p className="mt-8">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
          </p>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
