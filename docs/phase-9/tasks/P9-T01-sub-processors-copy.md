# P9-T01: Lock Sub-Processors List + Copy

**Task ID:** P9-T01  
**Status:** done  
**Type:** Strategy / documentation (no page UI in this task)  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** Product truth from Privacy + contact stack + Phase 9 plan  
**Blocks:** P9-T02  
**Blocker:** Yes

---

## Goal

Freeze the public sub-processors list (name, purpose, privacy URL) and page chrome copy for `/sub-processors`. No placeholders. No page UI here; P9-T02 builds the route.

---

## Scope distinction (locked)

| Category | What it is | On `/sub-processors`? |
|----------|------------|------------------------|
| **Sub-processors** | Vendors MindMesh engages to process customer data on our behalf | Yes (primary table) |
| **Connected services** | OAuth / integrations the user chooses (Google, Microsoft, Slack, Atlassian) | Short note + link to Privacy only; not listed as MindMesh sub-processors |

Connected services stay on Privacy §5 (and deepen in P9-T04). Listing Slack as a MindMesh sub-processor would misstate the relationship.

---

## Locked sub-processors table

Sources: Privacy (OpenAI), contact API (Resend), Phase 9 plan (AWS, Neon), deploy docs (Vercel).

| Name | Purpose | Privacy / trust URL |
|------|---------|---------------------|
| Amazon Web Services (AWS) | Cloud infrastructure for account, auth, and related backend services | https://aws.amazon.com/privacy/ |
| Neon | Managed Postgres for account and session-related cloud data | https://neon.tech/privacy-policy |
| OpenAI | AI API processing for insights, action items, and semantic search when features require it | https://openai.com/privacy |
| Resend | Transactional email for contact and similar product emails | https://resend.com/legal/privacy-policy |
| Vercel | Hosting and delivery of the MindMesh marketing website and related web surfaces | https://vercel.com/legal/privacy-policy |

### Explicitly out of this table

- Google, Microsoft, Slack, Atlassian (user-connected; Privacy)  
- SMTP mailbox providers the user configures  
- Analytics / error tools not confirmed in product truth for this pass  

If product later adds or removes a vendor, update `lib/marketing-sub-processors.ts` and bump the page “Last updated” date in P9-T02.

---

## Locked page chrome

| Element | Copy |
|---------|------|
| Route | `/sub-processors` |
| Canonical / OG URL | `https://mindmesh.global/sub-processors` |
| Metadata title | Sub-processors |
| Metadata description | Third-party vendors that process MindMesh customer data on our behalf, and why we use them. |
| OG title | MindMesh \| Sub-processors |
| Eyebrow | Legal |
| H1 | Sub-processors |
| Subtitle | Vendors that process customer data on MindMesh's behalf. Connected apps you authorize are covered in our Privacy Policy. |
| Intro | MindMesh uses a small set of service providers to run the product. This page lists those sub-processors, what they do for us, and where to read their privacy practices. We update this list when our vendors change. |
| Connected-services note | When you connect Google, Microsoft, Slack, Atlassian, or an SMTP mailbox, those providers process data under their own terms and the scopes you approve. See Privacy for details. |
| Contact lead-in | Questions about this list: |
| Contact email | `team@mindmesh.global` |
| Secondary link | Privacy Policy → `/privacy` |
| Back link | See security → `/security` |
| Last updated | 2026-07-10 |

No em dashes in published copy.

---

## Content module

Frozen for implementation in:

[`lib/marketing-sub-processors.ts`](../../../lib/marketing-sub-processors.ts)

P9-T02 should import this module rather than hard-coding a second list.

---

## Acceptance criteria

- [x] Sub-processors table locked (name, purpose, privacy URL); no `example.com`  
- [x] Connected services excluded from the table; Privacy cross-link copy locked  
- [x] Page chrome + metadata locked  
- [x] Contact uses real `team@mindmesh.global`  
- [x] Content module committed for P9-T02  

---

## Out of scope (this task)

- Building `app/sub-processors/page.tsx` (P9-T02)  
- Route gate / sitemap (P9-T02)  
- Privacy Slack rewrite (P9-T04)  
- Footer cross-links (P9-T07)  

---

## Next

**P9-T02:** Build `/sub-processors` from `lib/marketing-sub-processors.ts`, add funnel path + sitemap.
