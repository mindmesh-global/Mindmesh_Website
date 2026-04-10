/**
 * App routes whose `page.tsx` renders `<Hero />` (macOS-style windows + side dock).
 */
export const MINDMESH_HERO_COMPONENT_ROUTES = [
  '/',
  '/features',
  '/docs',
  '/app-directory',
  '/demo',
  '/subscription',
  '/social',
  '/contact',
  '/waitlist',
] as const;

/**
 * Same as above plus `/dashboard`: shares view-mode / full-bleed behavior.
 * When viewMode is `desktop`, these paths get DashboardFullBleedPortal; Hero is a placeholder.
 */
export const MINDMESH_HERO_ROUTES = [...MINDMESH_HERO_COMPONENT_ROUTES, '/dashboard'] as const;

export function isMindmeshHeroRoute(pathname: string | null | undefined): boolean {
  return !!pathname && (MINDMESH_HERO_ROUTES as readonly string[]).includes(pathname);
}

export function isMindmeshHeroComponentRoute(pathname: string | null | undefined): boolean {
  return !!pathname && (MINDMESH_HERO_COMPONENT_ROUTES as readonly string[]).includes(pathname);
}
