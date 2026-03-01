'use client';

import { useRef, useEffect } from 'react';
import { StaticDailySummaryPanel } from '@/components/dashboard/StaticDailySummaryPanel';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { StaticInboxList } from '@/components/dashboard/StaticInboxList';
import { StaticDailyNarrativeCard } from '@/components/dashboard/StaticDailyNarrativeCard';
import { StaticWeatherCard } from '@/components/dashboard/StaticWeatherCard';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { useHomeSection } from '@/context/HomeSectionContext';
import { useUIOverlay } from '@/context/UIOverlayContext';
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
  }, [setActiveSection]);

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
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100">
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
        <div ref={upcomingEventsRef} data-home-section="upcoming_events" className="mb-8">
          <StaticCalendarEvents />
        </div>

        {/* Primary Inbox */}
        <div ref={inboxRef} data-home-section="inbox" className="mb-8">
          <StaticInboxList />
        </div>

        {/* Yesterday's Narrative */}
        <div ref={dailyNarrativeRef} data-home-section="daily_narrative" className="mb-8">
          <StaticDailyNarrativeCard />
        </div>

        {/* Connected Apps */}
        <div ref={connectedAppsRef} data-home-section="connected_apps" className="mb-8">
          <StaticConnectedApps />
        </div>
        {/* Sentinel for scroll-to-bottom detection (sensor bar shows only when this is visible) */}
        <div ref={bottomSentinelRef} className="h-4 w-full shrink-0" aria-hidden />
      </div>
    </div>
  );
}
