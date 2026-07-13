'use client';

export type MindMeshActionStatusKind = 'working' | 'ready' | 'action' | 'success';

export type MindMeshActionStatusProps = {
  label: string;
  kind?: MindMeshActionStatusKind;
  /** Soft pulse for the human-approval affordance. */
  pulse?: boolean;
  className?: string;
};

const KIND_CLASS: Record<MindMeshActionStatusKind, string> = {
  working:
    'border-mm-outline-variant/60 bg-mm-surface-container-highest text-mm-on-surface-variant',
  ready: 'border-mm-primary/40 bg-mm-primary-container/20 text-mm-primary',
  action:
    'border-mm-primary/60 bg-mm-primary/15 text-mm-primary shadow-[0_0_0_1px_color-mix(in_srgb,var(--mm-primary)_25%,transparent)]',
  success: 'border-emerald-600/50 bg-emerald-950/35 text-emerald-300',
};

/**
 * Graphic-style status chip for Execute theater automation beats:
 * Drafted by MindMesh → Approve & send → Sent, etc.
 */
export function MindMeshActionStatus({
  label,
  kind = 'working',
  pulse = false,
  className,
}: MindMeshActionStatusProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium ${KIND_CLASS[kind]} ${
        pulse ? 'animate-pulse' : ''
      } ${className ?? ''}`}
      data-mindmesh-action-status={kind}
      role="status"
    >
      {kind === 'success' ? (
        <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : kind === 'working' ? (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-80"
          aria-hidden
        />
      ) : null}
      <span>{label}</span>
    </div>
  );
}
