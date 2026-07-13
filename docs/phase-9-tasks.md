# Phase 9: Task Breakdown

Parent spec: [phase-9-slack-compliance.md](./phase-9-slack-compliance.md) · Phase 8: [phase-8-sensor-mascot.md](./phase-8-sensor-mascot.md) · Sign-off: [P8-T19](./phase-8/tasks/P8-T19-sign-off.md)

This file breaks Phase 9 into tasks for **Slack Marketplace compliance** pages and Privacy / security copy. Expand any task into `docs/phase-9/tasks/P9-T##-*.md` when needed.

**How to use this file**

1. Pick a task by ID (for example `P9-T01`).
2. Read [phase-9-slack-compliance.md](./phase-9-slack-compliance.md) for must/should scope.
3. Implement, then mark status `done` here.
4. Do not mark Phase 9 complete until all **Blocker** tasks are `done` and P9-T08 sign-off is recorded.

**Status values:** `todo` | `in_progress` | `done` | `blocked`

**Prerequisite:** [P8-T19 sign-off](./phase-8/tasks/P8-T19-sign-off.md) (Phase 8 complete, 2026-07-10).

---

## Task index (quick view)

| ID | Task | Status | Blocker? |
|----|------|--------|----------|
| P9-T01 | Lock sub-processors list + copy | done | Yes |
| P9-T02 | Build `/sub-processors` page + route gate + sitemap | done | Yes |
| P9-T03 | Placeholder URL audit (Marketplace fields + site) | done | Yes |
| P9-T04 | Privacy Policy Slack alignment | done | Yes |
| P9-T05 | GDPR commitments (Privacy section and/or `/gdpr`) | done | No |
| P9-T06 | Security contact + `/security` report blurb | done | No |
| P9-T07 | Cross-links (footer / security / privacy) | done | No |
| P9-T08 | Phase 9 sign-off checklist | done | Yes |

**Total:** 8 tasks · **Blockers:** 5 · **Phase 9:** complete (P9-T08) · **Next:** [Phase 10 theater upgrades](./phase-10-tasks.md)

---

## Workstream A: Sub-processors

### P9-T01 — Lock sub-processors list + copy

**Status:** done  
**Blocker:** Yes  
**Depends on:** Product / legal confirmation of real processors  
**Blocks:** P9-T02  
**Doc:** [P9-T01-sub-processors-copy.md](./phase-9/tasks/P9-T01-sub-processors-copy.md) (completed 2026-07-10)

**Goal:** Freeze the public list (e.g. AWS, Neon, OpenAI, others that process customer data): name, purpose, contact. No placeholders.

**Done:** Locked AWS, Neon, OpenAI, Resend, Vercel (+ purposes / privacy URLs). Connected OAuth apps stay on Privacy. Content module: `lib/marketing-sub-processors.ts`.

---

### P9-T02 — Build `/sub-processors` page + route gate + sitemap

**Status:** done  
**Blocker:** Yes  
**Depends on:** P9-T01, [P5-T02](./phase-5/tasks/P5-T02-marketing-depth-layout.md), [P8-T08](./phase-8/tasks/P8-T08-marketing-route-gate.md)  
**Blocks:** P9-T07, P9-T08  
**Doc:** [P9-T02-sub-processors-page.md](./phase-9/tasks/P9-T02-sub-processors-page.md) (completed 2026-07-10)

**Goal:** `app/sub-processors/page.tsx` on `MarketingDepthLayout`; add `/sub-processors` to `MARKETING_FUNNEL_PATHS` + verify script; regenerate sitemap.

**Done:** Page live from content module; funnel has 15 paths; verify script ok; sitemap includes `/sub-processors`.

---

## Workstream B: Privacy + submit hygiene

### P9-T03 — Placeholder URL audit

**Status:** done  
**Blocker:** Yes  
**Depends on:** P9-T02 (for real sub-processors URL)  
**Blocks:** P9-T08  
**Doc:** [P9-T03-placeholder-url-audit.md](./phase-9/tasks/P9-T03-placeholder-url-audit.md) (completed 2026-07-10)

**Goal:** Grep site + Marketplace submit draft for `example.com` and empty SOC/GDPR/security URLs. Publish real pages or leave optional fields blank.

**Done:** No compliance placeholder URLs on site. Submit matrix locked (Privacy, Terms, Security, Sub-processors, Contact). SOC blank; GDPR → Privacy after P9-T05 or blank.

---

### P9-T04 — Privacy Policy Slack alignment

**Status:** done  
**Blocker:** Yes  
**Depends on:** Product truth on Slack scopes / retention / LLM use  
**Blocks:** P9-T05, P9-T08  
**Doc:** [P9-T04-privacy-slack.md](./phase-9/tasks/P9-T04-privacy-slack.md) (completed 2026-07-10)

**Goal:** Update [`app/privacy/page.tsx`](../app/privacy/page.tsx): Slack as connected service; data categories; retention / disconnect / deletion (incl. soft-disconnect); LLM processing. Terms unchanged this phase.

**Done:** `#slack-connection` section shipped; §5/§7/§8 updated; `/sub-processors` linked.

---

## Workstream C: GDPR + security (recommended)

### P9-T05 — GDPR commitments

**Status:** done  
**Blocker:** No  
**Depends on:** P9-T04  
**Blocks:** —  
**Doc:** [P9-T05-gdpr.md](./phase-9/tasks/P9-T05-gdpr.md) (completed 2026-07-10)

**Goal:** Clear GDPR/rights section on Privacy (preferred), or dedicated `/gdpr` if Marketplace wants a distinct URL. Pointing GDPR URL at Privacy is OK only if Privacy states the commitments.

**Done:** `#gdpr` rights section on Privacy (no cert claim). TAC Security noted under Data Security for Google verification only. Submit URL: `https://mindmesh.global/privacy#gdpr`.

---

### P9-T06 — Security contact + report blurb

**Status:** done  
**Blocker:** No  
**Depends on:** Mailbox decision (monitored alias only)  
**Blocks:** —  
**Doc:** [P9-T06-security-contact.md](./phase-9/tasks/P9-T06-security-contact.md) (completed 2026-07-10; corrected to `team@`)

**Goal:** Document monitored security alias; add “Report a security issue” on [`app/security/page.tsx`](../app/security/page.tsx); update Privacy contact if needed.

**Done:** `#report-security-issue` on `/security`; contact `team@mindmesh.global` (monitored). Do not publish `security@` until that mailbox exists.

---

### P9-T07 — Cross-links

**Status:** done  
**Blocker:** No  
**Depends on:** P9-T02, P9-T04  
**Blocks:** —  
**Doc:** [P9-T07-cross-links.md](./phase-9/tasks/P9-T07-cross-links.md) (completed 2026-07-10)

**Goal:** Footer / security / privacy links to sub-processors (and GDPR if separate). Keep marketing nav uncluttered.

**Done:** Footer + security + privacy + sub-processors cross-links; GDPR via `/privacy#gdpr`; nav unchanged.

---

## Workstream D: Sign-off

### P9-T08 — Phase 9 sign-off checklist

**Status:** done  
**Blocker:** Yes  
**Depends on:** All blockers through P9-T04  
**Blocks:** —  
**Doc:** [P9-T08-sign-off.md](./phase-9/tasks/P9-T08-sign-off.md) (completed 2026-07-10)

**Goal:** Formal gate: sub-processors live, Privacy Slack-aligned, placeholder audit clean; recommended items done or explicitly deferred.

**Done:** Phase 9 complete. Marketplace cheat sheet locked (security contact = `team@`). Carry-forward: Phase 10 theaters. Phase 10 task list authored.

---

## Explicit non-goals (reminder)

- Sensor / Mascot theater rewrites (Phase 10)  
- Live Slack API demos  
- `/dashboard` redesign  
