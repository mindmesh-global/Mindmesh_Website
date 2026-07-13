'use client';

import {
  MarketingMascotAttachmentPanel,
  MarketingSensorCalcPanel,
} from '@/components/marketing/theater';
import {
  COMPANIONS_SCENE_FIXTURES_ACME,
  type CompanionsSceneFixture,
} from '@/lib/marketing-product-overview-data';

/** Final Sensor calc visual state (no scrub required). */
const SENSOR_FINAL = {
  queryCharIndex: COMPANIONS_SCENE_FIXTURES_ACME.sensor.query.length,
  resolveOpacity: 0,
  resultMotion: { opacity: 1, translateY: 0 },
  secondaryOpacity: 1,
} as const;

/** Final Mascot attachment visual state (no scrub / typing). */
const MASCOT_FINAL = {
  showUserAsk: true,
  userAskMotion: { opacity: 1, translateY: 0 },
  showTyping: false,
  replyVisibleCount: 2 as const,
  hitMotion: { opacity: 1, translateY: 0 },
  actionOpacity: 1,
};

export type CompanionsOverviewSceneProps = {
  scene?: CompanionsSceneFixture;
  /** Stagger Sensor panel during overview companions beat. */
  sensorVisible?: boolean;
  /** Stagger Mascot panel during overview companions beat. */
  mascotVisible?: boolean;
  className?: string;
};

/**
 * Sensor + Mascot companions overview scene (P11-T09).
 * Reuses Phase 10 marketing panels in their final states.
 * Local mascot still only; no live Lottie / Tauri / brain APIs.
 */
export function CompanionsOverviewScene({
  scene = COMPANIONS_SCENE_FIXTURES_ACME,
  sensorVisible = true,
  mascotVisible = true,
  className,
}: CompanionsOverviewSceneProps) {
  return (
    <div
      className={['space-y-4', className].filter(Boolean).join(' ')}
      data-overview-scene="companions"
      data-companions-sensor-visible={sensorVisible ? 'true' : 'false'}
      data-companions-mascot-visible={mascotVisible ? 'true' : 'false'}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <section
          className="rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4"
          data-overview-companion="sensor"
          style={{
            opacity: sensorVisible ? 1 : 0,
            transform: `translateY(${sensorVisible ? 0 : 8}px)`,
          }}
          aria-hidden={!sensorVisible}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-mm-primary">
                Sensor
              </p>
              <p className="mt-0.5 text-sm font-medium text-mm-on-surface">
                Instant answers at the edge of the desk
              </p>
            </div>
            <span className="rounded-md border border-mm-outline-variant/60 px-2 py-0.5 text-[10px] text-mm-on-surface-variant">
              Companion window
            </span>
          </div>
          <MarketingSensorCalcPanel
            queryCharIndex={SENSOR_FINAL.queryCharIndex}
            resolveOpacity={SENSOR_FINAL.resolveOpacity}
            resultMotion={SENSOR_FINAL.resultMotion}
            secondaryOpacity={SENSOR_FINAL.secondaryOpacity}
            query={scene.sensor.query}
            idleHint={scene.sensor.idleHint}
            resultAnswer={scene.sensor.result.answer}
            resultSubtitle={scene.sensor.result.subtitle}
            resultEyebrow={scene.sensor.result.eyebrow}
          />
        </section>

        <section
          className="rounded-xl border border-mm-outline-variant/60 bg-mm-surface-container p-4"
          data-overview-companion="mascot"
          style={{
            opacity: mascotVisible ? 1 : 0,
            transform: `translateY(${mascotVisible ? 0 : 8}px)`,
          }}
          aria-hidden={!mascotVisible}
        >
          <div className="mb-3 flex items-center gap-3">
            {/* Local still only (Approach A). Product Lottie stays off the marketing funnel. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scene.mascot.skinSrc}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-mm-outline-variant/60"
              data-mascot-still={scene.mascot.skinId}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-mm-primary">
                Mascot
              </p>
              <p className="mt-0.5 text-sm font-medium text-mm-on-surface">
                {scene.mascot.skinName}
              </p>
            </div>
            <span className="rounded-md border border-mm-outline-variant/60 px-2 py-0.5 text-[10px] text-mm-on-surface-variant">
              Companion window
            </span>
          </div>
          <MarketingMascotAttachmentPanel
            showUserAsk={MASCOT_FINAL.showUserAsk}
            userAskMotion={MASCOT_FINAL.userAskMotion}
            showTyping={MASCOT_FINAL.showTyping}
            replyVisibleCount={MASCOT_FINAL.replyVisibleCount}
            hitMotion={MASCOT_FINAL.hitMotion}
            actionOpacity={MASCOT_FINAL.actionOpacity}
            userAsk={scene.mascot.userAsk}
            replyLines={scene.mascot.replyLines}
            hitFilename={scene.mascot.hit.filename}
            hitFrom={scene.mascot.hit.from}
            hitDate={scene.mascot.hit.date}
            hitSource={scene.mascot.hit.source}
          />
        </section>
      </div>

      <p className="text-[11px] leading-relaxed text-mm-on-surface-variant">
        Sensor and Mascot are separate desktop companion surfaces, not dashboard
        tabs. Stills only on this page; animated characters play in the product.
      </p>
    </div>
  );
}
