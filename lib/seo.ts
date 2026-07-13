/**
 * Shared SEO constants for root and page metadata (P7-T01 / P1-T03).
 * Prefer hyphen `-` over em dash in titles and descriptions.
 */
export const SITE_NAME = 'MindMesh' as const;

/** Canonical absolute document title (homepage + root default). */
export const SITE_TITLE = 'MindMesh - The Cognitive Layer for modern work' as const;

/** Canonical meta / OG / Twitter description (homepage + root default). */
export const SITE_DESCRIPTION =
  'Purpose-built for the modern professional. Connect your apps, see what needs attention, act with approval.' as const;

export const OG_IMAGE = {
  url: 'https://mindmesh.global/og-image.png',
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
} as const;

export const OG_IMAGE_URL = 'https://mindmesh.global/og-image.png';
