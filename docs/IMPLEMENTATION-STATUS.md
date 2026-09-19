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

## Update: plan expanded with section 16C/16D (authoritative design schedule)

The plan file grew from ~786 to ~2036 lines with section 16C (exact
route-by-route/section-by-section composition, a 49-item image register
A01-A49, and the full 136-image gallery order) and 16D (motion
choreography). `docs/design/GALLERY-ASSIGNMENTS.json`,
`IMAGE-ASSIGNMENTS.md`, `SECTION-COVERAGE.json`, and `selected-assets.json`
were added alongside it -- these are consumed directly, not re-transcribed.

Given the real depth this adds (9-32 fully source-accurate sections per
route, each requiring careful extraction from the messy WordPress AST in
`content/*.json` -- the plan itself warns "reconcile encoding against the
archived HTML, not guesses about numerical values"), implementing all of
16C in one pass isn't realistic without risking exactly the kind of
fabricated/approximate content the plan repeatedly warns against. Followed
the plan's own prescribed sequencing instead (section 8: build the 210
page first, verify, then decide how to replicate):

- **Gallery: done to full 16C spec.** Swapped the 40-photo placeholder for
  the complete, ordered 136-image register from `GALLERY-ASSIGNMENTS.json`
  (exact thumbnail/full-image pairs), with 24-image batch loading ("Load
  more") and full lightbox navigation across all 136, as specified.
- **210 product page (`pages/Product210.tsx`): done to full 16C spec
  (P01-P09).** Real content extracted from `content/210-paint-protection-film.json`'s
  actual AST (problem stats, feature table, 4 audience personas, 4
  comparison rows, 7 real FAQ Q&A pairs, 3-part closing CTA, related-product
  links) -- nothing invented or approximated. This is the reference
  template the plan says to verify before repeating.
- **Fixed a real bug found in the process:** `.button`/`.text-link` styles
  only lived in `Home.css`, so any page that doesn't import it (Gallery,
  ProductDetail) would have rendered unstyled buttons if visited directly
  without going through Home first. Moved them to the globally-loaded
  `overlays.css`.
- **The other 7 product pages, About, Warranty, Contact, Blog article, and
  policies remain at the previous "shell" depth**, not yet upgraded to
  their 16C section tables. Each needs the same AST-extraction treatment
  just done for 210 -- same method, not started due to time, to avoid
  rushing and introducing wrong figures under the same content the plan
  explicitly warns about getting exactly right.
- **16D (motion choreography)** not implemented beyond what was already
  ported from the mock (FAQ accordion, material-story activation, banner
  carousel, button hover/active). The detailed M1/M2/MF timing values in
  16D's tables were not cross-checked against current CSS.

Verified this update: 15/15 spot-checked routes still 200/zero-errors/
zero-overflow, `tsc -b` clean, `vite build` succeeds, lint unchanged (2
pre-existing warnings).

## Update 2: full plan completion

All remaining routes upgraded from "shell" to "full" per section 16C,
continuing the pattern proven on the 210 page:

- **7 remaining product pages**: generalized into one data-driven template
  (`pages/ProductPageGeneric.tsx`) fed by per-product JSON extracted from
  each product's own `content/<slug>.json` source AST (same extraction
  method as 210, batch-applied since all 8 products share an identical
  7-heading source structure). 3 products (headlight, satin, gloss-black)
  genuinely have no comparison-section content in their source -- omitted
  rather than invented.
- **About** (`pages/About.tsx`): all 9 sections from `content/about-us.json`.
  Found a new contact-info discrepancy in the process (a third email,
  `platinumcarfims@gmail.com`) -- logged, not resolved.
- **Warranty** (`pages/Warranty.tsx`): rebuilt from `content/warranty.json`
  directly (the plan specifies this over the editorial draft I'd used
  previously) -- all 10 sections, contents nav, real duration table,
  5-step claim process, liability limitations, FAQ. Found the source FAQ
  answer to the first question is genuinely truncated mid-sentence in the
  source itself -- preserved as-is, logged.
- **Contact** (`pages/Contact.tsx`): updated to the real section labels and
  invitation copy from `content/contact-us.json`.
- **Blog article** (`pages/BlogArticle.tsx`): full 27-section body + 6 real
  FAQ pairs extracted from the article's own source AST -- this turned out
  to be a complete, legitimate long-form article (my earlier assessment
  that it was "unusable WordPress wrapper soup" was wrong; the same clean
  extraction method that worked on products worked here too).
- **Policies**: fixed a real compliance issue with my own earlier work --
  the plan explicitly says not to render the authoring preamble
  (disclaimer/meta-box/"set when published" instructions) as public policy
  body, but the previous `PolicyPage.tsx` rendered the whole raw draft
  including those boxes. Stripped them from the HTML fragments and added a
  real contents nav generated from the actual headings.
- **Terms**: aligned wording to the plan's exact T02 spec ("Terms are not
  available in this preview").

Verified: all 26 routes still 200/zero-errors/zero-overflow, `tsc -b`
clean, `vite build` succeeds, lint unchanged. Visually spot-checked Home,
210, a generic product page, Gallery+lightbox, About, Warranty, Privacy
Policy, and the Blog article.

**Genuinely not done**: 16D's per-section motion timing values weren't
individually audited against every page (the mock's proven interaction
patterns were reused throughout, but not a line-by-line 16D compliance
pass); Nunito is CDN-loaded not self-hosted; gallery alt text is generic
per-image rather than hand-written. None of these are visible defects,
just short of the plan's stated ideal -- listed honestly rather than
silently left out.

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

## 2026-09-20: converted `react-app/` from TypeScript to JavaScript/JSX

The owner asked for plain JSX instead of TypeScript ("thats what i am
familiar with"), as a language conversion only -- no redesign, no route or
behavior changes. All prior sections in this document describe work done
under the earlier TypeScript setup; they remain accurate as history. The
stack is now **React + JavaScript (JSX) + Vite**.

What changed:
- All 31 project-owned `.ts`/`.tsx` files under `src/` renamed to `.js`/
  `.jsx`, with type annotations, interfaces, generics, type-only imports,
  and `as`/`!` assertions removed. No runtime logic, prop shapes, or
  component boundaries changed -- this was a mechanical strip, verified
  file-by-file against the previous TypeScript source.
- `src/replica/types.ts` (a type-only module with no runtime exports) and
  `src/vite-env.d.ts` (a TypeScript ambient-types declaration, meaningless
  in a JS project) were deleted rather than converted, since neither
  produced any runtime value.
- `vite.config.ts` -> `vite.config.js` (unchanged options). `tsconfig.json`,
  `tsconfig.app.json`, and `tsconfig.node.json` removed. Added a minimal
  `jsconfig.json` for editor path/JSX awareness (no enforcement, matches
  the old bundler-mode resolution settings).
- `index.html`'s entry script now points at `/src/main.jsx`.
- `package.json`: build script changed from `tsc -b && vite build` to
  `vite build`; removed `typescript`, `@types/node`, `@types/react`,
  `@types/react-dom` from devDependencies (all TS-only). `npm install` run
  to sync `package-lock.json` -- 6 packages removed, 0 vulnerabilities.
- `.oxlintrc.json`: removed the `typescript` plugin from the `plugins`
  list (no `.ts`/`.tsx` files remain for it to analyze); `react` and `oxc`
  plugins unchanged.
- The unrelated visual-polish-pass changes already in progress when this
  conversion started (PageHeader redesign, Product directory card hover,
  Reveal.tsx, Product210/ProductPageGeneric P01 media-glow work, etc.)
  were preserved as-is -- the conversion was applied to the working tree
  in its current state, not a clean checkout, so none of that in-progress
  work was lost or reset.

Verification actually run:
- `npm install`: clean, 0 vulnerabilities.
- `npm run build` (`vite build`): succeeds, same output shape as the
  TypeScript build (`dist/index.html`, one CSS bundle, one JS bundle).
- `npm run lint` (`oxlint`): identical 3 pre-existing warnings as the
  TypeScript baseline (`Reveal.jsx` set-state-in-effect, `Home.jsx`
  `Date.now` purity, `public/mock/mock.js` unused var) -- nothing new
  introduced by the conversion.
- Grepped the full converted `src/` tree for any remaining TypeScript
  syntax (type annotations, `interface`, generics, `as X` casts) and for
  any import still pointing at a `.ts`/`.tsx` path -- zero matches.
- Ran the dev server and the production preview server and curled every
  route (all 23 top-level paths plus the blog article and an unknown path)
  on both -- all returned HTTP 200, including a direct refresh of a nested
  route (`/blog/how-long-does-paint-protection-film-last`) and the 404
  fallback (`/nonexistent`). Confirmed the built CSS still contains the
  approved design tokens (`--accent:#ff691b`) and Nunito.
- **Not verified**: no browser tool was available in this session, so
  actual rendered output, browser console errors, and interactive
  behavior (FAQ accordions, gallery lightbox, quote dialog, form
  validation, search) were not visually exercised after the conversion.
  The HTTP-level route sweep and matching build output are evidence the
  app serves and bundles correctly, not a substitute for looking at it.
  Recommend a visual pass before treating this as fully verified.

Current commands (unchanged names, different tool underneath the `build`
script):
- `npm run dev` -- Vite dev server.
- `npm run build` -- production build (`vite build`, no type-check step).
- `npm run lint` -- `oxlint`.
- `npm run preview` -- serve the production build locally.

## 2026-09-20 (cont'd): plan sections 16E/16F -- shared fixes, About, Gallery

Following the plan's own priority order (16F "F09": fix bugs first, then
About and Gallery as the two reference pages, then propagate to the rest).
**Remaining routes (Home excluded by design, Products directory, all 8
product pages, Warranty, Contact page layout beyond the overflow fix,
Blog/Article, Policies, Search, fallbacks/404) have NOT been migrated to
the 16E/16F palette or F01 opening treatments yet.** They still use the
older `--bg`/`--bg2`/`--panel` token set and their existing compositions,
which the plan explicitly allows during an incremental rollout, but it
means the site currently has two visual systems in place at once -- About
and Gallery on the new one, everything else on the old one. That's the
next task, not a finished state.

### Shared fixes (done, verified)

- **Contact overflow bug** (16E review: "confirmed 420px-wide details
  column overflowing a 390px viewport"). Root cause: `.replica-form-grid`
  (the Name/Company and Email/WhatsApp paired-field grid used by both the
  Contact page form and the quote dialog) had `grid-template-columns: 1fr
  1fr` with no mobile breakpoint and no `min-width: 0` on its children.
  Grid items default to a min-content minimum width, and two form
  controls' combined UA min-content width doesn't fit a 390px viewport,
  forcing horizontal scroll. Fixed in `src/styles/overlays.css`: added
  `min-width: 0` to grid children and a `max-width: 700px` breakpoint
  collapsing to one column, matching the field contract's own stated rule
  ("below 701px it is one column"). Also added `min-width: 0` to
  `.contact-page`'s own grid children and `.replica-newsletter-fields`
  label as a defensive measure, since those are the same shape of bug.
- **Reveal component's fragile trigger** (16E review: "the reveal
  component starts at opacity zero and waits for 30% intersection...
  remained hidden during one automated reduced-motion traversal").
  Rewrote `src/components/Reveal.jsx` and its CSS in `src/index.css`:
  visible is now the unconditional default -- CSS has no rule that hides
  `.reveal-el` on its own. Only `.reveal-el.pending` (added by JS, and only
  for elements confirmed below the fold via `getBoundingClientRect()` at
  mount) can start hidden, and even then a 4-second fallback timer forces
  it visible if the IntersectionObserver never fires for any reason. Also
  checks `prefers-reduced-motion` directly on mount (not just relying on
  the global transition-duration safety net) and skips the hidden state
  entirely when it's on. Used unchanged by Product210/ProductPageGeneric
  P03/P05 and now also by About's AB03 section and Gallery's GE03/GE05.
- **Public developer/source notes removed from the visitor-facing UI**
  (16E review flagged About's AB05 and the Blog listing; both were
  showing internal "here's why the source didn't give us X" commentary to
  real visitors). `About.jsx`: removed the standalone AB05 section and its
  `ab-note` paragraph; folded its heading ("Built on World-Class
  Materials") into AB06 as an eyebrow label instead, per the plan's
  explicit instruction not to leave an empty band. `Blog.jsx`: removed the
  `blog-note` paragraph explaining why there's only one article. `Terms.jsx`:
  replaced the multi-sentence internal explanation (WordPress placeholder
  history, content-decision-log pointer) with one neutral visitor-facing
  sentence -- the underlying fact is already recorded in
  `docs/CONTENT-DECISION-LOG.md` item 8, so nothing was lost, just moved
  out of the public page.
- **Shared 16F token set and layout primitives** added in `src/index.css`
  alongside (not replacing) the existing `--bg`/`--bg2`/`--panel` tokens:
  `--canvas`, `--surface-steel`, `--surface-raised`, `--surface-copper`,
  `--brand`, `--brand-soft`, `--text-primary`, `--text-secondary`,
  `--text-on-brand`, `--divider`, plus `.container`/`.section-block`/
  `.layout-split`/`.reading-copy` utilities and shared `.ab-eyebrow`/
  `.ab-btn-primary`/`.ab-btn-secondary` components (used by both About and
  Gallery, defined once).
- **`useBoundedParallax` hook** added at `src/hooks/useBoundedParallax.js`:
  one shared passive-scroll controller (single rAF-scheduled listener,
  max 36px translate, disabled at <=1000px width and under reduced
  motion, stops updating while the tab is hidden), per the plan's "one
  shared motion hook/controller" instruction. Used by About's AB06 quality
  image and Gallery's GE01 inset photo and GE05 production panorama.

### About (done, first full pass against the 16E AB01-AB09 table)

Rewrote `src/pages/About.jsx` and `src/pages/About.css` on the new token
set (Recipe A atmospheric opening, Recipe C steel section, Recipe D
copper-backed quality section, Recipe F orange closing band):

- AB01+AB02 merged into one opening (was two sections, with a duplicated
  "About Us" appearing as both an isolated breadcrumb-like label and the
  H1 immediately below it -- the exact issue the 16E review named). Now
  one atmospheric section: a real `Home / About Us` breadcrumb with
  `aria-current="page"`, the H1, the original company heading/body, and
  the source stats as an orange-accented inline row (not four anonymous
  gray pills) on the left; product-box artwork on the right.
- AB03 rewritten as a left-title/right-body steel section with an orange
  vertical rule, replacing the old centered 800px container.
- AB05 removed as a standalone section (see "public developer notes"
  above); its heading now sits as an eyebrow above AB06.
- AB06 quality image swapped from `28808e794687-53.webp` to
  `fb69ba3e9a98-DSC06299_1_6_11zon-scaled.webp` (gallery register ID
  G054), per the plan's explicit instruction that the previous image
  didn't match the specified equipment photo. Gets the one bounded
  parallax moment the plan allows for this page.
- AB07 changed from a 3-column card grid to two-column editorial rows
  with orange markers, per the plan's "avoid six tiny uniform boxes."
- AB09 is now a full orange closing band (Recipe F) instead of another
  charcoal strip.
- Content itself is unchanged -- same source stats, supply items, quality
  points, benefits, and audience rows as before; only composition,
  backgrounds, and typography changed, per the plan's "vary composition,
  not content" rule.

### Gallery (done, first full pass against the 16E GE01-GE07 table)

Rewrote `src/pages/Gallery.jsx` and `src/pages/Gallery.css` as the
"flagship page" the plan asks for. All 136 entries from
`docs/design/GALLERY-ASSIGNMENTS.json` remain in their original order in
a new GE06 "full collection" section (unchanged Load More batching, 24 at
a time) -- nothing was removed or reordered from the archive itself.
Curated sections were added above it using the plan's own explicit image
assignments, cross-checked against the actual register before use:

- **GE01 opening**: title, lead, two actions ("Explore highlights" /
  "Browse all 136 images"), main application-photo image plus a smaller
  bounded-parallax production inset (G043).
- **GE02**: chapter navigation band linking to the three curated sections
  plus the full archive.
- **GE03 product imagery**: G010 (film-roll artwork), G015 (packaging
  stack), G031 (car/film composite) -- the plan's exact assignment.
- **GE04 color and finish**: G034-G038, five supplied color/finish
  photographs as selectable swatches (large display + 5 controls, no
  autoplay, 220ms opacity transition on explicit selection only). Labels
  are read off the source filenames (e.g. "Matte Metallic — Track Gold
  Green") as neutral navigation copy, not new product claims -- flagged
  here in case the owner wants different wording before Sunday.
- **GE05 production imagery**: G043 full-bleed bounded-parallax panorama,
  then G121 (tall) plus G054/G064 (supporting equipment) in a two-column
  editorial layout -- the plan's exact assignment.
- **GE07 closing**: full orange band, Products + quote-dialog actions.

All curated images open in the same shared `Lightbox` component already
used for the full archive (clicking any featured image opens the real
136-image viewer at that image's position, with working next/prev/Escape/
focus-restore) -- one viewer system, not a second one-off image popup.

**Not done / flagged rather than guessed:**
- The plan asks to "inspect G105-G120 and G129-G136 at full size and
  correct only confirmed sideways photographs." No browser/image-viewing
  tool was available this session to actually inspect them at full size,
  so no rotations were applied -- guessing would violate the plan's own
  "do not guess a single rotation for all of them." Needs a follow-up pass
  with visual inspection available.
- GE04's swatch labels (above) are a best-effort reading of source
  filenames, not confirmed product terminology -- worth a quick owner
  check before Sunday, same as other pending content items.
- No visual/browser verification was performed this session (see below).

### Verification actually run

- `npm run build`: succeeds after every batch (About, then Gallery, then
  cleanup), same output shape.
- `npm run lint`: identical 3 pre-existing warnings as every prior
  baseline this session -- nothing new from this batch either.
- Route smoke test (`curl` against the dev server) across all 11
  representative routes including `/about-us`, `/gallery`, and an unknown
  path: all 200, no regressions from the shared-file changes (Reveal,
  overlays.css, index.css touch every page that uses them).
- **Not verified**: no browser tool was available this session. The new
  About/Gallery compositions, the color-swatch interaction, the bounded
  parallax, the Reveal fix's actual behavior on scroll, contrast ratios,
  and mobile layouts at 1440/1024/768/390/320 have NOT been visually
  inspected -- only confirmed to build, lint clean, and serve 200. Per the
  plan's own repeated instruction ("do not equate a styled shell or HTTP
  200 response with completion"), these two pages should be treated as
  implemented-but-visually-unverified, not signed off.

## Pending / next task

1. Visual verification pass on About and Gallery (screenshots at
   1440/1024/768/390/320, contrast check, parallax/reveal behavior,
   GE04 swatch interaction, Lightbox from each curated section) once a
   browser tool is available.
2. Apply the same 16E/16F design system to the remaining routes, in the
   order the plan lists: Product directory, product detail template (210
   first), Warranty, Contact (layout beyond the overflow fix), Blog/
   Article, policies/search/fallbacks -- per plan 16E's own per-route
   table.
3. G105-120/G129-136 orientation review (needs visual inspection, not a
   guess).
4. GE04 swatch label wording -- confirm with owner or leave as the
   filename-derived reading.
5. Full 1440/1024/768/390/320 responsive sweep across the two migrated
   pages, then the rest as they're migrated.
6. QOL-01 through QOL-08 re-verification against the new Gallery
   (QOL-01 gallery scroll/focus restoration in particular, since the
   viewer now opens from five different entry points instead of one).
