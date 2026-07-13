import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/connected-apps'];

const pageDescription =
  'Connect Gmail, Google Calendar, Outlook, SMTP, Slack, and Jira as sources MindMesh can read, without replacing the tools you already use.';

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

const workflowCards = [
  {
    title: 'Email and calendar in one place',
    description:
      'Bring Gmail, Outlook, and calendar context into MindMesh so you stop hopping between tabs to find what matters.',
  },
  {
    title: 'Messaging and tasks as sources',
    description:
      'Slack threads and Jira updates become signals MindMesh can read alongside email, not separate silos.',
  },
  {
    title: 'One clear priority',
    description:
      'MindMesh cuts through the noise and surfaces the single most important thing right now, with a plain-English reason why.',
  },
  {
    title: 'Act without switching apps',
    description:
      'Draft the reply, block the time, check the task off. MindMesh acts in context instead of handing you another list.',
  },
] as const;

export default function ConnectedAppsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Connectivity"
      title="Connect the tools you already use"
      subtitle="MindMesh reads your email, calendar, messaging, and tasks as sources without replacing them."
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section id="supported-apps" className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Seven sources. One cognitive layer.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Plug in the apps you already rely on. MindMesh reads them as sources so Connect,
            Prioritize, and Execute stay grounded in your real work.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {MARKETING_INTEGRATIONS.map((app) => (
              <li
                key={app.id}
                className="flex flex-col items-center gap-3 rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-5 text-center"
              >
                <Image
                  src={app.iconSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-medium text-mm-on-background">{app.displayName}</p>
                  <p className="mt-0.5 text-xs text-mm-on-surface-variant">{app.category}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-mm-on-surface-variant">
            More integrations added regularly.
          </p>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built around the way your work already moves.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Connected apps are the foundation for Focus and Execute: one priority, then the draft,
            the calendar block, and the checked-off task.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {workflowCards.map(({ title, description }) => (
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
            Access should be useful and intentional.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Supported Gmail and Google Calendar connections use read-only access where it matters.
            MindMesh is built to organize and retrieve context, not to take unnecessary control over
            your accounts. Private by design: local-first architecture and clear data boundaries.
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
            Bring every app into one place.
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
