'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export const HOME_SECTIONS = {
  time_clash: {
    id: 'time_clash',
    title: 'Time Clash',
    summary: 'Overlapping meetings from your calendar. Fix conflicts before your day starts.',
    inferredFacts: [] as string[],
  },
  attention: {
    id: 'attention',
    title: 'Attention',
    summary: 'Urgent items now, ranked tasks for later today, and what was quietly handled.',
    inferredFacts: [] as string[],
  },
  todos: {
    id: 'todos',
    title: 'Todos',
    summary: 'Tasks extracted from emails & calendar. Check off as you go. Contains: action items, due dates, reminders.',
    inferredFacts: [] as string[],
  },
  events: {
    id: 'events',
    title: 'Events',
    summary: 'Calendar events with times. Contains: meetings, clash alerts when schedules overlap.',
    inferredFacts: [] as string[],
  },
  inferred_facts: {
    id: 'inferred_facts',
    title: 'Inferred Facts',
    summary: 'AI-extracted insights from emails & calendar: deadlines, requests, updates.',
  },
  upcoming_events: {
    id: 'upcoming_events',
    title: 'Upcoming Events',
    summary: 'Meetings & deadlines from your calendars. Contains: upcoming schedule, due dates.',
    inferredFacts: [] as string[],
  },
  inbox: {
    id: 'inbox',
    title: 'Inbox',
    summary: 'Priority emails needing attention. Contains: important threads, actionable items.',
    inferredFacts: [] as string[],
  },
  daily_narrative: {
    id: 'daily_narrative',
    title: "Yesterday's Narrative",
    summary: 'AI-written story of your day. Contains: emails, calendar & tasks woven into one narrative.',
    inferredFacts: [] as string[],
  },
  connected_apps: {
    id: 'connected_apps',
    title: 'Connected Apps',
    summary: 'Gmail, Outlook & more. All your accounts read & organized in one place.',
    inferredFacts: [] as string[],
  },
} as const;

export type HomeSectionId = keyof typeof HOME_SECTIONS;

type HomeSectionContextType = {
  activeSection: HomeSectionId | null;
  setActiveSection: (id: HomeSectionId | null) => void;
  sectionConfig: typeof HOME_SECTIONS;
};

const HomeSectionContext = createContext<HomeSectionContextType | null>(null);

export function HomeSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<HomeSectionId | null>(null);
  const setActiveSection = useCallback((id: HomeSectionId | null) => {
    setActiveSectionState(id);
  }, []);

  return (
    <HomeSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        sectionConfig: HOME_SECTIONS,
      }}
    >
      {children}
    </HomeSectionContext.Provider>
  );
}

export function useHomeSection() {
  const ctx = useContext(HomeSectionContext);
  if (!ctx) return null;
  return ctx;
}
