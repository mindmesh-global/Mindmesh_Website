import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Mindmesh',
  description: 'Terms of Service for Mindmesh - Your Cognitive OS Layer and Productivity Assistant',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <hr className="my-8 border-gray-300" />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Mindmesh, you agree to be bound by these Terms of Service. If you disagree with any part of these Terms, you may not access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Mindmesh is a cognitive OS layer and productivity assistant that integrates with your email and calendar services, processes your communications using AI, and provides semantic search capabilities. Data is stored locally on your device with cloud backup for authentication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Eligibility</h2>
              <p className="text-gray-700 mb-4">
                You must be at least 13 years old to use the Service. By using the Service, you represent that you are of legal age to form a binding contract and that your use will not violate any applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You are responsible for maintaining the security of your account and password. You agree to provide accurate information during registration and to accept responsibility for all activities under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                When you connect third-party services (Google, Microsoft), you grant us permission to access your data. You agree to comply with their respective terms of service. You can revoke access at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use the Service to violate any laws, infringe upon rights, harass others, transmit malware, interfere with the Service, attempt unauthorized access, reverse engineer, or engage in any abusive behavior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its content are owned by Mindmesh and protected by intellectual property laws. You retain ownership of your content but grant us a license to access, process, and store it as necessary to provide the Service, including sharing with third-party AI services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your use of the Service is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. AI Processing</h2>
              <p className="text-gray-700 mb-4">
                The Service uses AI to analyze your content. AI-generated insights may not always be accurate, and the Service is not a substitute for your own judgment. We are not responsible for decisions made based on AI-generated content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but do not guarantee availability at all times. We reserve the right to modify, suspend, or discontinue the Service at any time with or without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Fees and Payment</h2>
              <p className="text-gray-700 mb-4">
                Certain features may require payment. Subscription fees are billed in advance and are non-refundable unless required by law. You may cancel your subscription at any time through your account settings. We reserve the right to change pricing with advance notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Termination</h2>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by deleting it through the Service settings or uninstalling the application. We may terminate or suspend your account immediately for conduct that violates these Terms or is harmful to others.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Disclaimers</h2>
              <p className="text-gray-700 mb-4 font-semibold">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">14. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4 font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRIOR TO THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the new Terms on this page. Your continued use of the Service after changes constitutes acceptance of the changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">16. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms, please contact us at:
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
