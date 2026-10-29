'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
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
import { ProductOverviewProgressNav } from './ProductOverviewProgressNav';
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
 * Desktop product overview: click-to-explore (P12-T03 / P12-T07).
 * Scene 1 (Attention) is fully legible on mount; tabs switch scenes
 * without scroll scrubbing.
 */
function ProductOverviewDesktopMotion() {
  const [activeScene, setActiveScene] = useState<ProductOverviewSceneId>(1);
  const [activeFolder, setActiveFolder] = useState<string>('inbox');
  const [platformTourActive, setPlatformTourActive] = useState(true);
  const [attentionTourPlayed, setAttentionTourPlayed] = useState(false);
  const revealed = useProductOverviewReveal();
  const platformTimersRef = useRef<number[]>([]);
  const userNavigatedRef = useRef(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const clearPlatformTimers = useCallback(() => {
    for (const id of platformTimersRef.current) window.clearTimeout(id);
    platformTimersRef.current = [];
  }, []);

  // Reset to scene 1 when the section scrolls out of view so it's always
  // fresh on the Attention board when the user returns.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveScene(1);
          setActiveFolder('inbox');
          clearPlatformTimers();
          setPlatformTourActive(true);
          setAttentionTourPlayed(false);
          userNavigatedRef.current = false;
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [clearPlatformTimers]);

  useEffect(() => () => clearPlatformTimers(), [clearPlatformTimers]);

  const visual = getProductOverviewVisualStateFromScene(activeScene, {
    sensorVisible: false,
    mascotVisible: false,
  });
  const workspace = workspaceCopy(activeScene);

  const handleSelectScene = useCallback(
    (scene: ProductOverviewSceneId) => {
      userNavigatedRef.current = true;
      setPlatformTourActive(false);
      clearPlatformTimers();
      setActiveScene(scene);
    },
    [clearPlatformTimers]
  );

  const handleAttentionTourComplete = useCallback(
    (completed: boolean) => {
      setAttentionTourPlayed(true);
      if (!completed || !platformTourActive || userNavigatedRef.current) return;

      const scenes: ProductOverviewSceneId[] = [2, 3, 4, 5];
      scenes.forEach((scene, index) => {
        const id = window.setTimeout(() => {
          if (userNavigatedRef.current) return;
          setActiveScene(scene);
          if (scene === 5) setPlatformTourActive(false);
        }, 900 + index * 3400);
        platformTimersRef.current.push(id);
      });
    },
    [platformTourActive]
  );

  return (
    <div
      ref={wrapperRef}
      className="relative"
      data-theater="productOverview"
      data-reduced-motion="false"
      data-overview-mode="click"
      data-overview-scene={activeScene}
    >
      <ProductOverviewFrame
        activeTab={visual.sidebarTab}
        emailExpanded={visual.emailExpanded}
        shellOpacity={visual.shellOpacity}
        workspaceTitle={workspace.title}
        workspaceSupporting={workspace.supporting}
        caption={visual.caption}
        sticky={false}
        wide
        revealed={revealed}
        onSelectScene={handleSelectScene}
        activeFolder={activeFolder}
        onSelectFolder={setActiveFolder}
        sceneLabel={PRODUCT_OVERVIEW_NAV[Math.min(activeScene, PRODUCT_OVERVIEW_NAV.length) - 1].label}
        progressNav={
          <ProductOverviewProgressNav
            activeScene={activeScene}
            onSelectScene={handleSelectScene}
            interactive
          />
        }
        footer={null}
      >
        <div
          id={`overview-scene-panel-${activeScene}`}
          role="tabpanel"
          aria-labelledby={`overview-scene-tab-${activeScene}`}
          className="relative h-full min-h-0 overflow-x-clip"
        >
          <SceneLayer active={activeScene === 1}>
            <AttentionOverviewScene
              showOverlapChip
              playGuidedTour={platformTourActive && !attentionTourPlayed}
              onGuidedTourComplete={handleAttentionTourComplete}
              onSelectScene={handleSelectScene}
            />
          </SceneLayer>
          <SceneLayer active={activeScene === 2}>
            <UpcomingEventsOverviewScene />
          </SceneLayer>
          <SceneLayer active={activeScene === 3}>
            <InboxOverviewScene
              activeFolder={activeFolder as import('@/lib/marketing-product-overview-data').EmailFolderId}
              onFolderChange={setActiveFolder}
            />
          </SceneLayer>
          <SceneLayer active={activeScene === 4}>
            <YesterdayNarrativeOverviewScene />
          </SceneLayer>
          <SceneLayer active={activeScene === 5}>
            <ConnectedAppsOverviewScene />
          </SceneLayer>
        </div>
      </ProductOverviewFrame>
    </div>
  );
}

/**
 * Desktop product overview (P12 click-to-explore).
 * Reduced-motion and mobile use ProductOverviewMobile instead (P12-T10).
 */
export function ProductOverviewDesktop() {
  const prefersReducedMotion = usePrefersReducedMotion();
  if (prefersReducedMotion) return null;
  return <ProductOverviewDesktopMotion />;
}
