import type { CSSProperties, ReactNode } from 'react';

export type TheaterMobilePeekProps = {
  children: ReactNode;
  caption?: string;
  footer?: ReactNode;
  className?: string;
  /** Desktop chrome height before scale (default comes from CSS). */
  frameHeightPx?: number;
};

/**
 * Linear-style mobile product chrome: desktop-width frame scaled and clipped
 * with a soft right-edge fade (same treatment as the homepage product overview).
 * Hidden from md up; pair with the scroll theater for desktop.
 */
export function TheaterMobilePeek({
  children,
  caption,
  footer,
  className,
  frameHeightPx,
}: TheaterMobilePeekProps) {
  const peekStyle = frameHeightPx
    ? ({ ['--overview-mobile-frame-h']: `${frameHeightPx}px` } as CSSProperties)
    : undefined;

  return (
    <div
      className={['space-y-4 md:hidden', className].filter(Boolean).join(' ')}
      data-theater-mobile-static=""
    >
      <div
        data-theater-mobile-peek=""
        className="relative overflow-x-clip max-md:mr-[-1.5rem] max-md:w-[calc(100%+1.5rem)]"
        style={peekStyle}
      >
        <div data-theater-mobile-peek-frame="" className="max-w-none">
          {children}
        </div>
      </div>
      {caption || footer ? (
        <div className="space-y-4">
          {caption ? (
            <p className="text-sm text-mm-on-surface-variant">{caption}</p>
          ) : null}
          {footer ? <div>{footer}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
