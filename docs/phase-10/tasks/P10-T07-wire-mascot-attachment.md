# P10-T07: Wire Mascot Attachment Story on `/mascot`

**Task ID:** P10-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-10-tasks.md](../phase-10-tasks.md) | [P10-T05](./P10-T05-mascot-attachment-beat-sheet.md) | [P10-T06](./P10-T06-mascot-attachment-demo.md)  
**Depends on:** P10-T06  
**Blocks:** P10-T09  
**Blocker:** Yes

---

## Goal

Mount the Mascot attachment-search scroll theater on `/mascot` as a **second** section after email-count (Mode A). Keep `MarketingDepthLayout`.

---

## Deliverables

| File | Change |
|------|--------|
| [`ProductTheaterMascotAttachment.tsx`](../../../components/marketing/sections/ProductTheaterMascotAttachment.tsx) | Section + `TheaterScrollSection` `mascotAttachment` + dynamic demo |
| [`app/mascot/page.tsx`](../../../app/mascot/page.tsx) | Render attachment section after email-count |

---

## Page order (locked)

1. How it works  
2. Email-count theater (`#mascot-theater`, `theaterId="mascot"`)  
3. **Attachment theater** (`#mascot-attachment-theater`, `theaterId="mascotAttachment"`)  
4. Capabilities → comparison → privacy → CTA  

Chrome from `MASCOT_ATTACHMENT_THEATER_SECTION` / fixtures (P10-T05–T06).

---

## Acceptance

- [x] Attachment theater live on `/mascot` after email-count  
- [x] Dynamic import of demo (`ssr: false`) like email-count  
- [x] Caption + Explore Sensor footer  
- [x] Email-count section unchanged  
- [x] Still on `MarketingDepthLayout`  

---

## Out of scope

- Theater QA (P10-T09)  
- Mascot icon skins (P10-T08)  

---

## Next

**P10-T08** (optional icons) or **P10-T09** (theater QA).
