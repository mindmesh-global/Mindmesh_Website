'use client';

import { PRIORITY_FIXTURE_ACME, type PriorityFixture } from '@/lib/marketing-demo-data';

export type PriorityHandoffPhase = 'incoming' | 'acting' | 'done';

export type MarketingPriorityHandoffProps = {
  priority?: PriorityFixture;
  /** 0–1 opacity for the strip's own fade/slide-in (P1-T08 handoff). */
  opacity?: number;
  translateY?: number;
  /** Drives the status text and dot color; one continuous strip, not a second card. */
  phase?: PriorityHandoffPhase;
  /** Momentary pop when the "acting" status first lands. */
  pulseScale?: number;
  className?: string;
};

/**
 * Single-line continuity strip that carries the Focus priority into Execute.
 * Replaces a duplicate full priority card so the same priority never reads
 * as two separate "screens" while scrolling (P1-T08).
 */
export function MarketingPriorityHandoff({
  priority = PRIORITY_FIXTURE_ACME,
  opacity = 1,
  translateY = 0,
  phase = 'incoming',
  pulseScale = 1,
  className,
}: MarketingPriorityHandoffProps) {
  const statusText =
    phase === 'done' ? 'Done' : phase === 'acting' ? 'MindMesh handles this →' : '';

  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-mm-outline-variant/60 bg-mm-surface-container-high px-4 py-2.5 shadow-md ${className ?? ''}`}
      data-marketing-priority-handoff
      data-priority-handoff-phase={phase}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: opacity < 1 ? 'transform, opacity' : undefined,
      }}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
          phase === 'done' ? 'bg-emerald-400' : 'bg-mm-primary'
        }`}
        aria-hidden
      />
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-mm-on-background">
        {priority.title}
      </p>
      {statusText ? (
        <span
          className={`flex shrink-0 items-center gap-1 text-sm font-medium transition-colors duration-300 ${
            phase === 'done' ? 'text-emerald-400' : 'text-mm-primary'
          }`}
          style={{
            transform: `scale(${pulseScale})`,
            willChange: 'transform',
          }}
        >
          {phase === 'done' ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
          {statusText}
        </span>
      ) : null}
    </div>
  );
}
