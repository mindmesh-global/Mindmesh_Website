'use client';

import { Calculator, Calendar, List } from 'lucide-react';
import { TypingText } from '@/components/ui/TypingText';
import {
  SENSOR_THEATER_FIXTURES,
  type SensorResultRow,
} from '@/lib/marketing-sensor-mascot-content';
import type { SensorResultMotion } from '@/lib/marketing-theater-scroll';

export type MarketingSensorPanelProps = {
  queryCharIndex: number;
  resultMotions: readonly SensorResultMotion[];
  highlightProgress: number;
  confirmOpacity: number;
  query?: string;
  idleHint?: string;
  confirmChip?: string;
  results?: readonly SensorResultRow[];
  primaryResultId?: SensorResultRow['id'];
};

function ResultIcon({ icon }: { icon: SensorResultRow['icon'] }) {
  const className = 'h-4 w-4 shrink-0 text-mm-on-surface-variant';
  if (icon === 'calculator') return <Calculator className={className} aria-hidden />;
  if (icon === 'meetings') return <List className={className} aria-hidden />;
  return <Calendar className={className} aria-hidden />;
}

/**
 * Coded Sensor command-bar UI for the scroll theater (P8-T09).
 * Motion: transform + opacity only; driven by parent scroll helpers.
 */
export function MarketingSensorPanel({
  queryCharIndex,
  resultMotions,
  highlightProgress,
  confirmOpacity,
  query = SENSOR_THEATER_FIXTURES.query,
  idleHint = SENSOR_THEATER_FIXTURES.idleHint,
  confirmChip = SENSOR_THEATER_FIXTURES.confirmChip,
  results = SENSOR_THEATER_FIXTURES.results,
  primaryResultId = SENSOR_THEATER_FIXTURES.primaryResultId,
}: MarketingSensorPanelProps) {
  const isIdle = queryCharIndex <= 0;
  const highlightScale = 1 + 0.02 * Math.min(1, Math.max(0, highlightProgress));

  return (
    <div
      className="mx-auto w-full max-w-md"
      data-marketing-sensor-panel
      data-sensor-query-chars={queryCharIndex}
      data-sensor-highlight={highlightProgress.toFixed(3)}
    >
      <div className="rounded-lg border border-mm-outline-variant bg-mm-surface-container-low px-3 py-2.5">
        <div
          className="flex min-h-[1.5rem] items-center text-sm text-mm-on-background"
          data-sensor-command-bar
          aria-label="Sensor command"
        >
          {isIdle ? (
            <span className="flex items-center gap-0.5 text-mm-on-surface-variant">
              <span>{idleHint}</span>
              <span
                className="inline-block animate-pulse"
                style={{ animationDuration: '0.8s' }}
                aria-hidden
              >
                |
              </span>
            </span>
          ) : (
            <TypingText
              text={query}
              charIndex={queryCharIndex}
              cursor
              className="font-medium text-mm-on-background"
            />
          )}
        </div>
      </div>

      <ul className="mt-3 space-y-1.5" data-sensor-results role="list">
        {results.map((row, index) => {
          const motion = resultMotions[index] ?? { opacity: 0, translateY: 8 };
          const isPrimary = row.id === primaryResultId;
          const emphasize = isPrimary ? highlightProgress : 0;
          const rowScale = isPrimary ? highlightScale : 1;

          if (motion.opacity < 0.01) return null;

          return (
            <li
              key={row.id}
              data-sensor-result={row.id}
              data-sensor-result-primary={isPrimary ? 'true' : 'false'}
              className="relative flex items-center gap-3 rounded-md border border-mm-outline-variant/80 bg-mm-surface-container-high px-3 py-2.5"
              style={{
                opacity: motion.opacity,
                transform: `translateY(${motion.translateY}px) scale(${rowScale})`,
                willChange:
                  motion.opacity < 1 || (emphasize > 0 && emphasize < 1)
                    ? 'transform, opacity'
                    : undefined,
              }}
            >
              {emphasize > 0.01 ? (
                <span
                  className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-mm-primary/50"
                  style={{ opacity: emphasize }}
                  aria-hidden
                />
              ) : null}
              <ResultIcon icon={row.icon} />
              <span className="relative flex-1 text-sm font-medium text-mm-on-background">
                {row.title}
              </span>
              {row.hint ? (
                <span className="relative rounded border border-mm-outline-variant px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-mm-on-surface-variant">
                  {row.hint}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      {confirmOpacity > 0.01 ? (
        <div
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-mm-primary/40 bg-mm-surface-container-high px-3 py-1.5 text-xs font-medium text-mm-primary"
          data-sensor-confirm-chip
          style={{
            opacity: confirmOpacity,
            willChange: confirmOpacity < 1 ? 'opacity' : undefined,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-mm-primary"
            aria-hidden
          />
          {confirmChip}
        </div>
      ) : null}
    </div>
  );
}
