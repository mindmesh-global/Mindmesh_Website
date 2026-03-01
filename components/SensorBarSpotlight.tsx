'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUIOverlay } from '@/context/UIOverlayContext';

/**
 * A dummy sensor bar UI with a spotlight effect centered on the screen.
 * Mimics an IR sensor bar (e.g. Wii-style) with a soft spotlight emanating from the center.
 * Tooltip connects to sensor bar via curved line (like CatMascot connects to dashboard).
 */
export default function SensorBarSpotlight() {
  const [inputValue, setInputValue] = useState('');
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number; cx: number; cy: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sensorBarRef = useRef<HTMLDivElement>(null);
  const uiOverlay = useUIOverlay();

  const updateLine = useCallback(() => {
    const tip = tooltipRef.current;
    const bar = sensorBarRef.current;
    if (!tip || !bar) {
      setLineCoords(null);
      return;
    }
    const tr = tip.getBoundingClientRect();
    const br = bar.getBoundingClientRect();
    // Line from tooltip (right center) to sensor bar (left center)
    const x1 = tr.right;
    const y1 = tr.top + tr.height / 2;
    const x2 = br.left;
    const y2 = br.top + br.height / 2;
    const cx = (x1 + x2) / 2 + 40;
    const cy = (y1 + y2) / 2;
    setLineCoords({ x1, y1, x2, y2, cx, cy });
  }, []);

  useEffect(() => {
    const run = () => requestAnimationFrame(updateLine);
    const t1 = setTimeout(run, 300);
    const t2 = setTimeout(run, 600); // After tooltip + sensor bar animations
    window.addEventListener('resize', run);
    window.addEventListener('scroll', run, true);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', run);
      window.removeEventListener('scroll', run, true);
    };
  }, [updateLine]);

  const handleSkip = () => {
    if (uiOverlay) {
      uiOverlay.setHasScrolledToBottom(false);
      uiOverlay.setShowSensorBar(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
      aria-hidden
    >
      {/* Sensor bar with tooltip */}
      <div className="relative flex flex-col items-center gap-4 pointer-events-none overflow-visible">
        <motion.div
          ref={sensorBarRef}
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onAnimationComplete={updateLine}
          className="relative flex items-center gap-3 rounded-full bg-gray-600 border pl-4 pr-6 py-3 shadow-lg pointer-events-auto z-10"
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

        {/* Connector line - tooltip to sensor bar (curved, like CatMascot) */}
        {lineCoords && (
          <svg
            className="fixed inset-0 w-full h-full pointer-events-none z-[35]"
            style={{ width: '100vw', height: '100vh' }}
            aria-hidden
          >
            <path
              d={`M ${lineCoords.x1} ${lineCoords.y1} Q ${lineCoords.cx} ${lineCoords.cy} ${lineCoords.x2} ${lineCoords.y2}`}
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Tooltip - fixed at bottom left of screen */}
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.2 }}
          className="fixed left-40 bottom-1/4 z-10 px-4 py-2 rounded-xl bg-white border-2 border-black shadow-lg pointer-events-auto"
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
          {/* Arrow pointing up to sensor bar */}
          <div
            className="absolute -top-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white"
            style={{ filter: 'drop-shadow(0 -1px 0 black)' }}
            aria-hidden
          />
        </motion.div>
      </div>
    </div>
  );
}
