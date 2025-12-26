import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mindmesh',
  description: 'Privacy Policy for Mindmesh - Your Cognitive OS Layer and Productivity Assistant',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <hr className="my-8 border-gray-300" />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Mindmesh. This Privacy Policy explains how we collect, use, and protect your information when you use our desktop application and related services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information necessary to provide our services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Account Information</strong>: Email address, username, and password (securely hashed)</li>
                <li><strong>OAuth Credentials</strong>: Encrypted tokens for third-party services (Google, Microsoft)</li>
                <li><strong>Email and Calendar Data</strong>: Content from your connected accounts to provide our services</li>
                <li><strong>Usage Data</strong>: How you interact with the application to improve our services</li>
                <li><strong>Device Information</strong>: Operating system and application version</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We use AI services (OpenAI) to analyze and enrich your content, extracting insights, action items, and enabling semantic search.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Store Your Information</h2>
              <p className="text-gray-700 mb-4">
                Mindmesh follows a <strong>local-first architecture</strong>. Most of your data is stored locally on your device, including emails, calendar events, and vector embeddings for search. This data stays on your device and is not transmitted to our servers.
              </p>
              <p className="text-gray-700 mb-4">
                We maintain minimal cloud storage for account authentication, OAuth tokens, and session data. We do not permanently store the full content of your emails or calendar events in our cloud infrastructure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Process and organize your emails and calendar events</li>
                <li>Generate insights and extract actionable items</li>
                <li>Provide semantic search capabilities</li>
                <li>Maintain your account and sync data across devices</li>
                <li>Improve our services and fix bugs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                When you connect third-party services (Google Gmail, Google Calendar, Microsoft Outlook), you grant us permission to access these services. We comply with their respective API terms and privacy policies.
              </p>
              <p className="text-gray-700 mb-4">
                We use OpenAI's API to process your content. Your data is sent to OpenAI according to their privacy policy. You can review OpenAI's privacy practices at <a href="https://openai.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">openai.com/privacy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement security measures including encryption of data in transit, secure password hashing, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You can access, update, or delete your account information at any time through the Service settings. You can disconnect third-party services at any time, which will revoke our access to those services.
              </p>
              <p className="text-gray-700 mb-4">
                To delete all local data, uninstall the Mindmesh application from your device. This will remove all locally stored content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your account information for as long as your account is active. OAuth tokens are retained while you maintain the connection and deleted when you disconnect. Local data persists on your device until you uninstall the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                The Service is not intended for users under the age of 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the Service constitutes acceptance of the changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> team@mindmesh.global
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
