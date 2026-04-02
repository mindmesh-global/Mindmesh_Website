import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import {
  Bot,
  FileText,
  FolderOpen,
  Mail,
  Calendar,
  Calculator,
  Search,
  Sparkles,
  UserCircle2,
} from 'lucide-react';
import SiteNav from '@/components/layout/SiteNav';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/seo';
import styles from './sensor&mascot.module.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sensor & Mascot',
  description:
    'See how Sensor and Mascot work together in MindMesh to reduce cognitive load and make daily work feel calmer.',
  openGraph: {
    title: 'MindMesh Sensor & Mascot',
    description:
      'Explore how Sensor and Mascot work together to create a faster, calmer workflow in MindMesh.',
    url: 'https://mindmesh.global/sensor&mascot',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMesh Sensor & Mascot',
    description:
      'Explore how Sensor and Mascot work together to create a faster, calmer workflow in MindMesh.',
    images: [OG_IMAGE_URL],
  },
};

const sensorPrompts = [
  '"Do I have meetings tomorrow?"',
  '"Find invoices from Acme last month"',
  '"Open Calculator"',
  '"How do you spell accommodate?"',
] as const;

const loadCards = [
  {
    icon: FolderOpen,
    title: 'Less hunting',
    description:
      'Email, calendar, and answers from synced MindMesh data—less digging through mail and menus.',
  },
  {
    icon: FileText,
    title: 'Fewer tabs',
    description:
      'One command bar, one companion chat—fewer hops to launch apps, convert, or ask what changed.',
  },
  {
    icon: Sparkles,
    title: 'Less context switching',
    description:
      'Pick up from what MindMesh already knows instead of reloading every tool to remember what mattered.',
  },
] as const;

const footerGroups = [
  {
    title: 'Product',
    links: ['Features', 'Sensor', 'Mascot', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Security', 'Terms', 'Privacy'],
  },
  {
    title: 'Resources',
    links: ['Status', 'Support', 'Guides', 'API'],
  },
] as const;

export default function SensorAndMascotPage() {
  return (
    <main
      className={`${manrope.className} ${styles.page} selection:bg-[#0e69dc] selection:text-white`}
    >
      <SiteNav navBackgroundColor="rgba(2, 6, 23, 0.8)" />

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>
              Ask faster. Act faster.
              <br />
              Stay calmer.
            </h1>
            <p className={styles.heroText}>
              Sensor gives you instant command-bar speed. Mascot gives you a proactive AI
              companion. Together, they make MindMesh feel effortless to use throughout the day.
            </p>
            <div className={styles.heroCta}>
              <button type="button" className={styles.primaryButton}>
                See Sensor and Mascot
              </button>
            </div>
          </div>

          <div className={styles.heroVisualFrame}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9V_vAzfBc2IM6w7joyiUgwxsnYjWtdDYVXRZ0wYetCvAbwT0RW3vc9RST7dSD3GGhuRqe7VB-PYggE2dvhlDmnDEkS1iv2-xN9GPu0u5WBOcDJ6uxKmHiFfCQ-n8cH_F9zSmg9B8uYnt7ExoYrg2VdLd8t5IXKbbCi2qV3_Jb7nDPEwVcVh5qNk0EoNEiBWyIY1fiVJ_GCNNBizuGlyTnDa8E61aYS79cRTNzcNi-HKDB6JxtcgARKqYD0Ut8EcnAS2kMD-8NGmU"
              alt="MindMesh interface overview"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
        </div>
      </section>

      <section id="sensor" className={styles.surfaceBand}>
        <div className={`${styles.container} ${styles.splitGrid}`}>
          <div>
            <span className={styles.eyebrow}>The Interface</span>
            <h2 className={styles.sectionTitle}>Sensor is your universal command bar for work and everyday tasks.</h2>
            <p className={styles.sectionText}>
              Open Sensor and type what you need. Open apps,
              run quick calculations, convert time, units, and currency, 
              and get instant answers without breaking your flow.
            </p>
            <div className={styles.promptRow}>
              {sensorPrompts.map((prompt) => (
                <span key={prompt} className={styles.promptChip}>
                  {prompt}
                </span>
              ))}
            </div>

          </div>

          <div className={styles.glassCard}>
            <div className={styles.commandPanel}>
              <div className={styles.commandInput}>
                <Search className="h-5 w-5 text-[#adc6ff]" />
                <span className={styles.commandPlaceholder}>
                  Open <strong>Cal</strong>...
                </span>
                <div className={styles.kbdRow}>
                  <kbd className={styles.kbd}>⏎</kbd>
                  
                </div>
              </div>
              <div className={styles.commandResult}>
                <Calendar className="h-5 w-5 text-[#adc6ff]" />
                <span>Calendar</span>
                <span className={styles.commandHint}>Enter</span>
              </div>
              <div className={`${styles.commandResult} ${styles.commandResultMuted}`}>
                <Calculator className="h-5 w-5 text-[#adc6ff]" />
                <span>Calculator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mascot" className={styles.standardSection}>
        <div className={`${styles.container} ${styles.splitGrid}`}>
          <div className={styles.chatPreviewWrap}>
            <div className={styles.chatPreview}>
              <div className={styles.chatGlow} />
              <div className={styles.chatBubbleRow}>
                <div className={styles.avatarShell}>
                  <UserCircle2 className="h-4 w-4 text-[#dee5ff]" />
                </div>
                <div className={styles.userBubble}> Did I get any emails today?</div>
              </div>
              <div className={`${styles.chatBubbleRow} ${styles.chatBubbleRowReverse}`}>
                <div className={`${styles.avatarShell} ${styles.avatarAccent}`}>
                  <Bot className="h-4 w-4 text-[#00055a]" />
                </div>
                <div className={styles.assistantBubble}>
                  <p>
                    Yes, you received 12 emails today.
                    <br /><br />
                     Here's the breakdown: 7 work, 3 personal, 2 newsletters.
                    <br /><br />
                    Here are the latest 10 emails:
                    <br /><br />
                    
                    You can review all 12 emails in your Mindmesh dashboard.
                  </p>
                  <button type="button" className={styles.inlineTextButton}>
                    Show mentions
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className={`${styles.eyebrow} ${styles.eyebrowAlt}`}>The Companion</span>
            <h2 className={styles.sectionTitle}>Mascot is your conversational layer on top of your work.</h2>
            <p className={styles.sectionText}>
            Mascot turns scattered updates into a single conversation. Ask what changed, what matters, 
            or what’s next, and get answers grounded in the email, calendar, and memory MindMesh has for you.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.darkBand}>
        <div className={styles.narrowContainer}>
          <h2 className={styles.sectionTitle}>Faster than searching. Calmer than multitasking.</h2>
          <p className={styles.sectionText}>
            Sensor and Mascot are both designed to reduce cognitive load. You spend less time
            remembering where things live, less time opening tabs, and less time re-orienting
            yourself after interruptions.
          </p>
          <div className={styles.featureGrid}>
            {loadCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className={styles.featureCard}>
                <div className={styles.featureCardTop}>
                  <div className={styles.featureIconWrap} aria-hidden>
                    <Icon className="h-5 w-5 text-[#adc6ff]" strokeWidth={2} />
                  </div>
                  <h3 className={styles.featureTitle}>{title}</h3>
                </div>
                <p className={styles.featureDescription}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.standardSection}>
        <div className={`${styles.container} ${styles.splitGrid}`}>
          <div>
            <h2 className={styles.sectionTitle}>
              A futuristic interface that still feels human.
            </h2>
            <p className={styles.sectionText}>
              MindMesh combines speed, memory, and guidance in a way that feels closer to a real
              desktop assistant than a static productivity app.
            </p>
          </div>
          <div className={styles.imageCard}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9V_vAzfBc2IM6w7joyiUgwxsnYjWtdDYVXRZ0wYetCvAbwT0RW3vc9RST7dSD3GGhuRqe7VB-PYggE2dvhlDmnDEkS1iv2-xN9GPu0u5WBOcDJ6uxKmHiFfCQ-n8cH_F9zSmg9B8uYnt7ExoYrg2VdLd8t5IXKbbCi2qV3_Jb7nDPEwVcVh5qNk0EoNEiBWyIY1fiVJ_GCNNBizuGlyTnDa8E61aYS79cRTNzcNi-HKDB6JxtcgARKqYD0Ut8EcnAS2kMD-8NGmU"
              alt="Sleek workspace interface"
              className={styles.sideImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.narrowContainer}>
          <h2 className={styles.ctaTitle}>The fastest way to feel in control again.</h2>
          <p className={styles.sectionText}>
            Use MindMesh to ask, navigate, and act in one continuous flow.
          </p>
          <div className={styles.ctaRow}>
            <button type="button" className={styles.primaryButton}>
              Try MindMesh
            </button>
            <button type="button" className={styles.secondaryOutlineButton}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
