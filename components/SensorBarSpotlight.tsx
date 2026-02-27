'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useUIOverlay } from '@/context/UIOverlayContext';

/**
 * A dummy sensor bar UI with a spotlight effect centered on the screen.
 * Mimics an IR sensor bar (e.g. Wii-style) with a soft spotlight emanating from the center.
 */
export default function SensorBarSpotlight() {
  const [inputValue, setInputValue] = useState('');
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [viewBox, setViewBox] = useState('0 0 1200 800');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sensorBarRef = useRef<HTMLDivElement>(null);
  const uiOverlay = useUIOverlay();

  useEffect(() => {
    const updateLine = () => {
      setViewBox(`0 0 ${window.innerWidth} ${window.innerHeight}`);
      const tip = tooltipRef.current;
      const bar = sensorBarRef.current;
      if (!tip || !bar) return;
      const tr = tip.getBoundingClientRect();
      const br = bar.getBoundingClientRect();
      setLineCoords({
        x1: tr.right,
        y1: tr.top + tr.height / 2,
        x2: br.left,
        y2: br.top + br.height / 2,
      });
    };
    updateLine();
    window.addEventListener('resize', updateLine);
    const t = setTimeout(updateLine, 200);
    return () => {
      window.removeEventListener('resize', updateLine);
      clearTimeout(t);
    };
  }, []);

  const handleSkip = () => {
    if (uiOverlay) uiOverlay.setShowSensorBar(false);
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
      aria-hidden
    >
      {/* Dark overlay with radial spotlight cutout - pointer-events-none so clicks pass through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% 50%,
              transparent 0%,
              transparent 40%,
              rgba(0, 0, 0, 0.15) 60%,
              rgba(0, 0, 0, 0.4) 100%
            )
          `,
        }}
      />

      {/* Inner brighter spotlight core */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Sensor bar with tooltip */}
      <div className="relative flex flex-col items-center gap-4 pointer-events-none overflow-visible">
        <motion.div
          ref={sensorBarRef}
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
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

        {/* Connector line - from tooltip to sensor bar (dynamic) */}
        {lineCoords && (
          <svg
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            preserveAspectRatio="none"
            viewBox={viewBox}
            aria-hidden
          >
            <defs>
              <marker id="sensor-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            <line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              markerEnd="url(#sensor-arrowhead)"
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
