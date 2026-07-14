'use client';

import Image from 'next/image';
import {
  Bell,
  BookOpen,
  CalendarDays,
  Inbox,
  Plug,
} from 'lucide-react';
import {
  EMAIL_FOLDER_FIXTURES_ACME,
  type ProductOverviewSceneId,
  type ProductOverviewSidebarTab,
} from '@/lib/marketing-product-overview-data';
import { MARKETING_PERSONA_ACME } from '@/lib/marketing-demo-data';

type ProductOverviewNavProps = {
  activeTab: ProductOverviewSidebarTab;
  emailExpanded: boolean;
  /** Soft secondary highlight for Connected apps during narrative scene. */
  appsSecondary?: boolean;
  /** Switch overview scene in-place (same model as progress tabs). */
  onSelectScene?: (scene: ProductOverviewSceneId) => void;
  className?: string;
};

function navButtonClass(active: boolean, interactive: boolean): string {
  return [
    'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
    interactive ? 'cursor-pointer' : 'cursor-default',
    active
      ? 'bg-mm-primary/15 text-mm-primary'
      : 'text-mm-on-surface-variant hover:bg-mm-surface-container hover:text-mm-on-surface',
  ].join(' ');
}

function iconWrapClass(active: boolean): string {
  return [
    'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
    active ? 'bg-mm-primary/20 text-mm-primary' : 'bg-white/5 text-mm-on-surface-variant',
  ].join(' ');
}

/**
 * Product overview sidebar. When `onSelectScene` is set, rows switch the
 * in-frame scene (Attention / Upcoming events / Email / Narrative & apps).
 */
export function ProductOverviewNav({
  activeTab,
  emailExpanded,
  appsSecondary = false,
  onSelectScene,
  className,
}: ProductOverviewNavProps) {
  const interactive = typeof onSelectScene === 'function';
  const attentionActive = activeTab === 'attention';
  const eventsActive = activeTab === 'events';
  const inboxActive = activeTab === 'inbox';
  const narrativeActive = activeTab === 'narrative';
  const appsActive = activeTab === 'apps';
  const companionsActive = activeTab === 'companions';

  const select = (scene: ProductOverviewSceneId) => {
    onSelectScene?.(scene);
  };

  return (
    <nav
      className={`flex h-full w-[220px] shrink-0 flex-col border-r border-mm-outline-variant/60 bg-mm-surface ${className ?? ''}`}
      aria-label="MindMesh product overview"
      data-overview-nav
      data-overview-tab={activeTab}
    >
      <div className="flex items-center gap-2 border-b border-mm-outline-variant/40 px-3 py-3">
        <Image
          src="/images/Logo/mindmesh-logo-tight.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain"
          aria-hidden
        />
        <span className="text-sm font-semibold text-mm-on-surface">MindMesh</span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        <button
          type="button"
          className={navButtonClass(attentionActive, interactive)}
          aria-current={attentionActive ? 'true' : undefined}
          aria-pressed={attentionActive}
          disabled={!interactive}
          onClick={() => select(1)}
        >
          <span className={iconWrapClass(attentionActive)}>
            <Bell className="h-3.5 w-3.5" aria-hidden />
          </span>
          Attention
        </button>

        <button
          type="button"
          className={navButtonClass(eventsActive, interactive)}
          aria-current={eventsActive ? 'true' : undefined}
          aria-pressed={eventsActive}
          aria-hidden={companionsActive ? true : undefined}
          tabIndex={companionsActive ? -1 : undefined}
          disabled={!interactive}
          onClick={() => select(2)}
        >
          <span className={iconWrapClass(eventsActive)}>
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          </span>
          Upcoming events
        </button>

        <div>
          <button
            type="button"
            className={navButtonClass(inboxActive, interactive)}
            aria-current={inboxActive ? 'true' : undefined}
            aria-pressed={inboxActive}
            disabled={!interactive}
            onClick={() => select(3)}
          >
            <span className={iconWrapClass(inboxActive)}>
              <Inbox className="h-3.5 w-3.5" aria-hidden />
            </span>
            Email
          </button>
          {emailExpanded || inboxActive ? (
            <ul
              className="mt-0.5 ml-5 space-y-0.5 border-l border-mm-outline-variant/40 pl-2"
              role="list"
            >
              {EMAIL_FOLDER_FIXTURES_ACME.map((folder) => {
                const folderActive = inboxActive && folder.id === 'inbox';
                return (
                  <li key={folder.id}>
                    <button
                      type="button"
                      className={[
                        'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition-colors',
                        interactive
                          ? 'cursor-pointer hover:bg-mm-surface-container hover:text-mm-on-surface'
                          : 'cursor-default',
                        folderActive
                          ? 'bg-mm-primary/10 text-mm-primary'
                          : 'text-mm-on-surface-variant',
                      ].join(' ')}
                      disabled={!interactive}
                      onClick={() => select(3)}
                    >
                      <span>{folder.label}</span>
                      <span className="tabular-nums opacity-70">{folder.count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className={navButtonClass(narrativeActive, interactive)}
          aria-current={narrativeActive ? 'true' : undefined}
          aria-pressed={narrativeActive}
          disabled={!interactive}
          onClick={() => select(4)}
          data-overview-stage-anchor=""
        >
          <span className={iconWrapClass(narrativeActive)}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
          </span>
          Yesterday narrative
        </button>

        <button
          type="button"
          className={navButtonClass(appsActive, interactive)}
          aria-current={appsActive ? 'true' : undefined}
          aria-pressed={appsActive}
          disabled={!interactive}
          onClick={() => select(5)}
        >
          <span className={iconWrapClass(appsActive)}>
            <Plug className="h-3.5 w-3.5" aria-hidden />
          </span>
          Connected apps
        </button>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-mm-outline-variant/40 px-3 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mm-primary/20 text-sm font-semibold text-mm-primary">
          {MARKETING_PERSONA_ACME.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-mm-on-surface">
            {MARKETING_PERSONA_ACME.name}
          </p>
          <p className="truncate text-xs text-mm-on-surface-variant">
            {MARKETING_PERSONA_ACME.company}
          </p>
        </div>
      </div>
    </nav>
  );
}
