# P6-T04: `/waitlist` Retirement

**Task ID:** P6-T04  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T01](./P6-T01-hero-inventory.md)  
**Blocks:** P6-T06, P6-T07

---

## Goal

Retire the Hero-mounted `/waitlist` page. Prefer permanent redirect to homepage `#cta` (shared `WaitlistForm`).

---

## Deliverables

| File | Change |
|------|--------|
| [`middleware.ts`](../../../middleware.ts) | `/waitlist` → `/#cta` (308), alongside `/features` |
| [`app/waitlist/page.tsx`](../../../app/waitlist/page.tsx) | **Deleted** |
| [`app/faq/page.tsx`](../../../app/faq/page.tsx) | Link → `/#cta` |
| [`BillingPlansClient.tsx`](../../../app/billing/BillingPlansClient.tsx) | Link → `/#cta` |
| [`next.config.js`](../../../next.config.js) | Comment updated (hash redirects via middleware) |

**Kept:** `WaitlistForm`, `WaitlistModal`, `/api/waitlist` (homepage CTA + dashboard).

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| `/waitlist` | Hero page (200) | 308 → `/#cta` |
| FAQ / billing links | `/waitlist` | `/#cta` |
| Waitlist UX | Hero modal path | Homepage Final CTA form |

---

## Acceptance criteria

- [x] `/waitlist` redirects to `/#cta` (hash preserved via middleware)
- [x] Hero waitlist page removed
- [x] Inbound FAQ + billing links updated
- [x] `/api/waitlist` and homepage `WaitlistForm` unchanged
- [x] HTTP 308 verified

---

## Verification

```text
308 /waitlist → Location: /#cta
FAQ and billing HTML contain /#cta (not /waitlist page)
```

---

## Next steps

- **P6-T05:** `/billing` marketing shell (optional non-blocker)
- **P6-T06:** Clean Hero route lists (drop `/waitlist`, `/contact`, redirected paths)
