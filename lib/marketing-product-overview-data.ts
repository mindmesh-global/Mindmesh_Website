/**
 * Phase 11 product-overview fixtures (P11-T03).
 *
 * Synthetic Acme / Alex data for the homepage product overview.
 * No network, storage, auth, Tauri, Lottie, or customer data.
 *
 * Narrative and finals: docs/phase-11/tasks/P11-T02-overview-beat-sheet.md
 * Product map: docs/phase-11/tasks/P11-T01-product-inventory.md
 */

import {
  CALENDAR_FIXTURES_ACME,
  CONNECTED_APP_FIXTURES_ACME,
  INBOX_FIXTURES_ACME,
  JIRA_FIXTURE_ACME,
  MARKETING_PERSONA_ACME,
  PRIORITY_FIXTURE_ACME,
  type CalendarEventFixture,
  type ConnectedAppFixture,
  type InboxEmailSource,
  type InboxMessageFixture,
} from '@/lib/marketing-demo-data';
import {
  MASCOT_ATTACHMENT_THEATER_FIXTURES,
  MASCOT_ICON_SKIN_DEFAULT_ID,
  MASCOT_ICON_SKINS,
  SENSOR_CALC_THEATER_FIXTURES,
} from '@/lib/marketing-sensor-mascot-content';

// ---------------------------------------------------------------------------
// Section chrome + scene captions (locked in P11-T02)
// ---------------------------------------------------------------------------

export const PRODUCT_OVERVIEW_SECTION = {
  id: 'product-overview',
  eyebrow: 'Inside MindMesh',
  title: 'See the desktop product in one pass.',
  subtitle:
    'Attention, inbox, calendar, yesterday\'s narrative, connected sources, Sensor, and Mascot, shown as they ship today.',
} as const;

export type ProductOverviewSceneId = 1 | 2 | 3 | 4 | 5 | 6;

export const PRODUCT_OVERVIEW_SCENE_COUNT = 6 as const;

export const PRODUCT_OVERVIEW_SCENE_CAPTIONS = {
  1: 'Attention ranks what needs you now, later today, and what was quietly handled.',
  2: 'Upcoming events for today stay visible before the 2pm client call.',
  3: 'Inbox surfaces Dana\'s thread with approval-gated replies.',
  4: 'Yesterday\'s narrative recaps what closed and what is still open.',
  5: 'Seven connected sources give MindMesh the context it reads.',
  6: 'Sensor and Mascot sit beside the desk as separate companion surfaces.',
} as const satisfies Record<ProductOverviewSceneId, string>;

export const PRODUCT_OVERVIEW_NAV = [
  { scene: 1 as const, label: 'Attention', sidebarTab: 'attention' },
  { scene: 2 as const, label: 'Upcoming events', sidebarTab: 'events' },
  { scene: 3 as const, label: 'Email', sidebarTab: 'inbox' },
  { scene: 4 as const, label: 'Yesterday narrative', sidebarTab: 'narrative' },
  { scene: 5 as const, label: 'Connected apps', sidebarTab: 'apps' },
  { scene: 6 as const, label: 'Companions', sidebarTab: 'companions' },
] as const;

export type ProductOverviewSidebarTab =
  (typeof PRODUCT_OVERVIEW_NAV)[number]['sidebarTab'];

export const PRODUCT_OVERVIEW_DEPTH_LINKS = {
  sensor: { label: 'Explore Sensor →', href: '/sensor' },
  mascot: { label: 'Explore Mascot →', href: '/mascot' },
} as const;

/** Reduced-motion final progress for overview hold (P11-T02). */
export const PRODUCT_OVERVIEW_REDUCED_MOTION_PROGRESS = 0.9 as const;

// ---------------------------------------------------------------------------
// Scene 1: Attention Board
// ---------------------------------------------------------------------------

export type AttentionSourceLabel =
  | 'Gmail'
  | 'Google Calendar'
  | 'Jira'
  | 'Slack'
  | 'Outlook Email'
  | 'Outlook Calendar'
  | 'SMTP Mailbox';

export type AttentionCardFixture = {
  id: string;
  title: string;
  summary?: string;
  sourceLabel: AttentionSourceLabel;
  sourceApps: readonly AttentionSourceLabel[];
  whyNow: string;
  isAnchor?: boolean;
};

export type QuietRowFixture = {
  id: string;
  label: string;
  sourceLabel: AttentionSourceLabel;
  count: number;
  detailLines: readonly string[];
};

export type AttentionOverlapFixture = {
  id: string;
  title: string;
  detail: string;
};

/** One connected-source evidence row inside an Attention dossier. */
export type AttentionEvidenceFixture = {
  id: string;
  source: AttentionSourceLabel;
  kind: 'email' | 'calendar' | 'slack' | 'jira';
  title: string;
  summary: string;
  meta?: string;
  /** Deep-link label shown on the right of the evidence row. */
  deepLinkLabel: string;
};

/**
 * Dossier for a single Attention card. Evidence from connected sources
 * constitutes one notification (not separate Now cards).
 */
export type AttentionDossierFixture = {
  cardId: string;
  title: string;
  summary: string;
  evidence: readonly AttentionEvidenceFixture[];
};

export type AttentionBoardFixture = {
  header: string;
  supportingLine: string;
  now: readonly AttentionCardFixture[];
  laterToday: readonly AttentionCardFixture[];
  quietlyHandled: readonly QuietRowFixture[];
  overlapAlert: AttentionOverlapFixture;
  /** Dossier opened from the Now anchor via Open. */
  dossier: AttentionDossierFixture;
};

const CLIENT_CALL_EVENT =
  CALENDAR_FIXTURES_ACME.find((event) => event.id === 'client-call') ??
  CALENDAR_FIXTURES_ACME[CALENDAR_FIXTURES_ACME.length - 1];

export const ATTENTION_DOSSIER_FIXTURE_ACME: AttentionDossierFixture = {
  cardId: 'attn-prep-2pm',
  title: PRIORITY_FIXTURE_ACME.title,
  summary:
    "One notification spanning Dana's unread reply, the 2pm client call, a Slack thread on scope, and open Jira ticket PROD-142.",
  evidence: [
    {
      id: 'ev-gmail-dana',
      source: 'Gmail',
      kind: 'email',
      title: 'Re: Q2 rollout timeline',
      summary: 'Can we lock scope before the 2pm call?',
      meta: 'Dana Reyes · Today, 9:14 AM',
      deepLinkLabel: 'Open in Inbox',
    },
    {
      id: 'ev-calendar-client-call',
      source: 'Google Calendar',
      kind: 'calendar',
      title: CLIENT_CALL_EVENT.title,
      summary: 'Prep block overlaps this call; confirm scope before it starts.',
      meta: CLIENT_CALL_EVENT.time,
      deepLinkLabel: 'Open in Upcoming events',
    },
    {
      id: 'ev-slack-scope',
      source: 'Slack',
      kind: 'slack',
      title: 'Thread in #product-updates',
      summary: 'Jordan asks whether PROD-142 scope is locked before ClientCo.',
      meta: 'Jordan · Today, 10:02 AM',
      deepLinkLabel: 'Open in Slack',
    },
    {
      id: 'ev-jira-prod-142',
      source: 'Jira',
      kind: 'jira',
      title: `${JIRA_FIXTURE_ACME.key} · ${JIRA_FIXTURE_ACME.title}`,
      summary: 'Open ticket still needs a final pass before the client call.',
      meta: 'In Progress',
      deepLinkLabel: 'Open in Jira',
    },
  ],
} as const;

export const ATTENTION_BOARD_FIXTURES_ACME: AttentionBoardFixture = {
  header: "Here's what needs your attention.",
  /** Empty: Attention header is title-only in the overview frame. */
  supportingLine: '',
  now: [
    {
      id: 'attn-prep-2pm',
      title: PRIORITY_FIXTURE_ACME.title,
      summary: 'Client-call prep with open email, Slack, and Jira context.',
      sourceLabel: 'Google Calendar',
      sourceApps: ['Gmail', 'Google Calendar', 'Slack', 'Jira'],
      whyNow: PRIORITY_FIXTURE_ACME.reason,
      isAnchor: true,
    },
  ],
  laterToday: [
    {
      id: 'attn-standup-notes',
      title: 'Review standup notes',
      summary: 'Capture follow-ups after the 11 AM standup.',
      sourceLabel: 'Google Calendar',
      sourceApps: ['Google Calendar'],
      whyNow: 'Standup ends before lunch; notes are still open.',
    },
  ],
  quietlyHandled: [
    {
      id: 'quiet-gmail-digest',
      label: 'Product Weekly digest',
      sourceLabel: 'Gmail',
      count: 1,
      detailLines: [
        'Newsletter filed for reading later.',
        'No action needed before 2 PM.',
      ],
    },
    {
      id: 'quiet-gcal-optional',
      label: 'Optional all-hands hold',
      sourceLabel: 'Google Calendar',
      count: 1,
      detailLines: [
        'Declined as optional; calendar stays clear for prep.',
        'No conflict with the 2 PM client call.',
      ],
    },
    {
      id: 'quiet-outlook-email',
      label: 'Vendor status update',
      sourceLabel: 'Outlook Email',
      count: 1,
      detailLines: [
        'Procurement FYI acknowledged.',
        'No reply required before the call.',
      ],
    },
    {
      id: 'quiet-outlook-cal',
      label: 'Focus block reminder',
      sourceLabel: 'Outlook Calendar',
      count: 1,
      detailLines: [
        'Personal focus block noted and left alone.',
        'Does not need attention before 2 PM.',
      ],
    },
    {
      id: 'quiet-smtp-mailbox',
      label: 'Mailbox delivery notice',
      sourceLabel: 'SMTP Mailbox',
      count: 1,
      detailLines: [
        'System delivery receipt filed.',
        'No follow-up required.',
      ],
    },
    {
      id: 'quiet-slack-digest',
      label: '#general daily digest',
      sourceLabel: 'Slack',
      count: 1,
      detailLines: [
        'Channel noise summarized and muted.',
        'Nothing blocking the client call.',
      ],
    },
    {
      id: 'quiet-jira-bot',
      label: 'PROD-138 watcher ping',
      sourceLabel: 'Jira',
      count: 1,
      detailLines: [
        'Bot comment acknowledged without action.',
        'Not related to PROD-142 prep.',
      ],
    },
  ],
  overlapAlert: {
    id: 'overlap-prep-client-call',
    title: 'Schedule overlap',
    detail:
      'Client-call prep (1:30–2:30 PM) overlaps Client call: Acme x ClientCo at 2:00 PM.',
  },
  dossier: ATTENTION_DOSSIER_FIXTURE_ACME,
} as const;

// ---------------------------------------------------------------------------
// Scene 2: Upcoming Events · Scene 3: Email Inbox
// ---------------------------------------------------------------------------

export type EmailFolderId = 'inbox' | 'all' | 'sent' | 'drafts';

export type EmailFolderFixture = {
  id: EmailFolderId;
  label: string;
  count: number;
};

export type FocusedEmailFixture = {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  unread: boolean;
  source: InboxEmailSource;
  needsApprovalLabel: 'Needs approval';
};

export type UpcomingEventsSceneFixture = {
  headline: string;
  supportingLine: string;
  events: readonly CalendarEventFixture[];
};

export type InboxSceneFixture = {
  headline: string;
  supportingLine: string;
  activeFolder: EmailFolderId;
  folders: readonly EmailFolderFixture[];
  threads: readonly InboxMessageFixture[];
  /** Decorative only; omit interactive send in UI. */
  approvalHint: string;
  sourceFilters: readonly InboxEmailSource[];
};

/** @deprecated Prefer UpcomingEventsSceneFixture + InboxSceneFixture. */
export type InboxCalendarSceneFixture = UpcomingEventsSceneFixture &
  InboxSceneFixture & {
    focusedEmail: FocusedEmailFixture;
  };

export const EMAIL_FOLDER_FIXTURES_ACME: readonly EmailFolderFixture[] = [
  { id: 'inbox', label: 'Inbox', count: 12 },
  { id: 'all', label: 'All', count: 48 },
  { id: 'sent', label: 'Sent', count: 9 },
  { id: 'drafts', label: 'Drafts', count: 1 },
] as const;

export const FOCUSED_EMAIL_FIXTURE_ACME: FocusedEmailFixture = {
  id: INBOX_FIXTURES_ACME[0].id,
  from: INBOX_FIXTURES_ACME[0].from,
  to: INBOX_FIXTURES_ACME[0].to,
  subject: INBOX_FIXTURES_ACME[0].subject,
  preview: INBOX_FIXTURES_ACME[0].preview,
  body: INBOX_FIXTURES_ACME[0].body,
  receivedAt: INBOX_FIXTURES_ACME[0].receivedAt,
  unread: INBOX_FIXTURES_ACME[0].unread,
  source: INBOX_FIXTURES_ACME[0].source,
  needsApprovalLabel: 'Needs approval',
} as const;

export const UPCOMING_EVENTS_SCENE_FIXTURES_ACME: UpcomingEventsSceneFixture = {
  headline: 'Upcoming events for today.',
  supportingLine: 'Prep block and the 2pm client call stay in view.',
  events: CALENDAR_FIXTURES_ACME,
} as const;

export const INBOX_SCENE_FIXTURES_ACME: InboxSceneFixture = {
  headline: 'Inbox',
  supportingLine: '',
  activeFolder: 'inbox',
  folders: EMAIL_FOLDER_FIXTURES_ACME,
  threads: INBOX_FIXTURES_ACME,
  approvalHint: 'Replies and calendar writes need your approval.',
  sourceFilters: ['Gmail', 'Outlook Email', 'SMTP Mailbox'],
} as const;

/** Combined fixture kept for older references; scenes use the split exports. */
export const INBOX_CALENDAR_SCENE_FIXTURES_ACME: InboxCalendarSceneFixture = {
  ...UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
  ...INBOX_SCENE_FIXTURES_ACME,
  headline: 'Inbox and upcoming events, together.',
  supportingLine: "Dana's thread and the 2pm call stay in context.",
  focusedEmail: FOCUSED_EMAIL_FIXTURE_ACME,
} as const;

// ---------------------------------------------------------------------------
// Scene 3: Yesterday Narrative + Connected Apps
// ---------------------------------------------------------------------------

export type NarrativeEvidenceChip = {
  id: string;
  label: string;
  source: AttentionSourceLabel;
};

export type NarrativeStatFixture = {
  id: string;
  label: string;
  value: string;
};

export type YesterdayNarrativeFixture = {
  title: string;
  dateLabel: string;
  summary: string;
  highlight: string;
  openLoop: string;
  stats: readonly NarrativeStatFixture[];
  evidence: readonly NarrativeEvidenceChip[];
};

export type NarrativeAppsSceneFixture = {
  headline: string;
  supportingLine: string;
  narrative: YesterdayNarrativeFixture;
  apps: readonly ConnectedAppFixture[];
  syncBadgeLabel: 'Connected';
  syncDetail: string;
};

export type YesterdayNarrativeSceneFixture = {
  headline: string;
  supportingLine: string;
  narrative: YesterdayNarrativeFixture;
};

export type ConnectedAppsSceneFixture = {
  headline: string;
  supportingLine: string;
  apps: readonly ConnectedAppFixture[];
  syncBadgeLabel: 'Connected';
  syncDetail: string;
};

export const YESTERDAY_NARRATIVE_FIXTURE_ACME: YesterdayNarrativeFixture = {
  title: "Yesterday's narrative",
  dateLabel: 'Yesterday',
  summary:
    'Alex closed the Q2 scope thread with Dana and left PROD-142 open before EOD.',
  highlight: 'Aligned rollout scope language with Dana before leaving.',
  openLoop: 'PROD-142 still needs a final pass before the client call.',
  stats: [
    { id: 'emails', label: 'Emails', value: '12' },
    { id: 'events', label: 'Events', value: '3' },
    { id: 'open-loops', label: 'Open loops', value: '2' },
  ],
  evidence: [
    { id: 'ev-gmail', label: 'Dana thread', source: 'Gmail' },
    { id: 'ev-cal', label: 'Client call', source: 'Google Calendar' },
    { id: 'ev-jira', label: 'PROD-142', source: 'Jira' },
  ],
} as const;

export const YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME: YesterdayNarrativeSceneFixture =
  {
    headline: "Yesterday's narrative",
    supportingLine: 'An actionable recap of what closed and what is still open.',
    narrative: YESTERDAY_NARRATIVE_FIXTURE_ACME,
  } as const;

export const CONNECTED_APPS_SCENE_FIXTURES_ACME: ConnectedAppsSceneFixture = {
  headline: 'Connected apps',
  supportingLine: 'Seven sources MindMesh reads as context.',
  apps: CONNECTED_APP_FIXTURES_ACME,
  syncBadgeLabel: 'Connected',
  syncDetail: 'Seven sources connected. MindMesh reads them as context.',
} as const;

/** @deprecated Prefer YESTERDAY_NARRATIVE_SCENE + CONNECTED_APPS_SCENE fixtures. */
export const NARRATIVE_APPS_SCENE_FIXTURES_ACME: NarrativeAppsSceneFixture = {
  headline: 'Yesterday, explained. Sources, connected.',
  supportingLine: 'An actionable recap plus the seven apps MindMesh reads.',
  narrative: YESTERDAY_NARRATIVE_FIXTURE_ACME,
  apps: CONNECTED_APP_FIXTURES_ACME,
  syncBadgeLabel: 'Connected',
  syncDetail: 'Seven sources connected. MindMesh reads them as context.',
} as const;

// ---------------------------------------------------------------------------
// Scene 6: Sensor + Mascot companions
// ---------------------------------------------------------------------------

export type CompanionsSceneFixture = {
  headline: string;
  supportingLine: string;
  sensor: {
    idleHint: string;
    query: string;
    result: {
      answer: string;
      subtitle: string;
      eyebrow: string;
    };
  };
  mascot: {
    skinId: string;
    skinName: string;
    skinSrc: string;
    userAsk: string;
    replyLines: readonly string[];
    hit: {
      filename: string;
      from: string;
      date: string;
      source: string;
    };
  };
};

const defaultMascotSkin =
  MASCOT_ICON_SKINS.find((skin) => skin.id === MASCOT_ICON_SKIN_DEFAULT_ID) ??
  MASCOT_ICON_SKINS[0];

export const COMPANIONS_SCENE_FIXTURES_ACME: CompanionsSceneFixture = {
  headline: 'Companions at the edge of the desk.',
  supportingLine: 'Sensor for instant answers. Mascot for grounded conversation.',
  sensor: {
    idleHint: SENSOR_CALC_THEATER_FIXTURES.idleHint,
    query: SENSOR_CALC_THEATER_FIXTURES.query,
    result: { ...SENSOR_CALC_THEATER_FIXTURES.result },
  },
  mascot: {
    skinId: defaultMascotSkin.id,
    skinName: defaultMascotSkin.name,
    skinSrc: defaultMascotSkin.src,
    userAsk: MASCOT_ATTACHMENT_THEATER_FIXTURES.userAsk,
    replyLines: MASCOT_ATTACHMENT_THEATER_FIXTURES.replyLines,
    hit: { ...MASCOT_ATTACHMENT_THEATER_FIXTURES.hit },
  },
} as const;

// ---------------------------------------------------------------------------
// Bundled overview (complete reduced-motion / static render)
// ---------------------------------------------------------------------------

export const PRODUCT_OVERVIEW_FIXTURES = {
  persona: MARKETING_PERSONA_ACME,
  section: PRODUCT_OVERVIEW_SECTION,
  captions: PRODUCT_OVERVIEW_SCENE_CAPTIONS,
  nav: PRODUCT_OVERVIEW_NAV,
  depthLinks: PRODUCT_OVERVIEW_DEPTH_LINKS,
  reducedMotionProgress: PRODUCT_OVERVIEW_REDUCED_MOTION_PROGRESS,
  scenes: {
    1: {
      id: 1 as const,
      kind: 'attention' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[1],
      data: ATTENTION_BOARD_FIXTURES_ACME,
    },
    2: {
      id: 2 as const,
      kind: 'upcomingEvents' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[2],
      data: UPCOMING_EVENTS_SCENE_FIXTURES_ACME,
    },
    3: {
      id: 3 as const,
      kind: 'inbox' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[3],
      data: INBOX_SCENE_FIXTURES_ACME,
    },
    4: {
      id: 4 as const,
      kind: 'narrative' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[4],
      data: YESTERDAY_NARRATIVE_SCENE_FIXTURES_ACME,
    },
    5: {
      id: 5 as const,
      kind: 'connectedApps' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[5],
      data: CONNECTED_APPS_SCENE_FIXTURES_ACME,
    },
    6: {
      id: 6 as const,
      kind: 'companions' as const,
      caption: PRODUCT_OVERVIEW_SCENE_CAPTIONS[6],
      data: COMPANIONS_SCENE_FIXTURES_ACME,
    },
  },
} as const;

export type ProductOverviewFixtures = typeof PRODUCT_OVERVIEW_FIXTURES;

/** Read a single scene bundle by id. */
export function getProductOverviewSceneFixtures<T extends ProductOverviewSceneId>(
  scene: T
) {
  return PRODUCT_OVERVIEW_FIXTURES.scenes[scene];
}

/** Caption for the active overview scene. */
export function getProductOverviewCaption(scene: ProductOverviewSceneId): string {
  return PRODUCT_OVERVIEW_SCENE_CAPTIONS[scene];
}
