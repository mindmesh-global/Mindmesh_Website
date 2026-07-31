import Link from 'next/link';
import { MarketingSectionDivider } from '@/components/marketing/MarketingSectionDivider';
import { PartnerTrustBadges } from '@/components/marketing/PartnerTrustBadges';
import { marketingTrustContent } from '@/lib/marketing-trust-content';

/**
 * Trust / social proof. Heading sits close to the divider above; body blocks
 * space evenly below (same rhythm as How it works).
 */
export function TrustSection() {
  return (
    <section
      id="trust"
      className="bg-mm-background pb-24 pt-10 lg:pb-28 lg:pt-12"
      aria-labelledby="trust-heading"
    >
      <div className="mm-content flex flex-col gap-14 md:gap-16 lg:gap-20">
        <h2
          id="trust-heading"
          className="w-full font-display text-2xl font-semibold leading-[1.35] tracking-[-0.01em] text-mm-on-background md:text-3xl lg:text-[2.5rem] lg:leading-[1.3]"
        >
          <span className="text-mm-on-background">{marketingTrustContent.headline}</span>{' '}
          <span className="text-mm-on-surface-variant">{marketingTrustContent.subhead}</span>
        </h2>

        <PartnerTrustBadges />

        <div className="max-w-[720px] space-y-6">
          <p className="text-base leading-relaxed text-mm-on-background md:text-lg">
            {marketingTrustContent.securityLine}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {marketingTrustContent.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-mm-primary hover:text-mm-primary-dim"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <MarketingSectionDivider />
      </div>
    </section>
  );
}
