import Image from 'next/image';
import {
  marketingTrustContent,
  type MarketingPartnerBadge,
} from '@/lib/marketing-trust-content';

type PartnerTrustBadgesProps = {
  className?: string;
};

/**
 * Partner / infrastructure badges for `#trust` and `/trust`.
 * Same card chrome + phone snap-scroll peek as ProblemSection FIG cards.
 * Microsoft Partner badge is omitted until an official Logo Builder asset lands.
 */
export function PartnerTrustBadges({ className = '' }: PartnerTrustBadgesProps) {
  const partners = marketingTrustContent.partners;

  return (
    <div className={`-mr-[var(--mm-layout-gutter,1.5rem)] md:mr-0 ${className}`.trim()}>
      <div
        className={[
          'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'md:mx-auto md:grid md:max-w-4xl md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0',
        ].join(' ')}
      >
        {partners.map((partner) => (
          <article
            key={partner.id}
            className={[
              'flex w-[min(78vw,20.5rem)] shrink-0 snap-start flex-col text-center',
              'rounded-2xl border border-mm-outline-variant/50 bg-mm-surface-container/40 p-6',
              'md:w-auto md:shrink',
            ].join(' ')}
          >
            <div className="flex min-h-16 items-center justify-center md:min-h-[5.5rem]">
              <PartnerBadgeLink partner={partner} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-mm-on-background md:text-xl">
              {partner.caption}
            </h3>
            {partner.supportingLine ? (
              <p className="mt-3 text-xs leading-relaxed text-mm-on-surface-variant">
                {partner.supportingLine}
              </p>
            ) : null}
          </article>
        ))}
        {/* Trailing spacer so the last card can scroll clear of the right edge. */}
        <div
          className="w-[var(--mm-layout-gutter,1.5rem)] shrink-0 md:hidden"
          aria-hidden
        />
      </div>
    </div>
  );
}

function PartnerBadgeLink({ partner }: { partner: MarketingPartnerBadge }) {
  return (
    <a
      href={partner.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center transition-opacity hover:opacity-90"
    >
      <Image
        src={partner.badgeSrc}
        alt={partner.badgeAlt}
        width={partner.width}
        height={partner.height}
        className={partner.imageClassName}
        unoptimized
      />
    </a>
  );
}
