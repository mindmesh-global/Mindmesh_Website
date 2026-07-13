'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useProductOverviewReveal } from '@/hooks/useProductOverviewReveal';
import {
  ATTENTION_BOARD_FIXTURES_ACME,
  COMPANIONS_SCENE_FIXTURES_ACME,
  CONNECTED_APPS_SCENE_FIXTURES_ACME,
  INBOX_SCENE_FIXTURES_ACME,
  PRODUCT_OVERVIEW_DEPTH_LINKS,
  PRODUCT_OVERVIEW_NAV,
  PRODUCT_OVERVIEW_SCENE_CAPTIONS,
  PRODUCT_OVERVIEW_SCENE_COUNT,
  UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
  YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME,
  type ProductOverviewSceneId,
} from '@/lib/marketing-product-overview-data';
import { ProductOverviewFrame } from './ProductOverviewFrame';
import { ProductOverviewProgressNav } from './ProductOverviewProgressNav';
import {
  AttentionOverviewScene,
  CompanionsOverviewScene,
  ConnectedAppsOverviewScene,
  InboxOverviewScene,
  UpcomingEventsOverviewScene,
  YesterdayNarrativeOverviewScene,
} from './scenes/OverviewScenePlaceholders';

function sceneContent(scene: ProductOverviewSceneId) {
  switch (scene) {
    case 1:
      return {
        tab: PRODUCT_OVERVIEW_NAV[0].sidebarTab,
        emailExpanded: false,
        title: ATTENTION_BOARD_FIXTURES_ACME.header,
        supporting: ATTENTION_BOARD_FIXTURES_ACME.supportingLine,
        body: <AttentionOverviewScene />,
      };
    case 2:
      return {
        tab: PRODUCT_OVERVIEW_NAV[1].sidebarTab,
        emailExpanded: false,
        title: UPCOMING_EVENTS_SCENE_FIXTURES_ACME.headline,
        supporting: UPCOMING_EVENTS_SCENE_FIXTURES_ACME.supportingLine,
        body: <UpcomingEventsOverviewScene />,
      };
    case 3:
      return {
        tab: PRODUCT_OVERVIEW_NAV[2].sidebarTab,
        emailExpanded: true,
        title: INBOX_SCENE_FIXTURES_ACME.headline,
        supporting: INBOX_SCENE_FIXTURES_ACME.supportingLine,
        body: <InboxOverviewScene />,
      };
    case 4:
      return {
        tab: PRODUCT_OVERVIEW_NAV[3].sidebarTab,
        emailExpanded: false,
        title: YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME.headline,
        supporting: YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME.supportingLine,
        body: <YesterdayNarrativeOverviewScene />,
      };
    case 5:
      return {
        tab: PRODUCT_OVERVIEW_NAV[4].sidebarTab,
        emailExpanded: false,
        title: CONNECTED_APPS_SCENE_FIXTURES_ACME.headline,
        supporting: CONNECTED_APPS_SCENE_FIXTURES_ACME.supportingLine,
        body: <ConnectedAppsOverviewScene />,
      };
    case 6:
      return {
        tab: PRODUCT_OVERVIEW_NAV[5].sidebarTab,
        emailExpanded: false,
        title: COMPANIONS_SCENE_FIXTURES_ACME.headline,
        supporting: COMPANIONS_SCENE_FIXTURES_ACME.supportingLine,
        body: <CompanionsOverviewScene />,
      };
  }
}

/**
 * Mobile / stacked final-state cards (P11-T02 / P11-T10 / P11-T12).
 * No sticky scrub; progress nav scrolls to each stacked scene card.
 */
export function ProductOverviewMobile() {
  const scenes: ProductOverviewSceneId[] = [1, 2, 3, 4, 5, 6];
  const [activeScene, setActiveScene] = useState<ProductOverviewSceneId>(1);
  const revealed = useProductOverviewReveal();

  useEffect(() => {
    const nodes = scenes
      .map((scene) => document.getElementById(`overview-mobile-scene-${scene}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return undefined;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestScene: ProductOverviewSceneId = 1;
        let bestRatio = -1;
        for (const scene of scenes) {
          const ratio = ratios.get(`overview-mobile-scene-${scene}`) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestScene = scene;
          }
        }
        setActiveScene((prev) => (prev === bestScene ? prev : bestScene));
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-15% 0px -35% 0px' }
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSelectScene = useCallback((scene: ProductOverviewSceneId) => {
    const target = document.getElementById(`overview-mobile-scene-${scene}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveScene(scene);
  }, []);

  return (
    <div
      className="space-y-10"
      data-product-overview-mobile
      data-overview-reveal-simple="true"
      data-overview-revealed={revealed ? 'true' : 'false'}
    >
      <ProductOverviewProgressNav
        activeScene={activeScene}
        onSelectScene={handleSelectScene}
        interactive
        className="sticky top-20 z-20 rounded-lg border border-mm-outline-variant/50 bg-mm-background/95 p-3 backdrop-blur-sm"
      />

      {scenes.map((scene) => {
        const content = sceneContent(scene);
        return (
          <div
            key={scene}
            id={`overview-mobile-scene-${scene}`}
            data-overview-mobile-scene={scene}
            className="scroll-mt-28"
          >
            <ProductOverviewFrame
              activeTab={content.tab}
              emailExpanded={content.emailExpanded}
              workspaceTitle={content.title}
              workspaceSupporting={content.supporting}
              caption={PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene]}
              sticky={false}
              showSidebar={false}
              sceneLabel={PRODUCT_OVERVIEW_NAV[scene - 1].label}
              progressNav={
                <p className="text-xs font-medium text-mm-on-surface-variant">
                  Scene {scene} of {PRODUCT_OVERVIEW_SCENE_COUNT} ·{' '}
                  {PRODUCT_OVERVIEW_NAV[scene - 1].label}
                </p>
              }
              footer={
                scene === 6 ? (
                  <p className="flex flex-wrap gap-x-4 gap-y-2 text-base font-medium">
                    <Link
                      href={PRODUCT_OVERVIEW_DEPTH_LINKS.sensor.href}
                      className="text-mm-primary hover:text-mm-primary-dim"
                    >
                      {PRODUCT_OVERVIEW_DEPTH_LINKS.sensor.label}
                    </Link>
                    <Link
                      href={PRODUCT_OVERVIEW_DEPTH_LINKS.mascot.href}
                      className="text-mm-primary hover:text-mm-primary-dim"
                    >
                      {PRODUCT_OVERVIEW_DEPTH_LINKS.mascot.label}
                    </Link>
                  </p>
                ) : null
              }
            >
              <div className="h-full overflow-auto">{content.body}</div>
            </ProductOverviewFrame>
          </div>
        );
      })}
    </div>
  );
}
