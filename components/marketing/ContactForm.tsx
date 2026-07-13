'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const inputClassName =
  'w-full rounded-md border border-mm-outline-variant bg-mm-surface-container-low px-4 py-3 text-base text-mm-on-background placeholder:text-mm-on-surface-variant focus:border-mm-primary focus:outline-none';

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearAttachment = useCallback(() => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError('Keep attachments under 5MB');
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Use PDF, Word, or an image (JPEG, PNG, GIF)');
      return;
    }
    setError(null);
    setAttachment(file);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);

      const trimmedEmail = email.trim();
      const trimmedQuery = query.trim();

      if (!trimmedEmail) {
        setError('Enter your email');
        return;
      }
      if (!validateEmail(trimmedEmail)) {
        setError('Enter a valid email address');
        return;
      }
      if (!trimmedQuery) {
        setError('Enter your message');
        return;
      }

      setIsSubmitting(true);
      try {
        const body = new FormData();
        body.append('email', trimmedEmail);
        body.append('query', trimmedQuery);
        if (attachment) body.append('attachment', attachment);

        const res = await fetch('/api/contact', {
          method: 'POST',
          body,
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const msg = data.details
            ? `${data.error}: ${data.details}`
            : data.error || 'Could not send. Try again in a moment.';
          throw new Error(msg);
        }

        setIsSuccess(true);
        setEmail('');
        setQuery('');
        clearAttachment();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [attachment, clearAttachment, email, query]
  );

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-mm-outline-variant bg-mm-surface-container p-6">
        <h3 className="font-display text-xl font-semibold text-mm-on-background">
          Message received.
        </h3>
        <p className="mt-2 text-sm text-mm-on-surface-variant">
          Thanks for writing. We&apos;ll reply soon.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error ? (
        <p className="rounded-md border border-mm-error/40 bg-mm-error-container/30 px-3 py-2 text-sm text-mm-on-error-container">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-mm-on-background">
          Work email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-query" className="mb-2 block text-sm font-medium text-mm-on-background">
          Message
        </label>
        <textarea
          id="contact-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask about demos, integrations, or enterprise."
          rows={5}
          className={`${inputClassName} min-h-[8rem] resize-y`}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-attachment" className="mb-2 block text-sm font-medium text-mm-on-background">
          Attachment <span className="font-normal text-mm-on-surface-variant">(optional)</span>
        </label>
        <input
          id="contact-attachment"
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-mm-on-surface-variant file:mr-4 file:rounded-md file:border-0 file:bg-mm-surface-container file:px-4 file:py-2 file:text-sm file:font-medium file:text-mm-on-background hover:file:bg-mm-surface-container-high"
        />
        {attachment ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-mm-on-surface-variant">
            <span className="truncate">{attachment.name}</span>
            <button
              type="button"
              onClick={clearAttachment}
              className="shrink-0 text-mm-primary hover:text-mm-primary-dim"
            >
              Remove
            </button>
          </p>
        ) : (
          <p className="mt-2 text-xs text-mm-on-surface-variant">PDF, Word, or images up to 5MB.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-mm-primary-fixed px-5 py-3 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-sm text-mm-on-surface-variant">
        We only use this to reply. See our{' '}
        <Link href="/privacy" className="font-medium text-mm-primary hover:text-mm-primary-dim">
          Privacy Policy
        </Link>
        . Prefer early access?{' '}
        <Link href="/#cta" className="font-medium text-mm-primary hover:text-mm-primary-dim">
          Join the waitlist →
        </Link>
      </p>
    </form>
  );
}
