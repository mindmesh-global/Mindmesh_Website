# P8-T10: Build `/sensor` Depth Page + Theater Wiring

**Task ID:** P8-T10  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T04](./P8-T04-content-module.md), [P8-T08](./P8-T08-marketing-route-gate.md), [P8-T09](./P8-T09-sensor-theater-demo.md)  
**Blocks:** P8-T13, P8-T16  
**Blocker:** Yes

---

## Goal

Ship `/sensor` on `MarketingDepthLayout` with the locked page anatomy and a scroll-linked Sensor theater (dynamically imported demo).

---

## Deliverables

| File | Role |
|------|------|
| [`app/sensor/page.tsx`](../../../app/sensor/page.tsx) | Depth page: hero, how-it-works, theater, capabilities, comparison, privacy, CTA |
| [`components/marketing/sections/ProductTheaterSensor.tsx`](../../../components/marketing/sections/ProductTheaterSensor.tsx) | `TheaterScrollSection theaterId="sensor"` + dynamic `SensorTheaterDemo` |

Copy and fixtures from [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts). Route already gated in P8-T08.

---

## Page anatomy (locked)

1. Depth hero (eyebrow / H1 / subtitle / back to homepage)  
2. How it works (3 steps)  
3. Scroll theater (`#sensor-theater`) with caption + Explore Mascot footer  
4. Capabilities (4 cards)  
5. Sensor vs Mascot comparison strip  
6. Privacy note → `/security`  
7. Waitlist CTA + sibling link to `/mascot`

---

## Theater wiring

- `TheaterScrollSection theaterId="sensor"` (220vh desktop / 120vh mobile; reduced-motion jump **0.90**)
- `SensorTheaterDemo` via `next/dynamic` `{ ssr: false }` so H1 first paint is not blocked
- Caption from `SENSOR_THEATER_FIXTURES.caption`
- No `SiteNav`, Lottie, `SensorBarSpotlight`, or remote hero images

---

## Acceptance

- [x] `/sensor` renders on slim marketing shell (`isMarketingRoute`)
- [x] Metadata from copy deck + shared OG image
- [x] Theater section uses scroll kit + dynamic demo
- [x] Comparison / privacy / CTA from shared content module
- [x] No SiteNav / Lottie / remote hero images
- [x] `tsc --noEmit` clean; `verify-marketing-routes` ok
- [ ] Full scroll / reduced-motion / off-screen pause QA → **P8-T16**

---

## Handoff

| Next | Work |
|------|------|
| P8-T11 | `MascotTheaterDemo` |
| P8-T12 | `/mascot` page (mirror this anatomy) |
| P8-T13 | Feature grid + FAQ discovery links |
| P8-T16 | Theater QA on both depth pages |
