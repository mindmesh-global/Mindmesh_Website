'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutTemplate, Monitor } from 'lucide-react';
import { useDashboardViewMode } from '@/context/DashboardViewModeContext';

/** Fixed top-right of the viewport (same as before) — stays above the MindMesh window. */
export default function ViewSwitcherButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { viewMode, toggleViewMode } = useDashboardViewMode();
  const isDesktop = viewMode === 'desktop';

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
        aria-label={isDesktop ? 'Switch to scroll view' : 'Switch to desktop view'}
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
            {isDesktop ? (
              <Monitor className="h-5 w-5 shrink-0 text-white" aria-hidden />
            ) : (
              <LayoutTemplate className="h-5 w-5 shrink-0 text-white" aria-hidden />
            )}
            <span className="whitespace-nowrap">{isDesktop ? 'Desktop View' : 'Scroll View'}</span>
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(node, document.body);
}
