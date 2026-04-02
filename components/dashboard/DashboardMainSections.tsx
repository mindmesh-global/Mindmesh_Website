'use client';

import { StaticDailySummaryPanel } from '@/components/dashboard/StaticDailySummaryPanel';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { StaticDailyNarrativeCard } from '@/components/dashboard/StaticDailyNarrativeCard';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { useSectionHover } from '@/context/SectionHoverContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';
import type { ViewMode } from '@/context/DashboardViewModeContext';

export type DashboardMainSectionsProps = {
  variant: ViewMode;
  timeClashRef: React.RefObject<HTMLDivElement | null>;
  inferredFactsRef: React.RefObject<HTMLDivElement | null>;
  todosRef: React.RefObject<HTMLDivElement | null>;
  eventsRef: React.RefObject<HTMLDivElement | null>;
  upcomingEventsRef: React.RefObject<HTMLDivElement | null>;
  inboxRef: React.RefObject<HTMLDivElement | null>;
  dailyNarrativeRef: React.RefObject<HTMLDivElement | null>;
  connectedAppsRef: React.RefObject<HTMLDivElement | null>;
  bottomSentinelRef: React.RefObject<HTMLDivElement | null>;
};

export function DashboardMainSections({
  variant,
  timeClashRef,
  inferredFactsRef,
  todosRef,
  eventsRef,
  upcomingEventsRef,
  inboxRef,
  dailyNarrativeRef,
  connectedAppsRef,
  bottomSentinelRef,
}: DashboardMainSectionsProps) {
  const sectionHover = useSectionHover();
  const block = variant === 'desktop' ? 'mb-8' : '';

  const createSectionHandlers = (sectionId: HomeSectionId, ref: React.RefObject<HTMLDivElement | null>) => ({
    onMouseEnter: () => {
      const rect = ref?.current?.getBoundingClientRect();
      if (rect) sectionHover?.setHoveredSection(sectionId, rect);
    },
    onMouseLeave: () => sectionHover?.clearHoveredSection(),
  });

  const ring =
    (id: HomeSectionId) =>
      sectionHover?.hoveredSectionId === id
        ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]'
        : '';

  return (
    <>
      <section aria-label="Today's overview" className={block}>
        <StaticDailySummaryPanel
          timeClashRef={timeClashRef}
          inferredFactsRef={inferredFactsRef}
          todosRef={todosRef}
          eventsRef={eventsRef}
        />
      </section>

      <section
        aria-label="Upcoming events"
        ref={upcomingEventsRef}
        data-home-section="upcoming_events"
        className={`${block} relative z-[100] cursor-default rounded-xl transition-all duration-200 ${ring('upcoming_events')}`}
        {...createSectionHandlers('upcoming_events', upcomingEventsRef)}
      >
        <StaticCalendarEvents />
      </section>

      <section
        aria-label="Inbox"
        ref={inboxRef}
        data-home-section="inbox"
        className={`${block} relative z-[100] cursor-default rounded-xl transition-all duration-200 ${ring('inbox')}`}
        {...createSectionHandlers('inbox', inboxRef)}
      >
        <StaticInboxList />
      </section>

      <section
        aria-label="Daily narrative"
        ref={dailyNarrativeRef}
        data-home-section="daily_narrative"
        className={`${block} relative z-[100] cursor-default rounded-xl transition-all duration-200 ${ring('daily_narrative')}`}
        {...createSectionHandlers('daily_narrative', dailyNarrativeRef)}
      >
        <StaticDailyNarrativeCard />
      </section>

      <section
        aria-label="Connected applications"
        ref={connectedAppsRef}
        data-home-section="connected_apps"
        className={`${block} relative z-[100] cursor-default rounded-xl transition-all duration-200 ${ring('connected_apps')}`}
        {...createSectionHandlers('connected_apps', connectedAppsRef)}
      >
        <StaticConnectedApps />
      </section>

      <div ref={bottomSentinelRef} className="h-4 w-full shrink-0" aria-hidden />
    </>
  );
}
