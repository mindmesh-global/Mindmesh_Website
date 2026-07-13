'use client';

import Image from 'next/image';
import { MindMeshActionStatus } from '@/components/marketing/theater/marketing/MindMeshActionStatus';
import {
  CALENDAR_PREP_FIXTURE_ACME,
  type CalendarPrepFixture,
} from '@/lib/marketing-demo-data';
import {
  getExecuteCalendarReveal,
  getExecuteCalendarStatus,
  type ExecuteCalendarStatus,
} from '@/lib/marketing-theater-scroll';

export type { CalendarPrepFixture };

export type MarketingCalendarBlockProps = {
  event?: CalendarPrepFixture;
  scrollProgress?: number;
  opacity?: number;
  translateX?: number;
  className?: string;
};

const CALENDAR_STATUS_COPY: Record<
  ExecuteCalendarStatus,
  { label: string; kind: 'working' | 'success' }
> = {
  blocking: { label: 'MindMesh is blocking time…', kind: 'working' },
  blocked: { label: 'Prep blocked', kind: 'success' },
};

/**
 * Google Calendar prep event block for Execute theater (P4-T09).
 */
export function MarketingCalendarBlock({
  event = CALENDAR_PREP_FIXTURE_ACME,
  scrollProgress,
  opacity: opacityProp,
  translateX: translateXProp,
  className,
}: MarketingCalendarBlockProps) {
  const reveal =
    scrollProgress !== undefined
      ? getExecuteCalendarReveal(scrollProgress)
      : { opacity: opacityProp ?? 1, translateX: translateXProp ?? 0 };

  const { opacity, translateX } = reveal;
  const status: ExecuteCalendarStatus =
    scrollProgress !== undefined ? getExecuteCalendarStatus(scrollProgress) : 'blocked';
  const statusCopy = CALENDAR_STATUS_COPY[status];

  if (opacity <= 0.01) return null;

  return (
    <div
      className={`rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 ${className ?? ''}`}
      data-marketing-calendar-block
      data-calendar-status={status}
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        willChange: opacity < 1 ? 'transform, opacity' : undefined,
      }}
    >
      <div className="mb-3 flex items-center gap-2.5 border-b border-mm-outline-variant/40 pb-3">
        <Image
          src="/images/icons/google-calendar.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
        <span className="text-sm font-semibold text-mm-on-background">Google Calendar</span>
      </div>

      <div className="rounded-lg border border-mm-primary/30 bg-mm-surface-container-high p-3">
        <p className="text-sm font-medium text-mm-on-background">{event.title}</p>
        <p className="mt-1 text-xs text-mm-on-surface-variant">{event.time}</p>
        {event.note ? (
          <p className="mt-2 text-xs text-mm-on-surface-variant">{event.note}</p>
        ) : null}
      </div>

      <div className="mt-4">
        <MindMeshActionStatus label={statusCopy.label} kind={statusCopy.kind} />
      </div>
    </div>
  );
}
