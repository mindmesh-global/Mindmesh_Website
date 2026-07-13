# P10-T06: Implement Mascot Attachment-Search Theater Demo

**Task ID:** P10-T06  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [P10-T05](./P10-T05-mascot-attachment-beat-sheet.md)  
**Depends on:** P10-T05  
**Blocks:** P10-T07, P10-T09  
**Blocker:** Yes

---

## Goal

Ship the scroll-linked Mascot **attachment-search** demo and register `mascotAttachment` in the scroll kit. Page mount is **P10-T07**.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/marketing-theater-scroll.ts`](../../../lib/marketing-theater-scroll.ts) | `TheaterId` + `mascotAttachment`; steps; VH; RM 0.88; visual-state helpers |
| [`lib/marketing-sensor-mascot-content.ts`](../../../lib/marketing-sensor-mascot-content.ts) | `MASCOT_ATTACHMENT_THEATER_FIXTURES` + `MASCOT_ATTACHMENT_THEATER_SECTION` |
| [`MarketingMascotAttachmentPanel.tsx`](../../../components/marketing/theater/marketing/MarketingMascotAttachmentPanel.tsx) | Chat + hit card + Open attachment |
| [`MascotAttachmentTheaterDemo.tsx`](../../../components/marketing/theater/demos/MascotAttachmentTheaterDemo.tsx) | Scroll-driven demo |
| [`theater/index.ts`](../../../components/marketing/theater/index.ts) | Re-exports |

Email-count (`mascot`) untouched.

---

## Behavior

| Progress | UI |
|----------|-----|
| 0–0.10 | Idle companion ready |
| 0.10–0.28 | User ask bubble |
| 0.28–0.48 | Typing dots |
| 0.48–0.68 | Reply lines (1 then 2) |
| 0.68–0.82 | Hit card `Acme_Q3_Plan.pdf` |
| 0.82–0.88 | Open attachment |
| 0.88–1.00 | Hold |

Motion: `transform` + `opacity` only. No live chatbot / Lottie / remote images.

---

## Acceptance

- [x] `mascotAttachment` registered in scroll kit maps  
- [x] Helpers: `getMascotAttachmentVisualStateFromProgress` (+ ask / reply / hit / action)  
- [x] Demo + panel ship and export from theater index  
- [x] Fixtures + section chrome in content module  
- [x] `npx tsc --noEmit` clean  
- [x] Email-count path unchanged  

---

## Out of scope

- Mounting on `/mascot` (P10-T07)  
- Theater QA (P10-T09)  

---

## Next

**P10-T07:** Wire `ProductTheaterMascotAttachment` on `/mascot` after email-count.
