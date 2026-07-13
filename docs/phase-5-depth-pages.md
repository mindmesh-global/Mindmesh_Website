# Phase 5: Depth Pages

**Status:** Complete (signed off 2026-07-09)  
**Prerequisite:** [Phase 4 sign-off](./phase-4/tasks/P4-T14-sign-off.md) (2026-07-06)  
**Sign-off:** [P5-T15](./phase-5/tasks/P5-T15-sign-off.md)  
**Task breakdown:** [phase-5-tasks.md](./phase-5-tasks.md)  
**Next:** [phase-6-polish.md](./phase-6-polish.md) · [phase-6-tasks.md](./phase-6-tasks.md)  
**Parent plan:** [phase-1-foundation.md](./phase-1-foundation.md) · [P1-T09 feature grid](./phase-1/tasks/P1-T09-feature-grid.md) · [P1-T19 deprecation map](./phase-1/tasks/P1-T19-deprecation-reuse.md) · [P1-T20 integrations audit](./phase-1/tasks/P1-T20-integrations-audit.md)

Phase 5 aligns **feature and trust depth pages** with the new marketing homepage: shared dark theme, 7-app integration story, consistent nav/footer, and copy that matches the Connect / Prioritize / Execute narrative from Phase 4 theaters.

---

## Goal

1. Extend the marketing shell from `/` to the primary funnel depth routes
2. Refactor five feature grid destinations plus `/trust` to use marketing tokens and approved copy
3. Close website vs product gaps from [P1-T20](./phase-1/tasks/P1-T20-integrations-audit.md) (7-app list, Slack/Jira naming)
4. Consolidate duplicate Manrope loads and per-page CSS vars onto the shared marketing theme

---

## Phase 4 starting point

| Asset | Location | Phase 5 change |
|-------|----------|----------------|
| Marketing homepage | `app/page.tsx`, `components/marketing/*` | Reference for copy + visual language |
| Marketing shell gate | `lib/marketing-routes.ts`, `RootAppShell.tsx` | Expand beyond `/` only |
| Integration constant | `lib/marketing-integrations.ts` | Reuse on `/connected-apps`, FAQ, trust |
| Demo fixtures | `lib/marketing-demo-data.ts` | Optional reuse on depth page mockups |
| Feature grid links | `FeatureGridSection.tsx` | Already point to depth routes |
| Depth pages today | `app/inbox`, `/connected-apps`, etc. | Each uses local CSS + `SiteNav` |

**Homepage theaters (Phase 4):** No changes required in Phase 5 unless copy drift is found during depth page work.

---

## In-scope routes

Primary funnel (from [P1-T09](./phase-1/tasks/P1-T09-feature-grid.md) + homepage trust section):

| Route | Role | Priority |
|-------|------|----------|
| `/connected-apps` | Connect pillar depth | **P0** (5-app → 7-app gap) |
| `/inbox` | Prioritize + Execute depth | P0 |
| `/yesterdays-narrative` | Prioritize depth | P1 |
| `/upcoming-events` | Prioritize + Execute depth | P1 |
| `/security` | Trust / conversion depth | P1 |
| `/trust` | Social proof depth | P1 |

### Copy-only alignment (smaller scope)

| Route | Work |
|-------|------|
| `/faq` | Integration answer → 7 apps ([P1-T20](./phase-1/tasks/P1-T20-integrations-audit.md)) |
| `/privacy` | Third-party services list (Slack, Jira, Atlassian) |

---

## Design contract

| Rule | Source |
|------|--------|
| Dark marketing theme (`[data-marketing-theme="dark"]`) | [P1-T13](./phase-1/tasks/P1-T13-color-tokens.md), Phase 2 tokens |
| Manrope display + Inter body from root layout | [P1-T14](./phase-1/tasks/P1-T14-typography.md) |
| No mascot, sensor bar, custom cursor | [P1-T19](./phase-1/tasks/P1-T19-deprecation-reuse.md) |
| `MARKETING_INTEGRATIONS` as single app list | [P1-T10](./phase-1/tasks/P1-T10-integrations.md), [P1-T20](./phase-1/tasks/P1-T20-integrations-audit.md) |
| `MarketingNav` + `MarketingFooter` on funnel pages | Extend [P2-T03](./phase-2/tasks/P2-T03-marketing-layout.md) |

---

## Recommended PR sequence

| PR | Scope | Exit criteria |
|----|-------|---------------|
| **PR1** | Shell + `/connected-apps` | Marketing route gate; 7 apps; shared nav/footer |
| **PR2** | Inbox + narrative + events | Three feature pages on marketing layout |
| **PR3** | Security + trust | Trust pillar aligned with homepage |
| **PR4** | FAQ/privacy copy + QA | Legal/integration copy; Lighthouse spot-check |

Detailed task IDs: [phase-5-tasks.md](./phase-5-tasks.md).

---

## Performance checklist

From [P1-T17](./phase-1/tasks/P1-T17-performance-budget.md):

- [ ] Depth pages use slim marketing shell (no legacy Hero providers)
- [ ] No duplicate Manrope `@next/font` loads per page
- [ ] No mascot / Lottie / custom cursor on funnel routes
- [ ] Lighthouse spot-check on refactored pages (manual, dev or prod)
- [ ] Cross-links back to homepage `#connect`, `#focus`, `#execute` where relevant

**Deferred:** Homepage LCP < 2.5s, OG image refresh, `next/image` optimization ([Phase 6](./phase-3-scroll-kit.md#after-phase-3)).

---

## Explicit non-goals (Phase 5)

- Hero deletion and `/app-directory` redirects ([Phase 6](./phase-1/tasks/P1-T19-deprecation-reuse.md))
- Homepage theater animation changes
- Live API / real user data on marketing pages
- Dashboard mockup 7-app refactor (`DashboardDesktopShell.tsx`) unless explicitly scoped
- `/billing`, `/contact`, `/waitlist` plain-page migration (Phase 6)
- Sensor & mascot page redesign

---

## Definition of done (Phase 5 preview)

Phase 5 is complete when:

- [x] Marketing shell covers all six primary funnel depth routes
- [x] `/connected-apps` shows all 7 integrations with canonical names and icons
- [x] Feature grid destinations render with marketing theme (no legacy `SiteNav`-only chrome)
- [x] FAQ and privacy name Slack + Jira where required
- [x] Manrope loaded once from root (no per-page duplicate subsets)
- [x] P5-T15 sign-off recorded

---

## After Phase 5

| Phase | Focus |
|-------|-------|
| **6** | Hero deletion, LCP polish, OG refresh, image optimization, legacy redirects → [phase-6-polish.md](./phase-6-polish.md) |
