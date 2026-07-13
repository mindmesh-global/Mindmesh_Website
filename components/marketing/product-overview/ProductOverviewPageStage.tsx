'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * Section-level Linear grey stage for the product overview.
 * Soft-fades in at Yesterday narrative, full-bleed behind the app,
 * and soft-fades out into the divider under the CTA row.
 */
export function ProductOverviewPageStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const section = stage.closest('section');
    if (!section) return;

    const sync = () => {
      const anchor = section.querySelector<HTMLElement>('[data-overview-stage-anchor]');
      const end = section.querySelector<HTMLElement>('[data-overview-stage-end]');
      if (!anchor || !end) {
        stage.dataset.ready = 'false';
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const top = Math.round(anchor.getBoundingClientRect().top - sectionRect.top);
      const endTop = Math.round(end.getBoundingClientRect().top - sectionRect.top);
      const bottom = Math.max(Math.round(sectionRect.height - endTop), 0);

      stage.style.setProperty('--overview-stage-top', `${Math.max(top, 0)}px`);
      stage.style.setProperty('--overview-stage-bottom', `${bottom}px`);
      stage.dataset.ready = 'true';
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(section);
    const mo = new MutationObserver(sync);
    mo.observe(section, { childList: true, subtree: true });
    window.addEventListener('resize', sync);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="overview-page-stage"
      data-overview-page-stage=""
      data-ready="false"
      aria-hidden
    />
  );
}
