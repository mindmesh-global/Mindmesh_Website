import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import {
  AgentNoContextFigure,
  AppsDisagreeFigure,
  TabShuffleFigure,
} from '@/components/marketing/sections/ProblemFigures';
import { MindMeshOrbitFigure } from '@/components/marketing/sections/MindMeshOrbitFigure';

const problemCards = [
  {
    fig: 'FIG 0.2',
    heading: 'Ecosystems work in silos.',
    Figure: AppsDisagreeFigure,
  },
  {
    fig: 'FIG 0.3',
    heading: 'Context switching takes attention.',
    Figure: TabShuffleFigure,
  },
  {
    fig: 'FIG 0.4',
    heading: 'AI agents are not the solution.',
    Figure: AgentNoContextFigure,
  },
] as const;

/**
 * Problem narrative pulled up under the product overview CTAs.
 * Intro + three FIG panels share one full viewport; the MindMesh close
 * (FIG 0.5) starts on the next scroll. Section dividers mark each page end.
 */
export function ProblemSection() {
  return (
    <section
      id="problem"
      className="bg-mm-background pb-24 pt-6 lg:pb-32 lg:pt-10"
      aria-labelledby="problem-heading"
    >
      <div className="mm-content">
        {/* Intro + FIG 0.2–0.4: one full page of breathing room. */}
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-20 py-16 md:gap-28 md:py-24 lg:gap-32 lg:py-28">
          <div className="w-full">
            <h2
              id="problem-heading"
              className="font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
            >
              In modern work, attention is the most important resource, and context
              switching is expensive.
            </h2>

            <p className="mt-5 max-w-[720px] text-sm font-medium tracking-wide text-mm-on-surface-variant md:text-base">
              Built for the teams who ship first: PMs, engineers, and product builders.
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3 md:gap-5">
            {problemCards.map(({ fig, heading, Figure }) => (
              <div
                key={fig}
                className="flex flex-col rounded-2xl border border-mm-outline-variant/50 bg-mm-surface-container/40 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mm-on-surface-variant/70">
                  {fig}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-mm-on-background md:text-xl">
                  {heading}
                </h3>
                <div className="mt-6 flex flex-1 items-center justify-center">
                  <Figure />
                </div>
              </div>
            ))}
          </div>
        </div>

        <MarketingSectionDivider />

        {/* FIG 0.5 close: one Linear-style sentence, centered orbit figure below. */}
        <div className="mt-24 w-full md:mt-32 lg:mt-40">
          <h3 className="w-full font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]">
            <span className="text-mm-on-background">A new species of AI assistant.</span>{' '}
            <span className="text-mm-on-surface-variant">
              MindMesh sits above your stack and answers one question: what should I do
              right now? Restore calm and attention with MindMesh.
            </span>
          </h3>

          <div className="mt-14 flex w-full flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mm-on-surface-variant/70">
              FIG 0.5
            </span>
            <p className="mt-2 max-w-xl text-center text-sm text-mm-on-surface-variant">
              Every connected source keeps feeding one growing memory, quietly and in order.
            </p>
            <div className="mt-8 flex w-full justify-center">
              <MindMeshOrbitFigure />
            </div>
          </div>
        </div>

        <MarketingSectionDivider className="mt-20 lg:mt-28" />
      </div>
    </section>
  );
}
