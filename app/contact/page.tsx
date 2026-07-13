import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/marketing/ContactForm';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'Contact the MindMesh team for support, demos, enterprise plans, or integration questions.';

export const metadata: Metadata = {
  title: 'Contact',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Contact',
    description: pageDescription,
    url: 'https://mindmesh.global/contact',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Contact',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

export default function ContactPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Contact"
      title="Get in touch"
      subtitle="Questions about MindMesh, demos, or enterprise? Send a note and we will reply soon."
      backHref="/"
      backLabel="Back to homepage →"
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mm-content grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-mm-on-background md:text-[2rem]">
              We are here to help.
            </h2>
            <p className="mt-4 text-base text-mm-on-surface-variant lg:text-lg">
              Product questions, partnerships, or support. For privacy and security detail, use the
              links below.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-mm-on-surface-variant">
              <li>
                <Link
                  href="/security"
                  className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  Learn about security →
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  Privacy policy →
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                >
                  FAQ →
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
