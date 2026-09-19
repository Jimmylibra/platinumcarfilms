# Route checklist

Status as of this implementation pass. "Shell" = dark-themed, real title/data,
navigable, no console errors, no overflow -- but not yet the full 16A-depth
layout (feature tables, page-specific FAQs, etc.) described in
WEBSITE-IMPLEMENTATION-PLAN.md section 16A. "Full" = matches the mock's own
depth of polish (currently only the homepage).

| Route | Source file | Status | Notes |
| --- | --- | --- | --- |
| `/` | `pages/Home.tsx` | Full | Complete port of the approved mock: hero, stats, profile, banners, material story (8 features, per-card scroll activation), comparison table, audience cards, FAQ (animated accordion), partners, final CTA. Real interactivity (quote dialog, back-to-top, WhatsApp). |
| `/about-us/` | `pages/About.tsx` | Shell | Company profile + partners reused verbatim from the approved homepage content (same real text). Mission/quality/audience sections from `about-us.json` not yet extracted (source is WordPress AST, needs a cleanup pass). |
| `/product/` | `pages/Product.tsx` | Full | All 8 real products, real titles/descriptions/images from `content/index.json`. Card is a single accessible link, focus-visible, hover state. |
| `/210-paint-protection-film/` through the other 7 product routes | `pages/ProductDetail.tsx` | Shell | Real title, description, and image per product (sourced from `content/index.json`, not invented). Feature/benefit tables, specs, FAQs, and comparisons per 16A section 6 are pending a per-product source pass -- flagged in-page. |
| `/gallery/` | `pages/Gallery.tsx` | Shell | 40 real local factory/production photos with a working lightbox (Escape, prev/next, focus handling). NOT the full 136-image source inventory -- reconciliation against `docs/site-audit/assets.csv` is pending (QOL-01). |
| `/warranty/` | `pages/Warranty.tsx` | Full | Real warranty content (`docs/policies/warranty-policy-review.html`, cleaned up from the live page's actual terms). Conflicting duration/transferability terms flagged in the content-decision log. |
| `/contact-us/` | `pages/Contact.tsx` | Full | Real phone/email/address, map link, and the shared inquiry form (name/company/email/WhatsApp/description, local-only validation, explicit preview messaging). |
| `/blog/` | `pages/Blog.tsx` | Full | The one real article, linked. No invented posts. |
| `/blog/how-long-does-paint-protection-film-last/` | `pages/BlogArticle.tsx` | Shell | Real title + image. Full body extraction pending -- source markup is ~32KB of nested WordPress builder output that needs proper cleanup, not a raw dump. |
| `/blog/category/ppf/`, `/author/autoboost018/` | reuse `Blog.tsx` | Shell | Same single-article listing (matches actual site content volume). |
| `/shipping-policy/`, `/privacy-policy/`, `/refund-policy/` | `pages/*Policy.tsx` | Full | Real compliance-ready drafts (GDPR/PIPL/Gulf-region aware), not placeholder text. Still pending legal sign-off per their own in-page disclaimers. |
| `/terms-and-conditions/` | `pages/Terms.tsx` | Flagged | The source page was never filled in -- it's still the WordPress theme's generic "what to cover in a terms page" boilerplate. Nothing to preserve; flagged as a client content gap, not silently drafted. |
| `/cart/`, `/checkout/`, `/my-account/` | `pages/LegacyFallback.tsx` | Full | Sales-contact fallback, no fake commerce UI. |
| `/?s=<query>` | `pages/SearchResults.tsx` (rendered from `Home.tsx`) | Full | Searches product + page titles/descriptions locally. Empty and no-result states present. |
| unknown routes | `pages/NotFound.tsx` | Full | Home/Products/Contact links. |

## Verified this pass

- All 26 routes above: HTTP 200, zero console/page errors, zero horizontal
  overflow, correct `<h1>` present (Playwright smoke test).
- `npx tsc -b`: zero errors.
- `npx vite build`: succeeds (344KB JS / 29KB CSS, gzipped 107KB / 6.3KB).
- `npx oxlint`: 2 warnings, both pre-existing/harmless (an unused var in the
  untouched mock.js, and a false-positive "impure function during render"
  flag on a `Date.now()` call that's actually inside a click handler).

## Known gaps (not yet done)

- Per-product deep content (8 pages) -- specs, feature tables, FAQs.
- Gallery: full 136-image reconciliation against `docs/site-audit/assets.csv`.
- Blog article body extraction.
- About page mission/quality sections from `about-us.json`.
- Nunito is loaded via Google Fonts CDN, not self-hosted (plan's stated
  preference); works, but not the stated ideal.
- Reveal-on-scroll entrance animations from the mock were not ported (content
  renders immediately instead) -- functional but a visual simplification.
