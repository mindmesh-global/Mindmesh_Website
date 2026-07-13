'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import {
  MASCOT_ICON_SHOWCASE_SECTION,
  MASCOT_ICON_SKIN_DEFAULT_ID,
  MASCOT_ICON_SKINS,
  type MascotIconSkin,
} from '@/lib/marketing-sensor-mascot-content';

function skinById(id: string): MascotIconSkin {
  return MASCOT_ICON_SKINS.find((skin) => skin.id === id) ?? MASCOT_ICON_SKINS[0];
}

/**
 * Product companion showcase on `/mascot` (P10-T08 Approach A).
 * Local stills only; no DotLottie / remote lottie.host on the marketing funnel.
 */
export function MascotIconShowcase() {
  const section = MASCOT_ICON_SHOWCASE_SECTION;
  const [selectedId, setSelectedId] = useState(MASCOT_ICON_SKIN_DEFAULT_ID);
  const selected = skinById(selectedId);

  return (
    <MarketingSection
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div
        className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-start"
        data-mascot-icon-showcase
        data-mascot-icon-approach="A"
      >
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-mm-outline-variant/60 bg-[#0a0a0b] px-8 py-12"
          data-mascot-icon-preview
          data-mascot-icon-selected={selected.id}
        >
          <div className="relative h-48 w-48 sm:h-56 sm:w-56">
            <Image
              key={selected.id}
              src={selected.src}
              alt=""
              width={selected.width}
              height={selected.height}
              className="h-full w-full object-contain"
              sizes="224px"
              priority={false}
            />
          </div>
          <p className="mt-6 font-display text-lg font-semibold text-white">{selected.name}</p>
          <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-zinc-400">
            {selected.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-mm-on-surface-variant">Available companions</p>
          <ul
            className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            role="list"
          >
            {MASCOT_ICON_SKINS.map((skin) => {
              const isSelected = skin.id === selected.id;
              return (
                <li key={skin.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`Show ${skin.name}`}
                    onClick={() => setSelectedId(skin.id)}
                    className={`flex w-full flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors ${
                      isSelected
                        ? 'border-mm-primary bg-mm-primary-container/40'
                        : 'border-mm-outline-variant/60 bg-mm-surface-container hover:border-mm-primary/50'
                    }`}
                    data-mascot-icon-option={skin.id}
                  >
                    <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#0a0a0b]">
                      <Image
                        src={skin.src}
                        alt=""
                        width={64}
                        height={64}
                        className="h-14 w-14 object-contain"
                        sizes="64px"
                      />
                    </span>
                    <span className="font-display text-sm font-semibold text-mm-on-background">
                      {skin.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-mm-on-surface-variant">
            {section.note}
          </p>
        </div>
      </div>
    </MarketingSection>
  );
}
