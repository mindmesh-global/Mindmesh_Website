import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'Terms of Service for MindMesh, the cognitive orchestration layer for modern work.';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Terms of Service',
    description: pageDescription,
    url: 'https://mindmesh.global/terms',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Terms of Service',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

function TermsSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-lg border border-mm-outline-variant/60 bg-mm-surface-container p-5 md:p-6"
    >
      <h2 className="font-display text-lg font-semibold tracking-tight text-mm-on-background md:text-xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-mm-on-surface-variant md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Rules and responsibilities for using MindMesh and connected services."
      backHref="/privacy"
      backLabel="See privacy policy →"
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4 px-6">
          <TermsSection title="1. Agreement to Terms">
            <p>
              By accessing or using MindMesh, you agree to be bound by these Terms of Service. If
              you disagree with any part of these Terms, you may not access or use the Service.
            </p>
          </TermsSection>

          <TermsSection title="2. Description of Service">
            <p>
              MindMesh is a cognitive OS layer and productivity assistant that integrates with your
              email and calendar services, processes your communications using AI, and provides
              semantic search capabilities. Data is stored locally on your device with cloud backup
              for authentication.
            </p>
          </TermsSection>

          <TermsSection title="3. Eligibility">
            <p>
              You must be at least 13 years old to use the Service. By using the Service, you
              represent that you are of legal age to form a binding contract and that your use will
              not violate any applicable law.
            </p>
          </TermsSection>

          <TermsSection title="4. User Accounts">
            <p>
              You are responsible for maintaining the security of your account and password. You
              agree to provide accurate information during registration and to accept responsibility
              for all activities under your account.
            </p>
          </TermsSection>

          <TermsSection title="5. Third-Party Services">
            <p>
              When you connect third-party services (Google, Microsoft), you grant us permission to
              access your data. You agree to comply with their respective terms of service. You can
              revoke access at any time through your account settings.
            </p>
          </TermsSection>

          <TermsSection title="6. Acceptable Use">
            <p>
              You agree not to use the Service to violate any laws, infringe upon rights, harass
              others, transmit malware, interfere with the Service, attempt unauthorized access,
              reverse engineer, or engage in any abusive behavior.
            </p>
          </TermsSection>

          <TermsSection title="7. Intellectual Property">
            <p>
              The Service and its content are owned by MindMesh and protected by intellectual
              property laws. You retain ownership of your content but grant us a license to access,
              process, and store it as necessary to provide the Service, including sharing with
              third-party AI services.
            </p>
          </TermsSection>

          <TermsSection title="8. Privacy">
            <p>
              Your use of the Service is also governed by our Privacy Policy. Please review it to
              understand how we collect, use, and protect your information.
            </p>
            <p>
              <Link
                href="/privacy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Privacy policy →
              </Link>
            </p>
          </TermsSection>

          <TermsSection title="9. AI Processing">
            <p>
              The Service uses AI to analyze your content. AI-generated insights may not always be
              accurate, and the Service is not a substitute for your own judgment. We are not
              responsible for decisions made based on AI-generated content.
            </p>
          </TermsSection>

          <TermsSection title="10. Service Availability">
            <p>
              We strive to provide reliable service but do not guarantee availability at all times.
              We reserve the right to modify, suspend, or discontinue the Service at any time with
              or without notice.
            </p>
          </TermsSection>

          <TermsSection title="11. Fees and Payment">
            <p>
              Certain features may require payment. Subscription fees are billed in advance and are
              non-refundable unless required by law. You may cancel your subscription at any time
              through your account settings. We reserve the right to change pricing with advance
              notice.
            </p>
          </TermsSection>

          <TermsSection title="12. Termination">
            <p>
              You may terminate your account at any time by deleting it through the Service settings
              or uninstalling the application. We may terminate or suspend your account immediately
              for conduct that violates these Terms or is harmful to others.
            </p>
          </TermsSection>

          <TermsSection title="13. Disclaimers">
            <p className="font-medium uppercase tracking-wide text-mm-on-background">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
              WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              SECURE, OR ERROR-FREE.
            </p>
          </TermsSection>

          <TermsSection title="14. Limitation of Liability">
            <p className="font-medium uppercase tracking-wide text-mm-on-background">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS
              PRIOR TO THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>
          </TermsSection>

          <TermsSection title="15. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material
              changes by posting the new Terms on this page. Your continued use of the Service after
              changes constitutes acceptance of the changes.
            </p>
          </TermsSection>

          <TermsSection title="16. Contact Us">
            <p>If you have questions about these Terms, please contact us at:</p>
            <p>
              <strong className="text-mm-on-background">Email:</strong>{' '}
              <a
                href="mailto:team@mindmesh.global"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                team@mindmesh.global
              </a>
            </p>
            <p>
              <Link
                href="/contact"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Contact form →
              </Link>
            </p>
          </TermsSection>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
