import type { Metadata } from 'next';
import SiteNav from '@/components/layout/SiteNav';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy - MindMesh',
  description: 'Privacy Policy for MindMesh - Your Cognitive OS Layer and Productivity Assistant',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <SiteNav activeHref="/privacy" navBackgroundColor="#060e20" />
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>Legal</span>
          <h1>Privacy Policy</h1>
          <p>How MindMesh collects, uses, protects, and stores your information.</p>
        </section>

        <div className={styles.panel}>
          <hr className={styles.divider} />

          <section id="google-api-compliance" className={styles.section}>
            <h2>Google API Limited Use Disclosure</h2>
            <p>
                MindMesh&apos;s use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
            </p>
            <p>
                We only request access to data that is necessary for the app to function. We do not use Google user data to serve advertisements, and we do not allow humans to read your data unless you give explicit permission or it is required for security purposes.
            </p>
            <p>
                For more information, visit:{' '}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" className={styles.link} target="_blank" rel="noopener noreferrer">
                  https://developers.google.com/terms/api-services-user-data-policy
                </a>
            </p>
          </section>

          <section className={styles.section}>
            <h2>Data Encryption &amp; Security</h2>
            <p>
                All data transmitted between your device and MindMesh servers is encrypted using TLS 1.2 or higher. Stored data is encrypted at rest using AES-256 encryption.
            </p>
            <p>
                We do not use your data to train AI or LLM models. Your data is never sold to third parties.
            </p>
          </section>

          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
                Welcome to MindMesh. This Privacy Policy explains how we collect, use, and protect your information when you use our desktop application and related services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Collect</h2>
            <p>
                We collect information necessary to provide our services:
            </p>
            <ul className={styles.list}>
                <li><strong>Account Information</strong>: Email address, username, and password (securely hashed)</li>
                <li><strong>OAuth Credentials</strong>: Encrypted tokens for third-party services (Google, Microsoft)</li>
                <li><strong>Email and Calendar Data</strong>: Content from your connected accounts to provide our services</li>
                <li><strong>Usage Data</strong>: How you interact with the application to improve our services</li>
                <li><strong>Device Information</strong>: Operating system and application version</li>
            </ul>
            <p>
                We use AI services (OpenAI) to analyze and enrich your content, extracting insights, action items, and enabling semantic search.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. How We Store Your Information</h2>
            <p>
                MindMesh follows a <strong>local-first architecture</strong>. Most of your data is stored locally on your device, including emails, calendar events, and vector embeddings for search. This data stays on your device and is not transmitted to our servers.
            </p>
            <p>
                We maintain minimal cloud storage for account authentication, OAuth tokens, and session data. We do not permanently store the full content of your emails or calendar events in our cloud infrastructure.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. How We Use Your Information</h2>
            <p>
                We use your information to:
            </p>
            <ul className={styles.list}>
                <li>Process and organize your emails and calendar events</li>
                <li>Generate insights and extract actionable items</li>
                <li>Provide semantic search capabilities</li>
                <li>Maintain your account and sync data across devices</li>
                <li>Improve our services and fix bugs</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Third-Party Services</h2>
            <p>
                When you connect third-party services (Google Gmail, Google Calendar, Microsoft Outlook), you grant us permission to access these services. We comply with their respective API terms and privacy policies.
            </p>
            <p>
              We use OpenAI&apos;s API to process your content. Your data is sent to OpenAI according to their privacy policy. You can review OpenAI&apos;s privacy practices at <a href="https://openai.com/privacy" className={styles.link} target="_blank" rel="noopener noreferrer">openai.com/privacy</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Data Security</h2>
            <p>
                We implement security measures including encryption of data in transit, secure password hashing, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Your Rights</h2>
            <p>
                You can access, update, or delete your account information at any time through the Service settings. You can disconnect third-party services at any time, which will revoke our access to those services.
            </p>
            <p>
                To delete all local data, uninstall the MindMesh application from your device. This will remove all locally stored content.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Data Retention</h2>
            <p>
                We retain your account information for as long as your account is active. OAuth tokens are retained while you maintain the connection and deleted when you disconnect. Local data persists on your device until you uninstall the application.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Children&apos;s Privacy</h2>
            <p>
                The Service is not intended for users under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the Service constitutes acceptance of the changes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Contact Us</h2>
            <p>
                If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p>
                <strong>Email:</strong> team@mindmesh.global
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
