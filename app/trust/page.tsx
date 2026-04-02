import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import {
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Lock,
  Mail,
  Plus,
  Shield,
  Sparkles,
  Workflow,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './trust.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Trust',
  description:
    "Everything you'd want to ask before trusting an AI with your workday. Local-first architecture, clear permissions, and secure defaults.",
  openGraph: {
    title: 'Trust | MindMesh',
    description:
      'Explore privacy-first design, read-only integrations, encrypted secrets, and the core mechanics behind MindMesh.',
    url: 'https://mindmesh.global/trust',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trust | MindMesh',
    description:
      'A privacy-first trust page for MindMesh: local-first, read-only access, and transparent boundaries.',
    images: [OG_IMAGE_URL],
  },
};

const trustCards = [
  {
    title: 'Local-First',
    body: "Most processing happens on your device. We don't store what we don't need.",
    icon: Shield,
  },
  {
    title: 'Read-Only Access',
    body: 'MindMesh can summarize your context, but it never takes actions without you.',
    icon: Sparkles,
  },
  {
    title: 'Encrypted Secrets',
    body: "Credentials are stored in your system keychain, not in a shared server bucket.",
    icon: Lock,
  },
] as const;

export default function TrustPage() {
  return (
    <div className={`${manrope.variable} ${styles.page}`}>
      <SiteNav activeHref="/trust" navBackgroundColor="#060e20" />

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="trust-hero-heading">
          <p className={styles.kicker}>Privacy First</p>
          <h1 id="trust-hero-heading" className={styles.heroTitle}>
            Everything you&apos;d want to ask before trusting an AI with your workday.
          </h1>
          <p className={styles.heroLead}>
            We built MindMesh to be a sanctuary for your focus. Your data stays yours, your tools stay
            under your control, and your peace of mind remains our priority.
          </p>
        </section>

        <section className={styles.cardStrip} aria-label="Trust summary">
          {trustCards.map(({ title, body, icon: Icon }) => (
            <article key={title} className={styles.summaryCard}>
              <Icon className={styles.summaryIcon} aria-hidden />
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.leftCol}>
            <article className={styles.faqCard} aria-label="FAQ item">
              <div className={styles.rowHead}>
                <h3>What is MindMesh?</h3>
                <Plus aria-hidden />
              </div>
              <p>
                MindMesh is a premium native desktop AI assistant designed for deep focus. It acts as a
                cognitive layer over your existing tools, helping you organize, retrieve, and synthesize
                information without the friction of switching tabs.
              </p>
            </article>

            <article className={`${styles.faqCard} ${styles.faqCardOpen}`}>
              <div className={styles.rowHead}>
                <h3>Where is my data stored?</h3>
                <ChevronDown aria-hidden />
              </div>
              <p>We use a local-first architecture. Your core context stays on your device by default.</p>
              <div className={styles.previewPanel}>
                <div className={styles.previewGlow} aria-hidden />
                <div className={styles.previewText}>Encrypted local index + optional secure sync</div>
              </div>
            </article>

            <article className={styles.faqCard}>
              <div className={styles.rowHead}>
                <h3>Does MindMesh train on my data?</h3>
                <Plus aria-hidden />
              </div>
              <p>No. Your personal inbox and connected context are not used for model training.</p>
            </article>

            <div className={styles.dualCards}>
              <article className={styles.microCard}>
                <h4>Can it send emails?</h4>
                <p>Connections are read-only in standard flows, so no accidental outbound actions.</p>
              </article>
              <article className={styles.microCard}>
                <h4>Can it edit my calendar?</h4>
                <p>No. It reads schedule context but cannot create, delete, or change events.</p>
              </article>
            </div>

            <article className={styles.faqCard}>
              <h3>Which apps can I connect?</h3>
              <p>
                MindMesh supports Gmail, Google Calendar, Outlook, and SMTP-based mail services. We are
                continuously expanding integrations based on community feedback.
              </p>
              <div className={styles.iconRow} aria-hidden>
                <span>
                  <Mail size={18} />
                </span>
                <span>
                  <CalendarDays size={18} />
                </span>
                <span>
                  <Workflow size={18} />
                </span>
              </div>
            </article>
          </div>

          <aside className={styles.rightCol}>
            <article className={styles.coreCard}>
              <h2>Core Mechanics</h2>
              <div className={styles.stack}>
                <div>
                  <h4>
                    <Workflow size={16} aria-hidden /> What is the Sensor?
                  </h4>
                  <p>Always-available command input to query your workday in seconds.</p>
                </div>
                <div>
                  <h4>
                    <Bot size={16} aria-hidden /> What is the Mascot?
                  </h4>
                  <p>Not just chat. A proactive desktop companion shaped to your focus rhythm.</p>
                </div>
                <div>
                  <h4>
                    <Sparkles size={16} aria-hidden /> What is Yesterday&apos;s Narrative?
                  </h4>
                  <p>Morning recap that helps you continue quickly without cognitive load.</p>
                </div>
              </div>
            </article>

            <article className={styles.balanceCard}>
              <h3>How does MindMesh help with work-life balance?</h3>
              <ul>
                <li>
                  <CheckCircle2 size={16} aria-hidden />
                  Faster triage by highlighting what matters.
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden />
                  Better morning catch-up with narrative summaries.
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden />
                  Cleaner shutdown with open-loop visibility.
                </li>
              </ul>
            </article>

            <article className={styles.specCard}>
              <h3>Native Performance</h3>
              <p>Web or desktop app?</p>
              <span>Native Desktop App</span>
            </article>
          </aside>
        </section>

      </main>
    </div>
  );
}
