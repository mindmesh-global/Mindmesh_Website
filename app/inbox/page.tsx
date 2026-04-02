import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Brain,
  Check,
  CheckCircle2,
  Filter,
  Flower2,
  GraduationCap,
  Inbox,
  LayoutGrid,
  Mail,
  Network,
  Search,
  Shield,
  Sparkles,
  UserRound,
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

        <div className={styles.belowHero}>
          {/* Section 1: Consolidated — Stitch HTML */}
          <section className={`${styles.sectionStitchLow} px-6 py-24 sm:px-8`}>
            <div className={`${styles.maxGrid} ${styles.maxGrid7xl} flex flex-col items-center gap-16 md:flex-row md:items-center`}>
              <div className="order-2 w-full md:order-1 md:w-1/2">
                <div className={styles.refConsolidatedGrid}>
                  <div className={`${styles.refConsolidatedSmall} ${styles.refAccountFiltered}`}>
                    <span className={styles.refFilteredPill}>Filtered</span>
                    <Mail className={`${styles.iconSvg} h-8 w-8`} style={{ color: 'var(--mm-tertiary)' }} aria-hidden />
                    <div className="text-xs font-bold uppercase tracking-wider text-[#99aad9]">Connected</div>
                    <div className="w-full truncate text-sm font-semibold text-[#dee5ff]" title="you@work.dev">
                      you@work.dev
                    </div>
                  </div>
                  <div className={`${styles.refConsolidatedSmall} ${styles.refAccountIdle}`}>
                    <AtSign className={`${styles.iconSvg} h-8 w-8`} style={{ color: 'var(--mm-primary-tint)' }} aria-hidden />
                    <div className="text-xs font-bold uppercase tracking-wider text-[#99aad9]">Connected</div>
                    <div className="w-full truncate text-sm font-semibold text-[#dee5ff]" title="alex.personal@gmail.com">
                      alex.personal@gmail.com
                    </div>
                    <p className={styles.refSwitchHint}>Switch filter to view this mailbox</p>
                  </div>
                  <div className={styles.refConsolidatedWide}>
                    <div className={styles.refConsolidatedWideMain}>
                      <div className={styles.refFilterOrb} aria-hidden>
                        <Filter className="h-5 w-5" strokeWidth={2.25} />
                      </div>
                      <div className={styles.refFilterWideCopy}>
                        <div className={styles.refFilterEyebrow}>Mailbox filter</div>
                        <div className={styles.refFilterChipRow}>
                          <span className={styles.refFilterChipOn}>
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                            you@work.dev
                          </span>
                          <span className={styles.refFilterChipOff} title="alex.personal@gmail.com">
                            alex.personal@gmail.com
                          </span>
                        </div>
                        <p className={styles.refFilterHelper}>
                          Inbox list updates instantly — only threads from the selected address are shown. Pick
                          another chip anytime to jump accounts without leaving MindMesh.
                        </p>
                      </div>
                    </div>
                    <div className={styles.refFilterConfirmed} aria-hidden>
                      <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 md:w-1/2">
                <h2 className={`${styles.textOnSurface} mb-6 text-3xl font-bold leading-tight lg:text-4xl`}>
                  Filter by email when several accounts are connected.
                </h2>
                <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                  Connect multiple mail IDs and still stay focused: add a mailbox filter to isolate one
                  address at a time. MindMesh shows only messages for that account — switch filters when you
                  need another inbox, without signing out or losing context. One workspace, many accounts, the
                  right mail on screen whenever you want it.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Search */}
          <section className="px-6 py-24 sm:px-8">
            <div className={`${styles.glassCardStitch} ${styles.refSearchShell} ${styles.maxGrid} ${styles.maxGrid7xl}`}>
              <div className={styles.refSearchGradient} aria-hidden />
              <div className={styles.searchSplit}>
                <div className={styles.searchColLeft}>
                  <h2 className={`${styles.textOnSurface} mb-6 max-w-2xl text-3xl font-bold lg:text-4xl`}>
                    Search your Mail here.
                  </h2>
                  <p className={`${styles.textMuted} mb-10 max-w-2xl text-lg leading-relaxed`}>
                    Find receipts, invoices, follow-ups, updates, and important threads by asking naturally.
                    MindMesh is designed to help users get to the right message faster without forcing them to
                    remember exact senders or keywords.
                  </p>
                  <div id="inbox-search-demo" className={styles.refSearchBar}>
                    <Search className={`${styles.iconSvg} h-6 w-6 shrink-0`} style={{ color: 'var(--mm-on-variant)' }} aria-hidden />
                    <span
                      className={`${styles.textMuted} min-w-0 flex-1 text-sm italic sm:text-base`}
                      style={{ opacity: 0.75 }}
                    >
                      &quot;Find the contract from June about the branding project&quot;
                    </span>
                    <span className={styles.refSearchAiBtn}> Search</span>
                  </div>
                </div>
                <div className={styles.searchVisual} aria-hidden>
                  <div className={styles.searchMeshGlow} />
                  <svg className={styles.searchMeshSvg} viewBox="0 0 400 320" fill="none" aria-hidden>
                    <path
                      d="M72 52 L198 118 L320 64 M198 118 L256 228 M198 118 L88 218"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                    <circle cx="72" cy="52" r="5" fill="currentColor" opacity="0.45" />
                    <circle cx="320" cy="64" r="5" fill="currentColor" opacity="0.45" />
                    <circle cx="256" cy="228" r="5" fill="currentColor" opacity="0.45" />
                    <circle cx="88" cy="218" r="5" fill="currentColor" opacity="0.45" />
                    <circle cx="198" cy="118" r="7" fill="currentColor" opacity="0.65" />
                  </svg>
                  <div className={`${styles.searchCardWrap} ${styles.searchCardWrapA}`}>
                    <div className={styles.searchFloatingCard}>
                      <div className={styles.searchCardIcon}>
                        <Mail className="h-4 w-4" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <div className={styles.searchCardMeta}>Top match</div>
                        <div className={styles.searchCardTitle}>Branding contract — June</div>
                        <div className={styles.searchCardSub}>Legal · PDF · 94% relevance</div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.searchCardWrap} ${styles.searchCardWrapB}`}>
                    <div className={styles.searchFloatingCard}>
                      <div className={styles.searchCardIcon}>
                        <Sparkles className="h-4 w-4" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <div className={styles.searchCardMeta}> summary</div>
                        <div className={styles.searchCardTitle}>“June branding” across 3 threads</div>
                        <div className={styles.searchCardSub}>Merged context · English</div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.searchCardWrap} ${styles.searchCardWrapC}`}>
                    <div className={styles.searchFloatingCard}>
                      <div className={styles.searchCardIcon}>
                        <Inbox className="h-4 w-4" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <div className={styles.searchCardMeta}>Also found</div>
                        <div className={styles.searchCardTitle}>Re: Q3 marketing budget</div>
                        <div className={styles.searchCardSub}>Finance · 2 attachments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Triage */}
          <section className={`${styles.sectionStitchLow} px-6 py-24 sm:px-8`}>
            <div className={`${styles.maxGrid} ${styles.maxGrid7xl}`}>
              <div className={styles.triageGrid}>
                <div className={styles.triageMain}>
                  <h2 className={`${styles.textOnSurface} text-4xl font-bold tracking-tight lg:text-5xl`}>
                    Less triage. More clarity.
                  </h2>
                  <p className={`${styles.textMuted} max-w-xl text-xl leading-relaxed`}>
                    Inbox is built to reduce the mental overhead of email. It helps users scan conversations
                    and identify important messages faster so the day feels manageable.
                  </p>
                  <Link href="/connected-apps" className={styles.btnTriageOutline}>
                    Connect your Mail Accounts to manage your inbox
                  </Link>
                </div>
                <div className={styles.cognitiveCardStitch}>
                  <div className="space-y-4">
                    <div className={styles.cognitiveIconWrap}>
                      <Brain className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="text-xl font-bold text-[#dee5ff]">Cognitive Ease</h3>
                    <p className={`${styles.textMuted} text-sm leading-relaxed`}>
                      Reduced visual density allows your brain to process information without the typical
                      &quot;inbox anxiety.&quot;
                    </p>
                  </div>
                  <div className={styles.cognitiveAvatarStack} aria-hidden>
                    <span className={`${styles.cognitiveAvatar} ${styles.cognitiveAvatarBlue}`} />
                    <span className={`${styles.cognitiveAvatar} ${styles.cognitiveAvatarSecondary}`} />
                    <span className={`${styles.cognitiveAvatar} ${styles.cognitiveAvatarTertiary}`} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Workspace grid */}
          <section className="px-6 py-24 sm:px-8">
            <div className={`${styles.maxGrid} ${styles.maxGrid7xl} grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20`}>
              <div className="order-2 lg:order-1">
                <div className={styles.workspaceGrid}>
                  <div className={styles.workspaceTileStitch}>
                    <LayoutGrid className="h-8 w-8" aria-hidden />
                    <span className={styles.workspaceTileMutedLabel}>Dashboard</span>
                  </div>
                  <div className={`${styles.workspaceTileStitch} ${styles.workspaceTileStitchActive}`}>
                    <Inbox className="h-8 w-8" aria-hidden />
                    <span className={styles.workspaceTileMutedLabel}>Inbox</span>
                  </div>
                  <div className={styles.workspaceTileStitch}>
                    <Sparkles className="h-8 w-8" aria-hidden />
                    <span className={styles.workspaceTileMutedLabel}>Mascot</span>
                  </div>
                  <div className={styles.workspaceTileStitch}>
                    <GraduationCap className="h-8 w-8" aria-hidden />
                    <span className={styles.workspaceTileMutedLabel}>Narrative</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className={`${styles.textOnSurface} mb-6 text-3xl font-bold lg:text-4xl`}>
                  Works with the rest of your MindMesh workspace.
                </h2>
                <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                  Inbox is part of a broader desktop system that includes Dashboard, Upcoming Events, Sensor,
                  Mascot, Yesterday&apos;s Narrative, and the App Library. Email is no longer isolated from
                  the rest of your work context.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Life balance */}
          <section className={`${styles.sectionLifeGradient} px-6 py-24 sm:px-8`}>
            <div className={`${styles.maxGrid} ${styles.maxGrid7xl} mx-auto max-w-4xl text-center`}>
              <h2 className={`${styles.textOnSurface} mb-8 text-3xl font-bold tracking-tight lg:text-5xl`}>
                Better email flow supports better work-life balance.
              </h2>
              <p className={`${styles.textMuted} mb-12 text-xl leading-relaxed`}>
                When checking email takes less effort, it is easier to stay caught up without staying mentally
                attached to work all day. MindMesh Inbox helps users reduce account switching and find what
                they need faster.
              </p>

            </div>
          </section>

          {/* Section 6: Privacy */}
          <section className={`px-6 py-24 sm:px-8 ${styles.privacyBorderStitch}`}>
            <div className={`${styles.maxGrid} ${styles.maxGrid7xl} flex flex-col gap-16 lg:flex-row`}>
              <div className="lg:w-1/3">
                <h2 className={`${styles.textOnSurface} mb-4 text-3xl font-bold`}>
                  Email visibility with privacy-first design.
                </h2>
                <div className="h-1 w-12 rounded-full bg-[#0e69dc]" />
              </div>
              <div className="flex-1 space-y-8 lg:w-2/3">
                <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                  MindMesh is built around a local-first, privacy-conscious architecture. It is designed to
                  organize and retrieve your connected work context with care, helping you stay productive
                  without turning your inbox into a data product.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {(
                    [
                      { Icon: BadgeCheck, label: 'Local-first architecture designed for privacy' },
                      { Icon: Network, label: 'Built for intelligent retrieval and organization' },
                      { Icon: Shield, label: 'Secure handling for sensitive data paths' },
                      { Icon: UserRound, label: 'Designed to help you work with your data' },
                    ] satisfies { Icon: LucideIcon; label: string }[]
                  ).map(({ Icon, label }) => (
                    <div key={label} className={styles.privacyRow}>
                      <Icon className={`${styles.privacyRowIcon} h-6 w-6`} aria-hidden />
                      <div className={`${styles.textMuted} text-sm leading-snug`}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Closing CTA */}
          <section className="relative overflow-hidden px-6 py-28 text-center sm:px-8 sm:py-32">
            <div className={styles.closingBlob} aria-hidden />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className={`${styles.textOnSurface} mb-8 text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl`}>
                Spend less time digging through email.
              </h2>
              <p className={`${styles.textMuted} mb-12 text-xl leading-relaxed`}>
                MindMesh Inbox turns scattered messages across accounts into a clearer, calmer workspace.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {/* <Link href="/waitlist" className={styles.btnClosingSolid}>
                  Try MindMesh
                </Link> */}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
