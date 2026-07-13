# Phase 7: Launch Hardening & Ops

**Status:** Complete (2026-07-10)  
**Prerequisite:** [Phase 6 sign-off](./phase-6/tasks/P6-T15-sign-off.md) (2026-07-09)  
**Sign-off:** [P7-T12](./phase-7/tasks/P7-T12-sign-off.md)  
**Task breakdown:** [phase-7-tasks.md](./phase-7-tasks.md)  
**Parent plan:** [phase-6-polish.md](./phase-6-polish.md) · [P1-T17](./phase-1/tasks/P1-T17-performance-budget.md) · [P1-T18](./phase-1/tasks/P1-T18-perf-workflow.md)

Phase 7 hardens the marketing site for ongoing production: finish deferred SEO/copy hygiene, close remaining legacy shells, add optional CI/monitoring, and keep content iteration cheap without shell churn.

---

## Goal

1. Align root + key-route metadata with the approved cognitive-layer narrative (carry-over from P6-T11)
2. Bring `/terms` onto the marketing depth shell (last major legal page still on CSS modules)
3. Optional: depth LCP follow-ups, Lighthouse CI, field CWV monitoring
4. Clean stale Hero references from developer docs
5. Support low-risk content and theater copy iteration

---

## Phase 6 starting point

| Asset | Location | Phase 7 change |
|-------|----------|----------------|
| Marketing homepage | `app/page.tsx`, theaters, sections | Content iteration only unless perf regresses |
| Funnel + legal shells | Most routes on `MarketingDepthLayout` | Finish `/terms`; metadata |
| Image pipeline | `next/image` on | Keep; spot-check after content changes |
| LCP exception | Median 2.93s lab | Monitor field; optional further lab work |
| Hero | Deleted | Docs still mention it in places |

---

## In-scope workstreams

### A. SEO + legal shell

| Item | Work |
|------|------|
| Metadata | Titles/descriptions match P1-T01 / P1-T03; no new em dashes |
| `/terms` | `MarketingDepthLayout` + `mm-*`; delete CSS module |
| Sitemap / robots | Spot-check after route changes (already generated) |

### B. Performance ops

| Item | Work |
|------|------|
| `/inbox` LCP | Advisory follow-up from P5-T14 |
| Lighthouse CI | Optional per P1-T18 |
| Field CWV | CrUX / RUM sketch; revisit P6 LCP exception with real data |
| Bundle analyzer | Confirm Framer / theater chunks stay out of main `/` |

### C. Docs + hygiene

| Item | Work |
|------|------|
| README / QUICK_START | Remove Hero-era instructions |
| Verify scripts | Keep `verify-marketing-routes.mjs` in sync |

### D. Content iteration (ongoing)

| Item | Work |
|------|------|
| Homepage copy | Small edits without reordering locked hero structure unless product reopens P1-T03 |
| Theater captions / demos | Beat tweaks without scroll-kit rewrites |
| Waitlist / contact copy | Form microcopy only |

---

## Design / product contract (unchanged)

| Rule | Source |
|------|--------|
| No mascot / sensor / custom cursor on marketing funnel | P1-T19 |
| Keep `/dashboard` and `/sensor&mascot` | P1-T19 |
| No NVIDIA endorsement beyond approved copy | P1-T11 / P1-T22 |
| Performance budget authority | P1-T17 (lab exception recorded in P6-T09) |
| No em dash in new prose | Workspace rule |

---

## Recommended PR sequence

| PR | Scope | Exit criteria |
|----|-------|---------------|
| **PR1** | Metadata + `/terms` shell | Narrative titles; terms on marketing shell |
| **PR2** | Docs hygiene + verify scripts | No Hero in developer entry docs |
| **PR3** | Optional perf ops | Inbox LCP note or fix; analyzer; CI sketch |
| **PR4** | Content iteration batch | Copy-only; Lighthouse spot-check if homepage touched |

Detailed task IDs: [phase-7-tasks.md](./phase-7-tasks.md).

---

## Explicit non-goals (Phase 7)

- Reworking Phase 4 theater scroll kit or beat-sheet architecture
- Live API data on marketing pages
- Redesigning `/sensor&mascot` or `/dashboard` product chrome
- Forcing homepage lab LCP &lt; 2.5s without field evidence (exception stands until revisited)
- New marketing homepage section map (that is a new Phase 1 decision)

---

## Definition of done (Phase 7)

Phase 7 is complete when:

- [x] Metadata aligned on root + key marketing routes (P7-T01)
- [x] `/terms` on marketing depth shell
- [x] Stale Hero references removed from primary developer docs
- [x] Optional CI / monitoring tasks either done or explicitly deferred in sign-off
- [x] P7 sign-off recorded ([P7-T12](./phase-7/tasks/P7-T12-sign-off.md))

---

## After Phase 7

Continue in **[Phase 8: Sensor & Mascot product pages](./phase-8-sensor-mascot.md)** · tasks: **[phase-8-tasks.md](./phase-8-tasks.md)**.

| Focus | Notes |
|-------|-------|
| Sensor + Mascot depth pages | `/sensor`, `/mascot`; legacy `/sensor&mascot` redirect |
| Product marketing experiments | A/B or copy tests outside this phased plan |
| Desktop app marketing sync | Connector / permission copy as product ships |
| Continuous content | Treat homepage as living; keep perf gates on marketing PRs |
