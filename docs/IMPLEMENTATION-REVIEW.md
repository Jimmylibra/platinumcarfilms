# Implementation review

Reviewed 19 September 2026 against WEBSITE-IMPLEMENTATION-PLAN.md, at commit `5c52516`.

## Verdict

Partial implementation; not ready to accept as completion of the plan. The shared dark shell and homepage are a useful foundation. Product and editorial content migration is unfinished, several approved usability requirements are missing, and reproduced interaction bugs remain. IMPLEMENTATION-STATUS.md honestly acknowledges substantial unfinished work. The handoff allowed phased progress “as time allows,” so distinguish an unfinished batch from a claim that the entire plan is complete.

## Checks performed

- `npm run build`: passed (TypeScript and Vite).
- `npm run lint`: completed with two warnings: unused variable in the archived mock; purity warning around Date.now in Home.tsx. These do not explain the functional gaps below.
- Read active routing, shared shell, homepage, product/detail, About, Gallery, blog/article, search, forms, overlays, policy inputs, and completion records against the plan.
- Browser checks on localhost:5175: desktop homepage, quote dialog, invalid-input submission, 390px mobile navigation, and navigation from the homepage material section to Products.
- Mechanical design detector: one active width-transition warning in Home.css:88. Its ContentRenderer image and replica.css font warnings refer to inactive legacy code and are excluded from findings. Width animation is a minor optimization, not a demonstrated performance failure.
- This was not the full 25-route, five-breakpoint acceptance sweep. No production-routing, throttled-media, contrast certification, or performance score is claimed.

## Prioritized findings

### P1: All eight product pages lack their substantive content

Location: `react-app/src/pages/ProductDetail.tsx:33`.

The common template renders only title, summary, hero image and actions, followed by an implementation note. Product-specific problem/solution sections, features, specifications, comparisons and FAQs are absent. Buyers cannot evaluate the products. Complete the per-product source pass required by phases C and 16A; do not fill gaps with invented marketing copy.

### P1: The article destination has no article body

Location: `react-app/src/pages/BlogArticle.tsx:10`.

The blog card promises a full article, but the destination supplies an extraction-pending note and image. Restore the archived body, headings, metadata and category/author navigation, preserving the recorded title/body conflict for client review.

### P1: Fresh navigation retains the previous page's scroll offset

Location: `react-app/src/layout/Layout.tsx`; `react-app/src/main.tsx`.

Browser reproduction: click “Explore film specifications” in the homepage material section. Products opens at scrollY approximately 1502px, with its H1 approximately 1358px above the viewport. There is no route scroll-management implementation. Add navigation-aware scroll handling: fresh routes start at top, Back restores directory position, and hashes reach their targets (QOL-02).

### P1: Primary telephone link does not match the displayed number

Locations: `react-app/src/components/Footer.tsx:41`, `react-app/src/pages/Contact.tsx:16`.

Visible number: +86 181 2245 8657. Link: `tel:+861812245867`. WhatsApp uses `8618122458657`. Clicking Call can dial a different number. This is a known source inconsistency, not evidence that Claude invented the number. Resolve the confirmed destination and keep the pending business decision documented; use shared contact configuration (QOL-06).

### P2: Inquiry validation accepts whitespace-only identity fields

Location: `react-app/src/replica/StaticForm.tsx:20`.

Browser reproduction: enter spaces for Name and Company, review@example.com for Email, and abc for WhatsApp. Preview submission is accepted. Native required validation alone does not reject whitespace; type=tel does not validate a telephone number. Add trimmed required-field validation and useful associated errors without imposing a rigid national phone pattern. Preserve typed values and focus the first invalid field. The explicit “nothing sent” feedback is correct.

### P2: Escape does not close mobile navigation

Location: `react-app/src/components/Header.tsx:21`.

At 390px, open the menu and press Escape. The menu remains expanded. The only global listener is resize, despite the route-change comment. Implement Escape and navigation-change closing with appropriate focus return.

### P2: About and Gallery migration is incomplete

Locations: `react-app/src/pages/About.tsx`, `react-app/src/pages/Gallery.tsx:9`.

About mostly repeats the homepage profile and partner strip, omitting the planned source mission/quality/audience sections. Gallery hardcodes 41 image entries (the comment and status file say 40), without reconciling the 136 original image elements or preserving documented thumbnail/full-size relationships. Reconcile actual source assets before assuming that every original image element represents a unique photo; document intentional duplicates/omissions and preserve ordering.

### P2: Developer review notes are rendered as visitor content

Locations: ProductDetail.tsx, BlogArticle.tsx, Blog.tsx, Terms.tsx, Warranty.tsx and `pages/policy-content/warranty-policy-review.html`.

Visitors see implementation-file references, source-extraction explanations, client-confirmation warnings and editorial review instructions. Warranty embeds a review document including “Issues found in the current version.” The plan explicitly keeps these in developer documents. Separate visitor content from review notes, retaining the required static-form explanation. Do not invent legal terms to fill the Terms gap.

### P2: Several approved usability changes are absent

- QOL-03: FloatingActions always renders Back to top, even at the top of a short page; it has no threshold or useful focus transfer.
- QOL-04: Layout stores only a boolean quote-open state. Product triggers pass no product name; the dialog has no product context.
- QOL-05: The homepage comparison scroll container has no conditional overflow hint or accessible name.
- QOL-08: The new media and reused lightbox have no failed-image feedback/retry handling.
- QOL-01 and QOL-07 need actual long-gallery and throttled-image verification before being marked complete.

### P2: Search and per-route metadata are incomplete

Locations: `react-app/src/pages/SearchResults.tsx:5`, `react-app/index.html`.

The search index only covers six main pages and product summaries. It omits the article and policy content; no search form is rendered in the active pages/shell to let visitors enter or revise a query. Every route inherits the same document title and description. Restore usable search access and meaningful indexing, plus route-specific metadata. Keep preview noindex until production approval.

## Design and completion gaps

- Nunito is loaded and the dark color tokens match the specified palette. The inspected homepage retains the approved section structure.
- The header renders a text wordmark instead of the plan's supplied logo artwork; reconcile this explicitly against the approved mock before changing it.
- Home.css explicitly drops scroll reveals for this pass. Treat motion fidelity as pending, rather than claiming the entire approved interaction design was transferred.
- `docs/design/IMAGE-ASSIGNMENTS.md` is absent; selected-image inspection and crop decisions were required deliverables.
- A complete responsive/reduced-motion/keyboard pass and representative screenshots remain acceptance work, as Claude's own status file states.

## Provisional technical audit score

These are bounded code-review judgments, not Lighthouse scores or WCAG certification.

| Dimension | Score / 4 | Evidence |
| --- | --- | --- |
| Accessibility | 2 | Labels, focus styles and native dialogs present; mobile Escape and validation gaps |
| Performance | 2 | Build is lean enough to load; lazy media present; image sizing and transfer behavior unverified |
| Responsive | 2 | Desktop/mobile shell works in spot checks; full breakpoint acceptance incomplete |
| Theming | 3 | Shared dark tokens and Nunito; repeated hardcoded component colors remain |
| Implementation integrity | 1 | Missing core content, leaked review notes and navigation bug |
| Total | 10 / 20 | Significant work remains |

## Recommended next pass

1. Complete product/article/About content and reconcile Gallery against the source inventory.
2. Fix route scroll behavior and confirmed contact destinations; repair validation and mobile Escape (`$impeccable harden`).
3. Complete the QOL acceptance checklist and responsive table/menu states (`$impeccable adapt`).
4. Separate review notes, restore search, and finish metadata/image assignment records.
5. Verify the required desktop/mobile sizes, keyboard interactions, reduced motion and image failures; then use `$impeccable polish` for the final visual pass.

No application source was changed during this review.
