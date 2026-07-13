# P5-T05: `/yesterdays-narrative` Alignment

**Task ID:** P5-T05  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T09](../../phase-1/tasks/P1-T09-feature-grid.md)  
**Blocks:** P5-T15

---

## Goal

Migrate `/yesterdays-narrative` onto `MarketingDepthLayout`, align copy with the feature grid **Daily narrative** card and Focus theater depth link.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/yesterdays-narrative/page.tsx`](../../../app/yesterdays-narrative/page.tsx) | Full rewrite: depth layout, feature-grid copy, marketing tokens |
| `app/yesterdays-narrative/yesterdays-narrative.module.css` | **Deleted** |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS | `MarketingDepthLayout` |
| Font | Per-page `Manrope` | Root `font-display` / `font-body` |
| Eyebrow | "Yesterday's Narrative" | "Daily narrative" (feature grid label) |
| Title | "Yesterday summary without the inbox crawl." | "A clear recap of yesterday" |
| Subtitle | Long noise/recap paragraph | Feature-grid: context, not clutter |
| Back link | Dashboard CTA | `/#focus` |
| External images | Googleusercontent URLs | Removed; local mockup only |
| Theme | CSS module hex | `mm-*` utilities |

---

## Page structure

1. **Depth hero:** Daily narrative · feature-grid title · subtitle · Focus theater link  
2. **Product story + mockup:** inbox-crawl framing + `/images/yesterdays-narrative-mockup.png`  
3. **Capability cards:** day arc, open items, highlights, Focus context  
4. **Privacy:** local-first note + `/security`  
5. **CTA:** Join waitlist → `/#cta`

Removed: remote aida images, dashboard CTA, mascot/workspace chrome, unfinished-thread tile collage.

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] Title/description match feature grid Daily narrative card
- [x] Back link to `/#focus`
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] No external Googleusercontent image URLs
- [x] Cross-links to `/inbox`, `/security`, `/#cta`
- [x] HTTP 200 on `/yesterdays-narrative`

---

## Verification

```text
200 /yesterdays-narrative
"A clear recap of yesterday", "See Focus theater", MarketingNav present
SiteNav / Manrope absent from HTML
```

---

## Next steps

- **P5-T06:** `/upcoming-events` alignment
