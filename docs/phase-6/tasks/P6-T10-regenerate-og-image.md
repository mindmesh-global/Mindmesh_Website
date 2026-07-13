# P6-T10: Regenerate OG / Social Image

**Task ID:** P6-T10  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** Phase 5 homepage visual, [P1-T03](../../phase-1/tasks/P1-T03-hero-copy.md)  
**Blocks:** P6-T11, P6-T15

---

## Goal

Replace the legacy purple-mesh `public/og-image.png` with a 1200×630 marketing-hero composition that matches the current homepage narrative and `mm-*` palette.

---

## Deliverables

| File | Change |
|------|--------|
| [`public/og-image.png`](../../../public/og-image.png) | New 1200×630 marketing OG frame |
| [`docs/phase-6/baselines/og-image-legacy-purple.png`](../baselines/og-image-legacy-purple.png) | Archived previous asset |
| [`lib/seo.ts`](../../../lib/seo.ts) | Alt → `MindMesh - The Cognitive Layer for modern work` |
| [`app/layout.tsx`](../../../app/layout.tsx) | Matching root OG alt |
| [`app/page.tsx`](../../../app/page.tsx) | Explicit homepage `openGraph.images` + Twitter image |

URL unchanged: `https://mindmesh.global/og-image.png`

---

## Composition

| Element | Content |
|---------|---------|
| Brand | MindMesh |
| Eyebrow | Cognitive orchestration layer |
| H1 | The Cognitive Layer for modern work |
| Subheads | Purpose-built… / Designed for the AI era. |
| Thesis (short) | Connect your apps, find what matters most right now, and get it done. |
| Footer | mindmesh.global · Join the waitlist |
| Palette | `#060e20` background, Manrope display, Inter body, primary CTA |

Generated via Chrome headless screenshot of a dedicated 1200×630 HTML frame (live page crop clipped the hero).

---

## Acceptance criteria

- [x] `public/og-image.png` is 1200×630 PNG
- [x] Visual matches marketing hero / tokens (not legacy purple mesh)
- [x] OG/Twitter tags still point at `/og-image.png`
- [x] Alt text updated to cognitive-layer narrative
- [x] Asset served `200` with new byte size

---

## Verification

```text
1200×630 PNG · ~177 KiB
GET /og-image.png → 200
twitter:image / og:image → https://mindmesh.global/og-image.png
```

---

## Next steps

- **P7-T01:** Broader metadata title/description alignment (was P6-T11; root still has older Twitter / default title copy)
