'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useOnboardingTour } from '@/context/OnboardingTourContext';

const INTRO_Z_INDEX = 2147483645; // Stack above MindMesh windows, below mascot

export default function IntroGreetingTooltip() {
  const onboarding = useOnboardingTour();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !onboarding || typeof window === 'undefined') return;
    if (!onboarding.introCompleted) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [mounted, onboarding?.introCompleted]);

  const handleDismiss = () => {
    setVisible(false);
    onboarding?.setIntroCompleted();
  };

  if (!mounted || !onboarding || typeof document === 'undefined') return null;

  const tooltip = (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dim overlay - separate element, animates its own opacity */}
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 cursor-default backdrop-blur-sm"
            style={{
              zIndex: INTRO_Z_INDEX - 1,
              backgroundColor: 'rgba(0,0,0,0.55)',
            }}
            onClick={handleDismiss}
            aria-hidden
          />
          {/* Modal - highlighted */}
          <motion.div
            key="intro-modal"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 28,
              mass: 0.8,
            }}
            className="fixed top-6 right-6 max-w-[280px] rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 dark:shadow-black/20 overflow-hidden"
            style={{ zIndex: INTRO_Z_INDEX }}
            onClick={(e) => e.stopPropagation()}
          >
        <div className="p-4 pr-10 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className="space-y-1.5 min-w-0">
              <motion.h3
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                Welcome to MindMesh
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.25 }}
                className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                Hi! Your AI-powered productivity assistant. Click the MindMesh icon to open your dashboard.
              </motion.p>
            </div>
          </div>
          <div className="px-4 pb-4 pt-1 flex justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-xl text-black border-2 border-black bg-transparent hover:bg-black/5 font-semibold transition-colors"
            >
              Next
            </button>
          </div>
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(tooltip, document.body);
}
