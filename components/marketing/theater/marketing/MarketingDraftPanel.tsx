'use client';

import Image from 'next/image';
import { TypingText } from '@/components/ui/TypingText';
import { MindMeshActionStatus } from '@/components/marketing/theater/marketing/MindMeshActionStatus';
import { DRAFT_FIXTURE_ACME, type DraftFixture } from '@/lib/marketing-demo-data';
import {
  getExecuteDraftCharIndex,
  getExecuteDraftStatus,
  type ExecuteDraftStatus,
} from '@/lib/marketing-theater-scroll';

export type { DraftFixture };

export type MarketingDraftPanelProps = {
  draft?: DraftFixture;
  /** Scroll progress (0–1) for beat-scrubbed typing (P4-T10). */
  scrollProgress?: number;
  /** Explicit character index; overrides scrollProgress when set. */
  charIndex?: number;
  /** Panel fade-in (0–1). */
  opacity?: number;
  className?: string;
};

const DRAFT_STATUS_COPY: Record<
  ExecuteDraftStatus,
  { label: string; kind: 'working' | 'ready' | 'action' | 'success'; pulse?: boolean }
> = {
  drafting: { label: 'MindMesh is drafting…', kind: 'working' },
  drafted: { label: 'Drafted by MindMesh', kind: 'ready' },
  approve: { label: 'Approve & send', kind: 'action', pulse: true },
  sent: { label: 'Sent', kind: 'success' },
};

/**
 * Gmail compose chrome with scroll-scrubbed draft typing (P4-T08).
 * Status chip shows Drafted → Approve → Sent so the human-approval beat is visible.
 */
export function MarketingDraftPanel({
  draft = DRAFT_FIXTURE_ACME,
  scrollProgress,
  charIndex,
  opacity = 1,
  className,
}: MarketingDraftPanelProps) {
  const resolvedCharIndex =
    charIndex ??
    (scrollProgress !== undefined
      ? getExecuteDraftCharIndex(scrollProgress, draft.body)
      : draft.body.length);

  const status: ExecuteDraftStatus =
    scrollProgress !== undefined ? getExecuteDraftStatus(scrollProgress) : 'sent';
  const statusCopy = DRAFT_STATUS_COPY[status];

  return (
    <div
      className={`rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4 md:p-5 ${className ?? ''}`}
      data-marketing-draft-panel
      data-draft-char-index={resolvedCharIndex}
      data-draft-status={status}
      {...(scrollProgress !== undefined
        ? { 'data-draft-scroll-progress': scrollProgress.toFixed(3) }
        : {})}
      style={{ opacity, willChange: opacity < 1 ? 'opacity' : undefined }}
    >
      <div className="mb-4 flex items-center gap-2.5 border-b border-mm-outline-variant/40 pb-3">
        <Image
          src="/images/icons/gmail.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
        <span className="text-sm font-semibold text-mm-on-background">Draft in Gmail</span>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-mm-on-background">
          <span className="text-mm-on-surface-variant">To:</span>{' '}
          <span className="font-medium">{draft.to}</span>
        </p>
        <p className="text-mm-on-background">
          <span className="text-mm-on-surface-variant">Subject:</span>{' '}
          <span className="font-medium">{draft.subject}</span>
        </p>
      </div>

      <div className="mt-4 min-h-[8rem] whitespace-pre-wrap rounded-lg border border-mm-outline-variant/40 bg-mm-surface-container-high p-3 text-sm leading-relaxed text-mm-on-background">
        <TypingText text={draft.body} charIndex={resolvedCharIndex} cursor={status === 'drafting'} />
      </div>

      <div className="mt-4">
        <MindMeshActionStatus
          label={statusCopy.label}
          kind={statusCopy.kind}
          pulse={statusCopy.pulse}
        />
      </div>
    </div>
  );
}
