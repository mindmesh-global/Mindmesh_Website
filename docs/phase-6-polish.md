# Phase 6: Polish, Hero Deletion, and LCP

**Status:** Complete (2026-07-09) · Sign-off: [P6-T15-sign-off.md](./phase-6/tasks/P6-T15-sign-off.md)  
**Prerequisite:** [Phase 5 sign-off](./phase-5/tasks/P5-T15-sign-off.md) (2026-07-09)  
**Task breakdown:** [phase-6-tasks.md](./phase-6-tasks.md)  
**Next:** [Phase 7 launch hardening](./phase-7-launch.md) · [phase-7-tasks.md](./phase-7-tasks.md)  
**Parent plan:** [P1-T19 deprecation map](./phase-1/tasks/P1-T19-deprecation-reuse.md) · [P1-T17 performance budget](./phase-1/tasks/P1-T17-performance-budget.md) · [P3-T16 LCP revisit](./phase-3/tasks/P3-T16-homepage-lcp-revisit.md)

Phase 6 retires the legacy macOS Hero shell, finishes SEO/perf polish deferred from Phases 2–5, and closes the homepage LCP gate where practical.

---

## Goal

1. Redirect or migrate remaining Hero routes, then delete `Hero.tsx` and window chrome
2. Close homepage LCP work toward the &lt; 2.5s budget (or document an approved revision)
3. Refresh OG / social imagery for the marketing homepage
4. Enable Next.js image optimization (`images.unoptimized` → false) with safe defaults
5. Optionally migrate leftover plain pages (`/contact`, `/waitlist`, `/billing`, `/faq`, `/privacy`) onto the marketing shell

---

## Phase 5 starting point

| Asset | Location | Phase 6 change |
|-------|----------|----------------|
| Marketing homepage | `app/page.tsx`, `components/marketing/*` | LCP + OG polish |
| Funnel depth pages | Six routes on `MarketingDepthLayout` | Keep; optional FAQ/privacy shell |
| Hero route list | `lib/mindmesh-hero-routes.ts` | Empty → delete |
| Hero + windows | `components/Hero.tsx`, `*Window.tsx` | Delete after redirects |
| Image config | `next.config.js` `unoptimized: true` | Flip + audit |
| OG asset | `public/og-image.png` | Regenerate |

**Depth pages (Phase 5):** No required changes unless LCP follow-ups on `/inbox` are pulled into Phase 6.

---

## In-scope workstreams

### A. Legacy Hero retirement

| Item | Target |
|------|--------|
| `/features` | Redirect → `/#features` |
| `/app-directory` | Redirect → `/connected-apps` |
| `/subscription` | Redirect → `/billing` |
| `/docs` | Redirect → `/faq` (or plain rebuild) |
| `/social`, `/demo` | Redirect → `/` |
| `/contact`, `/waitlist` | Plain marketing pages (no Hero), then drop from Hero list |
| `/` in `MINDMESH_HERO_*` | Already marketing; remove stale list entry |
| Delete | `Hero.tsx`, window components, `mindmesh-hero-routes.ts` when unused |

Source: [P1-T19 route migration sketch](./phase-1/tasks/P1-T19-deprecation-reuse.md#route-migration-sketch-phase-6-redirects).

### B. Homepage LCP polish

From [P3-T16](./phase-3/tasks/P3-T16-homepage-lcp-revisit.md):

1. Display-font strategy so hero H1 can be LCP without breaking P1-T03 copy order
2. Critical hero text / font-display tuning for Inter body
3. Re-run Lighthouse × 3; update Phase 2/3 baselines

### C. SEO + images

| Item | Work |
|------|------|
| OG image | Capture marketing hero frame; replace `public/og-image.png` |
| Metadata | Align titles/descriptions with [P1-T03](./phase-1/tasks/P1-T03-hero-copy.md) / [P1-T01](./phase-1/tasks/P1-T01-narrative.md) |
| `next/image` | Enable optimization; fix any broken remote/local patterns |
| Optional | `content-visibility` on below-fold homepage sections |

### D. Remaining plain pages (optional but recommended)

| Route | Work |
|-------|------|
| `/contact` | Marketing shell + form (no Hero) |
| `/waitlist` | Prefer `/#cta`; or thin marketing page |
| `/billing` | MarketingDepthLayout or shared legal/plain shell |
| `/faq`, `/privacy` | Optional full shell (copy already updated in Phase 5) |

---

## Design / product contract

| Rule | Source |
|------|--------|
| No mascot / sensor / custom cursor on marketing funnel | P1-T19 |
| Keep `/dashboard` as product demo (no Hero redirect) | P1-T19 |
| Keep `/sensor&mascot` as dedicated page | P1-T19 |
| Do not claim NVIDIA endorsement beyond approved copy | P1-T11 / P1-T22 |
| Performance budget authority | P1-T17 |

---

## Recommended PR sequence

| PR | Scope | Exit criteria |
|----|-------|---------------|
| **PR1** | Redirects + contact/waitlist plain pages | Hero routes no longer needed for traffic |
| **PR2** | Delete Hero + windows + route config | Grep clean for `Hero` / `*Window` on marketing |
| **PR3** | Homepage LCP polish + Lighthouse × 3 | Baseline updated; gate or approved exception |
| **PR4** | OG + `next/image` + optional FAQ/privacy shell | SEO assets + image pipeline |

Detailed task IDs: [phase-6-tasks.md](./phase-6-tasks.md).

---

## Performance checklist

- [x] Homepage LCP revisited (3-run median) vs &lt; 2.5s target (exception signed at 2.93s)
- [x] CLS still &lt; 0.1 on `/` (median 0)
- [x] No Hero / Lottie / custom cursor JS on marketing routes
- [x] Image optimization enabled without layout regressions
- [ ] Optional: Lighthouse CI sketch (P1-T18) if homepage is stable → **Phase 7 P7-T04**

---

## Explicit non-goals (Phase 6)

- Reworking Phase 4 theater beat sheets
- Live API data on marketing pages
- Redesigning `/sensor&mascot`
- Changing product desktop app connectors
- Forcing depth-page LCP &lt; 2.5s (advisory unless product decides otherwise)

---

## Definition of done

Phase 6 is complete when:

- [x] Remaining Hero traffic routes redirect or are plain marketing pages
- [x] `Hero.tsx`, Hero windows, and `mindmesh-hero-routes.ts` deleted (or reduced to zero callers)
- [x] Homepage LCP gate closed or exception signed off
- [x] OG image refreshed for marketing homepage
- [x] `images.unoptimized` no longer required for marketing
- [x] P6-T15 (or final) sign-off recorded

---

## After Phase 6

Continue in **[phase-7-launch.md](./phase-7-launch.md)** / **[phase-7-tasks.md](./phase-7-tasks.md)**:

| Focus | Phase 7 task |
|-------|--------------|
| Metadata alignment (was P6-T11) | P7-T01 ✅ |
| `/terms` marketing shell | P7-T02 |
| Production monitoring (CrUX / field) | P7-T05 |
| Lighthouse CI | P7-T04 |
| Content iteration | P7-T08–T10 |
