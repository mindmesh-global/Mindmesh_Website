import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { SENSOR_MASCOT_FEATURE_GRID_CARDS } from '@/lib/marketing-sensor-mascot-content';

/** Homepage feature grid (P1-T09; Sensor + Mascot added in P8-T13 / P8-T01 order). */
const featureCards = [
  {
    title: 'Connected apps',
    description:
      'Bring Gmail, Slack, Jira, calendars, and more into one readable source layer.',
    href: '/connected-apps',
    linkLabel: 'Explore connected apps',
  },
  {
    title: 'Inbox',
    description: 'One place for email across accounts, without hopping tabs.',
    href: '/inbox',
    linkLabel: 'Explore inbox',
  },
  {
    title: "Yesterday's narrative",
    description: 'Yesterday, summarized, so today starts with context.',
    href: '/yesterdays-narrative',
    linkLabel: "See yesterday's narrative",
  },
  {
    title: 'Upcoming events',
    description: 'What is coming next, before it owns your afternoon.',
    href: '/upcoming-events',
    linkLabel: 'View upcoming events',
  },
  ...SENSOR_MASCOT_FEATURE_GRID_CARDS,
  {
    title: 'Security',
    description: 'Local-first architecture and clear data boundaries, private by design.',
    href: '/security',
    linkLabel: 'Read about security',
  },
] as const;

/**
 * Depth-page directory. Phone: compact title + chevron rows.
 * md+: original card grid with descriptions.
 */
export function FeatureGridSection() {
  return (
    <MarketingSection
      id="features"
      title="Go deeper on what MindMesh does."
      subtitle="Explore each feature in detail — what it does, what it connects, and what it gives back."
      subtitleClassName="hidden md:block"
      withDivider
      compactTop
    >
      {/* Phone: compact link list */}
      <ul className="divide-y divide-mm-outline-variant/50 border-y border-mm-outline-variant/50 md:hidden">
        {featureCards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="flex min-h-14 items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-mm-primary"
            >
              <span className="flex items-center gap-2 font-display text-base font-semibold text-mm-on-background">
                {card.title}
                {card.href === '/mascot' && (
                  <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-400">
                    Coming Soon
                  </span>
                )}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-mm-on-surface-variant"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* md+: card grid */}
      <div className="hidden gap-6 sm:grid-cols-2 md:grid lg:grid-cols-3">
        {featureCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            data-light-window=""
            className="group relative rounded-xl p-6 transition hover:-translate-y-0.5"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
          >
            {card.href === '/mascot' && (
              <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
                Coming Soon
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-mm-on-background">
              {card.title}
            </h3>
            <p className="mt-3 text-base text-mm-on-surface-variant">{card.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-mm-primary group-hover:text-mm-primary-dim">
              {card.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </MarketingSection>
  );
}
