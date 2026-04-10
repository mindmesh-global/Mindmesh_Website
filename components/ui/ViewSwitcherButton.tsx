'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, ScrollText } from 'lucide-react';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';

/** Fixed top-right — label shows *current* layout: macOS-style Hero vs marketing Scroll page. */
export default function ViewSwitcherButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { viewMode, toggleViewMode } = useDashboardViewMode();
  const isMacStyleView = viewMode === 'scrollable';

  const node = (
    <div
      className="pointer-events-none fixed top-4 right-6 sm:right-6"
      style={{ zIndex: 2147483646 }}
      role="presentation"
    >
      <motion.button
        type="button"
        onClick={toggleViewMode}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-left text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        aria-label={isMacStyleView ? 'Switch to Scroll view' : 'Switch to macOS view'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={viewMode}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            {isMacStyleView ? (
              <Monitor className="h-5 w-5 shrink-0 text-white" aria-hidden />
            ) : (
              <ScrollText className="h-5 w-5 shrink-0 text-white" aria-hidden />
            )}
            <span className="whitespace-nowrap">
              {isMacStyleView ? 'macOS view' : 'Scroll view'}
            </span>
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(node, document.body);
}
