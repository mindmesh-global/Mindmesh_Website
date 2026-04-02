'use client';

import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

const CONTACT_EMAIL = 'team@mindmesh.global';

export default function FooterContactPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm transition-colors hover:text-white sm:text-base"
        style={{ color: '#a1a1aa' }}
      >
        Contact
      </button>
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 2147483647 }}
          >
            <button
              type="button"
              className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close contact dialog"
              onClick={() => setOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl"
              style={{ backgroundColor: 'rgba(4, 13, 46, 0.98)' }}
            >
              <h2 id={titleId} className="mb-1 text-sm font-semibold text-blue-200">
                Contact
              </h2>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                Reach us by email:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="break-all text-base font-medium text-white underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-[rgba(4,13,46,1)]"
                autoFocus
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
