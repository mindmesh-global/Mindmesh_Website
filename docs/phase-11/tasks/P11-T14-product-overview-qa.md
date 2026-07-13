# P11-T14: Product Overview Visual, Accessibility, and Performance QA

**Task ID:** P11-T14  
**Status:** done  
**Type:** QA  
**Completed:** 2026-07-12  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T12](./P11-T12-mobile-reduced-motion.md), [P11-T13](./P11-T13-product-truth-alignment.md)  
**Blocks:** P11-T15  
**Blocker:** Yes

---

## Goal

Validate the completed homepage product overview across motion modes, breakpoints, bundles, and homepage performance before Phase 11 sign-off.

---

## Environment

| Item | Value |
|------|-------|
| Production build | `npm run build` (Next.js 16.1.1 Turbopack) |
| Prod server | `http://127.0.0.1:3015` (`next start -p 3015 -H 127.0.0.1`) |
| Browser QA | Chrome CDP via Cursor browser |
| Lighthouse | 3 mobile simulated runs → median |
| Date | 2026-07-12 |

---

## Typecheck, lint, build

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Pass |
| `npm run lint` / `next lint` | **N/A** (Next.js 16 CLI no longer ships `next lint`) |
| `npm run build` | Pass (22 static routes) |

Accepted substitute for lint: TypeScript clean + production build compile.

---

## Desktop visual + scroll

Viewport **1280×900**, `prefers-reduced-motion: no-preference`.

| Check | Result | Pass? |
|-------|--------|-------|
| Section order | `hero` → `product-overview` → `problem` → … | Yes |
| Motion route | `data-overview-motion-only` = `block`; static tour = `none` | Yes |
| Runway | ~1620px (`md:min-h-[180vh]`) | Yes |
| Sticky frame | Present; chrome ~802px | Yes |
| Scene 1 mid scrub | progress ~0.12–0.30, tab Attention | Yes |
| Scene 2 | progress ~0.47–0.54, tab Inbox & events | Yes |
| Scene 4 late scrub | progress ~0.88–0.90, tab Companions | Yes |
| Scene jump (tab → hold) | Tab 4 selects Companions hold | Yes |
| Second-scene reveal | Scene 2 active by ~0.34–0.47; no long dead hold on scene 1 | Yes |
| Sticky overlap with Problem | Overview `isolate`; Problem follows after runway | Yes |

---

## Mobile visual

Viewport **390×800**.

| Check | Result | Pass? |
|-------|--------|-------|
| Static tour visible | `display: block` | Yes |
| Scrub hidden | motion-only `display: none` | Yes |
| Four stacked finals | Attention, Inbox & events, Narrative & apps, Companions | Yes |
| Touch targets | Progress tabs `min-height` 44px | Yes |
| Overflow | `overflow-x-clip` on overview wrappers; no clipped scene content observed | Yes |
| Next section | `#problem` immediately after overview | Yes |

---

## Reduced motion

Emulated `prefers-reduced-motion: reduce` at desktop width (792+).

| Check | Result | Pass? |
|-------|--------|-------|
| MQ matches | `true` | Yes |
| Static tour shown | `motion-reduce:!block` | Yes |
| Scrub hidden | `motion-reduce:!hidden`; no `[data-theater=productOverview]` scrub | Yes |
| Four finals readable | All four mobile scene cards present with copy | Yes |
| Progress nav | Four tabs, scene 1 selected initially | Yes |

---

## Off-screen pause / resume

Normal motion, desktop scrub.

| Step | `inView` | `paused` | Notes |
|------|----------|----------|-------|
| Mid scrub (scene 2) | `true` | `false` | progress ~0.47 |
| Scroll past overview | `false` | `true` | Progress frozen; IO updated after settle |
| Re-enter | resumes when intersecting again | Shared `useScrollSection` contract | |

Progress updates pause when `!isInView` (rAF loop gated). Pass.

---

## Keyboard / semantics

| Check | Result | Pass? |
|-------|--------|-------|
| Single `h1` | Hero only | Yes |
| Progress nav | `role="tablist"` + `role="tab"` + `aria-selected` | Yes |
| Scene panel | `role="tabpanel"` + `aria-labelledby` | Yes |
| Sidebar nav | `aria-label="MindMesh product overview"` | Yes |
| Body overflow | `visible` (no scroll-lock) | Yes |
| Depth links (scene 4) | Sensor / Mascot links present on final | Yes |

Note: Mobile and desktop trees both mount; CSS hides the inactive one (`display: none`), so duplicate tabs are not exposed to AT while hidden.

---

## Bundle inspection

| Check | Result | Pass? |
|-------|--------|-------|
| Homepage Lighthouse network | No `dotlottie` / `2bffa26b9fd2e75e` / Tauri URLs | Yes |
| Overview dynamic chunks | Present (~2–18 KiB each); no Lottie strings | Yes |
| Page entry `dcb16f…` | No Lottie / Tauri / `mindmesh_app` | Yes |
| Layout chunk | Dynamic import map references Legacy Lottie chunk for **non-marketing** routes only | Accepted |
| Hero SSR | Product overview skeleton in HTML; interactive body client-dynamic | Yes |

Lottie remains in the build for `/dashboard` and legacy shells via `RootAppShell` → `LegacyAppShell`. It does not load on the marketing homepage.

---

## Homepage Lighthouse

Artifacts: [baselines](../baselines/homepage-marketing-lighthouse.md)

| Metric | Run 1 | Run 2 | Run 3 | **Median** | Budget | Pass? |
|--------|-------|-------|-------|------------|--------|-------|
| LCP (s) | 2.44 | 2.93 | 2.92 | **2.92** | Soft ≤ 3.5s; hard &lt; 2.5s | Soft **Yes** / hard No (P6-T09) |
| CLS | 0 | 0 | 0 | **0** | &lt; 0.1 | Yes |
| TBT (ms) | 64 | 56 | 63 | **63** | advisory &lt; 300 | Yes |
| Perf score | 0.98 | 0.95 | 0.95 | **0.95** | advisory ≥ 0.85 | Yes |
| Script transfer (KiB) | 385 | 385 | 385 | **385** | trend vs P6 339 | +46 KiB |

**LCP element:** Hero `h1#hero-heading` (unchanged).  
**vs Phase 6:** LCP essentially flat (2.93 → 2.92); CLS still 0; score still ~95.

---

## Accepted tradeoffs

1. **LCP hard target** still open under [P6-T09](../../phase-6/tasks/P6-T09-homepage-lighthouse-rebaseline.md); Phase 11 does not regress the soft ceiling.
2. **~46 KiB** additional script vs Phase 6 from product-overview chunks; deferred body load + no Lottie on `/`.
3. **`next lint` unavailable** on Next 16; `tsc` + production build stand in.
4. **Dual mount** of mobile/desktop overview trees (CSS routing) per P11-T12.

---

## Acceptance checklist

- [x] Four scenes are clear at desktop and mobile widths
- [x] No sticky overlap or delayed second-scene reveal
- [x] No layout shift from the product frame (CLS 0; reserved skeleton)
- [x] Reduced-motion and off-screen contracts pass
- [x] No Lottie, Tauri, or product modules appear in homepage network chunks
- [x] LCP / CLS / TBT within documented marketing budget (soft LCP + hard CLS/TBT)
- [x] Findings and accepted tradeoffs recorded

---

## Unblocks

- **P11-T15** - Phase 11 sign-off checklist
