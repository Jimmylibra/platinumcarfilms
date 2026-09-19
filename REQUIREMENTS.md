# Platinum Car Films — Full Website Recreation Requirements

Status: Working draft grounded in public-site investigation  
Updated: 2026-09-17  
Reference website: https://platinumcarfilms.com/

## 1. Objective and scope

Recreate the public Platinum Car Films website as a static React application, preserving the core appearance, content, imagery, page structure, and navigation. The user has confirmed that a close starting point is sufficient; pixel-perfect reproduction is not required. Later improvements will be made component by component.

Current implementation: React + TypeScript + Vite in `react-app/`. Reuse downloaded public CSS, images, and fonts where practical. Archive original JavaScript for reference; replace WordPress-dependent interactions with frontend components rather than running WordPress plugins.

This phase has no backend. Inquiry and newsletter forms are preview interfaces that validate locally and clearly state that nothing was sent or subscribed. Menus, accordions, quote dialogs, image viewers, banner controls, and search operate locally.

The client's future data-driven warranty claim system remains the longer-term business motivation, but warranty registration, claims, accounts, databases, staff administration, notifications, and integrations are explicitly deferred.

Supporting evidence: [Site investigation](docs/SITE-INVESTIGATION.md), [page inventory](docs/site-audit/inventory.json), [image placements](docs/site-audit/assets.csv), and [supplementary source checks](docs/site-audit/supplement.json).

## 2. Investigation baseline

The public crawl found 25 page URLs: 20 primary content pages, two blog archives, and three legacy commerce/account routes. All returned HTTP 200. Search and a missing-page response were also inspected. The public sitemaps and linked pages define this baseline; unpublished or unlinked content is not established.

The source site uses WordPress with WoodMart and WPBakery assets, Contact Form 7, and a Joinchat WhatsApp widget. These findings do not require the recreation to use the same technology.

Source inspection is complete for the discovered inventory. Browser screenshots and runtime interaction verification remain outstanding because no browser was available. Published product claims are recorded as site content, not independently validated facts.

## 3. Required pages

Every primary content page is in scope. Blog and product detail pages are required parts of the recreation.

| ID | Page | Existing URL | Required result |
| --- | --- | --- | --- |
| PAGE-01 | Home | `/` | Recreate the complete live homepage, not only its hero |
| PAGE-02 | About | `/about-us/` | Company, mission, range, quality, partners, audiences, contact actions |
| PAGE-03 | Product directory | `/product/` | Eight product cards linking to the correct detail pages |
| PAGE-04 | Gallery | `/gallery/` | Preserve gallery media and order; reproduce its intended viewing behavior |
| PAGE-05 | Warranty | `/warranty/` | Coverage, exclusions, duration table, conditions, limitations, FAQs, and existing contact actions; no new claim workflow in this phase |
| PAGE-06 | Contact | `/contact-us/` | Inquiry form, sales contact details, location and map access |
| PAGE-07 | Blog index | `/blog/` | Article listing, metadata, search, recent-post links |
| PAGE-08 | Existing article | `/blog/how-long-does-paint-protection-film-last/` | Full article structure, media, author/category/date metadata and links |
| PAGE-09 | Platinum 210 | `/210-paint-protection-film/` | Product-specific detail content and conversion actions |
| PAGE-10 | 190 micron PPF | `/190-micron-ppf/` | Product-specific detail content and conversion actions |
| PAGE-11 | Headlight film | `/headlight-paint-protection-film/` | Product-specific detail content and conversion actions |
| PAGE-12 | Matte film | `/matte-paint-protection-film/` | Product-specific detail content and conversion actions |
| PAGE-13 | Satin film | `/satin-paint-protection-film/` | Product-specific detail content and conversion actions |
| PAGE-14 | Gloss black film | `/gloss-black-paint-protection-film-190-microns/` | Product-specific detail content and conversion actions |
| PAGE-15 | Window tint | `/window-tint-film-for-cars-platinum-car-films/` | Product-specific detail content and conversion actions |
| PAGE-16 | Colour PPF | `/color-ppf-for-car/` | Product-specific detail content and conversion actions |
| PAGE-17 | Shipping | `/shipping-policy/` | Preserve route; preserve reference content for review; production policy approval deferred |
| PAGE-18 | Terms | `/terms-and-conditions/` | Preserve route; preserve reference terms for review |
| PAGE-19 | Privacy | `/privacy-policy/` | Preserve route; preserve reference content; no claim data collection in this phase |
| PAGE-20 | Refunds | `/refund-policy/` | Preserve route; preserve reference refund content for review |
| PAGE-21 | PPF archive | `/blog/category/ppf/` | Recreate archive and article links, or record an agreed redirect |
| PAGE-22 | Author archive | `/author/autoboost018/` | Recreate archive and article links, or record an agreed redirect |

The following public routes must receive an explicit migration disposition. Their existence is not evidence of working commerce:

| ID | URL | Observed state | Required decision |
| --- | --- | --- | --- |
| LEGACY-01 | `/cart/` | Raw WooCommerce cart shortcode | Show a sales-contact fallback for this static preview |
| LEGACY-02 | `/checkout/` | Raw WooCommerce checkout shortcode | Show a sales-contact fallback for this static preview |
| LEGACY-03 | `/my-account/` | Raw WooCommerce account shortcode | Show a sales-contact fallback for this static preview |

Utility states are also required: matching search results at `/?s=<query>`, no search results, and a missing-page view. Production HTTP status handling depends on the eventual host.

## 4. Page composition

### Homepage

Preserve the supplier hero and inquiry action; feature highlights; company and range introduction; promotional media; material explanation; comparison table; buyer audience sections; FAQs; partner area; closing contact actions; and shared footer. Use the live page's section order and media placement as the reference.

### Product pages

Use a reusable page structure without flattening product-specific differences. Preserve the introduction/hero, consultation and gallery actions, problem statements, solution explanation, feature-benefit table, audience cards, alternative comparisons, FAQs, and closing actions where present. Retain individual product URLs and meaningful product metadata.

### Gallery and assets

The gallery's main source contains 136 image elements with distinct effective image URLs. Reconcile this inventory against the rendered gallery before removing, combining, or replacing items. Preserve original ordering and thumbnail/full-image relationships. The overall inventory records 180 page-image placements and 176 distinct effective image URLs; this excludes some CSS backgrounds, logos outside main content, and font assets.

### Blog and archives

Recreate the current index, existing article, author archive, category archive, and search. Keep long-form headings, tables, images, and related navigation. Do not add a comment system solely because the source platform supports one; no article comment form was established.

## 5. Shared components and behavior

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| FUN-01 | Header and navigation | All seven main navigation destinations work. Desktop/mobile header behavior is documented from reference captures and reproduced. |
| FUN-02 | Footer | Includes brand/about content, two phone numbers, email, address, quick links, newsletter, policy links, and copyright. Resolve contact inconsistencies before release. |
| FUN-03 | Quote dialog | Quote triggers open a shared inquiry dialog. Close button, Escape, focus containment/return, mobile scrolling, and background scroll handling work. Source markup establishes the dialog; precise reference behavior needs browser verification. |
| FUN-04 | Contact form | Uses the source field set and local validation; clearly states that submission is not connected. |
| FUN-05 | Form states | Provide empty, invalid, and preview feedback states. Do not send data, persist entries, or display a false delivery confirmation. |
| FUN-06 | Newsletter | Required email field and local validation with an explicit not-subscribed preview message. No subscription service connection. |
| FUN-07 | WhatsApp | Recreate the floating entry point and greeting/open-chat flow. Verify destination number and prefilled message before release. |
| FUN-08 | FAQs | Reproduce page-specific questions and grouping. Each item can open and close using keyboard and pointer. Confirm single/multiple-open behavior against the reference. |
| FUN-09 | Gallery viewer | Reproduce thumbnail/full-size viewing. Verify lightbox controls, next/previous behavior, Escape, focus return, and touch operation when implementing the source-indicated lightbox. |
| FUN-10 | Media interactions | Inventory actual carousel/slider controls and partner/media behavior in the browser. Reproduce observed interactions; loaded library files alone do not justify invented controls. |
| FUN-11 | Search | Matching queries return linked content, including relevant product pages. Unmatched queries display an empty state and retry. Preserve the query and implement pagination if reference results require it. |
| FUN-12 | Direct URLs and history | Every retained page opens directly, refreshes correctly, and supports back/forward navigation. Redirected routes use agreed destinations. |
| FUN-13 | Contact/location links | Email, phone, map, and WhatsApp actions use verified destinations. Consultation wording does not imply a new booking/calendar service. |
| FUN-14 | Scroll controls | Reproduce reference sticky-header and scroll-to-top behavior after browser verification. Respect reduced-motion preferences. |

### Inquiry field contract

| Field | Reference requirement | Notes |
| --- | --- | --- |
| Name | Required | Source name `your-name` |
| Company name | Required | Source name `company-name` |
| Email | Required; email validation | Source name `your-email` |
| WhatsApp number | Required; telephone validation | Source name `whatsapp-number` |
| Product description | Optional in inspected markup | Source name `descripe-brief`; preserve user-facing purpose, not necessarily the typo in a new implementation |

The modal and contact page share this contract. Do not replace it with the earlier proposed expanded form unless requested. Server-side validation, delivery, retention, spam controls, and newsletter integration are deferred. No test messages were sent during investigation.

## 6. Visual recreation requirements

- Use the live site's branding, typography, colours, spacing, imagery, layout, and page hierarchy as the fidelity reference. Do not substitute the local mockup's design automatically.
- Source CSS defines Jost body text, Sora headings, Inter header text, and BankGothic as an alternative font. Confirm actual usage and weights from rendered pages.
- Baseline source values include orange `#ff691b`, dark background `#0a0a0c`, muted text `#9a9aa3`, and a 1222 px container. Page-specific overrides determine final appearance.
- Capture desktop and mobile reference screenshots when browser access becomes available; until then, rendered fidelity is unverified. Include open menu, open quote dialog, expanded FAQ, gallery viewer, and long-page footer states.
- Match representative page templates at the same viewport sizes. Record intentional improvements separately from fidelity differences.
- Keep mobile layouts usable without horizontal page overflow. Tables and large media may use contained scrolling where appropriate.
- Provide visible keyboard focus, accessible form labels, useful image alternatives, sufficient contrast, and reduced-motion support.

No pixel-perfect fidelity claim can be made from the source-only investigation.

## 7. Content decisions requiring resolution

| ID | Finding | Requirement |
| --- | --- | --- |
| CONTENT-01 | Product FAQs and Warranty disagree about transferability | Approve one consistent rule |
| CONTENT-02 | Headlight product and Warranty publish different durations | Approve product-specific coverage |
| CONTENT-03 | Platinum 210 uses potentially incorrect thickness terminology | Retain reference text during migration; obtain authoritative specification before later content editing |
| CONTENT-04 | Gloss-black comparison contains satin-related copy | Supply correct product comparison |
| CONTENT-05 | Product pages contain editorial labels and bracketed placeholders | Decide faithful capture versus corrected release copy; track corrections |
| CONTENT-06 | Four policy pages contain generic drafting guidance | Track business-specific policy replacement for production; do not invent terms during migration |
| CONTENT-07 | Blog title/body focus differs | Agree on title/content treatment while preserving or redirecting the URL |
| CONTENT-08 | About shows a different email from common contact/footer | Confirm authoritative contact details |
| CONTENT-09 | Marketing statistics, certifications, pricing and financing claims appear in copy | Owner confirms what remains; do not invent supporting evidence |

Reference capture may preserve problematic text for comparison. Publishing corrected business terms is a separate content decision; do not silently choose between conflicting claims.

## 8. Technical and operational requirements

| ID | Requirement |
| --- | --- |
| TECH-01 | Use the existing React + TypeScript + Vite project; keep components replaceable for later design work. |
| TECH-02 | No CMS/admin in this phase. Document how developers edit content and components. |
| TECH-03 | Store approved assets in controlled project/hosting storage, preserve source mapping, and include image dimensions/responsive variants. Do not depend permanently on the original site's media URLs. |
| TECH-04 | Preserve descriptive titles, descriptions, canonical paths, relevant structured data, sitemap coverage, and internal links. Keep previews out of search indexing. |
| TECH-05 | Establish a URL migration map covering all 25 discovered routes and utility states. |
| TECH-06 | No inquiry/newsletter delivery or persistence. Preview forms must not post to the source site or any provider. |
| TECH-07 | Do not execute source analytics or plugin scripts. WhatsApp remains an explicit outbound link, not an embedded tracking integration. |
| TECH-08 | Validate production build, direct-route behavior, missing-page status, media loading, browser console, accessibility, and responsive behavior. Record checks appropriate to the chosen stack. |
| TECH-09 | Document setup, content editing, required configuration, deployment, and rollback. |

### Deferred scope

The future warranty capability may require customer identification, warranty records, evidence uploads, staff review, and status tracking. None of these are part of the current static implementation. Discovery and architecture decisions for that phase will be revisited later.

Payments, login/accounts, databases, CMS administration, CRM integrations, automated email, and live newsletter processing are also excluded from this phase.

## 9. Delivery sequence

1. Download public source assets and record their source URLs.
2. Convert all discovered public page content to local React-rendered data.
3. Build shared navigation, footer, preview forms, quote dialog, FAQs, galleries, and search.
4. Preserve current visual structure using the relevant original CSS and local media.
5. Validate build, links, local assets, and rendered content; compare desktop/mobile visuals when a browser is available.
6. Deliver a local static preview for component-by-component review. Hosting and production deployment are separate work.

## 10. Acceptance checklist

- [ ] All 20 primary content pages and both archive pages are available locally.
- [ ] Eight product detail pages contain the source content and media.
- [ ] All 136 gallery images retain thumbnail/full-image relationships and order.
- [ ] Three legacy commerce/account routes show a usable sales-contact fallback.
- [ ] Navigation, quote dialog, accordions, gallery viewer, banner controls, and search operate in React.
- [ ] Forms validate locally, display explicit preview messaging, and make no submissions.
- [ ] No WordPress plugin JavaScript, analytics, or server endpoints are needed at runtime.
- [ ] Downloaded assets have a source manifest; unavailable reference files are recorded.
- [ ] Build, lint, content rendering, and local asset/link checks pass.
- [ ] Responsive/visual review is recorded separately; unavailable browser verification is disclosed.
- [ ] Documentation explains setup, component editing, source refresh, and deferred work.
- [ ] Requirements are delivered as Markdown and PDF.

## 11. Open decisions and later work

| Decision | Current position |
| --- | --- |
| Recreation fidelity | Core appearance retained; pixel-perfect matching not required |
| Stack | React + TypeScript + Vite confirmed |
| Current scope | Static frontend only |
| Redesign | Later, component by component |
| Warranty and backend | Entirely deferred |
| Legacy commerce routes | Sales-contact fallback in this preview |
| Conflicting copy and policies | Preserve source for review; resolve before production |
| Hosting and public deployment | Not selected or performed |
| Visual browser verification | Outstanding until browser access is available |

## 12. Decision log

| Date | Decision |
| --- | --- |
| 2026-09-17 | Initial local-folder requirements draft created. |
| 2026-09-17 | User requested removal of application-specific assumptions and investigation of the entire live website. Requirements replaced with a technology-neutral recreation scope grounded in the public-site inventory. |
| 2026-09-17 | User confirmed the client’s need for data-driven customer warranty claiming as the reason for switching platforms. Added this as a core capability; detailed workflow and data-source choices remain open. |
| 2026-09-17 | User clarified that the current phase is entirely static: switch WordPress to React first, preserve the core appearance, and improve components later. Warranty functionality and backend integrations are deferred. |
| 2026-09-17 | User requested implementation, asset downloads, and a PDF copy of these requirements. |
