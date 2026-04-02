import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cloud,
  Compass,
  Mail,
  Eye,
  HardDrive,
  Lightbulb,
  MessageCircle,
  MoreHorizontal,
  Route,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import yesterdaysNarrativeMockup from '@/public/images/yesterdays-narrative-mockup.png';
import styles from './yesterdays-narrative.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const imgBento =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUBHQAjwptYhsZd9aDuJgS2iS2Bw6HddMRNZ1MpxdBZLwpF0BVyegC7lTl82fQVB0_X4U462eMrZa_xVLVL28XfwR9cIndWcRNkPDj_Rp9ZHqlSeN0tyFV8OrEnS_mv71Vg00DVW5rImalAzjOVpF0lowTneOe34FMPAdwYaEJlV02S55TyAxZ2lCj7CBUD9f5RLA68o3f0A90o1rDPzTp3ZCyuNnZVXMTNN9ptdzUnHv8yW_Ss5egmuyxOMTCuTsUAEul7QHE4eE';

const imgWorkflowA =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA0K5tkQFbbZMrxB5hAoUix7te-b_SevU6w-cGM9H4wtZXKWlQnmC71eG8ikxEIwdQ5vuaDCmeU7jFA3Od0IeJrTtmG0qyZGJEuUvjxiHdkh44x6Bi0gEUxTeFTth7Xi0TJB-xzQjiYtRzG-ze-naUHllRxco_qeyAxcVTzNEk8cMobwM2v7Ce7UyZZ52-irkJyMPYylIGGkqNM4qQ77V36HO6xza8n1gZQYjYhywnzUQ4fwZUu7LJw9gNIcRNzeABR0F_FOhJReUQ';

const imgWorkflowB =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC9u9_a2_mcVFOQgluJYJNQQ6M7HFR0F8yGPMx-IALlIl8plMxK7D-38QbxPsHQeCucpr4pGDj0cVswLk9HHWfKa_LpGcJjBa25AvYAalIWYITTo3aXHTVTRImcwfdQ89UAqIGTVZogkqSOEWfFY4IuP0fUSDjXvfXRZXcKByflqhNb3HQ1hGnMPUCll1fZUp_taqdloE8NCCHEwiPReJG29Ua5snqZM0FjLS1aShD72NbGrqVoyioqy0qGhwwV1uhSOzh5awANqxw';

export const metadata: Metadata = {
  title: "Yesterday's Narrative",
  description:
    "Yesterday's Narrative turns the previous day into a clear, structured recap so you can remember what mattered and move into today with less mental residue.",
  openGraph: {
    title: "MindMesh | Yesterday's Narrative",
    description:
      'End the noise. Keep the signal — a human recap of your prior day, built for memory and focus.',
    url: 'https://mindmesh.global/yesterdays-narrative',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MindMesh | Yesterday's Narrative",
    description:
      'End the noise. Keep the signal — a human recap of your prior day, built for memory and focus.',
    images: [OG_IMAGE_URL],
  },
};

const workflowPills = ['Dashboard', 'Inbox', 'Upcoming Events', 'Yesterday Narrative', 'App Library'] as const;

export default function YesterdaysNarrativePage() {
  return (
    <div className={`dark ${manrope.variable} ${styles.page}`}>
      <SiteNav navBackgroundColor="#060e20" />

      <main className={styles.main}>
        {/* Hero */}
        <section className={`${styles.max2xl} mb-32 px-8 pt-28`}>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="max-w-2xl space-y-8">
              <div className={styles.heroTag}>Yesterday&apos;s Narrative</div>
              <h1
                className={`${styles.textOnSurface} text-6xl font-extrabold leading-[1.1] tracking-tight md:text-7xl`}
              >
                Yesterday summary
                <br />
                without the inbox crawl.
              </h1>
              <p className={`${styles.textMuted} text-xl leading-relaxed`}>
                Turn yesterday&apos;s noise into a structured recap: what moved, what&apos;s still open,
                and what deserves your attention today—without drowning in raw activity.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#narrative-preview" className={styles.btnHeroGradient}>
                  See Yesterday&apos;s Narrative
                </a>
                <Link href="/dashboard" className={styles.btnHeroGhost}>
                  Explore the Dashboard
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className={styles.heroGlow} aria-hidden />
              <div id="narrative-preview" className={styles.glassPanel}>
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: '#0e69dc' }}
                    >
                      <Sparkles className="h-5 w-5 text-white" aria-hidden strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className={`${styles.textOnSurface} text-lg font-bold`}>
                        Yesterday&apos;s Narrative
                      </h3>
                    </div>
                  </div>
                  <MoreHorizontal className={`${styles.textMuted} h-6 w-6`} aria-hidden strokeWidth={2} />
                </div>
                <div className="space-y-6">
                  <div className={styles.mockCoreThread}>
                    <p className={`${styles.textOnSurface} font-medium leading-relaxed`}>
                    Yesterday mixed inbox triage with scheduled focus: 
                    a long vendor thread mid-morning, two back-to-back meetings after lunch, 
                    and four replies still waiting on you.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={styles.mockMiniCard}>
                      <BookOpen className={`${styles.textTertiary} mb-2 h-6 w-6`} aria-hidden strokeWidth={2} />
                      <div className={`${styles.textOnSurface} text-sm font-bold`}>Journaling</div>
                      <p className={`${styles.textMuted} text-xs`}>
                      The threads and meetings that actually defined the day, in one short read                      </p>
                    </div>
                    <div className={styles.mockMiniCard}>
                      <Lightbulb className={`${styles.textPrimary} mb-2 h-6 w-6`} aria-hidden strokeWidth={2} />
                      <div className={`${styles.textOnSurface} text-sm font-bold`}>Highlights</div>
                      <p className={`${styles.textMuted} text-xs`}>
                      Your main emails and meetings from yesterday, in short.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex -space-x-2">
                    <div
                      className={styles.avatarStackItem}
                      style={{ backgroundColor: '#182b52' }}
                      aria-hidden
                    />
                    <div
                      className={styles.avatarStackItem}
                      style={{ backgroundColor: '#699cff' }}
                      aria-hidden
                    />
                    <div
                      className={styles.avatarStackItem}
                      style={{ backgroundColor: '#919bff' }}
                      aria-hidden
                    />
                  </div>
                  <a href="#narrative-preview" className={styles.resumeLink}>
                    Read more <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real memory */}
        <section className={`${styles.maxXl} mb-48 px-8`}>
          <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center">
            <h2
              className={`${styles.textOnSurface} text-4xl font-bold leading-tight tracking-tight md:text-5xl`}
            >
              A recap designed for real memory, not more information overload.
            </h2>
            <p className={`${styles.textMuted} text-lg leading-relaxed`}>
              Most tools show a firehose of activity. MindMesh helps you understand it. Yesterday&apos;s
              Narrative is a calmer, human-shaped summary so you remember the arc of the day—not every
              ping.
            </p>
          </div>
          <div className={styles.imageBand}>
            <Image
              src={yesterdaysNarrativeMockup}
              alt="Yesterday&apos;s Narrative card: day summary, emails, events, highlights, and todos"
              width={560}
              height={420}
              className={styles.imageBandImg}
              unoptimized
            />
            <div className={styles.imageBandGrad} aria-hidden />
          </div>
        </section>

        {/* Unfinished threads */}
        <section className={`${styles.max2xl} mb-48 px-8`}>
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="order-2 w-full md:order-1 md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className={`${styles.threadTile} ${styles.threadTileDefault} group`}>
                  <MessageCircle
                    className={`${styles.textPrimary} h-10 w-10 transition-transform group-hover:scale-110`}
                    aria-hidden
                    strokeWidth={1.5}
                  />
                  <div className={`${styles.textOnSurface} font-bold`}>Conversation Threads</div>
                </div>
                <div className={`${styles.threadTile} ${styles.threadTileHigh} ${styles.threadTileOffsetDown}`}>
                  <CheckCircle2 className={`${styles.textTertiary} h-10 w-10`} aria-hidden strokeWidth={1.5} />
                  <div className={`${styles.textOnSurface} font-bold`}>Pending Decisions</div>
                </div>
                <div
                  className={`${styles.threadTile} ${styles.threadTileHighest} ${styles.threadTileOffsetUp}`}
                >
                  <Lightbulb
                    className="h-10 w-10"
                    style={{ color: '#699cff' }}
                    aria-hidden
                    strokeWidth={1.5}
                  />
                  <div className={`${styles.textOnSurface} font-bold`}>Unresolved Ideas</div>
                </div>
                <div className={`${styles.threadTile} ${styles.threadTileDefault}`}>
                  <Compass className={`${styles.textSecondary} h-10 w-10`} aria-hidden strokeWidth={1.5} />
                  <div className={`${styles.textOnSurface} font-bold`}>Exploration Points</div>
                </div>
              </div>
            </div>
            <div className="order-1 w-full space-y-8 md:order-2 md:w-1/2">
              <h2
                className={`${styles.textOnSurface} text-4xl font-bold leading-tight tracking-tight md:text-5xl`}
              >
                Reconnect with unfinished threads faster.
              </h2>
              <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                Surface the conversations and moments that still matter so you can reopen the right
                thread in the dashboard—without the vague stress of &quot;what did I miss?&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Bento */}
        <section className={`${styles.max2xl} mb-48 px-8`}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className={`md:col-span-2 ${styles.bentoLarge}`}>
              <div>
                <h2 className={`${styles.textOnSurface} mb-6 text-4xl font-bold`}>
                  Context that helps you move forward.
                </h2>
                <p className={`${styles.textMuted} max-w-lg text-lg leading-relaxed`}>
                Not a raw inbox dump—a short story of yesterday from your email 
                and calendar: what moved, what needs a decision, and what to carry into today.
                </p>
              </div>
              <Image
                src={imgBento}
                alt="Abstract glowing teal fiber strands in dark space"
                width={1200}
                height={640}
                className={styles.bentoLargeImage}
                unoptimized
              />
              <Link href="/dashboard" className={styles.bentoActionLink}>
                <Route className="h-4 w-4 shrink-0" aria-hidden strokeWidth={2} />
                See yesterday’s narrative
              </Link>
            </div>
            <div className={styles.bentoTall}>
              <div className={styles.bentoIconWrap}>
                <Mail className="h-8 w-8" aria-hidden strokeWidth={2} />
              </div>
              <h2 className={`${styles.textOnSurface} text-3xl font-bold leading-tight`}>
                Built for calmer mornings and cleaner shutdowns.
              </h2>
              <p className={`${styles.textMuted} leading-relaxed`}>
              When yesterday is summarized for you, you start the day knowing what matters—and 
              it’s easier to shut the laptop without replaying every thread in your head.
              </p>
              <Link href="" className={styles.bentoCardFooterLink}>
                Open MindMesh
                <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className={styles.workflowSection}>
          <div className={`${styles.max2xl} px-8`}>
            <div className="grid items-center gap-20 lg:grid-cols-2">
              <div className="space-y-8">
                <h2
                  className={`${styles.textOnSurface} text-4xl font-bold leading-tight md:text-5xl`}
                >
                  Where yesterday meets
                   <br /> 
                  today—inside MindMesh.
                </h2>
                <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                Open the app: yesterday summarized, today’s mail and calendar one step away—same place, same flow.
                </p>
                <div className="flex flex-wrap gap-3">
                  {workflowPills.map((label) => (
                    <span key={label} className={styles.pill}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className={styles.workflowImageCell}>
                    <Image
                      src={imgWorkflowA}
                      alt="Abstract curved lines in deep blue"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className={`${styles.workflowImageCell} ${styles.workflowImageCellOffset}`}>
                    <Image
                      src={imgWorkflowB}
                      alt="Glowing concentric circles on dark navy"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className={`${styles.maxXl} mb-48 px-8`}>
          <div className={styles.privacyGlass}>
            <div className={styles.privacyBlob} aria-hidden />
            <div className="relative z-10 grid gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <div className={styles.privacyLabel}>
                  <Shield className="h-5 w-5 shrink-0" aria-hidden strokeWidth={2} />
                  <span>Privacy Framework</span>
                </div>
                <h2 className={`${styles.textOnSurface} text-4xl font-bold`}>
                  Reflection without compromising privacy.
                </h2>
                <p className={`${styles.textMuted} text-lg leading-relaxed`}>
                  Your recap is built to deepen self-understanding—not to expose you. Data is handled
                  with restraint, clarity, and a local-first mindset wherever possible.
                </p>
              </div>
              <div className="grid gap-6">
                {(
                  [
                    {
                      Icon: HardDrive,
                      title: 'Local-First Architecture',
                      body: 'Resides on your device first, so your context stays closer to home.',
                    },
                    {
                      Icon: Eye,
                      title: 'Self-Understanding',
                      body: 'Built for your personal growth and sense-making—not generic profiling.',
                    },
                    {
                      Icon: Users,
                      title: 'Human-Centric',
                      body: 'Designed around your workflow, attention, and boundaries—not engagement hacks.',
                    },
                    {
                      Icon: Sparkles,
                      title: 'Clarity First',
                      body: 'Focused on what matters to you—not on maximizing raw data collection.',
                    },
                  ] as const
                ).map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={styles.privacyListIcon}>
                      <Icon className={`${styles.iconSvg} h-5 w-5`} aria-hidden strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className={`${styles.textOnSurface} mb-1 font-bold`}>{title}</h4>
                      <p className={`${styles.textMuted} text-sm`}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={`${styles.maxCta} space-y-10 px-8 text-center`}>
          <h2 className={`${styles.textOnSurface} text-5xl font-extrabold leading-tight`}>
            Remember what mattered. <br />
            <span className={styles.textMuted}>Let go of what didn&apos;t.</span>
          </h2>
          <p className={`${styles.textMuted} text-xl`}>
            Yesterday&apos;s Narrative helps turn yesterday&apos;s work into today&apos;s clarity.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
            <Link href="/waitlist" className={styles.btnClosingPrimary}>
              Try MindMesh
            </Link>

          </div>
        </section>
      </main>

    </div>
  );
}
