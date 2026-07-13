# P6-T02: Legacy Hero URL Redirects

**Task ID:** P6-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T01](./P6-T01-hero-inventory.md), [P1-T19](../../phase-1/tasks/P1-T19-deprecation-reuse.md)  
**Blocks:** P6-T06, P6-T07

---

## Goal

Send legacy macOS Hero URLs to marketing destinations so those routes can be deleted in P6-T07.

---

## Deliverables

| File | Change |
|------|--------|
| [`next.config.js`](../../../next.config.js) | Permanent redirects for path-only destinations |
| [`middleware.ts`](../../../middleware.ts) | `/features` → `/#features` (hash preserved) |
| [`app/billing/page.tsx`](../../../app/billing/page.tsx) | Internal link `/features` → `/#features` |

---

## Redirect map

| From | To | Mechanism |
|------|----|-----------|
| `/features` | `/#features` | `middleware.ts` (308) |
| `/app-directory` | `/connected-apps` | `next.config.js` (308) |
| `/subscription` | `/billing` | `next.config.js` (308) |
| `/docs` | `/faq` | `next.config.js` (308) |
| `/social` | `/` | `next.config.js` (308) |
| `/demo` | `/` | `next.config.js` (308) |

**Not redirected (intentional):** `/dashboard`, `/sensor&mascot`, `/contact`, `/waitlist` (P6-T03 / P6-T04).

### Why middleware for `/features`

`next.config.js` `redirects()` destinations cannot reliably preserve URL hash fragments. Middleware issues `Location: /#features` so the homepage Features section is the landing target.

---

## Acceptance criteria

- [x] Six legacy Hero URLs redirect per P1-T19 / P6-T01
- [x] `/dashboard` and `/sensor&mascot` unchanged
- [x] `/contact` and `/waitlist` unchanged (later tasks)
- [x] Billing “Explore the product” points at `/#features`
- [x] Redirects verified with HTTP status checks

---

## Verification

```text
308 /features → /#features (middleware)
308 /app-directory → /connected-apps
308 /subscription → /billing
308 /docs → /faq
308 /social → /
308 /demo → /
200 /dashboard
200 /sensor&mascot
200 /contact
200 /waitlist
```

---

## Next steps

- **P6-T03:** `/contact` plain marketing page
- **P6-T04:** `/waitlist` retirement
- Then **P6-T06** clean Hero route lists
