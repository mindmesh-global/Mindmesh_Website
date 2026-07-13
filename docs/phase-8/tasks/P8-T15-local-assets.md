# P8-T15: Local Demo Assets (No Remote Images)

**Task ID:** P8-T15  
**Status:** done  
**Type:** Verification (no asset changes required)  
**Completed:** 2026-07-10  
**Parent:** [phase-8-tasks.md](../phase-8-tasks.md) | [phase-8-sensor-mascot.md](../phase-8-sensor-mascot.md)  
**Depends on:** [P8-T09](./P8-T09-sensor-theater-demo.md), [P8-T11](./P8-T11-mascot-theater-demo.md)  
**Blocks:** P8-T16  
**Blocker:** Yes

---

## Goal

Confirm Sensor and Mascot theater visuals are local `public/` assets or pure coded UI, with zero remote image hosts (e.g. `lh3.googleusercontent`) on `/sensor` and `/mascot`.

---

## Audit scope

| Surface | Files |
|---------|-------|
| Pages | `app/sensor/page.tsx`, `app/mascot/page.tsx` |
| Theater sections | `ProductTheaterSensor.tsx`, `ProductTheaterMascot.tsx` |
| Demos | `SensorTheaterDemo.tsx`, `MascotTheaterDemo.tsx` |
| Panels | `MarketingSensorPanel.tsx`, `MarketingMascotPanel.tsx` |
| Content | `lib/marketing-sensor-mascot-content.ts` |

---

## Findings

| Check | Result |
|-------|--------|
| `lh3.googleusercontent` / `googleusercontent.com` in scope | **None** |
| `next/image` in demos / panels / depth pages | **None** |
| `MascotChatbot` / `SensorBarSpotlight` / Lottie imports | **None** (comments only) |
| Theater visuals | **Coded UI** (Lucide icons + CSS); no screenshot or remote hero |
| Absolute `https://` in pages | Metadata OG URLs only (`mindmesh.global`), not demo images |
| Rendered `/sensor` + `/mascot` HTML | Script/chunk `src` under `/_next/static/` only; no remote image URLs |

Homepage Execute theater still uses local `/images/icons/*.png` (Gmail, Calendar, Jira). That is out of Phase 8 scope and already local.

---

## Contract (locked)

| Rule | Value |
|------|-------|
| Motion | `transform` + `opacity` only |
| Images | Local `public/` or coded UI |
| Forbidden | Remote CDN heroes, Lottie on depth theaters, live overlays |

No code changes in this task; P8-T09 / P8-T11 already shipped coded panels.

---

## Acceptance

- [x] Zero remote image hosts on Sensor/Mascot theater + page sources  
- [x] Zero Lottie / live overlay imports on those surfaces  
- [x] Demos prefer coded UI over screenshots  
- [x] Documented for P8-T16 / P8-T19  

---

## Handoff

| Next | Work |
|------|------|
| P8-T16 | Reduced-motion + off-screen pause + a11y QA |
| P8-T19 | Sign-off (no remote images checklist) |
