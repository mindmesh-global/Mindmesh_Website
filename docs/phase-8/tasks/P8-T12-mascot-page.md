# P8-T12: Build `/mascot` Depth Page + Theater Wiring

**Task ID:** P8-T12  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T04](./P8-T04-content-module.md), [P8-T08](./P8-T08-marketing-route-gate.md), [P8-T11](./P8-T11-mascot-theater-demo.md)  
**Blocks:** P8-T13, P8-T16  
**Blocker:** Yes

---

## Goal

Ship `/mascot` on `MarketingDepthLayout` parallel to `/sensor`, with a scroll-linked Mascot theater (dynamically imported demo).

---

## Deliverables

| File | Role |
|------|------|
| [`app/mascot/page.tsx`](../../../app/mascot/page.tsx) | Depth page: hero, how-it-works, theater, capabilities, comparison, privacy, CTA |
| [`components/marketing/sections/ProductTheaterMascot.tsx`](../../../components/marketing/sections/ProductTheaterMascot.tsx) | `TheaterScrollSection theaterId="mascot"` + dynamic `MascotTheaterDemo` |

Copy and fixtures from [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts). Route already gated in P8-T08.

---

## Page anatomy (locked)

1. Depth hero (eyebrow / H1 / subtitle / back to homepage)  
2. How it works (3 steps)  
3. Scroll theater (`#mascot-theater`) with caption + Explore Sensor footer  
4. Capabilities (4 cards)  
5. Sensor vs Mascot comparison strip (sibling CTA → `/sensor`)  
6. Privacy note → `/security`  
7. Waitlist CTA + sibling link to `/sensor`

---

## Theater wiring

- `TheaterScrollSection theaterId="mascot"` (240vh desktop / 120vh mobile; reduced-motion jump **0.88**)
- `MascotTheaterDemo` via `next/dynamic` `{ ssr: false }`
- Caption from `MASCOT_THEATER_FIXTURES.caption`
- No `SiteNav`, Lottie, `MascotChatbot`, or remote hero images

---

## Acceptance

- [x] `/mascot` renders on slim marketing shell (`isMarketingRoute`)
- [x] Metadata from copy deck + shared OG image
- [x] Theater section uses scroll kit + dynamic demo
- [x] Comparison / privacy / CTA from shared content module (sibling → Sensor)
- [x] No SiteNav / Lottie / remote hero images
- [x] `tsc --noEmit` clean; route verify ok
- [ ] Full scroll / reduced-motion / off-screen pause QA → **P8-T16**

---

## Handoff

| Next | Work |
|------|------|
| P8-T13 | Feature grid + FAQ discovery links |
| P8-T14 | Legacy redirect + overlay allowlist |
| P8-T16 | Theater QA on both depth pages |
