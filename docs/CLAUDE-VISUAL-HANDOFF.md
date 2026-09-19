# Platinum Car Films: complete visual implementation handoff

> Updated authority: [WEBSITE-IMPLEMENTATION-PLAN.md](WEBSITE-IMPLEMENTATION-PLAN.md), sections **16C and 16D**, now specifies every route/section, exact inspected image assignments, backgrounds, desktop/mobile layouts and animation choreography. This earlier brief is supporting context; use the main plan and its section 17 prompt for implementation.

## Start here

This is the entry point for implementing the remaining website. Read these complementary documents, in order:

1. `docs/WEBSITE-IMPLEMENTATION-PLAN.md`: phases, routes, functionality, quality-of-life improvements, acceptance criteria.
2. `docs/PAGE-DESIGN-SPECIFICATION.md`: desktop/mobile wireframes, Nunito typography, page composition, responsive behavior.
3. This file: images, backgrounds, hover states, motion, and visual implementation decisions.
4. `docs/design/PAGE-ASSETS.md` or `page-assets.json`: concrete existing media candidates per route. Read the relevant page group, not the entire gallery manifest on every task.

These documents form one brief. The approved dark homepage mock remains the visual reference. Nunito is the user's explicit replacement for Manrope throughout the React UI; preserve the logo artwork. Complete source content takes priority over fitting a wireframe's illustrative box height. No backend or deployment is authorized by this brief.

## 1. Image selection workflow

Use existing local images first. For each page, inspect its source content, the corresponding asset inventory, and the actual images. The first image in extracted content is not automatically the hero. The inventory records candidates, source roles, dimensions, and local-file existence, not image quality or verified ownership.

Create `docs/design/IMAGE-ASSIGNMENTS.md` as implementation proceeds. Record route, section, selected local asset, original source if available, desktop fit/focal point, mobile fit/focal point, alt text, and any unresolved concern. Use exact paths rather than descriptions such as "nice car photo."

Select existing product-specific imagery ahead of unrelated photographs. Reuse an image when it genuinely represents the same content; do not repeat one generic car throughout unrelated product pages just to fill rectangles. If suitable imagery is absent, use a text-led composition and record the gap. Do not obtain arbitrary new stock imagery, generate product evidence, or fabricate before/after images to complete a layout.

Some source filenames suggest generated imagery. Treat all source images as supplied illustrations unless verified otherwise. Do not relabel them as actual customer installations, factory photographs, certification evidence, or proof of material performance.

The approved mock's asset choices override extracted homepage candidates. Preserve its eight material images and their existing feature mapping. An original source photo associated with a benefit is illustrative, not proof of that benefit.

## 2. Image treatment by type

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

## 3. Page-by-page image and background schedule

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

## 4. Background system

Use three principal surfaces: page `#0a0a0c`, alternate section `#111114`, and raised panel `#19191e`. Existing text and accent tokens remain in the page specification. Alternate backgrounds at meaningful content boundaries rather than changing color after every paragraph. A simple section may need only spacing and a divider.

Header: dark opaque or near-opaque surface when scrolled; preserve approved transparent hero state where it exists. Do not require heavy backdrop blur for legibility. Mobile menu and dialog use solid dark panels.

Cards: subtle neutral border, approximately 12 to 16px radius where consistent with the approved mock. Information is not automatically a card: article text, policy sections, and company prose remain open layouts.

Tables: panel background, slightly distinguished header row, subtle row separators; no glowing cells. Forms: dark field fill, distinct boundary, clear orange focus outline, readable error text supported by wording and icons rather than color alone.

Closing inquiry sections: preserve approved orange emphasis. On new pages, prefer a dark section with orange button and a restrained rule over a giant orange gradient. Do not introduce animated gradients, particles, carbon-fiber textures, decorative circuit lines, floating blobs, or moving noise.

Photographic background text needs a localized dark overlay sized for readability. Validate contrast against the actual image at every crop. Do not place long paragraphs directly over busy photographs. Do not use fixed-background attachment on mobile.

## 5. Hover, focus, active, and touch states

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

## 6. Scroll and hero animation schedule

Homepage: preserve the approved entrance sequence. If translating it into React, keep heading, lead, and actions legible immediately on failure and avoid long blocking delays. Hero imagery may have the existing restrained entrance, but do not add endless zooming or a new slider merely for motion.

Inner product/About introductions: one optional fade/translate entrance, 350 to 450ms, no more than 16px. Body content remains in ordinary document flow. Small grids may stagger by approximately 50ms, capped so the last visible item begins within 200ms. Do not stagger all 136 gallery images or every sentence.

Section reveals: once per section, 400ms maximum typical duration, using opacity and transform. Avoid repeated hiding/revealing while scrolling backwards. Sticky desktop material imagery remains as approved; no new mobile scroll-trapping section.

Reading pages, policies, forms, search, and long article body: no reveal requirement. Prioritize immediate reading and interaction. Navigation route transitions should not fade the whole page to blank.

Reduced motion: disable translations, scaling, parallax, autoplay, and animated counters; final content is immediately visible. Listen for preference changes while the page is open. If reveal initialization fails, content must remain visible. Avoid CSS that permanently hides content awaiting JavaScript.

Carousel autoplay, where retained, has visible pause/resume and pauses on document hiding and relevant hover/focus. Manual controls always work. Native smooth scrolling for user-invoked anchor/back-to-top actions is acceptable when reduced motion is off; never replace the browser's scrolling engine.

## 7. Responsive image and background checks

At 1440px, check composition, readable line length, image resolution, and whitespace. At 1024px, check navigation fit and cramped split layouts. At 768px, check the transition to stacked sections and two-column grids. At 390px and 320px, check long titles, crop focal points, embedded banner text, form controls, and page overflow.

Do not use desktop background-position values blindly on mobile. Store focal positions per image when needed. Mobile can stack content differently, but must preserve semantic reading order and all substantive source text. Decorative images may be omitted only when they convey no unique content; document intentional omissions.

Reserve image space during loading. Failed photos show a contained fallback and useful message without collapsing the layout. Gallery errors retain navigation and retry. A missing decorative background should leave a readable solid-color section.

## 8. Completion records

Maintain the route implementation checklist, IMAGE-ASSIGNMENTS.md, and IMPLEMENTATION-STATUS.md. Mark image selections as inspected, not merely found. Do not describe an index candidate as approved before viewing it.

For each page template, deliver representative desktop/mobile screenshots, including hover or focus on an interactive card, an open FAQ, a quote dialog with validation feedback, and gallery viewer where applicable. One shared component's state need not be recaptured on every identical page. Include actual keyboard/touch-oriented checks rather than inferring behavior from screenshots.

Check image request sizes and layout stability with throttling. Confirm no full-size gallery preloading, duplicate fonts/icon libraries, or accidental WordPress plugin dependencies. Nunito must be the computed UI family after font load. Do not claim measured performance scores without running the measurements.

Do not add backend behavior while polishing the UI. Pending business claims stay logged for Sunday review. New copy should be functional and concise; do not add em dashes, fabricated testimonials, decorative certification badges, or generic marketing filler.

## 9. Ready-to-paste Claude prompt

```text
Implement the remaining Platinum Car Films website in this existing repository.

Start by reading docs/CLAUDE-VISUAL-HANDOFF.md. Follow its linked implementation plan and desktop/mobile page specification as one brief. Use docs/design/PAGE-ASSETS.md or page-assets.json to find existing page-specific image candidates; inspect chosen images before assigning them and record final choices in docs/design/IMAGE-ASSIGNMENTS.md.

The approved dark homepage mock is the design reference. Keep it intact for comparison. Use Nunito throughout the React UI, not Manrope or Nunito Sans. Preserve the supplied logo. Follow the page layouts, background schedule, image fit/crop rules, hover/focus/touch states, animation timings, and reduced-motion behavior in the brief.

Use the existing React/TypeScript/Vite project and local source content. Preserve every required route and all source sections. Implement reusable components without flattening product-specific differences. Do not invent imagery, claims, specifications, testimonials, legal terms, or missing business details. Pending client confirmations should be logged while independent work continues.

Complete the planned phases in useful verified batches, starting with shared shell/homepage and the first product template. Include all eight quality-of-life requirements. Keep docs/IMPLEMENTATION-STATUS.md current with completed work, checks, blockers, and the exact next step. Avoid repeatedly rereading the complete source archive or recrawling the live website when local evidence is sufficient.

This is a static rebuild: forms validate locally and explicitly state nothing was sent. No backend, accounts, QR warranty workflows, payments, hosting migration, or deployment. Do not execute WordPress plugin scripts or add duplicate animation/slider/icon libraries.

Run appropriate build/lint checks and inspect representative desktop/mobile layouts and interaction states. Report actual outcomes and remaining gaps concisely. Work on the implementation, not another proposal, and preserve unrelated existing changes.
```
