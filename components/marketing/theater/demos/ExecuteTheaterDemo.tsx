'use client';

import { MarketingCalendarBlock } from '@/components/marketing/theater/marketing/MarketingCalendarBlock';
import { MarketingDraftPanel } from '@/components/marketing/theater/marketing/MarketingDraftPanel';
import { MarketingExecuteSuccess } from '@/components/marketing/theater/marketing/MarketingExecuteSuccess';
import { MarketingJiraRow } from '@/components/marketing/theater/marketing/MarketingJiraRow';
import { MarketingPriorityHandoff } from '@/components/marketing/theater/marketing/MarketingPriorityHandoff';
import { useTheaterScroll } from '@/components/marketing/theater/TheaterScrollContext';
import { getExecuteVisualStateFromProgress } from '@/lib/marketing-theater-scroll';

/**
 * Scroll-driven Execute theater demo (P4-T10).
 * Priority carry-over → draft → calendar → Jira → success per P1-T08.
 */
export function ExecuteTheaterDemo() {
  const { progress, isPaused, step } = useTheaterScroll();
  const visual = getExecuteVisualStateFromProgress(progress);

  return (
    <div
      className="relative min-h-[320px]"
      data-execute-theater-demo
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
          pulseScale={visual.ctaPulseScale}
        />
      </div>

      {visual.showHoldStack ? (
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
