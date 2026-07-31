/**
 * Acme Co. marketing fixtures shared across Connect, Focus, and Execute theaters.
 * Persona and narrative locked in P1-T06–08 / P1-T23.
 */

import { MARKETING_INTEGRATIONS } from '@/lib/marketing-integrations';
import type { MarketingIntegration } from '@/lib/marketing-integrations';

export const MARKETING_PERSONA_ACME = {
  name: 'Alex',
  company: 'Acme Co.',
  email: 'alex@acme.co',
} as const;

export const PRIORITY_FIXTURE_ACME = {
  id: 'priority-acme-2pm',
  title: 'Prepare for the 2 PM client call',
  reason:
    "Dana's unread reply, a Slack thread on scope, and an open Jira ticket (PROD-142) all need you before 2 PM.",
  sources: ['Gmail', 'Google Calendar', 'Slack', 'Jira'] as const,
} as const;

export type PriorityFixture = typeof PRIORITY_FIXTURE_ACME;

export type InboxEmailSource = 'Gmail' | 'Outlook Email' | 'SMTP Mailbox';

export type InboxMessageFixture = {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  unread: boolean;
  source: InboxEmailSource;
  highlight?: boolean;
  needsApproval?: boolean;
};

export const INBOX_FIXTURES_ACME: readonly InboxMessageFixture[] = [
  {
    id: 'dana',
    from: 'Dana Reyes',
    to: MARKETING_PERSONA_ACME.email,
    subject: 'Re: Q2 rollout timeline',
    preview: 'Can we lock scope before the 2pm call?',
    body: `Hi Alex,

Can we lock scope before the 2pm call? I want to make sure PROD-142 and the remaining dependencies are clear on our side.

Thanks,
Dana`,
    receivedAt: 'Today, 9:14 AM',
    unread: true,
    source: 'Gmail',
    highlight: true,
    needsApproval: true,
  },
  {
    id: 'newsletter',
    from: 'Product Weekly',
    to: MARKETING_PERSONA_ACME.email,
    subject: 'Your Monday digest',
    preview: 'This week in SaaS: launches, hiring, and funding.',
    body: `Hi Alex,

This week in SaaS: launches, hiring, and funding. Skim when you have a quiet block; nothing here blocks the 2pm client call.

— Product Weekly`,
    receivedAt: 'Today, 8:02 AM',
    unread: true,
    source: 'SMTP Mailbox',
  },
  {
    id: 'internal-fyi',
    from: 'People Ops',
    to: MARKETING_PERSONA_ACME.email,
    subject: 'Office closure reminder',
    preview: 'Building B closed Friday for maintenance.',
    body: `Hi team,

Building B will be closed Friday for maintenance. Work from Building A or remote if you need desk space.

Thanks,
People Ops`,
    receivedAt: 'Yesterday, 4:40 PM',
    unread: false,
    source: 'Outlook Email',
  },
] as const;

export type CalendarEventFixture = {
  id: string;
  title: string;
  time: string;
  source: string;
  highlight?: boolean;
};

export const CALENDAR_FIXTURES_ACME: readonly CalendarEventFixture[] = [
  {
    id: 'standup',
    title: 'Team standup',
    time: '11:00 AM',
    source: 'Outlook Calendar',
  },
  {
    id: 'client-call-prep',
    title: 'Client-call prep',
    time: '1:30–2:30 PM',
    source: 'Google Calendar',
  },
  {
    id: 'client-call',
    title: 'Client call: Acme x ClientCo',
    time: '2:00 PM',
    source: 'Google Calendar',
    highlight: true,
  },
] as const;

export type SignalChipFixture = {
  id: string;
  source: 'Slack' | 'Jira';
  label: string;
  detail: string;
  highlight?: boolean;
};

export const SIGNAL_FIXTURES_ACME: readonly SignalChipFixture[] = [
  {
    id: 'slack-product-updates',
    source: 'Slack',
    label: '12 new messages',
    detail: '#product-updates',
  },
  {
    id: 'jira-prod-142',
    source: 'Jira',
    label: 'PROD-142 updated',
    detail: 'Moved to In Progress',
    highlight: true,
  },
] as const;

export const DRAFT_BODY_ACME = `Hi Dana,

Thanks for the note. I've reviewed the open items and blocked prep time before our 2pm call. We'll cover PROD-142 and the remaining dependencies together.

Best,
Alex`;

export const DRAFT_FIXTURE_ACME = {
  to: 'Dana Reyes',
  subject: 'Re: Q2 rollout timeline',
  body: DRAFT_BODY_ACME,
} as const;

export type DraftFixture = typeof DRAFT_FIXTURE_ACME;

export const CALENDAR_PREP_FIXTURE_ACME = {
  title: 'Client call prep',
  time: '1:30 PM - 2:00 PM',
  calendar: 'Google Calendar',
  note: 'PROD-142 + Dana thread',
} as const;

export type CalendarPrepFixture = typeof CALENDAR_PREP_FIXTURE_ACME;

export const JIRA_FIXTURE_ACME = {
  key: 'PROD-142',
  title: 'Finalize Q2 rollout spec',
  status: 'Done',
} as const;

export type JiraTaskFixture = typeof JIRA_FIXTURE_ACME;

export const EXECUTE_SUCCESS_COPY = 'Ready for your approval before 2pm.';

export type ConnectedAppFixture = MarketingIntegration & {
  accountLabel: string;
  connected?: boolean;
};

export const CONNECTED_APP_FIXTURES_ACME: readonly ConnectedAppFixture[] = MARKETING_INTEGRATIONS.map((app) => ({
  ...app,
  accountLabel:
    app.id === 'slack'
      ? 'Acme Workspace'
      : app.id === 'jira'
        ? 'acme.atlassian.net'
        : app.id === 'outlook-email'
          ? 'alex@outlook.com'
          : app.id === 'smtp'
            ? 'mail@acme.co'
            : MARKETING_PERSONA_ACME.email,
  connected: true,
})) as readonly ConnectedAppFixture[];

/** Homepage theater-scoped fixture bundles (Phase 4). Sensor/Mascot use marketing-sensor-mascot-content. */
export type HomepageTheaterId = 'connect' | 'focus' | 'execute';

export const THEATER_DEMO_FIXTURES = {
  connect: {
    apps: CONNECTED_APP_FIXTURES_ACME,
    appCount: CONNECTED_APP_FIXTURES_ACME.length,
    caption: 'Seven sources connected. Syncing into one layer.',
  },
  focus: {
    inbox: INBOX_FIXTURES_ACME,
    calendar: CALENDAR_FIXTURES_ACME,
    signals: SIGNAL_FIXTURES_ACME,
    priority: PRIORITY_FIXTURE_ACME,
    caption: 'A clear focus for 2pm, backed by email, calendar, and Jira.',
  },
  execute: {
    priority: PRIORITY_FIXTURE_ACME,
    draft: DRAFT_FIXTURE_ACME,
    calendarPrep: CALENDAR_PREP_FIXTURE_ACME,
    jira: JIRA_FIXTURE_ACME,
    successCopy: EXECUTE_SUCCESS_COPY,
    caption: 'Reply ready for approval. Prep blocked. PROD-142 staged.',
  },
} as const;

/** Read Acme fixtures for a homepage theater id. */
export function getTheaterDemoFixtures<T extends HomepageTheaterId>(theaterId: T) {
  return THEATER_DEMO_FIXTURES[theaterId];
}
