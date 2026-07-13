import type { ReactNode } from 'react';
import Link from 'next/link';
import { MarketingFooter } from './MarketingFooter';
import { MarketingNav } from './MarketingNav';

export type MarketingDepthLayoutProps = {
  children: ReactNode;
  /** Small label above the page title (e.g. "Connectivity"). */
  eyebrow?: string;
  /** Page H1. */
  title: string;
  /** Supporting sentence under the title. */
  subtitle?: string;
  /** Optional back / pillar link under the subtitle. */
  backHref?: string;
  backLabel?: string;
  className?: string;
};

/**
 * Shared shell for Phase 5 funnel depth pages (P5-T02).
 * Theme + nav + page hero slot + content + footer.
 */
export function MarketingDepthLayout({
  children,
  eyebrow,
  title,
  subtitle,
  backHref,
  backLabel = 'Back to product →',
  className,
}: MarketingDepthLayoutProps) {
  return (
    <div
      data-marketing-theme="dark"
      data-marketing-layout="depth"
      className={`min-h-screen bg-mm-background font-body text-mm-on-background antialiased${
        className ? ` ${className}` : ''
      }`}
    >
      <MarketingNav />
      <main className="pt-16">
        <header className="border-b border-mm-outline-variant/40 bg-mm-background py-16 lg:py-20">
          <div className="mm-content">
            {eyebrow ? (
              <p className="text-sm font-medium text-mm-on-surface-variant">{eyebrow}</p>
            ) : null}
            <h1
              className={`font-display text-[2.25rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl ${
                eyebrow ? 'mt-3' : ''
              }`}
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-4 max-w-[640px] text-lg text-mm-on-surface-variant lg:text-xl">
                {subtitle}
              </p>
            ) : null}
            {backHref ? (
              <p className="mt-6">
                <Link
                  href={backHref}
                  className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  {backLabel}
                </Link>
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
