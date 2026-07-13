'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';

type FormState = 'form' | 'loading' | 'success';

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const inputClassName =
  'w-full rounded-md border border-mm-outline-variant bg-mm-surface-container-low px-4 py-3 text-base text-mm-on-background placeholder:text-mm-on-surface-variant focus:border-mm-primary focus:outline-none';

export function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'windows' | 'macos' | ''>('');
  const [emailError, setEmailError] = useState('');
  const [platformError, setPlatformError] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>('form');

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const trimmedEmail = email.trim();
      const trimmedName = name.trim();

      if (!trimmedEmail) {
        setEmailError('Enter your email');
        return;
      }

      if (!validateEmail(trimmedEmail)) {
        setEmailError('Enter a valid email address');
        return;
      }

      if (!platform) {
        setPlatformError('Select Windows or macOS');
        return;
      }

      setEmailError('');
      setPlatformError('');
      setSubmitError(null);
      setState('loading');

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmedEmail,
            name: trimmedName,
            platform,
          }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.error || 'Could not join the waitlist');
        }

        setState('success');
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : 'Something went wrong. Try again in a moment.'
        );
        setState('form');
      }
    },
    [email, name, platform]
  );

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-mm-outline-variant bg-mm-surface-container p-6">
        <h3 className="font-display text-xl font-semibold text-mm-on-background">
          You&apos;re on the early access list.
        </h3>
        <p className="mt-2 text-base text-mm-on-surface-variant">
          We&apos;ll email you when MindMesh opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="cta-name" className="sr-only">
          Name (optional)
        </label>
        <input
          id="cta-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Name (optional)"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClassName}
          disabled={state === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="cta-email" className="sr-only">
          Work email
        </label>
        <input
          id="cta-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (emailError) setEmailError('');
          }}
          className={inputClassName}
          disabled={state === 'loading'}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'cta-email-error' : undefined}
        />
        {emailError ? (
          <p id="cta-email-error" className="mt-2 text-sm text-mm-error">
            {emailError}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="cta-platform" className="sr-only">
          Preferred platform
        </label>
        <select
          id="cta-platform"
          name="platform"
          value={platform}
          onChange={(event) => {
            setPlatform(event.target.value as 'windows' | 'macos' | '');
            if (platformError) setPlatformError('');
          }}
          className={inputClassName}
          disabled={state === 'loading'}
          aria-invalid={platformError ? true : undefined}
          aria-describedby={platformError ? 'cta-platform-error' : undefined}
        >
          <option value="">Preferred platform</option>
          <option value="windows">Windows</option>
          <option value="macos">macOS</option>
        </select>
        {platformError ? (
          <p id="cta-platform-error" className="mt-2 text-sm text-mm-error">
            {platformError}
          </p>
        ) : null}
      </div>

      {submitError ? <p className="text-sm text-mm-error">{submitError}</p> : null}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-md bg-mm-primary-fixed px-6 py-3 text-base font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim disabled:opacity-60"
      >
        {state === 'loading' ? 'Joining…' : 'Join waitlist'}
      </button>

      <p className="text-sm text-mm-on-surface-variant">
        Early access updates only. See our{' '}
        <Link href="/privacy" className="text-mm-primary hover:text-mm-primary-dim">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
