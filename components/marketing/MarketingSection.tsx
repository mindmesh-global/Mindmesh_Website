import type { ReactNode } from 'react';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';

type MarketingSectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headingId?: string;
  headerClassName?: string;
  /** Linear-style hairline + glow at the bottom of this section. */
  withDivider?: boolean;
  /** Pull the heading closer to the border above (less top padding). */
  compactTop?: boolean;
};

export function MarketingSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  headingId,
  headerClassName = '',
  withDivider = false,
  compactTop = false,
}: MarketingSectionProps) {
  const hasHeader = eyebrow || title || subtitle;
  const paddingClass = compactTop
    ? 'pt-10 pb-24 lg:pt-12 lg:pb-32'
    : 'py-24 lg:py-32';

  return (
    <section id={id} className={`bg-mm-background ${paddingClass} ${className}`.trim()}>
      <div className="mm-content">
        {hasHeader ? (
          <header className={headerClassName}>
            {eyebrow ? (
              <p className="text-sm font-medium text-mm-on-surface-variant">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2
                id={headingId}
                className={`font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl ${
                  eyebrow ? 'mt-3' : ''
                }`}
              >
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-4 max-w-[640px] text-lg text-mm-on-surface-variant lg:text-xl">
                {subtitle}
              </p>
            ) : null}
          </header>
        ) : null}
        <div className={hasHeader ? 'mt-10' : undefined}>{children}</div>
        {withDivider ? <MarketingSectionDivider /> : null}
      </div>
    </section>
  );
}
