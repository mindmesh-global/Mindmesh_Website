import type { ReactNode } from 'react';
import { THEATER_STICKY_TOP_PX } from '@/lib/marketing-theater-scroll';

export type ProductFrameProps = {
  children: ReactNode;
  /** Caption below the frame (reduced-motion / final state copy). */
  caption?: string;
  /** Depth links / actions below the caption; sticks with the frame. */
  footer?: ReactNode;
  /** Optional left rail (Connect theater nav icons in Phase 4). */
  sidebar?: ReactNode;
  /** Sticky positioning inside theater scroll wrapper (default true). */
  sticky?: boolean;
  className?: string;
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
}: ProductFrameProps) {
  const stickyClassName = sticky ? 'theater-sticky-frame' : '';
  // Sticky positioning needs a containing block as tall as the scroll
  // wrapper (220vh/240vh); without this, the sticky frame's own normal-flow
  // parent is only as tall as its content and the frame has no room to
  // pin, so it just scrolls through `top: 80px` instead of sticking there.
  const outerClassName = sticky ? 'absolute inset-0' : 'relative';

  return (
    <div className={`${outerClassName}${className ? ` ${className}` : ''}`}>
      <div
        className={stickyClassName}
        style={sticky ? { top: THEATER_STICKY_TOP_PX } : undefined}
      >
        <div className={frameChromeClassName}>
          {sidebar ? (
            <aside className="hidden shrink-0 border-r border-mm-outline-variant/60 md:flex md:w-14 md:flex-col md:items-center md:py-4">
              {sidebar}
            </aside>
          ) : null}
          <div className={contentClassName}>{children}</div>
        </div>
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
