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
    heading: 'Ecosystems keep your attention limited to them.',
    body: 'Each client runs their own Slack, inbox, and project tracker. Every app pulls your focus into its own world and none of them see the bigger picture you need to manage.',
    Figure: AppsDisagreeFigure,
  },
  {
    fig: 'FIG 0.3',
    heading: 'Switching context kills your attention span.',
    body: "Every time you move between clients, apps, or threads, you pay a switching cost. The constant jumping drains your mental energy before you've done anything meaningful.",
    Figure: TabShuffleFigure,
  },
  {
    fig: 'FIG 0.4',
    heading: 'AI agents need constant prompting just to keep up.',
    body: "Most AI tools wait for you to ask. They don't know what's changed, what's urgent, or which client needs you now unless you tell them every time. Your AI tools are missing the bigger picture.",
    Figure: AgentNoContextFigure,
  },
] as const;

/**
 * Problem narrative pulled up under the product overview CTAs.
 * Intro + three FIG panels (horizontal peek row on phone, three-up from md);
 * the MindMesh close (FIG 0.5) starts on the next scroll. Section dividers
 * mark each page end.
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
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-12 py-16 md:gap-28 md:py-24 lg:gap-32 lg:py-28">
          <div className="w-full">
            <h2
              id="problem-heading"
              className="font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
            >
              Four clients means four Slacks, three inboxes, two Jiras, and a constant feeling you've missed something.
            </h2>

            <p className="mt-5 max-w-[720px] text-sm font-medium tracking-wide text-mm-on-surface-variant md:text-base">
              Built for fractional leaders and consultants who work across multiple clients at once.
            </p>
          </div>

          {/*
            Linear-style figure row: side-by-side cards with a peek of the next
            on phone (horizontal snap scroll); three-up grid from md up.
          */}
          <div
            className="-mr-[var(--mm-layout-gutter,1.5rem)] md:mr-0"
            data-problem-figures=""
          >
            <div
              className={[
                'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1',
                '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                'md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0',
              ].join(' ')}
            >
              {problemCards.map(({ fig, heading, body, Figure }) => (
                <div
                  key={fig}
                  data-light-window=""
                  className="flex w-[min(78vw,20.5rem)] shrink-0 snap-start flex-col rounded-xl p-6 md:w-auto md:shrink"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.18)',
                    boxShadow:
                      '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
                  }}
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
                  <p className="mt-5 text-sm leading-relaxed text-mm-on-surface-variant">
                    {body}
                  </p>
                </div>
              ))}
              {/* Trailing spacer so the last card can scroll clear of the right edge. */}
              <div
                className="w-[var(--mm-layout-gutter,1.5rem)] shrink-0 md:hidden"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <MarketingSectionDivider />

        {/* FIG 0.5 close: one Linear-style sentence, centered orbit figure below. */}
        <div className="mt-24 w-full md:mt-32 lg:mt-40">
          <h3 className="w-full font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]">
            <span className="text-mm-on-background">MindMesh connects every app,</span>{' '}
            <span className="text-mm-on-surface-variant">
              so you don&apos;t have to.
            </span>
          </h3>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mm-on-surface-variant md:text-lg">
            MindMesh is your own executive assistant. It doesn&apos;t replace the tools you already use — it sits above them, observes what&apos;s coming in across every client, and learns what actually matters to you. Over time it starts handling the noise on its own, prioritising, surfacing what needs you, and reducing the mental load so you stay on top of everything without the constant effort.
          </p>

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
