'use client';

import { ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { StaticCalendarEvents } from '@/components/dashboard/StaticCalendarEvents';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import {
  INBOX_SCENE_FIXTURES_ACME,
  UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
  type InboxSceneFixture,
  type UpcomingEventsSceneFixture,
} from '@/lib/marketing-product-overview-data';
import type {
  InboxEmailSource,
  InboxMessageFixture,
} from '@/lib/marketing-demo-data';

const SOURCE_ICON: Record<InboxEmailSource, string | undefined> = {
  Gmail: MARKETING_INTEGRATIONS.find((app) => app.id === 'gmail')?.iconSrc,
  'Outlook Email': MARKETING_INTEGRATIONS.find((app) => app.id === 'outlook-email')
    ?.iconSrc,
  'SMTP Mailbox': MARKETING_INTEGRATIONS.find((app) => app.id === 'smtp')?.iconSrc,
};

type SourceFilterId = 'all' | InboxEmailSource;

function initialsFromName(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function SourceGlyph({ source }: { source: InboxEmailSource }) {
  const iconSrc = SOURCE_ICON[source];
  if (iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconSrc} alt="" width={14} height={14} className="h-3.5 w-3.5" />
    );
  }
  return (
    <span className="text-[10px] font-semibold text-mm-primary">
      {source.charAt(0)}
    </span>
  );
}

function SourceFilterBar({
  filters,
  active,
  onChange,
  counts,
}: {
  filters: readonly InboxEmailSource[];
  active: SourceFilterId;
  onChange: (next: SourceFilterId) => void;
  counts: Record<SourceFilterId, number>;
}) {
  const options: { id: SourceFilterId; label: string }[] = [
    { id: 'all', label: 'All' },
    ...filters.map((source) => ({ id: source as SourceFilterId, label: source })),
  ];

  return (
    <div
      className="flex flex-wrap gap-1.5 border-b border-mm-outline-variant/50 pb-3"
      role="tablist"
      aria-label="Filter inbox by email source"
      data-overview-email-source-filters
    >
      {options.map((option) => {
        const selected = active === option.id;
        const iconSrc =
          option.id === 'all' ? undefined : SOURCE_ICON[option.id as InboxEmailSource];
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={[
              'inline-flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
              selected
                ? 'border-mm-primary/40 bg-mm-primary/15 text-mm-primary'
                : 'border-mm-outline-variant/50 text-mm-on-surface-variant hover:border-mm-outline-variant hover:text-mm-on-surface',
            ].join(' ')}
            data-email-source-filter={option.id}
          >
            {iconSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={iconSrc} alt="" width={14} height={14} className="h-3.5 w-3.5" />
            ) : null}
            <span>{option.label}</span>
            <span className="tabular-nums opacity-70">{counts[option.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}

function InboxMessageRow({
  message,
  selected,
  onSelect,
}: {
  message: InboxMessageFixture;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      data-inbox-message-id={message.id}
      data-inbox-highlight={selected || message.highlight ? 'true' : 'false'}
      className={[
        'flex w-full gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors',
        selected
          ? 'border-mm-primary/50 bg-mm-surface-container-high ring-1 ring-mm-primary/30'
          : 'border-mm-outline-variant/50 bg-mm-surface-container-high hover:border-mm-outline-variant',
      ].join(' ')}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mm-surface-container-highest text-[11px] font-semibold text-mm-on-surface-variant">
        {initialsFromName(message.from)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium text-mm-on-background">
            {message.subject}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-mm-outline-variant/60 bg-mm-surface px-2 py-0.5 text-[10px] text-mm-on-surface-variant">
            <SourceGlyph source={message.source} />
            <span className="max-w-[5.5rem] truncate">{message.source}</span>
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <p className="truncate text-xs text-mm-on-surface-variant">{message.from}</p>
          {message.unread ? (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mm-primary" aria-label="Unread" />
          ) : null}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-mm-on-surface-variant/80">
          {message.preview}
        </p>
      </div>
    </button>
  );
}

function FocusedEmailPanel({
  email,
  approvalHint,
}: {
  email: InboxMessageFixture;
  approvalHint: string;
}) {
  return (
    <article
      className="h-full rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container-high p-4"
      data-overview-focused-email={email.id}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mm-primary/20 text-sm font-semibold text-mm-primary">
          {initialsFromName(email.from)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-mm-on-surface md:text-base">
                {email.subject}
              </h4>
              <p className="mt-0.5 text-xs text-mm-on-surface-variant">
                From {email.from} · To {email.to}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-mm-outline-variant/60 bg-mm-surface px-2 py-0.5 text-[10px] text-mm-on-surface-variant">
                <SourceGlyph source={email.source} />
                {email.source}
              </span>
              <span className="text-[11px] text-mm-on-surface-variant">
                {email.receivedAt}
              </span>
              {email.unread ? (
                <span className="rounded-full bg-mm-primary/15 px-2 py-0.5 text-[10px] font-medium text-mm-primary">
                  Unread
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-mm-on-surface-variant">
        {email.body}
      </p>

      {email.needsApproval ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-mm-outline-variant/40 pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-mm-outline-variant/60 bg-mm-surface px-2.5 py-1.5 text-xs font-medium text-mm-on-surface-variant">
            <ShieldCheck className="h-3.5 w-3.5 text-mm-primary" aria-hidden />
            Needs approval
          </span>
          <span className="text-xs text-mm-on-surface-variant">{approvalHint}</span>
        </div>
      ) : null}
    </article>
  );
}

export type UpcomingEventsOverviewSceneProps = {
  scene?: UpcomingEventsSceneFixture;
  className?: string;
};

/**
 * Upcoming Events overview scene: Today calendar rail only.
 */
export function UpcomingEventsOverviewScene({
  scene = UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
  className,
}: UpcomingEventsOverviewSceneProps) {
  const eventHighlightIds = scene.events
    .filter((event) => event.highlight)
    .map((event) => event.id);

  return (
    <div
      className={['space-y-3', className].filter(Boolean).join(' ')}
      data-overview-scene="upcoming-events"
    >
      <StaticCalendarEvents
        variant="marketing"
        events={scene.events}
        hideJoinButtons={false}
        highlightIds={eventHighlightIds}
      />
      <p className="text-[11px] leading-relaxed text-mm-on-surface-variant">
        Join Meeting opens the call from the connected calendar. Schedule writes
        stay approval-gated in the desktop product.
      </p>
    </div>
  );
}

export type InboxOverviewSceneProps = {
  scene?: InboxSceneFixture;
  className?: string;
};

/**
 * Email Inbox overview: source filters, clickable rows, detail pane on the right.
 */
export function InboxOverviewScene({
  scene = INBOX_SCENE_FIXTURES_ACME,
  className,
}: InboxOverviewSceneProps) {
  const [sourceFilter, setSourceFilter] = useState<SourceFilterId>('all');
  const [selectedId, setSelectedId] = useState<string>(
    scene.threads.find((thread) => thread.highlight)?.id ?? scene.threads[0]?.id ?? ''
  );

  const counts = useMemo(() => {
    const next: Record<SourceFilterId, number> = {
      all: scene.threads.length,
      Gmail: 0,
      'Outlook Email': 0,
      'SMTP Mailbox': 0,
    };
    for (const thread of scene.threads) {
      next[thread.source] += 1;
    }
    return next;
  }, [scene.threads]);

  const visibleThreads = useMemo(() => {
    if (sourceFilter === 'all') return scene.threads;
    return scene.threads.filter((thread) => thread.source === sourceFilter);
  }, [scene.threads, sourceFilter]);

  const selected =
    visibleThreads.find((thread) => thread.id === selectedId) ??
    visibleThreads[0] ??
    null;

  const unreadCount = visibleThreads.filter((thread) => thread.unread).length;

  const handleFilterChange = (next: SourceFilterId) => {
    setSourceFilter(next);
    const nextRows =
      next === 'all'
        ? scene.threads
        : scene.threads.filter((thread) => thread.source === next);
    if (!nextRows.some((thread) => thread.id === selectedId)) {
      setSelectedId(nextRows[0]?.id ?? '');
    }
  };

  return (
    <div
      className={['space-y-3', className].filter(Boolean).join(' ')}
      data-overview-scene="inbox"
    >
      <div className="rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-mm-on-background">Inbox</h3>
          {unreadCount > 0 ? (
            <span className="rounded-full bg-mm-primary-container/30 px-2 py-0.5 text-[11px] font-medium text-mm-primary">
              {unreadCount} unread
            </span>
          ) : null}
        </div>

        <SourceFilterBar
          filters={scene.sourceFilters}
          active={sourceFilter}
          onChange={handleFilterChange}
          counts={counts}
        />

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="min-w-0 space-y-2" role="list" aria-label="Inbox messages">
            {visibleThreads.map((message) => (
              <div key={message.id} role="listitem">
                <InboxMessageRow
                  message={message}
                  selected={selected?.id === message.id}
                  onSelect={() => setSelectedId(message.id)}
                />
              </div>
            ))}
            {visibleThreads.length === 0 ? (
              <p className="rounded-lg border border-dashed border-mm-outline-variant/50 px-3 py-6 text-center text-xs text-mm-on-surface-variant">
                No messages for this source.
              </p>
            ) : null}
          </div>

          <div className="min-w-0">
            {selected ? (
              <FocusedEmailPanel email={selected} approvalHint={scene.approvalHint} />
            ) : (
              <div className="flex h-full min-h-[12rem] items-center justify-center rounded-xl border border-dashed border-mm-outline-variant/50 px-4 text-center text-xs text-mm-on-surface-variant">
                Select a message to read it here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Prefer UpcomingEventsOverviewScene + InboxOverviewScene. */
export function InboxCalendarOverviewScene({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={['space-y-4', className].filter(Boolean).join(' ')}
      data-overview-scene="inbox-calendar"
    >
      <InboxOverviewScene />
      <UpcomingEventsOverviewScene />
    </div>
  );
}
