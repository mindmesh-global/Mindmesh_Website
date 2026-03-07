'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIOverlay } from '@/context/UIOverlayContext';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { createPortal } from 'react-dom';

const PADDING = 12;
const SENSOR_BAR_Z = 2147483648; // Above mascot (2147483647)

interface SensorBarSpotlightProps {
  /** When true: full spotlight + tooltip (onboarding). When false: only the sensor bar. */
  showTooltip?: boolean;
}

/**
 * Sensor bar - shows on mindmesh screen when Sensor Bar option is ON.
 * With showTooltip: spotlight + tooltip (onboarding). Without: just the bar.
 */
export default function SensorBarSpotlight({ showTooltip = false }: SensorBarSpotlightProps) {
  const [inputValue, setInputValue] = useState('');
  const [spotlightRects, setSpotlightRects] = useState<{
    bar: { left: number; top: number; width: number; height: number };
    tooltip: { left: number; top: number; width: number; height: number };
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sensorBarRef = useRef<HTMLDivElement>(null);
  const uiOverlay = useUIOverlay();
  const onboarding = useOnboardingTour();

  const updateSpotlight = useCallback(() => {
    const bar = sensorBarRef.current;
    const tip = tooltipRef.current;
    if (!bar || !tip) {
      setSpotlightRects(null);
      return;
    }
    const br = bar.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    setSpotlightRects({
      bar: { left: br.left, top: br.top, width: br.width, height: br.height },
      tooltip: { left: tr.left, top: tr.top, width: tr.width, height: tr.height },
    });
  }, []);

  useEffect(() => {
    const run = () => requestAnimationFrame(updateSpotlight);
    const t1 = setTimeout(run, 300);
    const t2 = setTimeout(run, 800);
    window.addEventListener('resize', run);
    window.addEventListener('scroll', run, true);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', run);
      window.removeEventListener('scroll', run, true);
    };
  }, [updateSpotlight]);

  const handleSkip = () => {
    onboarding?.setSensorBarCompleted();
    uiOverlay?.setShowSensorBar(false);
  };

  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: SENSOR_BAR_Z }}
      aria-hidden
    >
      {/* Spotlight overlay - only when showTooltip (onboarding) */}
      {showTooltip && typeof document !== 'undefined' && (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: SENSOR_BAR_Z, width: '100vw', height: '100vh' }}
          aria-hidden
        >
          <defs>
            <mask id="sensor-bar-spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {spotlightRects && (
                <>
                  <rect
                    x={spotlightRects.bar.left - PADDING}
                    y={spotlightRects.bar.top - PADDING}
                    width={spotlightRects.bar.width + PADDING * 2}
                    height={spotlightRects.bar.height + PADDING * 2}
                    rx="24"
                    ry="24"
                    fill="black"
                  />
                  <rect
                    x={spotlightRects.tooltip.left - PADDING}
                    y={spotlightRects.tooltip.top - PADDING}
                    width={spotlightRects.tooltip.width + PADDING * 2}
                    height={spotlightRects.tooltip.height + PADDING * 2}
                    rx="8"
                    ry="8"
                    fill="black"
                  />
                </>
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#sensor-bar-spotlight-mask)"
          />
          {spotlightRects && (
            <>
              <rect
                x={spotlightRects.bar.left - PADDING}
                y={spotlightRects.bar.top - PADDING}
                width={spotlightRects.bar.width + PADDING * 2}
                height={spotlightRects.bar.height + PADDING * 2}
                rx="24"
                ry="24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
              <rect
                x={spotlightRects.tooltip.left - PADDING}
                y={spotlightRects.tooltip.top - PADDING}
                width={spotlightRects.tooltip.width + PADDING * 2}
                height={spotlightRects.tooltip.height + PADDING * 2}
                rx="8"
                ry="8"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
            </>
          )}
        </svg>
      )}

      {/* Sensor bar + tooltip */}
      <div className="relative flex flex-col items-center gap-4 pointer-events-none overflow-visible">
        <motion.div
          ref={sensorBarRef}
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onAnimationComplete={updateSpotlight}
          className="relative flex items-center gap-3 rounded-full bg-gray-600 border pl-4 pr-6 py-3 shadow-lg pointer-events-auto"
          style={{ zIndex: SENSOR_BAR_Z + 2 }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search here..."
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-[15px] pl-1 pr-2 text-left"
          />
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0"
              style={{
                opacity: 0.7 + (Math.sin(i * 0.5) * 0.15),
              }}
            />
          ))}
        </motion.div>

        {/* Tooltip - only when showTooltip (onboarding) */}
        {showTooltip && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.2 }}
            onAnimationComplete={updateSpotlight}
            className="fixed left-40 bottom-1/4 px-4 py-2 rounded-xl bg-white border-2 border-black shadow-lg pointer-events-auto"
            style={{ zIndex: SENSOR_BAR_Z + 2 }}
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-black">Search anything, jump anywhere</p>
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-black text-xs font-semibold hover:bg-slate-200 transition-all"
            >
              <X className="w-4 h-4" />
              Skip
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}
