# P7-T10: Waitlist + Contact Form Microcopy

**Task ID:** P7-T10  
**Status:** done  
**Type:** Content  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P6-T03](../../phase-6/tasks/P6-T03-contact-marketing-page.md), [P6-T04](../../phase-6/tasks/P6-T04-waitlist-retirement.md)  
**Blocks:** —  
**Blocker:** No

---

## Goal

Optional: align waitlist and contact form labels, success/error strings, and privacy links with the cognitive-layer narrative. Keep API contracts unchanged.

---

## Scope

| In | Out |
|----|-----|
| [`WaitlistForm.tsx`](../../../components/marketing/WaitlistForm.tsx) | `/api/waitlist` and `/api/contact` request/response shapes |
| [`ContactForm.tsx`](../../../components/marketing/ContactForm.tsx) | Legacy [`WaitlistModal.tsx`](../../../components/WaitlistModal.tsx) (not on marketing CTA) |
| Contact page intro copy ([`app/contact/page.tsx`](../../../app/contact/page.tsx)) | Field IDs (`cta-*`, `contact-*`) and FormData keys |

---

## Waitlist (`#cta` / `WaitlistForm`)

| Element | After |
|---------|-------|
| Name placeholder / label | Name (optional) |
| Email label (sr-only) | Work email |
| Platform placeholder | Preferred platform |
| Email empty / invalid | Enter your email / Enter a valid email address |
| Platform empty | Select Windows or macOS |
| Submit / loading | Join waitlist / Joining… |
| Success title / body | You're on the early access list. / We'll email you when MindMesh opens. |
| Privacy line | Early access updates only. See our Privacy Policy. |

POST body still `{ email, name, platform }` with `windows` \| `macos`.

---

## Contact (`/contact` / `ContactForm`)

| Element | After |
|---------|-------|
| Email label | Work email |
| Message placeholder | Ask about demos, integrations, or enterprise. |
| Attachment hint | PDF, Word, or images up to 5MB. |
| Validation | Enter your email / Enter a valid email address / Enter your message |
| File errors | Keep attachments under 5MB / Use PDF, Word, or an image… |
| Success | Message received. / Thanks for writing. We'll reply soon. |
| Footer | Privacy Policy link + Join the waitlist → |

FormData keys unchanged: `email`, `query`, optional `attachment`.

---

## Contact page chrome

- Subtitle and left-column intro tightened slightly; link list unchanged.

---

## Acceptance

- [x] Form microcopy aligned with early-access / cognitive-layer tone
- [x] Privacy links present on waitlist and contact
- [x] API contracts unchanged
- [x] No em dashes in new copy
