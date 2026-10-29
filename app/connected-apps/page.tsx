import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_CTA_HREF } from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'MindMesh reads Gmail, Google Calendar, Outlook, SMTP, Slack, and Jira as sources across every client you work with — without replacing any of them.';

export const metadata: Metadata = {
  title: 'Connected Apps',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Connected Apps',
    description: pageDescription,
    url: 'https://mindmesh.global/connected-apps',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Connected Apps',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

type AppEntry = {
  id: string;
  displayName: string;
  category: string;
  iconSrc: string;
  description: string;
  reads: string;
  permission: 'Read-only' | 'Read + Write';
};

const APP_LIBRARY: readonly AppEntry[] = [
  {
    id: 'gmail',
    displayName: 'Gmail',
    category: 'Email',
    iconSrc: '/images/icons/gmail.png',
    description: 'Reads your inbox, sent mail, and threads. Surfaces unread messages, detects tone, and prepares draft replies and sends for your approval.',
    reads: 'Emails, threads, sender context',
    permission: 'Read + Write',
  },
  {
    id: 'outlook-email',
    displayName: 'Outlook Email',
    category: 'Email',
    iconSrc: '/images/icons/outlook.png',
    description: 'Reads your Outlook inbox across every client account and supports replies, sends, and forwards. Nothing sends until you approve it.',
    reads: 'Emails, threads, folders',
    permission: 'Read + Write',
  },
  {
    id: 'smtp',
    displayName: 'SMTP Mailbox',
    category: 'Email',
    iconSrc: '/images/icons/smtp.png',
    description: 'Connect any SMTP-compatible inbox — custom domains, business email, or shared inboxes. Supports replies and sends with your approval.',
    reads: 'Emails, threads',
    permission: 'Read + Write',
  },
  {
    id: 'google-calendar',
    displayName: 'Google Calendar',
    category: 'Calendar',
    iconSrc: '/images/icons/google-calendar.png',
    description: 'Reads your schedule, detects meeting conflicts, and stages calendar creates, updates, and deletes for your approval.',
    reads: 'Events, attendees, conflicts',
    permission: 'Read + Write',
  },
  {
    id: 'outlook-calendar',
    displayName: 'Outlook Calendar',
    category: 'Calendar',
    iconSrc: '/images/icons/outlook-calendar.png',
    description: 'Reads your Outlook calendar and supports event creates, updates, and responses via Microsoft Graph — with your approval before anything changes.',
    reads: 'Events, meetings, conflicts',
    permission: 'Read + Write',
  },
  {
    id: 'slack',
    displayName: 'Slack',
    category: 'Messaging',
    iconSrc: '/images/icons/slack.png',
    description: 'Reads channel messages, threads, and DMs across every Slack workspace you connect. Each workspace is kept in its own client lane.',
    reads: 'Messages, threads, channels',
    permission: 'Read-only',
  },
  {
    id: 'jira',
    displayName: 'Jira',
    category: 'Tasks',
    iconSrc: '/images/icons/jira.png',
    description: 'Reads issues, comments, and status updates. Surfaces tickets that need action and tracks what needs your attention across every client project.',
    reads: 'Issues, comments, status',
    permission: 'Read-only',
  },
] as const;

const CATEGORIES = ['Email', 'Calendar', 'Messaging', 'Tasks'] as const;

export default function ConnectedAppsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Connected apps"
      title="Every client's stack. One reading layer."
      subtitle="MindMesh reads your email, calendar, Slack, and Jira across every client you work with — without replacing any of them."
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">

          {CATEGORIES.map((category) => {
            const apps = APP_LIBRARY.filter((a) => a.category === category);
            if (!apps.length) return null;
            return (
              <div key={category} className="mb-14 last:mb-0">
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-mm-on-surface-variant">
                  {category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      data-light-window=""
                      className="flex flex-col rounded-xl p-5"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(0,0,0,0.18)',
                        boxShadow:
                          '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ background: '#f2f2f7', border: '1px solid #e0e0e5' }}>
                          <Image
                            src={app.iconSrc}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-semibold text-mm-on-background">{app.displayName}</p>
                          <p className="text-xs text-mm-on-surface-variant">{app.category}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-mm-on-surface-variant">
                        {app.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4" style={{ borderColor: '#e0e0e5' }}>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: '#f2f2f7', color: '#3a3a3c' }}>
                          Reads: {app.reads}
                        </span>
                        <span
                          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                          style={
                            app.permission === 'Read-only'
                              ? { background: '#e3f0ff', color: '#0066cc' }
                              : { background: '#f0faf0', color: '#1a7a1a' }
                          }
                        >
                          {app.permission}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="mt-10 text-sm text-mm-on-surface-variant">
            More integrations added regularly.
          </p>
        </div>
      </section>

      <section className="bg-mm-background border-t border-mm-outline-variant/40 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Read-only by default. Private by design.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Connections use read-only access where it matters. Where writes are possible (drafts,
            calendar blocks, Jira updates), nothing changes until you approve it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
            <Link
              href={MARKETING_CTA_HREF}
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Download MindMesh
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
