# P9-T03: Placeholder URL Audit (Marketplace + Site)

**Task ID:** P9-T03  
**Status:** done  
**Type:** Audit / documentation (no page UI)  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** [P9-T02](./P9-T02-sub-processors-page.md)  
**Blocks:** P9-T08  
**Blocker:** Yes

---

## Goal

Ensure Slack Marketplace submit fields use **real** MindMesh URLs or stay **blank**. No `example.com` (or similar placeholders) in compliance-critical fields. Record what the site already publishes vs what still lands in P9-T04–T06.

---

## Method

```bash
# App / components / lib / public (exclude baselines, node_modules, .next)
rg -n -i 'example\.com|example\.org|placeholder\.com|yourdomain|your-domain|changeme' \
  app components lib public scripts
```

Also checked: empty `href=""`, SOC/ISO claims in app code, presence of `/gdpr`, OG URLs under `https://mindmesh.global`.

No Marketplace submit draft file exists in this repo. The matrix below is the **submit cheat sheet** for the Slack App Directory form.

---

## Site grep results

| Finding | Location | Marketplace risk? | Action |
|---------|----------|-------------------|--------|
| `user@example.com` | [`components/dashboard/StaticCalendarEvents.tsx`](../../../components/dashboard/StaticCalendarEvents.tsx) (demo calendar chip) | No (fixture UI, not a compliance URL) | Leave; optional later swap to `user@gmail.com` for consistency with other demos |
| `example.com` in docs | Phase 9 task wording only | No | N/A |
| Empty compliance hrefs | None in `app` / `components` / `lib` | No | N/A |
| SOC 2 / ISO 27001 claims | None in app surfaces | N/A | Do **not** invent a SOC URL; leave Marketplace SOC field blank |
| `/gdpr` route | Not built yet | Optional field | Prefer Privacy URL until [P9-T05](./P9-T05-gdpr.md); or leave blank |
| Security contact mailbox | Published on `/security` + Privacy | Contact field | Use monitored `team@mindmesh.global` (not `security@`) |

**Verdict:** No placeholder **URLs** on marketing/legal pages. Sub-processors privacy links are real vendor URLs (P9-T01/T02).

---

## Marketplace submit field matrix (locked for submit)

Use these values when filling Slack Marketplace / App Directory compliance fields. If a field is optional and content is not ready, **leave blank** rather than inventing a URL.

| Field (typical) | Value to submit | Status |
|-----------------|-----------------|--------|
| Privacy Policy URL | `https://mindmesh.global/privacy` | Ready (deepen Slack copy in P9-T04) |
| Terms of Service URL | `https://mindmesh.global/terms` | Ready |
| Security / trust page URL | `https://mindmesh.global/security` | Ready (report blurb in P9-T06) |
| Sub-processors URL | `https://mindmesh.global/sub-processors` | Ready (P9-T02) |
| GDPR / data rights URL | `https://mindmesh.global/privacy#gdpr` | Ready (P9-T05; rights section, **not** a GDPR certificate) |
| Dedicated `/gdpr` URL | Do not invent; Privacy `#gdpr` is the canonical target | N/A |
| SOC 2 / compliance report URL | **Leave blank** (no public SOC/ISO/GDPR cert published; TAC Security is Google-verification only) | Blank |
| Support / contact URL | `https://mindmesh.global/contact` | Ready |
| Security contact email | `team@mindmesh.global` | Ready (P9-T06; monitored inbox) |
| App homepage | `https://mindmesh.global` | Ready |
| Landing / install help | `https://mindmesh.global` or `/connected-apps` | Ready |

### Do not submit

- `https://example.com/...`
- Empty strings that look filled with whitespace
- Staging / localhost URLs
- Links to pages that 404

---

## Real pages already live (checklist)

| URL | HTTP / build | Notes |
|-----|--------------|-------|
| `https://mindmesh.global/privacy` | In funnel + sitemap | Slack section still light (P9-T04) |
| `https://mindmesh.global/terms` | In funnel + sitemap | Unchanged this phase |
| `https://mindmesh.global/security` | In funnel + sitemap | Report blurb + `team@` (P9-T06) |
| `https://mindmesh.global/sub-processors` | In funnel + sitemap | P9-T02 |
| `https://mindmesh.global/contact` | In funnel + sitemap | |

---

## Acceptance

- [x] Grep recorded; no `example.com` compliance URLs on marketing/legal pages  
- [x] Marketplace field matrix with real URLs or explicit **blank**  
- [x] SOC left blank (no fake report)  
- [x] GDPR URL deferred to Privacy (post P9-T05) or blank  
- [x] Demo `user@example.com` classified as non-blocking fixture  

---

## Out of scope

- Editing Privacy Slack copy (P9-T04)  
- Shipping GDPR section (P9-T05)  
- Security contact blurb (P9-T06)  
- Footer links (P9-T07)  
- Changing dashboard demo fixtures  

---

## Next

**P9-T04:** Privacy Policy Slack alignment so the Privacy URL above is Marketplace-complete on content, not only on URL.
