/**
 * Legacy chrome route helpers for `/dashboard` (P6-T07 / P8-T14).
 * Marketing funnel paths must never appear here.
 * Live Sensor/Mascot overlays are dashboard-only; `/sensor` and `/mascot` use scroll theaters.
 */

/** Routes that share dashboard view-mode / full-bleed portal behavior. */
export const MINDMESH_DASHBOARD_CHROME_ROUTES = ['/dashboard'] as const;

/**
 * Legacy chrome pages that may show mascot / sensor overlays.
 */
export const MINDMESH_OVERLAY_ROUTES = ['/dashboard'] as const;

export function isMindmeshDashboardChromeRoute(
  pathname: string | null | undefined
): boolean {
  return (
    !!pathname &&
    (MINDMESH_DASHBOARD_CHROME_ROUTES as readonly string[]).includes(pathname)
  );
}

export function isMindmeshOverlayRoute(pathname: string | null | undefined): boolean {
  return !!pathname && (MINDMESH_OVERLAY_ROUTES as readonly string[]).includes(pathname);
}
