/**
 * Click-driven guided scrub through a tall theater runway.
 * Used by Focus "Act on this" to jump into Execute and play the draft /
 * calendar / Jira sequence as a visual guide (mirrors product-overview tour).
 */

import { THEATER_STICKY_TOP_PX, type TheaterId } from '@/lib/marketing-theater-scroll';

type TheaterScrollRange = {
  start: number;
  end: number;
};

let activeCancel: (() => void) | null = null;

/** Stop any in-flight guided theater scrub. */
export function cancelTheaterScrollGuide(): void {
  activeCancel?.();
  activeCancel = null;
}

function getTheaterScrollRange(wrapper: HTMLElement): TheaterScrollRange | null {
  const frame = wrapper.querySelector<HTMLElement>('.theater-sticky-frame');
  const frameHeight = frame ? frame.getBoundingClientRect().height : 0;
  const span = wrapper.offsetHeight - frameHeight;
  if (span <= 0) return null;

  const rect = wrapper.getBoundingClientRect();
  const start = window.scrollY + rect.top - THEATER_STICKY_TOP_PX;
  return { start, end: start + span };
}

function scrollToY(y: number, behavior: ScrollBehavior): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener('scrollend', finish);
      resolve();
    };

    window.addEventListener('scrollend', finish, { once: true });
    window.scrollTo({ top: Math.max(0, y), behavior });
    window.setTimeout(finish, behavior === 'smooth' ? 1100 : 40);
  });
}

export type PlayTheaterScrollGuideOptions = {
  /** Total scrub duration once the runway start is reached. */
  durationMs?: number;
};

/**
 * Jump to a theater's scroll runway and scrub progress 0→1 over time.
 * User wheel / touch / Escape cancels and restores normal scroll control.
 */
export async function playTheaterScrollGuide(
  theaterId: TheaterId,
  options: PlayTheaterScrollGuideOptions = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  cancelTheaterScrollGuide();

  const wrapper = document.querySelector<HTMLElement>(`[data-theater="${theaterId}"]`);
  if (!wrapper) return;

  const section = document.getElementById(theaterId);
  if (section) {
    window.history.replaceState(null, '', `#${theaterId}`);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const durationMs = options.durationMs ?? 14000;
  let cancelled = false;
  let rafId = 0;

  const cleanup = () => {
    cancelled = true;
    if (rafId) window.cancelAnimationFrame(rafId);
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
    window.removeEventListener('keydown', onKeyInterrupt);
    if (activeCancel === cleanup) activeCancel = null;
  };

  const onUserInterrupt = () => {
    cleanup();
  };

  const onKeyInterrupt = (event: KeyboardEvent) => {
    if (
      event.key === 'Escape' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'PageDown' ||
      event.key === 'PageUp' ||
      event.key === ' '
    ) {
      cleanup();
    }
  };

  activeCancel = cleanup;
  window.addEventListener('wheel', onUserInterrupt, { passive: true });
  window.addEventListener('touchstart', onUserInterrupt, { passive: true });
  window.addEventListener('keydown', onKeyInterrupt);

  // Recompute after any prior layout; jump to progress 0 of the runway.
  const range = getTheaterScrollRange(wrapper);
  if (!range) {
    cleanup();
    return;
  }

  await scrollToY(range.start, 'smooth');
  if (cancelled) return;

  // Layout can shift after the smooth arrival; refresh the scrub span.
  const liveRange = getTheaterScrollRange(wrapper) ?? range;
  const start = liveRange.start;
  const end = liveRange.end;
  const span = end - start;
  if (span <= 0) {
    cleanup();
    return;
  }

  // Ensure we are parked at the start before scrubbing.
  window.scrollTo({ top: Math.max(0, start), behavior: 'auto' });

  const t0 = performance.now();
  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - t0) / durationMs);
    window.scrollTo({ top: Math.max(0, start + span * t), behavior: 'auto' });
    if (t < 1) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      cleanup();
    }
  };

  rafId = window.requestAnimationFrame(tick);
}
