'use client';

import Image from 'next/image';
import type { SignalChipFixture } from '@/lib/marketing-demo-data';

const SOURCE_ICONS: Record<SignalChipFixture['source'], string> = {
  Slack: '/images/icons/slack.png',
  Jira: '/images/icons/jira.png',
};

export type SignalChipMotion = {
  opacity: number;
  translateY: number;
};

export type MarketingSignalChipsProps = {
  chips?: readonly SignalChipFixture[];
  /** 0–1 opacity for scroll-driven fade-in (P4-T06). Ignored when chipMotions is set. */
  opacity?: number;
  /** Per-chip stagger (opacity + translateY), keyed to the chips array order. */
  chipMotions?: readonly SignalChipMotion[];
  highlightIds?: readonly string[];
  className?: string;
};

/**
 * Toast-style Slack/Jira signal overlays for Focus theater (P4-T04).
 */
export function MarketingSignalChips({
  chips = [],
  opacity = 1,
  chipMotions,
  highlightIds = [],
  className,
}: MarketingSignalChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`} data-marketing-signal-chips>
      {chips.map((chip, index) => {
        const highlighted = highlightIds.includes(chip.id);
        const motion = chipMotions?.[index];
        return (
          <div
            key={chip.id}
            data-signal-chip-id={chip.id}
            data-signal-highlight={highlighted ? 'true' : 'false'}
            className={`flex items-center gap-2.5 rounded-lg border bg-mm-surface-container-highest px-3 py-2 shadow-lg ${
              highlighted
                ? 'border-mm-primary/60 ring-1 ring-mm-primary/40'
                : 'border-mm-outline-variant/60'
            }`}
            style={{
              opacity: motion ? motion.opacity : opacity,
              transform: `translateY(${motion ? motion.translateY : 0}px)`,
              willChange: motion ? 'transform, opacity' : undefined,
            }}
          >
            <Image
              src={SOURCE_ICONS[chip.source]}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 object-contain"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-mm-on-background">{chip.label}</p>
              <p className="truncate text-[11px] text-mm-on-surface-variant">{chip.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
