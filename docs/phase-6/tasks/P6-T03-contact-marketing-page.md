# P6-T03: `/contact` Plain Marketing Page

**Task ID:** P6-T03  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T01](./P6-T01-hero-inventory.md), [P5-T02](../../phase-5/tasks/P5-T02-marketing-depth-layout.md)  
**Blocks:** P6-T06, P6-T07

---

## Goal

Replace the Hero-mounted `/contact` page with a plain marketing depth page and form. No mascot, sensor, or custom cursor.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/contact/page.tsx`](../../../app/contact/page.tsx) | `MarketingDepthLayout` + contact form (no `Hero`) |
| [`components/marketing/ContactForm.tsx`](../../../components/marketing/ContactForm.tsx) | New client form posting to `/api/contact` |
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Added `/contact` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect `/contact` in funnel list |

`ContactWindow.tsx` left in place until P6-T07 (still used by remaining Hero routes).

---

## Before → after

| Item | Before | After |
|------|--------|-------|
| Shell | `Hero` + legacy providers | `MarketingDepthLayout` + slim marketing shell |
| Form | Purple/light `ContactWindow` inside macOS chrome | Dark `mm-*` `ContactForm` |
| API | `/api/contact` FormData | Same |
| Route gate | Legacy `LegacyAppShell` | `isMarketingRoute('/contact')` → true |

---

## Page structure

1. Depth hero: Contact · Get in touch · homepage back link  
2. Two-column body: help copy + links (`/security`, `/privacy`, `/faq`) · form card  
3. Form: email, message, optional attachment, waitlist cross-link to `/#cta`

---

## Acceptance criteria

- [x] No `Hero` import on `/contact`
- [x] Wrapped in `MarketingDepthLayout`
- [x] Posts to existing `/api/contact`
- [x] `/contact` on marketing route gate (no LegacyAppShell)
- [x] HTTP 200; MarketingNav present; Hero absent from HTML
- [x] Verify script updated

---

## Verification

```text
200 /contact
"Get in touch", MarketingNav, Contact form fields present
Hero / SiteNav absent from HTML
node scripts/verify-marketing-routes.mjs → ok
```

---

## Next steps

- **P6-T04:** `/waitlist` retirement
- Then **P6-T06** clean Hero route lists (drop `/contact`)
