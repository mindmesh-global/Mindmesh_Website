# P5-T06: `/upcoming-events` Alignment

**Task ID:** P5-T06  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T09](../../phase-1/tasks/P1-T09-feature-grid.md)  
**Blocks:** P5-T15

---

## Goal

Migrate `/upcoming-events` onto `MarketingDepthLayout`, align copy with the feature grid **Upcoming events** card and Execute theater depth link.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/upcoming-events/page.tsx`](../../../app/upcoming-events/page.tsx) | Full rewrite: depth layout, feature-grid copy, marketing tokens |
| `app/upcoming-events/upcoming-events.module.css` | **Deleted** |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS | `MarketingDepthLayout` |
| Font | Per-page `Manrope` | Root `font-display` / `font-body` |
| Eyebrow | Legacy page chrome | "Upcoming events" (feature grid label) |
| Title | Legacy calendar framing | "See what is ahead before it takes over your afternoon" |
| Subtitle | Long product paragraph | Feature-grid aligned: prepare, not scramble |
| Back link | Dashboard CTA | `/#execute` |
| External images | Googleusercontent avatars | Removed; local mockup only |
| Theme | CSS module hex | `mm-*` utilities |

---

## Page structure

1. **Depth hero:** Upcoming events · feature-grid title · subtitle · Execute theater link  
2. **Product story + mockup:** calendar intelligence + `/images/upcoming-events-mockup.png`  
3. **Capability cards:** glance, context, Execute prep, clarity  
4. **Privacy:** local-first note + `/security`  
5. **CTA:** Join waitlist → `/#cta`

Removed: remote avatars, Lucide-heavy legacy UI, dashboard CTA, CSS module.

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] Title/description match feature grid Upcoming events card
- [x] Back link to `/#execute`
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] No external Googleusercontent image URLs
- [x] Cross-links to `/connected-apps`, `/security`, `/#cta`
- [x] HTTP 200 on `/upcoming-events`

---

## Verification

```text
200 /upcoming-events
"See what is ahead", "See Execute theater", MarketingNav present
SiteNav / Manrope / googleusercontent absent from HTML
```

---

## Next steps

- **P5-T07:** `/security` trust alignment
