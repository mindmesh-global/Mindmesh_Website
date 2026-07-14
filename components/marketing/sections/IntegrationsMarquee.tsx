'use client';

import Image from 'next/image';
import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';

type IntegrationsMarqueeProps = {
  className?: string;
};

function IntegrationMark({
  displayName,
  iconSrc,
}: {
  displayName: string;
  iconSrc: string;
}) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-6 md:px-8">
      <Image
        src={iconSrc}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
        aria-hidden
      />
      <span className="whitespace-nowrap text-base font-medium tracking-tight text-mm-on-surface-variant md:text-lg">
        {displayName}
      </span>
    </li>
  );
}

/**
 * Linear-style integrations strip: muted marks in an infinite horizontal
 * marquee. Duplicated track for a seamless loop; static + scrollable under
 * prefers-reduced-motion.
 */
export function IntegrationsMarquee({ className }: IntegrationsMarqueeProps) {
  const track = (
    <ul className="flex items-center">
      {MARKETING_INTEGRATIONS.map((app) => (
        <IntegrationMark
          key={app.id}
          displayName={app.displayName}
          iconSrc={app.iconSrc}
        />
      ))}
    </ul>
  );

  return (
    <div
      data-integrations-marquee=""
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      role="region"
      aria-label="Connected apps"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-mm-background to-transparent md:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-mm-background to-transparent md:w-16"
        aria-hidden
      />

      <div
        data-integrations-marquee-track=""
        className="flex w-max items-center"
      >
        {track}
        <ul className="flex items-center" aria-hidden>
          {MARKETING_INTEGRATIONS.map((app) => (
            <IntegrationMark
              key={`dup-${app.id}`}
              displayName={app.displayName}
              iconSrc={app.iconSrc}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
