'use client';

import { EXECUTE_SUCCESS_COPY } from '@/lib/marketing-demo-data';
import { getExecuteSuccessOpacity } from '@/lib/marketing-theater-scroll';

const DONE_INDICATORS = [
  { id: 'draft', label: 'Reply ready' },
  { id: 'calendar', label: 'Prep blocked' },
  { id: 'jira', label: 'PROD-142 staged' },
] as const;

export type MarketingExecuteSuccessProps = {
  message?: string;
  scrollProgress?: number;
  opacity?: number;
  showDoneIndicators?: boolean;
  className?: string;
};

/**
 * Execute theater success banner + done indicators (P4-T09).
 */
export function MarketingExecuteSuccess({
  message = EXECUTE_SUCCESS_COPY,
  scrollProgress,
  opacity: opacityProp,
  showDoneIndicators = true,
  className,
}: MarketingExecuteSuccessProps) {
  const opacity =
    opacityProp ??
    (scrollProgress !== undefined ? getExecuteSuccessOpacity(scrollProgress) : 1);

  if (opacity <= 0.01) return null;

  return (
    <div
      className={`rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-4 md:p-5 ${className ?? ''}`}
      data-marketing-execute-success
      style={{ opacity, willChange: opacity < 1 ? 'opacity' : undefined }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700/40 text-emerald-300"
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-mm-on-background">{message}</p>
          {showDoneIndicators ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {DONE_INDICATORS.map((item) => (
                <li
                  key={item.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/20 px-2.5 py-1 text-[11px] text-emerald-200"
                >
                  <span className="text-emerald-400" aria-hidden>
                    ✓
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
