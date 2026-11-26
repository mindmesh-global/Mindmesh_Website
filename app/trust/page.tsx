import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { PartnerTrustBadges } from '@/components/marketing/PartnerTrustBadges';
import {
  MARKETING_DEPTH_BACK_LINKS,
} from '@/lib/marketing-routes';
import { marketingTrustContent } from '@/lib/marketing-trust-content';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const depthBack = MARKETING_DEPTH_BACK_LINKS['/trust'];

const pageDescription =
  'Built on trust you can verify. MindMesh is built for professionals who want AI orchestration without giving up control of their data.';

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

export default function TrustPage() {
  return (
    <MarketingDepthLayout
      eyebrow={marketingTrustContent.eyebrow}
      title={marketingTrustContent.headline}
      subtitle={marketingTrustContent.subhead}
      backHref={depthBack.href}
      backLabel={depthBack.label}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <h2 className="max-w-[720px] font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Independently validated infrastructure.
          </h2>
          <div className="mt-8">
            <PartnerTrustBadges />
          </div>
          <p className="mt-8 max-w-[720px] text-base text-mm-on-surface-variant lg:text-lg">
            {marketingTrustContent.securityLine}
          </p>
          <p className="mt-6">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Learn about security
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="max-w-[720px] font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Technical signals you can verify.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            These are implementation details from the codebase — not marketing claims. Each one is specific and checkable.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AES-256-GCM token encryption',
                detail: 'OAuth tokens are encrypted at rest using AES-256-GCM with a random 12-byte nonce per token — stronger than standard AES-256-CBC.',
              },
              {
                title: 'Apple Notarized builds',
                detail: 'macOS installers are code-signed and Apple Notarized through CI before release. Windows builds go through the same pipeline.',
              },
              {
                title: 'Vector memory on your device',
                detail: 'Qdrant runs locally — embeddings, context, and vector memory are stored on your machine, not uploaded to a cloud vector database.',
              },
              {
                title: 'Per-token JWT revocation',
                detail: 'Tokens can be individually revoked via a JTI blocklist. Auth decisions are never cached beyond 30 seconds — a revoked token expires within one window.',
              },
              {
                title: 'Tauri, not Electron',
                detail: 'The desktop shell is built with Tauri (Rust), not Electron. This reduces the browser-runtime attack surface present in most Electron-based apps.',
              },
              {
                title: 'Row-level data isolation',
                detail: 'Every backend query is scoped to your user ID in PostgreSQL. No query patterns allow cross-user data access.',
              },
            ].map(({ title, detail }) => (
              <div
                key={title}
                data-light-window=""
                className="rounded-xl p-5"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.18)',
                  boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                }}
              >
                <h3 className="font-display text-base font-semibold text-mm-on-background">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="max-w-[720px] font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            MindMesh around the web.
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-mm-on-surface-variant lg:text-lg">
            Independent listings, reviews, and coverage from communities and platforms we did not write ourselves.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: 'Product Hunt', href: 'https://www.producthunt.com/products/mindmesh-3' },
              { label: 'G2', href: 'https://www.g2.com/products/the-vansh-group-mindmesh/reviews' },
              { label: 'TrustRadius', href: 'https://www.trustradius.com/products/mindmesh' },
              { label: 'SaaSHub', href: 'https://www.saashub.com/mindmesh' },
              { label: 'Indie Hackers', href: 'https://www.indiehackers.com/post/mindmesh-is-live-a-workspace-that-helps-you-focus-on-what-actually-matters-6febfa59bc' },
              { label: 'Hacker News', href: 'https://news.ycombinator.com/item?id=50015864' },
              { label: 'Dev.to', href: 'https://dev.to/kashishh/building-mindmesh-an-ai-workspace-to-reduce-context-switching-1di9' },
              { label: 'HackerNoon', href: 'https://hackernoon.com/preview/6ac8a3c93f75a65134d20d32' },
              { label: 'GrowthHackers', href: 'https://community.growthhackers.com/threads/69ac38bd-9179-4276-88de-4c1f02e78caf' },
              { label: 'Startup Buffer', href: 'https://startupbuffer.com/startup/mindmesh' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-mm-outline-variant/60 px-4 py-2 text-sm text-mm-on-surface-variant transition-colors hover:border-mm-outline-variant hover:text-mm-on-surface"
              >
                {label}
                <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M2.5 9.5l7-7M4 2.5h5.5V8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            Go deeper.
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            For architecture and access boundaries, read security. For straight answers, check the FAQ. For legal detail, read the privacy policy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Security
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </section>

    </MarketingDepthLayout>
  );
}
