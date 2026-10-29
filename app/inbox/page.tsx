import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import { InboxSceneWrapper } from './InboxSceneWrapper';

const pageDescription =
  'MindMesh brings every client email account into one place — Gmail, Outlook, and SMTP — so you can scan, filter, and reply without switching between inboxes.';

export const metadata: Metadata = {
  title: 'Inbox',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Inbox',
    description: pageDescription,
    url: 'https://mindmesh.global/inbox',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Inbox',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const capabilityCards = [
  {
    title: 'Every client inbox, one view',
    description:
      'Connect Gmail, Outlook, and SMTP accounts for each client. MindMesh reads them together so you see what arrived across all your clients without opening a single extra tab.',
  },
  {
    title: 'Filter to one client when you need to',
    description:
      'Isolate a single client\'s inbox when you need to focus on them. Switch back to the full view without losing your place.',
  },
  {
    title: 'AI-drafted replies, waiting for your approval',
    description:
      'MindMesh reads the email, understands the context, and drafts a reply using your connected memory and working style. The draft waits in an approval queue — nothing sends until you confirm it. Every client gets a response you actually reviewed.',
  },
  {
    title: 'Find any email in plain English',
    description:
      'Search across every connected account at once. No need to remember which inbox it was in or which client it came from.',
  },
] as const;

export default function InboxPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Inbox"
      title="All your client email. One place."
      subtitle="MindMesh connects every Gmail, Outlook, and SMTP account you manage and gives you one clear view — no account switching, no missed threads."
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Multiple clients. Multiple inboxes. MindMesh sees them all.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              As a fractional professional you might be managing Gmail for one client, Outlook for
              another, and a shared SMTP mailbox for a third. MindMesh reads them all in one place
              and keeps each client&apos;s threads clearly separated.
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

          {/* Animated inbox demo */}
          <div
            data-light-window=""
            className="overflow-hidden rounded-xl p-4 md:p-5"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              height: '640px',
              overflow: 'hidden',
            }}
          >
            <InboxSceneWrapper />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built for professionals who manage multiple clients.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Most email clients are built for one company. MindMesh Inbox is built for the reality of
            fractional work — multiple clients, multiple accounts, one clear picture. And when
            something needs a reply, MindMesh drafts it for you and holds it for your approval.
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
            Read-only. Private by design.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Connected email accounts are read using read-only access where it matters. Your inbox
            is indexed locally on your device — not stored on a cloud server. Nothing sends without
            your approval.
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
