import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { PRODUCT_OVERVIEW_SECTION } from '@/lib/marketing-product-overview-data';
import { ProductOverviewInteractive } from './ProductOverviewInteractive';
import { ProductOverviewPageStage } from './ProductOverviewPageStage';

const primaryButtonClassName =
  'inline-flex items-center justify-center rounded-md bg-mm-primary-fixed px-6 py-3 text-base font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim';

const ghostButtonClassName =
  'inline-flex items-center justify-center rounded-md border border-mm-outline-variant px-6 py-3 text-base font-medium text-mm-on-background transition-colors hover:border-mm-outline';

/**
 * Homepage product overview (P11-T11 / P12 first-viewport composition).
 * App frame + CTAs only; problem narrative follows immediately below.
 */
export function ProductOverviewHome() {
  const section = PRODUCT_OVERVIEW_SECTION;

  return (
    <section
      id={section.id}
      className="relative isolate overflow-x-clip bg-mm-background pb-10 pt-4 lg:pb-14 lg:pt-6"
    >
      <ProductOverviewPageStage />

      <div className="mm-content relative z-[1]">
        <ProductOverviewInteractive />

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="#cta" className={primaryButtonClassName}>
            Join the waitlist
          </Link>
          <Link href="#connect" className={ghostButtonClassName}>
            See how it works
          </Link>
        </div>

        <MarketingSectionDivider data-overview-stage-end="" />
      </div>
    </section>
  );
}
