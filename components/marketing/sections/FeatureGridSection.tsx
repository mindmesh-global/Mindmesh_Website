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
    title: 'Daily narrative',
    description: 'Yesterday, summarized, so today starts with context.',
    href: '/yesterdays-narrative',
    linkLabel: 'See daily narrative',
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
      eyebrow="Features"
      title="Go deeper on what MindMesh does."
      subtitle="Depth pages for the layers behind connect, prioritize, and execute."
      subtitleClassName="hidden md:block"
      withDivider
    >
      {/* Phone: compact link list */}
      <ul className="divide-y divide-mm-outline-variant/50 border-y border-mm-outline-variant/50 md:hidden">
        {featureCards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="flex min-h-14 items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-mm-primary"
            >
              <span className="font-display text-base font-semibold text-mm-on-background">
                {card.title}
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
            className="group rounded-lg border border-mm-outline-variant bg-mm-surface-container p-6 transition hover:-translate-y-0.5 hover:border-mm-primary"
          >
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
