'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { DownloadModal } from '@/components/marketing/DownloadModal';
import { PRODUCT_OVERVIEW_SECTION } from '@/lib/marketing-product-overview-data';
import { ProductOverviewInteractive } from './ProductOverviewInteractive';
import { ProductOverviewPageStage } from './ProductOverviewPageStage';

const primaryButtonClassName =
  'inline-flex items-center gap-2 justify-center rounded-md bg-mm-primary-fixed px-6 py-3 text-base font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim';

const ghostButtonClassName =
  'inline-flex items-center justify-center rounded-md border border-mm-outline-variant px-6 py-3 text-base font-medium text-mm-on-background transition-colors hover:border-mm-outline';

export function ProductOverviewHome() {
  const section = PRODUCT_OVERVIEW_SECTION;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id={section.id}
        className="relative isolate overflow-x-clip bg-mm-background pb-10 pt-4 lg:pb-14 lg:pt-6"
      >
        <ProductOverviewPageStage />

        <div className="mm-content relative z-[1]">
          <ProductOverviewInteractive />

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={primaryButtonClassName}
            >
              <Download className="h-4 w-4" aria-hidden />
              Download MindMesh
            </button>
            <Link href="#connect" className={ghostButtonClassName}>
              See how it works
            </Link>
          </div>

          <MarketingSectionDivider data-overview-stage-end="" />
        </div>
      </section>

      {modalOpen && <DownloadModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
