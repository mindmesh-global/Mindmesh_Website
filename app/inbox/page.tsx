import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/inbox'];

const pageDescription =
  'One inbox for email across every connected account, without tab chaos. Scan faster, search in plain English, and stay focused inside MindMesh.';

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
    title: 'One view across accounts',
    description:
      'Connect Gmail, Outlook, and SMTP mailboxes, then scan everything in a single focused list instead of hopping between tabs.',
  },
  {
    title: 'Filter when you need one mailbox',
    description:
      'Isolate a single address when several accounts are connected. Switch filters without signing out or losing context.',
  },
  {
    title: 'Plain-English search',
    description:
      'Find receipts, contracts, and follow-ups by asking naturally. Get to the right thread without remembering exact senders or keywords.',
  },
  {
    title: 'Less triage, more clarity',
    description:
      'Inbox is built to cut mental overhead so important messages surface faster and the day feels manageable.',
  },
] as const;

export default function InboxPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Inbox"
      title="One inbox for email across every connected account"
      subtitle="Without tab chaos. MindMesh brings your connected mail into one focused workspace so you can scan faster and stay on top of what matters."
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Stop switching tabs to find the right thread.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Connected email accounts land in one calm list. Filter by mailbox when you need to
              isolate an address, then jump back to the full view without leaving MindMesh.
            </p>
            <p className="mt-8">
              <Link
                href="/connected-apps"
                className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Connect your mail accounts →
              </Link>
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container shadow-mm-elevated">
            <Image
              src="/images/hero-inbox-mockup.jpg"
              alt="MindMesh Inbox: unified email list with account filters, search, and message previews"
              width={1024}
              height={531}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built for how email actually shows up at work.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Inbox sits in the Prioritize and Execute path: the same signals that feed Focus and the
            draft you send from Execute.
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
            Email visibility with privacy-first design.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            MindMesh uses a local-first, privacy-conscious architecture. It organizes and retrieves
            your connected work context with care, without turning your inbox into a data product.
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
            Spend less time digging through email.
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
