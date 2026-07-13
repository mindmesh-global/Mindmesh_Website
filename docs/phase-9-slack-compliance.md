# Phase 9: Slack Marketplace Compliance

**Status:** Complete (2026-07-10)  
**Prerequisite:** [Phase 8 sign-off](./phase-8/tasks/P8-T19-sign-off.md) (P8-T19, 2026-07-10)  
**Sign-off:** [P9-T08](./phase-9/tasks/P9-T08-sign-off.md)  
**Task breakdown:** [phase-9-tasks.md](./phase-9-tasks.md)  
**Parent context:** Slack Marketplace verification checklist (external) · [app/privacy/page.tsx](../app/privacy/page.tsx) · [app/security/page.tsx](../app/security/page.tsx)

Phase 9 ships the **must / should** website work for Slack Marketplace review: sub-processors, Privacy Slack alignment, GDPR commitments, real security contact, and no placeholder URLs.

Richer Sensor/Mascot theater demos are **out of scope** here (see [Phase 10](./phase-10-theater-upgrades.md)).

---

## Goal

1. Publish a real `/sub-processors` page (processors, purpose, contact)
2. Ensure Marketplace submit fields use real URLs or stay blank (no `example.com`)
3. Align Privacy Policy with Slack as a connected service (data categories, retention / disconnect / deletion, LLM processing)
4. Add clear GDPR / rights commitments (Privacy section and/or `/gdpr`)
5. Publish a monitored security contact (`team@mindmesh.global`) and a short report blurb on `/security`

---

## Must do

| # | Work | Suggested URL / surface |
|---|------|-------------------------|
| 1 | Sub-processors page | `https://mindmesh.global/sub-processors` |
| 2 | Placeholder URL audit | Grep submit fields + site; publish or leave blank |
| 3 | Privacy Slack alignment | [`app/privacy/page.tsx`](../app/privacy/page.tsx) |

### Privacy Slack coverage (required topics)

- Slack as a connected service  
- What Slack data may sync (messages, channels, users, files, reactions, DMs per approved scopes)  
- Retention / disconnect / deletion (including soft-disconnect if data is retained for reconnect)  
- LLM processing of Slack content where that happens  

Terms can stay as-is for this phase.

---

## Strongly recommended

| # | Work | Notes |
|---|------|-------|
| 4 | GDPR commitments | Prefer a clear section on Privacy (Marketplace URL may point at Privacy if content is real), or dedicated `/gdpr` |
| 5 | Security contact | Use monitored `team@mindmesh.global`; “Report a security issue” on `/security`. Do not invent `security@` |

---

## Implementation notes

- Use `MarketingDepthLayout` + `MARKETING_FUNNEL_PATHS` + sitemap for any new public pages  
- Host in OG / sitemap: `mindmesh.global` (no `www` unless product changes canonical)  
- No em dashes in new prose  
- Do not rewrite Sensor/Mascot beat sheets in this phase  

---

## Explicit non-goals

- Rewriting Sensor / Mascot theaters  
- Live Slack API demos on the marketing site  
- `/dashboard` redesign  
- Changing homepage Connect / Focus / Execute  

---

## Definition of done

- [x] `/sub-processors` live, linked, in funnel + sitemap ([P9-T02](./phase-9/tasks/P9-T02-sub-processors-page.md) + [P9-T07](./phase-9/tasks/P9-T07-cross-links.md))  
- [x] No placeholder URLs in Marketplace-critical fields ([P9-T03](./phase-9/tasks/P9-T03-placeholder-url-audit.md))  
- [x] Privacy covers Slack topics above ([P9-T04](./phase-9/tasks/P9-T04-privacy-slack.md))  
- [x] GDPR commitments published (section and/or `/gdpr`) ([P9-T05](./phase-9/tasks/P9-T05-gdpr.md); Privacy `#gdpr`, no cert)  
- [x] Security contact + report blurb on `/security` ([P9-T06](./phase-9/tasks/P9-T06-security-contact.md))  
- [x] Phase 9 sign-off recorded ([P9-T08](./phase-9/tasks/P9-T08-sign-off.md))  

---

## After Phase 9

| Focus | Notes |
|-------|-------|
| **Phase 10: Theater upgrades** | [phase-10-theater-upgrades.md](./phase-10-theater-upgrades.md) · [phase-10-tasks.md](./phase-10-tasks.md): Sensor calc/definition; Mascot attachment search; mascot icons |
| Marketplace submit | Use cheat sheet in [P9-T08](./phase-9/tasks/P9-T08-sign-off.md); security email is `team@mindmesh.global` |
| Homepage lab LCP exception | Still open from P6 (~2.93s); field CWV via P7-T05 |
