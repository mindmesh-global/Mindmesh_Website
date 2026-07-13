# P9-T07: Cross-Links (Footer / Security / Privacy)

**Task ID:** P9-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** [P9-T02](./P9-T02-sub-processors-page.md), [P9-T04](./P9-T04-privacy-slack.md), [P9-T05](./P9-T05-gdpr.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Wire discoverable links to `/sub-processors` (and GDPR via Privacy `#gdpr`) from footer, security, and privacy. Keep sticky marketing nav uncluttered (no new nav items).

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Footer: add Sub-processors between Privacy and Terms |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Assert footer includes `/sub-processors` |
| [`app/security/page.tsx`](../../../app/security/page.tsx) | Trust CTA row: Sub-processors → |
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | Contact Us related links (sub-processors, GDPR, security) |
| [`app/sub-processors/page.tsx`](../../../app/sub-processors/page.tsx) | Contact related links (privacy, GDPR, security) |

§5 Privacy already linked `/sub-processors` (P9-T04). No dedicated `/gdpr` page; GDPR stays ` /privacy#gdpr`.

---

## Link map

| From | To |
|------|----|
| Footer (all marketing pages) | `/sub-processors` |
| `/security` trust CTAs | `/sub-processors` |
| `/privacy` Contact Us | `/sub-processors`, `/privacy#gdpr`, `/security` |
| `/privacy` §5 | `/sub-processors` (existing) |
| `/sub-processors` Contact | `/privacy`, `/privacy#gdpr`, `/security` |
| Sticky nav | Unchanged (Product / Features / Security hashes only) |

---

## Acceptance

- [x] Footer lists Sub-processors  
- [x] Security page links to sub-processors  
- [x] Privacy Contact Us related links present  
- [x] Sub-processors page links back to Privacy / GDPR / Security  
- [x] Marketing nav not expanded  
- [x] `node scripts/verify-marketing-routes.mjs` → ok  

---

## Out of scope

- Phase 9 sign-off (P9-T08)  
- Sticky nav legal links  

---

## Next

**P9-T08:** Phase 9 sign-off checklist.
