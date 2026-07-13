/**
 * Sensor + Mascot marketing depth content (P8-T04).
 * Copy locked in P8-T03; Sensor theater fixtures aligned with P8-T05.
 * Pages (P8-T10 / P8-T12) and demos (P8-T09 / P8-T11) should import from here.
 */

export const SENSOR_MASCOT_RELATIONSHIP_LINE =
  'Sensor is for instant action. Mascot is for ongoing conversation. Together they reduce hunting, tabs, and context switching, without replacing Connect / Focus / Execute as the homepage story.' as const;

export type SensorMascotComparisonRow = {
  label: string;
  sensor: string;
  mascot: string;
};

/** Shared “When to use Sensor vs Mascot” strip (both pages). */
export const SENSOR_MASCOT_COMPARISON_ROWS: readonly SensorMascotComparisonRow[] = [
  {
    label: 'Best for',
    sensor: 'Instant commands and jumps',
    mascot: 'Questions that need context',
  },
  {
    label: 'Feels like',
    sensor: 'A command bar',
    mascot: 'A calm conversation',
  },
  {
    label: 'Example',
    sensor: 'Open Calendar',
    mascot: 'Did I get any emails today?',
  },
] as const;

export const SENSOR_MASCOT_COMPARISON = {
  eyebrow: 'When to use which',
  title: 'Sensor vs Mascot',
  relationshipLine: SENSOR_MASCOT_RELATIONSHIP_LINE,
  rows: SENSOR_MASCOT_COMPARISON_ROWS,
  sensorSiblingCta: { label: 'Explore Mascot →', href: '/mascot' },
  mascotSiblingCta: { label: 'Explore Sensor →', href: '/sensor' },
} as const;

export const SENSOR_MASCOT_PRIVACY = {
  line: 'Sensor and Mascot work from the same local-first MindMesh layer. Read-only connections where it matters.',
  link: { label: 'Learn about security →', href: '/security' },
} as const;

export const SENSOR_MASCOT_CTA = {
  headline: 'Connect your apps. Find what matters. Get it done.',
  body: 'Join the waitlist for early access to MindMesh.',
  primary: { label: 'Join waitlist', href: '/#cta' },
} as const;

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
};

export type CapabilityItem = {
  title: string;
  description: string;
};

export type DepthPageChrome = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backHref: '/';
    backLabel: string;
  };
  howItWorks: {
    title: string;
    steps: readonly HowItWorksStep[];
  };
  theater: {
    title: string;
    subtitle: string;
    caption: string;
    footer: { label: string; href: string };
  };
  capabilities: {
    title: string;
    items: readonly CapabilityItem[];
  };
  featureGridCard: {
    title: string;
    description: string;
    href: string;
    linkLabel: string;
  };
};

// ---------------------------------------------------------------------------
// Sensor
// ---------------------------------------------------------------------------

export const SENSOR_PAGE_CONTENT: DepthPageChrome = {
  metadata: {
    title: 'Sensor',
    description:
      'Universal command bar for work and everyday tasks. Type what you need and act without leaving your flow.',
    ogTitle: 'MindMesh | Sensor',
  },
  hero: {
    eyebrow: 'Sensor',
    title: 'Your universal command bar for work and everyday tasks.',
    subtitle:
      'Type what you need: open apps, calculate, convert, ask quick questions, and jump without leaving flow.',
    backHref: '/',
    backLabel: 'Back to homepage →',
  },
  howItWorks: {
    title: 'How Sensor works',
    steps: [
      {
        number: '01',
        title: 'Open Sensor',
        description: 'Call up the bar from anywhere in MindMesh.',
      },
      {
        number: '02',
        title: 'Type an intent',
        description: 'Short commands or questions: open, find, convert, ask.',
      },
      {
        number: '03',
        title: 'Confirm and go',
        description: 'Pick a result and MindMesh acts without a tab hunt.',
      },
    ],
  },
  theater: {
    title: 'See Sensor in action.',
    subtitle: 'A short command becomes a clear result, then an action you can trust.',
    caption: 'Sensor finds Calendar from a short command without leaving your flow.',
    footer: { label: 'Explore Mascot →', href: '/mascot' },
  },
  capabilities: {
    title: 'What Sensor can do',
    items: [
      {
        title: 'Open and jump',
        description: 'Launch apps and destinations from one bar.',
      },
      {
        title: 'Quick answers',
        description: 'Spelling, conversions, and short facts without a new tab.',
      },
      {
        title: 'Find in context',
        description: 'Pull meetings, files, or threads MindMesh already knows.',
      },
      {
        title: 'Stay in flow',
        description: 'Act and return without rebuilding your mental stack.',
      },
    ],
  },
  featureGridCard: {
    title: 'Sensor',
    description: 'Command bar for work and everyday tasks, without leaving flow.',
    href: '/sensor',
    linkLabel: 'Explore Sensor',
  },
} as const;

export type SensorResultRow = {
  id: 'calendar' | 'calculator' | 'meetings';
  title: string;
  hint?: string;
  icon: 'calendar' | 'calculator' | 'meetings';
};

/** Theater demo fixtures for Sensor (P8-T05). */
export const SENSOR_THEATER_FIXTURES = {
  idleHint: 'Ask or open anything…',
  query: 'Open Cal',
  confirmChip: 'Opening Calendar…',
  primaryResultId: 'calendar' as const,
  results: [
    { id: 'calendar', title: 'Calendar', hint: 'Enter', icon: 'calendar' },
    { id: 'calculator', title: 'Calculator', icon: 'calculator' },
    { id: 'meetings', title: 'Meetings tomorrow', icon: 'meetings' },
  ] as const satisfies readonly SensorResultRow[],
  alternatePrompts: [
    'Do I have meetings tomorrow?',
    'Find invoices from Acme',
    'Open Calculator',
  ] as const,
  caption: SENSOR_PAGE_CONTENT.theater.caption,
} as const;

/** Theater demo fixtures for Sensor calc story (P10-T01 / P10-T03). */
export const SENSOR_CALC_THEATER_FIXTURES = {
  idleHint: 'Ask or open anything…',
  query: '15% of 240',
  resolveLabel: 'Calculating…',
  result: {
    answer: '36',
    subtitle: '15% of 240',
    eyebrow: 'Result',
  },
  secondaryAction: 'Open Calculator',
  alternatePrompts: [
    'define latency',
    'Open Cal',
    'Do I have meetings tomorrow?',
  ] as const,
  caption: 'Sensor answers a quick calculation without opening another app.',
} as const;

/** Section chrome for the second Sensor calc theater (P10-T02). */
export const SENSOR_CALC_THEATER_SECTION = {
  title: 'Instant answers, not just app jumps.',
  subtitle:
    'Type a quick calculation and get a clear result without leaving your flow.',
  caption: SENSOR_CALC_THEATER_FIXTURES.caption,
  footer: { label: 'Explore Mascot →', href: '/mascot' },
} as const;

// ---------------------------------------------------------------------------
// Mascot
// ---------------------------------------------------------------------------

export const MASCOT_PAGE_CONTENT: DepthPageChrome = {
  metadata: {
    title: 'Mascot',
    description:
      'Conversational companion on top of MindMesh memory. Ask what changed, what matters, or what is next.',
    ogTitle: 'MindMesh | Mascot',
  },
  hero: {
    eyebrow: 'Mascot',
    title: 'Your conversational companion on top of MindMesh memory.',
    subtitle:
      'Ask what changed, what matters, or what is next. Get answers grounded in connected email, calendar, and local context.',
    backHref: '/',
    backLabel: 'Back to homepage →',
  },
  howItWorks: {
    title: 'How Mascot works',
    steps: [
      {
        number: '01',
        title: 'Ask in plain language',
        description: 'Talk like you would to a teammate who already has context.',
      },
      {
        number: '02',
        title: 'Grounded reply',
        description: 'Mascot answers from email, calendar, and MindMesh memory.',
      },
      {
        number: '03',
        title: 'Take the next step',
        description: 'Jump to inbox, events, or a follow-up without re-explaining.',
      },
    ],
  },
  theater: {
    title: 'See Mascot in action.',
    subtitle: 'One question becomes a calm, grounded answer you can act on.',
    caption: 'Mascot answers from your connected inbox context in one calm thread.',
    footer: { label: 'Explore Sensor →', href: '/sensor' },
  },
  capabilities: {
    title: 'What Mascot can do',
    items: [
      {
        title: 'Catch up fast',
        description: 'Ask what landed today without scanning every account.',
      },
      {
        title: 'What matters',
        description: 'Surface priorities and open loops in plain language.',
      },
      {
        title: 'What is next',
        description: 'Get a calm read on meetings and unfinished threads.',
      },
      {
        title: 'Stay human',
        description: 'Conversation instead of another dashboard to decode.',
      },
    ],
  },
  featureGridCard: {
    title: 'Mascot',
    description: 'Conversational companion grounded in your connected context.',
    href: '/mascot',
    linkLabel: 'Explore Mascot',
  },
} as const;

/** Theater demo fixtures for Mascot (P8-T03; beat numbers lock in P8-T06). */
export const MASCOT_THEATER_FIXTURES = {
  userAsk: 'Did I get any emails today?',
  replyParagraphs: [
    'Yes. You received 12 emails today.',
    'Breakdown: 7 work, 3 personal, 2 newsletters.',
    'Review all 12 in your MindMesh inbox.',
  ] as const,
  /** Full reply joined for scroll-synced typing if demos prefer one string. */
  replyBody: [
    'Yes. You received 12 emails today.',
    '',
    'Breakdown: 7 work, 3 personal, 2 newsletters.',
    '',
    'Review all 12 in your MindMesh inbox.',
  ].join('\n'),
  secondaryControl: { label: 'Open inbox', href: '/inbox' },
  caption: MASCOT_PAGE_CONTENT.theater.caption,
} as const;

/** Theater demo fixtures for Mascot attachment search (P10-T05 / P10-T06). */
export const MASCOT_ATTACHMENT_THEATER_FIXTURES = {
  userAsk: 'Find the attachment from Acme last year',
  replyLines: [
    'Found it. One matching file from Dana last March.',
    'Grounded in your connected Gmail.',
  ] as const,
  hit: {
    filename: 'Acme_Q3_Plan.pdf',
    from: 'Dana Reyes',
    date: 'Mar 12, 2025',
    source: 'Gmail',
  },
  secondaryControl: { label: 'Open attachment', href: '/inbox' },
  caption:
    'Mascot finds the Acme attachment from last year without you hunting folders.',
} as const;

/** Section chrome for the second Mascot attachment theater (P10-T05). */
export const MASCOT_ATTACHMENT_THEATER_SECTION = {
  title: 'Find the file without the hunt.',
  subtitle:
    'Ask for an attachment in plain language and get a grounded hit you can open.',
  caption: MASCOT_ATTACHMENT_THEATER_FIXTURES.caption,
  footer: { label: 'Explore Sensor →', href: '/sensor' },
} as const;

// ---------------------------------------------------------------------------
// Mascot icon / skin inventory (P10-T08, Approach A)
// ---------------------------------------------------------------------------

export type MascotIconSkin = {
  id: string;
  name: string;
  description: string;
  /** Local still under public/; no remote CDN / live Lottie on marketing. */
  src: string;
  /** Product Lottie URL (dashboard only; documented, not loaded on /mascot). */
  productLottieUrl: string;
  width: number;
  height: number;
};

/**
 * Product companion characters from DashboardDesktopShell CHARACTER_SLIDES.
 * Marketing shows local stills only (Approach A). Live Lottie stays on /dashboard.
 */
export const MASCOT_ICON_SKINS: readonly MascotIconSkin[] = [
  {
    id: 'sherpa',
    name: 'Sherpa',
    description: 'Friendly guide energy for everyday check-ins.',
    src: '/images/mascot-skins/sherpa.png',
    productLottieUrl:
      'https://lottie.host/225c420c-2766-4492-95e6-c5919c4b22ce/uUodXUtl4V.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'robo',
    name: 'Robo',
    description: 'A calm tech companion for quick questions.',
    src: '/images/mascot-skins/robo.png',
    productLottieUrl:
      'https://lottie.host/e0609cab-9f43-45bc-bb6a-7aca120370fd/53VP4mY0uR.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'boy',
    name: 'Boy',
    description: 'A human look for a more personal companion.',
    src: '/images/mascot-skins/boy.png',
    productLottieUrl:
      'https://lottie.host/b1b961aa-0e9f-44da-ba76-8a6dd58fbc09/v6hQv7mXIq.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'girl',
    name: 'Girl',
    description: 'Another human look for the same grounded chat.',
    src: '/images/mascot-skins/girl.png',
    productLottieUrl:
      'https://lottie.host/a5b4e126-7cc7-4aac-9bdb-a3893082c5f3/W49fhgkrwT.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'luna',
    name: 'Luna',
    description: 'Soft presence when you want a quieter vibe.',
    src: '/images/mascot-skins/luna.png',
    productLottieUrl:
      'https://lottie.host/018e4d06-8815-437d-bed0-5634ed59315c/HcMtWTaAMW.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'mini',
    name: 'Mini',
    description: 'Compact companion for a lighter feel.',
    src: '/images/mascot-skins/mini.png',
    productLottieUrl:
      'https://lottie.host/972ee003-96b6-424d-aa08-1e0a0ebbc5a5/cuk1txLhrr.lottie',
    width: 1024,
    height: 1024,
  },
  {
    id: 'whiskers',
    name: 'Whiskers',
    description: 'The cat companion used in the floating Mascot chat.',
    src: '/images/mascot-skins/whiskers.png',
    productLottieUrl:
      'https://lottie.host/7ac5c67a-7983-42a0-b290-2e0429865911/uvdYl2wxbT.lottie',
    width: 1024,
    height: 1024,
  },
] as const;

/** Default selected skin id for the `/mascot` showcase. */
export const MASCOT_ICON_SKIN_DEFAULT_ID = MASCOT_ICON_SKINS[0].id;

/** Section chrome for the mascot icon / skin showcase (P10-T08). */
export const MASCOT_ICON_SHOWCASE_SECTION = {
  id: 'mascot-icons',
  eyebrow: 'Looks',
  title: 'Pick a companion.',
  subtitle:
    'In MindMesh you can choose how Mascot looks. These are the companions available in the product.',
  note: 'Stills only on this page. Animated Lottie characters play in the product, not on the marketing funnel.',
} as const;

/** Inventory audit for P10-T08 Approach A. */
export const MASCOT_ICON_INVENTORY_NOTES = {
  approach: 'A' as const,
  stillsDir: '/images/mascot-skins/',
  productSource: 'components/dashboard/view-shells/DashboardDesktopShell.tsx CHARACTER_SLIDES',
  offered: MASCOT_ICON_SKINS.map((skin) => ({
    id: skin.id,
    still: skin.src,
    productLottieUrl: skin.productLottieUrl,
  })),
  notLoadedOnMarketing: 'Live DotLottieReact / lottie.host URLs',
} as const;

// ---------------------------------------------------------------------------
// Discovery helpers (P8-T13)
// ---------------------------------------------------------------------------

/** Homepage feature-grid cards in P8-T01 insert order (after Upcoming events, before Security). */
export const SENSOR_MASCOT_FEATURE_GRID_CARDS = [
  SENSOR_PAGE_CONTENT.featureGridCard,
  MASCOT_PAGE_CONTENT.featureGridCard,
] as const;

export const SENSOR_MASCOT_FAQ_LINKS = [
  {
    question: 'What is the Sensor Bar?',
    answer:
      'Sensor is the always-available command bar for opening apps, quick calculations, conversions, and short questions without breaking your flow.',
    learnMore: { label: 'Learn more →', href: '/sensor' },
  },
  {
    question: 'What is Mascot?',
    answer:
      'Mascot is the conversational companion on top of MindMesh memory. Ask what changed, what matters, or what is next.',
    learnMore: { label: 'Learn more →', href: '/mascot' },
  },
] as const;

export function getSensorMascotPageContent(surface: 'sensor' | 'mascot') {
  return surface === 'sensor' ? SENSOR_PAGE_CONTENT : MASCOT_PAGE_CONTENT;
}

export function getSensorMascotSiblingCta(surface: 'sensor' | 'mascot') {
  return surface === 'sensor'
    ? SENSOR_MASCOT_COMPARISON.sensorSiblingCta
    : SENSOR_MASCOT_COMPARISON.mascotSiblingCta;
}
