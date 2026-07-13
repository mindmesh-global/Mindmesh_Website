import type { HTMLAttributes } from 'react';

/**
 * Linear-style section divider: a bright hairline that fades at the edges,
 * with a soft blurred glow above it. Marks where one "page" ends and the
 * next begins.
 */
export function MarketingSectionDivider({
  className,
  ...rest
}: { className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['relative h-px w-full', className ?? 'mt-16 lg:mt-20'].join(' ')}
      aria-hidden
      {...rest}
    >
      <div className="overview-section-divider-glow absolute inset-x-0 -top-5 h-10" />
      <div className="overview-section-divider-line absolute inset-0" />
    </div>
  );
}
