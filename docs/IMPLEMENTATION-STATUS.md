# Implementation status

Last updated: this session, following `docs/WEBSITE-IMPLEMENTATION-PLAN.md`.

## What changed this session

**Architecture decision (see below for why):** switched the live app from
`src/replica/ReplicaApp.tsx` (a generic renderer that replays the original
WordPress page's exact DOM/class structure) to `src/App.tsx` +
`src/pages/*.tsx` (proper typed React components per route, which is what
the plan itself asks for in section 6: "avoid carrying arbitrary source
markup and plugin classes through the entire redesigned site"). `ReplicaApp`
and `replica.css` are untouched and still present, just no longer rendered
from `main.tsx`. Its `Overlays.tsx`, `StaticForm.tsx`, `Icon.tsx`, and
`InteractionContext.ts` (quote dialog, gallery lightbox, floating
back-to-top/WhatsApp, the correct field contract) are reused as-is in the
new app -- they were already well-built and framework-agnostic.

### Phase A (inventory)
- `docs/ROUTE-CHECKLIST.md` -- all 26 routes, status, source file.
- `docs/CONTENT-DECISION-LOG.md` -- 10 items for the Sunday client meeting.
- This file.

### Phase B (shared shell + homepage) -- done, verified
- Design tokens in `src/index.css` corrected to match the approved mock
  exactly (`--bg:#0a0a0c`, `--bg2:#111114`, `--panel:#19191e`,
  `--accent:#ff691b`, etc.) -- they previously didn't match (`--accent` was
  `#ff6411`, a different orange).
- Nunito wired up via Google Fonts CDN in `index.html` (previously declared
  in CSS but the font itself was never loaded, and that CSS file wasn't
  even imported anywhere).
- Font Awesome reused from the same local asset the mock already uses
  (`/assets/original/0c51203e12f5-all.min.css`) -- one icon system, not two.
- `Header.tsx`/`.css`: quote button now opens the shared dialog instead of
  just navigating to Contact; restyled to match the mock's solid-orange
  button language. Fixed a real pre-existing bug: the mobile nav panel and
  quote button were both independently `position:absolute` at the same
  offset, so the button visually covered "Home" (the first nav link) --
  wrapped them in one real flex column (`.mobile-menu-panel`) instead.
- `Footer.tsx`/`.css`: rebuilt to the mock's real 4-column footer (both
  phone numbers, address, social icons, quick links, newsletter using the
  shared `StaticForm`).
- `Home.tsx`/`.css`: full port of the approved mock -- hero, stats, company
  profile, banner carousel, 8-feature material story (per-card
  IntersectionObserver activation, ported from the mock's proven fix for
  the "card skip" bug), comparison table, 5 audience cards, animated FAQ
  accordion (grid-template-rows technique, ported from the mock), partners,
  final CTA with the approved glow treatment.
- `src/styles/overlays.css`: new -- styles the dialog/form/lightbox/floating
  actions components (they had no CSS in the new app since `replica.css`
  isn't loaded here). Caught and fixed the exact same dialog-centering bug
  documented in the mock's own history: an explicit `position` on the
  dialog element (even `position:static`) defeats the browser's native
  `dialog:modal{position:fixed}` centering.

### Phase C (products) -- directory done, detail pages are a shell
- `pages/Product.tsx`: real directory, all 8 products, real titles/
  descriptions/images from `content/index.json`.
- `pages/ProductDetail.tsx`: one reusable template, real per-product data,
  but not yet the full 16A section 6 depth (problem/solution copy, feature
  tables, specs, page-specific FAQs, comparisons) -- that needs a
  per-product pass through each archived source page in
  `docs/site-audit/source/`, which wasn't done this session.

### Phase D (About/Gallery) -- shell
- `pages/About.tsx`: real company-profile and partners content (reused
  verbatim from the approved homepage copy). Mission/quality/audience
  sections from `about-us.json` not yet extracted.
- `pages/Gallery.tsx`: 40 real local photos (factory/production, not
  installations) with a working lightbox. This is NOT the full 136-image
  source inventory -- QOL-01 (preserve scroll position on close) is
  partially satisfied (Lightbox closes without scrolling the page; a
  Load-more/batch loading UI for the full set wasn't built).

### Phase E (Warranty/Contact) -- done
- `pages/Warranty.tsx`: real content, conflicts flagged in-page and in the
  decision log.
- `pages/Contact.tsx`: real details + the shared inquiry form.

### Phase F (blog/policies/utility) -- mostly done
- Blog index/category/author: real single article, honestly not padded.
- Blog article body: title/image only, full extraction pending (see route
  checklist for why).
- Policies: Shipping/Privacy/Refund use the real compliance-ready drafts.
  Terms flagged as genuinely empty on the source site, not drafted.
- Legacy fallback (cart/checkout/my-account), search, 404: done.

## Verified

- 26/26 routes: HTTP 200, zero console errors, zero horizontal overflow,
  correct `<h1>` (Playwright smoke test, this session).
- `npx tsc -b`: zero errors.
- `npx vite build`: succeeds.
- `npx oxlint`: 2 pre-existing/harmless warnings (see route checklist).
- Quote dialog, mobile menu, FAQ accordion, material-story scroll
  activation, banner carousel: manually verified via Playwright screenshots
  this session.
- NOT yet done: the plan's full responsive sweep at 1440/1024/768/390/320
  for every template (only spot-checked 1280 desktop + 390 mobile on the
  homepage and mobile menu); reduced-motion re-verification on the new
  pages; keyboard-only pass on the new pages beyond the homepage.

## Pending / next task

1. Per-product content pass (8 pages) against `docs/site-audit/source/`.
2. Gallery: reconcile against `docs/site-audit/assets.csv`, add batch
   loading if the full set is wanted.
3. About page: extract mission/quality sections from `about-us.json`.
4. Blog article: clean extraction from the 32KB source page.
5. Full responsive sweep (1440/1024/768/390/320) across every template.
6. Self-host Nunito instead of the Google Fonts CDN link, per the plan's
   stated preference.
7. Legacy stays fully separated throughout: the `legacy` branch and its
   `../platinumcarfilms-legacy` worktree were not touched this session --
   confirmed via `git status` showing zero changes there.
