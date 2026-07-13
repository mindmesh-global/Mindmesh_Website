/**
 * Product overview scroll helpers (P11-T02 / P11-T05).
 * Progress steps live in marketing-theater-scroll.ts (`productOverview`).
 */

import {
  PRODUCT_OVERVIEW_PROGRESS_STEPS,
  THEATER_STICKY_TOP_PX,
  progressToStep,
} from '@/lib/marketing-theater-scroll';
import type {
  ProductOverviewSceneId,
  ProductOverviewSidebarTab,
} from '@/lib/marketing-product-overview-data';
import {
  PRODUCT_OVERVIEW_NAV,
  PRODUCT_OVERVIEW_SCENE_CAPTIONS,
  PRODUCT_OVERVIEW_SCENE_COUNT,
} from '@/lib/marketing-product-overview-data';

export type ProductOverviewPaneMotion = {
  opacity: number;
  translateY: number;
};

export type ProductOverviewVisualState = {
  scene: ProductOverviewSceneId;
  sidebarTab: ProductOverviewSidebarTab;
  emailExpanded: boolean;
  shellOpacity: number;
  paneMotion: Record<ProductOverviewSceneId, ProductOverviewPaneMotion>;
  showOverlapChip: boolean;
  sensorVisible: boolean;
  mascotVisible: boolean;
  caption: string;
};

const SCENE_RANGES: readonly {
  scene: ProductOverviewSceneId;
  start: number;
  end: number;
}[] = [
  { scene: 1, start: 0, end: 0.22 },
  { scene: 2, start: 0.22, end: 0.36 },
  { scene: 3, start: 0.36, end: 0.5 },
  { scene: 4, start: 0.5, end: 0.64 },
  { scene: 5, start: 0.64, end: 0.76 },
  { scene: 6, start: 0.76, end: 1 },
];

/**
 * Jump targets land in each scene's hold beat (P11-T02 / P11-T10).
 * Avoids long idle scrub when using progress navigation.
 */
export const PRODUCT_OVERVIEW_SCENE_JUMP_PROGRESS: Record<
  ProductOverviewSceneId,
  number
> = {
  1: 0.18,
  2: 0.32,
  3: 0.46,
  4: 0.6,
  5: 0.72,
  6: 0.9,
} as const;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Active overview scene from clamped scroll progress. */
export function getProductOverviewScene(progress: number): ProductOverviewSceneId {
  const clamped = clamp01(progress);
  if (clamped >= 0.76) return 6;
  if (clamped >= 0.64) return 5;
  if (clamped >= 0.5) return 4;
  if (clamped >= 0.36) return 3;
  if (clamped >= 0.22) return 2;
  return 1;
}

export function getProductOverviewSidebarTab(
  scene: ProductOverviewSceneId
): ProductOverviewSidebarTab {
  return PRODUCT_OVERVIEW_NAV[scene - 1].sidebarTab;
}

/**
 * Local 0→1 progress within a scene's active range (including hold).
 * Used for crossfade / enter motion inside that scene.
 */
export function getProductOverviewSceneLocalProgress(
  progress: number,
  scene: ProductOverviewSceneId
): number {
  const clamped = clamp01(progress);
  const range = SCENE_RANGES[scene - 1];
  if (clamped <= range.start) return 0;
  if (clamped >= range.end) return 1;
  return (clamped - range.start) / (range.end - range.start);
}

function paneMotionForScene(
  progress: number,
  scene: ProductOverviewSceneId,
  activeScene: ProductOverviewSceneId
): ProductOverviewPaneMotion {
  if (scene !== activeScene) {
    return { opacity: 0, translateY: 8 };
  }

  const local = getProductOverviewSceneLocalProgress(progress, scene);
  const enter = Math.min(1, local / 0.25);
  return {
    opacity: enter,
    translateY: 12 * (1 - enter),
  };
}

function emptyPaneMotion(): Record<ProductOverviewSceneId, ProductOverviewPaneMotion> {
  return {
    1: { opacity: 0, translateY: 8 },
    2: { opacity: 0, translateY: 8 },
    3: { opacity: 0, translateY: 8 },
    4: { opacity: 0, translateY: 8 },
    5: { opacity: 0, translateY: 8 },
    6: { opacity: 0, translateY: 8 },
  };
}

/** Map scroll progress to product-overview visual state. */
export function getProductOverviewVisualStateFromProgress(
  progress: number
): ProductOverviewVisualState {
  const clamped = clamp01(progress);
  const scene = getProductOverviewScene(clamped);

  const paneMotion = emptyPaneMotion();
  for (let id = 1; id <= PRODUCT_OVERVIEW_SCENE_COUNT; id += 1) {
    const sceneId = id as ProductOverviewSceneId;
    paneMotion[sceneId] = paneMotionForScene(clamped, sceneId, scene);
  }

  const companionsActive = scene === 6;
  const companionsLocal = getProductOverviewSceneLocalProgress(clamped, 6);

  return {
    scene,
    sidebarTab: getProductOverviewSidebarTab(scene),
    emailExpanded: scene === 3,
    shellOpacity: companionsActive ? 0.5 + 0.1 * (1 - companionsLocal) : 1,
    paneMotion,
    showOverlapChip: scene === 1 && clamped >= 0.06,
    sensorVisible: companionsActive && companionsLocal >= 0.15,
    mascotVisible: companionsActive && companionsLocal >= 0.35,
    caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene],
  };
}

/**
 * Click-to-explore visual state (P12-T03 / P12-T07): pure function of the
 * active scene. Scene 1 is fully legible on mount (no scroll thresholds).
 */
export function getProductOverviewVisualStateFromScene(
  scene: ProductOverviewSceneId,
  options?: {
    sensorVisible?: boolean;
    mascotVisible?: boolean;
  }
): ProductOverviewVisualState {
  const companionsActive = scene === 6;
  const sensorVisible = options?.sensorVisible ?? companionsActive;
  const mascotVisible = options?.mascotVisible ?? companionsActive;

  const paneMotion = emptyPaneMotion();
  for (let id = 1; id <= PRODUCT_OVERVIEW_SCENE_COUNT; id += 1) {
    const sceneId = id as ProductOverviewSceneId;
    paneMotion[sceneId] = {
      opacity: scene === sceneId ? 1 : 0,
      translateY: 0,
    };
  }

  return {
    scene,
    sidebarTab: getProductOverviewSidebarTab(scene),
    emailExpanded: scene === 3,
    shellOpacity: companionsActive ? 0.55 : 1,
    paneMotion,
    showOverlapChip: scene === 1,
    sensorVisible,
    mascotVisible,
    caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene],
  };
}

export function getProductOverviewStepId(progress: number): string {
  const stepIndex = progressToStep(progress, PRODUCT_OVERVIEW_PROGRESS_STEPS);
  return PRODUCT_OVERVIEW_PROGRESS_STEPS[stepIndex]?.id ?? 'overview-enter';
}

/**
 * Scroll a product-overview theater wrapper so scrub progress matches `targetProgress`.
 * Inverse of `measureTheaterScrollProgress`.
 */
export function scrollProductOverviewToProgress(
  wrapper: HTMLElement,
  targetProgress: number
): void {
  const clamped = clamp01(targetProgress);
  const rect = wrapper.getBoundingClientRect();
  if (rect.height <= 0) return;

  const frame = wrapper.querySelector<HTMLElement>('.theater-sticky-frame');
  const frameHeight = frame ? frame.getBoundingClientRect().height : 0;
  const span = rect.height - frameHeight;
  if (span <= 0) {
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const absoluteTop = window.scrollY + rect.top;
  const nextScrollY = absoluteTop - THEATER_STICKY_TOP_PX + clamped * span;
  window.scrollTo({ top: Math.max(0, nextScrollY), behavior: 'smooth' });
}

/** Jump the overview scrub to a scene's hold beat. */
export function scrollProductOverviewToScene(
  wrapper: HTMLElement,
  scene: ProductOverviewSceneId
): void {
  scrollProductOverviewToProgress(
    wrapper,
    PRODUCT_OVERVIEW_SCENE_JUMP_PROGRESS[scene]
  );
}
