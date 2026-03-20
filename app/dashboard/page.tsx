'use client';

import { useRef, useEffect } from 'react';
import { StaticDailySummaryPanel } from '@/components/dashboard/StaticDailySummaryPanel';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { StaticDailyNarrativeCard } from '@/components/dashboard/StaticDailyNarrativeCard';
import { StaticWeatherCard } from '@/components/dashboard/StaticWeatherCard';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { SectionDimOverlay } from '@/components/dashboard/SectionDimOverlay';
import { SectionHoverProvider, useSectionHover } from '@/context/SectionHoverContext';
import { useHomeSection } from '@/context/HomeSectionContext';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';

const SECTION_IDS: HomeSectionId[] = [
  'time_clash',
  'inferred_facts',
  'todos',
  'events',
  'upcoming_events',
  'inbox',
  'daily_narrative',
  'connected_apps',
];

export default function DashboardPage() {
  const setActiveSection = useHomeSection()?.setActiveSection;
  const uiOverlay = useUIOverlay();
  const onboarding = useOnboardingTour();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const timeClashRef = useRef<HTMLDivElement>(null);
  const inferredFactsRef = useRef<HTMLDivElement>(null);
  const todosRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const upcomingEventsRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const dailyNarrativeRef = useRef<HTMLDivElement>(null);
  const connectedAppsRef = useRef<HTMLDivElement>(null);

  const sectionRefsMap: Record<HomeSectionId, React.RefObject<HTMLDivElement | null>> = {
    time_clash: timeClashRef,
    inferred_facts: inferredFactsRef,
    todos: todosRef,
    events: eventsRef,
    upcoming_events: upcomingEventsRef,
    inbox: inboxRef,
    daily_narrative: dailyNarrativeRef,
    connected_apps: connectedAppsRef,
  };

  useEffect(() => {
    if (!setActiveSection) return;
    const scrollRoot = containerRef.current?.parentElement;
    if (!scrollRoot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (onboarding?.introCompleted && !onboarding?.mascotTourCompleted) return; // Don't override during mascot tour
        let best: { id: HomeSectionId; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute('data-home-section') as HomeSectionId | null;
          if (id && SECTION_IDS.includes(id) && entry.intersectionRatio > (best?.ratio ?? 0)) {
            best = { id, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActiveSection(best.id);
      },
      {
        root: scrollRoot,
        rootMargin: '-5% 0px -55% 0px',
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = sectionRefsMap[id].current;
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection, onboarding?.introCompleted, onboarding?.mascotTourCompleted]);

  useEffect(() => {
    if (!setActiveSection) return;
    setActiveSection('time_clash');
    return () => setActiveSection(null);
  }, [setActiveSection]);

  useEffect(() => {
    if (!setActiveSection) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') setActiveSection('time_clash');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [setActiveSection]);

  // Track scroll-to-bottom for sensor bar tooltip (only show when user has scrolled to end)
  useEffect(() => {
    if (!uiOverlay?.setHasScrolledToBottom) return;
    const scrollRoot = containerRef.current?.parentElement ?? null;
    const sentinel = bottomSentinelRef.current;
    const connectedAppsEl = connectedAppsRef.current;
    if (!sentinel && !connectedAppsEl) return;

    const checkAtBottom = () => {
      if (scrollRoot) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRoot;
        const atBottom = scrollHeight - scrollTop - clientHeight < 50;
        if (atBottom) uiOverlay.setHasScrolledToBottom(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.02);
        if (anyVisible) uiOverlay.setHasScrolledToBottom(true);
        else if (scrollRoot) checkAtBottom();
      },
      { root: scrollRoot ?? null, rootMargin: '0px', threshold: [0, 0.02, 0.1, 0.5, 1] }
    );

    if (sentinel) observer.observe(sentinel);
    if (connectedAppsEl) observer.observe(connectedAppsEl);

    if (scrollRoot) {
      scrollRoot.addEventListener('scroll', checkAtBottom, { passive: true });
      checkAtBottom();
    }

    return () => {
      observer.disconnect();
      scrollRoot?.removeEventListener('scroll', checkAtBottom);
    };
  }, [uiOverlay]);

  return (
    <SectionHoverProvider>
      <SectionDimOverlay />
      <DashboardContent
        containerRef={containerRef}
        bottomSentinelRef={bottomSentinelRef}
        timeClashRef={timeClashRef}
        inferredFactsRef={inferredFactsRef}
        todosRef={todosRef}
        eventsRef={eventsRef}
        upcomingEventsRef={upcomingEventsRef}
        inboxRef={inboxRef}
        dailyNarrativeRef={dailyNarrativeRef}
        connectedAppsRef={connectedAppsRef}
        sectionRefsMap={sectionRefsMap}
        setActiveSection={setActiveSection}
        uiOverlay={uiOverlay}
        onboarding={onboarding}
      />
    </SectionHoverProvider>
  );
}

function DashboardContent({
  containerRef,
  bottomSentinelRef,
  timeClashRef,
  inferredFactsRef,
  todosRef,
  eventsRef,
  upcomingEventsRef,
  inboxRef,
  dailyNarrativeRef,
  connectedAppsRef,
  sectionRefsMap,
  setActiveSection,
  uiOverlay,
  onboarding,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  bottomSentinelRef: React.RefObject<HTMLDivElement | null>;
  timeClashRef: React.RefObject<HTMLDivElement | null>;
  inferredFactsRef: React.RefObject<HTMLDivElement | null>;
  todosRef: React.RefObject<HTMLDivElement | null>;
  eventsRef: React.RefObject<HTMLDivElement | null>;
  upcomingEventsRef: React.RefObject<HTMLDivElement | null>;
  inboxRef: React.RefObject<HTMLDivElement | null>;
  dailyNarrativeRef: React.RefObject<HTMLDivElement | null>;
  connectedAppsRef: React.RefObject<HTMLDivElement | null>;
  sectionRefsMap: Record<HomeSectionId, React.RefObject<HTMLDivElement | null>>;
  setActiveSection: ((id: HomeSectionId | null) => void) | undefined;
  uiOverlay: ReturnType<typeof useUIOverlay>;
  onboarding: ReturnType<typeof useOnboardingTour>;
}) {
  const sectionHover = useSectionHover();

  useEffect(() => {
    if (!sectionHover?.hoveredSectionId || !sectionHover?.updateCutoutRect) return;
    const ref = sectionRefsMap[sectionHover.hoveredSectionId];
    if (!ref?.current) return;
    const update = () => ref.current && sectionHover?.updateCutoutRect(ref.current.getBoundingClientRect());
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [sectionHover?.hoveredSectionId, sectionRefsMap, sectionHover?.updateCutoutRect]);

  const createSectionHandlers = (sectionId: HomeSectionId, ref: React.RefObject<HTMLDivElement | null>) => ({
    onMouseEnter: () => {
      const rect = ref?.current?.getBoundingClientRect();
      if (rect) sectionHover?.setHoveredSection(sectionId, rect);
    },
    onMouseLeave: () => sectionHover?.clearHoveredSection(),
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome back, User</p>
          </div>
          <div className="flex-shrink-0">
            <StaticWeatherCard />
          </div>
        </div>

        {/* Daily Summary Panel */}
        <div className="mb-8">
          <StaticDailySummaryPanel timeClashRef={timeClashRef} inferredFactsRef={inferredFactsRef} todosRef={todosRef} eventsRef={eventsRef} />
        </div>

        {/* Upcoming Events */}
        <div
          ref={upcomingEventsRef}
          data-home-section="upcoming_events"
          className={`mb-8 relative z-[100] transition-all duration-200 rounded-xl cursor-default ${sectionHover?.hoveredSectionId === 'upcoming_events' ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]' : ''}`}
          {...createSectionHandlers('upcoming_events', upcomingEventsRef)}
        >
          <StaticCalendarEvents />
        </div>

        {/* Primary Inbox */}
        <div
          ref={inboxRef}
          data-home-section="inbox"
          className={`mb-8 relative z-[100] transition-all duration-200 rounded-xl cursor-default ${sectionHover?.hoveredSectionId === 'inbox' ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]' : ''}`}
          {...createSectionHandlers('inbox', inboxRef)}
        >
          <StaticInboxList />
        </div>

        {/* Yesterday's Narrative */}
        <div
          ref={dailyNarrativeRef}
          data-home-section="daily_narrative"
          className={`mb-8 relative z-[100] transition-all duration-200 rounded-xl cursor-default ${sectionHover?.hoveredSectionId === 'daily_narrative' ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]' : ''}`}
          {...createSectionHandlers('daily_narrative', dailyNarrativeRef)}
        >
          <StaticDailyNarrativeCard />
        </div>

        {/* Connected Apps */}
        <div
          ref={connectedAppsRef}
          data-home-section="connected_apps"
          className={`mb-8 relative z-[100] transition-all duration-200 rounded-xl cursor-default ${sectionHover?.hoveredSectionId === 'connected_apps' ? 'ring-2 ring-amber-400 ring-offset-2 shadow-xl scale-[1.01]' : ''}`}
          {...createSectionHandlers('connected_apps', connectedAppsRef)}
        >
          <StaticConnectedApps />
        </div>
        {/* Sentinel for scroll-to-bottom detection (sensor bar shows only when this is visible) */}
        <div ref={bottomSentinelRef} className="h-4 w-full shrink-0" aria-hidden />
      </div>
    </div>
  );
}
