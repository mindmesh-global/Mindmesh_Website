'use client';

import { useEffect, useRef, useState } from 'react';
import { MarketingCalendarBlock } from '@/components/marketing/theater/marketing/MarketingCalendarBlock';
import { MarketingDraftPanel } from '@/components/marketing/theater/marketing/MarketingDraftPanel';
import { MarketingExecuteSuccess } from '@/components/marketing/theater/marketing/MarketingExecuteSuccess';
import { MarketingJiraRow } from '@/components/marketing/theater/marketing/MarketingJiraRow';
import { MarketingPriorityHandoff } from '@/components/marketing/theater/marketing/MarketingPriorityHandoff';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getExecuteVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

type ExecuteTheaterDemoProps = {
  forceFinal?: boolean;
};

const AUTO_PLAY_DURATION_MS = 5000;

export function ExecuteTheaterDemo({ forceFinal = false }: ExecuteTheaterDemoProps) {
  const scroll = useTheaterScroll();
const isPaused = forceFinal ? false : scroll.isPaused;

  const [autoProgress, setAutoProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (forceFinal) return;
    if (isPaused) {
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
  }, [isPaused, forceFinal]);

  const progress = forceFinal ? 1 : Math.max(scroll.progress, autoProgress);
  const visual = getExecuteVisualStateFromProgress(progress);
  const step = forceFinal ? 7 : scroll.step;

  return (
    <div
      className="relative min-h-[320px]"
      data-execute-theater-demo
      data-execute-theater-final={forceFinal ? 'true' : 'false'}
      data-execute-theater-paused={isPaused ? 'true' : 'false'}
      data-execute-theater-step={step}
      data-execute-scroll-progress={progress.toFixed(3)}
      data-execute-hold-stack={visual.showHoldStack ? 'true' : 'false'}
    >
      <div className="relative" data-execute-priority-layer>
        <MarketingPriorityHandoff
          opacity={visual.handoffOpacity}
          translateY={visual.handoffTranslateY}
          phase={visual.handoffPhase}
          pulseScale={forceFinal ? 1 : visual.ctaPulseScale}
        />
      </div>

      {visual.showHoldStack || forceFinal ? (
        <div className="mt-4 space-y-3" data-execute-hold-stack>
          <MarketingDraftPanel scrollProgress={progress} />
          <MarketingCalendarBlock scrollProgress={progress} />
          <MarketingJiraRow scrollProgress={progress} />
          <MarketingExecuteSuccess scrollProgress={progress} />
        </div>
      ) : (
        <div className="relative mt-4 min-h-[220px] md:min-h-[240px]" data-execute-action-layer>
          {visual.draftWrapOpacity > 0.01 ? (
            <div
              className="absolute inset-x-0 top-0 z-10"
              data-execute-draft-layer
              style={{
                opacity: visual.draftWrapOpacity,
                willChange: visual.draftWrapOpacity < 1 ? 'opacity' : undefined,
              }}
            >
              <MarketingDraftPanel scrollProgress={progress} />
            </div>
          ) : null}

          {visual.calendarWrapOpacity > 0.01 ? (
            <div
              className="absolute inset-x-0 top-0 z-20"
              data-execute-calendar-layer
              style={{
                opacity: visual.calendarWrapOpacity,
                willChange: visual.calendarWrapOpacity < 1 ? 'opacity' : undefined,
              }}
            >
              <MarketingCalendarBlock scrollProgress={progress} />
            </div>
          ) : null}

          {visual.jiraWrapOpacity > 0.01 ? (
            <div
              className="absolute inset-x-0 top-0 z-30"
              data-execute-jira-layer
              style={{
                opacity: visual.jiraWrapOpacity,
                willChange: visual.jiraWrapOpacity < 1 ? 'opacity' : undefined,
              }}
            >
              <MarketingJiraRow scrollProgress={progress} />
            </div>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-40" data-execute-success-layer>
            <MarketingExecuteSuccess scrollProgress={progress} />
          </div>
        </div>
      )}
    </div>
  );
}
