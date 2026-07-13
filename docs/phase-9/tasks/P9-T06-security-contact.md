# P9-T06: Security Contact + `/security` Report Blurb

**Task ID:** P9-T06  
**Status:** done  
**Type:** Copy / implementation  
**Completed:** 2026-07-10  
**Updated:** 2026-07-10 (mailbox correction: use monitored `team@`, not `security@`)  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** Mailbox decision (monitored alias only)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Publish a monitored security contact and a short “Report a security issue” blurb on `/security`. Point Privacy contact at the same alias for vulnerability reports.

---

## Mailbox decision (locked)

| Alias | Role |
|-------|------|
| `team@mindmesh.global` | Monitored inbox for security reports **and** general product / privacy questions |

**Do not publish** `security@mindmesh.global` until that mailbox exists and is monitored.

Ask reporters to use subject **Security report** so the team can prioritize.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/security/page.tsx`](../../../app/security/page.tsx) | `#report-security-issue` section with blurb + `team@` |
| [`app/privacy/page.tsx`](../../../app/privacy/page.tsx) | Contact Us: security report line + link to `/security#report-security-issue` |

---

## Marketplace submit update

| Field | Value |
|-------|--------|
| Security contact email | `team@mindmesh.global` |
| Security page URL | `https://mindmesh.global/security` (anchor: `#report-security-issue`) |

---

## Acceptance

- [x] “Report a security issue” on `/security` with `id="report-security-issue"`  
- [x] Primary contact is the monitored `team@mindmesh.global`  
- [x] Privacy Contact Us references same alias + Security page  
- [x] No em dashes in new prose  
- [x] No fake bug-bounty / SOC claims  
- [x] No unpublished `security@` address on the site  

---

## Out of scope

- Footer / sub-processors cross-links (P9-T07)  
- Creating a separate `security@` mailbox (optional later)  

---

## Next

**P9-T07:** Cross-links (footer / security / privacy → sub-processors).
