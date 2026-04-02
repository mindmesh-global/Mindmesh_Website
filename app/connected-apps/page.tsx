import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Mail,
  Search,
  Shield,
  Workflow,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './connected-apps.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const supportedApps = [
  { name: 'Gmail', icon: Mail },
  { name: 'Google Calendar', icon: CalendarDays },
  { name: 'Outlook Email', icon: Mail },
  { name: 'Outlook Calendar', icon: CalendarDays },
  { name: 'SMTP Mailbox', icon: Workflow },
] as const;

const workflowCards = [
  {
    title: 'Inbox context',
    description: 'Bring important email threads into one focused view.',
  },
  {
    title: 'Calendar visibility',
    description: 'Keep upcoming meetings and schedule context easy to scan.',
  },
  {
    title: 'Unified overview',
    description: 'See what is connected, active, and relevant in one place.',
  },
  {
    title: 'Smarter daily flow',
    description: 'Turn emails and events into summaries, narratives, and next-step clarity.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Connected Apps',
  description:
    'Explore MindMesh connected apps for Gmail, Outlook, Google Calendar, SMTP, and more in one private, desktop-native workspace.',
  openGraph: {
    title: 'MindMesh Connected Apps',
    description:
      'Connect the tools you already rely on and bring your email and calendar context into one focused workspace.',
    url: 'https://mindmesh.global/connected-apps',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Connected Apps',
    description:
      'Connect the tools you already rely on and bring your email and calendar context into one focused workspace.',
    images: [OG_IMAGE_URL],
  },
};

function AppBadge({
  name,
  Icon,
}: {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className={styles.appCard}>
      <div className={styles.appIcon}>
        <Icon className="h-5 w-5 text-[#dee5ff]" />
      </div>
      <p className={styles.appName}>{name}</p>
    </div>
  );
}

export default function ConnectedAppsPage() {
  return (
    <main
      className={`${manrope.className} ${styles.page} selection:bg-[#0e69dc] selection:text-white`}
    >
      <SiteNav navBackgroundColor="#060e20" />

      <section className={styles.heroSection}>
        <div className={`${styles.container} ${styles.textCenter}`}>
          <span className={styles.eyebrow}>
            Connectivity
          </span>
          <h1 className={styles.heroTitle}>
            Connect the tools you already use
          </h1>
          <p className={styles.heroText}>
          MindMesh brings your inboxes and calendars together into one private, desktop-native workspace.
          </p>
          <div className={styles.ctaRow}>
            <Link
              href="#supported-apps"
              className={styles.primaryButton}
            >
              See Supported Apps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <div className={styles.heroVisualStack}>
                <div className={styles.heroIconShell}>
                  <Mail className="h-7 w-7 text-[#dee5ff] sm:h-9 sm:w-9" />
                </div>
              </div>
              <div className={`${styles.heroVisualStack} ${styles.heroVisualOffset}`}>
                <div className={styles.heroIconShell}>
                  <CalendarDays className="h-7 w-7 text-[#dee5ff] sm:h-9 sm:w-9" />
                </div>
              </div>
              <div className={styles.heroConnector} />
              <div className={styles.heroHub}>
                <Workflow className="h-10 w-10 text-white sm:h-12 sm:w-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="supported-apps" className={styles.standardSectionBand}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>
              Built around real workflows, not idealized ones.
            </h2>
            <p className={styles.sectionText}>
              Connect Gmail, Google Calendar, Outlook Email, Outlook Calendar, and SMTP mailbox
              accounts to bring your work context into one place.
            </p>
          </div>
          <div className={styles.appsGrid}>
            {supportedApps.map(({ name, icon: Icon }) => (
              <AppBadge key={name} name={name} Icon={Icon} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.standardSection}>
        <div className={`${styles.container} ${styles.splitGrid}`}>
          <div>
            <h2 className={styles.sectionTitle}>
              See every connection in one view.
            </h2>
            <p className={styles.sectionText}>
              MindMesh gives you a clear Connected Apps section so you always know what is linked,
              what is active, and where your information is coming from.
            </p>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewCardInner}>
              <div className={styles.previewHeader}>
                <h3 className={styles.previewTitle}>
                  Connected Accounts
                </h3>
                <Search className="h-4 w-4 text-[#99aad9]" />
              </div>
              <div className={styles.accountList}>
                <div className={styles.accountRow}>
                  <div className={styles.accountMeta}>
                    <div className={styles.accountIcon}>
                      <Mail className="h-5 w-5 text-[#dee5ff]" />
                    </div>
                    <div>
                      <p className={styles.accountName}>alex.dev@gmail.com</p>
                      <p className={styles.accountStatus}>Active • Last synced: 2m ago</p>
                    </div>
                  </div>
                  <div className={styles.toggleOn}>
                    <div className={styles.toggleKnobOn} />
                  </div>
                </div>

                <div className={`${styles.accountRow} ${styles.accountRowMuted}`}>
                  <div className={styles.accountMeta}>
                    <div className={styles.accountIcon}>
                      <CalendarDays className="h-5 w-5 text-[#dee5ff]" />
                    </div>
                    <div>
                      <p className={styles.accountName}>Primary Calendar</p>
                      <p className={`${styles.accountStatus} ${styles.accountStatusMuted}`}>
                        Paused • Last synced: 15m ago
                      </p>
                    </div>
                  </div>
                  <div className={styles.toggleOff}>
                    <div className={styles.toggleKnobOff} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.standardSectionBand}>
        <div className={styles.container}>
          <div className={styles.centerIntro}>
            <h2 className={styles.sectionTitle}>
            Built around the way your work already moves.
            </h2>
            <p className={styles.sectionText}>
            MindMesh starts with the inboxes and calendars you already use, then helps turn scattered activity into a calmer, more organized workspace.
            </p>
          </div>
          <div className={styles.libraryGrid}>
            {workflowCards.map(({ title, description }) => (
              <div key={title} className={styles.libraryCard}>
                <h3 className={styles.libraryTitle}>{title}</h3>
                <p className={styles.libraryDescription}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.standardSection}>
        <div className={`${styles.container} ${styles.splitGridReverse}`}>
          <div className={styles.textOrder}>
            <h2 className={styles.sectionTitle}>
              A consolidated inbox without the usual mess.
            </h2>
            <p className={styles.sectionText}>
              Bring multiple inboxes into one focused experience so you can scan, search, and
              prioritize without jumping between accounts all day.
            </p>
          </div>

          <div className={`${styles.messageCard} ${styles.messageOrder}`}>
            <div className={styles.messageStack}>
              <div className={styles.messageItem}>
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageTitle}>Project Sync: New Designs</h3>
                  <span className={styles.messageTag}>
                    alex.dev@gmail.com
                  </span>
                </div>
                <p className={styles.messageBody}>
                  Attached are the latest wireframes for the mobile app redesign...
                </p>
              </div>

              <div className={`${styles.messageItem} ${styles.messageItemAccent}`}>
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageTitle}>Weekly Q4 Roadmap Review</h3>
                  <span className={`${styles.messageTag} ${styles.messageTagAccent}`}>
                    user@outlook.com
                  </span>
                </div>
                <p className={styles.messageBody}>
                  Reviewing the strategic pillars for the next quarter with the leadership team.
                </p>
              </div>

              <div className={`${styles.messageItem} ${styles.messageItemMuted}`}>
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageTitle}>Subscription Confirmation</h3>
                  <span className={styles.messageTag}>
                    alex.dev@gmail.com
                  </span>
                </div>
                <p className={styles.messageBody}>
                  Thank you for subscribing to our premium newsletter...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.borderBand}>
        <div className={styles.narrowCenter}>
          <h2 className={styles.sectionTitle}>
            Access should be useful and intentional.
          </h2>
          <p className={styles.sectionText}>
            Supported Gmail and Google Calendar connections use read-only access. MindMesh is built
            to organize and retrieve context, not to take unnecessary control over your accounts.
          </p>
        </div>
      </section>

      <section className={styles.privacySection}>
        <div className={styles.narrowCenter}>
          <div className={styles.shieldWrap}>
            <Shield className="h-8 w-8 text-[#adc6ff]" />
          </div>
          <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>
            Connected does not have to mean exposed.
          </h2>
          <p className={styles.sectionText}>
            MindMesh uses a local-first approach designed to keep your work context private while
            still making it easier to search, summarize, and stay organized.
          </p>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.centerIntro}>
          <h2 className={styles.footerTitle}>
            Bring your workflow together.
          </h2>
          <p className={styles.footerText}>
            Connect the apps you already trust and let MindMesh turn them into a calmer daily
            system.
          </p>
          <div className={styles.ctaRow}>
            <Link
              href="/waitlist"
              className={styles.primaryButton}
            >
              Connect Your Workflow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
