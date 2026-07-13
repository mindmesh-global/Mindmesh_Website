'use client';

import { Calculator } from 'lucide-react';
import { TypingText } from '@/components/ui/TypingText';
import { SENSOR_CALC_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import type { SensorCalcResultMotion } from '@/lib/marketing-theater-scroll';

export type MarketingSensorCalcPanelProps = {
  queryCharIndex: number;
  resolveOpacity: number;
  resultMotion: SensorCalcResultMotion;
  secondaryOpacity: number;
  query?: string;
  idleHint?: string;
  resolveLabel?: string;
  resultAnswer?: string;
  resultSubtitle?: string;
  resultEyebrow?: string;
  secondaryAction?: string;
};

/**
 * Coded Sensor calc UI for the scroll theater (P10-T03).
 * Idle → type calc → resolve → result card → secondary affordance.
 * Motion: transform + opacity only.
 */
export function MarketingSensorCalcPanel({
  queryCharIndex,
  resolveOpacity,
  resultMotion,
  secondaryOpacity,
  query = SENSOR_CALC_THEATER_FIXTURES.query,
  idleHint = SENSOR_CALC_THEATER_FIXTURES.idleHint,
  resolveLabel = SENSOR_CALC_THEATER_FIXTURES.resolveLabel,
  resultAnswer = SENSOR_CALC_THEATER_FIXTURES.result.answer,
  resultSubtitle = SENSOR_CALC_THEATER_FIXTURES.result.subtitle,
  resultEyebrow = SENSOR_CALC_THEATER_FIXTURES.result.eyebrow,
  secondaryAction = SENSOR_CALC_THEATER_FIXTURES.secondaryAction,
}: MarketingSensorCalcPanelProps) {
  const isIdle = queryCharIndex <= 0;

  return (
    <div
      className="mx-auto w-full max-w-md"
      data-marketing-sensor-calc-panel
      data-sensor-calc-query-chars={queryCharIndex}
    >
      <div className="rounded-lg border border-mm-outline-variant bg-mm-surface-container-low px-3 py-2.5">
        <div
          className="flex min-h-[1.5rem] items-center text-sm text-mm-on-background"
          data-sensor-calc-command-bar
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

      {resolveOpacity > 0.01 ? (
        <p
          className="mt-3 text-xs font-medium text-mm-on-surface-variant"
          data-sensor-calc-resolve
          style={{
            opacity: resolveOpacity,
            willChange: resolveOpacity < 1 ? 'opacity' : undefined,
          }}
        >
          {resolveLabel}
        </p>
      ) : null}

      {resultMotion.opacity > 0.01 ? (
        <div
          className="mt-3 rounded-lg border border-mm-outline-variant/80 bg-mm-surface-container-high px-4 py-4"
          data-sensor-calc-result
          style={{
            opacity: resultMotion.opacity,
            transform: `translateY(${resultMotion.translateY}px)`,
            willChange:
              resultMotion.opacity < 1 || resultMotion.translateY > 0.1
                ? 'transform, opacity'
                : undefined,
          }}
        >
          <p className="text-[10px] font-medium uppercase tracking-wide text-mm-on-surface-variant">
            {resultEyebrow}
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-mm-on-background">
            {resultAnswer}
          </p>
          <p className="mt-1 text-sm text-mm-on-surface-variant">{resultSubtitle}</p>
        </div>
      ) : null}

      {secondaryOpacity > 0.01 ? (
        <div
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-mm-outline-variant/80 bg-mm-surface-container px-3 py-2 text-xs font-medium text-mm-on-surface-variant"
          data-sensor-calc-secondary
          style={{
            opacity: secondaryOpacity * 0.85,
            willChange: secondaryOpacity < 1 ? 'opacity' : undefined,
          }}
        >
          <Calculator className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {secondaryAction}
        </div>
      ) : null}
    </div>
  );
}
