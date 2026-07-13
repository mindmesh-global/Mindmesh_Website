export type MarketingIntegration = {
  id: string;
  displayName: string;
  category: string;
  iconSrc: string;
};

export const MARKETING_INTEGRATIONS: readonly MarketingIntegration[] = [
  {
    id: 'gmail',
    displayName: 'Gmail',
    category: 'Email',
    iconSrc: '/images/icons/gmail.png',
  },
  {
    id: 'google-calendar',
    displayName: 'Google Calendar',
    category: 'Calendar',
    iconSrc: '/images/icons/google-calendar.png',
  },
  {
    id: 'outlook-email',
    displayName: 'Outlook Email',
    category: 'Email',
    iconSrc: '/images/icons/outlook.png',
  },
  {
    id: 'outlook-calendar',
    displayName: 'Outlook Calendar',
    category: 'Calendar',
    iconSrc: '/images/icons/outlook-calendar.png',
  },
  {
    id: 'smtp',
    displayName: 'SMTP Mailbox',
    category: 'Email',
    iconSrc: '/images/icons/smtp.png',
  },
  {
    id: 'slack',
    displayName: 'Slack',
    category: 'Messaging',
    iconSrc: '/images/icons/slack.png',
  },
  {
    id: 'jira',
    displayName: 'Jira',
    category: 'Tasks',
    iconSrc: '/images/icons/jira.png',
  },
] as const;
