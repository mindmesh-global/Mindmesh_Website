# P6-T08: Homepage LCP Display-Font / H1 Strategy

**Task ID:** P6-T08  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P3-T16](../../phase-3/tasks/P3-T16-homepage-lcp-revisit.md), [P1-T03](../../phase-1/tasks/P1-T03-hero-copy.md)  
**Blocks:** P6-T09

---

## Goal

Make the hero H1 the preferred LCP candidate without reordering locked P1-T03 copy. Prioritize Manrope for the display headline; stop Inter body text from holding LCP via late webfont paint.

---

## Strategy

| Font | Role | `display` | Preload | Rationale |
|------|------|-----------|---------|-----------|
| Manrope 600/700 | Display / hero H1 | `swap` | **Yes** | H1 should paint with Manrope (or fallback metrics) as soon as possible |
| Inter 400/600 | Body / UI | `optional` | **No** | If Inter arrives late, keep system fallback; do not block LCP on body thesis `<p>` |

Copy hierarchy unchanged (eyebrow → H1 → subheads → thesis → CTAs).

---

## Deliverables

| File | Change |
|------|--------|
| [`app/layout.tsx`](../../../app/layout.tsx) | Inter `display: 'optional'`, `preload: false`; Manrope `preload: true`, `display: 'swap'` |
| [`HeroSection.tsx`](../../../components/marketing/sections/HeroSection.tsx) | `hero-lcp` class + display-xl tracking (`-0.03em`); comment notes LCP / P1-T03 lock |
| [`app/globals.css`](../../../app/globals.css) | `h1.hero-lcp` uses `--font-display` + `font-synthesis: none` |

---

## Acceptance criteria

- [x] Hero copy order unchanged (P1-T03)
- [x] Inter uses `font-display: optional` and is not preloaded
- [x] Manrope remains preloaded with `font-display: swap`
- [x] H1 marked as LCP path (`#hero-heading` + `.hero-lcp`)
- [x] Typecheck passes
- [ ] Lighthouse × 3 median (deferred to **P6-T09**)

---

## Verification (dev)

```text
Inter @font-face → font-display: optional
Manrope @font-face → font-display: swap
Homepage HTML contains id="hero-heading" and class hero-lcp
tsc --noEmit → ok
```

LCP gate (&lt; 2.5s) is measured in P6-T09 on a production build.

---

## Next steps

- **P6-T09:** Production Lighthouse × 3; update `docs/phase-6/baselines/`
