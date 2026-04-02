import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Download,
  Inbox,
  LayoutGrid,
  Library,
  Lock,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './inbox.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const heroInboxImage = '/images/hero-inbox-mockup.jpg';

export const metadata: Metadata = {
  title: 'Inbox',
  description:
    'One inbox for everything that needs your attention — unified email, plain-English search, and a calmer workspace inside MindMesh.',
  openGraph: {
    title: 'MindMesh | Inbox',
    description:
      'Consolidated inboxes, natural language search, and workspace integration — without the usual chaos.',
    url: 'https://mindmesh.global/inbox',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh | Inbox',
    description:
      'Consolidated inboxes, natural language search, and workspace integration — without the usual chaos.',
    images: [OG_IMAGE_URL],
  },
};

export default function InboxPage() {
  return (
    <div className={`dark ${manrope.variable} ${styles.page}`}>
      <SiteNav navBackgroundColor="rgba(10, 15, 30, 0.72)" />

      <main className={styles.main}>
        <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-8">
          <div className={`${styles.maxGrid} grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16`}>
            <div className="relative z-10">
              <h1 className={`${styles.textOnSurface} mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl`}>
              One inbox for everything
              Stop switching tabs. 
              </h1>
              <p className={`${styles.textMuted} mb-10 max-w-xl text-lg leading-relaxed`}>
                MindMesh brings your connected email accounts into one focused, intelligent inbox so you can
                scan faster, and stay on top of what matters — without drowning in
                tabs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#inbox-hero-preview" className={styles.btnHeroSolid}>
                  Explore Inbox
                </Link>
                <Link href="/dashboard" className={styles.btnHeroGhost}>
                  See the Dashboard
                </Link>
              </div>
            </div>

            <div id="inbox-hero-preview" className={styles.heroMockWrap}>
              <div className={styles.heroGlow} aria-hidden />
              <div className={`${styles.heroFrame}`}>
                <Image
                  src={heroInboxImage}
                  alt="MindMesh Inbox: unified email list with account filters, search, refresh, and message previews"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg shadow-inner"
                  priority
                />
                <div className="absolute -left-2 -top-2 sm:-left-4 sm:-top-4">
                  <div className={styles.heroBadge}>
                    <span className={styles.heroBadgeDot} aria-hidden />
                    <span className={styles.heroBadgeLabel}>Live Dashboard View</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionBand} px-6 py-24 sm:px-8`}>
          <div className={`${styles.maxGrid} flex flex-col items-center gap-16 md:flex-row md:items-center`}>
            <div className="order-2 w-full md:order-1 md:w-1/2">
              <div className={styles.consolidatedCluster}>
                <div className={styles.consolidatedTopRow}>
                  <div className={styles.consolidatedCardSmall}>
                    <Inbox className={`${styles.iconSvg} mb-3 h-7 w-7 text-sky-400`} aria-hidden />
                    <div className="text-sm font-bold text-slate-100">Workspace A</div>
                  </div>
                  <div className={styles.consolidatedCardSmall}>
                    <Mail className={`${styles.iconSvg} mb-3 h-7 w-7 text-blue-300`} aria-hidden />
                    <div className="text-sm font-bold text-slate-100">Personal Content</div>
                  </div>
                </div>
                <div className={styles.consolidatedCardWide}>
                  <div className="flex min-w-0 items-center gap-4">
                    <div className={styles.consolidatedAvatar} aria-hidden>
                      JM
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-50">Unified View</div>
                      <div className={`${styles.textMuted} text-sm`}>All accounts, one calm stream</div>
                    </div>
                  </div>
                  <Sparkles className={`${styles.iconSvg} h-6 w-6 shrink-0 text-blue-300/80`} aria-hidden />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 md:w-1/2">
              <h2 className={`${styles.textOnSurface} mb-6 text-3xl font-bold leading-tight lg:text-4xl`}>
                A consolidated inbox without the usual chaos.
              </h2>
              <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                See messages across connected accounts in one clear workspace. Less jumping between inboxes,
                less re-orienting yourself — just a steadier read on what actually needs you.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-8">
          <div className={`${styles.glassPanel} ${styles.searchGlassSection} ${styles.maxGrid}`}>
            <div className={styles.searchGlassGradient} aria-hidden />
            <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <h2 className={`${styles.textOnSurface} mb-6 text-3xl font-bold lg:text-4xl`}>
                  Search your work in plain English.
                </h2>
                <p className={`${styles.textMuted} mb-10 text-lg leading-relaxed`}>
                  Find invoices, receipts, follow-ups, and threads by asking the way you&apos;d ask a
                  teammate. No perfect keywords, no guessing sender addresses.
                </p>
                <Link href="#inbox-search-demo" className={styles.linkPrimaryBold}>
                  See Search in Action
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
              <div>
                <div id="inbox-search-demo" className={styles.searchBarMock}>
                  <Search className={`${styles.iconSvg} h-5 w-5 shrink-0 text-slate-500`} aria-hidden />
                  <span className="min-w-0 flex-1 text-sm italic leading-snug text-slate-500 sm:text-base">
                    &quot;Find the invoice from last week&apos;s marketing project&quot;
                  </span>
                  <span className={styles.searchAiBtn}>AI Search</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionBand} px-6 py-24 sm:px-8`}>
          <div className={styles.maxGrid}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-8 lg:col-span-2">
                <h2 className={`${styles.textOnSurface} text-4xl font-bold tracking-tight lg:text-5xl`}>
                  Less triage. More clarity.
                </h2>
                <p className={`${styles.textMuted} max-w-xl text-xl leading-relaxed`}>
                  Inbox is built to lower the mental tax of email — so you can scan, decide, and move on
                  without the usual pile-up anxiety.
                </p>
                <Link href="/features" className={styles.btnOutlineRounded}>
                  Explore MindMesh Features
                </Link>
              </div>
              <div className={styles.cognitiveCard}>
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15">
                    <Brain className={`${styles.iconSvg} h-6 w-6 text-sky-300`} aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-slate-50">Cognitive Ease</h3>
                  <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                    Cleaner density and calmer grouping help your attention land where it should — not on
                    noise.
                  </p>
                </div>
                <div className={styles.cognitiveDots} aria-hidden>
                  <span className={`${styles.cognitiveDot} ${styles.cognitiveDotBlue}`} />
                  <span className={`${styles.cognitiveDot} ${styles.cognitiveDotSky}`} />
                  <span className={`${styles.cognitiveDot} ${styles.cognitiveDotMuted}`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-8">
          <div className={`${styles.maxGrid} grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20`}>
            <div className="order-2 lg:order-1">
              <div className={styles.workspaceGrid}>
                <div className={styles.workspaceTile}>
                  <LayoutGrid className="h-8 w-8" aria-hidden />
                  <span className={styles.workspaceTileMutedLabel}>Dashboard</span>
                </div>
                <div className={`${styles.workspaceTile} ${styles.workspaceTileActive}`}>
                  <Inbox className="h-8 w-8" aria-hidden />
                  <span className={styles.workspaceTileMutedLabel}>Inbox</span>
                </div>
                <div className={styles.workspaceTile}>
                  <CalendarDays className="h-8 w-8" aria-hidden />
                  <span className={styles.workspaceTileMutedLabel}>Calendar</span>
                </div>
                <div className={styles.workspaceTile}>
                  <Library className="h-8 w-8" aria-hidden />
                  <span className={styles.workspaceTileMutedLabel}>App Library</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={`${styles.textOnSurface} mb-6 text-3xl font-bold lg:text-4xl`}>
                Works with the rest of your MindMesh workspace.
              </h2>
              <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                Inbox sits alongside Dashboard, Calendar, the App Library, and the rest of your desktop
                context — so mail is never a silo away from how you actually work.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.sectionBandSoft} px-6 py-24 sm:px-8`}>
          <div className={`${styles.maxGrid} mx-auto max-w-3xl text-center`}>
            <h2 className={`${styles.textOnSurface} mb-8 text-3xl font-bold tracking-tight lg:text-5xl`}>
              Better email flow supports better work-life balance.
            </h2>
            <p className={`${styles.textMuted} mb-12 text-lg leading-relaxed lg:text-xl`}>
              When inbox time is shorter and clearer, it&apos;s easier to stay current without carrying work
              in your head all evening. MindMesh is built for that kind of boundary.
            </p>
            <div className="flex justify-center">
              <div className={styles.lifeBalancePill}>
                <Download className={`${styles.iconSvg} h-5 w-5 text-sky-400`} aria-hidden />
                <span className="font-semibold text-slate-200">MindMesh: Selective by Design.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 px-6 py-24 sm:px-8">
          <div className={`${styles.maxGrid} flex flex-col gap-14 lg:flex-row lg:gap-20`}>
            <div className="lg:w-[32%]">
              <h2 className={`${styles.textOnSurface} mb-4 text-3xl font-bold leading-tight`}>
                Email visibility with privacy-first design.
              </h2>
              <div className={styles.privacyAccent} />
            </div>
            <div className="flex-1 space-y-8">
              <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                Local-first patterns, careful access boundaries, and retrieval that serves you — not a data
                product. Your mail stays oriented around your workflow.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      Icon: ShieldCheck,
                      label: 'Encryption-minded paths for sensitive threads',
                    },
                    { Icon: Star, label: 'You choose what surfaces; nothing noisy by default' },
                    { Icon: Lock, label: 'Designed to minimize over-collection and over-retention' },
                    {
                      Icon: Sparkles,
                      label: 'Smart organization without selling your attention',
                    },
                  ] satisfies { Icon: LucideIcon; label: string }[]
                ).map(({ Icon, label }) => (
                  <div key={label} className={styles.privacyMiniCard}>
                    <Icon className={`${styles.iconSvg} mt-0.5 h-5 w-5 shrink-0 text-sky-400`} aria-hidden />
                    <span className={`${styles.textMuted} text-sm leading-snug`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-28 text-center sm:px-8 sm:py-32">
          <div className={styles.closingBlob} aria-hidden />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className={`${styles.textOnSurface} mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl`}>
              Spend less time digging through email.
            </h2>
            <p className={`${styles.textMuted} mb-12 text-lg leading-relaxed sm:text-xl`}>
              Turn scattered messages across accounts into one clearer, calmer place to think and respond.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/waitlist" className={styles.btnClosingSolid}>
                Try MindMesh
              </Link>
              <Link href="/features" className={styles.btnClosingGhost}>
                See All Features
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
