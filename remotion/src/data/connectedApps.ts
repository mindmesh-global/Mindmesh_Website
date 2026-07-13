export type ConnectedAppId =
  | 'gmail'
  | 'google-calendar'
  | 'outlook'
  | 'outlook-calendar'
  | 'smtp'
  | 'slack';

export type ConnectedApp = {
  id: ConnectedAppId;
  name: string;
  subtitle: string;
  icon: string;
  connected: boolean;
  comingSoon?: boolean;
};

export const CONNECTED_APPS: ConnectedApp[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    subtitle: 'Email',
    icon: 'images/icons/gmail.png',
    connected: true,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    subtitle: 'Calendar',
    icon: 'images/icons/google-calendar.png',
    connected: true,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    subtitle: 'Email',
    icon: 'images/icons/outlook.png',
    connected: true,
  },
  {
    id: 'outlook-calendar',
    name: 'Outlook Calendar',
    subtitle: 'Calendar',
    icon: 'images/icons/outlook-calendar.png',
    connected: true,
  },
  {
    id: 'smtp',
    name: 'SMTP Mailbox',
    subtitle: 'Email',
    icon: 'images/icons/smtp.png',
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    subtitle: 'Workspace',
    icon: 'images/icons/slack.svg',
    connected: true,
  },
];
