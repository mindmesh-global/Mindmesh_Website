'use client';

import Image from 'next/image';
import { PRIORITY_FIXTURE_ACME, type PriorityFixture } from '@/lib/marketing-demo-data';

export type { PriorityFixture };

const PRIORITY_SOURCE_ICONS: Record<(typeof PRIORITY_FIXTURE_ACME.sources)[number], string> = {
  Gmail: '/images/icons/gmail.png',
  'Google Calendar': '/images/icons/google-calendar.png',
  Slack: '/images/icons/slack.png',
  Jira: '/images/icons/jira.png',
};

export type MarketingPriorityCardProps = {
  priority?: PriorityFixture;
  /** Smaller layout for Execute carry-over (P1-T08). */
  compact?: boolean;
  /** Accent emphasis ring for hold beats (P4-T06). */
  emphasized?: boolean;
  /** 0–1 opacity for scroll-driven emerge (P4-T06 / P4-T10). */
  opacity?: number;
  /** Scale for emerge animation (default 1; use 0.92→1 during reveal). */
  scale?: number;
  /** Show the Focus → Execute handoff CTA. */
  showCta?: boolean;
  /** 0–1 opacity for a soft CTA fade-in after the card has settled. */
  ctaOpacity?: number;
  /** When set, "Act on this" becomes a clickable control (jumps to Execute). */
  onCtaClick?: () => void;
  className?: string;
};

/**
 * Acme priority card for Focus and Execute theaters (P4-T05).
 */
export function MarketingPriorityCard({
  priority = PRIORITY_FIXTURE_ACME,
  compact = false,
  emphasized = false,
  opacity = 1,
  scale = 1,
  showCta = false,
  ctaOpacity = 1,
  onCtaClick,
  className,
}: MarketingPriorityCardProps) {
  return (
    <div
      className={`rounded-lg border border-mm-outline-variant/60 border-l-4 border-l-mm-primary-fixed bg-mm-surface-container-high shadow-lg ${
        compact ? 'p-4' : 'p-6 md:p-8'
      } ${emphasized ? 'ring-1 ring-mm-primary/40' : ''} ${className ?? ''}`}
      data-marketing-priority-card
      data-priority-compact={compact ? 'true' : 'false'}
      data-priority-emphasized={emphasized ? 'true' : 'false'}
      data-priority-id={priority.id}
      style={{
        opacity,
        transform: `scale(${scale})`,
        willChange: opacity < 1 || scale < 1 ? 'transform, opacity' : undefined,
      }}
    >
      <p
        className={`font-medium text-mm-primary ${compact ? 'text-xs' : 'text-sm'}`}
      >
        Your priority
      </p>
      <h3
        className={`mt-2 font-display font-semibold text-mm-on-background ${
          compact ? 'text-lg leading-snug' : 'text-2xl'
        }`}
      >
        {priority.title}
      </h3>
      {!compact ? (
        <p className="mt-3 text-base text-mm-on-surface-variant">{priority.reason}</p>
      ) : (
        <p className="mt-2 line-clamp-2 text-sm text-mm-on-surface-variant">{priority.reason}</p>
      )}
      <div className={`flex flex-wrap items-center gap-2 ${compact ? 'mt-3' : 'mt-4'}`}>
        {priority.sources.map((source) => (
          <span
            key={source}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-mm-outline-variant bg-mm-surface-container"
            title={source}
          >
            <Image
              src={PRIORITY_SOURCE_ICONS[source]}
              alt={source}
              width={16}
              height={16}
              className="h-4 w-4 object-contain"
            />
          </span>
        ))}
      </div>
      {showCta && !compact ? (
        onCtaClick ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="pointer-events-auto mt-5 rounded-sm text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mm-primary/50"
            style={{ opacity: ctaOpacity, willChange: ctaOpacity < 1 ? 'opacity' : undefined }}
          >
            Act on this →
          </button>
        ) : (
          <p
            className="mt-5 text-sm font-medium text-mm-primary"
            style={{ opacity: ctaOpacity, willChange: ctaOpacity < 1 ? 'opacity' : undefined }}
          >
            Act on this →
          </p>
        )
      ) : null}
    </div>
  );
}
