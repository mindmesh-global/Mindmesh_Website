import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { IntegrationsMarquee } from '@/components/marketing/sections/IntegrationsMarquee';

const steps = [
  {
    number: '01',
    title: 'Connect your apps',
    description:
      'Connect Gmail, Slack, Jira, calendars, and more. MindMesh reads them as sources without replacing your tools.',
  },
  {
    number: '02',
    title: 'See what needs attention',
    description:
      'A ranked Attention Board shows what is Now, Later Today, and Quietly Handled, with clear why-now reasons.',
  },
  {
    number: '03',
    title: 'Act with approval',
    description:
      'Prepare the reply, block the time, and stage the task update. You approve before anything sends or writes.',
  },
] as const;

/**
 * How it works: title, three steps, and a Linear-style integrations marquee.
 */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-mm-background pb-24 pt-10 lg:pb-28 lg:pt-12">
      <div className="mm-content">
        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
          <h2
            id="how-it-works-heading"
            className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl"
          >
            Three steps from noise to action.
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
        <div className="mm-content mt-8">
          <p className="text-sm text-mm-on-surface-variant">More connectors added regularly.</p>
          <p className="mt-4">
            <Link
              href="/connected-apps"
              className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
            >
              See all integrations →
            </Link>
          </p>
        </div>
      </div>

      <div className="mm-content">
        <MarketingSectionDivider />
      </div>
    </section>
  );
}
