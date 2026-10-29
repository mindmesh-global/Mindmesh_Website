'use client';

import dynamic from 'next/dynamic';

const UpcomingEventsOverviewScene = dynamic(
  () =>
    import(
      '@/components/marketing/product-overview/scenes/OverviewScenePlaceholders'
    ).then((mod) => ({ default: mod.UpcomingEventsOverviewScene })),
  { ssr: false }
);

export function EventsSceneWrapper() {
  return <UpcomingEventsOverviewScene />;
}
