'use client';

export { AttentionOverviewScene } from './AttentionOverviewScene';
export {
  InboxCalendarOverviewScene,
  InboxOverviewScene,
  UpcomingEventsOverviewScene,
} from './InboxCalendarOverviewScene';
export {
  ConnectedAppsOverviewScene,
  NarrativeAppsOverviewScene,
  YesterdayNarrativeOverviewScene,
} from './NarrativeAppsOverviewScene';
export { CompanionsOverviewScene } from './CompanionsOverviewScene';

type SceneLayerProps = {
  active: boolean;
  children: React.ReactNode;
};

/**
 * Absolute scene layer for desktop overview crossfades (P12-T03 / P12-T07).
 * Discrete CSS transition on active change; no scroll-interpolated motion.
 */
export function SceneLayer({ active, children }: SceneLayerProps) {
  return (
    <div
      className={[
        'absolute inset-0 overflow-auto transition-[opacity,transform]',
        active
          ? 'z-[2] translate-y-0 opacity-100 duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
          : 'pointer-events-none z-[1] -translate-y-1.5 opacity-0 duration-150 ease-[cubic-bezier(0.4,0,1,1)]',
      ].join(' ')}
      aria-hidden={!active}
      data-overview-scene-layer={active ? 'active' : 'idle'}
    >
      {children}
    </div>
  );
}
