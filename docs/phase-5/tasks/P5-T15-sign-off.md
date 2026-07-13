# P5-T15: Phase 5 Sign-Off Checklist

**Task ID:** P5-T15  
**Status:** done  
**Type:** Formal gate (documentation + verification)  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** P5-T01–T14  
**Unblocks:** [Phase 6 polish + Hero deletion](../phase-6-polish.md)

---

## Verdict

**Phase 5 is complete.** All 15 tasks are `done`. All blocker deliverables exist. Phase 6 Hero deletion, redirects, and LCP polish may begin.

| Gate | Result |
|------|--------|
| Blocker tasks (12) | ✅ All done |
| Non-blocker tasks (3) | ✅ P5-T09, T10, T14 done |
| Child task docs | ✅ 15/15 in `docs/phase-5/tasks/` |
| Six funnel depth routes on marketing shell | ✅ |
| 7-app `/connected-apps` + FAQ/privacy copy | ✅ |
| Manrope once from root | ✅ |
| Depth Lighthouse spot-check | ✅ Advisory baselines recorded |
| Phase 6 entry + task list | ✅ [phase-6-polish.md](../phase-6-polish.md), [phase-6-tasks.md](../phase-6-tasks.md) |

---

## Master checklist (from phase-5-depth-pages.md)

- [x] Marketing shell covers all six primary funnel depth routes
- [x] `/connected-apps` shows all 7 integrations with canonical names and icons
- [x] Feature grid destinations render with marketing theme (no legacy `SiteNav`-only chrome)
- [x] FAQ and privacy name Slack + Jira where required
- [x] Manrope loaded once from root (no per-page duplicate subsets)
- [x] P5-T15 sign-off recorded (this doc)

---

## Blocker task sign-off

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P5-T01 | Expand marketing route gate | [P5-T01](./P5-T01-marketing-route-gate.md) | ✅ |
| P5-T02 | `MarketingDepthLayout` | [P5-T02](./P5-T02-marketing-depth-layout.md) | ✅ |
| P5-T03 | `/connected-apps` 7-app | [P5-T03](./P5-T03-connected-apps-refactor.md) | ✅ |
| P5-T04 | `/inbox` alignment | [P5-T04](./P5-T04-inbox-alignment.md) | ✅ |
| P5-T05 | `/yesterdays-narrative` | [P5-T05](./P5-T05-yesterdays-narrative-alignment.md) | ✅ |
| P5-T06 | `/upcoming-events` | [P5-T06](./P5-T06-upcoming-events-alignment.md) | ✅ |
| P5-T07 | `/security` trust | [P5-T07](./P5-T07-security-trust-alignment.md) | ✅ |
| P5-T08 | `/trust` social proof | [P5-T08](./P5-T08-trust-social-proof-alignment.md) | ✅ |
| P5-T11 | Cross-link + nav | [P5-T11](./P5-T11-cross-link-nav-consistency.md) | ✅ |
| P5-T12 | Manrope consolidation | [P5-T12](./P5-T12-manrope-font-consolidation.md) | ✅ |
| P5-T13 | Depth token migration | [P5-T13](./P5-T13-depth-page-token-migration.md) | ✅ |
| P5-T15 | This sign-off | This doc | ✅ |

### Non-blockers (also done)

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P5-T09 | FAQ 7-app copy | [P5-T09](./P5-T09-faq-integration-copy.md) | ✅ |
| P5-T10 | Privacy third-party list | [P5-T10](./P5-T10-privacy-third-party-list.md) | ✅ |
| P5-T14 | Depth Lighthouse spot-check | [P5-T14](./P5-T14-depth-page-lighthouse.md) | ✅ |

---

## Verification snapshot (2026-07-09)

| Check | Result |
|-------|--------|
| `node scripts/verify-marketing-routes.mjs` | ok |
| HTTP 200 on `/` + six depth routes | Pass |
| `SiteNav` absent on sample depth HTML | Pass |
| Slack + Jira on `/connected-apps` | Pass |
| `Manrope(` only in `app/layout.tsx` | Pass |
| Depth Lighthouse baselines | [depth-pages-lighthouse.md](../baselines/depth-pages-lighthouse.md) |

---

## Performance summary (Phase 5)

| Check | Result | Doc |
|-------|--------|-----|
| Slim marketing shell on funnel routes | Pass | P5-T01–T08 |
| No duplicate Manrope loads | Pass | [P5-T12](./P5-T12-manrope-font-consolidation.md) |
| Depth mobile Lighthouse (advisory) | Pass recorded | [P5-T14](./P5-T14-depth-page-lighthouse.md) |
| CLS on depth routes | 0 all six | Baselines |
| Long-task proxy | ≤ 90ms | Baselines |
| `/inbox` LCP outlier (5.4s) | Noted, non-blocking | Follow up in Phase 6 if gated |

**Still deferred to Phase 6:** Homepage LCP &lt; 2.5s, OG refresh, `images.unoptimized` flip, Hero deletion.

---

## Explicit deferrals (do not block Phase 6)

| Item | Phase | Notes |
|------|-------|-------|
| Homepage LCP &lt; 2.5s | 6 | [P3-T16](../../phase-3/tasks/P3-T16-homepage-lcp-revisit.md) |
| Hero deletion + redirects | 6 | [P1-T19](../../phase-1/tasks/P1-T19-deprecation-reuse.md) |
| `/faq`, `/privacy`, `/billing` full marketing shell | 6 | Copy-only done for FAQ/privacy |
| `/sensor&mascot` redesign | 8 | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md) |
| Dashboard mockup 7-app alignment | 6 optional | [P1-T20](../../phase-1/tasks/P1-T20-integrations-audit.md) |
| Theater depth-link sticky footer fix | — | Shipped during Phase 5 (Execute overlap); not a separate task ID |

---

## Code inventory (Phase 6 starting point)

| Module | Path |
|--------|------|
| Marketing route gate | `lib/marketing-routes.ts` |
| Depth layout | `components/marketing/MarketingDepthLayout.tsx` |
| Nav / footer | `MarketingNav.tsx`, `MarketingFooter.tsx` |
| Integrations | `lib/marketing-integrations.ts` |
| Trust content | `lib/marketing-trust-content.ts` |
| Funnel depth pages | `app/{inbox,connected-apps,yesterdays-narrative,upcoming-events,security,trust}/page.tsx` |
| Legacy Hero still live | `lib/mindmesh-hero-routes.ts`, `components/Hero.tsx` |
| Image config | `next.config.js` → `images.unoptimized: true` |

---

## Next steps

1. Start **Phase 6** from [phase-6-polish.md](../phase-6-polish.md)
2. First recommended task: **P6-T01** inventory remaining Hero routes
3. Parallel track: homepage LCP polish (P6-T08+) while redirects land
