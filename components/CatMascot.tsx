'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeSection } from '@/context/HomeSectionContext';
import type { HomeSectionId } from '@/context/HomeSectionContext';
import { ChevronRight, X } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const LOTTIE_CAT_URL = 'https://lottie.host/7ac5c67a-7983-42a0-b290-2e0429865911/uvdYl2wxbT.lottie';

const SECTION_ORDER: HomeSectionId[] = [
  'time_clash',
  'inferred_facts',
  'todos',
  'events',
  'upcoming_events',
  'inbox',
  'daily_narrative',
  'connected_apps',
];

function getNextSection(current: HomeSectionId | null): HomeSectionId {
  if (!current) return SECTION_ORDER[0];
  const idx = SECTION_ORDER.indexOf(current);
  const nextIdx = idx < SECTION_ORDER.length - 1 ? idx + 1 : 0;
  return SECTION_ORDER[nextIdx];
}

function getSectionIndex(section: HomeSectionId | null): number {
  if (!section) return 0;
  const idx = SECTION_ORDER.indexOf(section);
  return idx >= 0 ? idx + 1 : 0;
}


export default function CatMascot({ showTooltip = true }: { showTooltip?: boolean }) {
  const pathname = usePathname();
  const homeSection = useHomeSection();
  const activeSection = homeSection?.activeSection ?? null;
  const sectionConfig = homeSection?.sectionConfig;
  const setActiveSection = homeSection?.setActiveSection;
  const [userDismissed, setUserDismissed] = useState(false);
  const isDashboard = pathname === '/dashboard';
  const displaySection = userDismissed ? null : (isDashboard && !activeSection ? SECTION_ORDER[0] : activeSection);
  const activeInfo = showTooltip && displaySection && sectionConfig ? sectionConfig[displaySection] : null;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number; cx: number; cy: number } | null>(null);

  const updateLine = useCallback(() => {
    if (!displaySection || !tooltipRef.current) {
      setLineCoords(null);
      return;
    }
    const sectionEl = document.querySelector(`[data-home-section="${displaySection}"]`);
    if (!sectionEl) {
      setLineCoords(null);
      return;
    }
    const sectionRect = sectionEl.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const x1 = sectionRect.right;
    const y1 = sectionRect.top + sectionRect.height / 2;
    const x2 = tooltipRect.left;
    const y2 = tooltipRect.top + tooltipRect.height / 2;
    const cx = (x1 + x2) / 2 + 40;
    const cy = (y1 + y2) / 2;
    setLineCoords({ x1, y1, x2, y2, cx, cy });
  }, [displaySection]);

  useEffect(() => {
    if (!activeInfo) {
      setLineCoords(null);
      return;
    }
    const run = () => requestAnimationFrame(updateLine);
    const t = setTimeout(run, 120);
    window.addEventListener('scroll', run, true);
    window.addEventListener('resize', run);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', run, true);
      window.removeEventListener('resize', run);
    };
  }, [displaySection, activeInfo, updateLine]);

  const scrollToSection = useCallback((sectionId: HomeSectionId) => {
    const el = document.querySelector(`[data-home-section="${sectionId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleNext = () => {
    if (!setActiveSection) return;
    const idx = displaySection ? SECTION_ORDER.indexOf(displaySection) : -1;
    if (idx >= 0 && idx === SECTION_ORDER.length - 1) {
      setUserDismissed(true);
      setActiveSection(null);
      return;
    }
    const nextSection = getNextSection(displaySection);
    setActiveSection(nextSection);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(nextSection));
    });
  };

  const handleSkip = () => {
    if (!setActiveSection) return;
    setUserDismissed(true);
    setActiveSection(null);
  };

  const currentStep = getSectionIndex(displaySection);
  const totalSteps = SECTION_ORDER.length;

  return (
    <>
      {/* Connector line (subtle, comic style) */}
      {lineCoords && (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none z-40"
          style={{ width: '100vw', height: '100vh' }}
          aria-hidden
        >
          <path
            d={`M ${lineCoords.x1} ${lineCoords.y1} Q ${lineCoords.cx} ${lineCoords.cy} ${lineCoords.x2} ${lineCoords.y2}`}
            fill="none"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      <div
        className="fixed bottom-4 right-28 z-50 flex flex-col items-center pointer-events-none select-none"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          {activeInfo && (
            <motion.div
              ref={tooltipRef}
              key={activeInfo.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="relative mb-2 rounded-2xl overflow-visible text-left pointer-events-auto bg-white border-2 border-black shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              style={{
                width: '220px',
                minWidth: '200px',
                maxWidth: '240px',
              }}
            >
              {/* Speech bubble body */}
              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500">
                    {currentStep} / {totalSteps}
                  </span>
                </div>

                {/* Section heading + summary */}
                <div className="space-y-2">
                  <motion.h3
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.2 }}
                    className="text-sm font-bold text-black"
                  >
                    {activeInfo.title}
                  </motion.h3>
                  {activeInfo.summary && (
                    <motion.p
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-xs text-gray-700 leading-relaxed"
                    >
                      {activeInfo.summary}
                    </motion.p>
                  )}
                </div>

                {/* Inferred Facts */}
                {(() => {
                  const facts = 'inferredFacts' in activeInfo ? activeInfo.inferredFacts : [];
                  return Array.isArray(facts) && facts.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-gray-200">
                    <span className="text-[11px] font-semibold text-black uppercase tracking-wide">
                      Inferred Facts
                    </span>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Key insights from emails, calendar & tasks.
                    </p>
                    <ul className="space-y-1.5">
                      {facts.map((fact, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.08, duration: 0.2 }}
                          className="flex items-start gap-2 text-xs text-gray-800 leading-relaxed"
                        >
                          <span className="text-amber-600 mt-0.5 flex-shrink-0" aria-hidden>💡</span>
                          <span>{fact}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  );
                })()}

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSkip}
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg border-2 border-black bg-white hover:bg-gray-100 active:scale-[0.98] text-black text-xs font-semibold transition-all duration-200"
                  >
                    <X className="w-3.5 h-3.5" />
                    Skip
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg border-2 border-black bg-black hover:bg-gray-800 active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Next
                  </button>
                </div>
              </div>

              {/* Speech bubble tail (V-shape pointing down) */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '14px solid black',
                }}
                aria-hidden
              />
              <div
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '12px solid white',
                }}
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-[120px] h-[120px] flex-shrink-0">
          <DotLottieReact
            src={LOTTIE_CAT_URL}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
