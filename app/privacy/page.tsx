import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { MarketingDepthLayout } from '@/components/marketing/MarketingDepthLayout';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';

const pageDescription =
  'How MindMesh collects, uses, protects, and stores your information. Local-first architecture with clear third-party boundaries.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: pageDescription,
  openGraph: {
    title: 'MindMesh | Privacy Policy',
    description: pageDescription,
    url: 'https://mindmesh.global/privacy',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Privacy Policy',
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

function PrivacySection({
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

export default function PrivacyPage() {
  return (
    <MarketingDepthLayout
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How MindMesh collects, uses, protects, and stores your information."
      backHref="/security"
      backLabel="See security →"
    >
      <section className="bg-mm-background py-16 lg:py-24">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4 px-6">
          <PrivacySection id="google-api-compliance" title="Google API Limited Use Disclosure">
            <p>
              MindMesh&apos;s use of information received from Google APIs will adhere to the Google
              API Services User Data Policy, including the Limited Use requirements.
            </p>
            <p>
              We only request access to data that is necessary for the app to function. We do not use
              Google user data to serve advertisements, and we do not allow humans to read your data
              unless you give explicit permission or it is required for security purposes.
            </p>
            <p>
              For more information, visit:{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://developers.google.com/terms/api-services-user-data-policy
              </a>
            </p>
          </PrivacySection>

          <PrivacySection id="slack-connection" title="Slack Connection">
            <p>
              Slack is an optional connected service. When you authorize MindMesh to access your Slack
              workspace, Slack remains the data controller for Slack content. MindMesh processes Slack
              data only to provide the features you use, under the OAuth scopes you approve in Slack.
            </p>
            <p>
              Depending on the scopes you grant, MindMesh may access categories such as:{' '}
              <strong className="text-mm-on-background">messages</strong> (including channel and
              direct messages you can access),{' '}
              <strong className="text-mm-on-background">channels and conversations</strong> metadata,{' '}
              <strong className="text-mm-on-background">user and workspace profile</strong> information
              needed for identity and mentions,{' '}
              <strong className="text-mm-on-background">files and attachments</strong> shared in
              accessible conversations, and{' '}
              <strong className="text-mm-on-background">reactions and related interaction</strong>{' '}
              metadata. We request only the scopes required for the product features you enable, and
              we do not use Slack data for advertising.
            </p>
            <p>
              Consistent with our local-first design, Slack content used for search, summaries, and
              related features is primarily indexed and stored on your device. We keep minimal cloud
              records needed for authentication and connection state (for example encrypted OAuth
              tokens and account linkage). We do not permanently store the full content of your Slack
              messages in MindMesh cloud infrastructure as a substitute for Slack.
            </p>
            <p>
              <strong className="text-mm-on-background">LLM processing.</strong> When you use AI
              features that operate on connected work context, relevant Slack content you can access
              may be sent to our AI provider (OpenAI) to generate insights, answers, or search
              enrichment. That processing is for providing the Service to you. We do not use your
              Slack content to train foundation models, and we do not sell Slack data. See OpenAI&apos;s
              privacy practices at{' '}
              <a
                href="https://openai.com/privacy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                openai.com/privacy
              </a>
              .
            </p>
            <p>
              <strong className="text-mm-on-background">Disconnect, retention, and deletion.</strong>{' '}
              You can disconnect Slack at any time in MindMesh settings or by revoking the app in
              Slack. Disconnecting revokes MindMesh&apos;s API access to Slack. Encrypted OAuth tokens
              for that connection are deleted from our cloud systems when the disconnect completes.
              Locally indexed Slack-derived data on your device is removed when you clear connected
              data in the app or uninstall MindMesh. If the product offers a soft-disconnect (for
              example keeping local index data briefly so you can reconnect without a full re-sync),
              that retained local data stays on your device only, is not used for new Slack API calls
              while disconnected, and is deleted when you clear data or uninstall. You may also
              request deletion of account-related cloud records by contacting us (see Contact Us).
            </p>
            <p>
              Review Slack&apos;s privacy practices at{' '}
              <a
                href="https://slack.com/trust/privacy/privacy-policy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                slack.com/trust/privacy/privacy-policy
              </a>
              .
            </p>
          </PrivacySection>

          <PrivacySection title="Data Encryption & Security">
            <p>
              All data transmitted between your device and MindMesh servers is encrypted using TLS
              1.2 or higher. Stored data is encrypted at rest using AES-256 encryption.
            </p>
            <p>
              We do not use your data to train AI or LLM models. Your data is never sold to third
              parties.
            </p>
          </PrivacySection>

          <p className="text-xs text-mm-on-surface-variant/80">Last updated: 2026-07-10</p>

          <PrivacySection title="1. Introduction">
            <p>
              Welcome to MindMesh. This Privacy Policy explains how we collect, use, and protect your
              information when you use our desktop application and related services, including when
              you connect third-party services such as Slack.
            </p>
          </PrivacySection>

          <PrivacySection title="2. Information We Collect">
            <p>We collect information necessary to provide our services:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-mm-on-background">Account Information</strong>: Email
                address, username, and password (securely hashed)
              </li>
              <li>
                <strong className="text-mm-on-background">OAuth Credentials</strong>: Encrypted
                tokens for third-party services (Google, Microsoft, Slack, Atlassian)
              </li>
              <li>
                <strong className="text-mm-on-background">Connected Work Data</strong>: Content from
                connected email, calendar, messaging, and task accounts needed to provide our
                services
              </li>
              <li>
                <strong className="text-mm-on-background">Usage Data</strong>: How you interact with
                the application to improve our services
              </li>
              <li>
                <strong className="text-mm-on-background">Device Information</strong>: Operating
                system and application version
              </li>
            </ul>
            <p>
              We use AI services (OpenAI) to analyze and enrich your content, extracting insights,
              action items, and enabling semantic search.
            </p>
          </PrivacySection>

          <PrivacySection title="3. How We Store Your Information">
            <p>
              MindMesh follows a{' '}
              <strong className="text-mm-on-background">local-first architecture</strong>. Most of
              your data is stored locally on your device, including emails, calendar events, and
              vector embeddings for search. This data stays on your device and is not transmitted to
              our servers.
            </p>
            <p>
              We maintain minimal cloud storage for account authentication, OAuth tokens, and session
              data. We do not permanently store the full content of your emails, calendar events, or
              Slack messages in our cloud infrastructure.
            </p>
          </PrivacySection>

          <PrivacySection title="4. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Process and organize connected email, calendar, messaging, and task context</li>
              <li>Generate insights and extract actionable items</li>
              <li>Provide semantic search capabilities</li>
              <li>Maintain your account and sync data across devices</li>
              <li>Improve our services and fix bugs</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="5. Third-Party Services">
            <p>
              When you connect third-party services, you grant us permission to access those services
              according to the scopes you approve. Supported connections include Google (Gmail,
              Google Calendar), Microsoft (Outlook Email, Outlook Calendar), Slack, and Atlassian
              (Jira), as well as SMTP mailbox connections you configure. We comply with their
              respective API terms and privacy policies.
            </p>
            <p>
              Slack is described in detail in{' '}
              <a
                href="#slack-connection"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Slack Connection
              </a>{' '}
              above. Atlassian (Jira) is a third-party service for task context you choose to
              connect. Review Atlassian&apos;s privacy practices at{' '}
              <a
                href="https://www.atlassian.com/legal/privacy-policy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                atlassian.com/legal/privacy-policy
              </a>
              .
            </p>
            <p>
              We use OpenAI&apos;s API to process your content, including Slack and other connected
              work context when AI features require it. Your data is sent to OpenAI according to
              their privacy policy. You can review OpenAI&apos;s privacy practices at{' '}
              <a
                href="https://openai.com/privacy"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                openai.com/privacy
              </a>
              . Vendors that process customer data on MindMesh&apos;s behalf are listed on our{' '}
              <Link
                href="/sub-processors"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Sub-processors
              </Link>{' '}
              page.
            </p>
          </PrivacySection>

          <PrivacySection title="6. Data Security">
            <p>
              We implement security measures including encryption of data in transit, secure password
              hashing, and access controls. However, no method of transmission over the Internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              In support of Google API verification, MindMesh completed a security assessment with
              TAC Security. That assessment relates to our Google API review package. It is not a
              GDPR certification, SOC 2 report, or ISO certification, and we do not claim those
              credentials on this site.
            </p>
          </PrivacySection>

          <PrivacySection id="gdpr" title="GDPR and Data Subject Rights">
            <p>
              Where the EU General Data Protection Regulation (GDPR) or similar laws apply to your
              use of MindMesh, we honor the rights described below. This section describes our
              commitments and how to exercise rights. MindMesh does{' '}
              <strong className="text-mm-on-background">not</strong> claim GDPR certification, and
              we do not publish a separate GDPR certificate URL.
            </p>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-mm-on-background">Access</strong> personal data we hold about
                you in connection with your account
              </li>
              <li>
                <strong className="text-mm-on-background">Rectification</strong> of inaccurate account
                information
              </li>
              <li>
                <strong className="text-mm-on-background">Erasure</strong> of account-related cloud
                records, and deletion of local data by clearing connected data or uninstalling the
                app
              </li>
              <li>
                <strong className="text-mm-on-background">Restriction</strong> of certain processing,
                including by disconnecting third-party services
              </li>
              <li>
                <strong className="text-mm-on-background">Portability</strong> of account information
                you provided, where technically feasible
              </li>
              <li>
                <strong className="text-mm-on-background">Object</strong> to processing based on
                legitimate interests, where that basis applies
              </li>
              <li>
                <strong className="text-mm-on-background">Withdraw consent</strong> for optional
                connections (for example Slack or Google) by disconnecting them or revoking access in
                the provider
              </li>
            </ul>
            <p>
              You can exercise many of these controls in product settings (account updates,
              disconnect, clear local data). For requests we cannot complete in-app, email{' '}
              <a
                href="mailto:team@mindmesh.global"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                team@mindmesh.global
              </a>{' '}
              with enough detail for us to verify and respond. We may ask for information needed to
              confirm your identity before fulfilling a request.
            </p>
            <p>
              You can also reach us through our{' '}
              <Link
                href="/contact"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                contact form
              </Link>
              . A stable link to this section is{' '}
              <span className="text-mm-on-background">https://mindmesh.global/privacy#gdpr</span>.
            </p>
          </PrivacySection>

          <PrivacySection title="7. Your Rights">
            <p>
              You can access, update, or delete your account information at any time through the
              Service settings. You can disconnect third-party services (including Slack) at any time,
              which revokes our API access to those services. For Slack-specific disconnect and
              deletion details, see{' '}
              <a
                href="#slack-connection"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Slack Connection
              </a>
              . For GDPR-oriented rights and how to contact us, see{' '}
              <a
                href="#gdpr"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                GDPR and Data Subject Rights
              </a>
              .
            </p>
            <p>
              To delete all local data, clear connected data in the app or uninstall the MindMesh
              application from your device. This removes locally stored content, including indexed
              Slack-derived data.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Data Retention">
            <p>
              We retain your account information for as long as your account is active. OAuth tokens
              are retained while you maintain the connection and deleted when you disconnect. Local
              data persists on your device until you clear it or uninstall the application. If a
              soft-disconnect option retains local index data after API access is revoked, that data
              remains on-device only until you clear it, reconnect, or uninstall, as described in{' '}
              <a
                href="#slack-connection"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Slack Connection
              </a>
              .
            </p>
          </PrivacySection>

          <PrivacySection title="9. Children&apos;s Privacy">
            <p>
              The Service is not intended for users under the age of 13. We do not knowingly collect
              personal information from children.
            </p>
          </PrivacySection>

          <PrivacySection title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the new policy on this page and updating the &quot;Last
              Updated&quot; date. Your continued use of the Service constitutes acceptance of the
              changes.
            </p>
          </PrivacySection>

          <PrivacySection title="11. Contact Us">
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
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
              To report a security vulnerability, email{' '}
              <a
                href="mailto:team@mindmesh.global?subject=Security%20report"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                team@mindmesh.global
              </a>{' '}
              with subject &quot;Security report&quot;, or see{' '}
              <Link
                href="/security#report-security-issue"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Report a security issue
              </Link>{' '}
              on our Security page.
            </p>
            <p>
              Related:{' '}
              <Link
                href="/sub-processors"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Sub-processors
              </Link>
              {' · '}
              <Link
                href="/privacy#gdpr"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                GDPR and data subject rights
              </Link>
              {' · '}
              <Link
                href="/security"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Security
              </Link>
            </p>
            <p>
              <Link
                href="/contact"
                className="font-medium text-mm-primary transition-colors hover:text-mm-primary-dim"
              >
                Contact form →
              </Link>
            </p>
          </PrivacySection>
        </div>
      </section>
    </MarketingDepthLayout>
  );
}
