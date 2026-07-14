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
  UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
  YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME,
  type ProductOverviewSceneId,
} from '@/lib/marketing-product-overview-data';
import { getProductOverviewVisualStateFromScene } from '@/lib/marketing-product-overview-scroll';
import { ProductOverviewFrame } from './ProductOverviewFrame';
import {
  AttentionOverviewScene,
  CompanionsOverviewScene,
  ConnectedAppsOverviewScene,
  InboxOverviewScene,
  SceneLayer,
  UpcomingEventsOverviewScene,
  YesterdayNarrativeOverviewScene,
} from './scenes/OverviewScenePlaceholders';

function workspaceCopy(scene: ProductOverviewSceneId): {
  title: string;
  supporting: string;
} {
  switch (scene) {
    case 1:
      return {
        title: ATTENTION_BOARD_FIXTURES_ACME.header,
        supporting: ATTENTION_BOARD_FIXTURES_ACME.supportingLine,
      };
    case 2:
      return {
        title: UPCOMING_EVENTS_SCENE_FIXTURES_ACME.headline,
        supporting: UPCOMING_EVENTS_SCENE_FIXTURES_ACME.supportingLine,
      };
    case 3:
      return {
        title: INBOX_SCENE_FIXTURES_ACME.headline,
        supporting: INBOX_SCENE_FIXTURES_ACME.supportingLine,
      };
    case 4:
      return {
        title: YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME.headline,
        supporting: YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME.supportingLine,
      };
    case 5:
      return {
        title: CONNECTED_APPS_SCENE_FIXTURES_ACME.headline,
        supporting: CONNECTED_APPS_SCENE_FIXTURES_ACME.supportingLine,
      };
    case 6:
      return {
        title: COMPANIONS_SCENE_FIXTURES_ACME.headline,
        supporting: COMPANIONS_SCENE_FIXTURES_ACME.supportingLine,
      };
  }
}

/**
 * Mobile / reduced-motion product overview (P12-T10).
 * Linear-style zoomed-out desktop chrome: full app visible at a reduced
 * scale, clipped with a soft right-edge fade. No progress-tab strip;
 * in-frame sidebar switches scenes when tapped.
 */
export function ProductOverviewMobile() {
  const [activeScene, setActiveScene] = useState<ProductOverviewSceneId>(1);
  const [sensorVisible, setSensorVisible] = useState(false);
  const [mascotVisible, setMascotVisible] = useState(false);
  const revealed = useProductOverviewReveal();

  useEffect(() => {
    if (activeScene !== 6) {
      setSensorVisible(false);
      setMascotVisible(false);
      return undefined;
    }

    const sensorTimer = window.setTimeout(() => setSensorVisible(true), 120);
    const mascotTimer = window.setTimeout(() => setMascotVisible(true), 280);
    return () => {
      window.clearTimeout(sensorTimer);
      window.clearTimeout(mascotTimer);
    };
  }, [activeScene]);

  const visual = getProductOverviewVisualStateFromScene(activeScene, {
    sensorVisible: activeScene === 6 ? sensorVisible : false,
    mascotVisible: activeScene === 6 ? mascotVisible : false,
  });
  const workspace = workspaceCopy(activeScene);

  const handleSelectScene = useCallback((scene: ProductOverviewSceneId) => {
    setActiveScene(scene);
  }, []);

  return (
    <div
      className="space-y-5"
      data-product-overview-mobile
      data-overview-mode="click"
      data-overview-scene={activeScene}
      data-overview-reveal-simple="true"
      data-overview-revealed={revealed ? 'true' : 'false'}
    >
      {/*
        Zoomed-out desktop frame (Linear mobile pattern). Layout size is
        collapsed via --overview-mobile-scale in globals.css; the painted
        chrome stays at full desktop width so the whole app reads at once.
      */}
      <div
        data-overview-mobile-peek=""
        className="relative overflow-x-clip max-md:mr-[-1.5rem] max-md:w-[calc(100%+1.5rem)] md:max-w-full"
      >
        <div data-overview-mobile-peek-frame="" className="max-w-none md:w-full">
          <ProductOverviewFrame
            activeTab={visual.sidebarTab}
            emailExpanded={visual.emailExpanded}
            shellOpacity={visual.shellOpacity}
            workspaceTitle={workspace.title}
            workspaceSupporting={workspace.supporting}
            sticky={false}
            showSidebar
            forceSidebar
            revealed={revealed}
            onSelectScene={handleSelectScene}
            sceneLabel={PRODUCT_OVERVIEW_NAV[activeScene - 1].label}
          >
            <div
              role="region"
              aria-label={`MindMesh ${PRODUCT_OVERVIEW_NAV[activeScene - 1].label}`}
              className="relative h-full min-h-[28rem] overflow-x-clip"
            >
              <SceneLayer active={activeScene === 1}>
                <AttentionOverviewScene
                  showOverlapChip
                  playGuidedTour={activeScene === 1}
                  onSelectScene={handleSelectScene}
                />
              </SceneLayer>
              <SceneLayer active={activeScene === 2}>
                <UpcomingEventsOverviewScene />
              </SceneLayer>
              <SceneLayer active={activeScene === 3}>
                <InboxOverviewScene />
              </SceneLayer>
              <SceneLayer active={activeScene === 4}>
                <YesterdayNarrativeOverviewScene />
              </SceneLayer>
              <SceneLayer active={activeScene === 5}>
                <ConnectedAppsOverviewScene />
              </SceneLayer>
              <SceneLayer active={activeScene === 6}>
                <CompanionsOverviewScene
                  sensorVisible={sensorVisible}
                  mascotVisible={mascotVisible}
                />
              </SceneLayer>
            </div>
          </ProductOverviewFrame>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 text-center">
        <p className="max-w-2xl text-sm text-mm-on-surface-variant">
          {visual.caption}
        </p>
        {activeScene === 6 ? (
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-base font-medium">
            <Link
              href={PRODUCT_OVERVIEW_DEPTH_LINKS.sensor.href}
              className="inline-flex min-h-11 items-center text-mm-primary hover:text-mm-primary-dim"
            >
              {PRODUCT_OVERVIEW_DEPTH_LINKS.sensor.label}
            </Link>
            <Link
              href={PRODUCT_OVERVIEW_DEPTH_LINKS.mascot.href}
              className="inline-flex min-h-11 items-center text-mm-primary hover:text-mm-primary-dim"
            >
              {PRODUCT_OVERVIEW_DEPTH_LINKS.mascot.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
