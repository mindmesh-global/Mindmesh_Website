'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.25 }}
        className="fixed left-40 bottom-1/4 rounded-2xl overflow-hidden pointer-events-auto"
        style={{
          zIndex: DROPDOWN_TOOLTIP_Z + 1,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f0a1e 50%, #0c0a14 100%)',
          boxShadow: '0 0 0 1px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(168,85,247,0.2)',
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent),
              radial-gradient(2px 2px at 50px 70px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.5), transparent)`,
          }}
        />
        <div className="relative p-5 min-w-[260px]">
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                boxShadow: '0 0 15px rgba(34,211,238,0.4)',
              }}
            >
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-extrabold text-white mb-1">Features Shortcut</h3>
              <p className="text-sm text-white leading-relaxed">You can open Sensor Bar from here</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleDismiss}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-transparent border border-cyan-400/60 hover:bg-cyan-500/10 text-white text-xs font-semibold transition-all"
              style={{ boxShadow: '0 0 12px rgba(34,211,238,0.3)' }}
            >
              <X className="w-3.5 h-3.5" />
              Got it
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}
