# Platinum Car Films: remaining website implementation plan

Prepared 19 September 2026. This is an implementation handoff for the existing repository, not a request to start a new project.

Latest direction: section 16E overrides earlier conservative visual rules with stronger surface contrast, consistent alignment, bounded parallax, and a curated gallery experience. Read it and section 16F (concrete CSS/component contract and page-opening fixes) before implementing.

This is the consolidated implementation plan. Sections 16A and 16B establish the shared system. Section 16C is the authoritative route-by-route and section-by-section schedule, with exact inspected image assignments, backgrounds, desktop/mobile compositions, and the complete 136-image gallery order. Section 16D specifies section animation triggers, timing, easing, interaction states and reduced-motion behavior. Section 17 contains the current Claude prompt. Separate visual documents are supporting references; this plan is the main handoff.

Desktop and mobile page specifications are included in section 16A; a separate reference copy is available in [the visual brief](PAGE-DESIGN-SPECIFICATION.md). The user's later font choice is Nunito throughout the React UI, overriding Manrope in the approved mock. Preserve the logo artwork.

> **Stack update (2026-09-20):** the project was converted from React + TypeScript to plain React + JavaScript/JSX at the owner's request (see `docs/IMPLEMENTATION-STATUS.md` for the conversion record). References below to TypeScript, `.tsx`/`.ts` files, `tsc -b`, or `tsconfig` describe the stack as it existed when this plan was written and executed; the equivalent files now live under `.jsx`/`.js` and the build no longer runs a type-check step.

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

## 16C. Authoritative page-by-page, section-by-section design schedule

Added after reviewing the implementation and the actual local media. This section is the detailed visual execution contract requested by the owner. It takes precedence over generic suggestions in 16A/16B wherever image fit, section arrangement or opening height differs. The supplied homepage mock remains the authority for the homepage composition; Nunito and the supplied logo remain required. These are implementation specifications, not claims that the current app already matches them or that the owner has individually approved every new inner-page composition.

Read this section before implementation. Every route below has a complete ordered section list. Do not stop at a heading and poster. Shared patterns define precise reusable behavior; the individual route tables select their content, backgrounds and media. All original substantive copy, table rows, FAQs and source CTA descriptions must be mapped to a section. A missing source image is not permission to fabricate proof or replace the section with filler. Source paths beginning `content/` are relative to `react-app/public/`; `pages/` paths are relative to `react-app/src/`. Section IDs are scoped to their named route; A01-A49 and G001-G136 inside image columns are the global media IDs.

#### Opening treatment and global geometry

- **Home alone has the immersive photographic hero.** No other page gets a full-width background photo, a darkened car banner behind its H1, or a viewport-height introduction.
- **Product pages:** compact content introduction with copy/actions left and an uncropped product poster right. This is product information, not another homepage hero. Desktop poster max-height 420px; opening has natural height and 48px top/64px bottom padding. Never force a long source title to fit by shrinking it below 36px desktop. At mobile: title, short source introduction, actions, poster; title/actions come before the image. Poster max-height 340px. Let text grow naturally.
- **About:** short title followed immediately by an editorial copy/image section, not a separate decorative banner.
- **Products, Gallery, Blog and archives:** breadcrumb, H1 and at most two lines of source introduction. Padding 32px top/24px bottom desktop, 24px/20px mobile; no minimum height. The first content item follows with a 24px gap.
- **Contact, Warranty, policies, Search and fallback pages:** plain title on the page background. The form, table, reading text or recovery action is the first focal point.
- Desktop shell max-width 1200px with 32px side gutters; tablet 24px; mobile 20px (16px at 320px). Standard section padding 80px vertical desktop, 56px tablet, 40px mobile. Product sections 64px/48px/36px. Reading subsections use 32px top spacing, not 80px bands. No forced equal heights for paragraphs.
- Desktop grids at 1024px and above; 768-1023px use two columns only where readable; below 768px split sections stack in DOM reading order. At 320px all grids except simple two-item statistic rows become one column. Tables scroll inside their own region.
- Nunito: inner H1 44px/1.12 desktop, 36px tablet, 30px/1.18 mobile; long product titles may use 40px desktop. H2 34/28/26px, H3 22/21/20px. Body 18px/1.65 desktop, 16px/1.65 mobile; metadata 14px/1.5. Copy measure 65-72ch; reading column max-width 800px. Use actual text, never text baked into screenshots as replacement HTML.
- Cards: 12px radius, 1px `rgba(255,255,255,.14)` border, 24px desktop/20px mobile padding, 24px grid gap (16px mobile). Primary buttons use orange fill, near-black text, minimum 44px height; all interactive controls have a visible 3px focus outline. Use the approved mock's existing button geometry on Home.

#### Background and motion keys used in every section table

| Key | Exact treatment |
| --- | --- |
| B0 | Solid `#0a0a0c` page canvas. No photograph, texture or gradient. |
| B1 | Solid `#111114` full-width band with content inside the same container. |
| B2 | Solid `#19191e` local card/panel on the stated B0/B1 parent; 1px neutral border. |
| B3 | Solid `#111114` CTA band, 1px top border, small orange action. No orange full-width flood or repeated car image. |
| BT | Reading surface: B0 throughout; tables have `#19191e` header and `#111114` alternating rows. No cards around every paragraph. |
| BI | Media frame `#111114`, image at natural ratio or `object-fit:contain`, no tinted overlay. Original light artwork stays light inside the dark frame. |
| M0 | Immediate content, no entrance animation. Hover/focus feedback only. |
| M1 | Once-only 300ms opacity + 12px upward reveal on desktop; mobile 240ms opacity only. Use only on the sections assigned M1 below, not every section. Content is visible by default and if setup fails. Reduced motion: immediate final state. Detailed triggers and stagger limits are in 16D. |
| M2 | Action feedback: 160ms color/border transition; clickable cards may lift 2px on pointer hover, never on touch; focus gets the same contrast emphasis without moving. |
| MF | FAQ: native details/summary, 44px minimum trigger, chevron state, 180ms grid-row/opacity expansion; reduced motion opens instantly. Preserve every answer. |
| MV | Gallery viewer: native modal, no scale/zoom entrance, 150ms opacity permitted; image contains; Escape/arrows/close, focus trap/return and background scroll restoration. |

**Image conventions:** `Axx` resolves to the exact full local URL in the asset register below; `Gxxx` resolves to the ordered Gallery register. These are concrete assignments, not search suggestions. `None` means intentionally no image. Do not replace None with a stock photo, gradient or generic car. Poster/diagram fit is always contain at 50% 50% on desktop and mobile. Photo focal points are specified where a crop is allowed. All alt text describes visible content, not claimed performance. Source posters and composites are supplied promotional illustrations, not verified customer installations. Embedded claims remain client-review items.

#### Shared shell and overlays (applies to every route)

| Section | Background / image | Desktop | Mobile | Behavior |
| --- | --- | --- | --- | --- |

| Header | B0; A49 supplied logo, contain, no crop | 88px high; logo 210px wide, natural aspect; seven nav links, search button and quote action | 72px high; logo 175px wide; search/menu controls; quote within menu | Current route indicated, product detail marks Products; menu closes on link, Escape and route change; focus returns; internal route starts at top, Back restores position |

| Mobile menu | B0 at 98% opacity; None | Not rendered as a duplicate desktop menu | Panel below header; max-height calc(100dvh - 72px); overflow auto; seven links then quote | 44px targets; menu button aria-expanded/controls; no background focus trap unless implemented as a true modal |

| Footer | B1; A49 logo at 190px wide, contain | Four columns: brand/social, contact, nav, newsletter; policies below | Two columns tablet; one column phone; groups stay expanded | Real contact config; do not show inactive social icons as usable links; preview-only newsletter feedback |

| Quote dialog | Backdrop black 70%; B2 dialog; None | Max-width 640px; title then optional product name; paired Name/Company and Email/WhatsApp fields; optional message | Width calc(100% - 32px), max-height calc(100dvh - 32px), scroll body; fields stack | Product context local; trimmed required fields, field-associated errors, no network send; Escape closes; return focus; hide floating actions |

| Gallery overlay | Backdrop black 92%; image BI; current G image only | Image max 88vw by calc(100dvh - 120px); separate close, count, previous/next | 44px controls in reserved top/bottom bars; image never beneath buttons | MV; open selected item, arrows navigate full manifest, error keeps controls and Retry; restore originating tile and loaded batches |

| Floating contact and Back to top | B2 circles; None | Bottom/right 24px, separated 12px | 16px plus safe-area insets; do not cover forms or footer actions | Back to top appears after one viewport and transfers focus to main heading; hide both during modal; reduced-motion instant scroll |

### Home: `/`

**Content source:** `public/mock/index.html`, `mock.css`, `mock.js` and `content/home.json`; content index route `/`

**Composition:** Desktop: full-width car opening > compact stats > text/image profile > banners > sticky material image/cards > comparison > audience > FAQ > flags > inquiry. Mobile keeps that order.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| H01 Opening | A01; B0 plus approved left-to-right black scrim; keep mock scrim values | Copy left max 760px, car rear visible right; preserve mock media inset/mask and cover focal 50% 57% | Copy top; use mock responsive media inset and 50% 57% focal point; natural content height, never force 100vh; adjust only to prevent text/car collision | Approved mock entrance timings specified in 16D; actions to quote and profile; no autoplay video |

| H02 Existing statistics | B1; None | Four equally spaced values in one row, thin dividers | 2 x 2, no carousel | M0; show source final values; no invented metrics |

| H03 Company Profile / What We Supply | B1; A02 factory roll-line photograph, 4:3 cover focal 50% 50% | Copy 58%, photograph 42%; source list and concluding paragraph all present | Copy then 4:3 photograph; no image behind copy | M1 once; photograph illustrative, not certification evidence |

| H04 Promotional banners | B0; A03, A04, A05, A06 in this order | Natural 1920:649 ratio, contain; controls below image | Same full uncropped artwork; tap to enlarge; labels remain HTML | Manual scroll-snap carousel; arrows/dots and keyboard. If approved autoplay is retained, expose Pause and honor hover/focus/visibility/reduced motion |

| H05 Material story introduction | B0; None | Kicker, two-line H2 and source introduction max 760px | Full gutter width, no image | M0; Explore specifications links to Products |

| H06 Eight material features | B0 parent; B2 cards; A43/A42/A23/A44/A45/A46/A47/A48 in exact feature order | Sticky image left 44%, eight readable feature cards right 56%; image contain in fixed reserved frame; source copy below each trigger | Hide decorative sticky panel as approved; all eight feature texts remain in order, no sticky behavior | Preserve mock active-image behavior; MF is not used here; click/keyboard chooses feature, reduced-motion immediate change; map detailed below |

| H07 Supplier comparison | B1; None | H2 then all source comparison rows in semantic four-column table | Same table in labeled overflow region; show horizontal hint only when overflow exists | M0; keyboard-scrollable table, no reveal of individual rows |

| H08 Five buyer audiences | B0; None; use existing icon system | 3 cards first row, 2 second row aligned to grid; every source CTA retained | One column; no horizontal swipe-only cards | M1 section/M2 actions; quote vs navigation determined by existing CTA intent |

| H09 FAQ | B1; None | Intro 34%, nine source answers 66%; first open as approved | Intro then full-width questions | MF; verify close and switching questions, no answer disappears on unrelated rerender |

| H10 Existing partner area | B0; A07/A08/A13/A09/A10/A11/A12, this order | Seven country-flag artworks, square contain at 112px; keep source heading pending copy review | Two-column grid with 16px gaps; last aligned left; no marquee | M0; alt identifies flag country; do not describe these as company logos or certification badges |

| H11 Closing inquiry | B3 with the approved mock CTA glow only; None | Source heading and both source paragraphs max 800px; quote/email actions inline | Text then stacked actions; no repeated car photo | M1; quote opens dialog; email uses shared config |

**H06 exact mapping:** Polymer base A43; Material positioning A42; Adhesive layer positioning A23; Self-healing topcoat A44; Nanoceramic topcoat A45; Anti-yellowing/high clarity A46; Thickness options A47; OEM/ODM A48. This preserves the approved illustrative mapping; none of these photographs establishes the claimed physical property.

### Product directory: `/product/`

**Content source:** `content/product.json`

**Composition:** Plain heading > eight poster cards > compact help choosing strip. No background-photo opening.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| D01 Title | B0; None | Breadcrumb, original H1, short source intro max 720px | Same, natural height, 24px bottom gap | M0 |

| D02 Eight products | B0; B2 cards; A17/A29/A30/A31/A32/A33/A41/A35 in source order | 4 columns >=1200px; 3 at 1024px; image 4:5 contain, 16px inset; title, source summary, View product label | 2 columns tablet; 1 below 600px; poster max-height 340px; copy not truncated | M2 whole-card link, no nested buttons; retain directory scroll position on Back; no filtering for eight items |

| D03 Help choosing | B3; None | One concise functional line and Contact action, horizontal | Text then action; not another large CTA hero | M0; no new business claims |

### 210 PPF: `/210-paint-protection-film/`

**Content source:** `content/210-paint-protection-film.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. 210 thickness positioning, protection and source comparison; retain all 210-specific warranty/cost statements for review.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A17 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Are Losing Paint Value Without Protection | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Platinum 210 Paint Protection Film Is the Professional Solution | B0; A18 in BI, contain, natural aspect ratio | Source solution paragraphs, source feature/benefit checklist; 60% copy / 40% media; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; 210 thickness positioning, protection and source comparison; retain all 210-specific warranty/cost statements for review |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Platinum 210? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Platinum 210 vs. Traditional Paint Protection | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Vehicle's Paint Investment? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/190-micron-ppf/` and `/gloss-black-paint-protection-film-190-microns/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `$400–$800 Rock Chips at Highway Speeds`; `40–50% Luxury Vehicle Value Loss`; `3× Compounding Costs`; `Luxury Vehicle Owners`; `Fleet Managers`; `Detailing Professionals`; `New Car Buyers`; `Schedule Your Free Consultation`; `View Before-&-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

### 190 Micron PPF: `/190-micron-ppf/`

**Content source:** `content/190-micron-ppf.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. 190 thickness and the source feature table; do not use the acid-green color example as proof of clear-film finish.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A14 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Are Losing Paint Value Without Professional Protection | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why 190 Micron PPF Is the Professional Paint Protection Standard | B0; None; intentionally text-led | Source solution paragraphs, source feature/benefit checklist; 800px copy with checklist in two columns; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; 190 thickness and the source feature table; do not use the acid-green color example as proof of clear-film finish |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from 190 Micron PPF? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 190 Micron PPF vs. Alternative Protection Methods | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Vehicle's Paint Investment? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/210-paint-protection-film/` and `/matte-paint-protection-film/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `$400–$800 Rock Chips at Highway Speeds`; `40–50% Luxury Vehicle Value Loss`; `Compounding Resulting Coast`; `Luxury Vehicle Owners`; `Fleet Managers`; `Auto Detailing Professionals`; `Dealership Service Teams`; `Schedule Your Free Assessment`; `View Installation Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

**Additional source artwork disposition:** the repeated source solution illustration is not promoted to a new product proof image. Preserve substantive HTML content in P03. Any source artwork carrying unique text must have that text mapped into P03/P04 before its duplicate/decorative placement is omitted; record this in the image assignment log.

### Headlight PPF: `/headlight-paint-protection-film/`

**Content source:** `content/headlight-paint-protection-film.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. headlight damage and visibility; keep the headlight warranty conflict in the decision log; A47 is a headlamp detail illustration only.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A26 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Are Losing Value Due to Headlight Damage | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Headlight PPF Is the Professional Protection Standard | B0; A47 in BI, contain, natural aspect ratio | Source solution paragraphs, source feature/benefit checklist; 60% copy / 40% media; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; headlight damage and visibility; keep the headlight warranty conflict in the decision log; A47 is a headlamp detail illustration only |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Headlight Paint Protection Film? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Headlight PPF vs. Traditional Headlight Protection | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Headlights for Good? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/210-paint-protection-film/` and `/window-tint-film-for-cars-platinum-car-films/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `£150–£400`; `3–5 years`; `2×`; `Luxury Vehicle Owners`; `Fleet Managers`; `Detailing Professionals`; `New Car Buyers`; `Schedule Your Free Consultation`; `View Before-and-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

### Matte PPF: `/matte-paint-protection-film/`

**Content source:** `content/matte-paint-protection-film.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. matte finish preservation; do not insert a glossy-car photograph into the finish explanation.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A28 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Matte Finish Owners Are Losing Paint Value Without Specialized Protection | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Matte Paint Protection Film Is the Essential Choice for Custom Finishes | B0; None; intentionally text-led | Source solution paragraphs, source feature/benefit checklist; 800px copy with checklist in two columns; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; matte finish preservation; do not insert a glossy-car photograph into the finish explanation |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Matte Paint Protection Film? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Matte PPF vs. Traditional Matte Paint Protection Methods | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Custom Matte Finish? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/satin-paint-protection-film/` and `/210-paint-protection-film/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `$500–$1,200 Rock Chips on Matte Paint`; `15–25% Specialty Finish Value Loss`; `Compounding Resulting Costs`; `Matte Finish Enthusiasts`; `Performance Car Owners`; `Custom Vehicle Builders`; `Dealership Service Teams`; `Schedule Your Free Assessment`; `View Installation Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

**Additional source artwork disposition:** the repeated source solution illustration is not promoted to a new product proof image. Preserve substantive HTML content in P03. Any source artwork carrying unique text must have that text mapped into P03/P04 before its duplicate/decorative placement is omitted; record this in the image assignment log.

### Satin PPF: `/satin-paint-protection-film/`

**Content source:** `content/satin-paint-protection-film.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. low-gloss satin finish; no crimson sedan image presented as measured satin finish evidence.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A36 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Satin Finish Owners Are Losing Value Without Specialist Protection | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Satin PPF Is the Professional Standard for Custom Finishes | B0; None; intentionally text-led | Source solution paragraphs, source feature/benefit checklist; 800px copy with checklist in two columns; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; low-gloss satin finish; no crimson sedan image presented as measured satin finish evidence |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Satin Paint Protection Film? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Satin PPF vs. Traditional Satin Finish Protection | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Satin Finish Investment? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/matte-paint-protection-film/` and `/gloss-black-paint-protection-film-190-microns/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `£500–£1,200`; `15–25%`; `3×`; `Satin Finish Owners`; `Luxury & Performance`; `Custom Builders`; `Detailing Professionals`; `Schedule Your Free Consultation`; `View Before-and-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

**Additional source artwork disposition:** the repeated source solution illustration is not promoted to a new product proof image. Preserve substantive HTML content in P03. Any source artwork carrying unique text must have that text mapped into P03/P04 before its duplicate/decorative placement is omitted; record this in the image assignment log.

### Gloss Black PPF: `/gloss-black-paint-protection-film-190-microns/`

**Content source:** `content/gloss-black-paint-protection-film-190-microns.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. gloss black finish and 190-micron source details; illustrative car/roll composite, never a before/after pair.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A25 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Lose Gloss Value Without Professional Protection | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why 190-Micron Gloss Black PPF Is the Professional Protection Standard | B0; A21 in BI, contain, natural aspect ratio | Source solution paragraphs, source feature/benefit checklist; 60% copy / 40% media; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; gloss black finish and 190-micron source details; illustrative car/roll composite, never a before/after pair |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Gloss Black Paint Protection Film? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Gloss Black PPF 190 Microns vs. Traditional Paint Protection | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Protect Your Gloss Black Paint Investment? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/satin-paint-protection-film/` and `/color-ppf-for-car/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `$400–$900`; `40–50%`; `3×`; `Luxury Vehicle Owners`; `Fleet Managers`; `Detailing Professionals`; `New Car Buyers`; `Schedule Your Free Consultation`; `View Before-and-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

### Window Tint: `/window-tint-film-for-cars-platinum-car-films/`

**Content source:** `content/window-tint-film-for-cars-platinum-car-films.json`

**Composition:** Compact split intro > source problem > solution > feature table > audiences > comparison > FAQs > closing actions > related links. ceramic tint, heat and signals; poster contains 5% VLT but must not imply the only available or universally legal grade.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A41 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Lose Comfort and Value Without Quality Tint Film | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Platinum Window Tint Film Is the Professional Standard | B0; A06 in BI, contain, natural aspect ratio | Source solution paragraphs, source feature/benefit checklist; 60% copy / 40% media; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; ceramic tint, heat and signals; poster contains 5% VLT but must not imply the only available or universally legal grade |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P05 Who Benefits Most from Window Tint Film for Cars? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Window Tint Film for Cars vs. Traditional Tint Alternatives | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Upgrade Your Vehicle's Window Tint? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/headlight-paint-protection-film/` and `/210-paint-protection-film/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `Vehicle Owners`; `Fleet Managers`; `Detailing Professionals`; `Auto Dealerships`; `Schedule Your Free Consultation`; `View Before-and-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

### Color PPF: `/color-ppf-for-car/`

**Content source:** `content/color-ppf-for-car.json`

**Composition:** Compact split intro > source problem > solution > feature table > color examples > audiences > comparison > FAQs > closing actions > related links. color-change plus protection; existing color visuals are examples, not an available-stock or guaranteed color-match catalogue.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| P01 Product introduction | B0; A22 in BI, 4:5 contain at 50% 50%, no overlay | 55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text | Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop | M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge |

| P02 How Vehicle Owners Lose Value Choosing the Wrong Color-Change Option | B1; None | Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers | Full paragraph then one-column figures with explanatory labels | M0; preserve qualifications/currencies, no animated counters; source encoding repairs only |

| P03 Why Color PPF Is the Solution Vehicle Owners Choose | B0; None; intentionally text-led | Source solution paragraphs, source feature/benefit checklist; 800px copy with checklist in two columns; before/after statements as labeled text, not fabricated photos | Copy, checklist, then image if assigned; before/after text stacks; retain full wording | M1; color-change plus protection; existing color visuals are examples, not an available-stock or guaranteed color-match catalogue |

| P04 Feature-Advantage-Benefit Analysis | B1; None | Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list | Scrollable table min-width 640px in named region with conditional hint; no page overflow | M0; do not invent a technical specifications block when none exists |

| P04a Supplied color examples | B0; G032-G039 in exact register order, BI 16:9 contain | Two columns of supplied color illustrations with filename-derived color labels; small caption “Illustrative color examples” | One column, full artwork including inset swatch; no simulated recoloring | M2/MV on image; preserve source color-range copy here; no stock status, dropdown inventory, or promise of exact screen color match |

| P05 Who Benefits Most from Color PPF for Car? | B0; B2 panels; None | Four source audience groups in 2 x 2, each with original description and CTA | One column; CTA aligns after its own text | M1/M2; no stock people photographs; context-aware inquiry actions |

| P06 Color PPF for Car vs. Traditional Vinyl Wrap | B1; None | All source comparison rows in a semantic table; first column label, remaining source columns unchanged | Labeled overflow region, conditional scroll hint and keyboard access | M0; preserve unsupported claims for review, never add superiority scores |

| P07 Frequently Asked Questions | B0; None | H2 left 30%, all product-specific questions right 70%, max overall 1100px | Heading then full-width accordion; all answers retained | MF; these are this product’s questions, not the homepage FAQ copied eight times |

| P08 Ready to Change Your Color and Protect Your Paint? | B3; None | Original closing paragraph followed by three compact action groups with their source explanations | Action groups stack; quote button full-width only within its group | M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking |

| P09 Related navigation | B0; None | Two simple text links: `/gloss-black-paint-protection-film-190-microns/` and `/matte-paint-protection-film/`, plus All products; no repeated poster grid | Vertical links with 44px tap targets | M0; new route top, Back restores previous scroll |

**Source subheading coverage:** `2–5 yrs`; `$400–$900`; `0%`; `Vehicle Owners`; `Custom Build Shops`; `Vehicle Wrap Studios`; `Fleet Managers`; `Schedule Your Free Consultation`; `View Before-and-After Gallery`; `Get Your Custom Quote`. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.

**Additional source artwork disposition:** the repeated source solution illustration is not promoted to a new product proof image. Preserve substantive HTML content in P03. Any source artwork carrying unique text must have that text mapped into P03/P04 before its duplicate/decorative placement is omitted; record this in the image assignment log.

### About: `/about-us/`

**Content source:** `content/about-us.json`

**Composition:** Short title > profile split > mission text > supply catalogue > material names > quality editorial split > benefits > audiences > contact. No separate photographic hero.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| AB01 Title | B0; None | Breadcrumb and About Us H1, compact opening | Same | M0 |

| AB02 We Are a Team Passionate About Car Protection | B0; A19 product-box stack, square contain in BI | 58% source intro / 42% media; all four source statistics directly below copy, modest 24px numbers | Copy, source figures 2 x 2, then square illustration max-width 360px | M1; boxes are product illustration, not a team portrait |

| AB03 Reliability, Aesthetics, and a Professional Approach | B1; None | Source mission in 800px reading column; preserve both additional source facts as inline callouts | One column, no oversized counters | M0; no invented timeline/history |

| AB04 What We Supply | B0; None | Six source offerings as three rows of two editorial blocks, thin row dividers; actual product links on film categories | Six stacked blocks; no repeated icons needed | M0/M2 links; preserve PPF, window film, color, OEM, selection help and shipping copy |

| AB05 Built on World-Class Materials | B1; None | Source intro and source material supplier names in a simple two-column text layout | Names and source descriptions stack | M0; no flags substituted for supplier logos; no invented certification seals; claims stay in decision log |

| AB06 How We Consistently Control Quality | B0; G054 equipment photo, 3:2 contain, no crop | Photo 42% / four numbered source quality explanations 58%; 01-04 rail rather than four identical image cards | Four explanations then photo; preserve all four headings | M1; caption “Equipment shown in supplied gallery”; do not identify equipment function or ownership beyond evidence |

| AB07 With Us You Get | B1; None | Six source benefits in 3 x 2 text grid; 24px headings and short source descriptions | One column, subtle separators | M0; no decorative stock images |

| AB08 Who We Work With | B0; None | Five source audience groups as an editorial list: label 30%, description 70%; source intro above | Label above each description, 24px row gap | M0; avoids repeating homepage card wall |

| AB09 Start a Conversation | B3; None | Original closing text and source contact actions; quote + Contact primary/secondary | Actions stack; long contact details wrap | M2; source conflicting email remains logged, no silently invented contact authority |

### Gallery: `/gallery/`

**Content source:** `content/gallery.json`; exact 136-item register below

**Composition:** Plain title > ordered image grid > Load more/count > shared footer. No decorative hero, invented categories or factory-only selection.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| G01 Title | B0; None | Breadcrumb, Gallery H1 and short functional introduction “Product imagery and production photos” | Same, 20px gap to first images | M0; no claim all images are customer installations |

| G02 Ordered grid | B0; BI tiles; G001-G136 in register order | 4 columns >=1200px, 3 at 1024px, 2 tablet; 16px gaps; 4:3 reserved frames; posters contain, photos contain for this preservation pass | 2 columns 390px, 1 at 320px; no crop of text, rolls or machinery | M2; render first 24, lazy thumbnails; full-size only when opened; never shuffle or silently remove source items |

| G03 Progressive loading | B0; None | Centered Load more button and “Showing 24 of 136” initially; add 24 per action, final batch 16 | 44px minimum button, count above it | M0; preserve batches and scroll when viewer closes; announce count without moving focus unexpectedly |

| G04 Viewer | Black 92% backdrop; active fullImage from register | MV controls and image-size limits from shared overlay section | Same behavior; swiping optional, buttons always present | MV; each thumbnail opens corresponding fullImage, not its low-res crop; all 136 reachable |

| G05 Failed-image state | BI frame; no replacement car photo | Image unavailable text and Retry inside reserved tile/viewer area | Same; Close/Next remain reachable | M0; do not collapse tile or automatically retry forever |

**Gallery orientation:** G105-G120 and G129-G136 visibly include sideways supplied images in the inspected contact sheets. Inspect the full-resolution image and create an orientation-corrected derivative only where required, keeping the original unchanged and recording the rotation. This plan does not guess a universal rotation angle. Do not crop or stretch to conceal orientation. The register preserves all 136 source entries; source promotional claims remain unverified, and category labels must not invent customer provenance.

### Warranty: `/warranty/`

**Content source:** `content/warranty.json`, not the editorial wrapper in warranty-policy-review.html

**Composition:** Compact H1 > anchor contents > coverage/exclusions > duration > conditions > voiding > existing claim instructions > limitations > FAQs > contact. Reading-first, no car backdrop.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| W01 Title and source overview | BT; None | 800px copy column; full source introductory text, compact H1 | Same inside gutters | M0; conflicts in developer log, not review banners |

| W02 Contents | BT; None | Wrapping anchor links to all nine body sections | Native expandable On this page list | M0; scroll-margin-top 112px desktop/88px mobile |

| W03 What Is Covered | B1; None | Two columns: Covered manufacturing defects / Not covered exclusions; retain every bullet | Covered then exclusions; text labels plus icons, not red/green alone | M0 |

| W04 Warranty Duration by Product | BT; None | Semantic table with all source rows and qualifiers; no invented warranty badges | Labeled table scroll region with conditional hint | M0; preserve conflicting source facts for owner resolution |

| W05 Warranty Conditions | BT; None | Six numbered text items, two columns: installation, maintenance, product, use, proof, reporting | One ordered list | M0 |

| W06 What Voids the Warranty | B1; None | 800px reading list, source exclusions complete | Same, no warning illustration | M0 |

| W07 How to Make a Warranty Claim | BT; None | Five-step vertical ordered list, plus source message checklist in B2 | Same linear sequence, no horizontal timeline | M0; instructions only; no registration/claim upload UI |

| W08 Limitations of Liability | BT; None | Four source subsections as H3 and paragraphs, max 800px | Same reading flow | M0; do not generate legal revisions |

| W09 Frequently Asked Questions | BT; None | 800px accordion with all source questions and answers | Full gutter width | MF |

| W10 Submit a Claim or Ask a Question | B3; None | Source contact links; original claim/contact reference resolves to Contact | Stacked 44px actions | M2; no claim of a new claim-processing system |

### Contact: `/contact-us/`

**Content source:** `content/contact-us.json`; existing five-field contract

**Composition:** Plain title > contact details beside form > source supporting contact copy. No stock image, decorative map or hero.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| C01 Title | B0; None | Breadcrumb and Contact Us H1; short existing source invitation | Same, no big gap | M0 |

| C02 Contact details | B0; None | Left 38%: phone numbers, email, source support copy and address as labeled groups; map link below address | Details before form; phone/email inline actions, map link opens external map | M0/M2; shared verified destinations, no invented hours or interactive embedded map |

| C03 Inquiry form | B2 on B0; None | Right 62%: Send us an email title; paired name/company and email/WhatsApp; full-width optional description, preview notice and submit | One column, labels above fields, full-width action; avoid forced form height | M0; trim required fields, appropriate email/tel, international-friendly validation; errors associated and focused; values preserved; nothing sent |

| C04 Existing supporting copy | B1; None | Preserve the source supporting paragraph under a small heading; source label “Frequently Asked Questions” does not justify fabricated questions | Single paragraph; no empty FAQ accordion | M0; if label is editorially corrected, log that copy-only change |

### Blog index: `/blog/`

**Content source:** `content/blog.json`

**Composition:** Compact route-specific title > one real article row > search/recent-post utility. No invented articles, avatar or hero.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| B01 Title | B0; None | Breadcrumb and H1 “Blog”; category/author context as source supplies it | Same | M0; do not label all archives simply Blog |

| B02 Article listing | B0; A20 square contain, BI | Article row: 300px image left, title/source date/category/author/excerpt right; one real article only | Square image max-height 320px then metadata/title/excerpt; no blank grid slots | M2 link to article; use actual source metadata; no inferred date/year |

| B03 Search and Recent Posts | B1; None | Search field and source recent-post link in two columns; no duplicate large article card | Search then recent link, 24px gap | M0; search submits to /?s= and preserves query |

### PPF category: `/blog/category/ppf/`

**Content source:** `content/blog__category__ppf.json`

**Composition:** Compact route-specific title > one real article row > search/recent-post utility. No invented articles, avatar or hero.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| B01 Title | B0; None | Breadcrumb and H1 “PPF”; category/author context as source supplies it | Same | M0; do not label all archives simply Blog |

| B02 Article listing | B0; A20 square contain, BI | Article row: 300px image left, title/source date/category/author/excerpt right; one real article only | Square image max-height 320px then metadata/title/excerpt; no blank grid slots | M2 link to article; use actual source metadata; no inferred date/year |

| B03 Search and Recent Posts | B1; None | Search field and source recent-post link in two columns; no duplicate large article card | Search then recent link, 24px gap | M0; search submits to /?s= and preserves query |

### Author archive: `/author/autoboost018/`

**Content source:** `content/author__autoboost018.json`

**Composition:** Compact route-specific title > one real article row > search/recent-post utility. No invented articles, avatar or hero.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| B01 Title | B0; None | Breadcrumb and H1 “Posts by autoboost018”; category/author context as source supplies it | Same | M0; do not label all archives simply Blog |

| B02 Article listing | B0; A20 square contain, BI | Article row: 300px image left, title/source date/category/author/excerpt right; one real article only | Square image max-height 320px then metadata/title/excerpt; no blank grid slots | M2 link to article; use actual source metadata; no inferred date/year |

| B03 Search and Recent Posts | B1; None | Search field and source recent-post link in two columns; no duplicate large article card | Search then recent link, 24px gap | M0; search submits to /?s= and preserves query |

### Full article: `/blog/how-long-does-paint-protection-film-last/`

**Content source:** `content/blog__how-long-does-paint-protection-film-last.json`

**Composition:** Plain title/metadata > source introduction > one lead illustration > contents > each of the following source body sections > recent-post/search utility. Every heading is explicitly listed below.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| E01 Article title and metadata | BT; None | 800px reading column; original H1, actual date/category/author links and introductory paragraphs | Same; 30px H1, metadata wraps | M0; title/body mismatch logged, not silently rewritten |

| E02 Lead illustration | BT; A21 square contain, BI | Max-width 640px centered in reading column; source illustration and actual caption if present | Natural square ratio, full width; no crop | M0; no other invented installation photos |

| E03 Contents | BT; None | Anchor list of actual body headings below image | Native expandable On this page | M0; anchors offset sticky header |

| E04 Essential Tools and Materials for a Professional Finish | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E05 Selecting the Right Paint Protection Film | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E06 Preparing the Vehicle Surface for Optimal Adhesion | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E07 Deep Cleaning and Decontamination Techniques | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E08 Removing Wax and Sealant Residues | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E09 Creating the Ideal Environment for Installation | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E10 Understanding How to Apply Paint Protection Film | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E11 Mixing the Slip Solution and Tack Solution | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E12 Measuring and Cutting the Film to Size | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E13 Positioning the Film on the Vehicle Panel | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E14 Mastering the Squeegee Technique | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E15 Removing Air Bubbles and Excess Solution | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E16 Managing Edges and Complex Curves | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E17 Applying Heat for Proper Adhesion | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E18 Troubleshooting Common Installation Challenges | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E19 Addressing Creases and Stretch Marks | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E20 Fixing Dust or Debris Under the Film | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E21 Handling Over-stretched Material | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E22 Post-Installation Curing and Inspection | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E23 Allowing the Film to Set Properly | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E24 Final Inspection for Imperfections | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E25 Trimming Excess Material Safely | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E26 Best Practices for Long-Term Maintenance | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E27 Cleaning and Washing Guidelines | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E28 Avoiding Harsh Chemicals and Abrasives | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E29 Monitoring Film Integrity Over Time | BT; None | Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E30 Conclusion | BT; None | Complete source conclusion in normal paragraphs; no new sales claims or promotional banner | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

| E31 FAQ | BT; None | All source questions/answers in native details, 44px triggers; preserve full answers | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | MF |

| E32 Recent Posts | BT; None | Single existing recent-post text link and search utility after article; do not duplicate the full card | Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal | M0 |

### Shipping Policy: `/shipping-policy/`

**Content source:** Existing `pages/policy-content/shipping-policy.html` draft plus original `content/shipping-policy.json` evidence; client approval still required

**Composition:** Plain title > confirmed metadata > contents > all enumerated draft clauses. No hero/photo, animated text, repeated CTA band or decorative legal icon.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| L01 Title and confirmed metadata | BT; None | 800px reading column; single H1; actual approved effective date only, never manufacture one | Same | M0 |

| L02 Contents | BT; None | Plain anchor list matching headings below | Expandable On this page | M0 |

| L03 1. Order processing | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L04 2. Shipping methods and carriers | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L05 3. Shipping costs | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L06 4. Estimated delivery times | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L07 5. Customs, duties, and import taxes (international orders) | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L08 6. Order tracking | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L09 7. Damaged or lost shipments | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L10 8. Contact | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

**Draft handling:** existing draft structure is used for layout planning, not legal approval. Do not render the authoring preamble, “what this document is,” compliance claims, source-review boxes or instructions such as “set when published” as policy body. Keep unresolved inputs in the developer decision log and block production sign-off until resolved. Preserve original source evidence and all substantive draft clauses; do not invent missing legal facts.

### Privacy Policy: `/privacy-policy/`

**Content source:** Existing `pages/policy-content/privacy-policy.html` draft plus original `content/privacy-policy.json` evidence; client approval still required

**Composition:** Plain title > confirmed metadata > contents > all enumerated draft clauses. No hero/photo, animated text, repeated CTA band or decorative legal icon.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| L01 Title and confirmed metadata | BT; None | 800px reading column; single H1; actual approved effective date only, never manufacture one | Same | M0 |

| L02 Contents | BT; None | Plain anchor list matching headings below | Expandable On this page | M0 |

| L03 1. Who this policy covers | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L04 2. What information we collect | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L05 3. Why we use your information | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L06 4. Legal basis for processing (EU/UK visitors) | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L07 5. How we share information | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L08 6. International data transfers | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L09 7. Your rights | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L10 If GDPR applies to you (EEA/UK) | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L11 If PIPL applies to you (China) | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L12 If you are located in the UAE, Saudi Arabia, or another Gulf country with its own data protection law | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L13 8. Data retention | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L14 9. Data Protection Officer | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L15 10. Security | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L16 11. Contact us | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L17 12. Changes to this policy | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

**Draft handling:** existing draft structure is used for layout planning, not legal approval. Do not render the authoring preamble, “what this document is,” compliance claims, source-review boxes or instructions such as “set when published” as policy body. Keep unresolved inputs in the developer decision log and block production sign-off until resolved. Preserve original source evidence and all substantive draft clauses; do not invent missing legal facts.

### Refund Policy: `/refund-policy/`

**Content source:** Existing `pages/policy-content/refund-policy.html` draft plus original `content/refund-policy.json` evidence; client approval still required

**Composition:** Plain title > confirmed metadata > contents > all enumerated draft clauses. No hero/photo, animated text, repeated CTA band or decorative legal icon.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| L01 Title and confirmed metadata | BT; None | 800px reading column; single H1; actual approved effective date only, never manufacture one | Same | M0 |

| L02 Contents | BT; None | Plain anchor list matching headings below | Expandable On this page | M0 |

| L03 0. This is a business-to-business policy | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L04 1. Order cancellation | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L05 2. Wrong or incorrect item received | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L06 3. Damaged in transit | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L07 4. Product defects after installation | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L08 5. What isn't eligible for a refund | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L09 6. How refunds are issued | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L10 7. International orders | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L11 8. Disputes | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

| L12 9. Contact | BT; None | Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration | Same order/wording; tables get contained horizontal scrolling and conditional hint | M0; contact links use shared config |

**Draft handling:** existing draft structure is used for layout planning, not legal approval. Do not render the authoring preamble, “what this document is,” compliance claims, source-review boxes or instructions such as “set when published” as policy body. Keep unresolved inputs in the developer decision log and block production sign-off until resolved. Preserve original source evidence and all substantive draft clauses; do not invent missing legal facts.

### Terms & Conditions: `/terms-and-conditions/`

**Content source:** `content/terms-and-conditions.json`; no approved substantive terms available

**Composition:** Plain title > honest unavailable-content state > Contact link. Finished visual layout can be specified; missing legal terms cannot be fabricated.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| T01 Title | BT; None | 800px reading column, single H1 and breadcrumb | Same | M0 |

| T02 Content unavailable | BT; None | Short functional notice “Terms are not available in this preview.” No WordPress placeholder or developer file references | Same, natural height | M0; remains a documented content blocker |

| T03 Contact action | BT; None | Simple Contact link, no promotional strip | 44px target | M2; replace T02 with approved clauses and contents only when supplied |

### Search including empty and no-result states: `/?s=`

**Content source:** Compact local index derived from all retained content; no network service

**Composition:** Title > editable query form > count > text results OR empty/no-result state. No image cards.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| S01 Title and query | B0; None | 900px column, Search H1, visible labeled search field and button; query reflected in input and heading | Field and button wrap without squeezing; query breaks safely | M0; trim input; Enter submits; URL preserves query/Back/Forward |

| S02 Results | B0; None | Count then one-column rows: title link, content type and real excerpt; 24px vertical spacing and thin rules | Same, no thumbnails | M2 links; include products, article, main and available policy text; no fake relevance scores |

| S03 Empty query | B0; None | Short prompt “Enter a word or product name to search.” plus Products link | Same | M0; no loading spinner for an empty query |

| S04 No results | B0; None | Echo query, offer revised query and Products/Contact links | Links stack as needed | M0; never replace with unrelated popular products |

### Cart fallback: `/cart/`

**Content source:** Static sales-contact fallback required by the plan

**Composition:** Plain compact title > explanation > recovery links. No hero or fake transaction UI.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| F01 Title | B0; None | 720px column, Cart H1, 48px top padding; no viewport min-height | 24px top padding | M0 |

| F02 Explanation | B2 on B0; None | Online ordering is not available. Contact us about products and pricing. | Same; natural panel height | M0 |

| F03 Recovery actions | B0; None | Products and Contact links below panel, inline | Stacked 44px targets | M2; no cart counts, payment, login/password or account creation fields |

### Checkout fallback: `/checkout/`

**Content source:** Static sales-contact fallback required by the plan

**Composition:** Plain compact title > explanation > recovery links. No hero or fake transaction UI.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| F01 Title | B0; None | 720px column, Checkout H1, 48px top padding; no viewport min-height | 24px top padding | M0 |

| F02 Explanation | B2 on B0; None | Online checkout is not available. Contact us to discuss an order. | Same; natural panel height | M0 |

| F03 Recovery actions | B0; None | Products and Contact links below panel, inline | Stacked 44px targets | M2; no cart counts, payment, login/password or account creation fields |

### My Account fallback: `/my-account/`

**Content source:** Static sales-contact fallback required by the plan

**Composition:** Plain compact title > explanation > recovery links. No hero or fake transaction UI.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| F01 Title | B0; None | 720px column, My Account H1, 48px top padding; no viewport min-height | 24px top padding | M0 |

| F02 Explanation | B2 on B0; None | Online account access is not available. Contact us for assistance. | Same; natural panel height | M0 |

| F03 Recovery actions | B0; None | Products and Contact links below panel, inline | Stacked 44px targets | M2; no cart counts, payment, login/password or account creation fields |

### Unknown route / 404: `/*`

**Content source:** Router fallback

**Composition:** Compact recovery page, no cinematic error illustration.

| ID / section and content | Background and exact image | Desktop composition | Mobile composition | Interaction / motion |
| --- | --- | --- | --- | --- |

| N01 Missing page | B0; None | 720px reading column; small 404 marker, Page not found H1, concise explanation | Same, 24px top padding | M0; no animated digits |

| N02 Recovery actions | B0; None | Home, Products and Contact links, inline | Stack as needed, 44px targets | M2; working destinations; host must provide appropriate missing-page HTTP behavior |

### Exact image register and crop instructions

All A assets below were visually inspected in the planning pass (49 including the supplied logo). All 136 G entries were viewed in contact sheets; this establishes visible subject and broad suitability, not ownership, product performance, legibility at final size or production approval. Selected placements are specified by section ID above. Dimensions are intrinsic; never stretch to fill. Exact URLs resolve under `react-app/public`.

Default for A02 only: 4:3 cover, focal 50% 50% at desktop/mobile. A01 uses the homepage focal settings above. All other assigned A images use contain at 50% 50%, natural ratio unless the section specifies a reserved frame; original light backgrounds are retained. No image filter may change film color/finish. Offscreen images lazy-load and have dimensions/aspect-ratio reserved; the single visible opening image is eager. A49 logo has empty alt inside an already named Home link, otherwise alt “Platinum PPF.”

| ID | Exact URL | Dimensions | Visible subject / alt starting point | Assignment status |
| --- | --- | --- | --- | --- |

| A01 | `/assets/original/782a526bace2-31-optimized.jpg` | 800 x 1200 | Black sports car rear quarter | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A02 | `/assets/original/d7fa741fa075-111_7_11zon-scaled.webp` | 2560 x 1920 | Worker beside film production roll | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A03 | `/assets/original/c14ff1f0672c-tpu-color-ppf-stand-out-with-color-banner-1.jpg` | 1920 x 649 | TPU color PPF promotional banner | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A04 | `/assets/original/9cc41d34386f-become-a-ppf-dealer-platinum-ppf-banner.jpg` | 1920 x 649 | Dealer recruitment promotional banner | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A05 | `/assets/original/1e247b35c931-paint-protection-film-layer-structure-diagram.jpg` | 1920 x 649 | Film-layer construction diagram | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A06 | `/assets/original/aeb3d1dd87f5-platinum-window-tint-film-percentage-options-banner.jpg` | 1920 x 649 | Window tint percentage example banner | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A07 | `/assets/original/33f53a1abb53-1-1.webp` | 1080 x 1080 | Uzbekistan flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A08 | `/assets/original/c78d479fbabf-2-1.webp` | 1080 x 1080 | Russia flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A09 | `/assets/original/5ecf17b12271-4-1.webp` | 1080 x 1080 | Iraq flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A10 | `/assets/original/fa581cbc4eb9-5-2.webp` | 1080 x 1080 | Kuwait flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A11 | `/assets/original/ba8a8fc07f96-6-2.webp` | 1080 x 1080 | Turkey flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A12 | `/assets/original/167bc57b8379-7-1.webp` | 1080 x 1080 | India flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A13 | `/assets/original/216418ec8398-3-1.webp` | 1080 x 1080 | Pakistan flag artwork | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A14 | `/assets/original/efc650e898ee-11_edited-scaled.webp` | 2048 x 2560 | 190 micron PPF poster with car and rolls | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A15 | `/assets/original/5b04fe108a9c-TPU-Acid-Green-scaled.webp` | 2560 x 1440 | Acid Green car color illustration | Use G032 on color page only, not clear-190 finish proof |

| A16 | `/assets/original/edad0000edb2-TPUAutumn-Blue-scaled.webp` | 2560 x 1440 | Autumn Blue car illustration | Do not reuse as a background on every product page |

| A17 | `/assets/original/5a41b9f14f0b-Platinum-210-Paint-Protection-Film-Professional-Grade-Defense-for-Your-Vehicle.png` | 1116 x 1396 | 210 PPF poster with car and rolls | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A18 | `/assets/original/39e055f61004-69.webp` | 1080 x 1080 | Car, film rolls and close-up composite | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A19 | `/assets/original/b92a52a790ac-31.webp` | 1080 x 1080 | Stack of Platinum product boxes | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A20 | `/assets/original/0569f11089cb-42-1024x1024.webp` | 1024 x 1024 | Black car and film roll illustration, resized | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A21 | `/assets/original/f3ca7fa17f0e-42.webp` | 1080 x 1080 | Black car and film roll illustration, full-size | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A22 | `/assets/original/a8d992e24869-Gemini_Generated_Image_lwl09dlwl09dlwl0.jpg` | 1406 x 1667 | Color PPF promotional poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A23 | `/assets/original/ea2e0d5fbd73-sl3.jpeg` | 980 x 687 | Film being applied to a silver car | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A24 | `/assets/original/dd6b75fad4b9-Why-Platinum-Paint-Protection-Film-Is-the-Right-Solution.png` | 1080 x 1080 | Dark car promotional square with wording | Not selected: text-led matte solution avoids generic glossy illustration |

| A25 | `/assets/original/7a6d90535f68-190-black-scaled.webp` | 2048 x 2560 | Gloss black 190 micron PPF poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A26 | `/assets/original/89b2e8aa582b-836a5b_f757a4e2a9e24341a11f9417b05e1c8bmv2-scaled.webp` | 2048 x 2560 | Headlight PPF poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A27 | `/assets/original/9a9e2b330e85-836a5b_9ebd7f615db94eb8adc97b3f73f9c011mv2.png` | 1080 x 1080 | Dark SUV and film roll composite | Not selected: no direct headlight-specific proof |

| A28 | `/assets/original/d7d0060fb5ef-6.webp` | 1116 x 1396 | Matte PPF poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A29 | `/assets/original/d587895c2900-190-micron-ppf-paint-protection-film.webp` | 2048 x 2560 | 190 micron directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A30 | `/assets/original/5b831e90a533-headlight-paint-protection-film.webp` | 2048 x 2560 | Headlight directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A31 | `/assets/original/40149531f960-matte-paint-protection-film.webp` | 1116 x 1396 | Matte directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A32 | `/assets/original/1dc39d34b18c-satin-paint-protection-film.webp` | 2048 x 2560 | Satin directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A33 | `/assets/original/360c6bea67a7-gloss-black-paint-protection-film-190-microns.webp` | 2048 x 2560 | Gloss black directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A34 | `/assets/original/7eab7d44fcd0-window-tint-film-for-cars-377x447.jpeg` | 377 x 447 | Small cropped general film-maker artwork | Rejected as tint lead: low-resolution general film-maker crop |

| A35 | `/assets/original/7b8b1b17731a-color-ppf-for-car.jpg` | 1406 x 1667 | Color directory poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A36 | `/assets/original/ed8580439fe9-5-scaled.webp` | 2048 x 2560 | Satin PPF poster | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A37 | `/assets/original/ee2a44f3abf2-TPU-Crimson-scaled.webp` | 2560 x 1440 | Crimson car color illustration | Use G033 on color page only, not satin-finish proof |

| A38 | `/assets/original/ae61f880662f-30.jpg` | 800 x 1200 | White sports car photograph | Not selected: no decorative gallery/policy hero |

| A39 | `/assets/original/e89154d6e130-33.jpg` | 800 x 1200 | Blue sports car photograph | Not selected: no decorative Terms hero |

| A40 | `/assets/original/28808e794687-53.webp` | 1080 x 1080 | Dark car and circular detail composite | Not selected: Warranty is text-led |

| A41 | `/assets/original/4f513bd6eb5f-Gemini_Generated_Image_qptr70qptr70qptr-1.png` | 1432 x 1694 | Window tint ceramic poster including 5% VLT wording | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A42 | `/assets/original/1243fec22243-sl2.jpg` | 1280 x 1169 | Protective film applied to a pale car bonnet | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A43 | `/assets/original/eea44f2b1a11-sli1.webp` | 1200 x 900 | Film and water on a dark car front panel | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A44 | `/assets/original/fc3312d84e02-sl4-scaled.jpg` | 1707 x 2560 | White car side and wheel | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A45 | `/assets/original/8b6a5f6f7c9a-sl5.jpg` | 1920 x 2557 | Car headlamp detail in warm light | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A46 | `/assets/original/material-clarity-car.jpg` | 1200 x 1543 | Orange sports car in trees | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A47 | `/assets/original/b2d6a19e5c4f-sl6-scaled.jpg` | 2560 x 1707 | Close-up of a dark car headlamp | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A48 | `/assets/original/a7c1e3f9d2b8-sl7.jpg` | 1920 x 1277 | Dark green sports car in a light garage | Selected where explicitly named in the route schedule; otherwise do not repeat |

| A49 | `/assets/original/64f0dbbda455-logo.png` | 1024 x 153 | Supplied orange Platinum PPF logo | Selected where explicitly named in the route schedule; otherwise do not repeat |

### Exact gallery order and thumbnail/full-image pairing

Each filename below is relative to **`/assets/original/`**. This table is the definitive ordered assignment for G02 and G04; do not glob or sort filenames. All 136 pairs exist locally. Preserve each pair even when the thumbnail crop differs from the full artwork. For text-heavy posters use an uncropped thumbnail derivative if the archived thumbnail loses essential content; derive it from the assigned full image, retain the mapping and reserve the same frame. The JSON companion `docs/design/GALLERY-ASSIGNMENTS.json` carries full URLs and dimensions for implementation.

G001-G031: supplied product/promotional composites. G032-G039: supplied color-example illustrations. G040-G068: supplied production/equipment photographs. G069-G104: supplied promotional artwork. G105-G136: supplied production photographs, including orientation issues noted above. These are descriptive groups for implementation and alt-writing; do not introduce UI category claims or customer-installation labels.

| ID / order | Full image filename | Thumbnail filename |
| --- | --- | --- |

| G001 | `efc650e898ee-11_edited-scaled.webp` | `f4ef9c384198-11_edited-scaled-354x236.webp` |

| G002 | `6d2527966110-12.webp` | `c36751dafaea-12-354x236.webp` |

| G003 | `2483ea0ce1c0-13.webp` | `e65e9be492a4-13-354x236.webp` |

| G004 | `3ab2ae9b6a37-14.webp` | `389ad9baf381-14-354x236.webp` |

| G005 | `130547acb727-15.webp` | `a5dc63edb405-15-354x236.webp` |

| G006 | `37a8e12e2eec-16.webp` | `1d8a972e9272-16-354x236.webp` |

| G007 | `6a5b12b4f966-17.webp` | `cdad6a48638d-17-354x236.webp` |

| G008 | `224970ef9b7e-18.webp` | `2f9446ff43a3-18-354x236.webp` |

| G009 | `6993b7e1f1ed-21.webp` | `4d6784c4edde-21-354x236.webp` |

| G010 | `7987c432f9de-23.webp` | `a52408e33606-23-354x236.webp` |

| G011 | `cf9ff635147a-24.webp` | `35718c4e4ded-24-354x236.webp` |

| G012 | `ec175d954437-25.webp` | `af0a4c9810cd-25-354x236.webp` |

| G013 | `1ddcb03c13dd-26.webp` | `cda9369b0222-26-354x236.webp` |

| G014 | `a8d1e077b9ac-27.webp` | `8e9ca4745b03-27-354x236.webp` |

| G015 | `b92a52a790ac-31.webp` | `90e19fe14184-31-354x236.webp` |

| G016 | `7bf8aa89cd9e-35.webp` | `79c0e0b7bd90-35-354x236.webp` |

| G017 | `c0bc820d1058-36.webp` | `798b65d80373-36-354x236.webp` |

| G018 | `ead3b1540b35-38.webp` | `ad81fcb70654-38-354x236.webp` |

| G019 | `48fcd869f02f-39.webp` | `637104bcbb5f-39-354x236.webp` |

| G020 | `0b3791043f92-40.webp` | `f56c7fb1f7ed-40-354x236.webp` |

| G021 | `d5681ed20c8b-41.webp` | `36561ed9c3e3-41-354x236.webp` |

| G022 | `f3ca7fa17f0e-42.webp` | `482e9037a574-42-354x236.webp` |

| G023 | `7d79bc1c2590-53.webp` | `1b94a6c65a93-53-354x236.webp` |

| G024 | `ce09c2390114-61.webp` | `c8325c72c2b6-61-354x236.webp` |

| G025 | `4684ee0c1b38-62.webp` | `cc7db121e10b-62-354x236.webp` |

| G026 | `f946f78878a0-63.webp` | `686d8001f678-63-354x236.webp` |

| G027 | `ce87903fd772-64.webp` | `fce7657f546f-64-354x236.webp` |

| G028 | `90e0d4d1c29d-65.webp` | `0eef84868350-65-354x236.webp` |

| G029 | `4980a9b6e303-66.webp` | `5ce4ea7a87b9-66-354x236.webp` |

| G030 | `e2d1daf65535-67.webp` | `eea12951419b-67-354x236.webp` |

| G031 | `39e055f61004-69.webp` | `969b1be092b6-69-354x236.webp` |

| G032 | `5b04fe108a9c-TPU-Acid-Green-scaled.webp` | `47cb6db1e198-TPU-Acid-Green-scaled-354x236.webp` |

| G033 | `ee2a44f3abf2-TPU-Crimson-scaled.webp` | `46419e19dc05-TPU-Crimson-scaled-354x236.webp` |

| G034 | `1174f5e6f69b-TPU-Matte-Metallic-STO-Track-Glod-Green-scaled.webp` | `4182d58093a6-TPU-Matte-Metallic-STO-Track-Glod-Green-scaled-354x236.webp` |

| G035 | `53db03507fd6-TPU-Star-Violet-TPU2025-scaled.webp` | `f4478d4a92e2-TPU-Star-Violet-TPU2025-scaled-354x236.webp` |

| G036 | `b631c1ea6443-TPU1008-TPUMilan-Glod-scaled.webp` | `c6db8d094571-TPU1008-TPUMilan-Glod-scaled-354x236.webp` |

| G037 | `d43e6ef732f5-TPU5047-TPU-Matte-Magic-Flame-Dark-Blue-scaled.webp` | `fc8e0b8c3afa-TPU5047-TPU-Matte-Magic-Flame-Dark-Blue-scaled-354x236.webp` |

| G038 | `5f947cdb1498-TPUAutumn-Blue-scaled.webp` | `737a75c7c0e0-TPUAutumn-Blue-scaled-354x236.webp` |

| G039 | `07f1a7b58c5c-TPUCuban-Sand-scaled.webp` | `5a1289e5ee66-TPUCuban-Sand-scaled-354x236.webp` |

| G040 | `38fef78bab9c-DSC06333_1_6_11zon-scaled.webp` | `3053d18f0694-DSC06333_1_6_11zon-scaled-354x236.webp` |

| G041 | `a78864acca71-DSC06327_1_4_11zon-scaled.webp` | `e68a35799c4d-DSC06327_1_4_11zon-scaled-354x236.webp` |

| G042 | `e7d2ad0258e5-DSC06325_1_3_11zon-scaled.webp` | `ce230cd352b1-DSC06325_1_3_11zon-scaled-354x236.webp` |

| G043 | `9a11a04a5f4b-DSC06319_1_2_11zon-scaled.webp` | `78947edf87ad-DSC06319_1_2_11zon-scaled-354x236.webp` |

| G044 | `3e45e6d5c2d4-DSC06316_1_1_11zon-scaled.webp` | `6cdd7dff02c5-DSC06316_1_1_11zon-scaled-354x236.webp` |

| G045 | `2dccd2d38132-DSC06315_1_7_11zon-scaled.webp` | `468581d070a4-DSC06315_1_7_11zon-scaled-354x236.webp` |

| G046 | `8c85cbd96994-DSC06314_1_5_11zon-scaled.webp` | `d804ca8ebaa4-DSC06314_1_5_11zon-scaled-354x236.webp` |

| G047 | `830caaf69605-DSC06312_1_3_11zon-scaled.webp` | `1a25bc1c8ee7-DSC06312_1_3_11zon-scaled-354x236.webp` |

| G048 | `cf3ef0f9a630-DSC06310_1_2_11zon-scaled.webp` | `8dba01307338-DSC06310_1_2_11zon-scaled-354x236.webp` |

| G049 | `4fa3aa9e20a8-DSC06308_1_1_11zon-scaled.webp` | `4e8726cd4717-DSC06308_1_1_11zon-scaled-354x236.webp` |

| G050 | `2cdbe3d7b511-DSC06306_1_10_11zon-scaled.webp` | `ec5f16d68fbc-DSC06306_1_10_11zon-scaled-354x236.webp` |

| G051 | `ac43824b8729-DSC06303_1_7_11zon-scaled.webp` | `97607c9f56fd-DSC06303_1_7_11zon-scaled-354x236.webp` |

| G052 | `5f692d713786-DSC06302_1_6_11zon-scaled.webp` | `05d3a8913667-DSC06302_1_6_11zon-scaled-354x236.webp` |

| G053 | `c94a6397298c-DSC06301_1_7_11zon-scaled.webp` | `788fb853db21-DSC06301_1_7_11zon-scaled-354x236.webp` |

| G054 | `fb69ba3e9a98-DSC06299_1_6_11zon-scaled.webp` | `7e5972d43b47-DSC06299_1_6_11zon-scaled-354x236.webp` |

| G055 | `3c71cdc62ea1-DSC06298_1_5_11zon-scaled.webp` | `dc9a470a8155-DSC06298_1_5_11zon-scaled-354x236.webp` |

| G056 | `17df03046f85-DSC06296_1_3_11zon-scaled.webp` | `917994d65cf4-DSC06296_1_3_11zon-scaled-354x236.webp` |

| G057 | `7590131843f5-DSC06295_1_2_11zon-scaled.webp` | `8b047cf9c9df-DSC06295_1_2_11zon-scaled-354x236.webp` |

| G058 | `f960cdecd958-DSC06294_1_1_11zon-scaled.webp` | `68cf34773347-DSC06294_1_1_11zon-scaled-354x236.webp` |

| G059 | `bb49e16a7f9b-DSC06289_9_11zon-scaled.webp` | `624ac68cbe88-DSC06289_9_11zon-scaled-354x236.webp` |

| G060 | `eadaf3e85f23-DSC06288_8_11zon-scaled.webp` | `0462ac8c769d-DSC06288_8_11zon-scaled-354x236.webp` |

| G061 | `ad368424513e-DSC06285_6_11zon-scaled.webp` | `56b1d158f843-DSC06285_6_11zon-scaled-354x236.webp` |

| G062 | `9cfc5f6c8601-DSC06282_5_11zon-scaled.webp` | `57137bbfb3a3-DSC06282_5_11zon-scaled-354x236.webp` |

| G063 | `d996479d2db8-DSC06276_4_11zon-scaled.webp` | `a76743eb334f-DSC06276_4_11zon-scaled-354x236.webp` |

| G064 | `c4d8773a170b-DSC06266_3_11zon-scaled.webp` | `c089c4ccbb14-DSC06266_3_11zon-scaled-354x236.webp` |

| G065 | `4f708bead98c-DSC06259_2_11zon-scaled.webp` | `d883ac3fca49-DSC06259_2_11zon-scaled-354x236.webp` |

| G066 | `ed9f372a626e-DSC06252_9_11zon-scaled.webp` | `66f5ca4c0d62-DSC06252_9_11zon-scaled-354x236.webp` |

| G067 | `4a94ebd9b727-DSC06243_8_11zon-scaled.webp` | `fa879ad95b80-DSC06243_8_11zon-scaled-354x236.webp` |

| G068 | `7e3b3affe409-DSC06240_7_11zon-scaled.webp` | `23e41bda0173-DSC06240_7_11zon-scaled-354x236.webp` |

| G069 | `a41d95ed9abc-31.webp` | `f0c497738ba9-31-354x236.webp` |

| G070 | `339cff22b663-30.webp` | `77399ddac7ec-30-354x236.webp` |

| G071 | `4403a1a5ddaf-29.webp` | `7a8246ce90a3-29-354x236.webp` |

| G072 | `a08da0d4ce7f-28.webp` | `7ceb3bab5fa8-28-354x236.webp` |

| G073 | `a501b4346ef4-27.webp` | `d0190efaa8ed-27-354x236.webp` |

| G074 | `a94446d18b56-26.webp` | `1a9f0dc476c7-26-354x236.webp` |

| G075 | `4a86e20ceaa1-25.webp` | `fc713c388651-25-354x236.webp` |

| G076 | `ef739695f4ad-24.webp` | `631e0d794848-24-354x236.webp` |

| G077 | `1dc55cbebea9-23.webp` | `c28e7ba4ecd4-23-354x236.webp` |

| G078 | `c6252d3dbd8c-22.webp` | `1ea54c50c59b-22-354x236.webp` |

| G079 | `294f7f8834db-21.webp` | `658926f29389-21-354x236.webp` |

| G080 | `eda6ba9e3379-20.webp` | `fdf7ae46d536-20-354x236.webp` |

| G081 | `bb4131269070-19.webp` | `f032eba90eec-19-354x236.webp` |

| G082 | `f8fe33a3a96e-18.webp` | `cc2c5d483865-18-354x236.webp` |

| G083 | `514fb639ad95-17.webp` | `1fb8506d618e-17-354x236.webp` |

| G084 | `84a2d0531704-16.webp` | `9ab913742e00-16-354x236.webp` |

| G085 | `7c2564746f0d-15.webp` | `95b68bbb4781-15-354x236.webp` |

| G086 | `83163c9f4c8d-14.webp` | `da117ab861a8-14-354x236.webp` |

| G087 | `e6985b6b8298-13.webp` | `2329f640e07e-13-354x236.webp` |

| G088 | `72bc7d19183a-12.webp` | `9b598a2715b4-12-354x236.webp` |

| G089 | `ceccf401b2ba-11.webp` | `18808a9b7be0-11-354x236.webp` |

| G090 | `2a82e2b93146-10.webp` | `c1844eaa5a85-10-354x236.webp` |

| G091 | `0cf4db3f72f7-9.webp` | `bf4ba7bb61c0-9-354x236.webp` |

| G092 | `b850a3c95d57-8.webp` | `2386f0c4623b-8-354x236.webp` |

| G093 | `6e9d9e3f5494-7.webp` | `c49c89e43faa-7-354x236.webp` |

| G094 | `6836b9bbba61-6-1.webp` | `49d445b90e2d-6-1-354x236.webp` |

| G095 | `57613b9932ca-5-1.webp` | `3388d4393e5e-5-1-354x236.webp` |

| G096 | `c46f18ee393e-005.jpg` | `4d973ade463e-005-354x236.jpg` |

| G097 | `0be9c813f52d-4.webp` | `5b24dbb7a865-4-354x236.webp` |

| G098 | `2c7df4826edd-0004.jpg` | `e4e995bb5dbd-0004-354x236.jpg` |

| G099 | `40acec3a44b6-3.webp` | `66d61fdf205d-3-354x236.webp` |

| G100 | `2e343dfca480-0003.jpg` | `dbfa39e6a6ce-0003-354x236.jpg` |

| G101 | `6f2daedca16c-2.webp` | `724dbf286095-2-354x236.webp` |

| G102 | `b0fcf63bb2a7-002.jpg` | `882083fa2252-002-354x236.jpg` |

| G103 | `108aff8a2e1c-1.webp` | `b34651dd2966-1-354x236.webp` |

| G104 | `359efff3a003-001.jpg` | `6a490a250a13-001-354x236.jpg` |

| G105 | `4ab207a571d9-11_15_11zon-scaled.webp` | `a3e3e10e4b22-11_15_11zon-scaled-354x236.webp` |

| G106 | `e9931f01c338-12_1_11zon-scaled.webp` | `3579f719ebdf-12_1_11zon-scaled-354x236.webp` |

| G107 | `d714684348ee-13_2_11zon-scaled.webp` | `81409de90326-13_2_11zon-scaled-354x236.webp` |

| G108 | `5c62d60bbac1-14_3_11zon-scaled.webp` | `a2e2f2f7b832-14_3_11zon-scaled-354x236.webp` |

| G109 | `67b9e5e3761a-15_4_11zon-scaled.webp` | `8a44699eec9d-15_4_11zon-scaled-354x236.webp` |

| G110 | `f0a34a01868b-15ppf_5_11zon-scaled.webp` | `80d561866d64-15ppf_5_11zon-scaled-354x236.webp` |

| G111 | `0588e00a198d-16_6_11zon-scaled.webp` | `750a5fc04c8f-16_6_11zon-scaled-354x236.webp` |

| G112 | `de91edde784e-17_7_11zon-scaled.webp` | `381b7265e2a9-17_7_11zon-scaled-354x236.webp` |

| G113 | `3e85bf7d1dd1-18_8_11zon-scaled.webp` | `f03acbf410dd-18_8_11zon-scaled-354x236.webp` |

| G114 | `6fe003b7295a-19_9_11zon-scaled.webp` | `9aeebf4db21a-19_9_11zon-scaled-354x236.webp` |

| G115 | `6b40f698049e-20_10_11zon-scaled.webp` | `30f57226c9ab-20_10_11zon-scaled-354x236.webp` |

| G116 | `7c10615ca8d1-21_11_11zon-scaled.webp` | `4734c1d123e6-21_11_11zon-scaled-354x236.webp` |

| G117 | `cef229facdd3-22_12_11zon-scaled.webp` | `37fc5eeebb5c-22_12_11zon-scaled-354x236.webp` |

| G118 | `46737198ad47-24_13_11zon-scaled.webp` | `ace6a8012699-24_13_11zon-scaled-354x236.webp` |

| G119 | `1b5b2315d5af-25_14_11zon-scaled.webp` | `b5f40f7d94a3-25_14_11zon-scaled-354x236.webp` |

| G120 | `350edbcfcd4e-44_6_11zon-scaled.webp` | `d0d75f9c2f3e-44_6_11zon-scaled-354x236.webp` |

| G121 | `d7fa741fa075-111_7_11zon-scaled.webp` | `f5818f1c951e-111_7_11zon-scaled-354x236.webp` |

| G122 | `8a26866b0126-0909_8_11zon-scaled.webp` | `d8f63010a6c0-0909_8_11zon-scaled-354x236.webp` |

| G123 | `25c54b2d8621-1212_9_11zon-scaled.webp` | `e58e3b11769b-1212_9_11zon-scaled-354x236.webp` |

| G124 | `f58d065e39b3-123212_10_11zon-scaled.webp` | `8d2bece55af2-123212_10_11zon-scaled-354x236.webp` |

| G125 | `82302ff86bd7-DSC05053_11_11zon-scaled.webp` | `dac0cddcf248-DSC05053_11_11zon-scaled-354x236.webp` |

| G126 | `0292083e58ae-DSC05054_12_11zon-scaled.webp` | `a50f6a86f7bd-DSC05054_12_11zon-scaled-354x236.webp` |

| G127 | `c9d119d3b0e4-DSC05055_13_11zon-scaled.webp` | `69925cd43e8a-DSC05055_13_11zon-scaled-354x236.webp` |

| G128 | `3f3368d178f1-DSC05056_14_11zon-scaled.webp` | `2eb82afdd539-DSC05056_14_11zon-scaled-354x236.webp` |

| G129 | `d5614ba8dd15-DSC05057_15_11zon-scaled.webp` | `3aaaeb08e61d-DSC05057_15_11zon-scaled-354x236.webp` |

| G130 | `eec7b7952628-DSC05059_17_11zon-scaled.webp` | `4e8ba1be4ab4-DSC05059_17_11zon-scaled-354x236.webp` |

| G131 | `4b7ca9235fc7-DSC05060_18_11zon-scaled.webp` | `7e408a7ed1c2-DSC05060_18_11zon-scaled-354x236.webp` |

| G132 | `555ffdb8acb9-DSC05061_19_11zon-scaled.webp` | `f05cec141abe-DSC05061_19_11zon-scaled-354x236.webp` |

| G133 | `4a73b817b04e-DSC05063_21_11zon-scaled.webp` | `74597586ffa0-DSC05063_21_11zon-scaled-354x236.webp` |

| G134 | `51080d34e056-DSC05065_2_11zon-scaled.webp` | `09cff81fb5b8-DSC05065_2_11zon-scaled-354x236.webp` |

| G135 | `aaa57cf6dc4d-DSC05066_3_11zon-scaled.webp` | `5f232c511c12-DSC05066_3_11zon-scaled-354x236.webp` |

| G136 | `6e140190861c-DSC05067_4_11zon-scaled.webp` | `ff884bf7a3c4-DSC05067_4_11zon-scaled-354x236.webp` |

### Implementation acceptance for this schedule

1. For each route, mark every section ID above as implemented and source-copy reconciled. Every source paragraph, table row, FAQ and CTA explanation must have a destination; no silent omissions. Use the source heading names in this schedule to match content; h3 metric/audience/action groups stay with their parent.
2. Produce desktop and mobile screenshots for each route and open states for shared FAQ, menu, quote validation and gallery. The existing `output/visual-reference/` captures document an older implementation; they are evidence, not approved mockups for this new schedule. These written compositions are not rendered page sketches.
3. Verify 1440/1024/768/390/320 widths. At inner-page entry there is no decorative photographic banner or fixed viewport-height opening. Contact actions/first content appear immediately after the short title; product copy/actions precede artwork on mobile.
4. Check poster contain behavior and readable HTML equivalents for essential embedded wording. No directory poster loses its product name or thickness to a crop. Gallery preserves all 136 ordered entries and opens the matching full-size file. Correct sideways derivatives after individual inspection; never alter source originals.
5. Verify QOL-01 through QOL-08, form errors, menu Escape, route scroll/Back, search, contact destinations, metadata, reduced motion and failed/throttled image loading. Use IMPLEMENTATION-REVIEW.md to reproduce existing bugs.
6. Keep business, source-claim and policy questions in CONTENT-DECISION-LOG.md. Preserve substantive source content in preview, with editorial instructions outside visitor pages. Client approval is still required for disputed claims and legal drafts; a chosen image is not evidence that a claim is true.
7. Do not publish as part of implementing this schedule. Update IMPLEMENTATION-STATUS.md with actual completion and verification results, rather than “all routes complete” based only on HTTP 200 responses.

**Builder sequence:** repair the shared shell/navigation/forms, complete the 210 page P01-P09 as the reference, apply each independently specified product variant, then About/Gallery, Warranty/Contact, editorial/policies/utilities, and finally the full acceptance pass. Preserve the approved homepage while implementing its explicitly listed missing details. No new discovery/design decision is needed to choose a background or substitute image already assigned here.

## 16D. Section animation and interaction choreography

This is part of the implementation contract, including the owner's explicit request for animation guidance. Apply it together with the M0/M1/M2/MF/MV assignments in **every section row of 16C**. A section assigned M0 is intentionally immediate, not unfinished. Never apply a global reveal class to all content. The homepage's approved motion is the special case below; new inner pages use shorter, simpler motion.

### Motion values

| Token | Value | Use |
| --- | --- | --- |
| ease-enter | `cubic-bezier(.16,1,.3,1)` | Homepage entrances and section reveal deceleration |
| ease-ui | `cubic-bezier(.22,1,.36,1)` | Menu, FAQ and action state changes |
| state-fast | 160ms | Button/link/background/border feedback |
| section-enter | 300ms desktop / 240ms mobile | M1 section reveal |
| overlay-enter | 150ms | Quote/gallery backdrop and panel opacity |
| overlay-exit | 100ms | Optional exit opacity before native dialog closes |
| inner-FAQ | 180ms | Inner-page FAQ expansion/collapse |
| image-change | 240ms | User-selected gallery-image opacity, no travel |

**M1 trigger:** observe the section once, with threshold 0 and `rootMargin: 0px 0px -48px 0px`; trigger on its first intersecting entry. This works for sections taller than the viewport. Do not wait for 20% of a very long section to become visible. At initialization, content already in the viewport is visible immediately. Only below-fold eligible sections are armed. Unobserve after entry; no reverse hiding when scrolling back. On browser Back, show restored content immediately. Hash targets and any section receiving keyboard focus become immediately visible. JavaScript failure leaves all content visible.

**M1 grouping:** heading/copy/media of a split section share a start time so half the section never appears empty. A grid may stagger its first four visible items by 0/40/80/120ms; remaining items appear with the last group. Mobile disables stagger and translation. Never stagger every paragraph, every table row, all 136 gallery tiles, or a long FAQ list.

**M2 distinction:** lift only an actual clickable card, by 2px with 160ms ease-ui, under `(hover:hover) and (pointer:fine)`. Non-clickable audience/benefit panels use border emphasis through `:focus-within` and action feedback only. Do not make an inert panel appear tappable. Text links underline or strengthen their existing underline; an attached directional icon may translate 3px on pointer hover. Focus adds the visible outline without moving layout. Press returns lift to zero; no rubber-band bounce.

### Homepage: preserve the approved choreography, section by section

| Section | Trigger and sequence | Duration / easing | Mobile and reduced-motion treatment |
| --- | --- | --- | --- |
| H01 copy | Once on fresh Home entry: kicker at 0ms, H1 at 100ms, description at 200ms, actions at 300ms; opacity 0 to 1 and translateY 24px to 0 | 850ms each, ease-enter, matching mock; actions are never disabled while entering | Mobile uses 240ms opacity, no stagger or translation; reduced motion all content visible immediately; Back restoration skips entrance |
| H01 vehicle | Fresh Home entry, approved car-arrival effect; reserve image box before image loads; final composition uses the mock mask/scrim | 1800ms ease-enter, opacity .4 to 1 and scale 1.07 to 1, homepage only | Mobile static image; reduced motion static final image; no delayed image fetch for animation |
| H01 existing scroll response | Preserve approved desktop hero media/copy scroll response only while hero intersects; progress clamped to 0-1 and updated at most once per animation frame | Existing bounded media translate up to 75px and copy translate up to -35px; no new parallax layers | Disable below 1024px and for reduced motion; no custom scrolling container; never hide a focused control through scroll opacity |
| H01 badges | Retain the mock badge entrance order and placement; non-interactive decoration does not steal focus | 700ms ease-enter; a single desktop float up to 8px over 3s then settle; total entrance/delay/float must finish within 5s of page entry; no endless loop | Mobile static in-flow badges; reduced motion static; stop when offscreen or document hidden |
| H01 scroll cue | One short cue at entrance, then settle | Existing 2s line movement, maximum two cycles | Hide where the approved mobile mock hides it; reduced motion static or absent |
| H02 statistics | Already-final source values appear with the section | M0; no count-up required, no spinning digits | Same; final values never wait for an observer |
| H03 profile | Text and photograph enter together once | M1; 300ms ease-enter, 12px desktop travel | 240ms opacity only mobile; immediate reduced motion |
| H04 banners | Manual Next/Previous/dot or native swipe changes scroll-snap position; active dot follows actual scroll position | Browser-native smooth scroll, no fake fixed-duration promise; dots 160ms color | Reduced motion uses instant snap. Default implementation is manual. If autoplay from the mock is retained, minimum 7s interval, visible Pause/Resume, pause hover/focus/hidden document; disable autoplay in reduced motion |
| H05 material introduction | Immediate text so visitors understand the following interaction | M0 | Same |
| H06 material image | Active visible feature chooses its paired image; card click sets the exact selected item; keyboard focus selects without fighting scroll | 500ms opacity crossfade as approved; no lateral slide or image recolor; progress uses transform scaleX from left over 350ms, not width animation | Hide decorative image panel at existing small-screen breakpoint. Reduced motion swaps immediately; all card copy remains visible |
| H06 feature cards | Border/background identifies active source feature; preserve proven per-card observer behavior | 300ms color/border; suppress observer override during a user-initiated scroll, then recompute visibility | Touch does not depend on hover. No repeated reveal of all eight cards; no auto-scroll caused solely by reading |
| H07 comparison | Entire table available immediately | M0 | Same; scrolling table changes edge cue only, never animated rows |
| H08 audience | Grid enters once; action hover/focus separate from grid reveal | M1 with capped 40ms stagger; M2 actions, non-clickable card stays still | One-column opacity only; reduced motion immediate |
| H09 FAQ | Preserve approved open/close behavior, one source answer open at a time; header trigger never moves away from focus | Mock open 320ms / close 240ms grid-row transition; answer opacity 280ms open / 180ms close; icon 220ms ease-ui | Reduced motion instant. Closing must actually work in the chosen browser; if native details cannot animate close reliably, immediate native close takes precedence over animation |
| H10 country flags | Visible on arrival, no marquee or fake partner rotation | M0; no hover zoom since these are not links | Same |
| H11 closing inquiry | Whole block once; glow is static and remains behind the content | M1; actions M2 | Mobile opacity only, reduced motion immediate; never pulse the CTA |

The explicit finite badge/cue loops and mobile simplification above resolve the earlier mock's continuous decorative movement without changing the approved composition. Keep the mock archive unchanged; implement this behavior in React.

### Inner-page motion schedule

| Routes / section IDs | Required choreography | Interaction details |
| --- | --- | --- |
| `/product/` D01-D03 | Opening/grid contents immediate; D02 cards use M2 only; D03 steady | No image zoom on posters; pointer lift applies to whole link; restore list position on Back without replay |
| All eight product pages P01 | H1, source intro, actions and poster immediate | Poster does not slide across the page or zoom on hover; deliberate enlargement uses MV; quote opens with selected product context |
| All eight product pages P02/P04/P06 | Problem copy, figures and tables immediate | No count-up of source costs/warranty numbers; table overflow hint fades in 120ms only when actual overflow is detected; never moves table |
| All eight product pages P03 | Whole solution section M1, image and copy together where image assigned | Text-only solutions still use one grouped reveal; no empty image slot or delayed checklist |
| All eight product pages P05 | Audience group M1 with desktop stagger capped at 120ms | Source CTA hover/focus M2; static audience panel does not lift unless itself a single semantic link |
| All eight product pages P07 | Each FAQ uses MF (180ms ease-ui), no entry cascade | Keep focus on trigger, aria-expanded/native open state accurate, no scroll jump on close |
| All eight product pages P08/P09 | Source closing copy and related links immediate | M2 actions only; no repeated hero-style entrance |
| Color P04a | Color examples immediate; individual images enlarge with MV | No auto-running color carousel, animated hue changes or implied selectable inventory |
| About AB01/AB03/AB04/AB05/AB07/AB08/AB09 | Immediate reading flow and names/benefits; M2 on real links only | No animated logo cloud, rotating statistics or moving timeline |
| About AB02/AB06 | Copy and assigned image M1 simultaneously | Quality text remains readable before any user action; no simulated testing equipment animation |
| Gallery G01/G02 | Heading and first 24 thumbnails immediate; card hover M2 border only, no poster scale | Newly appended batch fades opacity over 180ms as one batch, no translation/stagger; click opens MV |
| Gallery G03/G05 | Load more count and error state update immediately | Announce appended count with polite status; Retry is user-triggered; no indefinite shimmer/spinner |
| Warranty W01-W08/W10 | M0 reading flow, instant tables and instructions | Contents links may use smooth native scroll unless reduced motion; no animated claim steps or progress meter |
| Warranty W09 | MF 180ms | Complete source answers; link targets offset header |
| Contact C01-C04 | Immediate title/details/form/support copy | Field focus border 160ms; errors appear immediately, no shake or bounce; scroll/focus first invalid input without smooth motion under reduced preference |
| Blog/category/author B01-B03 | Immediate titles/list/search | Article link M2 border/underline, image stays stationary; no empty-grid skeletons |
| Article E01 onward | M0 for title, image, contents, all reading sections and related utility | Article FAQ alone uses MF. No scroll-driven text opacity, reading progress animation or per-paragraph reveal |
| Shipping/Privacy/Refund L01 onward; Terms T01-T03 | M0 throughout | Contents expansion is native and immediate; links have M2 color/underline; no decorative entrance |
| Search S01-S04 | Immediate query/count/results/empty states | Do not fade old results while a query is typed; update on submit and announce count; no simulated network delay |
| Cart/Checkout/Account F01-F03; 404 N01-N02 | M0 content with M2 recovery links | No bouncing cart, lock, warning or 404 graphic |

### Shared interactive states

| Component | Open/change | Close/reset | Keyboard, touch and reduced motion |
| --- | --- | --- | --- |
| Header | Keep header height stable on inner pages; background-opacity transition 160ms only | No page-layout jump on scroll | Header and skip link always immediately usable |
| Mobile navigation | Panel opacity 0 to 1, translateY -6px to 0 over 180ms ease-ui, starting below header | Reverse opacity over 120ms; state/focus restored reliably | Escape/link/navigation close; touch targets 44px; reduced motion instant without translation; long panel scrolls internally |
| Quote dialog | Native showModal immediately establishes modal/focus state; opacity 150ms on backdrop/panel; no scale | Optional opacity 100ms then native close; restore triggering element once | Escape/backdrop behavior works; preference change cancels animation; dialog content scrolls, page stays locked only while open |
| Gallery viewer | MV open opacity 150ms; current image is contained and controls immediately usable | 100ms optional fade, restore exact tile focus and page position | Arrows and buttons navigate; reduced motion immediate; do not retain an indefinite old image while a new image fails |
| Gallery image change | On successful image load, opacity 240ms; count updates to selected index immediately | Clear error on explicit navigation/retry | Reserved frame remains; pending image has static Loading image text, error has Retry; no animated spin |
| Inputs | Border color 160ms focus transition, persistent label | Blur returns border unless invalid | Invalid uses text plus border, not color alone; feedback role=status; no form clearing on validation failure |
| Back to top | Opacity 150ms when threshold crossed; appear without shifting document layout | Fade only when not focused; transfer focus to main heading after activation before hiding | Respect safe area; reduced-motion instant scroll; not visible over dialog |
| WhatsApp options | Opacity 150ms, no bounce | Opacity 100ms, return focus to toggle | Toggle label/state accurate; Escape closes; actual external link remains explicit |
| Image failure | Immediate fixed-size fallback and Retry where useful | Clear only after successful retry/navigation | No auto-retry loop, skeleton animation or layout collapse |

**Reduced-motion implementation:** initialize from matchMedia before any entrance is armed; listen for changes during the session. On reduce=true, cancel active requestAnimationFrame loops, finish entrances at final opacity/transform, stop carousel timers and decorative loops, reveal pending content, remove lift/translation/scale, and set scroll behavior to auto. Keep visible active/focus/open/error states through color, border and static icons. Switching back to no-preference must not replay completed entrances or restart user-paused autoplay. Prefer per-component rules over a universal `0.01ms` duration override.

**Performance and failure rules:** use opacity/transform for movement; grid-template-rows is permitted for tested FAQ expansion. Do not animate width, height, padding, margins, large blur or page-wide filters. Do not set will-change on every card; remove it after a measured expensive animation. Use one reveal observer per relevant page, clean observers/listeners/timers on unmount and on hidden-document state where appropriate. Never mount/unmount article paragraphs based on scroll. Keep interactive targets available while decorative images load. Do not add a motion library solely to perform these effects.

**Animation acceptance:** check fresh entry, Back restoration, rapid navigation/unmount, menu Escape, FAQ open and close, gallery next/previous/load failure, invalid quote fields, offscreen/hidden-tab carousel, reduced-motion enabled at load and toggled mid-session. Capture desktop and 390px mobile open states; record actual results. Passing a screenshot alone does not verify timing, focus or cancellation. The default site must remain readable if observers or animations do not initialize.

## 16E. Visual revision after the full-site review: color, composition, alignment, and gallery

Updated 20 September 2026 following the owner's screenshots and request for a more expressive website. This section supersedes conflicting visual restrictions in 16A through 16D, especially the plain Gallery opening, near-identical background sequence, no-parallax rule, and uniformly restrained marketing-page motion. Content preservation, Nunito, JSX, static forms, source integrity, accessibility, and reduced motion still apply. This is planned work, not a record of completed redesign.

### Review evidence and limits

Review provenance: DEGRADED, single-context assessment because no sub-agent tool is exposed. Design inspection was performed before the source detector. All 25 inventory routes were captured at 1440px and 390px; full-page captures and route observations are in `output/visual-audit/`. Contact sheets were inspected for every route's opening and early section sequence. This is a composition review, not an exhaustive interaction or word-for-word content audit. Later sections require implementation-time full-size review.

Observed issues:

- Home already has meaningful vehicle imagery and orange emphasis. Inner pages lose that character and look like document layouts with product posters attached.
- About alternates a full-width content rail with centered narrow reading blocks. The text can be left-aligned internally yet appear arbitrarily centered because its container moves. AB05 exposes source-analysis notes to visitors. The current quality image also differs from the equipment image specified in the earlier plan.
- All eight product pages have much the same dark-strip rhythm, dense introductions, and small tables. Images often contain marketing text, so shrinking posters makes important visual information illegible.
- Gallery opens directly into 24 equal tiles with a count, without an editorial introduction, image hierarchy, or explanation. Posters are cropped to uniform frames even when they contain lettering. Production photographs are buried later in the collection.
- Blog/category/author pages repeat the generic Blog heading. Blog and policy/Terms surfaces expose drafting or source notes that belong in project documentation.
- Contact has a confirmed 420px-wide details column overflowing a 390px viewport. This is a layout defect, not a color problem.
- The reveal component starts at opacity zero and waits for 30% intersection. A section remained hidden during one automated reduced-motion traversal; a targeted revisit revealed it. Reduced-motion CSS shortens transitions but does not itself force hidden content visible. Replace this fragile trigger before adding more animation.
- The source detector reported a Home width transition and legacy renderer/font warnings. Legacy warnings are not proof of active runtime failures. The render sweep found no completed-but-broken images; it did not exercise all deferred gallery loads.

The earlier brief was too conservative for the owner's current direction. Do not merely increase every shadow or add random gradients: change the hierarchy of surfaces, image scale, composition, and movement deliberately.

### Visual direction and palette

Keep the dark automotive identity and orange Platinum branding. Introduce a genuinely visible steel surface and a warm copper surface, plus selected full orange section bands. The website remains dark overall. No wholesale font or logo change.

| Token/role | Proposed value | Use |
| --- | --- | --- |
| Deep canvas | `#090B0F` | Main page background and cinematic image surround |
| Steel section | `#18212B` | Substantial alternate sections, catalog framing, reading panels |
| Raised steel | `#24313E` | Cards, controls, table headers where separation is needed |
| Copper section | `#321C14` | Warm explanatory sections and finish storytelling |
| Brand orange | `#FF691B` | Actions, rules, section numbers, occasional full-width CTA band |
| Warm heading accent | `#FFAC7A` | Selected words and labels against dark surfaces |
| Primary text | `#F7F5F2` | Headings and primary body |
| Secondary text | `#C3CAD2` | Supporting paragraphs, not disabled-looking content |
| Orange-band text | `#101318` | Text and icons over full orange backgrounds |
| Structural divider | `#42505E` | Significant panel/row boundaries, evaluated against actual background |

These replace the nearly indistinguishable main/alternate surface values for redesigned pages. Check actual contrast pairs: normal text at least 4.5:1, large text 3:1, essential UI boundaries/focus indicators 3:1 against adjacent colors. Do not assume an orange or muted token is valid on every surface. White small text on brand orange is not the default; use dark text.

Aim for perceptible chapter changes on marketing pages: deep photo-led opening, steel explanation, deep imagery, copper detail, deep technical content, orange closing band. Do not apply this sequence blindly to policies or copy it identically to every route.

Use a localized gradient over hero imagery for readable text. A static broad copper-to-deep wash is allowed in one major introduction per page. Keep paragraphs off busy imagery. No animated noise, particles, fake lens flares, or constant background movement.

### Formatting and alignment contract

1. Main desktop content uses a single 1224px maximum rail. At 1440px it has approximately 108px outer space. One container owns horizontal padding; nested section-shell elements must not add another unexplained inset.
2. Left-align breadcrumbs, H1, section headings, paragraphs, captions, FAQ questions, form labels, and technical content by default. Align a section heading with its own content, not independently with the viewport.
3. A centered container and centered text are different. Reading columns may be narrower, but on About/product pages anchor them to the main rail or a deliberate grid column. Do not alternate arbitrary centered 800px text blocks with full-rail sections.
4. Only a short closing invitation or intentionally symmetric visual interlude may center its text. Centered supporting copy is at most about 45 characters wide and a few lines. Mobile defaults back to left alignment unless a documented composition requires centering.
5. Nunito body is 17 to 18px desktop, 16px mobile, line-height around 1.65. Supporting body should not routinely fall to 13px. Use 60 to 70 characters for long paragraphs. Headings get fluid sizes, balanced wrapping where useful, and no hardcoded desktop line breaks that damage mobile.
6. Use consistent spacing increments: 8, 12, 16, 24, 32, 48, 64, 96px. Heading-to-lead normally 16 to 24px; lead-to-content 32 to 48px. Align paired columns at their content starts unless the design explicitly centers a compact hero.
7. Remove visible developer commentary, source references, section codes, and drafting explanations from the public UI. Keep them in the decision log. AB05 must not explain what the source page failed to supply. Preserve the real heading and only source-supported public content, merging its heading into the adjacent material/quality grouping if needed rather than leaving a large empty band.
8. Unapproved policy language is a content-release blocker, not a reason to publish internal notes as finished terms. Preserve archival text in project records. Do not invent legally binding replacements.
9. Use a common left text edge on mobile, 20px gutters at 390px and 16px at 320px. Add `min-width: 0` to grid/flex children where appropriate. Fix the Contact track sizing rather than concealing overflow.

### Gallery: make this the flagship page

Purpose: visitors should understand what the collection contains, experience the range visually, and then browse every image easily. Curated storytelling is added above the full archive; the original 136-image order and thumbnail/full-image pairs remain intact in that archive. Featured images may repeat there intentionally. Do not replace the archive with a small curated selection.

Suggested public labels below are new neutral navigation/editorial copy, not new product claims. Keep technical/product claims unchanged pending confirmation. Do not call the gallery "our completed projects" or the production photos "our factory" without verification.

| Section | Desktop composition | Mobile composition | Image/background | Animation and interaction |
| --- | --- | --- | --- | --- |
| GE01 Opening: Gallery | 70 to 80svh editorial opening, capped around 860px and allowed to grow with text. Left: small "THE COLLECTION" label, Gallery H1, short lead. Right: one tall film/application image and a smaller offset production image; overlap only in the image area. Actions: "Explore highlights" and "Browse all 136 images". | Natural-height opening; left-aligned title, lead, actions, then a 4:3 main photo. Secondary image omitted only if decorative; same content appears below. No text overlay on phone photography. | Deep canvas with localized copper wash. Candidate existing material application asset `eea44f2b1a11-sli1.webp`, secondary G043 production photograph; inspect full-size before final crop. Posters must not become cropped backgrounds. | Title/lead/actions enter in one short sequence; image planes have different bounded scroll translations, at most 32px desktop. No entrance waiting screen. Phone uses static composition. |
| GE02 Collection navigation | Full-width steel band with anchors: Product imagery, Color and finish, Production imagery, Full collection. Short text: "Explore product artwork, color presentations, and production imagery." | Two-column link grid with 44px targets; no tiny horizontal chip carousel. | Steel band, orange rule, white labels. | Underline/focus state. If sticky on wide screens, stays below header; regular document flow on mobile. |
| GE03 Product imagery | 5/7 split: explanatory heading and brief neutral lead on left, asymmetrical three-image presentation on right. One large contained image, two supporting smaller images. | Heading, lead, main image, two smaller images in a readable grid; posters can open full-size. | G010 film-roll artwork, G015 packaging stack, G031 car/film illustration. Use original full-image versions, not cropped thumbnails. Steel main surface with neutral backing plates that suit source white backgrounds. | One grouped reveal; hover on true image buttons shows View image and subtle border, no fake 3D tilt. Clicking opens correct full-resolution item in global viewer. |
| GE04 Color and finish | Large selected color presentation with title/description beside it and five thumbnail controls beneath. Controls choose complete supplied images; they do not recolor one car. | Static heading and image followed by wrapping controls; no pinning or forced horizontal page scroll. | G034 through G038 as candidate color presentations. Copper surface. Labels use visually supported color descriptions or source labels; do not imply stock availability. | 220ms opacity transition on explicit selection. No autoplay. Keyboard buttons show selected state. Section heading: "Explore color and finish". Lead: "Browse color presentations from the supplied collection." |
| GE05 Production imagery | Full-bleed photographic interlude using G043 or G121, then two-column editorial sequence: one tall image plus two supporting equipment images. Heading "A closer look at production imagery" with neutral description. | Normal-flow image, heading/lead, then supporting images. No text over a busy machine photograph. | G043/G121 worker and production images, G054 equipment, G064 production space. Use a dark overlay only for short desktop text; never label machine function or ownership beyond evidence. | One parallax photo translating at most 40px in a clipped frame. No fixed background. Supporting text reveals once without scroll pinning. |
| GE06 Full collection | Clear heading and explanatory line, loaded/total count, complete ordered archive. Four columns desktop, three tablet. Preserve aspect ratios within frames so promotional text remains visible. | Two columns at 390px; one at 320px where text-heavy posters need more space. Count stays visible near Load more. | Deep canvas, raised neutral frames. All G001-G136 preserved. Do not shuffle items to make a prettier grid. | First 24 thumbnails then batches of 24. Newly added items get at most a short grouped fade. No parallax on each tile. Viewer supports arrows, keyboard, touch controls, image position, retry, and focus/scroll restoration. |
| GE07 Closing | Orange band with dark heading "Find the right film for your requirements", short factual action copy, Products and Contact links. | Left-aligned text and full-width actions stacked. | Orange background; dark text and dark primary button with light label, clearly distinguished secondary link. | Brief once-only entrance or static if close to footer; no repeating attention pulse. |

GE01 lead candidate: "Explore Platinum product imagery, color presentations, and production photos in one collection." Treat this as explanatory UI copy, not a claim of image provenance or completed customer work.

Desktop sketch:

```text
HEADER
GALLERY / lead / two actions     [application image]
                                  [production inset]
STEEL CHAPTER NAVIGATION BAND
Product imagery / explanation    [large image][two smaller]
COPPER COLOR SECTION: copy       [selected color image]
                                  [selection controls]
FULL-BLEED PRODUCTION PHOTO, BOUNDED PARALLAX
Production explanation          [equipment][production]
FULL COLLECTION / count
[G001] [G002] [G003] [G004] ... all entries via Load more
ORANGE CONTACT BAND
FOOTER
```

Mobile sketch:

```text
HEADER
Gallery / short lead / actions
Application photo, static
Chapter links, two-column grid
Product heading / lead / featured imagery
Color heading / selected image / wrapping controls
Production photo / heading / explanation / supporting images
Full collection / count / two-column ordered archive
Load more
Orange contact section / footer
```

Do not build fake project filters, customer testimonials, a before/after comparison without matched source photos, or an animated factory tour that implies verified facilities. Classification based on visible content is acceptable only after inspection. Featured selection is explicitly curated; archive order stays original.

Orientation: inspect G105-G120 and G129-G136 at full size and correct only confirmed sideways photographs through derived assets, preserving originals and recording rotations. Do not guess a single rotation for all of them.

### About: correct the screenshot's issues section by section

| Existing section | New treatment |
| --- | --- |
| AB01 + AB02 title/introduction | Compose as one deliberate opening on deep-to-copper background. Keep About Us as H1, original company heading beneath. Text 7 columns, product-box artwork 5 columns on its own neutral plate. Both align to main rail. Source statistics form a clean orange-accented row, not four anonymous gray pill cards. Do not emphasize unconfirmed numbers as new giant claims. |
| AB03 approach | Steel section with a left title column and right body column, both top-aligned. Orange vertical rule identifies the explanation. On mobile, title then body. Remove the arbitrary centered 800px container. |
| AB04 supply | Six offerings retain source order, with stronger headings, clear product links, consistent 24px internal spacing. Film categories can use relevant source imagery; operational services remain text-led. No unrelated repeated stock car icons. |
| AB05 materials | Short integrated materials block aligned to the same rail, warm copper backing, source-supported names only. Remove source-analysis italic text from UI. Keep any unsupported relationship/certification claim in the review log. |
| AB06 quality | Use the specified actual G054 equipment photo after full-size inspection, not promotional car artwork as a substitute for equipment. Large image beside numbered explanations; one slow bounded image parallax on desktop. Mobile remains static with readable explanation order. |
| AB07 benefits | Steel background, two-column editorial benefit rows with orange markers and larger readable supporting type; avoid six tiny uniform boxes. |
| AB08 audience | Deep background, clear label/body alignment, consistent column grid; optional restrained link feedback only for actual navigation. |
| AB09 closing | Full orange band, dark copy, clear actions. This creates a deliberate ending instead of another nearly identical charcoal strip. |

### All other routes: apply the stronger direction selectively

| Route/group | Required changes |
| --- | --- |
| Home | Retain original wording and hero composition; strengthen section backgrounds and lower-page hierarchy. Existing banners already provide color. Add only one additional bounded photographic parallax moment if it improves a specific section. Do not rework the entire approved hero or add more sliders. |
| Product directory | Copper-accented compact introduction, steel catalog area, larger image presence, aligned names/summaries, clear hover/focus. Preserve all eight cards. Do not crop posters to make identical photographic banners. |
| 210 and 190 | Stronger split hero with a deliberate neutral product-art stage and a copper light wash behind the stage. Source problem/solution blocks become distinct steel/image-led chapters. Preserve product-specific values and pending claims. |
| Headlight | Use source close-up as a large feature moment in the solution section; dark steel surrounding text, one bounded desktop image translation. No animated beam/light performance simulation. |
| Matte and Satin | Use actual finish imagery at larger scale. Neutral surfaces protect finish perception; warm headings and steel explanation sections provide contrast. No glossy filters or interchangeable images between finishes. |
| Gloss black | Brighter steel frame separates dark paint from dark canvas. Preserve image appearance; no invented reflections or simulated coating effect. |
| Color PPF | Let real color imagery dominate one substantial copper-backed section. Optional user-controlled source image selection only where distinct existing assets support it. Avoid a fake configurator. |
| Window tint | Give the actual tint diagram a readable dedicated frame. No parallax on technical charts. Allow source photography to move subtly in one separate hero/solution image. |
| Warranty | Steel contents/coverage framing, strong orange heading rules, readable duration table, uniform left alignment. Keep exclusions equally prominent. No cinematic background behind conditions. |
| Contact | Fix 420px overflow; 40/60 split desktop, one column mobile. Warm introductory backdrop, pronounced steel form panel, clearer field borders, consistent labels. Remove duplicate side gutters. No parallax behind form controls. |
| Blog/category/author | Correct contextual headings. Feature the actual single article with a larger image and clear editorial composition. Remove public source-count/developer notes. Distinct steel listing region, deep page header. No invented articles. |
| Article | Left-aligned title and reading column relationship, comfortable text size, stronger H2 spacing. Image gets a deliberate wide introduction. Body remains still, not animated line by line. |
| Shipping/Privacy/Refund/Terms | Unify title/body rails and contents styling. Remove public internal drafting commentary through a tracked content review; do not invent replacement policies. Increase readability and table contrast, keep backgrounds calm. |
| Cart/Checkout/Account/404 | Consistent title and message alignment rather than unrelated centered body under left-aligned heading. Useful navigation, modest steel panel, no decorative animation. |
| Search | Preserve query context; visible field and result separators; single left-aligned results rail. Empty states use the same rail. No gallery-style effects. |

### Motion engineering and limits

Use native scrolling. On desktop, parallax means translating imagery inside a clipping frame based on that section's viewport progress, not moving the whole page. Start with a maximum 32 to 40px travel and 1.05 to 1.10 image overscan only where cropping is safe. Poster artwork and diagrams never receive parallax crops.

Implement one shared motion hook/controller. Passive scroll listener schedules at most one requestAnimationFrame, updates only visible sections, and cleans up listeners/observers on navigation. Avoid React state updates on every scroll pixel. Stop work when the tab is hidden. Prefer CSS transforms and opacity. No new smooth-scroll engine, WebGL dependency, or dual slider packages.

At widths at or below 1000px, use static image placement initially. Reduced motion always removes parallax, scale entrances, and autoplay and exposes all content immediately, including preference changes while open. Preserve navigation and image controls without animation.

Fix Reveal before adding effects: visible is the safe default; arm only eligible below-fold content after observer setup succeeds. Trigger at first meaningful intersection, not a percentage of a potentially very tall section. Hash targets, focused sections, restored history content, and reduced-motion content cannot remain hidden. Animated changes must not cause layout shifts.

Gallery gets two principal scroll moments: opening image planes and production panorama. About gets one quality-image moment. Product pages get at most one relevant photographic moment each. Hover details support navigation; they do not replace the larger composition. Avoid animating every panel, paragraph, and image simultaneously.

### Implementation sequence and acceptance

1. Fix layout foundations first: Contact overflow, reveal visibility, public developer notes, archive headings, text rail inconsistencies. Preserve original facts and archive notes outside the UI.
2. Implement shared palette and typography/spacing tokens. Apply first to About as the representative correction for the owner's screenshots. Inspect desktop/mobile before propagating.
3. Build Gallery GE01-GE07 as the flagship. Inspect the selected original assets at full size, record assignments, and wire every featured image to the correct viewer item. Keep the complete archive.
4. Apply route-specific treatments above, using existing 16C source-section schedules to avoid content loss. Every original section remains accounted for.
5. Verify all 25 routes again at desktop/mobile. Test gallery controls, color selection, anchors, Load more, final batch, image failures, history restoration, reduced motion, narrow screens, and keyboard focus.
6. Measure actual text/control contrast, check alignment and backgrounds in full-size screenshots, and profile scroll behavior on a representative mobile device/emulation. Report findings; do not invent frame-rate claims.

Done means visible section hierarchy, consistent alignment, readable source artwork, purposeful motion, and complete functionality. A background gradient alone does not satisfy this revision. No production deployment or business-claim approval is implied.

Questions skipped: the owner has explicitly requested stronger color contrast, parallax, gallery storytelling, and formatting corrections. Continue within that direction; log only unresolved factual/client decisions.


## 16F. Concrete CSS and component contract for Claude

The owner requests planning only in this session. This section specifies future implementation; no application CSS or components have been changed by this review. Read 16E and this section before older visual instructions. Use this contract to implement an expressive dark automotive site, not a uniformly plain black document.

### F01. Replace detached page-title blocks

The screenshots show three versions of the same weak opening: a small breadcrumb, an isolated title, and either an empty gap or a grid immediately underneath. Do not fix this by simply centering the title or making the black header taller. Build a coherent introduction containing context, title, lead, relevant actions, and a purposeful visual/background.

Breadcrumbs are navigational context, not a duplicate eyebrow. About should use Home / About Us, not a standalone About Us label followed by About Us again. Render an accessible breadcrumb nav with a list, linked ancestors, and `aria-current="page"` on the current item. Separators are decorative. Use 14px text and 16 to 24px separation from the title. On narrow screens, long product breadcrumbs can show Home / Products with the full current title in the H1 rather than repeating it in a cramped navigation row.

| Page type | Opening composition | Desktop scale | Mobile scale |
| --- | --- | --- | --- |
| About | One combined intro: breadcrumb, About Us H1, original company heading/body on left; product-box artwork and source facts integrated on right/below. No separate empty title section. | 7/5 columns, minimum around 520px only when content fits; 64px top/bottom padding inside header offset. Copper/steel atmosphere behind right-side artwork. | Natural height; 32px top, 40px bottom. Title/body/actions before image. No artificial empty space between H1 and company content. |
| Products | Breadcrumb, original Product H1 and existing lead occupy left 7 columns; right 5 show an editorial pair of actual product images, contained. Below, a clear divider introduces the full catalog. | Around 340 to 420px depending on content, 48px padding. Background: diagonal static steel/copper composition. Catalog starts 48px below introduction content, not touching lead text. | Title/lead then one contained editorial visual if it adds value; 32px gaps, no fixed height. Full catalog starts after 32px. |
| Gallery | GE01 from 16E: large Gallery title, meaningful collection lead, Explore highlights / Browse all actions, layered application/production imagery. Loaded count belongs to the archive, not hero description. | 70 to 80svh capped around 860px, able to grow; original photographs only; visible next-section cue. | Natural-height title, lead, actions and main photo. No secondary decorative overlap. |
| Product detail | Breadcrumb and H1 directly integrated with original lead, actions, and product-art stage. Do not prepend another generic title banner. | 5/7 or 6/6 grid; product name 44 to 60px with space for long wrapping. | 32 to 38px heading, lead and actions, then contained product visual. Never shrink type to preserve three lines. |
| Contact | Breadcrumb, heading, short lead, warm background treatment leading into contact/form split. | Compact 220 to 300px opening or integrated with form composition; no unnecessary hero photo. | 32px vertical intro spacing; contact/form follows naturally. |
| Warranty | Breadcrumb/title/lead on a steel gradient field with orange rule, followed by contents/coverage. | Compact editorial header, approximately 240 to 320px as content needs. | Natural height; no blank placeholder graphic. |
| Blog/archives | Contextual heading and lead beside actual featured article imagery where appropriate. Archive context must distinguish category/author from general Blog. | Editorial introduction, max 420px target; no empty right column if no suitable image. | Title/lead/image stack. |
| Article/policies/utilities | Compact reading header aligned with the body column. Background atmosphere stays low-key, not a tall promotional hero. | 32 to 48px top/bottom spacing, auto height. | 24 to 32px, auto height. |

There must be exactly one main H1 per page. Keep established public wording unless change is neutral UI labeling or explicitly approved. Preserve original company heading as subordinate content rather than deleting it to simplify the About opening.

### F02. CSS organization

Implement in existing plain CSS and JSX. Suggested organization: shared tokens/base, layout utilities, component styles, page-specific compositions, and motion helpers. Adapt existing files where practical; do not require a new CSS framework or duplicate the application.

Use scoped selectors such as `.page-intro__title`, `.gallery-story__media`, and `.form-field__error`. Avoid broad page overrides such as `.section p` that accidentally restyle cards/forms. Do not use `!important` as the main layout strategy. Backgrounds live on full-width outer sections; alignment and gutters live on one inner container.

Suggested foundations, to be verified against actual markup:

```css
:root {
  --canvas: #090b0f;
  --surface-steel: #18212b;
  --surface-raised: #24313e;
  --surface-copper: #321c14;
  --brand: #ff691b;
  --brand-soft: #ffac7a;
  --text-primary: #f7f5f2;
  --text-secondary: #c3cad2;
  --text-on-brand: #101318;
  --container-max: 76.5rem;
  --gutter: clamp(1rem, 4vw, 3rem);
  --radius-control: .5rem;
  --radius-panel: 1rem;
  --ease-out: cubic-bezier(.22, 1, .36, 1);
}
.container {
  width: min(var(--container-max), calc(100% - 2 * var(--gutter)));
  margin-inline: auto;
}
.section-block { padding-block: clamp(3rem, 6vw, 6rem); }
.layout-split {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}
.layout-split > * { min-width: 0; }
.reading-copy { max-width: 66ch; }
@media (max-width: 1000px) {
  .layout-split { grid-template-columns: minmax(0, 1fr); }
}
```

These are a starting contract, not code to paste on top of conflicting old declarations. Reconcile existing variables/selectors and remove superseded rules in the edited components. Keep `box-sizing: border-box`. Use logical spacing properties where practical. The header's actual height must drive page offsets and anchor `scroll-margin-top`; do not stack multiple guessed top paddings.

### F03. Background recipes, not plain alternating fills

Use a small family of backgrounds with recognizable purpose. Each major marketing page should have an image-led or atmospheric opening, at least one clearly different explanatory surface, and a deliberate closing treatment. A photograph or gradient is decorative support; actual content determines section height.

**Recipe A: atmospheric copper/steel opening.** Large diffuse static orange light behind artwork, cooler steel on the opposite side, dark text-safe region. Place the light based on image location, not always at the exact center. Example:

```css
.surface-atmosphere {
  background:
    radial-gradient(ellipse at 88% 25%, rgb(255 105 27 / .20), transparent 48%),
    radial-gradient(ellipse at 8% 95%, rgb(65 95 120 / .25), transparent 52%),
    linear-gradient(115deg, #090b0f 12%, #18212b 67%, #321c14);
}
```

Use on About opening, Products opening, and selected product stages. Vary layout and image placement, not random gradient colors. Avoid bright orange behind small orange text.

**Recipe B: film-inspired diagonal plane.** One broad low-opacity diagonal shape behind a product image, suggesting a film sheet. Implement with a pseudo-element containing a static gradient, clipped to the image stage, with `pointer-events:none` and no semantic content. It never crosses paragraph text. Do not create moving abstract shapes across the entire page.

**Recipe C: steel editorial chapter.** Base `#18212b` with a subtle directional tonal gradient, strong top divider or short orange rule, and a large section number only when it aids real sequencing. Use for feature explanations, About approach, product benefits, and collection navigation. The difference from the main canvas must be perceptible at normal brightness.

**Recipe D: warm finish showcase.** Copper `#321c14` to deep canvas static gradient, actual color/finish imagery taking most visual space, white text in a clean region. Use for Gallery color section and appropriate Color PPF content. Do not tint the actual finish photo.

**Recipe E: photographic panorama.** A real source photograph spans full width. Short text uses a localized dark overlay or an adjacent solid text panel. Only photographic pixels move in bounded parallax; captions and controls stay still. Use for Gallery production chapter and selected About/product moments. No text-bearing poster stretched into a photo backdrop.

**Recipe F: brand closing band.** Orange `#ff691b`, dark heading/body, dark primary button, outlined dark secondary button. Optional broad static diagonal shade at very low opacity. Keep text concise and left-aligned unless explicitly composed as a short centered invitation. This should feel like a clear ending, not another charcoal card.

**Recipe G: quiet reading surface.** Deep canvas with a subtle steel header gradient and stronger contents/table panels. Use for article, warranty conditions, policies, search, and utility states. These pages do not need constant photographic backgrounds to look designed.

Do not tile patterns behind paragraphs, put gradients on every small card, add blur to every element, or use animated texture loops. Text/controls retain required contrast at every point in the background. Test real crops and gradient positions, not just token swatches.

### F04. Headings, paragraphs, and bullet lists

Nunito remains the only UI family. H1 generally `clamp(2.125rem, 4.3vw, 4rem)`, line-height 1.08 to 1.15, weight 800. Gallery may reach 80px on wide desktop where its short title supports it. H2 generally 30 to 44px desktop and 26 to 30px mobile, line-height 1.2. H3 20 to 24px, weight 700 or 800. Do not make ordinary card titles all caps.

Eyebrows are optional meaningful context, 12 to 14px, weight 700, modest tracking. Never repeat the H1 verbatim above it. Section identifiers used only by developers do not appear on the site.

Paragraphs: 17 to 18px desktop, 16px mobile, line-height 1.65 to 1.75. Maximum width approximately 66ch; hero leads approximately 48 to 56ch. Default left-aligned, no full justification. Use 16px between related paragraphs. Keep annotations at 14px minimum unless truly incidental. Do not use gray so faint that normal explanations look disabled.

Lists: semantic `ul`/`ol`; marker gutter about 1.25em; 8 to 12px between items. Body text aligns consistently after wrapped markers. Orange `::marker` is allowed on dark surfaces, but not white/yellow bullet decoration on every line. Use ordered steps only for a real sequence. Checkmark icons imply affirmative benefits; do not add them to unverified certifications or exclusions. Keep source meaning and full list items, not arbitrary truncation.

Do not force equal text heights with clipping. Cards may align their action row at the bottom using flex layout while titles and copy wrap naturally. Avoid manual `<br>` tags for desktop aesthetics. Use `text-wrap: balance` for short headings where supported and safe wrapping for long URLs/contact details.

### F05. Buttons and links

Three action styles are sufficient:

- Primary: orange fill, dark label, 48px minimum height, 18 to 24px horizontal padding, 8px radius, 16px/700 Nunito. Hover lightens slightly and moves at most 1px on fine pointers. Active returns to baseline. Keep label readable when wrapping.
- Secondary: transparent or steel fill, visible border, light label on dark surfaces. Same dimensions and weight. On orange sections use dark border/label. Do not use a faint ghost action that disappears into the background.
- Text link: descriptive wording, visible underline or directional arrow, distinct hover/focus. Do not represent navigation with a button unless it triggers an action.

Group actions with 12 to 16px gaps; align to the text rail. On mobile, stack long actions at full width; short paired actions may stay side by side only if both remain comfortable. Icon-only buttons need 44px targets and accessible names. Decorative arrow icons must not be announced twice.

Use 160 to 200ms named-property transitions. Focus has a visible 3px ring with offset; use a dark ring on orange/light areas where an orange ring disappears. Disabled controls must be clearly disabled semantically and visually. Do not introduce a fake pending/success state for static forms.

### F06. Inputs, forms, and validation

Form panel: raised steel surface with subtle directional gradient, 24 to 32px desktop padding and 20px mobile, 16px corner radius, visible boundary. Avoid glass transparency that makes field readability depend on the background image.

Labels: always visible above fields, 15 to 16px weight 700, 8px label/control gap. Mark required fields with text or a explained symbol. Group fields with 20 to 24px spacing. Desktop may pair name/company and email/WhatsApp; mobile uses one column. Preserve the agreed field contract.

Inputs: minimum 50px height, 14px horizontal padding, 8px radius, near-deep fill distinct from panel, 1px visible neutral border, 16px Nunito. Placeholder is an example, not the label. Use appropriate autocomplete/inputMode/types. Textarea minimum 140px, vertically resizable. No fixed widths or minimum widths exceeding the track.

States: hover brightens border; focus gets a strong brand border plus visible outer ring; invalid gets a readable error message linked with `aria-describedby` and `aria-invalid`. Error color must be checked on the actual field background and never be the only signal. Help/error text uses 14px, 6 to 8px top gap. Preserve entered values on failure.

On submit, focus the first invalid field or accessible error summary. Valid static preview feedback explicitly says nothing was sent. Do not call it an email successfully delivered. No local storage of personal data. Quote dialog uses the same form styling; product context appears near its title without adding a required field.

### F07. Sections, images, cards, tables, and accordions

Section anatomy: full-width background wrapper, one container, coherent title/lead group, content grid, optional action. Do not create a separate oversized header-only band for each section. Desktop padding 80 to 104px for major narrative chapters, 48 to 64px for related supporting chapters; mobile 40 to 56px. Respect visual relationships rather than applying 100px everywhere.

Images: real photographs may use cover with inspected focal point; posters, packaging diagrams, tint charts, and logos use contain. The current product/gallery screenshots visibly clip embedded lettering: correct the media component rather than removing that source information. A designed neutral backing stage can fill unused space around a portrait poster.

Product cards: image plus consistent body padding, 16px radius, visible border, title 20 to 22px, description 16px. Whole main link clickable, focus visible, no nested actions. Hover raises at most 3px and strengthens the border; image zoom only for crop-safe photographs. Posters never zoom into unreadability. Do not add glowing orange box shadows to every card.

Technical tables: prominent readable header on raised steel, body text minimum 15 to 16px, 14 to 18px cell padding, clear row boundaries. Numeric columns align consistently. On mobile preserve semantics and provide deliberate internal horizontal scroll with a hint only when needed. Do not hide columns to make the page fit.

FAQs: 20 to 24px row padding desktop, 16 to 20px mobile, question text 18 to 20px, plus/minus aligned at the far edge, answer max 66ch. Hover subtly changes row surface. Focus outline covers the actual button. Open/close reliably, preserve multiple-open behavior chosen in the plan, and keep answers readable without animation.

### F08. How the new page openings connect to the rest

About: atmospheric combined opening > steel approach > deep supply layout > short copper materials grouping > photographic/equipment quality feature > steel benefits > deep audiences > orange contact band. Shared alignment remains constant even while backgrounds change.

Products: atmospheric editorial opening > steel catalog with contained source artwork > appropriate existing closing content. A page introduction should tell visitors what they can explore, not consume a screen before showing a product.

Gallery: atmosphere/application hero > steel chapter navigation > designed product-art grouping > copper interactive color presentation > production panorama > deep complete collection > orange contact band. Do not put "24 of 136 photos" in place of an introductory explanation; keep it next to the archive.

Product detail: integrated hero > distinct steel source problem/solution chapter > a large relevant image moment > readable technical content > page-specific audience/comparison sections > FAQs > orange closing. Preserve original section order when necessary for meaning and account for every source section.

### F09. Claude's execution and evidence requirements

Treat this as a planned implementation, not permission to guess missing business facts. Make changes in JSX/plain CSS using the existing project. Inspect actual current state, then implement one shared system rather than layering conflicting rules over old styles.

First repair the existing bugs and content leakage, then implement About and Gallery as the two reference pages. Apply the accepted component rules to all remaining routes. Capture each reference page at 1440px and 390px, inspect at full size, and check 320/768/1024px behavior. Verify contrast, aligned rails, no cropped artwork text, focus states, failed images, form errors, and reduced motion. Test scroll effects rather than judging them from still screenshots.

Keep all original content and unresolved claims accounted for in the decision log. The full gallery archive must remain reachable. Report exact sections finished and actual checks. A general statement such as "added premium styling" is not evidence of completion.


## 17. Copy-paste prompt for Claude

```text
Please implement the rest of the Platinum Car Films static React website in this repository.

Prioritize the latest sections 16E and 16F: visual revision, full CSS/component contract, and integrated page-opening designs. It supersedes earlier plain-gallery and no-parallax restrictions. Fix alignment, public developer notes, Contact overflow, and reveal visibility first; then build the stronger About composition and Gallery GE01-GE07, and apply the remaining page-specific treatments. Keep Nunito, JSX, source content, and the full 136-image archive.

Read docs/WEBSITE-IMPLEMENTATION-PLAN.md as the consolidated implementation and visual brief, including authoritative sections 16C and 16D. Apply the section-specific animation triggers, durations, easing, hover/focus/touch and reduced-motion rules in 16D. Implement every numbered section for each route, using its exact A/G image assignments, backgrounds, desktop/mobile compositions and interactions. Only the homepage gets an immersive photographic hero; inner pages follow the compact openings in 16C. Use docs/design/IMAGE-ASSIGNMENTS.md and docs/design/GALLERY-ASSIGNMENTS.json as supporting assignment records, not the unselected PAGE-ASSETS candidates. Reconcile every source paragraph, table, FAQ and CTA to a section. Fix the reproduced issues in docs/IMPLEMENTATION-REVIEW.md. Use Nunito throughout the React UI, not Manrope or Nunito Sans; keep the logo artwork unchanged. Follow any applicable repository instructions. Inspect the actual current state before editing and preserve unrelated work.

The dark homepage mock at react-app/public/mock/index.html is the approved visual reference. Preserve that mock for comparison. Migrate its approved design into the existing React app, then apply the same design system to every route in the plan. Reuse the local source content and assets instead of crawling the website again unless something is missing.

Inspect the current implementation and docs/IMPLEMENTATION-REVIEW.md first; do not restart completed work. Repair shared shell/navigation/form issues, then finish the 210 product page section by section before applying each product-specific schedule. Complete About/Gallery, Warranty/Contact and editorial/policy/utility schedules next. Include QOL-01 through QOL-08 and all 16D motion acceptance checks. Preserve the approved homepage and original mock. Maintain docs/IMPLEMENTATION-STATUS.md with each completed section and actual verification; do not equate a styled shell or HTTP 200 response with completion.

Business claims remain unconfirmed until the owner's Sunday client meeting. Preserve source claims in the preview, log conflicts, and continue independent work. Do not invent or silently correct specifications, warranty terms, contact details, certifications, testimonials, or legal policies.

This phase is static. Forms validate locally and explicitly say nothing was sent. Do not implement backend services, QR warranty workflows, accounts, payments, Shopify migration, hosting migration, or deployment.

Use React components and the existing stack. Do not run WordPress plugin scripts, add redundant libraries, rewrite the approved design, introduce em dashes or filler marketing copy, or omit source sections to save time.

Verify each completed phase with appropriate build/lint checks and browser checks. Report actual results and unresolved issues. Keep progress updates short and finish with the files changed, checks run, remaining work, and exact next step.
```
