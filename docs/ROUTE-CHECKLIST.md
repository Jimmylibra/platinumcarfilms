# Route checklist

Status after implementing WEBSITE-IMPLEMENTATION-PLAN.md section 16C in
full. "Full" means the route matches its plan section table (all IDs
present, real extracted content, no invented text). All 26 routes are now
Full except where a genuine source gap is noted.

| Route | Source file | Status | Notes |
| --- | --- | --- | --- |
| `/` | `pages/Home.tsx` | Full | Complete port of the approved mock: hero, stats, profile, banners, material story (8 features, per-card scroll activation), comparison table, audience cards, animated FAQ accordion, partners, final CTA. |
| `/about-us/` | `pages/About.tsx` | Full | All 9 sections (AB01-AB09) from `content/about-us.json`'s own source AST. AB05 has no body text in the source itself -- shown as a note rather than invented copy. |
| `/product/` | `pages/Product.tsx` | Full | All 8 real products, real titles/descriptions/images from `content/index.json`. |
| `/210-paint-protection-film/` | `pages/Product210.tsx` | Full | All 9 sections (P01-P09), real content extracted from the page's own source JSON. Reference template. |
| `/190-micron-ppf/`, `/headlight-paint-protection-film/`, `/matte-paint-protection-film/`, `/satin-paint-protection-film/`, `/gloss-black-paint-protection-film-190-microns/`, `/window-tint-film-for-cars-platinum-car-films/`, `/color-ppf-for-car/` | `pages/ProductPageGeneric.tsx` + `design-data/products/*.json` | Full | Same 9-section template, data-driven per product. 3 of these (headlight, satin, gloss-black) have no comparison-section content in their own source -- that section is omitted rather than invented, matching the others' real structure otherwise. |
| `/gallery/` | `pages/Gallery.tsx` | Full | Complete 136-image ordered register from `GALLERY-ASSIGNMENTS.json`, 24-image batch loading, full lightbox navigation across the set. |
| `/warranty/` | `pages/Warranty.tsx` | Full | All 10 sections (W01-W10) from `content/warranty.json`'s own source AST, not the editorial draft. Contents nav, coverage/exclusions, duration table, conditions, voiding, 5-step claim process, liability limitations, FAQ, contact. Source inconsistencies preserved and logged (see content-decision-log #12, #13). |
| `/contact-us/` | `pages/Contact.tsx` | Full | All 4 sections (C01-C04) from `content/contact-us.json`. Real invitation copy, shared inquiry form. |
| `/blog/` | `pages/Blog.tsx` | Full | The one real article, linked. No invented posts. |
| `/blog/how-long-does-paint-protection-film-last/` | `pages/BlogArticle.tsx` | Full | Complete 27-section article body + 6 real FAQ Q&A pairs, extracted from the article's own source AST. Title/body mismatch (title says "how long," body is a DIY install guide) preserved and logged, not silently retitled. |
| `/blog/category/ppf/`, `/author/autoboost018/` | reuse `Blog.tsx` | Full | Same single-article listing, matching actual site content volume. |
| `/shipping-policy/`, `/privacy-policy/`, `/refund-policy/` | `pages/*Policy.tsx` + `PolicyPage.tsx` | Full | Real compliance-ready drafts, with the authoring preamble (disclaimer/meta-box/"set when published") stripped from the public body per plan instruction. Contents nav generated from real headings. Legal sign-off still pending (in-page note). |
| `/terms-and-conditions/` | `pages/Terms.tsx` | Full | Honest "Terms are not available in this preview" state, per plan T01-T03 -- the source page was never filled in with real terms. |
| `/cart/`, `/checkout/`, `/my-account/` | `pages/LegacyFallback.tsx` | Full | Sales-contact fallback, no fake commerce UI. |
| `/?s=<query>` | `pages/SearchResults.tsx` | Full | Searches product + page titles/descriptions locally. Empty and no-result states present. |
| unknown routes | `pages/NotFound.tsx` | Full | Home/Products/Contact links. |

## Verified

- All 26 routes: HTTP 200, zero console/page errors, zero horizontal
  overflow (Playwright smoke test).
- `npx tsc -b`: zero errors.
- `npx vite build`: succeeds (476KB JS / 41KB CSS, gzipped 134KB / 7.9KB).
- `npx oxlint`: 2 warnings, both pre-existing/harmless (unused var in the
  untouched mock.js; a false-positive "impure function during render" flag
  on a `Date.now()` call that's actually inside a click handler).
- Visual spot-checks: Home, 210, a generic product page, Gallery + lightbox,
  About, Warranty, Privacy Policy, Blog article.

## Known, deliberate gaps (not bugs)

- 16D's detailed motion/timing choreography tables were not individually
  cross-checked against every page's CSS -- the mock's proven patterns
  (FAQ accordion, reveal-on-scroll where used, button states) were reused,
  but M1/M2 timing values weren't audited line-by-line for every section.
- Nunito loads via Google Fonts CDN, not self-hosted (plan's stated
  preference).
- Gallery is the real 136-image register, but individual per-image alt
  text is generic ("gallery image G001") rather than hand-written per
  photo.
- Content gaps that are genuine source gaps, not implementation gaps, are
  listed in `docs/CONTENT-DECISION-LOG.md`.
