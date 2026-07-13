/**
 * Locked public sub-processors list for /sub-processors (P9-T01).
 * Connected OAuth apps (Google, Slack, etc.) are not MindMesh sub-processors;
 * they stay on Privacy.
 */

export type MarketingSubProcessor = {
  name: string;
  purpose: string;
  privacyUrl: string;
  privacyLabel: string;
};

export const marketingSubProcessorsContent = {
  lastUpdated: '2026-07-10',
  route: '/sub-processors' as const,
  metadata: {
    title: 'Sub-processors',
    description:
      'Third-party vendors that process MindMesh customer data on our behalf, and why we use them.',
    ogTitle: 'MindMesh | Sub-processors',
    ogUrl: 'https://mindmesh.global/sub-processors',
  },
  hero: {
    eyebrow: 'Legal',
    title: 'Sub-processors',
    subtitle:
      'Vendors that process customer data on MindMesh\'s behalf. Connected apps you authorize are covered in our Privacy Policy.',
    backHref: '/security' as const,
    backLabel: 'See security →',
  },
  intro:
    'MindMesh uses a small set of service providers to run the product. This page lists those sub-processors, what they do for us, and where to read their privacy practices. We update this list when our vendors change.',
  connectedServicesNote:
    'When you connect Google, Microsoft, Slack, Atlassian, or an SMTP mailbox, those providers process data under their own terms and the scopes you approve. See Privacy for details.',
  privacyHref: '/privacy' as const,
  privacyLinkLabel: 'Privacy Policy →',
  contact: {
    leadIn: 'Questions about this list:',
    email: 'team@mindmesh.global',
  },
  processors: [
    {
      name: 'Amazon Web Services (AWS)',
      purpose:
        'Cloud infrastructure for account, auth, and related backend services.',
      privacyUrl: 'https://aws.amazon.com/privacy/',
      privacyLabel: 'aws.amazon.com/privacy',
    },
    {
      name: 'Neon',
      purpose: 'Managed Postgres for account and session-related cloud data.',
      privacyUrl: 'https://neon.tech/privacy-policy',
      privacyLabel: 'neon.tech/privacy-policy',
    },
    {
      name: 'OpenAI',
      purpose:
        'AI API processing for insights, action items, and semantic search when features require it.',
      privacyUrl: 'https://openai.com/privacy',
      privacyLabel: 'openai.com/privacy',
    },
    {
      name: 'Resend',
      purpose: 'Transactional email for contact and similar product emails.',
      privacyUrl: 'https://resend.com/legal/privacy-policy',
      privacyLabel: 'resend.com/legal/privacy-policy',
    },
    {
      name: 'Vercel',
      purpose:
        'Hosting and delivery of the MindMesh marketing website and related web surfaces.',
      privacyUrl: 'https://vercel.com/legal/privacy-policy',
      privacyLabel: 'vercel.com/legal/privacy-policy',
    },
  ] as const satisfies readonly MarketingSubProcessor[],
} as const;
