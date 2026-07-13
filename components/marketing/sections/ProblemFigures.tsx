import type { CSSProperties } from 'react';
import { Bot, HelpCircle } from 'lucide-react';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';

function integrationIcon(id: string) {
  return MARKETING_INTEGRATIONS.find((integration) => integration.id === id)?.iconSrc ?? '';
}

/** Loop-safe custom property assignment (CSS custom props are untyped in React.CSSProperties). */
function withVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/**
 * FIG 0.2 — four source chips (Slack, Jira, Gmail, Outlook) drift out of phase
 * with each other and flash mismatched priority dots, visualizing ecosystems
 * that each run their own siloed sense of what matters.
 */
export function AppsDisagreeFigure() {
  const chips = [
    { id: 'slack', label: 'Slack', dot: '#818cf8', top: '6%', left: '6%', anim: 'problem-figure-float-a', delay: '0s' },
    { id: 'jira', label: 'Jira', dot: '#4388fd', top: '4%', left: '58%', anim: 'problem-figure-float-b', delay: '-1.4s' },
    { id: 'outlook-email', label: 'Outlook', dot: '#699cff', top: '58%', left: '58%', anim: 'problem-figure-float-a', delay: '-2.1s' },
    { id: 'gmail', label: 'Gmail', dot: '#fa746f', top: '60%', left: '4%', anim: 'problem-figure-float-c', delay: '-2.6s' },
  ] as const;

  return (
    <div data-problem-figure className="relative h-40 w-full select-none overflow-hidden md:h-44">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 160" fill="none" aria-hidden>
        <path
          d="M 34 30 L 150 22 L 168 108 L 46 118 Z"
          stroke="var(--mm-accent, #adc6ff)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="[animation:problem-figure-dash-flicker_3.4s_ease-in-out_infinite]"
          fill="none"
        />
      </svg>
      {chips.map((chip) => (
        <div
          key={chip.id}
          className="absolute flex items-center gap-2 rounded-full border border-mm-outline-variant/60 bg-mm-surface-container/90 px-3 py-1.5 shadow-mm-elevated [animation-duration:4.8s] [animation-iteration-count:infinite] [animation-timing-function:ease-in-out]"
          style={withVars({ top: chip.top, left: chip.left, animationName: chip.anim, animationDelay: chip.delay })}
        >
          <span
            className="h-1.5 w-1.5 rounded-full [animation:problem-figure-pulse-dot_2.2s_ease-in-out_infinite]"
            style={{ backgroundColor: chip.dot, animationDelay: chip.delay }}
            aria-hidden
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={integrationIcon(chip.id)} alt="" className="h-4 w-4" aria-hidden />
          <span className="text-xs font-medium text-mm-on-surface-variant">{chip.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * FIG 0.3 — a small deck of app "tabs" perpetually shuffles front-to-back,
 * visualizing hours lost to tab switching instead of finishing the work.
 */
export function TabShuffleFigure() {
  const cards = [
    { id: 'gmail', label: 'Gmail' },
    { id: 'jira', label: 'Jira' },
    { id: 'slack', label: 'Slack' },
    { id: 'google-calendar', label: 'Calendar' },
  ] as const;
  const duration = 7.2;

  return (
    <div data-problem-figure className="relative h-40 w-full select-none overflow-hidden md:h-44">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute left-1/2 top-1/2 flex h-24 w-36 flex-col rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container/95 p-2.5 shadow-mm-elevated [animation-iteration-count:infinite] [animation-timing-function:ease-in-out]"
          style={withVars({
            animationName: 'problem-figure-shuffle',
            animationDuration: `${duration}s`,
            animationDelay: `${-(duration * (index / cards.length))}s`,
          })}
        >
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-mm-error/70" aria-hidden />
            <span className="h-1.5 w-1.5 rounded-full bg-mm-accent/70" aria-hidden />
            <span className="h-1.5 w-1.5 rounded-full bg-mm-on-surface-variant/50" aria-hidden />
          </div>
          <div className="mt-2 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={integrationIcon(card.id)} alt="" className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium text-mm-on-surface-variant">{card.label}</span>
          </div>
          <div className="mt-2 space-y-1.5">
            <span className="block h-1 w-full rounded bg-mm-outline-variant/50" aria-hidden />
            <span className="block h-1 w-4/5 rounded bg-mm-outline-variant/50" aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * FIG 0.4 — an AI agent icon reaches for Slack, Jira, and Gmail with dashed
 * lines that never connect, each ending in a stalled "?", visualizing that
 * AI agents are not the solution because they lack context.
 */
export function AgentNoContextFigure() {
  const sources = [
    { id: 'slack', angle: 200 },
    { id: 'jira', angle: 340 },
    { id: 'gmail', angle: 90 },
  ] as const;

  return (
    <div data-problem-figure className="relative h-40 w-full select-none overflow-hidden md:h-44">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 160" fill="none" aria-hidden>
        {sources.map((source) => {
          const radians = (source.angle * Math.PI) / 180;
          const x = 120 + 82 * Math.cos(radians);
          const y = 80 + 58 * Math.sin(radians);
          return (
            <line
              key={source.id}
              x1="120"
              y1="80"
              x2={x}
              y2={y}
              stroke="var(--mm-accent, #adc6ff)"
              strokeWidth="1"
              strokeDasharray="3 7"
              opacity={0.3}
              className="[animation:problem-figure-dash-flicker_3s_ease-in-out_infinite]"
            />
          );
        })}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mm-outline-variant/60 bg-mm-surface-container/90"
        aria-hidden
      >
        <Bot className="h-5 w-5 text-mm-on-surface-variant" aria-hidden />
      </div>
      <span
        className="absolute left-[58%] top-[28%] flex h-5 w-5 items-center justify-center rounded-full bg-mm-error/20 text-mm-error [animation:problem-figure-pulse-dot_2s_ease-in-out_infinite]"
        aria-hidden
      >
        <HelpCircle className="h-3.5 w-3.5" aria-hidden />
      </span>

      {sources.map((source, index) => {
        const radians = (source.angle * Math.PI) / 180;
        const x = 50 + (82 / 240) * 100 * Math.cos(radians);
        const y = 50 + (58 / 160) * 100 * Math.sin(radians);
        return (
          <div
            key={source.id}
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mm-outline-variant/40 bg-mm-surface-container/60 opacity-40 [animation:problem-figure-ghost-fade_3.4s_ease-in-out_infinite]"
            style={withVars({ left: `${x}%`, top: `${y}%`, animationDelay: `${-index * 1.1}s` })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={integrationIcon(source.id)} alt="" className="h-3.5 w-3.5 grayscale" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}

/**
 * FIG 0.5 — concentric rings draw in around a MindMesh core, each carrying a
 * source chip, visualizing long-term memory that keeps quietly accumulating.
 */
export function MemoryAccumulationFigure() {
  const rings = [
    { radius: 34, source: 'gmail', angle: 225, delay: 0 },
    { radius: 52, source: 'slack', angle: 315, delay: 1.6 },
    { radius: 70, source: 'jira', angle: 45, delay: 3.2 },
    { radius: 88, source: 'google-calendar', angle: 135, delay: 4.8 },
  ] as const;
  const duration = 6.4;

  return (
    <div data-problem-figure className="relative mx-auto h-56 w-56 select-none md:h-64 md:w-64">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" fill="none" aria-hidden>
        {rings.map((ring) => {
          const circumference = 2 * Math.PI * ring.radius;
          return (
            <circle
              key={ring.source}
              cx="100"
              cy="100"
              r={ring.radius}
              stroke="var(--mm-accent, #adc6ff)"
              strokeWidth="1.25"
              strokeDasharray={circumference}
              fill="none"
              opacity={0}
              style={withVars({
                animationName: 'problem-figure-ring-draw',
                animationDuration: `${duration}s`,
                animationDelay: `${ring.delay}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                '--ring-circumference': circumference,
              })}
            />
          );
        })}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mm-accent/20 [animation:problem-figure-core-pulse_3.2s_ease-in-out_infinite]"
        aria-hidden
      >
        <span className="font-display text-lg font-bold text-mm-accent">M</span>
      </div>

      {rings.map((ring) => {
        const radians = (ring.angle * Math.PI) / 180;
        const x = 50 + (ring.radius / 100) * 50 * Math.cos(radians);
        const y = 50 + (ring.radius / 100) * 50 * Math.sin(radians);
        return (
          <div
            key={ring.source}
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mm-outline-variant/60 bg-mm-surface-container/95 opacity-0 shadow-mm-elevated [animation-iteration-count:infinite] [animation-timing-function:ease-in-out]"
            style={withVars({
              left: `${x}%`,
              top: `${y}%`,
              animationName: 'problem-figure-chip-fade',
              animationDuration: `${duration}s`,
              animationDelay: `${ring.delay}s`,
            })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={integrationIcon(ring.source)} alt="" className="h-3.5 w-3.5" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}
