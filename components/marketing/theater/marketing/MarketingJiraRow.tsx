'use client';

import Image from 'next/image';
import { MindMeshActionStatus } from '@/components/marketing/theater/marketing/MindMeshActionStatus';
import { JIRA_FIXTURE_ACME, type JiraTaskFixture } from '@/lib/marketing-demo-data';
import {
  getExecuteJiraCheckProgress,
  getExecuteJiraStatus,
  type ExecuteJiraStatus,
} from '@/lib/marketing-theater-scroll';

export type { JiraTaskFixture };

export type MarketingJiraRowProps = {
  task?: JiraTaskFixture;
  scrollProgress?: number;
  checked?: boolean;
  /** 0–1 checkmark reveal; derived from scrollProgress when omitted. */
  checkProgress?: number;
  opacity?: number;
  className?: string;
};

const JIRA_STATUS_COPY: Record<
  ExecuteJiraStatus,
  { label: string; kind: 'working' | 'success' }
> = {
  staging: { label: 'MindMesh staging as Done…', kind: 'working' },
  done: { label: 'Marked Done', kind: 'success' },
};

/**
 * Jira task checkbox row for Execute theater (P4-T09).
 */
export function MarketingJiraRow({
  task = JIRA_FIXTURE_ACME,
  scrollProgress,
  checked,
  checkProgress: checkProgressProp,
  opacity = 1,
  className,
}: MarketingJiraRowProps) {
  const checkProgress =
    checkProgressProp ??
    (scrollProgress !== undefined
      ? getExecuteJiraCheckProgress(scrollProgress)
      : checked
        ? 1
        : 0);

  const isChecked = checked ?? checkProgress >= 1;
  const status: ExecuteJiraStatus =
    scrollProgress !== undefined ? getExecuteJiraStatus(scrollProgress) : 'done';
  const statusCopy = JIRA_STATUS_COPY[status];

  if (opacity <= 0.01 && checkProgress <= 0) return null;

  return (
    <div
      className={`rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 ${className ?? ''}`}
      data-marketing-jira-row
      data-jira-checked={isChecked ? 'true' : 'false'}
      data-jira-check-progress={checkProgress.toFixed(2)}
      data-jira-status={status}
      style={{ opacity, willChange: opacity < 1 ? 'opacity' : undefined }}
    >
      <div className="mb-3 flex items-center gap-2.5 border-b border-mm-outline-variant/40 pb-3">
        <Image
          src="/images/icons/jira.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
        <span className="text-sm font-semibold text-mm-on-background">Jira</span>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-mm-outline-variant/50 bg-mm-surface-container-high p-3">
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
            checkProgress > 0.5
              ? 'border-emerald-600 bg-emerald-700/40'
              : 'border-mm-outline-variant bg-mm-surface-container'
          }`}
          style={{
            transform: `scale(${0.85 + 0.15 * Math.min(1, checkProgress)})`,
            willChange: checkProgress < 1 ? 'transform' : undefined,
          }}
          aria-hidden
        >
          {checkProgress > 0.5 ? (
            <svg
              className="h-3.5 w-3.5 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ opacity: Math.min(1, (checkProgress - 0.5) * 2) }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-mm-on-background">
            {task.key} · {task.title}
          </p>
          <p className="mt-0.5 text-xs text-mm-on-surface-variant">
            {status === 'done' || isChecked ? task.status : 'In Progress'}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <MindMeshActionStatus label={statusCopy.label} kind={statusCopy.kind} />
      </div>
    </div>
  );
}
