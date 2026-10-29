'use client';

import dynamic from 'next/dynamic';

const InboxOverviewScene = dynamic(
  () =>
    import(
      '@/components/marketing/product-overview/scenes/OverviewScenePlaceholders'
    ).then((mod) => ({ default: mod.InboxOverviewScene })),
  { ssr: false }
);

export function InboxSceneWrapper() {
  return <InboxOverviewScene />;
}
