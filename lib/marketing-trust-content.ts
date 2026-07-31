export type MarketingPartnerBadge = {
  id: 'nvidia' | 'aws' | 'microsoft';
  badgeSrc: string;
  badgeAlt: string;
  linkUrl: string;
  /** Intrinsic width / height for next/image aspect ratio. */
  width: number;
  height: number;
  /**
   * Tailwind height classes. Keep visual weight similar across badges
   * despite different native aspect ratios.
   */
  imageClassName: string;
  /** Short label under the badge. */
  caption: string;
  /** Fine-print / supporting line under the caption. */
  supportingLine?: string;
};

export const marketingTrustContent = {
  eyebrow: 'Trust',
  headline: 'Built on trust you can verify.',
  subhead:
    'AI orchestration for people who will not trade control of their data for convenience.',
  /**
   * Partner / infrastructure badges for `#trust` and `/trust`.
   * Add Microsoft after an official Logo Builder export lands in
   * `public/images/badges/` (do not use unofficial Microsoft logos).
   */
  partners: [
    {
      id: 'nvidia',
      badgeSrc: '/images/badges/nvidia-inception.svg',
      badgeAlt: 'NVIDIA Inception Program member',
      linkUrl: 'https://www.nvidia.com/en-us/startups/',
      width: 209,
      height: 90,
      imageClassName: 'h-16 w-auto md:h-[5.5rem]',
      caption: 'MindMesh is a member of the NVIDIA Inception Program.',
      supportingLine:
        'NVIDIA Inception membership does not constitute an endorsement by NVIDIA Corporation of MindMesh or its products.',
    },
    {
      id: 'aws',
      badgeSrc: '/images/badges/powered-by-aws-white.png',
      badgeAlt: 'Powered by AWS Cloud Computing',
      linkUrl: 'https://aws.amazon.com/what-is-cloud-computing',
      width: 200,
      height: 72,
      imageClassName: 'h-14 w-auto md:h-16',
      caption: 'MindMesh is powered by AWS.',
      supportingLine:
        'Core MindMesh cloud services run on Amazon Web Services infrastructure.',
    },
  ] as const satisfies readonly MarketingPartnerBadge[],
  securityLine:
    'Private by design: local-first architecture, encrypted connections, and read-only integrations where it matters.',
  links: [
    { label: 'Learn about security →', href: '/security' },
    { label: 'How we build trust →', href: '/trust' },
  ],
  waitlistLine: '25+ professionals already on the waitlist.',
} as const;
