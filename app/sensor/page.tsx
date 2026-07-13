import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { ProductTheaterSensor } from '@/components/marketing/sections/ProductTheaterSensor';
import { ProductTheaterSensorCalc } from '@/components/marketing/sections/ProductTheaterSensorCalc';
import {
  SENSOR_MASCOT_COMPARISON,
  SENSOR_MASCOT_CTA,
  SENSOR_MASCOT_PRIVACY,
  SENSOR_PAGE_CONTENT,
} from '@/lib/marketing-sensor-mascot-content';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const { metadata: pageMeta, hero, howItWorks, capabilities } = SENSOR_PAGE_CONTENT;

export const metadata: Metadata = {
  title: pageMeta.title,
  description: pageMeta.description,
  openGraph: {
    title: pageMeta.ogTitle,
    description: pageMeta.description,
    url: 'https://mindmesh.global/sensor',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.ogTitle,
    description: pageMeta.description,
    images: [OG_IMAGE_URL],
  },
};

export default function SensorPage() {
  return (
    <MarketingDepthLayout
      eyebrow={hero.eyebrow}
      title={hero.title}
      subtitle={hero.subtitle}
      backHref={hero.backHref}
      backLabel={hero.backLabel}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            {howItWorks.title}
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorks.steps.map((step) => (
              <li key={step.number} className="min-w-0">
                <p className="font-display text-sm font-semibold tabular-nums text-mm-on-surface-variant">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-mm-on-background">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProductTheaterSensor />

      <ProductTheaterSensorCalc />

      <section className="border-y border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mm-content">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            {capabilities.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilities.items.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6"
              >
                <h3 className="font-display text-lg font-semibold text-mm-on-background">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mm-on-surface-variant">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content">
          <p className="text-sm font-medium text-mm-on-surface-variant">
            {SENSOR_MASCOT_COMPARISON.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            {SENSOR_MASCOT_COMPARISON.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-base text-mm-on-surface-variant lg:text-lg">
            {SENSOR_MASCOT_COMPARISON.relationshipLine}
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-mm-outline-variant/60">
                  <th className="py-3 pr-4 font-medium text-mm-on-surface-variant" scope="col">
                    <span className="sr-only">Dimension</span>
                  </th>
                  <th className="py-3 px-4 font-semibold text-mm-on-background" scope="col">
                    Sensor
                  </th>
                  <th className="py-3 pl-4 font-semibold text-mm-on-background" scope="col">
                    Mascot
                  </th>
                </tr>
              </thead>
              <tbody>
                {SENSOR_MASCOT_COMPARISON.rows.map((row) => (
                  <tr key={row.label} className="border-b border-mm-outline-variant/40">
                    <th
                      className="py-3 pr-4 font-medium text-mm-on-surface-variant"
                      scope="row"
                    >
                      {row.label}
                    </th>
                    <td className="py-3 px-4 text-mm-on-background">{row.sensor}</td>
                    <td className="py-3 pl-4 text-mm-on-background">{row.mascot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8">
            <Link
              href={SENSOR_MASCOT_COMPARISON.sensorSiblingCta.href}
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              {SENSOR_MASCOT_COMPARISON.sensorSiblingCta.label}
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mm-outline-variant/40 bg-mm-surface-container-low py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <p className="text-base text-mm-on-surface-variant lg:text-lg">
            {SENSOR_MASCOT_PRIVACY.line}
          </p>
          <p className="mt-8">
            <Link
              href={SENSOR_MASCOT_PRIVACY.link.href}
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              {SENSOR_MASCOT_PRIVACY.link.label}
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[640px] px-6 text-center">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
            {SENSOR_MASCOT_CTA.headline}
          </h2>
          <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
            {SENSOR_MASCOT_CTA.body}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={SENSOR_MASCOT_CTA.primary.href}
              className="inline-flex rounded-md bg-mm-primary-fixed px-5 py-2.5 text-sm font-semibold text-mm-on-primary-fixed transition-colors hover:bg-mm-primary-fixed-dim"
            >
              {SENSOR_MASCOT_CTA.primary.label}
            </Link>
            <Link
              href={SENSOR_MASCOT_COMPARISON.sensorSiblingCta.href}
              className="text-sm font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
            >
              {SENSOR_MASCOT_COMPARISON.sensorSiblingCta.label}
            </Link>
          </div>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
