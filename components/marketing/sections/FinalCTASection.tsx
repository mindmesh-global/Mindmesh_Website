'use client';

import { useEffect, useState } from 'react';
import { Apple, Download, Monitor, X } from 'lucide-react';

type OS = 'mac' | 'windows' | 'other';

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('win')) return 'windows';
  return 'other';
}

function DownloadModal({ onClose }: { onClose: () => void }) {
  const [os, setOS] = useState<OS>('other');

  useEffect(() => {
    setOS(detectOS());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const options = [
    {
      key: 'mac' as OS,
      label: 'macOS',
      sub: 'macOS 12+',
      icon: <Apple className="h-6 w-6 shrink-0" aria-hidden />,
      href: '/downloads/MindMesh-mac.dmg',
    },
    {
      key: 'windows' as OS,
      label: 'Windows',
      sub: 'Windows 10/11',
      icon: <Monitor className="h-6 w-6 shrink-0" aria-hidden />,
      href: '/downloads/MindMesh-windows.exe',
    },
  ];

  const sorted = os === 'windows' ? [...options].reverse() : options;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-mm-outline-variant/60 bg-mm-surface-container p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-mm-on-surface-variant hover:text-mm-on-background"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-display text-lg font-semibold text-mm-on-background">
          Download MindMesh
        </h3>
        <p className="mt-1 text-sm text-mm-on-surface-variant">
          Choose your platform to get started.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {sorted.map(({ key, label, sub, icon, href }) => {
            const isPrimary = key === os || (os === 'other' && key === 'mac');
            return (
              <a
                key={key}
                href={href}
                download
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 font-semibold transition-colors ${
                  isPrimary
                    ? 'bg-mm-primary-fixed text-mm-on-primary-fixed hover:bg-mm-primary-fixed-dim'
                    : 'border border-mm-outline-variant/60 bg-mm-surface-container-high text-mm-on-background hover:bg-mm-surface-container-high/80'
                }`}
              >
                {icon}
                <span className="flex-1">
                  <span className="block">{label}</span>
                  <span className="block text-xs font-normal opacity-70">{sub}</span>
                </span>
                {isPrimary && key === os && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                    Your OS
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FinalCTASection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="cta"
        className="bg-mm-background pb-24 pt-10 lg:pb-32 lg:pt-12"
        aria-labelledby="cta-heading"
      >
        <div className="mm-content flex flex-col items-center gap-8 text-center">
          <h2
            id="cta-heading"
            className="font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
          >
            Connect your apps. See what needs attention.{' '}
            <span className="text-mm-on-surface-variant">
              Act with clarity.
            </span>
          </h2>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-mm-primary-fixed px-8 py-4 text-base font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
          >
            <Download className="h-5 w-5 shrink-0" aria-hidden />
            Download MindMesh
          </button>
        </div>
      </section>

      {open && <DownloadModal onClose={() => setOpen(false)} />}
    </>
  );
}
