import type { Metadata } from 'next';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Check,
  CheckCircle,
  Cloud,
  Eye,
  Laptop,
  Lock,
  RefreshCw,
  Shield,
  ShieldCheck,
  X,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './security.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Privacy & Security',
  description:
    'MindMesh is private by design: local-first architecture, read-only integrations where it matters, and clear boundaries for your data.',
  openGraph: {
    title: 'Privacy & Security | MindMesh',
    description:
      'Enterprise-grade security, local-first architecture, and transparency about what MindMesh can and cannot access.',
    url: 'https://mindmesh.global/security',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy & Security | MindMesh',
    description:
      'Enterprise-grade security, local-first architecture, and transparency about what MindMesh can and cannot access.',
    images: [OG_IMAGE_URL],
  },
};

export default function SecurityPage() {
  return (
    <div className={`${manrope.variable} ${styles.page}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #060e20 !important;
              color: #dee5ff !important;
            }
          `,
        }}
      />

      <SiteNav activeHref="/security" navBackgroundColor="#060e20" />

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="security-hero-heading">
          <div className={styles.heroInner}>
            <div className={styles.badge}>
              <ShieldCheck className={styles.badgeIcon} aria-hidden strokeWidth={2} />
              <span className={styles.badgeText}>Security & privacy</span>
            </div>
            <h1 id="security-hero-heading" className={styles.heroTitle}>
              Private by design.
              <br />
              Built for trust.
            </h1>
            <p className={styles.heroLead}>
              MindMesh is designed for people who want the benefits of AI at work without giving up
              control of their data, permissions, or daily workflow.
            </p>
            <div className={styles.heroActions}>
              <Link href="#comparison" className={styles.btnPrimary}>
                See How MindMesh Protects Your Data
              </Link>
            </div>
          </div>
          <div className={styles.heroGlow} aria-hidden />
        </section>

        <section className={styles.sectionLow} aria-labelledby="local-first-heading">
          <div className={styles.container}>
            <div className={styles.grid2}>
              <div>
                <h2 id="local-first-heading" className={styles.sectionTitle}>
                  Local-first architecture, designed for privacy.
                </h2>
                <p className={styles.sectionBody}>
                  MindMesh is built around a local-first model that keeps indexed work context close
                  to the user and prioritizes privacy-conscious processing.

                  <br /><br />
                  Your vector memory stays on your device by default; traffic to Google and MindMesh uses encrypted (TLS) connections.
                </p>
              </div>
              <div>
                <div className={styles.glassCard}>
                  <div className={styles.diagramRow}>
                    <div className={styles.diagramNode}>
                      <div className={styles.diagramIconBox}>
                        <Cloud size={28} strokeWidth={1.5} aria-hidden />
                      </div>
                      <span className={styles.diagramLabel}>Public Cloud</span>
                    </div>
                    <div className={styles.diagramLine}>
                      <span className={styles.encryptedPill}>ENCRYPTED (TLS)</span>
                    </div>
                    <div className={styles.diagramNode}>
                      <div className={`${styles.diagramIconBox} ${styles.diagramIconBoxLg}`}>
                        <Laptop size={36} strokeWidth={1.5} aria-hidden />
                      </div>
                      <span className={`${styles.diagramLabel} ${styles.diagramLabelAccent}`}>
                        Local Mesh
                      </span>
                    </div>
                  </div>
                  <div className={styles.progressRow}>
                    <div className={styles.progressTrack}>
                      <div className={`${styles.progressFill} ${styles.progressFill66}`} />
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={`${styles.progressFill} ${styles.progressFill100}`} />
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={`${styles.progressFill} ${styles.progressFill50}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionPad} aria-labelledby="permissions-heading">
          <div className={styles.container}>
            <div className={styles.featureGrid}>
              <article className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.featureIconPrimary}`}>
                  <Eye size={28} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 id="permissions-heading" className={styles.featureCardTitle}>
                  Read-only access where it matters.
                </h3>
                <p className={styles.featureCardText}>
                  Supported Gmail and Google Calendar connections use read-only permissions, helping
                  users search, summarize, and stay organized without granting unnecessary control.
                </p>
                <div className={styles.calloutRow}>
                  <CheckCircle size={18} strokeWidth={2} aria-hidden />
                  <p className={styles.calloutText}>No write permissions requested</p>
                </div>
              </article>

              <article className={`${styles.featureCard} ${styles.featureCardAlt}`}>
                <div className={`${styles.featureIcon} ${styles.featureIconTertiary}`}>
                  <Lock size={28} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className={styles.featureCardTitle}>
                  Modern protection for sensitive security paths.
                </h3>
                <p className={styles.featureCardText}>
                  MindMesh uses modern encryption protections, including AES-256-GCM in key flows
                  such as sensitive token protection and some encrypted local storage paths.
                </p>
                <Link href="/faq" className={styles.linkTertiary}>
                  Learn About Permissions
                  <ArrowRight size={20} aria-hidden />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionLow} ${styles.sectionPad}`} aria-labelledby="trust-heading">
          <div className={styles.container}>
            <div className={styles.trustLayout}>
              <div className={styles.trustCopy}>
                <h2 id="trust-heading" className={styles.sectionTitle}>
                  Desktop trust signals built in.
                </h2>
                <p className={`${styles.sectionBody} ${styles.trustLead}`}>
                  MindMesh uses signed desktop updates and a deliberate desktop architecture designed
                  to feel more secure, more controlled, and more transparent than typical browser-first
                  AI tools.
                </p>
                <div className={styles.trustMiniGrid}>
                  <div className={styles.trustChip}>
                    <div className={styles.trustChipIcon}>
                      <BadgeCheck size={20} strokeWidth={1.5} aria-hidden />
                    </div>
                    <div>
                      <div className={styles.trustChipKicker}>Certification</div>
                      <p className={styles.trustChipTitle}>OS Signed Binary</p>
                    </div>
                  </div>
                  <div className={styles.trustChip}>
                    <div className={styles.trustChipIcon}>
                      <RefreshCw size={20} strokeWidth={1.5} aria-hidden />
                    </div>
                    <div>
                      <div className={styles.trustChipKicker}>Reliability</div>
                      <p className={styles.trustChipTitle}>Secure Updates</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.trustVisual}>
                <div className={styles.principlesCard}>
                  <div className={styles.principlesCardGlow} aria-hidden />
                  <div className={styles.principlesCardAccent} aria-hidden />
                  <div className={styles.principlesCardInner}>
                    <svg
                      className={styles.principlesIcon}
                      viewBox="0 0 96 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M48 8L74 19.5V49.5C74 63.5 64.5 76 48 86C31.5 76 22 63.5 22 49.5V19.5L48 8Z"
                        stroke="rgba(255,255,255,0.92)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="34"
                        y="36"
                        width="28"
                        height="19"
                        rx="2.5"
                        stroke="rgba(255,255,255,0.92)"
                        strokeWidth="1.75"
                      />
                      <path
                        d="M30 57H66L61.5 64.5H34.5L30 57Z"
                        stroke="rgba(255,255,255,0.92)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M34 55H62"
                        stroke="rgba(255,255,255,0.92)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                    <ul className={styles.principlesChips}>
                      <li className={styles.principlesChip}>OS Signed Binary</li>
                      <li className={styles.principlesChip}>Secure Updates</li>
                      <li className={styles.principlesChip}>Desktop-first architecture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="comparison"
          className={styles.compareSection}
          aria-labelledby="comparison-heading"
        >
          <div className={styles.compareNarrow}>
            <div className={styles.compareHeader}>
              <h2 id="comparison-heading" className={styles.compareTitle}>
                What MindMesh can access, and what it cannot do.
              </h2>
              <p className={styles.compareSubtitle}>
                Transparency is our standard. We maintain explicit boundaries with your data.
              </p>
            </div>
            <div className={styles.compareGrid}>
              <div className={`${styles.compareCol} ${styles.compareColCan}`}>
                <div className={styles.compareColHead}>
                  <div className={`${styles.compareIconCircle} ${styles.compareIconCircleOk}`}>
                    <Check size={20} strokeWidth={2.5} aria-hidden />
                  </div>
                  <h3 className={styles.compareColTitle}>MindMesh can</h3>
                </div>
                <ul className={styles.compareList}>
                  <li className={`${styles.compareItem} ${styles.compareItemOk}`}>
                    <Shield size={28} strokeWidth={1.5} aria-hidden />
                    <p>Read supported email and calendar data you choose to connect</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemOk}`}>
                    <Shield size={28} strokeWidth={1.5} aria-hidden />
                    <p>Keep your memory/index on your device by default.</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemOk}`}>
                    <Shield size={28} strokeWidth={1.5} aria-hidden />
                    <p>Help summarize what matters today and what happened yesterday</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemOk}`}>
                    <Shield size={28} strokeWidth={1.5} aria-hidden />
                    <p>Help you find old work context quickly.</p>
                  </li>
                </ul>
              </div>
              <div className={`${styles.compareCol} ${styles.compareColCannot}`}>
                <div className={styles.compareColHead}>
                  <div className={`${styles.compareIconCircle} ${styles.compareIconCircleNo}`}>
                    <X size={20} strokeWidth={2.5} aria-hidden />
                  </div>
                  <h3 className={styles.compareColTitle}>MindMesh cannot</h3>
                </div>
                <ul className={styles.compareList}>
                  <li className={`${styles.compareItem} ${styles.compareItemNo}`}>
                    <Ban size={28} strokeWidth={1.5} aria-hidden />
                    <p>Claim ownership of your work data</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemNo}`}>
                    <Ban size={28} strokeWidth={1.5} aria-hidden />
                    <p>Train on your personal inbox data</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemNo}`}>
                    <Ban size={28} strokeWidth={1.5} aria-hidden />
                    <p>Delete or change your emails.</p>
                  </li>
                  <li className={`${styles.compareItem} ${styles.compareItemNo}`}>
                    <Ban size={28} strokeWidth={1.5} aria-hidden />
                    <p>
                      Send Gmail messages or edit Google Calendar events through the standard
                      read-only connection flow
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading">
          <div className={styles.closingGlow} aria-hidden />
          <div className={styles.closingNarrow}>
            <div className={styles.closingCard}>
              <h2 id="closing-heading" className={styles.closingTitle}>
                Built to help you work with your data, not extract value from it.
              </h2>
              <p className={styles.closingText}>
                Privacy is not an add-on in MindMesh. It is a product principle that shapes
                permissions, architecture, and user experience from the beginning.
              </p>
              <div className={styles.closingActions}>
                <Link href="/" className={`${styles.btnPrimary} ${styles.btnPrimaryLg}`}>
                  Try Private AI for Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
