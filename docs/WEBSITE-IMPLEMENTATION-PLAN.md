# Platinum Car Films: remaining website implementation plan

Prepared 19 September 2026. This is an implementation handoff for the existing repository, not a request to start a new project.

This is the consolidated implementation plan. Sections 16A and 16B include the full desktop/mobile layouts, image guidance, backgrounds, hover states, and animation rules. Section 17 contains the current Claude prompt. Separate visual documents are supporting references; this plan is the main handoff.

Desktop and mobile page specifications are included in section 16A; a separate reference copy is available in [the visual brief](PAGE-DESIGN-SPECIFICATION.md). The user's later font choice is Nunito throughout the React UI, overriding Manrope in the approved mock. Preserve the logo artwork.

## 1. Goal and current decisions

Complete the static React website using the approved dark homepage mock as the design reference. Preserve the existing website's content, routes, brand, logo, and relevant imagery while improving layout, responsiveness, accessibility, and interactions.

The owner approved the homepage mock's visual direction. The next work is to transfer that direction into reusable React components and apply it to the rest of the website. Do not redesign the approved homepage again.

The client has not confirmed business claims. The owner intends to meet the client on Sunday. Preserve existing claims in the local preview, record inconsistencies, and keep working on everything that does not depend on those answers. Do not invent specifications, certifications, reviews, prices, warranty terms, company history, or contact details.

This phase is static only. Warranty registration, QR codes, claims processing, customer accounts, admin tools, databases, payment processing, Shopify migration, and hosting migration belong to later projects. The public Warranty information page is included now.

## 2. Read these sources first

Read selectively, once, and reuse the findings:

- `react-app/package.json`, `react-app/src/main.tsx`, and the active application entry point.
- `react-app/public/mock/index.html`, `mock.css`, and `mock.js`: approved visual and interaction reference.
- `output/mock-preview/homepage-content-checklist.md`: homepage content checks.
- `REQUIREMENTS.md`: route inventory, field contract, functional requirements, and unresolved content issues.
- `docs/SITE-INVESTIGATION.md`: original site investigation.
- `react-app/public/content/index.json` and `shared.json`: existing route and shared content data.
- Individual files in `react-app/public/content/` for the page currently being implemented.
- `docs/site-audit/source/` only when the extracted content is incomplete or ambiguous.
- `docs/site-audit/assets.csv` and `download-manifest.json`: image placement and provenance.

The app already uses React, TypeScript, Vite, and React Router. `src/replica/ReplicaApp.tsx` contains the existing content-driven recreation. Other `src/pages/` and layout files also exist; inspect imports before assuming they are active. Do not build a third unrelated application.

The older requirements ask for fidelity to the original WordPress design. The later approved dark mock supersedes that visual direction. Original content coverage, route preservation, static-only scope, and unresolved content decisions still apply. Record this distinction in the project documentation without rewriting the original audit evidence.

## 3. Working rules

- Keep `/mock/index.html` intact as a visual comparison reference.
- Implement the finished design in the existing React app, not another standalone HTML site.
- Check existing changes before editing. Preserve unrelated work.
- Reuse useful existing interaction logic after checking its behavior. Avoid a broad rewrite merely for code style.
- Do not run archived WordPress JavaScript or import its full CSS stack into the new design.
- Preserve original wording for now. Mechanical encoding repairs are allowed; do not silently rewrite business meaning.
- Do not introduce em dashes, generic AI marketing copy, invented testimonials, or unsupported badges.
- Track existing editorial artifacts such as `Feature / NLP Entity` for copy review. Do not multiply those labels across newly designed interfaces.
- Keep implementation notes and unresolved-content warnings in developer documents. Only actual preview behavior, such as an unconnected form, needs a visitor-facing explanation.
- Do not deploy or send form submissions as part of this work.

## 4. Visual system

Extract the approved mock's styles into scoped, reusable tokens. Starting values currently present in the mock:

| Role | Value |
| --- | --- |
| Main background | `#0a0a0c` |
| Alternate background | `#111114` |
| Card/panel background | `#19191e` |
| Main text | `#f5f5f5` |
| Muted text | `#b8b8c0` |
| Secondary text | `#a8a8b2` |
| Brand orange | `#ff691b` |
| Light orange | `#ff9b64` |
| Main font | Nunito with Arial/sans-serif fallback; user-selected replacement for the mock's Manrope |

Use the provided Platinum PPF logo without distortion. Preserve the homepage's full-width hero. Inner pages should use more compact introductions so useful content appears sooner. Do not copy a full-screen hero onto every page.

Use consistent container widths, section spacing, button styles, radii, borders, and heading scales. Keep article and policy text in a narrower reading column. Use dark backgrounds throughout the interface, including forms, dialogs, tables, dropdowns, and empty states. Original photographic backgrounds may remain light.

Use one icon approach throughout. Prefer the existing reusable icon component if it is suitable; do not add a second icon font. Preserve the approved font appearance while reducing unnecessary font requests and weights where feasible.

Required states: hover, keyboard focus, active, disabled where meaningful, loading, empty, error, and preview feedback. Orange is an accent, not the default color for long paragraphs. Check text contrast, especially orange text and muted labels on dark panels.

## 5. Route scope

Preserve these paths. Product titles below identify content; use exact source titles where they differ.

| Group | Routes |
| --- | --- |
| Main | `/`, `/about-us/`, `/product/`, `/gallery/`, `/warranty/`, `/contact-us/` |
| Products | `/210-paint-protection-film/`, `/190-micron-ppf/`, `/headlight-paint-protection-film/`, `/matte-paint-protection-film/`, `/satin-paint-protection-film/`, `/gloss-black-paint-protection-film-190-microns/`, `/window-tint-film-for-cars-platinum-car-films/`, `/color-ppf-for-car/` |
| Editorial | `/blog/`, `/blog/how-long-does-paint-protection-film-last/`, `/blog/category/ppf/`, `/author/autoboost018/` |
| Policies | `/shipping-policy/`, `/terms-and-conditions/`, `/privacy-policy/`, `/refund-policy/` |
| Legacy fallback | `/cart/`, `/checkout/`, `/my-account/` |
| Utilities | `/?s=<query>`, no-result search, unknown URL |

The inventory contains 20 primary content pages, two archives, and three legacy routes. Track each separately. Do not count a styled template as completion of every route that uses it.

## 6. Phase A: inventory and migration structure

1. Confirm the active entry point, routing, existing shared components, content schema, asset locations, and current scripts.
2. Create a route checklist with implementation status, source file, template, content gaps, and validation status.
3. Create a content-decision log for client questions. Reference source pages and exact conflicting passages.
4. Establish a new scoped site shell or update the existing one. Keep legacy source styles isolated until their pages are migrated; do not allow global WordPress selectors to style the new components.
5. Use explicit TypeScript content models for new page templates. Reuse extracted content as input, but avoid carrying arbitrary source markup and plugin classes through the entire redesigned site.
6. Preserve existing URLs. If an isolated internal preview is needed during migration, keep it out of indexing and remove the temporary routing when the migration is complete.

Deliverable: a working migration structure and route checklist, with no lost pages.

## 7. Phase B: shared shell and approved homepage

Build or adapt these reusable pieces: site header, mobile navigation, footer, buttons and links, page introduction, section heading, product card, feature grid, comparison table, FAQ group, inquiry form/dialog, gallery viewer, and contact actions. Extract only actual repeated patterns; do not build a generic page-builder framework.

Header requirements:

- Preserve the seven primary navigation destinations from the existing site.
- Desktop and mobile navigation work with pointer and keyboard.
- Indicate the current page. Any submenu must work without hover alone.
- Mobile menu opens and closes reliably, closes on navigation and Escape, and restores focus appropriately.
- Fixed header never covers the first heading or anchor target.

Transfer every approved homepage section into React, retaining its order, wording, images, and interaction behavior. Compare against the mock rather than redesigning from memory.

Preserve fixes already made: single page scrollbar, uncropped promotional banners with embedded text, reduced-motion behavior, stable counters, functional FAQ close behavior, and preview controls that do not overlay content. Developer preview controls do not belong in the public React UI.

The material section has eight original feature images. Preserve their mapping. The current mock hides its sticky image panel at smaller widths; carry that behavior forward initially rather than introducing another mobile layout without review.

Deliverable: the approved homepage running in React with a reusable dark shell.

## 8. Phase C: product template and directory

Implement `/210-paint-protection-film/` first as the representative product page. Inspect its source content before defining the template.

Suggested structure, only where supported by the page's content:

1. Breadcrumbs, original title, introduction, relevant product image, inquiry action, and gallery link.
2. Product-specific problem and solution content.
3. Features and benefits in readable groups or a semantic table.
4. Existing specification information, without invented values.
5. Relevant audience/application content.
6. Existing comparison content.
7. Page-specific FAQs.
8. Closing inquiry action and relevant product navigation.

Make sections optional so differences between products remain intact. Do not fill missing sections with generic marketing paragraphs. Review this template on desktop and mobile before applying it to the other seven products.

Populate each remaining product using its own content and media. Keep distinctions between thickness, finish, headlight protection, window tint, and color film. Do not invent color inventories or tint percentages. Use actual existing diagrams or swatches only where supplied.

Product directory requirements:

- Eight correct products with individual links and useful images.
- The main card link is easy to click and has a visible focus state. Avoid nested interactive controls.
- Consistent image frames without clipping important text or product details.
- Useful layout at one, two, and wider column counts as space allows.
- Do not add filtering for eight products unless source content or a demonstrated usability need warrants it.

Deliverable: directory plus all eight product pages, with product-by-product content checks.

## 9. Phase D: About and Gallery

About: preserve company introduction, mission, product range, quality content, partners, audiences, and contact actions. Use alternating editorial layouts to avoid an uninterrupted grid of identical cards. Do not fabricate staff portraits, factories, history, or certification proof. Partner logos must come from supplied assets.

Gallery: reconcile the existing 136 image elements against source data before removing or combining anything. Preserve order and thumbnail/full-size relationships. Count mismatches must be explained in the checklist.

Use a responsive image grid and a functional accessible viewer. Support close, Escape, previous/next, visible image position, focus containment and return, and sensible mobile controls. Keep images contained in the viewer. Lock background scrolling only while open and restore it on close. Do not preload all full-resolution gallery images.

Lazy-load thumbnails below the initial viewport and provide dimensions to limit layout movement. If using incremental rendering, expose a clear Load more control and preserve ordering. Do not invent categories or describe stock photos as client installations.

Deliverable: complete About page and reconciled, usable gallery.

## 10. Phase E: Warranty and Contact

Warranty: preserve coverage, exclusions, duration table, conditions, limitations, FAQs, and contact actions. Use clear headings and contained horizontal scrolling for tables where needed. Do not add registration or claim submission UI. Keep conflicting terms in the decision log until the client resolves them.

Contact: present source contact details, address, map access, and inquiry form. Use a simple map link rather than automatically introducing an embedded third-party map. Preserve conflicting contact details as an explicit developer decision item instead of selecting a new authoritative value without evidence.

Shared inquiry field contract:

| Field | Validation |
| --- | --- |
| Name | Required; reject whitespace-only value |
| Company name | Required; reject whitespace-only value |
| Email | Required; appropriate email validation |
| WhatsApp number | Required; allow international formatting |
| Product description | Optional |

Use visible labels, useful autocomplete, appropriate input types, and errors associated with fields. Do not reject valid international phone numbers with a rigid local regex. Preserve entered values after validation errors. Move focus to a useful error location on invalid submission.

Valid submission must explicitly say this is a preview and nothing was sent. Never display a false success message. No network submission, local storage of personal details, or external form integration. Newsletter validation follows the same preview rule.

Deliverable: complete informational Warranty and locally validated Contact/quote forms.

## 11. Phase F: blog, policies, and utility pages

Blog index and archives: retain the existing article, metadata, links, search access, and any established recent-post content. Do not invent articles to fill the layout. A single real article is acceptable.

Article: preserve full body content, headings, images, tables, and metadata. Use a comfortable reading width and responsive typography. Retain category and author navigation. Log the existing title/body mismatch for review.

Policies: use one accessible long-form template while preserving all four separate routes and source content. Existing drafting instructions require client review before publication. Do not generate replacement legal terms.

Search: preserve `/?s=` behavior, reflect the query in the UI, search relevant local content, link to correct pages, and provide empty-query and no-result states. No backend needed. Avoid fetching every large page payload on each keystroke; build or derive a compact local index if necessary.

Legacy routes: display a helpful sales-contact fallback rather than raw shortcodes or fake checkout/account forms. Missing routes need a clear not-found page with Home, Products, and Contact navigation.

Deliverable: every route in the inventory has a meaningful and verified destination.

## 12. Motion and accessibility rules

Match the approved mock's restrained motion: hero entrance, short section reveals, card/button feedback, and existing image transitions. Do not introduce scroll hijacking, a custom scrolling container, cursor followers, or a dependency-heavy animation system.

Use transforms and opacity for suitable effects. Content remains available when motion is disabled or reveal setup fails. Respect `prefers-reduced-motion`, including changes during a session. Counters must show final values when animation stops.

Any autoplay carousel needs a visible pause/resume mechanism and should pause on relevant focus/hover and while the document is hidden. Manual controls remain available. Static banners with embedded text must not be cropped to force a cinematic aspect ratio.

Use semantic links for navigation and buttons for actions. Provide a skip link, visible focus, one meaningful H1 per page, sensible heading order, image alternatives, and practical touch targets. Dialogs must fit small screens and allow their own content to scroll without creating a second persistent page scrollbar.

## 13. Performance and technical completion

- Prefer local assets with recorded origins; avoid runtime dependence on the original WordPress host.
- Use appropriate image sizes and modern formats where conversion preserves quality. Keep important diagrams and embedded text readable.
- Prioritize the main hero image; lazy-load offscreen media. Set intrinsic dimensions or aspect ratios.
- Avoid loading all 136 full-size gallery assets on first visit.
- Use one font family from the approved design and one icon approach where practical.
- Avoid adding slider libraries when CSS scroll snap or existing code is sufficient.
- Remove obsolete source CSS/plugin dependencies from migrated pages, not archived evidence files.
- Keep titles and descriptions specific to routes. Preserve canonical path intent and prepare a sitemap covering retained public pages.
- Keep previews out of search indexing; document the production change needed to remove preview restrictions.
- Document host requirements for direct SPA routes and true missing-page HTTP behavior. Do not claim local Vite behavior proves production routing works.
- Measure requests, transferred bytes, loading behavior, and layout shifts on representative pages. Report measured results, not invented performance scores.

## 13A. Quality-of-life update list

User-approved additions for the static rebuild. Implement these alongside the relevant page/component phases, then verify them before final QA. These are planned updates, not completed features.

Existing requirements still include clickable product cards, usable mobile navigation, closable FAQs, accessible gallery controls, form errors that preserve values, contact links, breadcrumbs, search, reduced motion, and mobile table access. The following items supplement those requirements.

| ID | Update | Implementation phase | Acceptance checks |
| --- | --- | --- | --- |
| QOL-01 | Preserve gallery browsing position | D: Gallery | Closing the viewer restores the previous page scroll position and focus to the originating thumbnail. Previously loaded thumbnail batches remain present. Verify after viewing several images, not just the first one, on desktop and mobile. |
| QOL-02 | Restore product-list position on browser Back | C: Products | Returning from a product detail page restores the directory's prior scroll position after its content is ready. Forward navigation also behaves predictably. Fresh navigation to a new page starts at the top; explicit hash links still reach their targets. Replace conflicting unconditional scroll-to-top behavior rather than layering another handler over it. |
| QOL-03 | Back-to-top control on long pages | B: Shared shell | Show after approximately one viewport of scrolling, with an accessible name and a practical touch target. It must not overlap WhatsApp, forms, footer links, or mobile safe areas, and is hidden while an overlay is open. Respect reduced motion and leave keyboard focus at a useful top-of-page target rather than on a control that disappears. |
| QOL-04 | Product context in quote dialogs | C and E: Products/forms | Product-page inquiry triggers show the relevant product name in the dialog without adding a required field or changing the agreed form contract. General inquiry triggers clear stale product context. Existing entered values remain intact during validation. Context stays local; no submission or personal-data persistence is added. |
| QOL-05 | Discoverable horizontal table scrolling | C and E: Tables | Show a concise hint such as "Scroll horizontally to see all columns" only when the table actually overflows. The scroll region has an accessible name and supports keyboard and touch access. Recalculate on resize; do not create horizontal page overflow. |
| QOL-06 | Consistent contact actions | B and E: Shared/contact | Use consistent labels for the same action and a shared configuration for confirmed phone, email, WhatsApp, and map destinations. Check links across header, footer, product pages, and Contact. Keep conflicting source destinations recorded and pending client confirmation; do not silently choose an authoritative value. |
| QOL-07 | Stable layouts while images load | All page phases | Reserve appropriate intrinsic dimensions or aspect ratios for images, thumbnails, and logos. Under a throttled connection, loading media must not push text or controls unexpectedly. Preserve readable text-heavy artwork and check actual crops at desktop/mobile widths. |
| QOL-08 | Useful image failure states | D and shared media | On failed image loading, keep the reserved image area and show concise accessible feedback instead of an unexplained blank or broken-image icon. The gallery viewer retains Close and next/previous controls and allows retry. Avoid automatic retry loops; a failed image must not block the rest of the page. |

Use browser history or in-memory UI state where appropriate. No backend, account, favorites system, saved inquiries, or comparison tool is required. Do not store inquiry values in local storage. Include QOL-01 through QOL-08 in `docs/IMPLEMENTATION-STATUS.md` when implementation begins, marking each pending until its acceptance checks pass.

## 14. Verification and definition of done

For each phase, run the build and lint scripts when affected. On Windows use `npm.cmd run build` and `npm.cmd run lint` from `react-app/` if PowerShell blocks npm.ps1. Document pre-existing failures separately.

Check representative templates at 1440, 1024, 768, 390, and 320 CSS pixels. Verify all routes with a lighter route/link/content smoke check. Test the production preview as well as the development server when the migration is complete.

Required checks:

- Direct navigation and refresh, internal links, back/forward, query search, and hash targets.
- No unexpected horizontal page overflow or duplicate page scrollbar.
- No broken images, missing content, obscured headings, clipped banner text, or unreadable tables.
- Menu, quote dialog, FAQ, gallery, search, and form states work with keyboard and pointer.
- Scroll locks and focus restore correctly after closing overlays or changing routes.
- Reduced motion works and all content remains visible.
- No application console errors or accidental source-site form requests.
- Every route and every product has its content checked against the source.
- All 136 gallery entries are accounted for, with documented discrepancies if any.
- QOL-01 through QOL-08 have been implemented and checked, including browser Back, viewer close, table overflow, and failed/throttled image loading.
- Business uncertainties remain clearly documented; technical completion does not imply client approval or production readiness.

Capture a small set of useful desktop/mobile screenshots for each distinct template and important open interaction state. Do not repeatedly capture the whole website after a minor unrelated edit.

## 15. Client decisions for Sunday

Prepare the following list with examples from the source pages:

1. Correct company name, address, email, phone numbers, and WhatsApp destination.
2. Warranty duration by product, transferability, coverage, exclusions, and claim contact.
3. Correct Platinum 210 thickness terminology and specifications for each film.
4. Correct comparison copy for gloss-black film, currently containing satin-related material.
5. Evidence for statistics, certifications, pricing, financing, origin, and performance claims.
6. Approved partner relationships and permissions to represent them.
7. Which gallery photos represent actual work and any usage restrictions.
8. Business-specific shipping, refund, privacy, and terms content.
9. Approval to remove editorial labels, placeholders, and other drafting artifacts from published copy.
10. Intended inquiry destination and future operational process, without implementing backend delivery yet.

These answers block final content approval, not layout implementation.

## 16. Efficient handoff and checkpoints

Work in this order: A inventory, B shell/homepage, C first product/template then remaining products, D About/Gallery, E Warranty/Contact, F remaining pages, final verification.

Maintain `docs/IMPLEMENTATION-STATUS.md` with completed phases, files changed, checks run, unresolved issues, and the exact next task. Keep it concise enough that another assistant can resume without reading the entire conversation.

At the end of each meaningful batch, report what changed, what was tested, and what remains. Do not spend time repeatedly explaining the same plan. Do not request approval for routine reversible implementation choices. If a decision changes business meaning, preserve the current content and log the question while completing independent work.

Suggested first session: finish A and B, then build the first product page if time permits. Subsequent sessions can finish complete page groups. These are work checkpoints, not promises about elapsed time or token usage.

Final delivery includes the working static React website, updated route checklist, client decision log, verification summary, screenshots for representative templates, and short instructions for editing content and running the app.

## 16A. Desktop and mobile page design specifications

These specifications are part of this implementation plan. They cover every route through shared templates and explicit product differences. The original source content remains authoritative for facts.

### 1. Visual authority and typography

The approved reference is `react-app/public/mock/index.html`. Preserve its dark automotive character, orange branding, full-width homepage hero, and original imagery. Extend that design rather than introducing a new visual identity.

**New user decision: use Nunito throughout the React website.** This overrides Manrope in the mock and the earlier implementation plan. Use `Nunito`, not `Nunito Sans`. Apply it to headings, paragraphs, navigation, buttons, inputs, tables, and dialogs. Keep the supplied logo artwork unchanged.

Prefer a locally hosted Nunito WOFF2 variable font covering weights 400 through 800, with its license retained. If unavailable locally, obtain it from an authoritative font source during implementation. Use `font-display: swap` and a sans-serif fallback. Do not introduce a second family for headings. Recheck wrapping after font replacement, particularly the header and long product titles.

| Element | Desktop target | Mobile target |
| --- | --- | --- |
| Homepage H1 | Preserve approved scale; adjust only to accommodate Nunito | Preserve hierarchy; never clip or force fixed line count |
| Product/editorial H1 | 48px, weight 800, line-height 1.12 | 34px, weight 800, line-height 1.15; 30px at very narrow widths |
| Section H2 | 36px, weight 800, line-height 1.2 | 27px, weight 800, line-height 1.25 |
| Card H3 | 22px, weight 700 | 20px, weight 700 |
| Body | 17px, weight 400, line-height 1.65 | 16px, weight 400, line-height 1.65 |
| Navigation/buttons | 15px, weight 700 | 16px, weight 700 |
| Supporting labels | 14px, weight 600 | 14px, weight 600 |

These are starting design targets. Use fluid interpolation and allow content to determine height. Do not shrink text merely to match a wireframe box.

Colors: background `#0a0a0c`, alternating section `#111114`, panel `#19191e`, primary text `#f5f5f5`, secondary text `#b8b8c0`, orange `#ff691b`, focus accent `#ff9b64`. Buttons use dark text on orange, following the approved mock. Use subtle neutral borders. Avoid making every section a rounded card.

### 2. Responsive layout contract

Design references: desktop 1440px wide and mobile 390px wide. Also verify 320, 768, and 1024px.

| Width | Layout rules |
| --- | --- |
| 1200px and wider | Maximum content width 1224px, centered; generous two-column layouts |
| 1001 to 1199px | 32px side gutters; retain columns only if readable; header may collapse earlier if Nunito labels do not fit |
| 701 to 1000px | 28px gutters; mobile navigation; major hero/form splits become one column; grids generally two columns |
| 700px and below | 20px gutters, 16px at 360px and below; one-column editorial layouts |

Desktop section spacing: normally 88px vertically. Tablet: 64px. Mobile: 48px. Small related sections may use 32px mobile. Card gaps: 24px desktop, 16px mobile. Reading column: maximum 760px. Compact forms/dialog content: maximum 640px.

Full bleed means the background or media reaches both viewport edges; text still respects safe gutters. No fixed page heights. Do not use `overflow-x:hidden` to conceal layout errors. Wide tables get their own labeled scroll region.

### 3. Shared shell wireframe

Desktop:

```text
| LOGO       Home About Products Gallery Warranty Blog Contact    Quote |
|                         page content                               |
| BRAND + summary | Quick links | Products | Contact + newsletter      |
| Copyright                              Policy links                 |
```

Mobile:

```text
| LOGO                           Menu |
| page content                       |
| Brand + summary                    |
| Quick links                        |
| Products                           |
| Contact + newsletter               |
| Policies                           |
| Copyright                          |
```

Header: approximately 88px desktop and 72px mobile; accommodate actual logo proportions. Inner pages reserve header space above content. Homepage retains the approved hero overlay behavior. Mobile menu opens as a dark panel beneath the header, has visible Close and navigation actions, and can scroll if its content exceeds the viewport. Quote action appears inside the menu on narrow screens; do not squeeze it beside the logo.

Footer: four columns desktop, two tablet, one mobile. Keep mobile groups expanded rather than hiding links inside additional accordions. Long email addresses wrap safely. Phone and email are real links. Newsletter has a visible label, email field, action, and explicit static-preview feedback.

No permanent bottom action bar. A floating contact action must respect safe areas and avoid overlaying submit buttons or dialogs. Hide it while a dialog is open.

### 4. Home: `/`

Mode: persuade. Outcome: explain the supplier offering and direct buyers to products or inquiry.

Desktop sequence:

```text
| Full-width approved hero: original heading + actions over imagery |
| Existing feature highlights / statistics                         |
| Company text                          | Company image             |
| Full-width promotional banner + controls underneath               |
| Sticky feature image                  | Material feature content  |
| Comparison table                                                  |
| Buyer audience groups                                             |
| FAQ introduction                      | Questions                 |
| Partner area / existing supporting content                         |
| Closing inquiry section                                           |
| Footer                                                            |
```

Mobile sequence follows the approved mock: hero with readable text and preserved vehicle focal point, highlights wrapping, company text then image, uncropped banner with controls below, material text cards, contained comparison table, stacked audience groups, FAQs, partners, closing action, footer. Preserve exact existing section order if the current mock differs from this schematic. Do not drop sections.

The material image panel is currently hidden at smaller widths; preserve that initial behavior. Promotional artwork containing text uses natural aspect ratio or `contain`, not `cover`. Hero photography can use `cover` with a breakpoint-specific focal point. Do not impose a 100vh hero on short mobile screens.

Use Nunito while keeping the approved composition. Remove mock-only preview controls from the React production UI. Motion follows the approved entrances and reveals, with reduced-motion support.

### 5. Product directory: `/product/`

Mode: browse and choose. Feel: clean catalog, image-led, easy to compare.

Desktop:

```text
| Breadcrumbs                                                      |
| Original title                         Original introduction      |
| [Image][Image][Image]                                             |
| [Name ][Name ][Name ]     3-column grid, eight real products        |
| [Summary + product link]                                         |
| Remaining product rows                                          |
| Existing closing contact content, if present                    |
```

Mobile: breadcrumbs, title, introduction, eight cards in one column, closing content, footer. Tablet uses two columns. Use 4:3 image frames; fit diagrams without cropping. Card names wrap naturally, summaries retain source meaning, and the whole main card area is a navigation link. No nested buttons inside that link. Hover/focus adds a visible border and restrained image movement; touch does not require hover to reveal information.

Do not add search, filters, price labels, availability, or badges not supported by the source. Keep every card's title and destination product-specific.

### 6. Product detail template: all eight products

Mode: persuade and explain. Feel: precise product presentation with enough breathing space for technical content.

Desktop:

```text
| Breadcrumbs                                                        |
| Title + original lead (5 columns) | Product visual (7 columns)      |
| Inquiry     Gallery              |                                 |
| Source problem statement / supporting explanation                  |
| Solution text                    | Relevant image, if supplied     |
| Feature and benefit table / grouped source content                 |
| Existing specifications, where supplied                            |
| Audience items in up to 3 columns                                  |
| Product-specific alternative comparison                            |
| FAQ introduction                 | Page-specific accordion         |
| Original closing content + working actions                         |
```

Mobile:

```text
| Breadcrumbs                    |
| Product title                  |
| Original lead                  |
| Inquiry action                 |
| Gallery link                   |
| Product image                  |
| Problem and solution content   |
| Features and benefits          |
| Specifications if present      |
| Audience items, stacked        |
| Comparison, own scroll area    |
| FAQ title + accordion          |
| Closing actions                |
```

Desktop hero starts around 48px below the header reservation and uses a 48px column gap. Image typically 4:3, with no rigid section height. Mobile image follows the actions and uses 4:3 unless the asset is a diagram/banner that needs its native ratio. Preserve all original information even when the page is unusually long.

Use tables for true comparisons with row/column relationships. A feature/benefit list may become stacked pairs on mobile, keeping each benefit attached to its feature. Multi-product comparison tables retain table semantics and scroll internally. Do not compress them into unreadably small text.

FAQ uses a single column of full-width question buttons, visible plus/minus state, `aria-expanded`, and answers directly below. Allow multiple questions open; clicking an open item closes it. Desktop introduction may occupy one third of the width; mobile introduction precedes the questions. No sticky FAQ heading on mobile.

Closing section preserves all source consultation, gallery, and quote content where present. Do not turn consultation into an unrequested booking workflow. If related products are not in the source, use a simple Products navigation link rather than inventing a recommendation section.

#### Product-specific treatments

All rows inherit both wireframes above. These instructions distinguish imagery and content, not new claims.

| Route | Desktop emphasis | Mobile treatment and restrictions |
| --- | --- | --- |
| `/210-paint-protection-film/` | First reference implementation; original product visual and full technical content | Let long product title wrap; keep thickness terminology unchanged pending review; retain all comparisons and FAQs |
| `/190-micron-ppf/` | Its own imagery/specification content, not copied 210 values | Same order; feature pairs stay together; do not present an unsupported budget/premium ranking |
| `/headlight-paint-protection-film/` | Source headlight detail imagery; keep the light itself visible | Use a tighter focal crop only where it preserves the whole relevant headlight; do not borrow a warranty duration from another page |
| `/matte-paint-protection-film/` | Existing matte-finish imagery with low visual distraction | Avoid filters that make the finish look glossy; keep source finish descriptions adjacent to imagery |
| `/satin-paint-protection-film/` | Existing satin imagery and page-specific benefits | Do not use matte imagery as a replacement; preserve its distinct comparison content |
| `/gloss-black-paint-protection-film-190-microns/` | Gloss-black source visuals; subtle frame separates dark photography from dark background | Maintain visible vehicle contours without altering finish; log satin-related copy rather than silently correcting it |
| `/window-tint-film-for-cars-platinum-car-films/` | Source window imagery and existing tint diagram, if present | Tint artwork uses contain/native ratio; horizontal scrolling allowed only for an actually wide chart; do not invent an interactive tint simulator or legality claims |
| `/color-ppf-for-car/` | Color-film imagery is the focal point; neutral surrounding UI | Preserve colorful banner text without cropping; use source swatches only if supplied; no invented stock/color selector |

For each route, map every source section to its destination before coding. Missing source sections are not permission to invent replacements; extra source sections must be placed in the appropriate part of the layout rather than omitted.

### 7. About: `/about-us/`

Mode: understand the company. Feel: editorial, credible, quieter than Home.

Desktop:

```text
| Breadcrumbs / original title                              |
| Company introduction (55%) | Source company image (45%)    |
| Mission text in a readable column                         |
| Product range overview, source groups in 2 or 3 columns    |
| Quality explanation       | Relevant source visual        |
| Partners in a balanced logo row/grid                       |
| Audience content                                          |
| Original contact actions                                  |
```

Mobile: same order, one column; each image follows its associated text. Product groups stack; partner logos use two columns with equal visual height and original proportions. Avoid a wall of generic icon cards. Preserve source section sequence where it carries meaning. Do not create a company timeline or team section without source content. No invented factory imagery or staff portraits.

### 8. Gallery: `/gallery/`

Mode: experience/browse. Feel: photographs lead; interface stays quiet.

Desktop: compact title and source introduction, then four equal columns, 16px gaps, 4:3 thumbnail frames. Tablet: three or two columns as space allows. Mobile: two columns with 8px gaps at 390px; use one column below 360px if images become too small to inspect. Preserve source order in both DOM and visual reading order. Avoid masonry that changes perceived sequence.

```text
DESKTOP                         MOBILE
| Title + introduction      |   | Title + introduction |
| [01] [02] [03] [04]        |   | [01] [02]            |
| [05] [06] [07] [08]        |   | [03] [04]            |
| ...                       |   | ...                  |
| Load more, if batched     |   | Load more             |
```

Reconcile all 136 entries. A practical initial batch is 24 thumbnails, followed by 24 per Load more, with a visible loaded/total count and accessible announcement. Full-resolution images load only when needed. Appending items preserves focus on the Load more control and does not jump scroll position.

Viewer desktop: full-viewport dark overlay, contained image, Close at top right, counter at top left, previous/next at sides. Mobile: image centered in available height with controls in a separate bottom row, never on top of important image detail. Respect safe areas and device rotation. Swipe may supplement visible controls, not replace them. Escape closes and focus returns to the originating thumbnail. Disable unavailable endpoints or consistently wrap; choose wrapping for this implementation and document it.

Provide image-load failure feedback and a way to continue to the next image. Do not add fabricated project titles or labels claiming the photos are customer installations.

### 9. Warranty: `/warranty/`

Mode: read. Feel: calm, precise, easy to locate conditions.

Desktop: compact introduction, then a 240px contents rail and flexible reading column. Rail links to actual headings; sticky only while it fits beneath the header. Order: existing coverage introduction, coverage/exclusions, duration table, conditions and limitations, FAQs, existing contact actions, following the source's logical grouping.

Mobile: introduction, expanded contents links, then all sections in a single column. No sticky rail. Tables have a visible horizontal-scroll affordance if needed. Do not hide exclusions in collapsed cards while making benefits prominent.

```text
DESKTOP                           MOBILE
| Title / introduction        |   | Title / introduction |
| Contents | Coverage         |   | Contents links       |
|          | Duration table   |   | Coverage              |
|          | Exclusions       |   | Duration table        |
|          | Conditions       |   | Exclusions/conditions |
|          | FAQs + contact   |   | FAQs + contact        |
```

No QR entry, registration button, tracking form, or claim dashboard. Conflicting durations and transferability remain logged pending client review.

### 10. Contact: `/contact-us/` and shared quote dialog

Mode: act. Feel: approachable and straightforward.

Desktop Contact: compact heading, then 40% contact information and 60% form, separated by 56px. Contact column contains source phone/email/address and map link, grouped with small consistent icons. Form panel is subtly lighter than the page, padded 32px.

Mobile: heading, compact contact actions/details, then form. Panel padding 20px; fields fill available width. No large map pushing the form far down the page. Address and long email wrap.

```text
DESKTOP                               MOBILE
| Title / source introduction     |   | Title              |
| Phone/email | Name    Company    |   | Contact details    |
| Address    | Email   WhatsApp   |   | Name               |
| Map link   | Description        |   | Company            |
|            | Preview note      |   | Email              |
|            | Submit action     |   | WhatsApp           |
                                      | Description        |
                                      | Note + action      |
```

Name, company, email, and WhatsApp are required. Description is optional. Labels remain visible outside fields. Inputs minimum 48px high; textarea approximately 140px initially, resizable vertically. Desktop form uses two columns for paired fields; below 701px it is one column. Inline errors appear beneath their fields without clearing values. Valid local submission states explicitly that nothing was sent.

Quote dialog: maximum 640px wide on desktop, dark panel, visible title/Close, same field contract. Mobile uses viewport width minus 24px, maximum height based on dynamic viewport and safe areas, with internal scrolling. The close control remains reachable. On-screen keyboard must not prevent reaching errors or the submit action. Do not add product selectors that alter the agreed field contract.

### 11. Blog and archive pages

Routes: `/blog/`, `/blog/category/ppf/`, `/author/autoboost018/`.

Mode: browse/read. Feel: editorial, not a promotional card grid filled with fake articles.

Desktop: compact title/breadcrumbs, main listing approximately two thirds of width, sidebar one third with search and source recent-post navigation. The existing single article gets one generous image, title, metadata, excerpt, and Read article link. Do not duplicate it to fill space. Category and author pages reuse this layout with their correct existing heading and context.

Mobile: title, search, listing, recent-post links, footer. Article image 16:9 unless source content requires its native shape; title below image, metadata subdued but readable. Sidebar becomes regular flow. No empty reserved columns.

```text
DESKTOP                            MOBILE
| Archive title                |   | Archive title       |
| Article image | Search       |   | Search              |
| Title/meta    | Recent posts |   | Article image       |
| Excerpt/link  |              |   | Title/meta/excerpt  |
                                   | Read article        |
                                   | Recent posts        |
```

### 12. Article: `/blog/how-long-does-paint-protection-film-last/`

Mode: read. Desktop title and metadata sit above a large source image, then a maximum 760px reading column. Preserve body heading order, images, lists, tables, and links. Existing secondary navigation may sit alongside the reading column on wide screens, but must not compress paragraphs below a useful width.

Mobile: breadcrumb, title, metadata, image, full article, category/author navigation and source related links. Body stays 16px or larger. Tables scroll internally. No sticky sharing bar, invented author portrait, fabricated reading time, or added comments system. Preserve source metadata; log title/body inconsistency.

```text
| Breadcrumbs                   |
| Original article title        |
| Existing author/date/category |
| Source article image          |
| Body in readable column       |
| Tables and media as needed    |
| Existing onward navigation    |
```

Same hierarchy on desktop/mobile; only width, typography, and optional side navigation differ.

### 13. Policy pages

Routes: `/shipping-policy/`, `/terms-and-conditions/`, `/privacy-policy/`, `/refund-policy/`.

Mode: read. Use one shared layout, maximum 800px. Desktop: breadcrumb, original title, source update date only if present, contents links when more than four substantial sections, full body, relevant contact link if present. Mobile: same order, full width inside gutters. No ornamental hero, stock image, promotional statistics, or animated paragraphs.

```text
| Breadcrumbs                 |
| Policy-specific title       |
| Existing date, if supplied  |
| Contents when useful        |
| Heading / body / lists      |
| Remaining sections          |
| Existing contact reference  |
```

Shipping preserves its actual shipping sections; Refund preserves actual return/refund content; Privacy preserves its actual data-related content; Terms preserves actual conditions. Do not reuse one policy's paragraphs for another. Drafting instructions and unresolved legal content belong in the review log before production approval.

### 14. Search, legacy routes, and missing pages

Search `/?s=`: compact heading, visible editable query field, result count, vertically stacked results with title, content type, and useful excerpt. Maximum results column 900px desktop; full inner width mobile. Results are not giant image cards. Preserve query on back/forward. Empty query offers a prompt to search; no results offers correction and Products/Contact links. Do not invent results or send queries to a backend.

Legacy `/cart/`, `/checkout/`, `/my-account/`: centered reading-width panel under the standard header. Explain the relevant online function is unavailable in this static version, then provide Products and Contact links. No fake checkout fields, login, balances, or purchase success messages.

Unknown route: clear 404 heading, brief explanation, Home/Products/Contact links. Desktop actions inline, mobile stacked if needed. Keep normal footer. Avoid a full-screen illustrated error that obscures navigation.

Loading/error states: keep shell stable, reserve only reasonable content space, announce loading, provide a retry action for a failed content load. Never leave an indefinite spinner or replace errors with empty sections.

### 15. Interaction and motion specification

Buttons: 160 to 200ms color/border transition; restrained 1 to 2px hover movement only when appropriate. Keyboard focus is immediate and visible. Product images may scale at most approximately 1.025 on hover; do not crop essential details.

Section reveal: optional opacity and up to 16px translation, approximately 400ms, once per section. Do not stagger every paragraph on reading pages. Hero entrance may use the existing mock timings. Nothing requires scrolling back up to reveal missed content.

Reduced motion: no translation, animated counters, parallax, or autoplay. Show final values immediately. For regular motion, autoplay requires visible pause/resume and pauses while the page is hidden and during relevant user interaction.

Forms, policies, search, and article body prioritize immediate readability over entrance effects. No scroll hijacking or separate app-wide scroll container.

### 16. Asset decisions and content safeguards

Reuse local image mappings and the source manifest. Specify each chosen asset in page data so another developer can identify where it came from. No AI-generated product evidence, fake before/after pairs, or invented client work. If a missing image has no reliable replacement, use the relevant existing product image or a text-led layout and record the gap.

Use `cover` for appropriate photography, `contain` or natural dimensions for logos, diagrams, and text-heavy banners. Review desktop and mobile crops separately. Do not apply saturation or contrast filters that misrepresent film finishes.

New UI labels should be concise and functional. Preserve factual copy until approved. Remove em dashes through punctuation-only edits in final display copy, without changing business meaning; preserve archived source evidence. Editorial artifacts need tracked review, not fabricated replacement claims.

## 16B. Images, backgrounds, hover states, and animation

The following requirements are part of this plan, not an optional external brief. Media candidates are indexed in `docs/design/PAGE-ASSETS.md` and `docs/design/page-assets.json`.

### 1. Image selection workflow

Use existing local images first. For each page, inspect its source content, the corresponding asset inventory, and the actual images. The first image in extracted content is not automatically the hero. The inventory records candidates, source roles, dimensions, and local-file existence, not image quality or verified ownership.

Create `docs/design/IMAGE-ASSIGNMENTS.md` as implementation proceeds. Record route, section, selected local asset, original source if available, desktop fit/focal point, mobile fit/focal point, alt text, and any unresolved concern. Use exact paths rather than descriptions such as "nice car photo."

Select existing product-specific imagery ahead of unrelated photographs. Reuse an image when it genuinely represents the same content; do not repeat one generic car throughout unrelated product pages just to fill rectangles. If suitable imagery is absent, use a text-led composition and record the gap. Do not obtain arbitrary new stock imagery, generate product evidence, or fabricate before/after images to complete a layout.

Some source filenames suggest generated imagery. Treat all source images as supplied illustrations unless verified otherwise. Do not relabel them as actual customer installations, factory photographs, certification evidence, or proof of material performance.

The approved mock's asset choices override extracted homepage candidates. Preserve its eight material images and their existing feature mapping. An original source photo associated with a benefit is illustrative, not proof of that benefit.

### 2. Image treatment by type

| Type | Desktop treatment | Mobile treatment | Loading and accessibility |
| --- | --- | --- | --- |
| Homepage hero photograph | Match approved full-width composition; preserve vehicle focal point | Separate focal position if needed; text stays readable without hiding the vehicle entirely | Prioritize the actual initial hero; no lazy loading of above-fold hero |
| Product hero photo | Typically 4:3 within the split layout; cover only if essential subject remains visible | 4:3 beneath title/actions; adjust focal point after inspection | Dimensions reserved; descriptive alt reflecting visible subject |
| Text-heavy promotional artwork | Natural ratio or contain; no crop | Full image scales to viewport; controls below; source explanatory text remains ordinary HTML where available | Do not rely on tiny embedded image text as the only essential information |
| Product diagram/tint chart | Natural ratio or contain in a neutral frame | Natural ratio; allow deliberate enlargement if needed, not arbitrary cropping | Describe purpose; preserve available textual data |
| Product directory card | Consistent 4:3 frame | Same ratio, one-column cards on phones | Lazy below fold; avoid redundant alt when adjacent link title already conveys the same purpose |
| Gallery thumbnail | Uniform 4:3 preview, actual source order | Two columns normally; one at very narrow widths | Proper thumbnail size; meaningful image description where known |
| Gallery full image | Contain within viewer | Contain with controls outside important image area | Load active full image on demand; adjacent preload optional |
| Partner/logo artwork | Contain with equal visual height, original aspect ratio | Two-column logo grid with breathing space | Company name alt; no recoloring that changes identity |
| Article image | Source-appropriate ratio; readable editorial width | Natural ratio where crop would remove context | Preserve source caption if supplied |
| Decorative background | No essential information | Remove decorative detail if it reduces readability | Empty alt when an image element is purely decorative |

Do not stretch images. Do not apply saturation, tint, or contrast filters to product finishes that change the apparent result. Put readability overlays behind text, not over technical diagrams. Transparent images on dark surfaces may need a neutral backing plate; do not redraw the asset.

Use intrinsic width/height or aspect ratio to prevent layout movement. Produce responsive variants only from suitable source resolution, preserve originals, and record derived assets. Avoid making larger "high-resolution" versions of a small thumbnail. Choose image quality by visual inspection, especially embedded lettering and dark gradients, rather than enforcing one compression value for everything.

### 3. Page-by-page image and background schedule

All route names and detailed section wireframes are in the companion page specification. This schedule determines visual treatment, not additional content.

| Page/group | Image usage | Background sequence and emphasis |
| --- | --- | --- |
| Home | Preserve approved hero, company media, four promotional banners, eight material feature visuals, and existing partner imagery | Preserve approved section order and dark surfaces; no new decoration or hero redesign |
| Product directory | Eight product-specific thumbnails, chosen from the corresponding product's real asset set | Main canvas `#0a0a0c`; card image area subtly separated; no photographic page background |
| Platinum 210 | Inspect its page candidates for the actual product illustration; use relevant supporting media only where source supplies it | Hero on main canvas; problem/solution sections alternate with `#111114`; technical tables on a quiet panel |
| 190 micron PPF | Its own page imagery, not copied 210 imagery/specification graphics | Same template and neutral backgrounds so product differences come from content |
| Headlight film | Source headlight detail takes priority; show the whole relevant light assembly | Dark neutral surface; no decorative light beams, lens flares, or fake before/after slider |
| Matte film | Source matte finish photography; retain appearance | Neutral background without glossy visual effects that imply another finish |
| Satin film | Source satin imagery; distinguish from matte using actual image and text | Same shared dark surfaces; do not invent a separate color theme |
| Gloss black film | Source gloss-black imagery with vehicle contours visible | Subtle neutral border/frame to separate dark photo from background; no artificial product glow |
| Window tint | Source window photograph and real tint chart if present | Quiet hero and chart panel; no simulated tint overlay claiming accurate transmission |
| Color PPF | Color-film source imagery and banners; actual available swatches only | Neutral surroundings let image color lead; do not tint the whole interface to match each photo |
| About | Existing company/range imagery and partner assets; text-led mission if no suitable image exists | Alternate main and secondary section surfaces; no invented factory panorama or timeline imagery |
| Gallery | All reconciled source entries in original order; full-image links preserved | Uniform main canvas, minimal frame; viewer scrim approximately 94% black |
| Warranty | No hero image required; diagrams only if genuinely useful and source-backed | Quiet main background; contents rail and tables subtly differentiated; exclusions as visible as coverage |
| Contact | Logo/shared brand assets only unless source image adds real value | Main background with lighter form panel; map is a link initially, not a stock-map background |
| Blog index/category/author | Existing article image; do not duplicate the article to create visual volume | Main canvas, understated listing borders and sidebar; no decorative archive hero |
| Article | Existing article and in-body imagery, preserved in logical order | Solid reading background; tables/pull content differentiated only when source supports them |
| Shipping/Terms/Privacy/Refund | No stock imagery needed | Solid main canvas, restrained dividers, readable column; no animation or gradient behind body |
| Search | Text-led results unless meaningful source thumbnails are already part of design | Solid background, visible query field, subtle result separators |
| Cart/Checkout/Account fallback | No fake product orders, payment art, or profile avatar | Simple dark informational panel with navigation/contact actions |
| Missing page | No generated error illustration required | Main canvas, prominent readable heading and useful navigation |

Source-preserved extra sections must be assigned a matching treatment; do not remove them because they are not individually named here. For all eight product pages, the final chosen files must be recorded separately in IMAGE-ASSIGNMENTS.md before the route is marked complete.

### 4. Background system

Use three principal surfaces: page `#0a0a0c`, alternate section `#111114`, and raised panel `#19191e`. Existing text and accent tokens remain in the page specification. Alternate backgrounds at meaningful content boundaries rather than changing color after every paragraph. A simple section may need only spacing and a divider.

Header: dark opaque or near-opaque surface when scrolled; preserve approved transparent hero state where it exists. Do not require heavy backdrop blur for legibility. Mobile menu and dialog use solid dark panels.

Cards: subtle neutral border, approximately 12 to 16px radius where consistent with the approved mock. Information is not automatically a card: article text, policy sections, and company prose remain open layouts.

Tables: panel background, slightly distinguished header row, subtle row separators; no glowing cells. Forms: dark field fill, distinct boundary, clear orange focus outline, readable error text supported by wording and icons rather than color alone.

Closing inquiry sections: preserve approved orange emphasis. On new pages, prefer a dark section with orange button and a restrained rule over a giant orange gradient. Do not introduce animated gradients, particles, carbon-fiber textures, decorative circuit lines, floating blobs, or moving noise.

Photographic background text needs a localized dark overlay sized for readability. Validate contrast against the actual image at every crop. Do not place long paragraphs directly over busy photographs. Do not use fixed-background attachment on mobile.

### 5. Hover, focus, active, and touch states

No information or required action may appear only on hover. Apply hover-only transforms under `(hover: hover) and (pointer: fine)`. Keyboard focus must be equally clear without needing animation. Touch interfaces always show names and actions.

| Element | Hover | Keyboard focus / active | Timing |
| --- | --- | --- | --- |
| Primary orange button | Slightly lighter orange; optional 1px lift | Visible light-orange outline; pressed returns to baseline | 160ms color/transform |
| Secondary button | Subtle panel fill and brighter border | Same outline; no disappearing label | 160ms |
| Text link | Orange or underline, preserving readability | Visible outline or clearly offset underline | 150ms color |
| Header link | Orange accent; current route remains identifiable | Focus outline; submenu works by click/keyboard | 150ms |
| Product card | Border brightens; image scales at most 1.025 if crop permits | Entire primary link visibly focused; no nested links/buttons | 220ms transform, 160ms border |
| Noninteractive feature card | No pointer cursor or large lift | No artificial tab stop | At most subtle visual change; default static |
| FAQ question | Slight row background change | Plus/minus and expanded state visible; button remains focused | 150ms background; answer immediate or short safe expansion |
| Gallery thumbnail | Small brightness/border change; optional view icon | Focus outline; Enter opens viewer | 180ms |
| Carousel arrow/dot | Visible panel/border change | Labeled control, current slide state, pressed feedback | 150ms |
| Form field | Boundary slightly brighter | Strong focus; labels stay visible; invalid state persists until corrected | 150ms border |
| Table row | Very subtle shading if helpful for scanning | No focus unless it contains a real control | 120ms |
| Partner logo | No fake interactive behavior if not linked | Focus only on an actual destination | Static unless linked |
| Footer contact/social link | Accent and visible underline where suitable | Clear focus ring and accessible name | 150ms |

Use `transition` on named properties, not `all`. Hover cannot resize the surrounding layout. Do not put spring/bounce effects on every action. Use actual semantic anchors and buttons rather than making decorative containers clickable with only mouse handlers.

### 6. Scroll and hero animation schedule

Homepage: preserve the approved entrance sequence. If translating it into React, keep heading, lead, and actions legible immediately on failure and avoid long blocking delays. Hero imagery may have the existing restrained entrance, but do not add endless zooming or a new slider merely for motion.

Inner product/About introductions: one optional fade/translate entrance, 350 to 450ms, no more than 16px. Body content remains in ordinary document flow. Small grids may stagger by approximately 50ms, capped so the last visible item begins within 200ms. Do not stagger all 136 gallery images or every sentence.

Section reveals: once per section, 400ms maximum typical duration, using opacity and transform. Avoid repeated hiding/revealing while scrolling backwards. Sticky desktop material imagery remains as approved; no new mobile scroll-trapping section.

Reading pages, policies, forms, search, and long article body: no reveal requirement. Prioritize immediate reading and interaction. Navigation route transitions should not fade the whole page to blank.

Reduced motion: disable translations, scaling, parallax, autoplay, and animated counters; final content is immediately visible. Listen for preference changes while the page is open. If reveal initialization fails, content must remain visible. Avoid CSS that permanently hides content awaiting JavaScript.

Carousel autoplay, where retained, has visible pause/resume and pauses on document hiding and relevant hover/focus. Manual controls always work. Native smooth scrolling for user-invoked anchor/back-to-top actions is acceptable when reduced motion is off; never replace the browser's scrolling engine.

### 7. Responsive image and background checks

At 1440px, check composition, readable line length, image resolution, and whitespace. At 1024px, check navigation fit and cramped split layouts. At 768px, check the transition to stacked sections and two-column grids. At 390px and 320px, check long titles, crop focal points, embedded banner text, form controls, and page overflow.

Do not use desktop background-position values blindly on mobile. Store focal positions per image when needed. Mobile can stack content differently, but must preserve semantic reading order and all substantive source text. Decorative images may be omitted only when they convey no unique content; document intentional omissions.

Reserve image space during loading. Failed photos show a contained fallback and useful message without collapsing the layout. Gallery errors retain navigation and retry. A missing decorative background should leave a readable solid-color section.

### 8. Completion records

Maintain the route implementation checklist, IMAGE-ASSIGNMENTS.md, and IMPLEMENTATION-STATUS.md. Mark image selections as inspected, not merely found. Do not describe an index candidate as approved before viewing it.

For each page template, deliver representative desktop/mobile screenshots, including hover or focus on an interactive card, an open FAQ, a quote dialog with validation feedback, and gallery viewer where applicable. One shared component's state need not be recaptured on every identical page. Include actual keyboard/touch-oriented checks rather than inferring behavior from screenshots.

Check image request sizes and layout stability with throttling. Confirm no full-size gallery preloading, duplicate fonts/icon libraries, or accidental WordPress plugin dependencies. Nunito must be the computed UI family after font load. Do not claim measured performance scores without running the measurements.

Do not add backend behavior while polishing the UI. Pending business claims stay logged for Sunday review. New copy should be functional and concise; do not add em dashes, fabricated testimonials, decorative certification badges, or generic marketing filler.

## 17. Copy-paste prompt for Claude

```text
Please implement the rest of the Platinum Car Films static React website in this repository.

Read docs/WEBSITE-IMPLEMENTATION-PLAN.md as the consolidated implementation and visual brief, including sections 16A and 16B. Follow its desktop/mobile layouts, image choices and crop rules, backgrounds, hover/focus/touch states, and animation guidance. Inspect relevant candidates in docs/design/PAGE-ASSETS.md and record selected images in docs/design/IMAGE-ASSIGNMENTS.md. Use Nunito throughout the React UI, not Manrope or Nunito Sans; keep the logo artwork unchanged. Follow any applicable repository instructions. Inspect the actual current state before editing and preserve unrelated work.

The dark homepage mock at react-app/public/mock/index.html is the approved visual reference. Preserve that mock for comparison. Migrate its approved design into the existing React app, then apply the same design system to every route in the plan. Reuse the local source content and assets instead of crawling the website again unless something is missing.

Start with phases A and B. Then implement the first product detail page as the reusable template and continue through the remaining phases as time allows. Include the approved QOL-01 through QOL-08 updates in section 13A within their relevant phases. Complete and verify useful batches rather than leaving every page partially styled. Maintain docs/IMPLEMENTATION-STATUS.md so work can resume efficiently.

Business claims remain unconfirmed until the owner's Sunday client meeting. Preserve source claims in the preview, log conflicts, and continue independent work. Do not invent or silently correct specifications, warranty terms, contact details, certifications, testimonials, or legal policies.

This phase is static. Forms validate locally and explicitly say nothing was sent. Do not implement backend services, QR warranty workflows, accounts, payments, Shopify migration, hosting migration, or deployment.

Use React components and the existing stack. Do not run WordPress plugin scripts, add redundant libraries, rewrite the approved design, introduce em dashes or filler marketing copy, or omit source sections to save time.

Verify each completed phase with appropriate build/lint checks and browser checks. Report actual results and unresolved issues. Keep progress updates short and finish with the files changed, checks run, remaining work, and exact next step.
```
