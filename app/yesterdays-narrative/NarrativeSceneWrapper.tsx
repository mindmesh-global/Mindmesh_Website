'use client';

import dynamic from 'next/dynamic';

const YesterdayNarrativeOverviewScene = dynamic(
  () =>
    import(
      '@/components/marketing/product-overview/scenes/OverviewScenePlaceholders'
    ).then((mod) => ({ default: mod.YesterdayNarrativeOverviewScene })),
  { ssr: false }
);

export function NarrativeSceneWrapper() {
  return <YesterdayNarrativeOverviewScene />;
}
