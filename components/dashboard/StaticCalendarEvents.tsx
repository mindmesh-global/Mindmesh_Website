'use client';

import Image from 'next/image';
import type { CalendarEventFixture } from '@/lib/marketing-demo-data';
import { CALENDAR_FIXTURES_ACME } from '@/lib/marketing-demo-data';
import { HoverTypingTooltip } from '@/components/ui/HoverTypingTooltip';
import { useSectionHover } from '@/context/SectionHoverContext';

const CALENDAR_SOURCE_ICONS: Record<string, string> = {
  'Google Calendar': '/images/icons/google-calendar.png',
  'Outlook Calendar': '/images/icons/outlook-calendar.png',
};

export type StaticCalendarEventsProps = {
  variant?: 'dashboard' | 'marketing';
  events?: readonly CalendarEventFixture[];
  hideJoinButtons?: boolean;
  dimmed?: boolean;
  highlightIds?: readonly string[];
  className?: string;
};

function DashboardCalendarEventsPanel() {
  const sectionHover = useSectionHover();
  return (
    <div className="calendar-events bg-white dark:bg-gray-800 rounded-xl shadow-[0_18px_36px_-12px_rgba(15,23,42,0.2)] ring-1 ring-gray-100 dark:ring-gray-800 p-6 transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-black dark:text-white">
            <HoverTypingTooltip text="Future calendar events. You can join meeting from here" speed={35} controlledHover={sectionHover?.hoveredSectionId === 'upcoming_events'}>
              Upcoming Events (2)
            </HoverTypingTooltip>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-blue-600 dark:text-blue-400">📅 1 Google</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
              user@gmail.com
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400">📆 1 Outlook</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
              user@outlook.com
            </span>
          </div>
        </div>
        <button type="button" className="h-10 w-30 border-none rounded-full bg-blue-500 text-white text-sm font-medium cursor-pointer px-4 py-2 flex items-center justify-center gap-2">
          <span>🔄</span>
          <span>Refresh</span>
        </button>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Team Standup</h3>
              <div className="mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                  📧 user@example.com
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">📅 Google</span>
                  <span>Today at 10:00 AM</span>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button type="button" className="px-1 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                🚀 Join Meeting
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md border-orange-200 bg-orange-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Client Meeting</h3>
              <div className="mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-purple-100 text-purple-800 border-purple-200">
                  user@outlook.com
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-orange-600 dark:text-orange-400">📅 Outlook</span>
                  <span>Today at 10:15 AM</span>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button type="button" className="px-1 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                🚀 Join Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MarketingCalendarEventsPanelProps = {
  events: readonly CalendarEventFixture[];
  hideJoinButtons: boolean;
  dimmed: boolean;
  highlightIds: readonly string[];
  className?: string;
};

function MarketingCalendarEventsPanel({
  events,
  hideJoinButtons,
  dimmed,
  highlightIds,
  className,
}: MarketingCalendarEventsPanelProps) {
  return (
    <div
      className={`rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 transition-opacity ${className ?? ''}`}
      data-marketing-calendar
      data-calendar-dimmed={dimmed ? 'true' : 'false'}
      style={{ opacity: dimmed ? 0.35 : 1 }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-mm-on-background">Today</h3>
        <span className="text-[11px] text-mm-on-surface-variant">{events.length} events</span>
      </div>
      <div className="space-y-2">
        {events.map((event) => {
          const highlighted = highlightIds.includes(event.id) || event.highlight;
          return (
            <div
              key={event.id}
              data-calendar-event-id={event.id}
              data-calendar-highlight={highlighted ? 'true' : 'false'}
              className={`rounded-lg border px-3 py-2.5 ${
                highlighted
                  ? 'border-mm-primary/50 bg-mm-surface-container-high ring-1 ring-mm-primary/30'
                  : 'border-mm-outline-variant/50 bg-mm-surface-container-high'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-mm-on-background">{event.title}</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-mm-on-surface-variant">
                    <span>{event.time}</span>
                    <span aria-hidden>·</span>
                    {CALENDAR_SOURCE_ICONS[event.source] ? (
                      <Image
                        src={CALENDAR_SOURCE_ICONS[event.source]}
                        alt={event.source}
                        title={event.source}
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 shrink-0 object-contain"
                      />
                    ) : (
                      <span>{event.source}</span>
                    )}
                  </div>
                </div>
                {!hideJoinButtons ? (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    className="shrink-0 rounded-md bg-mm-primary-container px-2.5 py-1.5 text-[11px] font-medium text-mm-on-primary-container"
                  >
                    Join Meeting
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StaticCalendarEvents({
  variant = 'dashboard',
  events = CALENDAR_FIXTURES_ACME,
  hideJoinButtons = true,
  dimmed = false,
  highlightIds = [],
  className,
}: StaticCalendarEventsProps = {}) {
  if (variant === 'dashboard') {
    return <DashboardCalendarEventsPanel />;
  }

  return (
    <MarketingCalendarEventsPanel
      events={events}
      hideJoinButtons={hideJoinButtons}
      dimmed={dimmed}
      highlightIds={highlightIds}
      className={className}
    />
  );
}
