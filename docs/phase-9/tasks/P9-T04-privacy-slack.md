# P9-T04: Privacy Policy Slack Alignment

**Task ID:** P9-T04  
**Status:** done  
**Type:** Copy / legal alignment  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** Product truth on Slack scopes / retention / LLM use (aligned with existing Privacy + local-first claims)  
**Blocks:** P9-T05, P9-T08  
**Blocker:** Yes

---

## Goal

Update [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) so Marketplace reviewers can see Slack as a connected service, data categories, retention / disconnect / deletion (including soft-disconnect), and LLM processing. Terms unchanged.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | New `#slack-connection` section; §5 / §7 / §8 cross-links; sub-processors link; last-updated line |

---

## Coverage checklist (Phase 9 must)

| Topic | Where |
|-------|--------|
| Slack as connected service | `#slack-connection` + intro |
| Data categories (messages, channels, users, files, reactions, DMs per scopes) | `#slack-connection` |
| Local-first + minimal cloud tokens | `#slack-connection` + §3 |
| LLM processing of Slack content (OpenAI; no training / no sale) | `#slack-connection` + §5 |
| Disconnect / token deletion / local clear / uninstall | `#slack-connection` + §7 |
| Soft-disconnect if local index retained | `#slack-connection` + §8 |
| Slack privacy policy link | `#slack-connection` |
| Sub-processors cross-link | §5 → `/sub-processors` |

---

## Acceptance

- [x] Dedicated Slack Connection section with `id="slack-connection"`  
- [x] Categories named; scoped to approved OAuth scopes  
- [x] Retention / disconnect / deletion + soft-disconnect language  
- [x] LLM processing called out for Slack content  
- [x] Terms page untouched  
- [x] No em dashes in new prose  
- [x] Link to `/sub-processors`  

---

## Out of scope

- GDPR rights section (P9-T05)  
- `security@` contact (P9-T06)  
- Footer cross-links (P9-T07)  
- Terms rewrite  

---

## Next

**P9-T05:** GDPR commitments on Privacy (or `/gdpr`).
