# P9-T05: GDPR Commitments (Privacy Section)

**Task ID:** P9-T05  
**Status:** done  
**Type:** Copy / legal alignment  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** [P9-T04](./P9-T04-privacy-slack.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Publish clear GDPR / data-subject rights commitments so Marketplace can point a GDPR URL at Privacy. Prefer a Privacy section over a dedicated `/gdpr` page.

---

## Product constraint (locked)

| Claim | Allowed? |
|-------|----------|
| GDPR **certification** / certificate URL | **No** (MindMesh does not hold one) |
| Data subject rights + how to exercise them | **Yes** |
| TAC Security assessment | **Yes**, only as support for **Google API verification**, not as GDPR/SOC/ISO |
| Separate `/gdpr` route | **No** this phase (Privacy `#gdpr` is enough) |

---

## Deliverables

| File | Change |
|------|--------|
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | New `#gdpr` section; TAC note under §6 Data Security; §7 cross-link |

---

## Marketplace submit update

| Field | Value |
|-------|--------|
| GDPR / data rights URL | `https://mindmesh.global/privacy#gdpr` |
| GDPR certificate / SOC URL | **Leave blank** |

Updates [P9-T03](./P9-T03-placeholder-url-audit.md) guidance: GDPR URL is ready; still no cert URL.

---

## Acceptance

- [x] `#gdpr` section lists access, rectification, erasure, restriction, portability, objection, withdraw consent  
- [x] Explicit: no GDPR certification claim  
- [x] TAC Security mentioned only for Google verification; not as GDPR/SOC/ISO  
- [x] No `/gdpr` page  
- [x] No em dashes in new prose  

---

## Out of scope

- Security contact mailbox (P9-T06)  
- Footer links (P9-T07)  
- Publishing TAC report PDF on the site (not required for this task)  

---

## Next

**P9-T06:** Security contact + report blurb on `/security`.
