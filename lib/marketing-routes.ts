/** Marketing homepage path (Phase 2). */
export const MARKETING_HOMEPAGE_PATH = '/' as const;

/**
 * Primary funnel routes that use the slim marketing shell (P5-T01 / P8-T08 / P9-T02).
 * Includes homepage, Phase 5–8 depth destinations, and `/sub-processors` (Phase 9).
 * Legacy `/sensor&mascot` is not gated here (redirect shim in P8-T14).
 */
export const MARKETING_FUNNEL_PATHS = [
  '/',
  '/inbox',
  '/connected-apps',
  '/yesterdays-narrative',
  '/upcoming-events',
  '/security',
  '/trust',
  '/contact',
  '/billing',
  '/faq',
  '/privacy',
  '/terms',
  '/sensor',
  '/mascot',
  '/sub-processors',
] as const;

export type MarketingFunnelPath = (typeof MARKETING_FUNNEL_PATHS)[number];

/** Homepage section hashes used by sticky nav and depth cross-links (P5-T11). */
export const MARKETING_SECTION_HASHES = {
  hero: '#hero',
  connect: '#connect',
  focus: '#focus',
  execute: '#execute',
  features: '#features',
  trust: '#trust',
  cta: '#cta',
} as const;

/**
 * Sticky nav primary links. On homepage: hash only. On depth pages: `/#section`.
 */
export const MARKETING_NAV_LINKS = [
  { label: 'Product', hash: MARKETING_SECTION_HASHES.connect },
  { label: 'Features', hash: MARKETING_SECTION_HASHES.features },
  { label: 'Security', hash: MARKETING_SECTION_HASHES.trust },
] as const;

export const MARKETING_PRIMARY_CTA = {
  label: 'Join waitlist',
  hash: MARKETING_SECTION_HASHES.cta,
} as const;

/** Same footer on homepage and depth pages (P2-T05 / P5-T11 / P9-T07). */
export const MARKETING_FOOTER_LINKS = [
  { label: 'Security', href: '/security' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Sub-processors', href: '/sub-processors' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Resolve a homepage section hash for the current route.
 * Homepage: `#connect`. Depth pages: `/#connect`.
 */
export function homepageSectionHref(hash: string, onHomepage: boolean): string {
  return onHomepage ? hash : `${MARKETING_HOMEPAGE_PATH}${hash}`;
}

/**
 * Pillar / theater back links for funnel depth pages.
 * Keeps "Back to product" destinations consistent with homepage section ids.
 */
export const MARKETING_DEPTH_BACK_LINKS = {
  '/connected-apps': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.connect, false),
    label: 'See Connect theater →',
  },
  '/inbox': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.focus, false),
    label: 'See Focus theater →',
  },
  '/yesterdays-narrative': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.focus, false),
    label: 'See Focus theater →',
  },
  '/upcoming-events': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.execute, false),
    label: 'See Execute theater →',
  },
  '/security': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.trust, false),
    label: 'See Trust section →',
  },
  '/trust': {
    href: homepageSectionHref(MARKETING_SECTION_HASHES.trust, false),
    label: 'Back to Trust section →',
  },
} as const;

export type MarketingDepthPath = keyof typeof MARKETING_DEPTH_BACK_LINKS;

/** Waitlist CTA href from any marketing page. */
export const MARKETING_CTA_HREF = homepageSectionHref(
  MARKETING_SECTION_HASHES.cta,
  false
);

const MARKETING_FUNNEL_PATH_SET: ReadonlySet<string> = new Set(MARKETING_FUNNEL_PATHS);

/**
 * Strip query/hash and trailing slash (except root) so pathname matching is stable.
 */
export function normalizeMarketingPathname(
  pathname: string | null | undefined
): string | null {
  if (!pathname) return null;
  const withoutQuery = pathname.split(/[?#]/, 1)[0] ?? pathname;
  if (withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/+$/, '') || '/';
}

/** True only for the marketing homepage (`/`). Used for homepage-only LCP deferrals. */
export function isMarketingHomepage(pathname: string | null | undefined): boolean {
  return normalizeMarketingPathname(pathname) === MARKETING_HOMEPAGE_PATH;
}

/**
 * True for homepage + funnel depth routes (Phases 5–9).
 * Slim shell: no live mascot/sensor overlays, custom cursor, or legacy Hero providers.
 * Product theaters on `/sensor` and `/mascot` are scroll demos only (P8-T08).
 */
export function isMarketingRoute(pathname: string | null | undefined): boolean {
  const normalized = normalizeMarketingPathname(pathname);
  if (!normalized) return false;
  return MARKETING_FUNNEL_PATH_SET.has(normalized);
}
