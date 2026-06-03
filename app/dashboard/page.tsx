'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StaticWeatherCard } from '@/components/dashboard/StaticWeatherCard';
import { SectionDimOverlay } from '@/components/dashboard/SectionDimOverlay';
import { DashboardMainSections } from '@/components/dashboard/DashboardMainSections';
import { SectionHoverProvider, useSectionHover } from '@/context/SectionHoverContext';
import { useHomeSection } from '@/context/HomeSectionContext';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { DashboardScrollShell } from '@/components/dashboard/view-shells/DashboardScrollShell';
import { useViewMode } from '@/hooks/useViewMode';
import type { HomeSectionId } from '@/context/HomeSectionContext';

const ViewSwitcherButton = dynamic(
  () => import('@/components/ui/ViewSwitcherButton'),
  { ssr: false }
);

const SECTION_IDS: HomeSectionId[] = [
  'time_clash',
  'attention',
  'inferred_facts',
  'todos',
  'events',
  'upcoming_events',
  'inbox',
  'daily_narrative',
  'connected_apps',
];

const layoutTransition = {
  duration: 0.28,
  ease: 'easeInOut' as const,
};

export type DashboardPageProps = { hideViewSwitcher?: boolean };

export default function DashboardPage(props: DashboardPageProps = {}) {
  const { hideViewSwitcher = false } = props;
  return (
    <SectionHoverProvider>
      <SectionDimOverlay />
      <DashboardContent hideViewSwitcher={hideViewSwitcher} />
    </SectionHoverProvider>
  );
}

function DashboardContent({ hideViewSwitcher = false }: DashboardPageProps = {}) {
  const setActiveSection = useHomeSection()?.setActiveSection;
  const uiOverlay = useUIOverlay();
  const onboarding = useOnboardingTour();
  const { viewMode } = useViewMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const timeClashRef = useRef<HTMLDivElement>(null);
  const attentionRef = useRef<HTMLDivElement>(null);
  const inferredFactsRef = useRef<HTMLDivElement>(null);
  const todosRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const upcomingEventsRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const dailyNarrativeRef = useRef<HTMLDivElement>(null);
  const connectedAppsRef = useRef<HTMLDivElement>(null);

  const sectionRefsMap = useMemo(
    (): Record<HomeSectionId, React.RefObject<HTMLDivElement | null>> => ({
      time_clash: timeClashRef,
      attention: attentionRef,
      inferred_facts: inferredFactsRef,
      todos: todosRef,
      events: eventsRef,
      upcoming_events: upcomingEventsRef,
      inbox: inboxRef,
      daily_narrative: dailyNarrativeRef,
      connected_apps: connectedAppsRef,
    }),
    []
  );

  useEffect(() => {
    if (viewMode !== 'scrollable' || !setActiveSection) return;
    const scrollRoot = containerRef.current?.parentElement;
    if (!scrollRoot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (onboarding?.introCompleted && !onboarding?.mascotTourCompleted) return;
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
  }, [
    setActiveSection,
    onboarding?.introCompleted,
    onboarding?.mascotTourCompleted,
    viewMode,
  ]);

  useEffect(() => {
    if (!setActiveSection || viewMode !== 'scrollable') return;
    setActiveSection('time_clash');
    return () => setActiveSection(null);
  }, [setActiveSection, viewMode]);

  useEffect(() => {
    if (!setActiveSection || viewMode !== 'scrollable') return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') setActiveSection('time_clash');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [setActiveSection, viewMode]);

  useEffect(() => {
    if (viewMode !== 'scrollable' || !uiOverlay?.setHasScrolledToBottom) return;
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
  }, [uiOverlay, viewMode]);

  const sectionsProps = {
    timeClashRef,
    attentionRef,
    inferredFactsRef,
    todosRef,
    eventsRef,
    upcomingEventsRef,
    inboxRef,
    dailyNarrativeRef,
    connectedAppsRef,
    bottomSentinelRef,
  };

  const sectionHover = useSectionHover();

  useEffect(() => {
    if (viewMode !== 'scrollable') return;
    if (!sectionHover?.hoveredSectionId || !sectionHover?.updateCutoutRect) return;
    const ref = sectionRefsMap[sectionHover.hoveredSectionId];
    if (!ref?.current) return;
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ref.current) sectionHover?.updateCutoutRect(ref.current.getBoundingClientRect());
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true, capture: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [
    viewMode,
    sectionHover?.hoveredSectionId,
    sectionRefsMap,
    sectionHover?.updateCutoutRect,
  ]);

  if (viewMode === 'desktop') {
    return <div className="min-h-0 w-full flex-1" aria-hidden />;
  }

  return (
    <>
      {!hideViewSwitcher && <ViewSwitcherButton />}
      <div ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key="scrollable"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={layoutTransition}
          >
            <DashboardScrollShell headerRight={<StaticWeatherCard />}>
              <DashboardMainSections variant="scrollable" {...sectionsProps} />
            </DashboardScrollShell>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
