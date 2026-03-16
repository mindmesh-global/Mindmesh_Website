'use client';

import { useRef, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DragControls = ReturnType<typeof import('framer-motion').useDragControls>;

interface ContactWindowProps {
  dragControls?: DragControls;
  onClose?: () => void;
  onMinimize?: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function ContactWindow({ dragControls, onClose, onMinimize }: ContactWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    query: '',
    attachment: null as File | null,
  });

  const handleClose = () => onClose?.();

  const handleFullscreen = async () => {
    if (!windowRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await windowRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Allowed: PDF, Word, images (JPEG, PNG, GIF)');
      return;
    }
    setError(null);
    setFormData((prev) => ({ ...prev, attachment: file }));
  };

  const removeAttachment = () => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.query.trim()) {
      setError('Please enter your query');
      return;
    }

    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.append('email', formData.email.trim());
      body.append('query', formData.query.trim());
      if (formData.attachment) {
        body.append('attachment', formData.attachment);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data.details ? `${data.error}: ${data.details}` : (data.error || 'Failed to send. Please try again.');
        throw new Error(msg);
      }

      setIsSuccess(true);
      setFormData({ email: '', query: '', attachment: null });
      removeAttachment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col">
      <div
        ref={windowRef}
        className={`w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none max-w-none h-screen' : 'max-w-[600px] min-h-0 flex-1'
        }`}
      >
        {/* Title bar */}
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
              aria-label="Close"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors active:scale-90"
              title="Minimize"
              aria-label="Minimize"
            />
            <button
              onClick={handleFullscreen}
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors active:scale-90"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            />
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-medium">Contact Us</span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 min-h-0 overflow-y-auto bg-gray-50 flex items-start justify-center px-4 py-10 ${isFullscreen ? 'h-[calc(100vh-3rem)]' : ''}`}>
          <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-10">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-green-200 bg-green-50 p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
                  <p className="mt-2 text-sm text-green-700">
                    We&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 text-sm font-medium text-green-600 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                >
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-100">
                      <span className="text-purple-600 text-xl">✉</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Get in Touch
                    </h1>
                    <p className="text-sm text-gray-400">
                      Drop us a line — we&apos;ll respond soon
                    </p>
                  </div>

                  <div className="border-t border-gray-100 mb-8" />

                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-400 mb-6">
                      {error}
                    </div>
                  )}

                  <div className="mb-6">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all duration-200 ${error ? 'border-red-300' : 'border-gray-200'}`}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="contact-query" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Query / Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-query"
                      value={formData.query}
                      onChange={(e) => setFormData((prev) => ({ ...prev, query: e.target.value }))}
                      placeholder="How can we help?"
                      rows={5}
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none h-32 ${error ? 'border-red-300' : 'border-gray-200'}`}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Attachment
                      <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">
                        (optional)
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="contact-attachment"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,image/jpeg,image/png,image/gif"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="contact-attachment"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                      >
                        📎 Choose file
                      </label>
                      {formData.attachment && (
                        <span className="flex items-center gap-1 text-sm text-gray-600 truncate max-w-[180px]">
                          {formData.attachment.name}
                          <button
                            type="button"
                            onClick={removeAttachment}
                            className="text-red-500 hover:text-red-600"
                            aria-label="Remove file"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      PDF, Word, or images. Max 5MB.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-purple-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <span>✈</span>
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
