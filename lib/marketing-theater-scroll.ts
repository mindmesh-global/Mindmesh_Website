/**
 * Scroll kit constants for marketing product theaters.
 * Homepage: #connect, #focus, #execute (P1-T06–08 / P1-T15);
 * productOverview (P11-T02 / P11-T05).
 * Depth: sensor, mascot (P8-T05 / P8-T06 / P8-T07); sensorCalc (P10-T01–T03);
 * mascotAttachment (P10-T05–T06).
 */

export type TheaterId =
  | 'connect'
  | 'focus'
  | 'execute'
  | 'sensor'
  | 'sensorCalc'
  | 'mascot'
  | 'mascotAttachment'
  | 'productOverview';

export type TheaterProgressStep = {
  /** Zero-based step index for Phase 4 animation drivers. */
  index: number;
  /** Inclusive start of scrollYProgress range (0–1). */
  progressStart: number;
  /** Inclusive end of scrollYProgress range (0–1). */
  progressEnd: number;
  /** Stable id for animation components. */
  id: string;
  /** Human-readable beat label from Phase 1 briefs. */
  label: string;
};

export type TheaterWrapperVh = {
  desktop: number;
  mobile: number;
};

/** Scroll wrapper min-height in vh units (P1-T15). */
export const THEATER_WRAPPER_VH: Record<TheaterId, TheaterWrapperVh> = {
  connect: { desktop: 220, mobile: 120 },
  focus: { desktop: 240, mobile: 120 },
  execute: { desktop: 280, mobile: 140 },
  sensor: { desktop: 170, mobile: 120 },
  sensorCalc: { desktop: 170, mobile: 120 },
  mascot: { desktop: 170, mobile: 120 },
  mascotAttachment: { desktop: 170, mobile: 120 },
  /** Homepage product overview: compact four-scene runway (P11-T02). */
  productOverview: { desktop: 100, mobile: 100 },
} as const;

/** Tailwind classes for scroll wrappers (static strings for JIT). */
export const THEATER_WRAPPER_CLASS: Record<TheaterId, string> = {
  connect: 'relative min-h-[120vh] md:min-h-[220vh]',
  focus: 'relative min-h-[120vh] md:min-h-[240vh]',
  execute: 'relative min-h-[140vh] md:min-h-[280vh]',
  sensor: 'relative min-h-[120vh] md:min-h-[170vh]',
  sensorCalc: 'relative min-h-[120vh] md:min-h-[170vh]',
  mascot: 'relative min-h-[120vh] md:min-h-[170vh]',
  mascotAttachment: 'relative min-h-[120vh] md:min-h-[170vh]',
  /**
   * Product overview no longer uses a tall sticky scrub runway (P12-T06).
   * Mount reveal + widened frame sit in normal flow; click-to-explore (P12-T07)
   * owns scene switching without scroll height.
   */
  productOverview: 'relative',
} as const;

/** Normal document flow when scroll-linked motion is disabled (P1-T15). */
export const THEATER_WRAPPER_CLASS_REDUCED_MOTION = 'relative' as const;

/** Sticky ProductFrame offset from viewport top (P1-T15). */
export const THEATER_STICKY_TOP_PX = 80;

/**
 * Map wrapper geometry to 0–1 scroll progress.
 *
 * Progress is scoped to the actual sticky-pin window: 0 when the wrapper's
 * top reaches the sticky offset (`ProductFrame` starts pinning to the
 * viewport), 1 when the wrapper's bottom reaches sticky-offset + frame
 * height (the frame unpins and scrolls away with the page). This keeps the
 * beat sheet (fly-in, badges, sync banner, hold) fully scrubbed while the
 * frame is actually visible and pinned, instead of bleeding into the
 * entering/exiting scroll phases where the section is off-screen or
 * scrolling away.
 */
export function measureTheaterScrollProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  if (rect.height <= 0) return 0;

  const frame = element.querySelector<HTMLElement>('.theater-sticky-frame');
  const frameHeight = frame ? frame.getBoundingClientRect().height : 0;
  const span = rect.height - frameHeight;
  if (span <= 0) return 0;

  const raw = (THEATER_STICKY_TOP_PX - rect.top) / span;
  return Math.min(1, Math.max(0, raw));
}

/** jump-to progress when prefers-reduced-motion (P1-T06–08 / P8-T05–06). */
export const REDUCED_MOTION_FINAL_PROGRESS: Record<TheaterId, number> = {
  connect: 0.9,
  focus: 0.85,
  execute: 0.94,
  sensor: 0.9,
  sensorCalc: 0.9,
  mascot: 0.88,
  mascotAttachment: 0.88,
  productOverview: 0.9,
} as const;

/** Connect theater beat sheet (P1-T06). */
export const CONNECT_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.15,
    id: 'connect-empty',
    label: 'Empty connected-apps panel; no sources yet',
  },
  {
    index: 1,
    progressStart: 0.15,
    progressEnd: 0.55,
    id: 'connect-fly-in',
    label: 'Apps appear one by one (1 to 7)',
  },
  {
    index: 2,
    progressStart: 0.55,
    progressEnd: 0.75,
    id: 'connect-badges',
    label: 'Connected badges animate in',
  },
  {
    index: 3,
    progressStart: 0.75,
    progressEnd: 0.9,
    id: 'connect-sync-banner',
    label: '7 sources syncing banner',
  },
  {
    index: 4,
    progressStart: 0.9,
    progressEnd: 1,
    id: 'connect-hold',
    label: 'Hold final connected state',
  },
] as const;

/** Focus theater beat sheet (P1-T07). */
export const FOCUS_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.18,
    id: 'focus-noisy-panels',
    label: 'Inbox and calendar split; no priority yet',
  },
  {
    index: 1,
    progressStart: 0.18,
    progressEnd: 0.35,
    id: 'focus-signal-chips',
    label: 'Slack and Jira signal chips fade in',
  },
  {
    index: 2,
    progressStart: 0.35,
    progressEnd: 0.5,
    id: 'focus-cross-highlight',
    label: 'Cross-highlight email, event, and Jira chip',
  },
  {
    index: 3,
    progressStart: 0.5,
    progressEnd: 0.65,
    id: 'focus-priority-emerge',
    label: 'Background dims; priority card scale-in',
  },
  {
    index: 4,
    progressStart: 0.65,
    progressEnd: 0.85,
    id: 'focus-priority-hold',
    label: 'Priority card fully visible',
  },
  {
    index: 5,
    progressStart: 0.85,
    progressEnd: 1,
    id: 'focus-final',
    label: 'One priority; everything else faded',
  },
] as const;

/** Execute theater beat sheet (P1-T08). */
export const EXECUTE_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.08,
    id: 'execute-priority-pinned',
    label: 'Compact priority card from Focus',
  },
  {
    index: 1,
    progressStart: 0.08,
    progressEnd: 0.14,
    id: 'execute-cta-pulse',
    label: 'MindMesh acts affordance pulse',
  },
  {
    index: 2,
    progressStart: 0.14,
    progressEnd: 0.46,
    id: 'execute-draft-typing',
    label: 'Gmail compose; scroll-scrubbed typing',
  },
  {
    index: 3,
    progressStart: 0.46,
    progressEnd: 0.56,
    id: 'execute-draft-send',
    label: 'Drafted by MindMesh → human approve → Sent',
  },
  {
    index: 4,
    progressStart: 0.56,
    progressEnd: 0.72,
    id: 'execute-calendar-block',
    label: 'MindMesh blocks prep time on calendar',
  },
  {
    index: 5,
    progressStart: 0.72,
    progressEnd: 0.86,
    id: 'execute-jira-check',
    label: 'MindMesh stages PROD-142 as Done',
  },
  {
    index: 6,
    progressStart: 0.86,
    progressEnd: 0.94,
    id: 'execute-success-banner',
    label: 'Done. Ready for your 2pm call.',
  },
  {
    index: 7,
    progressStart: 0.94,
    progressEnd: 1,
    id: 'execute-hold',
    label: 'Hold final success state',
  },
] as const;

/** Sensor theater beat sheet (P8-T05). */
export const SENSOR_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.12,
    id: 'sensor-idle',
    label: 'Empty command bar; caret; Ask or open anything',
  },
  {
    index: 1,
    progressStart: 0.12,
    progressEnd: 0.35,
    id: 'sensor-type-query',
    label: 'Query types: Open Cal',
  },
  {
    index: 2,
    progressStart: 0.35,
    progressEnd: 0.55,
    id: 'sensor-results',
    label: 'Calendar, Calculator, Meetings fly in',
  },
  {
    index: 3,
    progressStart: 0.55,
    progressEnd: 0.72,
    id: 'sensor-highlight',
    label: 'Calendar selected / focus ring',
  },
  {
    index: 4,
    progressStart: 0.72,
    progressEnd: 0.9,
    id: 'sensor-confirm',
    label: 'Opening Calendar chip',
  },
  {
    index: 5,
    progressStart: 0.9,
    progressEnd: 1,
    id: 'sensor-hold',
    label: 'Hold final Sensor state',
  },
] as const;

/** Sensor calc theater beat sheet (P10-T01 / P10-T03). */
export const SENSOR_CALC_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.12,
    id: 'sensor-calc-idle',
    label: 'Empty command bar; caret; Ask or open anything',
  },
  {
    index: 1,
    progressStart: 0.12,
    progressEnd: 0.38,
    id: 'sensor-calc-type',
    label: 'Query types: 15% of 240',
  },
  {
    index: 2,
    progressStart: 0.38,
    progressEnd: 0.55,
    id: 'sensor-calc-resolve',
    label: 'Calculating resolve row',
  },
  {
    index: 3,
    progressStart: 0.55,
    progressEnd: 0.78,
    id: 'sensor-calc-result',
    label: 'Result card 36 appears',
  },
  {
    index: 4,
    progressStart: 0.78,
    progressEnd: 0.9,
    id: 'sensor-calc-settle',
    label: 'Result settled; Open Calculator secondary',
  },
  {
    index: 5,
    progressStart: 0.9,
    progressEnd: 1,
    id: 'sensor-calc-hold',
    label: 'Hold final calc result',
  },
] as const;

/** Mascot theater beat sheet (P8-T06). */
export const MASCOT_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.1,
    id: 'mascot-idle',
    label: 'Chat shell empty / companion ready',
  },
  {
    index: 1,
    progressStart: 0.1,
    progressEnd: 0.28,
    id: 'mascot-user-ask',
    label: 'User bubble: Did I get any emails today?',
  },
  {
    index: 2,
    progressStart: 0.28,
    progressEnd: 0.55,
    id: 'mascot-typing',
    label: 'Assistant typing indicator',
  },
  {
    index: 3,
    progressStart: 0.55,
    progressEnd: 0.78,
    id: 'mascot-reply',
    label: 'Reply in three staged paragraphs',
  },
  {
    index: 4,
    progressStart: 0.78,
    progressEnd: 0.88,
    id: 'mascot-action',
    label: 'Open inbox control',
  },
  {
    index: 5,
    progressStart: 0.88,
    progressEnd: 1,
    id: 'mascot-hold',
    label: 'Hold final conversation',
  },
] as const;

/** Mascot attachment-search beat sheet (P10-T05 / P10-T06). */
export const MASCOT_ATTACHMENT_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.1,
    id: 'mascot-att-idle',
    label: 'Chat shell empty / companion ready',
  },
  {
    index: 1,
    progressStart: 0.1,
    progressEnd: 0.28,
    id: 'mascot-att-user-ask',
    label: 'User bubble: Find the attachment from Acme last year',
  },
  {
    index: 2,
    progressStart: 0.28,
    progressEnd: 0.48,
    id: 'mascot-att-typing',
    label: 'Assistant typing indicator',
  },
  {
    index: 3,
    progressStart: 0.48,
    progressEnd: 0.68,
    id: 'mascot-att-reply',
    label: 'Short grounded reply (1–2 lines)',
  },
  {
    index: 4,
    progressStart: 0.68,
    progressEnd: 0.82,
    id: 'mascot-att-hit',
    label: 'Attachment hit card appears',
  },
  {
    index: 5,
    progressStart: 0.82,
    progressEnd: 0.88,
    id: 'mascot-att-action',
    label: 'Open attachment control',
  },
  {
    index: 6,
    progressStart: 0.88,
    progressEnd: 1,
    id: 'mascot-att-hold',
    label: 'Hold final attachment search',
  },
] as const;

/** Homepage product overview beat sheet (P11-T02). */
export const PRODUCT_OVERVIEW_PROGRESS_STEPS: readonly TheaterProgressStep[] = [
  {
    index: 0,
    progressStart: 0,
    progressEnd: 0.06,
    id: 'overview-enter',
    label: 'Shell enters; Attention selected',
  },
  {
    index: 1,
    progressStart: 0.06,
    progressEnd: 0.18,
    id: 'overview-attention',
    label: 'Attention Board full',
  },
  {
    index: 2,
    progressStart: 0.18,
    progressEnd: 0.22,
    id: 'overview-attention-hold',
    label: 'Attention hold',
  },
  {
    index: 3,
    progressStart: 0.22,
    progressEnd: 0.32,
    id: 'overview-events',
    label: 'Upcoming events',
  },
  {
    index: 4,
    progressStart: 0.32,
    progressEnd: 0.36,
    id: 'overview-events-hold',
    label: 'Upcoming events hold',
  },
  {
    index: 5,
    progressStart: 0.36,
    progressEnd: 0.46,
    id: 'overview-inbox',
    label: 'Email inbox',
  },
  {
    index: 6,
    progressStart: 0.46,
    progressEnd: 0.5,
    id: 'overview-inbox-hold',
    label: 'Inbox hold',
  },
  {
    index: 7,
    progressStart: 0.5,
    progressEnd: 0.6,
    id: 'overview-narrative',
    label: "Yesterday's narrative",
  },
  {
    index: 8,
    progressStart: 0.6,
    progressEnd: 0.64,
    id: 'overview-narrative-hold',
    label: 'Narrative hold',
  },
  {
    index: 9,
    progressStart: 0.64,
    progressEnd: 0.72,
    id: 'overview-apps',
    label: 'Connected apps',
  },
  {
    index: 10,
    progressStart: 0.72,
    progressEnd: 0.76,
    id: 'overview-apps-hold',
    label: 'Connected apps hold',
  },
  {
    index: 11,
    progressStart: 0.76,
    progressEnd: 0.9,
    id: 'overview-companions',
    label: 'Sensor and Mascot companions',
  },
  {
    index: 12,
    progressStart: 0.9,
    progressEnd: 1,
    id: 'overview-hold',
    label: 'Companions hold',
  },
] as const;

export const THEATER_PROGRESS_STEPS: Record<
  TheaterId,
  readonly TheaterProgressStep[]
> = {
  connect: CONNECT_PROGRESS_STEPS,
  focus: FOCUS_PROGRESS_STEPS,
  execute: EXECUTE_PROGRESS_STEPS,
  sensor: SENSOR_PROGRESS_STEPS,
  sensorCalc: SENSOR_CALC_PROGRESS_STEPS,
  mascot: MASCOT_PROGRESS_STEPS,
  mascotAttachment: MASCOT_ATTACHMENT_PROGRESS_STEPS,
  productOverview: PRODUCT_OVERVIEW_PROGRESS_STEPS,
} as const;

/**
 * Map scrollYProgress (0–1) to the active beat step index.
 * At progress === 1, returns the last step index.
 */
export function progressToStep(
  progress: number,
  steps: readonly TheaterProgressStep[]
): number {
  const clamped = Math.min(1, Math.max(0, progress));

  if (clamped >= 1 && steps.length > 0) {
    return steps[steps.length - 1].index;
  }

  for (const step of steps) {
    if (clamped >= step.progressStart && clamped < step.progressEnd) {
      return step.index;
    }
  }

  // Fallback: last step whose start we have passed (handles edge gaps).
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    if (clamped >= steps[i].progressStart) {
      return steps[i].index;
    }
  }

  return steps[0]?.index ?? 0;
}

/** Resolve progress steps for a theater id. */
export function getTheaterProgressSteps(
  theaterId: TheaterId
): readonly TheaterProgressStep[] {
  return THEATER_PROGRESS_STEPS[theaterId];
}

/** Map theater id + progress to beat step index. */
export function getTheaterStep(theaterId: TheaterId, progress: number): number {
  return progressToStep(progress, getTheaterProgressSteps(theaterId));
}

/** Resolve beat metadata for a theater step index. */
export function getTheaterStepDefinition(
  theaterId: TheaterId,
  stepIndex: number
): TheaterProgressStep | undefined {
  return getTheaterProgressSteps(theaterId).find((step) => step.index === stepIndex);
}

/** Resolve the active beat metadata at a scroll progress value. */
export function getTheaterStepAtProgress(
  theaterId: TheaterId,
  progress: number
): TheaterProgressStep {
  const steps = getTheaterProgressSteps(theaterId);
  const stepIndex = getTheaterStep(theaterId, progress);
  return steps.find((step) => step.index === stepIndex) ?? steps[0];
}

/**
 * Normalized progress (0–1) within the active beat range.
 * Useful for sub-animations (fly-in stagger, scroll-scrubbed typing).
 */
export function getBeatLocalProgress(theaterId: TheaterId, progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const step = getTheaterStepAtProgress(theaterId, clamped);
  const span = step.progressEnd - step.progressStart;

  if (span <= 0) return 1;
  if (clamped >= step.progressEnd) return 1;

  return Math.min(1, Math.max(0, (clamped - step.progressStart) / span));
}

/** Connect fly-in: number of app cards visible (0–7) from scroll progress. */
export function getConnectVisibleAppCount(progress: number, totalApps = 7): number {
  const step = getTheaterStep('connect', progress);
  if (step === 0) return 0;
  if (step >= 2) return totalApps;

  const local = getBeatLocalProgress('connect', progress);
  return Math.min(totalApps, Math.max(1, Math.ceil(local * totalApps)));
}

export type ConnectVisualState = {
  visibleAppCount: number;
  showConnectedBadge: boolean;
  showSyncBanner: boolean;
  highlightAddApp: boolean;
};

/** Map Connect beat step to panel visual props (P4-T01 / P4-T02). */
export function getConnectVisualStateFromStep(
  step: number,
  totalApps = 7,
  visibleAppCountOverride?: number
): ConnectVisualState {
  switch (step) {
    case 0:
      return {
        visibleAppCount: 0,
        showConnectedBadge: false,
        showSyncBanner: false,
        highlightAddApp: true,
      };
    case 1:
      return {
        visibleAppCount: visibleAppCountOverride ?? 0,
        showConnectedBadge: false,
        showSyncBanner: false,
        highlightAddApp: false,
      };
    case 2:
      return {
        visibleAppCount: totalApps,
        showConnectedBadge: true,
        showSyncBanner: false,
        highlightAddApp: false,
      };
    case 3:
    case 4:
      return {
        visibleAppCount: totalApps,
        showConnectedBadge: true,
        showSyncBanner: true,
        highlightAddApp: false,
      };
    default:
      return getConnectVisualStateFromStep(4, totalApps);
  }
}

/** Map scroll progress to Connect panel visual props for StaticConnectedApps marketing variant. */
export function getConnectVisualStateFromProgress(
  progress: number,
  totalApps = 7
): ConnectVisualState {
  const step = getTheaterStep('connect', progress);
  return getConnectVisualStateFromStep(
    step,
    totalApps,
    getConnectVisibleAppCount(progress, totalApps)
  );
}

export type ConnectCardMotion = {
  opacity: number;
  translateY: number;
};

/** Per-card fly-in motion during Connect beat 1 (scroll-scrubbed). */
export function getConnectCardMotion(
  progress: number,
  cardIndex: number,
  totalApps = 7
): ConnectCardMotion {
  const clamped = Math.min(1, Math.max(0, progress));
  const flyIn = CONNECT_PROGRESS_STEPS.find((step) => step.id === 'connect-fly-in');
  if (!flyIn || clamped < flyIn.progressStart) {
    return { opacity: 0, translateY: 12 };
  }
  if (clamped >= flyIn.progressEnd) {
    return { opacity: 1, translateY: 0 };
  }

  const local = (clamped - flyIn.progressStart) / (flyIn.progressEnd - flyIn.progressStart);
  const cardSpan = 1 / totalApps;
  const cardStart = cardIndex * cardSpan;
  const cardLocal = Math.min(1, Math.max(0, (local - cardStart) / cardSpan));

  return {
    opacity: cardLocal,
    translateY: 12 * (1 - cardLocal),
  };
}

function getConnectBeatOpacity(progress: number, beatId: string): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const beat = CONNECT_PROGRESS_STEPS.find((step) => step.id === beatId);
  if (!beat) return 0;
  if (clamped < beat.progressStart) return 0;
  if (clamped >= beat.progressEnd) return 1;
  return (clamped - beat.progressStart) / (beat.progressEnd - beat.progressStart);
}

/** Connected badge fade-in during Connect beat 2. */
export function getConnectBadgeOpacity(progress: number): number {
  return getConnectBeatOpacity(progress, 'connect-badges');
}

/** Sync banner fade-in during Connect beat 3. */
export function getConnectSyncBannerOpacity(progress: number): number {
  return getConnectBeatOpacity(progress, 'connect-sync-banner');
}

function getFocusBeatOpacity(progress: number, beatId: string): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const beat = FOCUS_PROGRESS_STEPS.find((step) => step.id === beatId);
  if (!beat) return 0;
  if (clamped < beat.progressStart) return 0;
  if (clamped >= beat.progressEnd) return 1;
  return (clamped - beat.progressStart) / (beat.progressEnd - beat.progressStart);
}

/** Linked ids for Focus cross-highlight beat (P1-T07). */
export const FOCUS_CROSS_HIGHLIGHT_IDS = ['dana', 'client-call', 'jira-prod-142'] as const;

export type FocusSignalChipMotion = {
  opacity: number;
  translateY: number;
};

/**
 * Per-chip staggered fly-in during the Focus signal-chips beat, so Slack and
 * Jira arrive one after another instead of popping in together (P4-T06).
 */
export function getFocusSignalChipMotion(
  progress: number,
  chipIndex: number,
  totalChips = 2
): FocusSignalChipMotion {
  const clamped = Math.min(1, Math.max(0, progress));
  const chipsBeat = FOCUS_PROGRESS_STEPS.find((s) => s.id === 'focus-signal-chips');
  if (!chipsBeat) return { opacity: 1, translateY: 0 };
  if (clamped < chipsBeat.progressStart) return { opacity: 0, translateY: 10 };
  if (clamped >= chipsBeat.progressEnd) return { opacity: 1, translateY: 0 };

  const local =
    (clamped - chipsBeat.progressStart) / (chipsBeat.progressEnd - chipsBeat.progressStart);
  const span = 1 / totalChips;
  const start = chipIndex * span * 0.7;
  const chipLocal = Math.min(1, Math.max(0, (local - start) / span));

  return {
    opacity: chipLocal,
    translateY: 10 * (1 - chipLocal),
  };
}

export type FocusVisualState = {
  backgroundOpacity: number;
  signalChipsOpacity: number;
  signalChipsTranslateY: number;
  highlightIds: readonly string[];
  priorityOpacity: number;
  priorityScale: number;
  priorityEmphasized: boolean;
  showPriorityCta: boolean;
  showFocusLabel: boolean;
  /** Soft fade for the label + CTA once the card has settled (P1-T07). */
  focusExtrasOpacity: number;
};

/** Map scroll progress to Focus theater demo visual state (P4-T06). */
export function getFocusVisualStateFromProgress(progress: number): FocusVisualState {
  const clamped = Math.min(1, Math.max(0, progress));
  const step = getTheaterStep('focus', clamped);

  let signalChipsOpacity = getFocusBeatOpacity(clamped, 'focus-signal-chips');
  const chipsBeat = FOCUS_PROGRESS_STEPS.find((s) => s.id === 'focus-signal-chips');
  if (chipsBeat && clamped >= chipsBeat.progressEnd) {
    signalChipsOpacity = 1;
  }

  const highlightIds =
    step >= 2 && step <= 4 ? FOCUS_CROSS_HIGHLIGHT_IDS : [];

  let backgroundOpacity = 1;
  if (step >= 5) {
    backgroundOpacity = 0.12;
  } else if (step >= 3) {
    backgroundOpacity = 0.35;
  }

  const emergeBeat = FOCUS_PROGRESS_STEPS.find((s) => s.id === 'focus-priority-emerge');

  // Signal chips must recede with the rest of the noisy background once the
  // priority card starts emerging, otherwise they stay pinned at full
  // opacity forever and visually stack on top of the card (P1-T07: "Hidden
  // or ghost" beyond the emerge beat).
  if (emergeBeat && clamped >= emergeBeat.progressStart) {
    if (clamped >= emergeBeat.progressEnd) {
      signalChipsOpacity = backgroundOpacity;
    } else {
      const local =
        (clamped - emergeBeat.progressStart) / (emergeBeat.progressEnd - emergeBeat.progressStart);
      signalChipsOpacity = 1 - local * (1 - backgroundOpacity);
    }
  }
  const signalChipsTranslateY = 12 * (1 - signalChipsOpacity);

  let priorityOpacity = 0;
  let priorityScale = 0.92;
  if (emergeBeat && clamped >= emergeBeat.progressStart) {
    if (clamped >= emergeBeat.progressEnd) {
      priorityOpacity = 1;
      priorityScale = 1;
    } else {
      const local =
        (clamped - emergeBeat.progressStart) / (emergeBeat.progressEnd - emergeBeat.progressStart);
      priorityOpacity = local;
      priorityScale = 0.92 + 0.08 * local;
    }
  }

  // Card settles fully at the start of the hold beat; the label and CTA
  // then fade in softly right after, over a short window, so the reveal
  // reads as one continuous settle instead of an instant pop (P1-T07).
  const holdBeat = FOCUS_PROGRESS_STEPS.find((s) => s.id === 'focus-priority-hold');
  let focusExtrasOpacity = 0;
  if (holdBeat && clamped >= holdBeat.progressStart) {
    const fadeSpan = (holdBeat.progressEnd - holdBeat.progressStart) * 0.35;
    focusExtrasOpacity = Math.min(1, (clamped - holdBeat.progressStart) / fadeSpan);
  }

  return {
    backgroundOpacity,
    signalChipsOpacity,
    signalChipsTranslateY,
    highlightIds,
    priorityOpacity,
    priorityScale,
    // Label, card, and CTA all land together at the hold beat and stay put
    // through the final beat, so this reads as one settled screen instead of
    // the CTA disappearing right as the label appears (P1-T07).
    priorityEmphasized: step >= 4,
    showPriorityCta: step >= 4,
    showFocusLabel: step >= 4,
    focusExtrasOpacity,
  };
}

/**
 * Scroll-scrubbed character index for Execute draft typing (P1-T08 beat).
 * Returns 0 before the beat, full length after it.
 */
export function getScrollSyncedCharIndex(
  text: string,
  theaterId: TheaterId,
  progress: number,
  beatId = 'execute-draft-typing'
): number {
  const beat = getTheaterProgressSteps(theaterId).find((step) => step.id === beatId);
  if (!beat || text.length === 0) return 0;

  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped < beat.progressStart) return 0;
  if (clamped >= beat.progressEnd) return text.length;

  const local = (clamped - beat.progressStart) / (beat.progressEnd - beat.progressStart);
  return Math.floor(local * text.length);
}

/** Character index for Execute draft body at scroll progress (convenience wrapper). */
export function getExecuteDraftCharIndex(progress: number, text: string): number {
  return getScrollSyncedCharIndex(text, 'execute', progress, 'execute-draft-typing');
}

function getExecuteBeatLocalProgress(progress: number, beatId: string): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const beat = EXECUTE_PROGRESS_STEPS.find((step) => step.id === beatId);
  if (!beat) return 0;
  if (clamped < beat.progressStart) return 0;
  if (clamped >= beat.progressEnd) return 1;
  return (clamped - beat.progressStart) / (beat.progressEnd - beat.progressStart);
}

export type ExecuteCalendarReveal = {
  opacity: number;
  translateX: number;
};

/** Calendar block slide-in during Execute calendar beat. */
export function getExecuteCalendarReveal(progress: number): ExecuteCalendarReveal {
  const reveal = getExecuteBeatLocalProgress(progress, 'execute-calendar-block');
  // Settle the slide quickly, then hold so status copy can land.
  const settle = Math.min(1, reveal / 0.28);
  return {
    opacity: settle,
    translateX: 16 * (1 - settle),
  };
}

/** Jira checkbox fill progress during Execute jira beat. */
export function getExecuteJiraCheckProgress(progress: number): number {
  return getExecuteBeatLocalProgress(progress, 'execute-jira-check');
}

/** Success banner fade during Execute success beat. */
export function getExecuteSuccessOpacity(progress: number): number {
  return getExecuteBeatLocalProgress(progress, 'execute-success-banner');
}

export type ExecuteDraftStatus = 'drafting' | 'drafted' | 'approve' | 'sent';

/** Draft panel MindMesh status chip for typing → approve → sent. */
export function getExecuteDraftStatus(progress: number): ExecuteDraftStatus {
  const clamped = Math.min(1, Math.max(0, progress));
  const typing = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-draft-typing');
  const send = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-draft-send');
  if (!typing || !send) return 'drafting';
  if (clamped < typing.progressEnd) return 'drafting';
  if (clamped >= send.progressEnd) return 'sent';
  const local =
    (clamped - send.progressStart) / (send.progressEnd - send.progressStart);
  if (local < 0.35) return 'drafted';
  if (local < 0.7) return 'approve';
  return 'sent';
}

export type ExecuteCalendarStatus = 'blocking' | 'blocked';

/** Calendar panel MindMesh status: blocking time → prep blocked. */
export function getExecuteCalendarStatus(progress: number): ExecuteCalendarStatus {
  const local = getExecuteBeatLocalProgress(progress, 'execute-calendar-block');
  return local < 0.45 ? 'blocking' : 'blocked';
}

export type ExecuteJiraStatus = 'staging' | 'done';

/** Jira panel MindMesh status: staging Done → marked Done. */
export function getExecuteJiraStatus(progress: number): ExecuteJiraStatus {
  const local = getExecuteBeatLocalProgress(progress, 'execute-jira-check');
  return local < 0.55 ? 'staging' : 'done';
}

function executePanelFade(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): number {
  if (progress < fadeInStart) return 0;
  if (progress < fadeInEnd) return (progress - fadeInStart) / (fadeInEnd - fadeInStart);
  if (progress < fadeOutStart) return 1;
  if (progress < fadeOutEnd) return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  return 0;
}

export type PriorityHandoffPhase = 'incoming' | 'acting' | 'done';

export type ExecuteVisualState = {
  /** Fade/slide-in for the single-line priority continuity strip (P1-T08). */
  handoffOpacity: number;
  handoffTranslateY: number;
  /** One strip, three phases, instead of a second duplicate priority screen. */
  handoffPhase: PriorityHandoffPhase;
  ctaPulseScale: number;
  /** Final hold: all action panels stacked. */
  showHoldStack: boolean;
  draftWrapOpacity: number;
  calendarWrapOpacity: number;
  jiraWrapOpacity: number;
};

/** Map scroll progress to Execute theater demo visual state (P4-T10). */
export function getExecuteVisualStateFromProgress(progress: number): ExecuteVisualState {
  const clamped = Math.min(1, Math.max(0, progress));
  const step = getTheaterStep('execute', clamped);
  const showHoldStack = step >= 7;

  const handoffLocal = getExecuteBeatLocalProgress(clamped, 'execute-priority-pinned');
  const handoffOpacity = handoffLocal;
  const handoffTranslateY = 6 * (1 - handoffLocal);

  const ctaBeat = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-cta-pulse');
  const showCtaPulse = Boolean(
    ctaBeat && clamped >= ctaBeat.progressStart && clamped < ctaBeat.progressEnd
  );
  let ctaPulseScale = 1;
  if (showCtaPulse && ctaBeat) {
    const local = (clamped - ctaBeat.progressStart) / (ctaBeat.progressEnd - ctaBeat.progressStart);
    ctaPulseScale = 1 + 0.05 * Math.sin(local * Math.PI);
  }

  const successBeat = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-success-banner');
  const handoffPhase: PriorityHandoffPhase =
    successBeat && clamped >= successBeat.progressStart
      ? 'done'
      : ctaBeat && clamped >= ctaBeat.progressStart
        ? 'acting'
        : 'incoming';

  const draftBeat = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-draft-typing');
  const calendarBeat = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-calendar-block');
  const jiraBeat = EXECUTE_PROGRESS_STEPS.find((s) => s.id === 'execute-jira-check');

  return {
    handoffOpacity,
    handoffTranslateY,
    handoffPhase,
    ctaPulseScale,
    showHoldStack,
    draftWrapOpacity: showHoldStack
      ? 1
      : executePanelFade(
          clamped,
          (draftBeat?.progressStart ?? 0.14) - 0.02,
          draftBeat?.progressStart ?? 0.14,
          calendarBeat?.progressStart ?? 0.52,
          (calendarBeat?.progressStart ?? 0.52) + 0.06
        ),
    calendarWrapOpacity: showHoldStack
      ? 1
      : executePanelFade(
          clamped,
          (calendarBeat?.progressStart ?? 0.52) - 0.02,
          calendarBeat?.progressStart ?? 0.52,
          jiraBeat?.progressStart ?? 0.7,
          (jiraBeat?.progressStart ?? 0.7) + 0.06
        ),
    jiraWrapOpacity: showHoldStack
      ? 1
      : executePanelFade(
          clamped,
          (jiraBeat?.progressStart ?? 0.7) - 0.02,
          jiraBeat?.progressStart ?? 0.7,
          successBeat?.progressStart ?? 0.86,
          (successBeat?.progressStart ?? 0.86) + 0.06
        ),
  };
}

function getNamedBeatLocalProgress(
  steps: readonly TheaterProgressStep[],
  progress: number,
  beatId: string
): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const beat = steps.find((step) => step.id === beatId);
  if (!beat) return 0;
  if (clamped < beat.progressStart) return 0;
  if (clamped >= beat.progressEnd) return 1;
  return (clamped - beat.progressStart) / (beat.progressEnd - beat.progressStart);
}

export type SensorResultMotion = {
  opacity: number;
  translateY: number;
};

export type SensorVisualState = {
  queryCharIndex: number;
  showResults: boolean;
  resultMotions: readonly SensorResultMotion[];
  highlightProgress: number;
  confirmOpacity: number;
  showHold: boolean;
};

/** Per-result fly-in during Sensor results beat (P8-T05). */
export function getSensorResultMotion(
  progress: number,
  resultIndex: number,
  totalResults = 3
): SensorResultMotion {
  const clamped = Math.min(1, Math.max(0, progress));
  const results = SENSOR_PROGRESS_STEPS.find((step) => step.id === 'sensor-results');
  if (!results || clamped < results.progressStart) {
    return { opacity: 0, translateY: 8 };
  }
  if (clamped >= results.progressEnd) {
    return { opacity: 1, translateY: 0 };
  }

  const local =
    (clamped - results.progressStart) / (results.progressEnd - results.progressStart);
  const span = 1 / totalResults;
  const start = resultIndex * span;
  const cardLocal = Math.min(1, Math.max(0, (local - start) / span));

  return {
    opacity: cardLocal,
    translateY: 8 * (1 - cardLocal),
  };
}

export function getSensorHighlightProgress(progress: number): number {
  return getNamedBeatLocalProgress(SENSOR_PROGRESS_STEPS, progress, 'sensor-highlight');
}

export function getSensorConfirmOpacity(progress: number): number {
  return getNamedBeatLocalProgress(SENSOR_PROGRESS_STEPS, progress, 'sensor-confirm');
}

/** Character index for Sensor query typing (P8-T05). */
export function getSensorQueryCharIndex(progress: number, text: string): number {
  return getScrollSyncedCharIndex(text, 'sensor', progress, 'sensor-type-query');
}

/** Map scroll progress to Sensor theater demo visual state (P8-T09). */
export function getSensorVisualStateFromProgress(
  progress: number,
  queryText = 'Open Cal',
  totalResults = 3
): SensorVisualState {
  const clamped = Math.min(1, Math.max(0, progress));
  const resultMotions = Array.from({ length: totalResults }, (_, index) =>
    getSensorResultMotion(clamped, index, totalResults)
  );

  return {
    queryCharIndex: getSensorQueryCharIndex(clamped, queryText),
    showResults: clamped >= 0.35,
    resultMotions,
    highlightProgress: getSensorHighlightProgress(clamped),
    confirmOpacity: getSensorConfirmOpacity(clamped),
    showHold: clamped >= 0.9,
  };
}

export type SensorCalcResultMotion = {
  opacity: number;
  translateY: number;
};

export type SensorCalcVisualState = {
  queryCharIndex: number;
  resolveOpacity: number;
  resultMotion: SensorCalcResultMotion;
  showSecondary: boolean;
  secondaryOpacity: number;
  showHold: boolean;
};

/** Character index for Sensor calc query typing (P10-T01). */
export function getSensorCalcQueryCharIndex(progress: number, text: string): number {
  return getScrollSyncedCharIndex(text, 'sensorCalc', progress, 'sensor-calc-type');
}

/**
 * Resolve row opacity: rises in sensor-calc-resolve, fades as result enters.
 */
export function getSensorCalcResolveOpacity(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const resolve = SENSOR_CALC_PROGRESS_STEPS.find(
    (step) => step.id === 'sensor-calc-resolve'
  );
  const result = SENSOR_CALC_PROGRESS_STEPS.find(
    (step) => step.id === 'sensor-calc-result'
  );
  if (!resolve || !result) return 0;
  if (clamped < resolve.progressStart) return 0;
  if (clamped < resolve.progressEnd) {
    return (clamped - resolve.progressStart) / (resolve.progressEnd - resolve.progressStart);
  }
  if (clamped >= result.progressEnd) return 0;
  const fadeLocal =
    (clamped - result.progressStart) / (result.progressEnd - result.progressStart);
  return Math.max(0, 1 - fadeLocal);
}

/** Result card fly-in during sensor-calc-result (P10-T01). */
export function getSensorCalcResultMotion(progress: number): SensorCalcResultMotion {
  const local = getNamedBeatLocalProgress(
    SENSOR_CALC_PROGRESS_STEPS,
    progress,
    'sensor-calc-result'
  );
  return {
    opacity: local,
    translateY: 8 * (1 - local),
  };
}

export function getSensorCalcSecondaryOpacity(progress: number): number {
  return getNamedBeatLocalProgress(
    SENSOR_CALC_PROGRESS_STEPS,
    progress,
    'sensor-calc-settle'
  );
}

/** Map scroll progress to Sensor calc theater visual state (P10-T03). */
export function getSensorCalcVisualStateFromProgress(
  progress: number,
  queryText = '15% of 240'
): SensorCalcVisualState {
  const clamped = Math.min(1, Math.max(0, progress));
  const secondaryOpacity = getSensorCalcSecondaryOpacity(clamped);

  return {
    queryCharIndex: getSensorCalcQueryCharIndex(clamped, queryText),
    resolveOpacity: getSensorCalcResolveOpacity(clamped),
    resultMotion: getSensorCalcResultMotion(clamped),
    showSecondary: clamped >= 0.78,
    secondaryOpacity,
    showHold: clamped >= 0.9,
  };
}

export type MascotUserAskMotion = {
  opacity: number;
  translateY: number;
};

export type MascotVisualState = {
  showUserAsk: boolean;
  userAskMotion: MascotUserAskMotion;
  showTyping: boolean;
  replyVisibleCount: 0 | 1 | 2 | 3;
  actionOpacity: number;
  showHold: boolean;
};

export function getMascotUserAskMotion(progress: number): MascotUserAskMotion {
  const local = getNamedBeatLocalProgress(MASCOT_PROGRESS_STEPS, progress, 'mascot-user-ask');
  if (progress >= 0.28) {
    return { opacity: 1, translateY: 0 };
  }
  return {
    opacity: local,
    translateY: 8 * (1 - local),
  };
}

/** Staged reply paragraphs during Mascot reply beat (P8-T06). */
export function getMascotReplyVisibleCount(progress: number): 0 | 1 | 2 | 3 {
  const clamped = Math.min(1, Math.max(0, progress));
  const reply = MASCOT_PROGRESS_STEPS.find((step) => step.id === 'mascot-reply');
  if (!reply || clamped < reply.progressStart) return 0;
  if (clamped >= reply.progressEnd) return 3;

  const local =
    (clamped - reply.progressStart) / (reply.progressEnd - reply.progressStart);
  // P8-T06 chunking: 0–0.33 → 1, 0.33–0.66 → 2, 0.66–1 → 3
  if (local < 0.33) return 1;
  if (local < 0.66) return 2;
  return 3;
}

export function getMascotActionOpacity(progress: number): number {
  return getNamedBeatLocalProgress(MASCOT_PROGRESS_STEPS, progress, 'mascot-action');
}

/** Map scroll progress to Mascot theater demo visual state (P8-T11). */
export function getMascotVisualStateFromProgress(progress: number): MascotVisualState {
  const clamped = Math.min(1, Math.max(0, progress));

  return {
    showUserAsk: clamped >= 0.1,
    userAskMotion: getMascotUserAskMotion(clamped),
    showTyping: clamped >= 0.28 && clamped < 0.55,
    replyVisibleCount: getMascotReplyVisibleCount(clamped),
    actionOpacity: getMascotActionOpacity(clamped),
    showHold: clamped >= 0.88,
  };
}

export type MascotAttachmentHitMotion = {
  opacity: number;
  translateY: number;
};

export type MascotAttachmentVisualState = {
  showUserAsk: boolean;
  userAskMotion: MascotUserAskMotion;
  showTyping: boolean;
  replyVisibleCount: 0 | 1 | 2;
  hitMotion: MascotAttachmentHitMotion;
  actionOpacity: number;
  showHold: boolean;
};

export function getMascotAttachmentUserAskMotion(
  progress: number
): MascotUserAskMotion {
  const local = getNamedBeatLocalProgress(
    MASCOT_ATTACHMENT_PROGRESS_STEPS,
    progress,
    'mascot-att-user-ask'
  );
  if (progress >= 0.28) {
    return { opacity: 1, translateY: 0 };
  }
  return {
    opacity: local,
    translateY: 8 * (1 - local),
  };
}

/** Staged reply lines during mascot-att-reply (P10-T05). */
export function getMascotAttachmentReplyVisibleCount(
  progress: number
): 0 | 1 | 2 {
  const clamped = Math.min(1, Math.max(0, progress));
  const reply = MASCOT_ATTACHMENT_PROGRESS_STEPS.find(
    (step) => step.id === 'mascot-att-reply'
  );
  if (!reply || clamped < reply.progressStart) return 0;
  if (clamped >= reply.progressEnd) return 2;

  const local =
    (clamped - reply.progressStart) / (reply.progressEnd - reply.progressStart);
  if (local < 0.5) return 1;
  return 2;
}

export function getMascotAttachmentHitMotion(
  progress: number
): MascotAttachmentHitMotion {
  const local = getNamedBeatLocalProgress(
    MASCOT_ATTACHMENT_PROGRESS_STEPS,
    progress,
    'mascot-att-hit'
  );
  return {
    opacity: local,
    translateY: 8 * (1 - local),
  };
}

export function getMascotAttachmentActionOpacity(progress: number): number {
  return getNamedBeatLocalProgress(
    MASCOT_ATTACHMENT_PROGRESS_STEPS,
    progress,
    'mascot-att-action'
  );
}

/** Map scroll progress to Mascot attachment theater visual state (P10-T06). */
export function getMascotAttachmentVisualStateFromProgress(
  progress: number
): MascotAttachmentVisualState {
  const clamped = Math.min(1, Math.max(0, progress));

  return {
    showUserAsk: clamped >= 0.1,
    userAskMotion: getMascotAttachmentUserAskMotion(clamped),
    showTyping: clamped >= 0.28 && clamped < 0.48,
    replyVisibleCount: getMascotAttachmentReplyVisibleCount(clamped),
    hitMotion: getMascotAttachmentHitMotion(clamped),
    actionOpacity: getMascotAttachmentActionOpacity(clamped),
    showHold: clamped >= 0.88,
  };
}

/** Reduced-motion jump-to progress for a theater. */
export function getReducedMotionFinalProgress(theaterId: TheaterId): number {
  return REDUCED_MOTION_FINAL_PROGRESS[theaterId];
}

/** Tailwind min-height class for scroll wrapper (desktop vs mobile). */
export function getTheaterWrapperMinHeightClass(
  theaterId: TheaterId,
  prefersReducedMotion = false
): string {
  if (prefersReducedMotion) return THEATER_WRAPPER_CLASS_REDUCED_MOTION;
  return THEATER_WRAPPER_CLASS[theaterId];
}
