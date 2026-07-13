# P7-T11: Sitemap / Robots / Canonical Spot-Check

**Task ID:** P7-T11  
**Status:** done  
**Type:** Verification (+ small config fix)  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P7-T02](./P7-T02-terms-marketing-shell.md), `next-sitemap`  
**Blocks:** —  
**Blocker:** No

---

## Goal

Confirm `public/sitemap.xml` and `public/robots.txt` list current marketing routes, exclude retired stubs, and that OG / production URLs still match `https://mindmesh.global`.

---

## Findings

### Sitemap coverage

All `MARKETING_FUNNEL_PATHS` (12 routes including `/` and `/terms`) are present. Retired stubs are absent:

| Path | Status |
|------|--------|
| `/waitlist`, `/features` | Absent (middleware 308 to homepage hashes) |
| `/docs`, `/demo`, `/social`, `/subscription`, `/app-directory` | Absent (`next.config` permanent redirects) |
| `/dashboard` | Absent (excluded) |

### Fixes applied

| Issue | Fix |
|-------|-----|
| `robotsTxtOptions.rules` ignored by next-sitemap v4 | Switched to `policies` so Disallow emits |
| Stale robots had only `Allow: /` | Regenerated with Disallow for dashboard, settings, api, admin |
| `/sensor&mascot` in sitemap (not a funnel page) | Added to `exclude`; Disallow `/sensor&mascot` |
| Product page still indexable while excluded | `robots: { index: false, follow: false }` on [`app/sensor&mascot/page.tsx`](../../../app/sensor&mascot/page.tsx) |

### Regenerated artifacts

- [`public/sitemap.xml`](../../../public/sitemap.xml): 12 marketing URLs  
- [`public/robots.txt`](../../../public/robots.txt): Allow `/` + Disallows above + Host + Sitemap

Config: [`next-sitemap.config.js`](../../../next-sitemap.config.js). Re-run via `postbuild` (`next-sitemap`) or `npx next-sitemap`.

---

## Canonical / OG spot-check

| Check | Result |
|-------|--------|
| `metadataBase` | `https://mindmesh.global` in root layout |
| Funnel page `openGraph.url` | Absolute `https://mindmesh.global{path}` on each marketing page |
| OG image | `https://mindmesh.global/og-image.png` via `lib/seo.ts` |
| Explicit `alternates.canonical` | Not set per page; Next uses `metadataBase` + route |

---

## Verify commands

```bash
node scripts/verify-marketing-routes.mjs
npx next-sitemap
```

Confirm funnel paths ⊆ sitemap locs; retired stubs and `/sensor&mascot` absent from sitemap.

---

## Acceptance

- [x] Funnel routes (incl. `/terms`) in sitemap  
- [x] Retired stubs absent  
- [x] Robots Disallow for private / non-funnel product chrome  
- [x] OG / host URLs match production  
- [x] `/sensor&mascot` out of sitemap + noindex until Phase 8
