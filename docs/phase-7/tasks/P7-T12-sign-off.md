# P7-T12: Phase 7 Sign-Off Checklist

**Task ID:** P7-T12  
**Status:** done  
**Type:** Formal gate (documentation + verification)  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** P7-T01, P7-T02, P7-T06 (blockers); non-blockers optional  
**Unblocks:** [Phase 8 Sensor & Mascot](../phase-8-sensor-mascot.md) · [phase-8-tasks.md](../phase-8-tasks.md)

---

## Verdict

**Phase 7 is complete.** All **blocker** tasks are `done`. All optional tasks (T03–T05, T07–T11) are also `done` (none deferred).

| Gate | Result |
|------|--------|
| Blocker tasks (4) | All done (T01, T02, T06, T12) |
| Optional tasks (8) | All done |
| Child task docs | 12/12 in `docs/phase-7/tasks/` |
| Metadata narrative | Aligned via `lib/seo.ts` |
| `/terms` marketing shell | On `MarketingDepthLayout`; CSS module gone |
| Developer entry docs | No live-Hero guidance |
| Optional ops | LHCI, field CWV runbook, analyzer, sitemap/robots done |
| Phase 8 entry | Already drafted; ready to start |

---

## Master checklist (from phase-7-launch.md)

- [x] Metadata aligned on root + key marketing routes (P7-T01)
- [x] `/terms` on marketing depth shell (P7-T02)
- [x] Stale Hero references removed from primary developer docs (P7-T06)
- [x] Optional CI / monitoring tasks done (not deferred)
- [x] P7-T12 sign-off recorded (this doc)

---

## Blocker task sign-off

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P7-T01 | Metadata alignment | [P7-T01](./P7-T01-metadata-alignment.md) | done |
| P7-T02 | `/terms` marketing shell | [P7-T02](./P7-T02-terms-marketing-shell.md) | done |
| P7-T06 | Developer docs Hero cleanup | [P7-T06](./P7-T06-docs-hero-cleanup.md) | done |
| P7-T12 | This sign-off | This doc | done |

### Optional / non-blocker (all done)

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P7-T03 | `/inbox` depth LCP | [P7-T03](./P7-T03-inbox-lcp-follow-up.md) | done (5.4s → 2.6s) |
| P7-T04 | Lighthouse CI sketch | [P7-T04](./P7-T04-lighthouse-ci.md) | done |
| P7-T05 | Field CWV / CrUX note | [P7-T05](./P7-T05-field-cwv-monitoring.md) | done |
| P7-T07 | Bundle analyzer | [P7-T07](./P7-T07-bundle-analyzer.md) | done |
| P7-T08 | Homepage content iteration | [P7-T08](./P7-T08-homepage-content-iteration.md) | done |
| P7-T09 | Theater micro-copy | [P7-T09](./P7-T09-theater-microcopy.md) | done |
| P7-T10 | Form microcopy | [P7-T10](./P7-T10-form-microcopy.md) | done |
| P7-T11 | Sitemap / robots / canonical | [P7-T11](./P7-T11-sitemap-robots-spot-check.md) | done |

---

## Verification snapshot (2026-07-10)

| Check | Result |
|-------|--------|
| `node scripts/verify-marketing-routes.mjs` | ok (`/terms` in funnel) |
| `components/Hero.tsx` | Absent |
| `README.md` / `QUICK_START.md` | Point at marketing homepage; Hero called out as deleted |
| `app/terms/page.tsx` | `MarketingDepthLayout`; no `terms.module.css` |
| `lib/seo.ts` `SITE_TITLE` | `MindMesh - The Cognitive Layer for modern work` |
| `public/sitemap.xml` | 12 funnel URLs; no retired stubs; no `/sensor&mascot` |
| `public/robots.txt` | Disallow dashboard / settings / api / admin / sensor&mascot |
| `npm run analyze` | Wired (`ANALYZE=true next build --webpack`) |
| `npm run lhci` | Wired (`lighthouserc.cjs` + workflow) |

---

## Performance / ops summary (Phase 7)

| Check | Result | Doc |
|-------|--------|-----|
| Inbox depth LCP | ~2.6s after image fix | [P7-T03](./P7-T03-inbox-lcp-follow-up.md) |
| Homepage lab LCP exception | Still open (P6 median 2.93s); field runbook ready | [P7-T05](./P7-T05-field-cwv-monitoring.md), [P6-T09](../../phase-6/tasks/P6-T09-homepage-lighthouse-rebaseline.md) |
| LHCI | CLS hard fail ≤0.1; LCP soft warn | [P7-T04](./P7-T04-lighthouse-ci.md) |
| Bundle `/` sync | No Framer / theater bodies / dotlottie | [P7-T07](./P7-T07-bundle-analyzer.md) |

---

## Explicit carry-forward (do not block Phase 8)

| Item | Owner | Notes |
|------|-------|-------|
| Close or keep P6 homepage LCP exception | Field CWV (P7-T05 runbook) | Lab &lt; 2.5s not forced in Phase 7 |
| `/sensor` + `/mascot` product pages | Phase 8 | Legacy `/sensor&mascot` noindex + out of sitemap |
| Continuous content | Living homepage | Keep perf gates on marketing PRs |

---

## Code inventory (Phase 8 starting point)

| Module | Path |
|--------|------|
| Marketing homepage | `app/page.tsx`, `components/marketing/*` |
| Route gate | `lib/marketing-routes.ts` (incl. `/terms`, `/faq`, `/privacy`, `/billing`) |
| SEO constants | `lib/seo.ts` |
| Sitemap / robots | `next-sitemap.config.js`, `public/sitemap.xml`, `public/robots.txt` |
| Analyzer / LHCI | `npm run analyze`, `npm run lhci`, `lighthouserc.cjs` |
| Legacy product chrome | `/dashboard`, `/sensor&mascot` (noindex) |

---

## Sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / engineering | Rohit (via agent session) | Phase 7 complete; proceed to Phase 8 | 2026-07-10 |
