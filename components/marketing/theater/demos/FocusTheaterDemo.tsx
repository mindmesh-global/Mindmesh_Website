'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { MarketingPriorityCard } from '@/components/marketing/theater/marketing/MarketingPriorityCard';
import { MarketingSignalChips } from '@/components/marketing/theater/marketing/MarketingSignalChips';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SIGNAL_FIXTURES_ACME } from '@/lib/marketing-demo-data';
import { playTheaterScrollGuide } from '@/lib/marketing-theater-autoplay';
import {
  getFocusSignalChipMotion,
  getFocusVisualStateFromProgress,
  getReducedMotionFinalProgress,
  getTheaterStep,
} from '@/lib/marketing-theater-scroll';

type FocusTheaterDemoProps = {
  /**
   * Pin to the settled end frame (priority card clear, noise fully faded).
   * Used by the mobile static peek so it never lands mid-scrub.
   */
  forceFinal?: boolean;
};

/**
 * Scroll-driven Focus theater demo (P4-T06).
 * Noisy inbox/calendar → signal chips → cross-highlight → priority emerge.
 * "Act on this" jumps into Execute and plays the action sequence as a guide.
 */
const AUTO_PLAY_DURATION_MS = 5000;

export function FocusTheaterDemo({ forceFinal = false }: FocusTheaterDemoProps) {
  const scroll = useTheaterScroll();
  const [autoProgress, setAutoProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const isPausedForAutoPlay = forceFinal ? false : scroll.isPaused;

  useEffect(() => {
    if (isPausedForAutoPlay) {
      startTimeRef.current = null;
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      return;
    }
    if (startTimeRef.current === null) startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - (startTimeRef.current ?? now)) / AUTO_PLAY_DURATION_MS);
      setAutoProgress(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); } else { rafRef.current = null; }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [isPausedForAutoPlay]);

  const effectiveProgress = forceFinal
    ? getReducedMotionFinalProgress('focus')
    : Math.max(scroll.progress, autoProgress);

  const progress = effectiveProgress;
  const settledProgress = forceFinal ? 1 : progress;
  const step = forceFinal ? getTheaterStep('focus', settledProgress) : scroll.step;
  const visual = getFocusVisualStateFromProgress(settledProgress);
  const isPaused = isPausedForAutoPlay;

  // Stagger Slack in before Jira during the entrance beat only; once the
  // beat has passed, the shared opacity takes over so both chips recede
  // together with the rest of the noisy background.
  const chipMotions =
    !forceFinal && step === 1
      ? SIGNAL_FIXTURES_ACME.map((_, index) =>
          getFocusSignalChipMotion(progress, index, SIGNAL_FIXTURES_ACME.length)
        )
      : undefined;

  const handleActOnThis = useCallback(() => {
    void playTheaterScrollGuide('execute', { durationMs: 22000 });
  }, []);

  // Settled mobile frame: keep a whisper of context behind the priority card,
  // never the mid-scrub chip stack.
  const backgroundOpacity = forceFinal ? 0.14 : visual.backgroundOpacity;
  const showChips = !forceFinal && visual.signalChipsOpacity > 0.02;

  return (
    <div
      className={
        forceFinal
          ? 'relative flex min-h-[280px] flex-col justify-end'
          : 'relative min-h-[280px]'
      }
      data-focus-theater-demo
      data-focus-theater-final={forceFinal ? 'true' : 'false'}
      data-focus-theater-paused={isPaused ? 'true' : 'false'}
      data-focus-theater-step={step}
      data-focus-scroll-progress={settledProgress.toFixed(3)}
    >
      <div
        className={
          forceFinal
            ? 'pointer-events-none absolute inset-0 grid grid-cols-2 gap-3 opacity-[0.14]'
            : 'grid grid-cols-1 gap-3 sm:grid-cols-2'
        }
        data-focus-background
        style={
          forceFinal
            ? undefined
            : {
                opacity: backgroundOpacity,
                willChange: backgroundOpacity < 1 ? 'opacity' : undefined,
              }
        }
        aria-hidden={forceFinal || backgroundOpacity < 0.2}
      >
        <StaticInboxList
          variant="marketing"
          interactive={false}
          highlightIds={forceFinal ? [] : visual.highlightIds}
        />
        <StaticCalendarEvents
          variant="marketing"
          hideJoinButtons
          highlightIds={forceFinal ? [] : visual.highlightIds}
        />
      </div>

      {showChips ? (
        <div
          className="pointer-events-none absolute left-0 top-14 z-10 w-[52%] max-w-[220px] pl-1 sm:top-16"
          data-focus-signal-chips-layer
          style={
            chipMotions
              ? { willChange: 'transform, opacity' }
              : {
                  opacity: visual.signalChipsOpacity,
                  transform: `translateY(${visual.signalChipsTranslateY}px)`,
                  willChange:
                    visual.signalChipsOpacity < 1 ? 'transform, opacity' : undefined,
                }
          }
        >
          <MarketingSignalChips
            chips={SIGNAL_FIXTURES_ACME}
            chipMotions={chipMotions}
            highlightIds={visual.highlightIds}
          />
        </div>
      ) : null}

      {visual.priorityOpacity > 0.01 || forceFinal ? (
        <div
          className={
            forceFinal
              ? 'relative z-20 px-1'
              : 'pointer-events-none absolute inset-x-0 bottom-0 z-20 px-1'
          }
          data-focus-priority-layer
        >
          <p
            className="mb-2 text-center text-xs font-medium tracking-wide text-mm-on-surface-variant"
            style={
              forceFinal
                ? undefined
                : {
                    opacity: visual.focusExtrasOpacity,
                    willChange: visual.focusExtrasOpacity < 1 ? 'opacity' : undefined,
                  }
            }
          >
            Your next focus.
          </p>
          <MarketingPriorityCard
            opacity={forceFinal ? 1 : visual.priorityOpacity}
            scale={forceFinal ? 1 : visual.priorityScale}
            emphasized
            showCta
            ctaOpacity={forceFinal ? 1 : visual.focusExtrasOpacity}
            onCtaClick={handleActOnThis}
          />
        </div>
      ) : null}
    </div>
  );
}
