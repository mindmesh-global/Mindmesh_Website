# P10-T08: Mascot Icon / Skin Inventory + Showcase UI

**Task ID:** P10-T08  
**Status:** done  
**Type:** Implementation (recommended, non-blocker)  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [phase-10-theater-upgrades.md](../phase-10-theater-upgrades.md)  
**Depends on:** Product Lottie characters in `DashboardDesktopShell`  
**Blocks:** —  
**Blocker:** No

---

## Goal

Showcase the **product companion characters** (Lottie skins from `/dashboard`) on `/mascot` without loading live Lottie on the marketing funnel.

---

## Decision: Approach A (locked)

| Option | Choice |
|--------|--------|
| **A. Local stills + names** | **Yes** |
| B. Live / deferred Lottie on `/mascot` | No (perf + Phase 8/10 contract) |
| C. Names-only | No (too weak) |

**Why A:** Product Lotties are a real differentiator, but `@lottiefiles/dotlottie-react` + remote `lottie.host` would slow `/mascot` and reopen the “no Lottie on marketing” rule. Stills sell the picker without the runtime tax.

---

## Inventory (locked)

Source: `CHARACTER_SLIDES` in [`DashboardDesktopShell.tsx`](../../../components/dashboard/view-shells/DashboardDesktopShell.tsx).

| Id | Name | Local still | Product Lottie (dashboard only) |
|----|------|-------------|----------------------------------|
| `sherpa` | Sherpa | `/images/mascot-skins/sherpa.png` | `…/uUodXUtl4V.lottie` |
| `robo` | Robo | `/images/mascot-skins/robo.png` | `…/53VP4mY0uR.lottie` |
| `boy` | Boy | `/images/mascot-skins/boy.png` | `…/v6hQv7mXIq.lottie` |
| `girl` | Girl | `/images/mascot-skins/girl.png` | `…/W49fhgkrwT.lottie` |
| `luna` | Luna | `/images/mascot-skins/luna.png` | `…/HcMtWTaAMW.lottie` |
| `mini` | Mini | `/images/mascot-skins/mini.png` | `…/cuk1txLhrr.lottie` |
| `whiskers` | Whiskers | `/images/mascot-skins/whiskers.png` | `…/uvdYl2wxbT.lottie` |

Stills captured once from product Lottie URLs into `public/images/mascot-skins/`. Marketing never fetches `lottie.host`.

**Not used for this showcase:** cursor PNGs, gem mark, generic marketing icons.

---

## Deliverables

| File | Change |
|------|--------|
| `public/images/mascot-skins/*.png` | 7 local stills |
| [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts) | `MASCOT_ICON_SKINS` (7 characters) + section copy |
| [`MascotIconShowcase.tsx`](../../../components/marketing/sections/MascotIconShowcase.tsx) | Preview + selectable grid |
| [`app/mascot/page.tsx`](../../../app/mascot/page.tsx) | Mount after attachment theater |

---

## Page order

1. How it works  
2. Email-count theater  
3. Attachment theater  
4. **Companion showcase** (`#mascot-icons`)  
5. Capabilities → comparison → privacy → CTA  

---

## Acceptance

- [x] Seven product characters inventoried and shown  
- [x] Local stills only (no DotLottie / `lottie.host` on `/mascot`)  
- [x] Interactive selection updates preview  
- [x] Note that animation lives in the product  
- [x] Non-blocker; theaters unchanged  

---

## Out of scope

- Live Lottie on marketing routes  
- Theater QA (P10-T09)  
- Wiring selected skin into scroll theaters  

---

## Next

**P10-T09:** Theater QA (reduced-motion + off-screen pause).
