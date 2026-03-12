'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;
type BillingCycle = 'monthly' | 'yearly';

interface PricingWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
  currentPlan?: 'free' | 'pro' | 'enterprise';
}

function FeatureCheck({ variant = 'blue' }: { variant?: 'blue' | 'white' }) {
  const circleClass =
    variant === 'white' ? 'bg-white/25' : 'bg-blue-100 dark:bg-blue-900/50';
  const iconClass =
    variant === 'white' ? 'text-white' : 'text-blue-600 dark:text-blue-400';
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${circleClass}`}
    >
      <Check className={`h-3 w-3 ${iconClass}`} strokeWidth={2.5} />
    </span>
  );
}

function FeatureCross() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
      <X className="h-3 w-3 text-red-600 dark:text-red-400" strokeWidth={2.5} />
    </span>
  );
}

export default function PricingWindow({
  dragControls,
  onClose,
  onMinimize,
  currentPlan = 'free',
}: PricingWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);

  const handleClose = () => onClose?.();

  const handleFullscreen = async () => {
    if (!windowRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await windowRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col">
      <div
        ref={windowRef}
        className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen
            ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen'
            : 'max-w-[1400px] min-h-0 flex-1'
        }`}
      >
        {/* Mac-style title bar */}
        <div
          className={`bg-gray-800/80 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2 flex-shrink-0 select-none ${dragControls ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onPointerDown={
            dragControls
              ? (e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  dragControls.start(e);
                }
              : undefined
          }
          style={dragControls ? { touchAction: 'none' } : undefined}
        >
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors active:scale-90"
              title="Close"
              aria-label="Close window"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors active:scale-90"
              title="Minimize"
              aria-label="Minimize window"
            />
            <button
              onClick={handleFullscreen}
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors active:scale-90"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            />
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-medium">Subscription</span>
          </div>
        </div>

        {/* Content - Pricing plans */}
        <div
          className={`flex-1 min-h-0 overflow-y-auto bg-gray-50 dark:bg-[linear-gradient(to_bottom_right,rgb(3,7,18),rgb(17,24,39))] ${
            isFullscreen ? 'h-[calc(100vh-3rem)]' : ''
          }`}
        >
          <div className="py-6 px-4 max-w-5xl mx-auto">
            <motion.header
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 text-center"
            >
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                Upgrade to Pro
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Unlock AI insights, unlimited accounts, and more.
              </p>
            </motion.header>

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-gray-600 dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    billing === 'monthly'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('yearly')}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    billing === 'yearly'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  Yearly
                </button>
              </div>
            </motion.div>

            {/* Plans grid */}
            <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
              {/* Free plan */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/95"
              >
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                  Free
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  2 accounts, basic inbox & calendar view.
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>Up to 2 email addresses (e.g. Gmail + SMTP, or 2 Gmail)</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>Inbox & calendar (fetch only)</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FeatureCross />
                    <span>No AI enrichment</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FeatureCross />
                    <span>No email/calendar memory or semantic search</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FeatureCross />
                    <span>No Mascot or Sensor</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FeatureCross />
                    <span>No Today&apos;s Overview or daily narrative</span>
                  </li>
                </ul>
                <div className="mt-5">
                  <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                    $0 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ month</span>
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      currentPlan === 'pro' && setShowDowngradeModal(true)
                    }
                    className="mt-3 w-full rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-blue-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-blue-200 dark:hover:bg-gray-600"
                  >
                    {currentPlan === 'free'
                      ? 'Current Plan'
                      : currentPlan === 'pro'
                        ? 'Downgrade to Free'
                        : 'Back to dashboard'}
                  </button>
                </div>
              </motion.div>

              {/* Pro plan (featured) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="relative flex flex-col rounded-xl bg-gradient-to-b from-blue-300 to-blue-500 p-5 shadow-xl dark:from-blue-400 dark:to-blue-600"
              >
                <span className="absolute right-3 top-3 rounded-full bg-blue-200 px-3 py-1 text-[10px] font-bold uppercase text-blue-800 dark:bg-blue-300/90 dark:text-blue-900">
                  MOST POPULAR
                </span>
                <h3 className="text-lg font-bold text-white">Pro</h3>
                <p className="mt-0.5 text-xs text-white/90">
                  Unlimited accounts, AI insights, Mascot & Sensor.
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {[
                    'Unlimited connected accounts',
                    'AI email & calendar enrichment',
                    'Encrypted AI memory for your inbox & calendar',
                    'Search your emails and events naturally — in your own words',
                    'Inferred facts & todos from emails and events',
                    "Today's Overview & Morning Juice (daily summary)",
                    "Yesterday's narrative (daily narrative)",
                    'Mascot & Sensor Bar AI assistant',
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-white"
                    >
                      <FeatureCheck variant="white" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <p className="text-xl font-bold text-white">
                    {billing === 'monthly' ? '$20/month' : '$200/year'}
                  </p>
                  {billing === 'yearly' && (
                    <p className="mt-0.5 text-xs text-white/75">
                      Save with annual billing
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg bg-blue-400 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
                  >
                    Upgrade
                  </button>
                </div>
              </motion.div>

              {/* Enterprise plan */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/95"
              >
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                  Enterprise
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  For teams that need custom integrations and dedicated support.
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>Custom integrations & API</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-blue-800/90 dark:text-blue-300/90">
                    <FeatureCheck variant="blue" />
                    <span>SSO and advanced security</span>
                  </li>
                </ul>
                <div className="mt-5">
                  <a
                    href="mailto:sales@mindmesh.global?subject=Enterprise%20plan%20inquiry"
                    className="block w-full rounded-lg bg-gray-100 py-2.5 text-center text-sm font-medium text-blue-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-blue-200 dark:hover:bg-gray-600"
                  >
                    Contact sales
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Downgrade confirmation modal */}
      <AnimatePresence>
        {showDowngradeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDowngradeModal(false)}
              className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-[99999] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900"
            >
              <div className="h-1 bg-gradient-to-r from-rose-500 to-rose-400" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Confirm Downgrade to Free Plan
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Are you sure you want to cancel your Pro subscription and switch to the
                  Free plan? Your subscription will be canceled immediately.
                </p>
                <p className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-200">
                  You will be taken to settings to complete the downgrade.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDowngradeModal(false)}
                    className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-rose-500 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600"
                  >
                    Continue to Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
