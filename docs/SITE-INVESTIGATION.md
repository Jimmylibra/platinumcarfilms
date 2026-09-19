# Platinum Car Films — Public Site Investigation

Investigated: 2026-09-17. Reference: [platinumcarfilms.com](https://platinumcarfilms.com/).

## Coverage and confidence

Read the public HTML, linked pages, robots file, both published sitemaps, and selected theme stylesheets. Discovered and fetched **25 distinct page URLs**, all returning HTTP 200. Also inspected search results and a no-results response; an invented missing URL returned HTTP 404.

The site consists of 20 primary content pages, two blog archive pages, and three legacy commerce/account routes. This is the discovered public inventory, not proof that no unlinked pages exist. No private administration, customer records, email delivery, newsletter subscription, or payment processing was accessed or tested. No forms were submitted.

Interactive browser access was unavailable. Screenshots, exact rendered geometry, hover states, responsive layout, animation timing, menu behavior, modal focus, and gallery interaction therefore remain unverified. Source-defined styling and controls are evidence of intended behavior, not proof of browser behavior.

Evidence files:

- [inventory.json](site-audit/inventory.json): page URLs, status, titles, headings, links, image references, form structure, stylesheets, scripts, and discovery responses.
- [supplement.json](site-audit/supplement.json): selected CSS, gallery markup, search and missing-page checks.
- [assets.csv](site-audit/assets.csv): image placements and available alternative text/dimensions. This is a URL inventory, not a downloaded image library.
- [Inventory script](../tools/inventory_public_site.py): repeatable public GET-only crawl; requires Python and BeautifulSoup. Does not submit forms.

Discovery sources: [robots.txt](https://platinumcarfilms.com/robots.txt), [sitemap index](https://platinumcarfilms.com/sitemap_index.xml), [page sitemap](https://platinumcarfilms.com/page-sitemap.xml), [post sitemap](https://platinumcarfilms.com/post-sitemap.xml).

## Platform findings

Public paths and markup identify WordPress, the WoodMart parent/child theme, and WPBakery page-builder assets. Contact Form 7 renders the inquiry and newsletter forms. Joinchat supplies the WhatsApp widget. Rank Math identifies itself in HTML and generates the sitemaps. LiteSpeed Cache and Hostinger Reach assets are also referenced; asset presence alone does not establish complete service configuration.

Google Tag Manager markup is present. Analytics account ownership and configured events are unknown. No functioning product purchase flow was established. The sitemap's commerce routes expose raw WooCommerce shortcodes, and the inspected source does not establish an active WooCommerce installation.

These are findings about the existing site, not requirements to use the same software for the recreation.

## URL inventory

All URLs below are relative to `https://platinumcarfilms.com` and returned 200 during the direct crawl.

| Group | URL | Observed role |
| --- | --- | --- |
| Core | `/` | Long marketing homepage |
| Core | `/about-us/` | Company, capabilities, quality, audiences |
| Core | `/product/` | Eight-card product directory |
| Core | `/gallery/` | Large image gallery |
| Core | `/warranty/` | Coverage, conditions, claims, FAQ |
| Core | `/contact-us/` | Inquiry form, contact details, location |
| Blog | `/blog/` | One published article listing and search |
| Blog | `/blog/how-long-does-paint-protection-film-last/` | Full article |
| Product | `/210-paint-protection-film/` | Platinum 210 |
| Product | `/190-micron-ppf/` | 190 micron film |
| Product | `/headlight-paint-protection-film/` | Headlight film |
| Product | `/matte-paint-protection-film/` | Matte film |
| Product | `/satin-paint-protection-film/` | Satin film |
| Product | `/gloss-black-paint-protection-film-190-microns/` | Gloss black film |
| Product | `/window-tint-film-for-cars-platinum-car-films/` | Window tint |
| Product | `/color-ppf-for-car/` | Colour film |
| Policy | `/shipping-policy/` | Template guidance rather than company shipping terms |
| Policy | `/terms-and-conditions/` | Template guidance rather than finalized terms |
| Policy | `/privacy-policy/` | Template guidance rather than actual data practices |
| Policy | `/refund-policy/` | Template guidance rather than company refund rules |
| Archive | `/blog/category/ppf/` | PPF category archive |
| Archive | `/author/autoboost018/` | Author archive |
| Legacy | `/cart/` | Raw cart shortcode |
| Legacy | `/checkout/` | Raw checkout shortcode |
| Legacy | `/my-account/` | Raw account shortcode |

Search uses `/?s=<query>`. A matching query returns content cards including product pages; an unmatched query shows a no-results message and search control. Search is broader than the blog alone.

## Page structure and content

### Homepage

The [homepage](https://platinumcarfilms.com/) presents a supplier-focused hero, feature highlights, company/range introduction, promotional imagery, material explanation, comparison table, five audience groups, nine FAQ questions, partner area, and closing inquiry actions. It targets both commercial buyers and car enthusiasts. Footer, newsletter, quote dialog markup, and WhatsApp widget are shared elements.

### Company and product directory

[About](https://platinumcarfilms.com/about-us/) includes company introduction, mission, product range, raw-material partners, quality controls, benefits, customer groups, and inquiry actions. It names Lubrizol and Covestro and makes manufacturing/support claims; these are published claims, not independently verified facts.

The [product directory](https://platinumcarfilms.com/product/) links to eight separate landing pages. A recreation must include the destinations, not just the directory cards.

### Product detail template

The eight pages largely share: product introduction with hero media; consultation/gallery actions; problem and cost statements; proposed solution; features/benefits table; audience cards; alternative comparison; FAQs; closing conversion area. Content and imagery differ by product. Some include before/after descriptions; this alone does not establish an interactive comparison slider.

References: [210](https://platinumcarfilms.com/210-paint-protection-film/), [190 micron](https://platinumcarfilms.com/190-micron-ppf/), [headlight](https://platinumcarfilms.com/headlight-paint-protection-film/), [matte](https://platinumcarfilms.com/matte-paint-protection-film/), [satin](https://platinumcarfilms.com/satin-paint-protection-film/), [gloss black](https://platinumcarfilms.com/gloss-black-paint-protection-film-190-microns/), [window tint](https://platinumcarfilms.com/window-tint-film-for-cars-platinum-car-films/), [colour](https://platinumcarfilms.com/color-ppf-for-car/).

### Gallery

The [gallery](https://platinumcarfilms.com/gallery/) contains **136 image elements with 136 distinct effective image URLs** in its main HTML. The initial text-only web extraction missed these lazy-loaded images. Markup links thumbnails to full-size media and includes image dimensions/indexes; PhotoSwipe assets indicate intended lightbox support. Representative thumbnails are 354 × 236 with empty alternative text. The inventory preserves their DOM order. Browser verification is needed for layout, navigation, loading behavior, and whether every source image is reachable.

### Warranty

[Warranty](https://platinumcarfilms.com/warranty/) contains covered/excluded defects, a product-duration table, qualifying conditions, invalidation conditions, a claim process, evidence requirements, liability limitations, seven FAQs, and contact actions. Claims direct users to general contact channels; no dedicated claim-upload or registration form was established.

### Blog

The [blog](https://platinumcarfilms.com/blog/) lists one article, with date, excerpt, search, and recent-post links. The [article](https://platinumcarfilms.com/blog/how-long-does-paint-protection-film-last/) has an author link, category, dates, images, long-form sections, a table, and FAQs. Despite its lifespan title, the content primarily teaches installation. Author/category links expose two additional archives. No comment form was found among the inspected article forms.

### Contact and shared forms

The [contact page](https://platinumcarfilms.com/contact-us/) includes the inquiry form, sales details, and a Google Maps location link. The shared quote dialog uses the same field structure:

| Field | Public form name | Source validation |
| --- | --- | --- |
| Name | `your-name` | Required |
| Company | `company-name` | Required |
| Email | `your-email` | Required, email |
| WhatsApp number | `whatsapp-number` | Required, telephone |
| Product description | `descripe-brief` | Textarea, no required class observed |

Required states are inferred from Contact Form 7 validation classes. The newsletter has one required email field. Delivery recipients, success/error responses, retention, subscription confirmation, and automation remain unknown.

Common contact details: `info@platinumcarfilms.com`, `+86 181 2245 8657`, `+86 153 3807-7719`, and the Guangzhou address shown on Contact. About also displays `platinumcarfims@gmail.com`; resolve the difference before migration.

## Visual evidence from source

The live site, rather than the local static mockup, is the recreation reference. Theme settings define Jost body text, Sora headings, Inter header text, and BankGothic as an alternative font. Baseline values include 18 px body text, 16 px header text, a 1222 px container, orange `#ff691b`, page background `#0a0a0c`, and muted text `#9a9aa3`. Page overrides include white headings, dark panels, fine borders, rounded cards, and large section spacing.

Some homepage heading rules use 45 px desktop sizes and 30 px mobile sizes; media rules include a 767 px breakpoint. Theme configuration is not the final computed style: later rules and page-specific overrides must be checked in a browser. The local homepage uses different typography and should not silently replace the live site's styling.

Public CSS includes fixes disabling stuck scroll-reveal animations and overriding warranty-card backgrounds. These comments document prior intent; they are not proof that current runtime defects persist.

## Content and scope issues to resolve

| Issue | Evidence | Recreation treatment |
| --- | --- | --- |
| Warranty transferability conflict | Product FAQs describe transferable coverage; Warranty says non-transferable | Preserve the finding; obtain a single approved rule before public release |
| Headlight warranty conflict | Detail page says ten years; Warranty table says two to five | Resolve by product, rather than choosing a value silently |
| Thickness terminology | Platinum 210 repeatedly uses “210-mil,” while another product is expressed in microns | Require an approved specification; do not silently convert the claim |
| Copied comparison content | Gloss-black comparison describes satin protection | Correct only with agreed product content |
| Editorial scaffolding | Product copy contains internal marketing labels and bracketed certification/warranty placeholders | Distinguish faithful reference capture from release-ready copy |
| Policy templates | All four policy pages explain what policies should contain | Retain routes; obtain actual policies before release |
| Blog mismatch | Article title promises lifespan information, body focuses on installation | Preserve URL; decide whether to revise title or body |
| Legacy commerce | Cart, checkout, and account expose raw shortcodes | Decide retain, redirect, or remove; do not infer a payments project |
| Conflicting contact email | About differs from common footer/contact address | Confirm authoritative recipient |

## Remaining verification

1. Capture desktop/mobile screenshots for each page template and representative long pages.
2. Exercise header/menu, sticky behavior, quote dialog, FAQs, lightbox, slider controls, search pagination, and scroll-to-top.
3. Verify actual media loading, image order, logos, font files, and responsive cropping.
4. Test form and newsletter delivery only on an authorized test setup with known recipients.
5. Confirm source-site admin/content export access if an exhaustive migration, unpublished content, or backend parity is required.

The updated [requirements document](../REQUIREMENTS.md) turns these findings into implementation scope without selecting a framework.
