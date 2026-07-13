# P5-T07: `/security` Trust Alignment

**Task ID:** P5-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-5-tasks.md](../phase-5-tasks.md) | [phase-5-depth-pages.md](../phase-5-depth-pages.md)  
**Depends on:** [P5-T02](./P5-T02-marketing-depth-layout.md), [P1-T09](../../phase-1/tasks/P1-T09-feature-grid.md), [P1-T11](../../phase-1/tasks/P1-T11-social-proof.md)  
**Blocks:** P5-T15

---

## Goal

Migrate `/security` onto `MarketingDepthLayout`, align hero copy with the feature grid **Security** card and homepage Trust section (`marketingTrustContent`).

---

## Deliverables

| File | Change |
|------|--------|
| [`app/security/page.tsx`](../../../app/security/page.tsx) | Full rewrite: depth layout, feature-grid + trust copy, marketing tokens |
| `app/security/security.module.css` | **Deleted** |

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `SiteNav` + local CSS | `MarketingDepthLayout` |
| Font | Per-page `Manrope` | Root `font-display` / `font-body` |
| Eyebrow | "Security & privacy" badge | "Security" (feature grid label) |
| Title | "Private by design. Built for trust." | Feature-grid: "Private by design: local-first architecture and clear data boundaries" |
| Subtitle | Long control paragraph | Homepage trust line from `marketingTrustContent.securityLine` |
| Back link | In-page `#comparison` CTA | `/#trust` |
| Icons / chrome | Lucide-heavy diagrams | Text cards + can/cannot lists |
| Theme | CSS module hex | `mm-*` utilities |
| Closing CTA | "Try Private AI for Work" → `/` | Join waitlist → `/#cta` |

---

## Page structure

1. **Depth hero:** Security · feature-grid title · trust-line subtitle · Trust section link  
2. **Principles:** local-first, read-only, encryption, desktop trust (product truth retained)  
3. **Comparison:** MindMesh can / cannot (same boundaries as before)  
4. **Trust cross-link:** homepage trust headline + `/trust` + `/privacy`  
5. **CTA:** Join waitlist → `/#cta`

Removed: Lucide icon chrome, cloud/local diagram, OS-signed visual collage, dashboard-style primary CTA, CSS module.

---

## Acceptance criteria

- [x] Wrapped in `MarketingDepthLayout` (no `SiteNav`)
- [x] Title matches feature grid Security card
- [x] Subtitle matches homepage Trust security line
- [x] Back link to `/#trust`
- [x] No per-page Manrope import
- [x] Local CSS module removed
- [x] Can / cannot product boundaries retained
- [x] Cross-links to `/trust`, `/privacy`, `/#cta`
- [x] HTTP 200 on `/security`

---

## Verification

```text
200 /security
"Private by design: local-first", "See Trust section", MarketingNav present
SiteNav / Manrope absent from HTML
```

---

## Next steps

- **P5-T08:** `/trust` social proof alignment
