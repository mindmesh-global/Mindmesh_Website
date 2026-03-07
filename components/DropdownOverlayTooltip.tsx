'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { createPortal } from 'react-dom';

const PADDING = 12;
const DROPDOWN_TOOLTIP_Z = 2147483646;

/**
 * Shows highlight + tooltip on MindMesh dropdown after sensor bar tooltip is dismissed.
 * Only shows first time (dropdownTooltipCompleted = false).
 */
export default function DropdownOverlayTooltip() {
  const [rects, setRects] = useState<{ button: DOMRect; menu?: DOMRect } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const onboarding = useOnboardingTour();
  const uiOverlay = useUIOverlay();

  const updateRect = useCallback(() => {
    const btn = document.querySelector('[data-mindmesh-dropdown="true"]');
    const menu = document.querySelector('[data-mindmesh-dropdown-menu="true"]');
    if (btn) {
      setRects({
        button: btn.getBoundingClientRect(),
        menu: menu ? menu.getBoundingClientRect() : undefined,
      });
    } else {
      setRects(null);
    }
  }, []);

  useEffect(() => {
    const run = () => requestAnimationFrame(updateRect);
    const t1 = setTimeout(run, 100);
    const t2 = setTimeout(run, 500);
    const t3 = setTimeout(run, 350); // After dropdown opens
    window.addEventListener('resize', run);
    window.addEventListener('scroll', run, true);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', run);
      window.removeEventListener('scroll', run, true);
    };
  }, [updateRect]);

  // Auto-open dropdown when tooltip shows
  useEffect(() => {
    if (uiOverlay && !onboarding?.dropdownTooltipCompleted) {
      uiOverlay.setOpenOverlayDropdown(true);
    }
  }, [uiOverlay, onboarding?.dropdownTooltipCompleted]);

  const handleDismiss = () => {
    onboarding?.setDropdownTooltipCompleted();
  };

  if (!onboarding || typeof document === 'undefined') return null;
  if (onboarding.dropdownTooltipCompleted) return null;

  const content = (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: DROPDOWN_TOOLTIP_Z }}
      aria-hidden
    >
      {/* Dim overlay with cutout for dropdown */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden
      >
        <defs>
          <mask id="dropdown-tooltip-mask">
            <rect width="100%" height="100%" fill="white" />
            {rects && (
              <>
                <rect
                  x={rects.button.left - PADDING}
                  y={rects.button.top - PADDING}
                  width={rects.button.width + PADDING * 2}
                  height={rects.button.height + PADDING * 2}
                  rx="8"
                  ry="8"
                  fill="black"
                />
                {rects.menu && (
                  <rect
                    x={rects.menu.left - PADDING}
                    y={rects.menu.top - PADDING}
                    width={rects.menu.width + PADDING * 2}
                    height={rects.menu.height + PADDING * 2}
                    rx="8"
                    ry="8"
                    fill="black"
                  />
                )}
              </>
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#dropdown-tooltip-mask)"
        />
        {rects && (
          <>
            <rect
              x={rects.button.left - PADDING}
              y={rects.button.top - PADDING}
              width={rects.button.width + PADDING * 2}
              height={rects.button.height + PADDING * 2}
              rx="8"
              ry="8"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
            />
            {rects.menu && (
              <rect
                x={rects.menu.left - PADDING}
                y={rects.menu.top - PADDING}
                width={rects.menu.width + PADDING * 2}
                height={rects.menu.height + PADDING * 2}
                rx="8"
                ry="8"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
            )}
          </>
        )}
      </svg>

      {/* Tooltip */}
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="fixed left-40 bottom-1/4 px-4 py-2 rounded-xl bg-white border-2 border-black shadow-lg pointer-events-auto"
        style={{ zIndex: DROPDOWN_TOOLTIP_Z + 1 }}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-black">You can open Sensor Bar from here</p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-black text-xs font-semibold hover:bg-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
          Got it
        </button>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}
