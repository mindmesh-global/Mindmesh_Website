import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowRight,
  Brain,
  CircleAlert,
  Database,
  Eye,
  FileText,
  LayoutDashboard,
  ListFilter,
  Lock,
  Mail,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import upcomingEventsMockup from '@/public/images/upcoming-events-mockup.png';
import styles from './upcoming-events.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const heroAvatar1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDiWIbz-lxkKkQaBGIhb7-EjNcfKpKil2KYTda_Yu789cHQgwW-o3UuwZwt3ZiY6iIulJmGWLXP8yz6dpj0ToTk36SCQ5J7FAVpgAZibKohBgEVwAQdAs6JtbzMLRDtVjTjL6wjjTIV2Fl9YbU99LKzZscn9l-qLxdG_ZP3JSFH0kUhVmgox2fZe6U_nnAq13Pv7uFMH4PNyLBuOGIkPm3Wub4vPRVBPqvgmUotq-YNSX0Poaxy67Ykf1kQRpP4YO-mxHbKy4DXNfE';

const heroAvatar2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCoLwaVze9wA7dyrFmJs8C-d77q8mjqCk1ygbYWxGA75qIQgCa0F17G4-k6OInQp3V039Krp8o6yzJESYsmb_B33ZAWquUTGzBT_AUYWt9Tfs_rkS998e8au5d_t6cLp2G2n_0RR711aOpfayZd90aXUzyhVQlLX2I6JLbPCjORZl2zKyV75KYmTAuzyZ5_upaY56LmYmDPUjSUeogKEg7_C_g5ywTAZkJ8SjEfQZf5V3wlEOwRFIzWPbwoj0XuQY5V73dF5mKkMcE';

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Upcoming Events provides a crystalline view of your next meetings and commitments, designed for mental clarity, not cognitive load.',
  openGraph: {
    title: 'MindMesh | Upcoming Events',
    description:
      'See what is ahead before it takes over your day — calendar intelligence built for focus.',
    url: 'https://mindmesh.global/upcoming-events',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Upcoming Events',
    description:
      'See what is ahead before it takes over your day — calendar intelligence built for focus.',
    images: [OG_IMAGE_URL],
  },
};

export default function UpcomingEventsPage() {
  return (
    <div className={`dark ${manrope.variable} ${styles.page}`}>
      <SiteNav navBackgroundColor="#060e20" />

      <main className={styles.main}>
        <section className="relative overflow-hidden px-8 pb-32 pt-20">
          <div className={`${styles.maxGrid} grid items-center gap-16 lg:grid-cols-2`}>
            <div className="relative z-10">
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                <span className={styles.heroBadgeLabel}>Upcoming Events</span>
              </div>
              <h1
                className={`${styles.textOnSurface} mb-8 text-6xl font-extrabold leading-[1.1] tracking-tight md:text-7xl`}
              >
                See what&apos;s ahead <br />
                <span className={styles.textGradient}>before it takes over your day.</span>
              </h1>
              <p className={`${styles.textMuted} mb-10 max-w-xl text-xl leading-relaxed`}>
                Upcoming Events provides a crystalline view of your next meetings and commitments,
                designed for mental clarity, not cognitive load.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#upcoming-events-preview" className={styles.btnHeroSolid}>
                  See Upcoming Events
                </Link>
                <Link href="/dashboard" className={styles.btnHeroOutline}>
                  Explore the Dashboard
                </Link>
              </div>
            </div>

            <div className={styles.heroMockWrap}>
              <div className={styles.heroGlow} aria-hidden />
              <div
                id="upcoming-events-preview"
                className={`${styles.glassPanel} ${styles.mockFrame}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className={`${styles.textOnSurface} text-2xl font-bold`}>Upcoming Events</h3>
                    <p className={`${styles.textMuted} text-sm`}>Wednesday, Oct 24</p>
                  </div>
                  <div className="flex gap-2">
                    <Search
                      className={`${styles.iconSvg} h-6 w-6 ${styles.mockHeaderIcon}`}
                      aria-hidden
                      strokeWidth={2}
                    />
                    <ListFilter
                      className={`${styles.iconSvg} h-6 w-6 ${styles.mockHeaderIcon}`}
                      aria-hidden
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <div className={`${styles.customScrollbar} flex-1 space-y-6 overflow-y-auto pr-2`}>
                  <div className={styles.mockEventFeatured}>
                    <div className="mb-3 flex justify-between">
                      <span className={`${styles.textPrimary} text-xs font-bold uppercase tracking-widest`}>
                        In 15 Minutes
                      </span>
                      <span className={`${styles.textMuted} text-xs`}>10:00 — 11:00 AM</span>
                    </div>
                    <h4 className={`${styles.textOnSurface} mb-3 text-lg font-semibold`}>
                      Product Strategy Sync: Q4 Vision
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div
                          className={`${styles.avatarRing} h-8 w-8 overflow-hidden rounded-full`}
                        >
                          <Image
                            src={heroAvatar1}
                            alt=""
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className={`${styles.avatarRing} h-8 w-8 overflow-hidden rounded-full`}
                        >
                          <Image
                            src={heroAvatar2}
                            alt=""
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className={`${styles.avatarRing} flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${styles.textOnSurface}`}
                        >
                          +3
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Video
                          className={`${styles.iconSvg} h-6 w-6 ${styles.mockActionIcon}`}
                          aria-hidden
                          strokeWidth={2}
                        />
                        <FileText
                          className={`${styles.iconSvg} h-6 w-6 ${styles.mockActionIcon}`}
                          aria-hidden
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockEventAlt}>
                    <div className="mb-3 flex justify-between">
                      <span className={`${styles.textTertiary} text-xs font-bold uppercase tracking-widest`}>
                        Next Up
                      </span>
                      <span className={`${styles.textMuted} text-xs`}>1:30 — 2:00 PM</span>
                    </div>
                    <h4 className={`${styles.textOnSurface} mb-3 text-lg font-semibold`}>
                      Deep Focus: MindMesh UI Design
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className={styles.pillTertiary}>Personal Focus</span>
                      <Lock
                        className={`${styles.iconSvg} h-6 w-6 ${styles.textMuted}`}
                        aria-hidden
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionLow} px-8 py-32`}>
          <div className={styles.maxGrid}>
            <div className="flex flex-col items-center gap-16 md:flex-row">
              <div className="order-2 md:order-1 md:w-1/2">
                <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={upcomingEventsMockup}
                    alt="Upcoming Events panel showing connected calendars and join meeting actions"
                    width={928}
                    height={384}
                    className="w-full grayscale transition-all duration-700 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={styles.imageOverlayBlue} />
                </div>
              </div>
              <div className="order-1 md:order-2 md:w-1/2">
                <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                  Your schedule, surfaced with less friction.
                </h2>
                <p className={`${styles.textMuted} mb-8 text-lg leading-relaxed`}>
                  Forget tab-switching fatigue. MindMesh brings your calendar intelligence directly into
                  your workspace. It&apos;s not a list of chores; it&apos;s a calm map of your day that
                  breathes with you.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <Eye
                      className={`${styles.iconSvg} h-8 w-8 ${styles.textPrimary}`}
                      aria-hidden
                      strokeWidth={2}
                    />
                    <div>
                      <h4 className={`${styles.textOnSurface} mb-1 font-bold`}>Ambient Awareness</h4>
                      <p className={`${styles.textMuted} text-sm`}>
                        Peripheral visibility of your next engagement without breaking your current flow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionDefault} px-8 py-32`}>
          <div className={`${styles.maxGrid} flex flex-col items-center gap-16 md:flex-row-reverse`}>
            <div className="md:w-1/2">
              <div className={`${styles.glassPanel} ${styles.glassStatShell}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className={styles.statTile}>
                    <Brain
                      className={`${styles.iconSvg} mx-auto mb-4 h-10 w-10 ${styles.textPrimaryDim}`}
                      aria-hidden
                      strokeWidth={1.75}
                    />
                    <p className={`${styles.textOnSurface} font-bold`}>90% Less</p>
                    <p className={`${styles.textMuted} text-xs uppercase tracking-tighter`}>
                      Context Switching
                    </p>
                  </div>
                  <div className={styles.statTile}>
                    <Zap
                      className={`${styles.iconSvg} mx-auto mb-4 h-10 w-10 ${styles.textTertiary}`}
                      aria-hidden
                      strokeWidth={1.75}
                    />
                    <p className={`${styles.textOnSurface} font-bold`}>Instant</p>
                    <p className={`${styles.textMuted} text-xs uppercase tracking-tighter`}>
                      Context Sync
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                Prepare for meetings without the usual scramble.
              </h2>
              <p className={`${styles.textMuted} mb-8 text-lg leading-relaxed`}>
                Every event card is enriched with the context you actually need. One-click access to
                meeting briefs, relevant documents, and participant profiles, surfaced before you even
                join the call.
              </p>
              {/* <Link href="/features" className={styles.linkPrimaryBold}>
                View Calendar Intelligence
                <ArrowRight className={`${styles.iconSvg} h-5 w-5`} aria-hidden strokeWidth={2.5} />
              </Link> */}
            </div>
          </div>
        </section>

        <section className={`${styles.sectionLow} px-8 py-32`}>
          <div className={styles.maxGrid}>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Built to work alongside your Dashboard.
              </h2>
              <p className={`${styles.textMuted} text-lg`}>
                A unified ecosystem where every event informs your focus.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {(
                [
                  {
                    Icon: LayoutDashboard,
                    title: 'Live Sync',
                    body: 'Dashboard widgets update in real-time as your schedule shifts throughout the day.',
                  },
                  {
                    Icon: Mail,
                    title: 'Inbox Harmony',
                    body: 'Convert incoming invites into actionable focus blocks without leaving your inbox.',
                  },
                  {
                    Icon: Activity,
                    title: 'Sensor Aware',
                    body: 'Automatically toggle "Deep Work" mode across all your devices during focused events.',
                  },
                ] satisfies { Icon: LucideIcon; title: string; body: string }[]
              ).map(({ Icon, title, body }) => (
                <div key={title} className={styles.bentoCard}>
                  <Icon
                    className={`${styles.iconSvg} ${styles.iconBento} ${styles.textPrimary} mb-6`}
                    aria-hidden
                    strokeWidth={1.75}
                  />
                  <h4 className={`${styles.textOnSurface} mb-3 text-xl font-bold`}>{title}</h4>
                  <p className={`${styles.textMuted} text-sm leading-relaxed`}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.sectionDefault} px-8 py-32`}>
          <div className={`${styles.maxGrid} grid gap-24 md:grid-cols-2`}>
            <div className="space-y-8">
              <div className={styles.iconTilePrimary}>
                <CircleAlert
                  className={`${styles.iconSvg} h-8 w-8 ${styles.textPrimary}`}
                  aria-hidden
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Spot what matters before it becomes urgent.</h3>
              <p className={`${styles.textMuted} leading-relaxed`}>
                MindMesh identifies schedule conflicts and priority misalignment. If you have a deep work
                goal but no time blocked on your calendar, we&apos;ll nudge you to make space.
              </p>
            </div>
            <div className="space-y-8">
              <div className={styles.iconTileTertiary}>
                <Moon
                  className={`${styles.iconSvg} h-8 w-8 ${styles.textTertiary}`}
                  aria-hidden
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                Better visibility supports better work-life balance.
              </h3>
              <p className={`${styles.textMuted} leading-relaxed`}>
                Knowing exactly what&apos;s left in your day allows you to switch off more effectively. At
                6 PM, our &quot;Wind Down&quot; summary confirms you&apos;re clear for the evening.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionBorderTop} px-8 py-32`}>
          <div className={styles.privacyPanel}>
            <div className={styles.privacyGradient} aria-hidden />
            <div className="relative z-10 flex flex-col gap-16 md:flex-row">
              <div className="md:w-1/2">
                <h2 className="mb-6 text-4xl font-bold">Calendar visibility with privacy-conscious design.</h2>
                <p className={`${styles.textMuted} mb-8 text-lg leading-relaxed`}>
                  Your schedule is your business. We treat calendar data as transient and private. MindMesh
                  operates with a &quot;minimum necessary&quot; access philosophy, keeping your personal life
                  secure.
                </p>
              </div>
              <div className="space-y-6 md:w-1/2">
                {(
                  [
                    { Icon: ShieldCheck, label: 'Read-only calendar access' },
                    { Icon: Database, label: 'Local-first architecture' },
                    { Icon: Sparkles, label: 'Built to organize context' },
                  ] satisfies { Icon: LucideIcon; label: string }[]
                ).map(({ Icon, label }) => (
                  <div key={label} className={styles.privacyListRow}>
                    <Icon
                      className={`${styles.iconSvg} h-6 w-6 ${styles.textPrimary}`}
                      aria-hidden
                      strokeWidth={2}
                    />
                    <span className={`${styles.textOnSurface} font-medium`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionDefault} relative overflow-hidden px-8 py-40 text-center`}>
          <div className={styles.closingBlob} aria-hidden />
          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className={`${styles.textOnSurface} mb-8 text-5xl font-bold tracking-tight md:text-6xl`}>
              Stay ahead of your schedule, without living in your calendar.
            </h2>
            <p className={`${styles.textMuted} mx-auto mb-12 max-w-2xl text-xl`}>
              Experience a more mindful way to manage your time. Join the thousands of thinkers using
              MindMesh to reclaim their focus.
            </p>
            {/* <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link href="/waitlist" className={styles.btnClosingLight}>
                Try MindMesh
              </Link>
              <Link href="/features" className={styles.btnClosingDark}>
                See All Features
              </Link>
            </div> */}
          </div>
        </section>
      </main>

    
    </div>
  );
}
