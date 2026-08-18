# Unhide `/billing` when plans go live

**Status:** hidden (waitlist-only)  
**Page still in repo:** [`app/billing/page.tsx`](../app/billing/page.tsx)  
**Related:** [P6-T05 billing marketing shell](./phase-6/tasks/P6-T05-billing-marketing-shell.md)

MindMesh is waitlist-only. Public pricing is hidden so visitors land on Join waitlist instead of Free / Pro / Enterprise.

Do not delete the billing page. Reverse the hide list below when checkout is ready.

## What is hidden today

| Path | What happens |
|------|----------------|
| `/billing` | Temporary 307 to `/#cta` |
| `/subscription` | Same 307 to `/#cta` (used to 308 to `/billing`) |

The page files stay. `/billing` is still in `MARKETING_FUNNEL_PATHS`, so the marketing shell still applies once the redirect is removed.

## How it is hidden

| File | Hide change |
|------|-------------|
| [`middleware.ts`](../middleware.ts) | `/billing` and `/subscription` in `HASH_REDIRECTS` and `matcher`. Status 307 (not 308) so we can restore later. |
| [`next.config.js`](../next.config.js) | `/subscription` → `/billing` redirect removed (hash dest cannot live here). |
| [`next-sitemap.config.js`](../next-sitemap.config.js) | Exclude `/billing` and `/subscription`. Disallow both in robots policies. |
| [`public/sitemap.xml`](../public/sitemap.xml) | No `/billing` loc (regenerated on `postbuild`). |
| [`public/robots.txt`](../public/robots.txt) | `Disallow: /billing` and `/subscription`. |
| [`public/llms.txt`](../public/llms.txt) | Billing link removed. |
| [`app/billing/page.tsx`](../app/billing/page.tsx) | `robots: { index: false, follow: false }`. |
| [`DashboardDesktopShell.tsx`](../components/dashboard/view-shells/DashboardDesktopShell.tsx) | Secondary CTA is "See how it works" → `/#features` (was "View Billing & Plans"). |

## Unhide checklist

Do these in one PR. Leave `/features` and `/waitlist` redirects alone.

1. **Stop the waitlist redirect** in [`middleware.ts`](../middleware.ts):
   - Remove `/billing` and `/subscription` from `HASH_REDIRECTS`.
   - Remove both from `matcher`.
   - Delete `PERMANENT_HASH_REDIRECTS` if it is only used to split 308 vs 307.

2. **Restore the legacy alias** in [`next.config.js`](../next.config.js):

   ```js
   {
     source: '/subscription',
     destination: '/billing',
     permanent: true,
   },
   ```

3. **Index the page again** in [`app/billing/page.tsx`](../app/billing/page.tsx):
   - Remove `robots: { index: false, follow: false }`.

4. **Put `/billing` back in discovery**:
   - [`next-sitemap.config.js`](../next-sitemap.config.js): drop `/billing`, `/billing/*`, `/subscription`, `/subscription/*` from `exclude`. Drop `/billing` and `/subscription` from robots `disallow`.
   - [`public/robots.txt`](../public/robots.txt): remove those two `Disallow` lines (or regenerate via `npx next-sitemap` / `postbuild`).
   - [`public/llms.txt`](../public/llms.txt): add back under Optional:

     `- [Billing and plans](https://mindmesh.global/billing): Free, Pro, and Enterprise plans, with monthly and yearly pricing.`

5. **Optional product links** (only if you want pricing in the UI again):
   - Dashboard secondary CTA in [`DashboardDesktopShell.tsx`](../components/dashboard/view-shells/DashboardDesktopShell.tsx): `href="/billing"`, label `View Billing & Plans`.
   - Marketing nav or footer: add a `Pricing` link to `/billing` if sitelinks / discovery matter.

6. **Regenerate sitemap** so `/billing` is listed:

   ```bash
   npx next-sitemap
   ```

   Or rely on `postbuild` during the production deploy.

## Verify

- [ ] `https://mindmesh.global/billing` returns 200 and shows plans (no bounce to `/#cta`)
- [ ] `https://mindmesh.global/subscription` 308s to `/billing`
- [ ] `/billing` is in `https://mindmesh.global/sitemap.xml`
- [ ] `robots.txt` does not Disallow `/billing`
- [ ] View source on `/billing` has no `noindex`
- [ ] `https://mindmesh.global/llms.txt` lists Billing and plans
- [ ] `node scripts/verify-marketing-routes.mjs` still passes (`/billing` stays in the funnel list)

## Do not

- Do not 308 `/billing` while it is only temporarily hidden. A permanent redirect is hard to undo in Google.
- Do not delete `app/billing/` to hide the page.
- Do not treat `/waitlist` → `/#cta` as part of this restore. That path stays retired.
