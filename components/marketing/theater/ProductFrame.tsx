import type { ReactNode } from 'react';
import { THEATER_STICKY_TOP_PX } from '@/lib/marketing-theater-scroll';

export type ProductFrameProps = {
  children: ReactNode;
  caption?: string;
  footer?: ReactNode;
  sidebar?: ReactNode;
  sticky?: boolean;
  className?: string;
  /** Render as macOS light-mode window (white bg, traffic lights, dark text). */
  lightWindow?: boolean;
};

const frameChromeClassName =
  'theater-frame-chrome flex overflow-hidden rounded-lg border border-mm-outline-variant bg-mm-surface-container-high shadow-mm-elevated';

const contentClassName = 'min-h-0 flex-1 overflow-auto p-4 md:p-8';

export function ProductFrame({
  children,
  caption,
  footer,
  sidebar,
  sticky = true,
  className,
  lightWindow = false,
}: ProductFrameProps) {
  const stickyClassName = sticky ? 'theater-sticky-frame' : '';
  const outerClassName = sticky ? 'absolute inset-0' : 'relative';

  return (
    <div className={`${outerClassName}${className ? ` ${className}` : ''}`}>
      <div
        className={stickyClassName}
        style={sticky ? { top: THEATER_STICKY_TOP_PX } : undefined}
      >
        {lightWindow ? (
          <div
            data-light-window=""
            className="flex flex-col overflow-hidden rounded-xl"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 0 0 0.5px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.45), 0 20px 56px rgba(0,0,0,0.55), 0 52px 100px rgba(0,0,0,0.35)',
            }}
          >
            {/* macOS light title bar */}
            <div
              className="relative flex h-8 shrink-0 items-center px-3"
              style={{
                background: 'linear-gradient(180deg, #f0f0f2 0%, #e8e8ea 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  MindMesh
                </span>
              </div>
            </div>
            <div className="flex min-h-0 flex-1">
              {sidebar ? (
                <aside className="hidden shrink-0 border-r md:flex md:w-14 md:flex-col md:items-center md:py-4" style={{ borderColor: '#d1d1d6' }}>
                  {sidebar}
                </aside>
              ) : null}
              <div className="min-h-0 flex-1 overflow-auto p-4 md:p-5">{children}</div>
            </div>
          </div>
        ) : (
          <div className={frameChromeClassName}>
            {sidebar ? (
              <aside className="hidden shrink-0 border-r border-mm-outline-variant/60 md:flex md:w-14 md:flex-col md:items-center md:py-4">
                {sidebar}
              </aside>
            ) : null}
            <div className={contentClassName}>{children}</div>
          </div>
        )}
        {caption || footer ? (
          // Caption + depth links live inside the sticky box so they stay
          // attached below the frame while pinned, instead of scrolling up
          // through the pinned frame from after the tall theater wrapper.
          <div className="mt-4 space-y-4">
            {caption ? (
              <p className="text-sm text-mm-on-surface-variant">{caption}</p>
            ) : null}
            {footer ? <div>{footer}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
