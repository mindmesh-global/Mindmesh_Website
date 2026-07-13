'use client';

import { useCallback } from 'react';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { MarketingPriorityCard } from '@/components/marketing/theater/marketing/MarketingPriorityCard';
import { MarketingSignalChips } from '@/components/marketing/theater/marketing/MarketingSignalChips';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { SIGNAL_FIXTURES_ACME } from '@/lib/marketing-demo-data';
import { playTheaterScrollGuide } from '@/lib/marketing-theater-autoplay';
import { getFocusSignalChipMotion, getFocusVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Focus theater demo (P4-T06).
 * Noisy inbox/calendar → signal chips → cross-highlight → priority emerge.
 * "Act on this" jumps into Execute and plays the action sequence as a guide.
 */
export function FocusTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getFocusVisualStateFromProgress(progress);
  // Stagger Slack in before Jira during the entrance beat only; once the
  // beat has passed, the shared opacity takes over so both chips recede
  // together with the rest of the noisy background.
  const chipMotions =
    step === 1
      ? SIGNAL_FIXTURES_ACME.map((_, index) =>
          getFocusSignalChipMotion(progress, index, SIGNAL_FIXTURES_ACME.length)
        )
      : undefined;

  const handleActOnThis = useCallback(() => {
    void playTheaterScrollGuide('execute', { durationMs: 22000 });
  }, []);

  return (
    <div
      className="relative min-h-[280px]"
      data-focus-theater-demo
      data-focus-theater-paused={isPaused ? 'true' : 'false'}
      data-focus-theater-step={step}
      data-focus-scroll-progress={progress.toFixed(3)}
    >
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        data-focus-background
        style={{
          opacity: visual.backgroundOpacity,
          willChange: visual.backgroundOpacity < 1 ? 'opacity' : undefined,
        }}
      >
        <StaticInboxList
          variant="marketing"
          interactive={false}
          highlightIds={visual.highlightIds}
        />
        <StaticCalendarEvents
          variant="marketing"
          hideJoinButtons
          highlightIds={visual.highlightIds}
        />
      </div>

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

      {visual.priorityOpacity > 0.01 ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-1"
          data-focus-priority-layer
        >
          {visual.showFocusLabel ? (
            <p
              className="mb-2 text-center text-xs font-medium tracking-wide text-mm-on-surface-variant"
              style={{
                opacity: visual.focusExtrasOpacity,
                willChange: visual.focusExtrasOpacity < 1 ? 'opacity' : undefined,
              }}
            >
              Your next focus.
            </p>
          ) : null}
          <MarketingPriorityCard
            opacity={visual.priorityOpacity}
            scale={visual.priorityScale}
            emphasized={visual.priorityEmphasized}
            showCta={visual.showPriorityCta}
            ctaOpacity={visual.focusExtrasOpacity}
            onCtaClick={handleActOnThis}
          />
        </div>
      ) : null}
    </div>
  );
}
