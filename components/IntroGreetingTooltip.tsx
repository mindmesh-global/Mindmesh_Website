'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOnboardingTour } from '@/context/OnboardingTourContext';
import { useUIOverlay } from '@/context/UIOverlayContext';

const INTRO_Z_INDEX = 2147483645; // Stack above MindMesh windows, below mascot

export default function IntroGreetingTooltip() {
  const onboarding = useOnboardingTour();
  const uiOverlay = useUIOverlay();
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

  const handleClose = () => {
    setVisible(false);
    onboarding?.setIntroCompleted();
    onboarding?.setMascotTourCompleted();
    onboarding?.setSensorBarCompleted();
    onboarding?.setDropdownTooltipCompleted();
    uiOverlay?.setShowSensorBar(false);
  };

  const handleNext = () => {
    setVisible(false);
    onboarding?.setIntroCompleted();
  };

  if (!mounted || !onboarding || typeof document === 'undefined') return null;

  const tooltip = (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 cursor-default backdrop-blur-sm"
            style={{
              zIndex: INTRO_Z_INDEX - 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            key="intro-modal"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="fixed top-14 right-20 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg overflow-hidden"
            style={{
              zIndex: INTRO_Z_INDEX,
              background: 'linear-gradient(135deg, #1c1917 0%, #292524 30%, #1e1b4b 100%)',
              borderRadius: '20px',
              boxShadow: '0 0 0 1px rgba(251,191,36,0.3), 0 0 50px rgba(249,115,22,0.25), 0 0 100px rgba(139,92,246,0.15), 0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Starry background overlay */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.9), transparent),
                  radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.7), transparent),
                  radial-gradient(2px 2px at 50px 160px, rgba(255,255,255,0.8), transparent),
                  radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.6), transparent),
                  radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.7), transparent),
                  radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.5), transparent)`,
              }}
            />
            <div className="relative p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Image
                    src="/images/Logo/mindmesh-logo-tight.png"
                    alt="MindMesh"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </motion.div>
                <div className="flex-1 min-w-0 pt-1">
                  <motion.h3
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.25 }}
                    className="text-xl font-bold text-white"
                  >
                    Welcome to MindMesh!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.25 }}
                    className="text-white text-sm leading-relaxed mt-2"
                  >
                    Hi! I&apos;m your AI-powered productivity assistant.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.25 }}
                    className="text-white text-sm leading-relaxed"
                  >
                   Your smart workspace for meetings and productivity.
                   <br />
                   <br />
                   Click Next to explore the dashboard.
                  </motion.p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:opacity-95 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(180deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(168,85,247,0.3)',
                  }}
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
