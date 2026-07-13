# P5-T04: `/inbox` Marketing Alignment

**Task ID:** P5-T04  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T09](../../phase-1/tasks/P1-T09-feature-grid.md)  
**Blocks:** P5-T15

---

## Goal

Migrate `/inbox` onto `MarketingDepthLayout`, align headline and description with the feature grid card, use marketing tokens, and link back to `/#focus`.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/inbox/page.tsx`](../../../app/inbox/page.tsx) | Full rewrite: depth layout, feature-grid copy, marketing tokens |
| `app/inbox/inbox.module.css` | **Deleted** |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS | `MarketingDepthLayout` |
| Font | Per-page `Manrope` | Root `font-display` / `font-body` |
| Title | "One inbox for everything / Stop switching tabs." | "One inbox for email across every connected account" |
| Subtitle | Long tab-chaos paragraph | Feature-grid aligned: without tab chaos |
| Back link | Dashboard CTA | `/#focus` (See Focus theater →) |
| Theme | CSS vars + hex in module | `mm-*` utilities |
| Visual | Hero mockup kept | Same `/images/hero-inbox-mockup.jpg` |

---

## Page structure

1. **Depth hero:** Inbox eyebrow · feature-grid title · subtitle · Focus theater link
2. **Product story + mockup:** unified accounts / filter story + inbox screenshot
3. **Capability cards:** accounts, filter, search, triage
4. **Privacy:** local-first note + `/security`
5. **CTA:** Join waitlist → `/#cta`

Removed: mascot/sensor workspace tiles, work-life balance section, dashboard CTA (out of marketing funnel narrative).

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] Title/description match feature grid intent
- [x] Back link to `/#focus`
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] Cross-links to `/connected-apps`, `/security`, `/#cta`
- [x] HTTP 200 on `/inbox`

---

## Verification

```text
200 /inbox
"One inbox for email", "See Focus theater", MarketingNav present
SiteNav / Manrope absent from HTML
```

---

## Next steps

- **P5-T05:** `/yesterdays-narrative` alignment — [done](./P5-T05-yesterdays-narrative-alignment.md)
- **P5-T06:** `/upcoming-events` alignment
