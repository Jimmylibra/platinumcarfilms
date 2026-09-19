# Platinum Car Films: desktop and mobile design specification

> Updated authority: [WEBSITE-IMPLEMENTATION-PLAN.md](WEBSITE-IMPLEMENTATION-PLAN.md), sections **16C and 16D**, now specifies every route/section, exact inspected image assignments, backgrounds, desktop/mobile layouts and animation choreography. This earlier brief is supporting context; use the main plan and its section 17 prompt for implementation.

For detailed imagery, backgrounds, hover/focus states, and animation guidance, also read [the complete visual handoff](CLAUDE-VISUAL-HANDOFF.md). Existing media candidates per route are indexed in `docs/design/PAGE-ASSETS.md`; inspect them before choosing final assignments.

Status: implementation handoff. Existing dark homepage direction is approved. The layouts below extend it to remaining pages; they are proposed specifications, not screenshots of completed pages.

Use with `WEBSITE-IMPLEMENTATION-PLAN.md`. Preserve source content and business claims pending client confirmation. Layout labels in these wireframes describe content roles, not replacement marketing copy.

The approved quality-of-life additions are tracked as QOL-01 through QOL-08 in section 13A of that implementation plan. Apply them to the relevant desktop/mobile layouts, including gallery and history restoration, back-to-top placement, contextual inquiry dialogs, overflow hints, consistent contact actions, stable image sizing, and image failure states.

## 1. Visual authority and typography

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

## 2. Responsive layout contract

Design references: desktop 1440px wide and mobile 390px wide. Also verify 320, 768, and 1024px.

| Width | Layout rules |
| --- | --- |
| 1200px and wider | Maximum content width 1224px, centered; generous two-column layouts |
| 1001 to 1199px | 32px side gutters; retain columns only if readable; header may collapse earlier if Nunito labels do not fit |
| 701 to 1000px | 28px gutters; mobile navigation; major hero/form splits become one column; grids generally two columns |
| 700px and below | 20px gutters, 16px at 360px and below; one-column editorial layouts |

Desktop section spacing: normally 88px vertically. Tablet: 64px. Mobile: 48px. Small related sections may use 32px mobile. Card gaps: 24px desktop, 16px mobile. Reading column: maximum 760px. Compact forms/dialog content: maximum 640px.

Full bleed means the background or media reaches both viewport edges; text still respects safe gutters. No fixed page heights. Do not use `overflow-x:hidden` to conceal layout errors. Wide tables get their own labeled scroll region.

## 3. Shared shell wireframe

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

## 4. Home: `/`

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

## 5. Product directory: `/product/`

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

## 6. Product detail template: all eight products

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

### Product-specific treatments

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

## 7. About: `/about-us/`

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

## 8. Gallery: `/gallery/`

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

## 9. Warranty: `/warranty/`

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

## 10. Contact: `/contact-us/` and shared quote dialog

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

## 11. Blog and archive pages

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

## 12. Article: `/blog/how-long-does-paint-protection-film-last/`

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

## 13. Policy pages

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

## 14. Search, legacy routes, and missing pages

Search `/?s=`: compact heading, visible editable query field, result count, vertically stacked results with title, content type, and useful excerpt. Maximum results column 900px desktop; full inner width mobile. Results are not giant image cards. Preserve query on back/forward. Empty query offers a prompt to search; no results offers correction and Products/Contact links. Do not invent results or send queries to a backend.

Legacy `/cart/`, `/checkout/`, `/my-account/`: centered reading-width panel under the standard header. Explain the relevant online function is unavailable in this static version, then provide Products and Contact links. No fake checkout fields, login, balances, or purchase success messages.

Unknown route: clear 404 heading, brief explanation, Home/Products/Contact links. Desktop actions inline, mobile stacked if needed. Keep normal footer. Avoid a full-screen illustrated error that obscures navigation.

Loading/error states: keep shell stable, reserve only reasonable content space, announce loading, provide a retry action for a failed content load. Never leave an indefinite spinner or replace errors with empty sections.

## 15. Interaction and motion specification

Buttons: 160 to 200ms color/border transition; restrained 1 to 2px hover movement only when appropriate. Keyboard focus is immediate and visible. Product images may scale at most approximately 1.025 on hover; do not crop essential details.

Section reveal: optional opacity and up to 16px translation, approximately 400ms, once per section. Do not stagger every paragraph on reading pages. Hero entrance may use the existing mock timings. Nothing requires scrolling back up to reveal missed content.

Reduced motion: no translation, animated counters, parallax, or autoplay. Show final values immediately. For regular motion, autoplay requires visible pause/resume and pauses while the page is hidden and during relevant user interaction.

Forms, policies, search, and article body prioritize immediate readability over entrance effects. No scroll hijacking or separate app-wide scroll container.

## 16. Asset decisions and content safeguards

Reuse local image mappings and the source manifest. Specify each chosen asset in page data so another developer can identify where it came from. No AI-generated product evidence, fake before/after pairs, or invented client work. If a missing image has no reliable replacement, use the relevant existing product image or a text-led layout and record the gap.

Use `cover` for appropriate photography, `contain` or natural dimensions for logos, diagrams, and text-heavy banners. Review desktop and mobile crops separately. Do not apply saturation or contrast filters that misrepresent film finishes.

New UI labels should be concise and functional. Preserve factual copy until approved. Remove em dashes through punctuation-only edits in final display copy, without changing business meaning; preserve archived source evidence. Editorial artifacts need tracked review, not fabricated replacement claims.

## 17. Visual acceptance and Claude handoff

For every template, capture a desktop 1440px and mobile 390px view of the full composition plus important interaction states. Check 320px for overflow and long titles, 768px for grid transitions, and 1024px for navigation fit. Compare Home against the approved mock, allowing the requested Nunito change. Review other pages against these wireframes, content coverage, and shared tokens.

Before marking a route complete, confirm its section mapping, imagery, focus states, spacing, mobile order, and all source content. A wireframe box is not permission to shorten copy. Do not call these specifications rendered mockups or claim visual verification until the implemented pages have been inspected.

Resume prompt:

```text
Read docs/WEBSITE-IMPLEMENTATION-PLAN.md and docs/PAGE-DESIGN-SPECIFICATION.md together. The second file defines desktop/mobile layouts and overrides the earlier font choice: use Nunito, not Manrope or Nunito Sans. Preserve the logo artwork.

Implement the existing approved dark design in React, following the page templates, route-specific differences, mobile stacking, image treatments, and interaction states. Wireframes are structural guides; preserve complete source content. Do not redesign the homepage or invent business claims. Keep the original mock intact for comparison. Work in the planned phases and maintain docs/IMPLEMENTATION-STATUS.md.
```
