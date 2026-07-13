import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import {
  MARKETING_CTA_HREF,
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { marketingTrustContent } from '@/lib/marketing-trust-content';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/security'];

const pageDescription =
  'Private by design: local-first architecture and clear data boundaries. MindMesh keeps indexed work context close to you, with encrypted connections and read-only integrations where it matters.';

export const metadata: Metadata = {
  title: 'Security',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Security',
    description: pageDescription,
    url: 'https://mindmesh.global/security',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Security',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

const principleCards = [
  {
    title: 'Local-first by default',
    description:
      'Indexed work context stays close to you. Vector memory remains on your device by default, with encrypted (TLS) connections when traffic leaves the machine.',
  },
  {
    title: 'Read-only where it matters',
    description:
      'Supported Gmail and Google Calendar connections use read-only permissions so you can search, summarize, and stay organized without granting unnecessary control.',
  },
  {
    title: 'Encrypted sensitive paths',
    description:
      'MindMesh uses modern encryption protections, including AES-256-GCM in key flows such as sensitive token protection and some encrypted local storage paths.',
  },
  {
    title: 'Desktop trust signals',
    description:
      'Signed desktop updates and a deliberate desktop-first architecture keep the product more controlled and transparent than typical browser-first AI tools.',
  },
] as const;

const canAccess = [
  'Read supported email and calendar data you choose to connect',
  'Keep your memory and index on your device by default',
  'Help summarize what matters today and what happened yesterday',
  'Help you find old work context quickly',
] as const;

const cannotAccess = [
  'Claim ownership of your work data',
  'Train on your personal inbox data',
  'Delete or change your emails',
  'Send Gmail messages or edit Google Calendar events through the standard read-only connection flow',
] as const;

export default function SecurityPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Security"
      title="Private by design: local-first architecture and clear data boundaries"
      subtitle={marketingTrustContent.securityLine}
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Local-first architecture, designed for privacy.
          </h2>
          <p className="mt-4 max-w-[720px] text-base text-mm-on-surface-variant lg:text-lg">
            MindMesh is built for professionals who want AI orchestration without giving up control
            of their data. Privacy is a product principle that shapes permissions, architecture, and
            experience from the start.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principleCards.map(({ title, description }) => (
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

      <section
        id="comparison"
        className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24"
      >
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            What MindMesh can access, and what it cannot do.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Transparency is the standard. We keep explicit boundaries with your data.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
              <h3 className="font-display text-lg font-semibold text-mm-on-background">
                MindMesh can
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mm-on-surface-variant">
                {canAccess.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mm-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6">
              <h3 className="font-display text-lg font-semibold text-mm-on-background">
                MindMesh cannot
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mm-on-surface-variant">
                {cannotAccess.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mm-on-surface-variant"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="report-security-issue"
        className="bg-mm-background py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[640px] px-6">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Report a security issue
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            If you believe you have found a vulnerability in MindMesh or related services, email our
            security team. Please include enough detail to reproduce the issue, and avoid sharing
            sensitive customer data in the initial report when possible. We monitor this inbox and
            aim to acknowledge reports promptly.
          </p>
          <p className="mt-6 text-base text-mm-on-surface-variant lg:text-lg">
            <strong className="text-mm-on-background">Security contact:</strong>{' '}
            <a
              href="mailto:team@mindmesh.global?subject=Security%20report"
              className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              team@mindmesh.global
            </a>
          </p>
          <p className="mt-3 text-sm text-mm-on-surface-variant">
            Use the subject line &quot;Security report&quot; so we can prioritize the message. For
            other product questions, the same address or our{' '}
            <Link
              href="/contact"
              className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              contact form
            </Link>{' '}
            works.
          </p>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built on trust you can verify.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            {marketingTrustContent.subhead} Read how we talk about memberships, product boundaries,
            and the waitlist on the trust page.
          </p>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/trust"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              How we build trust →
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Privacy policy →
            </Link>
            <Link
              href="/sub-processors"
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              Sub-processors →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Work with your data, not extract value from it.
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
