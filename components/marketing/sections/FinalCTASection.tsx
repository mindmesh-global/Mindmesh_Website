'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { DownloadModal } from '@/components/marketing/DownloadModal';

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

      {open && <DownloadModal onClose={() => setOpen(false)} source="cta" />}
    </>
  );
}
