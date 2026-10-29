import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { IntegrationsMarquee } from '@/components/marketing/sections/IntegrationsMarquee';

const steps = [
  {
    number: '01',
    title: 'Connect every client\'s apps',
    description:
      'Bring Gmail, Slack, Jira, and calendars together for every client you work with. MindMesh reads them as sources and never replaces the tools your clients already use.',
  },
  {
    number: '02',
    title: 'See exactly what needs you',
    description:
      'One ranked view shows what\'s urgent, what can wait, and what\'s already handled — with a plain-English reason for each, tagged by client.',
  },
  {
    number: '03',
    title: 'Act with your approval',
    description:
      'MindMesh drafts the reply, blocks the time, and stages the task update. Nothing sends, books, or writes until you say so.',
  },
] as const;

/**
 * How it works: title, three steps, and a Linear-style integrations marquee.
 */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-mm-background pb-24 pt-6 lg:pb-28 lg:pt-8">
      <div className="mm-content">
        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
          <h2
            id="how-it-works-heading"
            className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl"
          >
            Three steps from noise to clarity.
          </h2>

          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <article key={step.number}>
                <p className="font-display text-sm font-semibold tabular-nums text-mm-on-surface-variant">
                  {step.number}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-mm-on-background lg:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-mm-on-surface-variant">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        id="integrations"
        className="mt-16 scroll-mt-[var(--mm-scroll-offset)] md:mt-20"
      >
        <IntegrationsMarquee className="py-2" />
        <div className="mm-content mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-mm-on-surface-variant">More connectors added regularly.</p>
          <Link
            href="/connected-apps"
            className="inline-flex items-center gap-2 rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
          >
            See all integrations
          </Link>
        </div>
      </div>

      <div className="mm-content">
        <MarketingSectionDivider />
      </div>
    </section>
  );
}
