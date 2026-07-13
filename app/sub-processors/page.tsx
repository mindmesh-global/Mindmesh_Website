import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { marketingSubProcessorsContent } from '@/lib/marketing-sub-processors';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const { metadata: pageMeta, hero, intro, connectedServicesNote, privacyHref, privacyLinkLabel, contact, processors, lastUpdated } =
  marketingSubProcessorsContent;

export const metadata: Metadata = {
  title: pageMeta.title,
  description: pageMeta.description,
  openGraph: {
    title: pageMeta.ogTitle,
    description: pageMeta.description,
    url: pageMeta.ogUrl,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMeta.ogTitle,
    description: pageMeta.description,
    images: [OG_IMAGE_URL],
  },
};

export default function SubProcessorsPage() {
  return (
    <MarketingDepthLayout
      eyebrow={hero.eyebrow}
      title={hero.title}
      subtitle={hero.subtitle}
      backHref={hero.backHref}
      backLabel={hero.backLabel}
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 px-6">
          <p className="text-sm leading-relaxed text-mm-on-surface-variant md:text-base">
            {intro}
          </p>
          <p className="text-xs text-mm-on-surface-variant/80">Last updated: {lastUpdated}</p>

          <div className="overflow-x-auto rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm md:text-base">
              <caption className="sr-only">MindMesh sub-processors</caption>
              <thead>
                <tr className="border-b border-mm-outline-variant/60">
                  <th
                    scope="col"
                    className="px-4 py-3 font-display text-sm font-semibold tracking-tight text-mm-on-background md:px-5"
                  >
                    Sub-processor
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-display text-sm font-semibold tracking-tight text-mm-on-background md:px-5"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-display text-sm font-semibold tracking-tight text-mm-on-background md:px-5"
                  >
                    Privacy
                  </th>
                </tr>
              </thead>
              <tbody>
                {processors.map((processor) => (
                  <tr
                    key={processor.name}
                    className="border-b border-mm-outline-variant/40 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 align-top font-medium text-mm-on-background md:px-5"
                    >
                      {processor.name}
                    </th>
                    <td className="px-4 py-4 align-top text-mm-on-surface-variant md:px-5">
                      {processor.purpose}
                    </td>
                    <td className="px-4 py-4 align-top md:px-5">
                      <a
                        href={processor.privacyUrl}
                        className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {processor.privacyLabel}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold tracking-tight text-mm-on-background md:text-xl">
              Connected services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant md:text-base">
              {connectedServicesNote}{' '}
              <Link
                href={privacyHref}
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                {privacyLinkLabel}
              </Link>
            </p>
          </div>

          <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold tracking-tight text-mm-on-background md:text-xl">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant md:text-base">
              {contact.leadIn}{' '}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                {contact.email}
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mm-on-surface-variant md:text-base">
              Related:{' '}
              <Link
                href="/privacy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Privacy Policy
              </Link>
              {' · '}
              <Link
                href="/privacy#gdpr"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                GDPR rights
              </Link>
              {' · '}
              <Link
                href="/security"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Security
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
