# P9-T08: Phase 9 Sign-Off Checklist

**Task ID:** P9-T08  
**Status:** done  
**Type:** Formal gate (documentation + verification)  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** All blockers through P9-T04; recommended T05–T07 done  
**Unblocks:** [Phase 10 theater upgrades](../phase-10-theater-upgrades.md) · [phase-10-tasks.md](../phase-10-tasks.md)

---

## Verdict

**Phase 9 is complete.** All **blocker** tasks are `done`. All recommended tasks (T05–T07) are also `done`.

| Gate | Result |
|------|--------|
| Blocker tasks (5) | All done (T01–T04, T08) |
| Recommended tasks (3) | All done (T05–T07) |
| Child task docs | 8/8 under `docs/phase-9/tasks/` |
| `/sub-processors` | Live, funnel + sitemap + footer |
| Privacy Slack + GDPR | `#slack-connection`, `#gdpr` (no cert claim) |
| Security contact | `team@mindmesh.global` + report blurb |
| Placeholder audit | Submit matrix locked; SOC blank |
| Phase 10 entry | Spec + task list ready |

---

## Master checklist (from phase-9-slack-compliance.md)

- [x] `/sub-processors` live, linked, in funnel + sitemap  
- [x] No placeholder URLs in Marketplace-critical fields  
- [x] Privacy covers Slack topics (connected service, categories, retention/disconnect, LLM)  
- [x] GDPR commitments published (Privacy `#gdpr`; no certification claim)  
- [x] Security contact + report blurb on `/security`  
- [x] P9-T08 sign-off recorded (this doc)

---

## Blocker task sign-off

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P9-T01 | Sub-processors copy | [P9-T01](./P9-T01-sub-processors-copy.md) | done |
| P9-T02 | `/sub-processors` page + gate + sitemap | [P9-T02](./P9-T02-sub-processors-page.md) | done |
| P9-T03 | Placeholder URL audit | [P9-T03](./P9-T03-placeholder-url-audit.md) | done |
| P9-T04 | Privacy Slack alignment | [P9-T04](./P9-T04-privacy-slack.md) | done |
| P9-T08 | This sign-off | This doc | done |

### Recommended / non-blocker (all done)

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P9-T05 | GDPR rights (no cert) | [P9-T05](./P9-T05-gdpr.md) | done |
| P9-T06 | Security contact | [P9-T06](./P9-T06-security-contact.md) | done |
| P9-T07 | Cross-links | [P9-T07](./P9-T07-cross-links.md) | done |

---

## Marketplace submit cheat sheet (final)

| Field | Value |
|-------|--------|
| Privacy Policy | `https://mindmesh.global/privacy` |
| Terms | `https://mindmesh.global/terms` |
| Security page | `https://mindmesh.global/security` |
| Sub-processors | `https://mindmesh.global/sub-processors` |
| GDPR / rights | `https://mindmesh.global/privacy#gdpr` |
| Security contact email | `team@mindmesh.global` (monitored; subject “Security report”) |
| Support / contact | `https://mindmesh.global/contact` |
| App homepage | `https://mindmesh.global` |
| SOC / GDPR certificate URL | **Leave blank** |

**Ops:** Do not list `security@mindmesh.global` on Marketplace until that mailbox exists and is monitored.

---

## Verification snapshot (2026-07-10)

| Check | Result |
|-------|--------|
| `node scripts/verify-marketing-routes.mjs` | ok (15 funnel paths incl. `/sub-processors`; footer includes it) |
| `app/sub-processors/page.tsx` | `MarketingDepthLayout` + content module |
| `app/privacy/page.tsx` | `#slack-connection`, `#gdpr`, TAC note (Google verification only) |
| `app/security/page.tsx` | `#report-security-issue` + `team@` |
| Footer | Security · Privacy · Sub-processors · Terms · Contact |
| Sitemap | Includes `https://mindmesh.global/sub-processors` |
| No GDPR/SOC cert claims | Explicit in Privacy + P9-T03/T05 |

---

## Explicit carry-forward (do not reopen Phase 9)

| Item | Phase | Notes |
|------|-------|-------|
| Sensor calc / definition theater | **10** | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md) · [phase-10-tasks.md](../phase-10-tasks.md) |
| Mascot attachment-search theater | **10** | Same |
| Mascot icon / skin showcase | **10** | Local assets |
| Optional later: dedicated `security@` mailbox | Ops | Only publish after it is monitored; site uses `team@` today |
| Homepage lab LCP exception (~2.93s) | Ops | Still open from P6; field CWV via P7-T05 |

---

## Code inventory (Phase 10 starting point)

| Module | Path |
|--------|------|
| Sub-processors | `app/sub-processors/page.tsx`, `lib/marketing-sub-processors.ts` |
| Privacy / security | `app/privacy/page.tsx`, `app/security/page.tsx` |
| Route gate / footer | `lib/marketing-routes.ts` (15 funnel paths) |
| Sensor / Mascot theaters (extend in P10) | `SensorTheaterDemo.tsx`, `MascotTheaterDemo.tsx`, `lib/marketing-theater-scroll.ts` |

---

## Sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / engineering | Rohit (via agent session) | Phase 9 complete; proceed to Phase 10 theater upgrades; Marketplace submit using cheat sheet above | 2026-07-10 |
