import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { marketingTrustContent } from '@/lib/marketing-trust-content';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/trust'];

const pageDescription =
  'Built on trust you can verify. MindMesh is built for professionals who want AI orchestration without giving up control of their data.';

const integrationNames = MARKETING_INTEGRATIONS.map((app) => app.displayName).join(', ');

export const metadata: Metadata = {
  title: 'Trust',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Trust',
    description: pageDescription,
    url: 'https://mindmesh.global/trust',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Trust',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const faqItems = [
  {
    question: 'What is MindMesh?',
    answer:
      'MindMesh is a cognitive layer for modern work. It connects the tools you already use, surfaces what matters, and helps you act without tab chaos.',
  },
  {
    question: 'Where is my data stored?',
    answer:
      'We use a local-first architecture. Your core context and vector memory stay on your device by default, with encrypted (TLS) connections when traffic leaves the machine.',
  },
  {
    question: 'Does MindMesh train on my data?',
    answer: 'No. Your personal inbox and connected context are not used for model training.',
  },
  {
    question: 'Can it send emails or edit my calendar?',
    answer:
      'Supported Gmail and Google Calendar connections use read-only permissions in the standard flow. MindMesh does not send mail or create, delete, or change calendar events through that flow.',
  },
  {
    question: 'Which apps can I connect?',
    answer: `MindMesh supports ${integrationNames}. See Connected apps for the full list and how each category fits Connect, Focus, and Execute.`,
  },
  {
    question: 'How does MindMesh help with work-life balance?',
    answer:
      'Faster triage by highlighting what matters, clearer morning catch-up with daily narrative, and cleaner shutdown with open-loop visibility so the day ends with less cognitive residue.',
  },
] as const;

export default function TrustPage() {
  const { nvidia } = marketingTrustContent;

  return (
    <MarketingDepthLayout
      eyebrow={marketingTrustContent.eyebrow}
      title={marketingTrustContent.headline}
      subtitle={marketingTrustContent.subhead}
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[720px] px-6">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            External validation, stated carefully.
          </h2>
          <div className="mt-8 space-y-4">
            <a
              href={nvidia.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src={nvidia.badgeSrc}
                alt={nvidia.badgeAlt}
                width={111}
                height={48}
                className="h-10 w-auto md:h-12"
                unoptimized
              />
            </a>
            <p className="text-base text-mm-on-background">{nvidia.memberLine}</p>
            <p className="text-sm text-mm-on-surface-variant">{nvidia.disclaimer}</p>
          </div>
          <p className="mt-8 text-base text-mm-on-surface-variant lg:text-lg">
            {marketingTrustContent.securityLine}
          </p>
          <p className="mt-6">
            <Link
              href="/security"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Learn about security →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[720px] px-6">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Questions people ask before trusting an AI with their workday.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            Straight answers on storage, permissions, training, and integrations. No endorsement
            language beyond what we can verify.
          </p>

          <div className="mt-10 space-y-4">
            {faqItems.map(({ question, answer }) => (
              <article
                key={question}
                className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6"
              >
                <h3 className="font-display text-lg font-semibold text-mm-on-background">
                  {question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">{answer}</p>
                {question === 'Which apps can I connect?' ? (
                  <p className="mt-4">
                    <Link
                      href="/connected-apps"
                      className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                    >
                      View connected apps →
                    </Link>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Privacy policy and product depth.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            For legal detail, read the privacy policy. For architecture and access boundaries, start
            with security.
          </p>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/security"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Learn about security →
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Privacy policy →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Join people who want AI without giving up control.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            {marketingTrustContent.waitlistLine}
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
