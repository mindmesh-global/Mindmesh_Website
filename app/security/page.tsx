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
    title: 'Your data stays on your device',
    description:
      'Everything MindMesh reads about your work is indexed locally. Vector memory, work context, and enriched data remain on your machine by default — not uploaded to a cloud server.',
  },
  {
    title: 'Bring your own AI key (BYOK)',
    description:
      'Connect your own API key so AI enrichments — summaries, prioritisation, and context — run through your account, not ours. Your data never passes through MindMesh\'s AI infrastructure when you do.',
  },
  {
    title: 'Read-only where it matters',
    description:
      'Connected apps use read-only permissions where it matters. MindMesh reads what you give it permission to read — it cannot send emails, edit calendar events, or modify anything without your explicit approval.',
  },
  {
    title: 'Encrypted sensitive paths',
    description:
      'MindMesh uses AES-256-GCM encryption in key flows including sensitive token protection and local storage paths. Connections use TLS when traffic leaves the machine.',
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
  'Send email messages or edit calendar events through the standard read-only connection flow',
] as const;

export default function SecurityPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Security"
      title="Your data. Your device. Your key."
      subtitle="MindMesh is built for professionals who handle confidential client work. Privacy isn't a setting — it's the default architecture."
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            How we keep your data private.
          </h2>
          <p className="mt-4 max-w-[720px] text-base text-mm-on-surface-variant lg:text-lg">
            When you work with confidential client data, a privacy policy isn&apos;t enough. MindMesh makes privacy a structural decision — your context stays on your device, your AI key stays in your control, and nothing changes without your approval.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principleCards.map(({ title, description }) => (
              <div
                key={title}
                data-light-window=""
                className="rounded-xl p-6"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
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
            <div
              data-light-window=""
              className="rounded-xl p-6"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.18)',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              }}
            >
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
            <div
              data-light-window=""
              className="rounded-xl p-6"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.18)',
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
              }}
            >
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
        <div className="mm-content">
          <div
            data-light-window=""
            className="mx-auto max-w-[640px] rounded-xl p-8"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
          >
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              Report a security issue
            </h2>
            <p className="mt-3 text-base leading-relaxed text-mm-on-surface-variant">
              Found a vulnerability? We want to hear about it. Email us with enough detail to reproduce
              the issue — avoid including sensitive customer data in the first message. We monitor this
              inbox and respond promptly.
            </p>
            <div className="mt-6 rounded-lg p-4" style={{ background: '#f2f2f7', border: '1px solid #d1d1d6' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-mm-on-surface-variant">Security contact</p>
              <a
                href="mailto:team@mindmesh.global?subject=Security%20report"
                className="mt-1 block text-base font-semibold text-mm-on-background transition-colors hover:text-mm-primary"
              >
                team@mindmesh.global
              </a>
              <p className="mt-1 text-xs text-mm-on-surface-variant">Use the subject line "Security report" so we can prioritise it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Built on trust you can verify.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            {marketingTrustContent.subhead} Read how we talk about memberships and product boundaries on the trust page.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/trust"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              How we build trust
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Privacy policy
            </Link>
            <Link
              href="/sub-processors"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Sub-processors
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
