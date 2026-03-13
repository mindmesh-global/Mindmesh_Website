'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { User, Mail, Check } from 'lucide-react';

type ModalState = 'form' | 'loading' | 'success';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

export default function WaitlistModal({ isOpen, onClose, embedded }: WaitlistModalProps) {
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [state, setState] = useState<ModalState>('form');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedEmail = email.trim();
      const trimmedName = name.trim();

      if (!trimmedEmail) {
        setEmailError('Email is required');
        return;
      }

      if (!validateEmail(trimmedEmail)) {
        setEmailError('Please enter a valid email address');
        return;
      }

      setEmailError('');
      setSubmitError(null);
      setState('loading');

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, name: trimmedName }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.error || 'Failed to join waitlist');
        }
        setState('success');
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        setState('form');
      }
    },
    [email, name]
  );

  const handleClose = useCallback(() => {
    setState('form');
    setName('');
    setEmail('');
    setEmailError('');
    setSubmitError(null);
    setFocusedInput(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [isOpen, handleClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-start pl-6 sm:pl-36 pt-0 pb-36 pointer-events-none"
          style={{ zIndex: 2147483647 }}
          >
          {/* Backdrop blur overlay - no close on click, only close button closes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
          />

          {/* Mac-style draggable window */}
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragElastic={0}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            whileDrag={{ cursor: 'grabbing' }}
            className="relative w-full max-w-md bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.12),0_24px_48px_rgba(0,0,0,0.08)] cursor-default pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mac title bar - draggable handle */}
            <div
              onPointerDown={(e) => { if ((e.target as HTMLElement).closest('button')) return; dragControls.start(e); }}
              style={{ touchAction: 'none' }}
              className="bg-gray-900 border-b border-gray-800 px-5 py-3.5 flex items-center gap-3 select-none cursor-grab active:cursor-grabbing"
            >
              <button
                type="button"
                onClick={handleClose}
                className="w-3.5 h-3.5 min-w-[14px] min-h-[14px] rounded-full bg-red-500 hover:bg-red-600 transition-colors active:scale-95 flex-shrink-0"
                title="Close"
                aria-label="Close"
              />
              <div className="flex-1 text-center">
                <span className="text-[13px] text-white font-medium">Get Early Access</span>
              </div>
            </div>

            <div className="p-8 sm:p-10 bg-slate-50/50 min-h-[240px]">
              <AnimatePresence mode="wait">
                {state === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-slate-600 text-[15px] leading-relaxed">
                      Be among the first to experience the future of productivity.
                    </p>

                    {submitError && (
                      <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {submitError}
                      </p>
                    )}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      {/* Name input - optional */}
                      <div>
                        <label
                          htmlFor="waitlist-name"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          Name 
                        </label>
                        <div
                          className={`relative flex items-center rounded-lg border transition-all duration-200 ${
                            focusedInput === 'name'
                              ? 'border-slate-400 bg-white ring-2 ring-slate-200/80'
                              : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'
                          }`}
                        >
                          <User
                            className={`absolute left-4 w-5 h-5 transition-colors duration-200 ${
                              focusedInput === 'name' ? 'text-slate-600' : 'text-slate-400'
                            }`}
                          />
                          <input
                            id="waitlist-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                            placeholder="Your name"
                            className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 text-[15px] focus:outline-none rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Email input - required */}
                      <div>
                        <label
                          htmlFor="waitlist-email"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          Email <span className="text-amber-600">*</span>
                        </label>
                        <div
                          className={`relative flex items-center rounded-lg border transition-all duration-200 ${
                            emailError
                              ? 'border-amber-400 bg-amber-50/50'
                              : focusedInput === 'email'
                                ? 'border-slate-400 bg-white ring-2 ring-slate-200/80'
                                : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'
                          }`}
                        >
                          <Mail
                            className={`absolute left-4 w-5 h-5 transition-colors duration-200 ${
                              emailError
                                ? 'text-amber-500'
                                : focusedInput === 'email'
                                  ? 'text-slate-600'
                                  : 'text-slate-400'
                            }`}
                          />
                          <input
                            id="waitlist-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError('');
                            }}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 text-[15px] focus:outline-none rounded-lg"
                          />
                        </div>
                        {emailError && (
                          <p className="mt-1.5 text-sm text-amber-600">{emailError}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-[15px] hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      >
                        Join Waitlist
                      </button>
                    </form>
                  </motion.div>
                )}

                {state === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        className="w-16 h-16 rounded-full border-[3px] border-slate-200 border-t-emerald-500 border-r-emerald-400/80"
                      />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="mt-7 text-slate-800 font-semibold"
                    >
                      Joining waitlist...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-1.5 text-sm text-slate-500"
                    >
                      Hang tight
                    </motion.p>
                  </motion.div>
                )}

                {state === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        damping: 14,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <Check
                          className="w-10 h-10 text-emerald-600"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                      className="mt-7 text-2xl font-semibold text-slate-900 text-center"
                    >
                      You&apos;re on the list.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, type: 'spring', damping: 20 }}
                      className="mt-2 text-slate-500 text-center text-[15px]"
                    >
                      We&apos;ll notify you soon.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, type: 'spring', damping: 20 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleClose}
                      className="mt-8 px-8 py-3 rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 shadow-sm"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (embedded && isOpen) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xl">
        <div className="bg-gray-900 border-b border-gray-800 px-5 py-3.5">
          <span className="text-[13px] text-white font-medium">Get Early Access</span>
        </div>
        <div className="p-8 sm:p-10 bg-slate-50/50 min-h-[240px]">
          <AnimatePresence mode="wait">
            {state === 'form' && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Be among the first to experience the future of productivity.
                </p>
                {submitError && (
                  <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{submitError}</p>
                )}
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="waitlist-name" className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <div className={`relative flex items-center rounded-lg border transition-all duration-200 ${focusedInput === 'name' ? 'border-slate-400 bg-white ring-2 ring-slate-200/80' : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'}`}>
                      <User className={`absolute left-4 w-5 h-5 ${focusedInput === 'name' ? 'text-slate-600' : 'text-slate-400'}`} />
                      <input id="waitlist-name" type="text" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)} placeholder="Your name" className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 text-[15px] focus:outline-none rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="waitlist-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-amber-600">*</span></label>
                    <div className={`relative flex items-center rounded-lg border transition-all duration-200 ${emailError ? 'border-amber-400 bg-amber-50/50' : focusedInput === 'email' ? 'border-slate-400 bg-white ring-2 ring-slate-200/80' : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'}`}>
                      <Mail className={`absolute left-4 w-5 h-5 ${emailError ? 'text-amber-500' : focusedInput === 'email' ? 'text-slate-600' : 'text-slate-400'}`} />
                      <input id="waitlist-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} placeholder="you@company.com" required className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 text-[15px] focus:outline-none rounded-lg" />
                    </div>
                    {emailError && <p className="mt-1.5 text-sm text-amber-600">{emailError}</p>}
                  </div>
                  <button type="submit" className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-[15px] hover:bg-blue-700 active:scale-[0.98] transition-all">
                    Join Waitlist
                  </button>
                </form>
              </motion.div>
            )}
            {state === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-full border-[3px] border-slate-200 border-t-emerald-500" />
                <p className="mt-7 text-slate-800 font-semibold">Joining waitlist...</p>
              </motion.div>
            )}
            {state === 'success' && (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
                  <Check className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
                </div>
                <p className="mt-7 text-2xl font-semibold text-slate-900">You&apos;re on the list.</p>
                <p className="mt-2 text-slate-500 text-[15px]">We&apos;ll notify you soon.</p>
                <a href="/" className="mt-8 px-8 py-3 rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                  Back to Home
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
