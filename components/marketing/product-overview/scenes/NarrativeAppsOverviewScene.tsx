'use client';

import { BookOpen, CircleDot } from 'lucide-react';
import { StaticConnectedApps } from '@/components/dashboard/StaticConnectedApps';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import {
  CONNECTED_APPS_SCENE_FIXTURES_ACME,
  NARRATIVE_APPS_SCENE_FIXTURES_ACME,
  YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME,
  type ConnectedAppsSceneFixture,
  type NarrativeAppsSceneFixture,
  type NarrativeEvidenceChip,
  type YesterdayNarrativeFixture,
  type YesterdayNarrativeSceneFixture,
} from '@/lib/marketing-product-overview-data';

const EVIDENCE_ICON_BY_SOURCE: Record<string, string | undefined> = Object.fromEntries(
  MARKETING_INTEGRATIONS.map((app) => [app.displayName, app.iconSrc])
);

function EvidenceChip({ chip }: { chip: NarrativeEvidenceChip }) {
  const iconSrc = EVIDENCE_ICON_BY_SOURCE[chip.source];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-mm-outline-variant/70 bg-mm-surface px-2.5 py-1 text-[11px] text-mm-on-surface-variant">
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="" width={12} height={12} className="h-3 w-3" />
      ) : null}
      <span className="font-medium text-mm-on-surface">{chip.label}</span>
      <span className="opacity-70">{chip.source}</span>
    </span>
  );
}

function YesterdayNarrativeCard({
  narrative,
}: {
  narrative: YesterdayNarrativeFixture;
}) {
  return (
    <article
      className="rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 md:p-5"
      data-overview-narrative
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mm-primary/15 text-mm-primary">
          <BookOpen className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-mm-on-surface-variant">
            {narrative.dateLabel}
          </p>
          <h4 className="mt-0.5 text-base font-semibold text-mm-on-surface">
            {narrative.title}
          </h4>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mm-on-surface">
        {narrative.summary}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {narrative.stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-lg border border-mm-outline-variant/40 bg-mm-surface px-2 py-2.5 text-center"
          >
            <dt className="text-[10px] uppercase tracking-wide text-mm-on-surface-variant">
              {stat.label}
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-mm-on-surface">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-2.5">
        <div className="rounded-lg border border-mm-outline-variant/40 bg-mm-surface-container-high px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-mm-primary">
            Highlight
          </p>
          <p className="mt-1 text-sm text-mm-on-surface">{narrative.highlight}</p>
        </div>
        <div className="rounded-lg border border-mm-outline-variant/40 px-3 py-2.5">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-mm-on-surface-variant">
            <CircleDot className="h-3 w-3 text-mm-primary" aria-hidden />
            Open loop
          </p>
          <p className="mt-1 text-sm text-mm-on-surface-variant">{narrative.openLoop}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-mm-outline-variant/40 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-mm-on-surface-variant">
          Evidence
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {narrative.evidence.map((chip) => (
            <EvidenceChip key={chip.id} chip={chip} />
          ))}
        </div>
      </div>
    </article>
  );
}

export type YesterdayNarrativeOverviewSceneProps = {
  scene?: YesterdayNarrativeSceneFixture;
  className?: string;
};

/**
 * Yesterday Narrative overview scene only.
 */
export function YesterdayNarrativeOverviewScene({
  scene = YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME,
  className,
}: YesterdayNarrativeOverviewSceneProps) {
  return (
    <div
      className={['space-y-4', className].filter(Boolean).join(' ')}
      data-overview-scene="narrative"
    >
      <YesterdayNarrativeCard narrative={scene.narrative} />
    </div>
  );
}

export type ConnectedAppsOverviewSceneProps = {
  scene?: ConnectedAppsSceneFixture;
  className?: string;
};

/**
 * Connected Apps overview scene: seven read sources.
 */
export function ConnectedAppsOverviewScene({
  scene = CONNECTED_APPS_SCENE_FIXTURES_ACME,
  className,
}: ConnectedAppsOverviewSceneProps) {
  return (
    <div
      className={['space-y-3', className].filter(Boolean).join(' ')}
      data-overview-scene="connected-apps"
      data-overview-connected-apps
    >
      <StaticConnectedApps
        variant="marketing"
        apps={scene.apps}
        visibleAppCount={scene.apps.length}
        showConnectedBadge
        showSyncBanner
        highlightAddApp={false}
      />
      <p className="text-[11px] leading-relaxed text-mm-on-surface-variant">
        {scene.syncDetail} Slack and Jira appear as connected sources here, not
        automatic write targets.
      </p>
    </div>
  );
}

export type NarrativeAppsOverviewSceneProps = {
  scene?: NarrativeAppsSceneFixture;
  className?: string;
};

/** @deprecated Prefer YesterdayNarrativeOverviewScene + ConnectedAppsOverviewScene. */
export function NarrativeAppsOverviewScene({
  scene = NARRATIVE_APPS_SCENE_FIXTURES_ACME,
  className,
}: NarrativeAppsOverviewSceneProps) {
  return (
    <div
      className={['space-y-4', className].filter(Boolean).join(' ')}
      data-overview-scene="narrative-apps"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <YesterdayNarrativeCard narrative={scene.narrative} />
        <ConnectedAppsOverviewScene
          scene={{
            headline: scene.headline,
            supportingLine: scene.supportingLine,
            apps: scene.apps,
            syncBadgeLabel: scene.syncBadgeLabel,
            syncDetail: scene.syncDetail,
          }}
        />
      </div>
    </div>
  );
}
