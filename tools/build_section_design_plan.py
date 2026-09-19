"""Build the source-grounded section schedule inside the existing handoff plan.

Planning only: does not alter application code or original media.
Selected assets were inspected during the design-planning pass.
"""
import json
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'react-app/public'
DESIGN = ROOT / 'docs/design'
PLAN = ROOT / 'docs/WEBSITE-IMPLEMENTATION-PLAN.md'
KEY = json.loads((DESIGN / 'selected-assets.json').read_text(encoding='utf-8'))
KEY['49'] = '/assets/original/64f0dbbda455-logo.png'
INDEX = json.loads((PUBLIC / 'content/index.json').read_text(encoding='utf-8'))
PAGES = {p['route']: json.loads((PUBLIC / p['file'].lstrip('/')).read_text(encoding='utf-8')) for p in INDEX}


def walk(node):
    if isinstance(node, dict):
        yield node
        for child in node.get('children', []):
            yield from walk(child)


def text(node):
    return node if isinstance(node, str) else ''.join(text(c) for c in node.get('children', []))


def headings(route, level='h2'):
    return [re.sub(r'\s+', ' ', text(n)).strip() for n in walk(PAGES[route]['content']) if n.get('tag') == level]


GALLERY = [n for n in walk(PAGES['/gallery/']['content']) if n.get('fullImage')]
lines = []
coverage = []


def write(s=''):
    lines.append(s.strip() + '\n')


def table(headers, rows):
    write('| ' + ' | '.join(headers) + ' |\n| ' + ' | '.join('---' for _ in headers) + ' |')
    for row in rows:
        write('| ' + ' | '.join(str(c).replace('|', '/') for c in row) + ' |')


def page(route, name, source, sketch, rows):
    write(f'### {name}: `{route}`\n\n**Content source:** {source}\n\n**Composition:** {sketch}')
    table(['ID / section and content', 'Background and exact image', 'Desktop composition', 'Mobile composition', 'Interaction / motion'], rows)
    coverage.append({'route': route, 'sections': len(rows), 'source': source})


write('''## 16C. Authoritative page-by-page, section-by-section design schedule

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
''')
table(['Section', 'Background / image', 'Desktop', 'Mobile', 'Behavior'], [
    ['Header', 'B0; A49 supplied logo, contain, no crop', '88px high; logo 210px wide, natural aspect; seven nav links, search button and quote action', '72px high; logo 175px wide; search/menu controls; quote within menu', 'Current route indicated, product detail marks Products; menu closes on link, Escape and route change; focus returns; internal route starts at top, Back restores position'],
    ['Mobile menu', 'B0 at 98% opacity; None', 'Not rendered as a duplicate desktop menu', 'Panel below header; max-height calc(100dvh - 72px); overflow auto; seven links then quote', '44px targets; menu button aria-expanded/controls; no background focus trap unless implemented as a true modal'],
    ['Footer', 'B1; A49 logo at 190px wide, contain', 'Four columns: brand/social, contact, nav, newsletter; policies below', 'Two columns tablet; one column phone; groups stay expanded', 'Real contact config; do not show inactive social icons as usable links; preview-only newsletter feedback'],
    ['Quote dialog', 'Backdrop black 70%; B2 dialog; None', 'Max-width 640px; title then optional product name; paired Name/Company and Email/WhatsApp fields; optional message', 'Width calc(100% - 32px), max-height calc(100dvh - 32px), scroll body; fields stack', 'Product context local; trimmed required fields, field-associated errors, no network send; Escape closes; return focus; hide floating actions'],
    ['Gallery overlay', 'Backdrop black 92%; image BI; current G image only', 'Image max 88vw by calc(100dvh - 120px); separate close, count, previous/next', '44px controls in reserved top/bottom bars; image never beneath buttons', 'MV; open selected item, arrows navigate full manifest, error keeps controls and Retry; restore originating tile and loaded batches'],
    ['Floating contact and Back to top', 'B2 circles; None', 'Bottom/right 24px, separated 12px', '16px plus safe-area insets; do not cover forms or footer actions', 'Back to top appears after one viewport and transfers focus to main heading; hide both during modal; reduced-motion instant scroll'],
])

page('/', 'Home', '`public/mock/index.html`, `mock.css`, `mock.js` and `content/home.json`; content index route `/`',
     'Desktop: full-width car opening > compact stats > text/image profile > banners > sticky material image/cards > comparison > audience > FAQ > flags > inquiry. Mobile keeps that order.', [
    ['H01 Opening', 'A01; B0 plus approved left-to-right black scrim; keep mock scrim values', 'Copy left max 760px, car rear visible right; preserve mock media inset/mask and cover focal 50% 57%', 'Copy top; use mock responsive media inset and 50% 57% focal point; natural content height, never force 100vh; adjust only to prevent text/car collision', 'Approved mock entrance timings specified in 16D; actions to quote and profile; no autoplay video'],
    ['H02 Existing statistics', 'B1; None', 'Four equally spaced values in one row, thin dividers', '2 x 2, no carousel', 'M0; show source final values; no invented metrics'],
    ['H03 Company Profile / What We Supply', 'B1; A02 factory roll-line photograph, 4:3 cover focal 50% 50%', 'Copy 58%, photograph 42%; source list and concluding paragraph all present', 'Copy then 4:3 photograph; no image behind copy', 'M1 once; photograph illustrative, not certification evidence'],
    ['H04 Promotional banners', 'B0; A03, A04, A05, A06 in this order', 'Natural 1920:649 ratio, contain; controls below image', 'Same full uncropped artwork; tap to enlarge; labels remain HTML', 'Manual scroll-snap carousel; arrows/dots and keyboard. If approved autoplay is retained, expose Pause and honor hover/focus/visibility/reduced motion'],
    ['H05 Material story introduction', 'B0; None', 'Kicker, two-line H2 and source introduction max 760px', 'Full gutter width, no image', 'M0; Explore specifications links to Products'],
    ['H06 Eight material features', 'B0 parent; B2 cards; A43/A42/A23/A44/A45/A46/A47/A48 in exact feature order', 'Sticky image left 44%, eight readable feature cards right 56%; image contain in fixed reserved frame; source copy below each trigger', 'Hide decorative sticky panel as approved; all eight feature texts remain in order, no sticky behavior', 'Preserve mock active-image behavior; MF is not used here; click/keyboard chooses feature, reduced-motion immediate change; map detailed below'],
    ['H07 Supplier comparison', 'B1; None', 'H2 then all source comparison rows in semantic four-column table', 'Same table in labeled overflow region; show horizontal hint only when overflow exists', 'M0; keyboard-scrollable table, no reveal of individual rows'],
    ['H08 Five buyer audiences', 'B0; None; use existing icon system', '3 cards first row, 2 second row aligned to grid; every source CTA retained', 'One column; no horizontal swipe-only cards', 'M1 section/M2 actions; quote vs navigation determined by existing CTA intent'],
    ['H09 FAQ', 'B1; None', 'Intro 34%, nine source answers 66%; first open as approved', 'Intro then full-width questions', 'MF; verify close and switching questions, no answer disappears on unrelated rerender'],
    ['H10 Existing partner area', 'B0; A07/A08/A13/A09/A10/A11/A12, this order', 'Seven country-flag artworks, square contain at 112px; keep source heading pending copy review', 'Two-column grid with 16px gaps; last aligned left; no marquee', 'M0; alt identifies flag country; do not describe these as company logos or certification badges'],
    ['H11 Closing inquiry', 'B3 with the approved mock CTA glow only; None', 'Source heading and both source paragraphs max 800px; quote/email actions inline', 'Text then stacked actions; no repeated car photo', 'M1; quote opens dialog; email uses shared config'],
])
write('**H06 exact mapping:** Polymer base A43; Material positioning A42; Adhesive layer positioning A23; Self-healing topcoat A44; Nanoceramic topcoat A45; Anti-yellowing/high clarity A46; Thickness options A47; OEM/ODM A48. This preserves the approved illustrative mapping; none of these photographs establishes the claimed physical property.')

page('/product/', 'Product directory', '`content/product.json`',
     'Plain heading > eight poster cards > compact help choosing strip. No background-photo opening.', [
    ['D01 Title', 'B0; None', 'Breadcrumb, original H1, short source intro max 720px', 'Same, natural height, 24px bottom gap', 'M0'],
    ['D02 Eight products', 'B0; B2 cards; A17/A29/A30/A31/A32/A33/A41/A35 in source order', '4 columns >=1200px; 3 at 1024px; image 4:5 contain, 16px inset; title, source summary, View product label', '2 columns tablet; 1 below 600px; poster max-height 340px; copy not truncated', 'M2 whole-card link, no nested buttons; retain directory scroll position on Back; no filtering for eight items'],
    ['D03 Help choosing', 'B3; None', 'One concise functional line and Contact action, horizontal', 'Text then action; not another large CTA hero', 'M0; no new business claims'],
])

# All eight pages get an explicit independent schedule using their own source headings.
PRODUCTS = [
    ('/210-paint-protection-film/', '210 PPF', 'A17', 'A18', '210 thickness positioning, protection and source comparison; retain all 210-specific warranty/cost statements for review', '/190-micron-ppf/', '/gloss-black-paint-protection-film-190-microns/'),
    ('/190-micron-ppf/', '190 Micron PPF', 'A14', None, '190 thickness and the source feature table; do not use the acid-green color example as proof of clear-film finish', '/210-paint-protection-film/', '/matte-paint-protection-film/'),
    ('/headlight-paint-protection-film/', 'Headlight PPF', 'A26', 'A47', 'headlight damage and visibility; keep the headlight warranty conflict in the decision log; A47 is a headlamp detail illustration only', '/210-paint-protection-film/', '/window-tint-film-for-cars-platinum-car-films/'),
    ('/matte-paint-protection-film/', 'Matte PPF', 'A28', None, 'matte finish preservation; do not insert a glossy-car photograph into the finish explanation', '/satin-paint-protection-film/', '/210-paint-protection-film/'),
    ('/satin-paint-protection-film/', 'Satin PPF', 'A36', None, 'low-gloss satin finish; no crimson sedan image presented as measured satin finish evidence', '/matte-paint-protection-film/', '/gloss-black-paint-protection-film-190-microns/'),
    ('/gloss-black-paint-protection-film-190-microns/', 'Gloss Black PPF', 'A25', 'A21', 'gloss black finish and 190-micron source details; illustrative car/roll composite, never a before/after pair', '/satin-paint-protection-film/', '/color-ppf-for-car/'),
    ('/window-tint-film-for-cars-platinum-car-films/', 'Window Tint', 'A41', 'A06', 'ceramic tint, heat and signals; poster contains 5% VLT but must not imply the only available or universally legal grade', '/headlight-paint-protection-film/', '/210-paint-protection-film/'),
    ('/color-ppf-for-car/', 'Color PPF', 'A22', None, 'color-change plus protection; existing color visuals are examples, not an available-stock or guaranteed color-match catalogue', '/gloss-black-paint-protection-film-190-microns/', '/matte-paint-protection-film/'),
]

for route, name, primary, secondary, distinction, related1, related2 in PRODUCTS:
    hs = headings(route)
    assert len(hs) == 7, (route, hs)
    rows = [
        ['P01 Product introduction', f'B0; {primary} in BI, 4:5 contain at 50% 50%, no overlay', '55% copy / 45% poster, 48px gap; original H1, complete intro, source actions; source mini-promises remain ordinary text', 'Title, intro, quote/gallery actions, then uncropped poster max-height 340px; no photo backdrop', 'M0 copy, M2 actions; product name passed to quote dialog; poster may enlarge'],
        [f'P02 {hs[0]}', 'B1; None', 'Source problem paragraph max 800px; original three figures/cost explanations in a 3-column ruled strip, not giant promotional numbers', 'Full paragraph then one-column figures with explanatory labels', 'M0; preserve qualifications/currencies, no animated counters; source encoding repairs only'],
        [f'P03 {hs[1]}', f'B0; {secondary + " in BI, contain, natural aspect ratio" if secondary else "None; intentionally text-led"}', 'Source solution paragraphs, source feature/benefit checklist; '+('60% copy / 40% media' if secondary else '800px copy with checklist in two columns')+'; before/after statements as labeled text, not fabricated photos', 'Copy, checklist, then image if assigned; before/after text stacks; retain full wording', 'M1; '+distinction],
        [f'P04 {hs[2]}', 'B1; None', 'Semantic Feature / Advantage / Benefit table, all source rows; 28/32/40% columns. Any source specification list follows as a definition list', 'Scrollable table min-width 640px in named region with conditional hint; no page overflow', 'M0; do not invent a technical specifications block when none exists'],
        [f'P05 {hs[3]}', 'B0; B2 panels; None', 'Four source audience groups in 2 x 2, each with original description and CTA', 'One column; CTA aligns after its own text', 'M1/M2; no stock people photographs; context-aware inquiry actions'],
        [f'P06 {hs[4]}', 'B1; None', 'All source comparison rows in a semantic table; first column label, remaining source columns unchanged', 'Labeled overflow region, conditional scroll hint and keyboard access', 'M0; preserve unsupported claims for review, never add superiority scores'],
        [f'P07 {hs[5]}', 'B0; None', 'H2 left 30%, all product-specific questions right 70%, max overall 1100px', 'Heading then full-width accordion; all answers retained', 'MF; these are this product’s questions, not the homepage FAQ copied eight times'],
        [f'P08 {hs[6]}', 'B3; None', 'Original closing paragraph followed by three compact action groups with their source explanations', 'Action groups stack; quote button full-width only within its group', 'M0/M2; consultation and quote open static product-context dialog, gallery navigates; preserve actions without claiming appointment booking'],
        ['P09 Related navigation', 'B0; None', f'Two simple text links: `{related1}` and `{related2}`, plus All products; no repeated poster grid', 'Vertical links with 44px tap targets', 'M0; new route top, Back restores previous scroll'],
    ]
    if route == '/color-ppf-for-car/':
        rows.insert(4, ['P04a Supplied color examples', 'B0; G032-G039 in exact register order, BI 16:9 contain', 'Two columns of supplied color illustrations with filename-derived color labels; small caption “Illustrative color examples”', 'One column, full artwork including inset swatch; no simulated recoloring', 'M2/MV on image; preserve source color-range copy here; no stock status, dropdown inventory, or promise of exact screen color match'])
    page(route, name, '`content/' + route.strip('/') + '.json`',
         'Compact split intro > source problem > solution > feature table'+(' > color examples' if route == '/color-ppf-for-car/' else '')+' > audiences > comparison > FAQs > closing actions > related links. '+distinction+'.', rows)
    subheads = headings(route, 'h3')
    write('**Source subheading coverage:** '+ '; '.join('`'+s+'`' for s in subheads)+'. Keep their associated paragraphs in P02, P05 and P08 respectively; reconcile encoding against the archived HTML, not guesses about numerical values.')
    if not secondary:
        write('**Additional source artwork disposition:** the repeated source solution illustration is not promoted to a new product proof image. Preserve substantive HTML content in P03. Any source artwork carrying unique text must have that text mapped into P03/P04 before its duplicate/decorative placement is omitted; record this in the image assignment log.')

page('/about-us/', 'About', '`content/about-us.json`',
     'Short title > profile split > mission text > supply catalogue > material names > quality editorial split > benefits > audiences > contact. No separate photographic hero.', [
    ['A01 Title', 'B0; None', 'Breadcrumb and About Us H1, compact opening', 'Same', 'M0'],
    ['A02 We Are a Team Passionate About Car Protection', 'B0; A19 product-box stack, square contain in BI', '58% source intro / 42% media; all four source statistics directly below copy, modest 24px numbers', 'Copy, source figures 2 x 2, then square illustration max-width 360px', 'M1; boxes are product illustration, not a team portrait'],
    ['A03 Reliability, Aesthetics, and a Professional Approach', 'B1; None', 'Source mission in 800px reading column; preserve both additional source facts as inline callouts', 'One column, no oversized counters', 'M0; no invented timeline/history'],
    ['A04 What We Supply', 'B0; None', 'Six source offerings as three rows of two editorial blocks, thin row dividers; actual product links on film categories', 'Six stacked blocks; no repeated icons needed', 'M0/M2 links; preserve PPF, window film, color, OEM, selection help and shipping copy'],
    ['A05 Built on World-Class Materials', 'B1; None', 'Source intro and source material supplier names in a simple two-column text layout', 'Names and source descriptions stack', 'M0; no flags substituted for supplier logos; no invented certification seals; claims stay in decision log'],
    ['A06 How We Consistently Control Quality', 'B0; G054 equipment photo, 3:2 contain, no crop', 'Photo 42% / four numbered source quality explanations 58%; 01-04 rail rather than four identical image cards', 'Four explanations then photo; preserve all four headings', 'M1; caption “Equipment shown in supplied gallery”; do not identify equipment function or ownership beyond evidence'],
    ['A07 With Us You Get', 'B1; None', 'Six source benefits in 3 x 2 text grid; 24px headings and short source descriptions', 'One column, subtle separators', 'M0; no decorative stock images'],
    ['A08 Who We Work With', 'B0; None', 'Five source audience groups as an editorial list: label 30%, description 70%; source intro above', 'Label above each description, 24px row gap', 'M0; avoids repeating homepage card wall'],
    ['A09 Start a Conversation', 'B3; None', 'Original closing text and source contact actions; quote + Contact primary/secondary', 'Actions stack; long contact details wrap', 'M2; source conflicting email remains logged, no silently invented contact authority'],
])

page('/gallery/', 'Gallery', '`content/gallery.json`; exact 136-item register below',
     'Plain title > ordered image grid > Load more/count > shared footer. No decorative hero, invented categories or factory-only selection.', [
    ['G01 Title', 'B0; None', 'Breadcrumb, Gallery H1 and short functional introduction “Product imagery and production photos”', 'Same, 20px gap to first images', 'M0; no claim all images are customer installations'],
    ['G02 Ordered grid', 'B0; BI tiles; G001-G136 in register order', '4 columns >=1200px, 3 at 1024px, 2 tablet; 16px gaps; 4:3 reserved frames; posters contain, photos contain for this preservation pass', '2 columns 390px, 1 at 320px; no crop of text, rolls or machinery', 'M2; render first 24, lazy thumbnails; full-size only when opened; never shuffle or silently remove source items'],
    ['G03 Progressive loading', 'B0; None', 'Centered Load more button and “Showing 24 of 136” initially; add 24 per action, final batch 16', '44px minimum button, count above it', 'M0; preserve batches and scroll when viewer closes; announce count without moving focus unexpectedly'],
    ['G04 Viewer', 'Black 92% backdrop; active fullImage from register', 'MV controls and image-size limits from shared overlay section', 'Same behavior; swiping optional, buttons always present', 'MV; each thumbnail opens corresponding fullImage, not its low-res crop; all 136 reachable'],
    ['G05 Failed-image state', 'BI frame; no replacement car photo', 'Image unavailable text and Retry inside reserved tile/viewer area', 'Same; Close/Next remain reachable', 'M0; do not collapse tile or automatically retry forever'],
])
write('**Gallery orientation:** G105-G120 and G129-G136 visibly include sideways supplied images in the inspected contact sheets. Inspect the full-resolution image and create an orientation-corrected derivative only where required, keeping the original unchanged and recording the rotation. This plan does not guess a universal rotation angle. Do not crop or stretch to conceal orientation. The register preserves all 136 source entries; source promotional claims remain unverified, and category labels must not invent customer provenance.')

wh = headings('/warranty/')
page('/warranty/', 'Warranty', '`content/warranty.json`, not the editorial wrapper in warranty-policy-review.html',
     'Compact H1 > anchor contents > coverage/exclusions > duration > conditions > voiding > existing claim instructions > limitations > FAQs > contact. Reading-first, no car backdrop.', [
    ['W01 Title and source overview', 'BT; None', '800px copy column; full source introductory text, compact H1', 'Same inside gutters', 'M0; conflicts in developer log, not review banners'],
    ['W02 Contents', 'BT; None', 'Wrapping anchor links to all nine body sections', 'Native expandable On this page list', 'M0; scroll-margin-top 112px desktop/88px mobile'],
    ['W03 What Is Covered', 'B1; None', 'Two columns: Covered manufacturing defects / Not covered exclusions; retain every bullet', 'Covered then exclusions; text labels plus icons, not red/green alone', 'M0'],
    ['W04 Warranty Duration by Product', 'BT; None', 'Semantic table with all source rows and qualifiers; no invented warranty badges', 'Labeled table scroll region with conditional hint', 'M0; preserve conflicting source facts for owner resolution'],
    ['W05 Warranty Conditions', 'BT; None', 'Six numbered text items, two columns: installation, maintenance, product, use, proof, reporting', 'One ordered list', 'M0'],
    ['W06 What Voids the Warranty', 'B1; None', '800px reading list, source exclusions complete', 'Same, no warning illustration', 'M0'],
    ['W07 How to Make a Warranty Claim', 'BT; None', 'Five-step vertical ordered list, plus source message checklist in B2', 'Same linear sequence, no horizontal timeline', 'M0; instructions only; no registration/claim upload UI'],
    ['W08 Limitations of Liability', 'BT; None', 'Four source subsections as H3 and paragraphs, max 800px', 'Same reading flow', 'M0; do not generate legal revisions'],
    ['W09 Frequently Asked Questions', 'BT; None', '800px accordion with all source questions and answers', 'Full gutter width', 'MF'],
    ['W10 Submit a Claim or Ask a Question', 'B3; None', 'Source contact links; original claim/contact reference resolves to Contact', 'Stacked 44px actions', 'M2; no claim of a new claim-processing system'],
])

page('/contact-us/', 'Contact', '`content/contact-us.json`; existing five-field contract',
     'Plain title > contact details beside form > source supporting contact copy. No stock image, decorative map or hero.', [
    ['C01 Title', 'B0; None', 'Breadcrumb and Contact Us H1; short existing source invitation', 'Same, no big gap', 'M0'],
    ['C02 Contact details', 'B0; None', 'Left 38%: phone numbers, email, source support copy and address as labeled groups; map link below address', 'Details before form; phone/email inline actions, map link opens external map', 'M0/M2; shared verified destinations, no invented hours or interactive embedded map'],
    ['C03 Inquiry form', 'B2 on B0; None', 'Right 62%: Send us an email title; paired name/company and email/WhatsApp; full-width optional description, preview notice and submit', 'One column, labels above fields, full-width action; avoid forced form height', 'M0; trim required fields, appropriate email/tel, international-friendly validation; errors associated and focused; values preserved; nothing sent'],
    ['C04 Existing supporting copy', 'B1; None', 'Preserve the source supporting paragraph under a small heading; source label “Frequently Asked Questions” does not justify fabricated questions', 'Single paragraph; no empty FAQ accordion', 'M0; if label is editorially corrected, log that copy-only change'],
])

for route, name, title in [('/blog/', 'Blog index', 'Blog'), ('/blog/category/ppf/', 'PPF category', 'PPF'), ('/author/autoboost018/', 'Author archive', 'Posts by autoboost018')]:
    page(route, name, '`content/'+ ('blog' if route == '/blog/' else route.strip('/').replace('/', '__')) +'.json`',
         'Compact route-specific title > one real article row > search/recent-post utility. No invented articles, avatar or hero.', [
        ['B01 Title', 'B0; None', f'Breadcrumb and H1 “{title}”; category/author context as source supplies it', 'Same', 'M0; do not label all archives simply Blog'],
        ['B02 Article listing', 'B0; A20 square contain, BI', 'Article row: 300px image left, title/source date/category/author/excerpt right; one real article only', 'Square image max-height 320px then metadata/title/excerpt; no blank grid slots', 'M2 link to article; use actual source metadata; no inferred date/year'],
        ['B03 Search and Recent Posts', 'B1; None', 'Search field and source recent-post link in two columns; no duplicate large article card', 'Search then recent link, 24px gap', 'M0; search submits to /?s= and preserves query'],
    ])

article = '/blog/how-long-does-paint-protection-film-last/'
article_rows = [
    ['E01 Article title and metadata', 'BT; None', '800px reading column; original H1, actual date/category/author links and introductory paragraphs', 'Same; 30px H1, metadata wraps', 'M0; title/body mismatch logged, not silently rewritten'],
    ['E02 Lead illustration', 'BT; A21 square contain, BI', 'Max-width 640px centered in reading column; source illustration and actual caption if present', 'Natural square ratio, full width; no crop', 'M0; no other invented installation photos'],
    ['E03 Contents', 'BT; None', 'Anchor list of actual body headings below image', 'Native expandable On this page', 'M0; anchors offset sticky header'],
]
for i, heading in enumerate(headings(article), 4):
    if heading == 'Recent Posts':
        detail = 'Single existing recent-post text link and search utility after article; do not duplicate the full card'
    elif heading == 'FAQ':
        detail = 'All source questions/answers in native details, 44px triggers; preserve full answers'
    elif heading == 'Conclusion':
        detail = 'Complete source conclusion in normal paragraphs; no new sales claims or promotional banner'
    else:
        detail = 'Original heading and every following source paragraph/list/table up to the next heading; 32px top spacing, 16px paragraph gaps'
    article_rows.append([f'E{i:02} {heading}', 'BT; None', detail, 'Same sequence; lists wrap; any table scrolls inside a labeled region; no paragraph reveal', 'MF' if heading == 'FAQ' else 'M0'])
page(article, 'Full article', '`content/blog__how-long-does-paint-protection-film-last.json`',
     'Plain title/metadata > source introduction > one lead illustration > contents > each of the following source body sections > recent-post/search utility. Every heading is explicitly listed below.', article_rows)

# Policies reuse a reading system but list every available subsection per route.
for slug, name in [('shipping-policy', 'Shipping Policy'), ('privacy-policy', 'Privacy Policy'), ('refund-policy', 'Refund Policy')]:
    html = (ROOT / f'react-app/src/pages/policy-content/{slug}.html').read_text(encoding='utf-8')
    hs = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', html, flags=re.S)
    rows = [
        ['L01 Title and confirmed metadata', 'BT; None', '800px reading column; single H1; actual approved effective date only, never manufacture one', 'Same', 'M0'],
        ['L02 Contents', 'BT; None', 'Plain anchor list matching headings below', 'Expandable On this page', 'M0'],
    ]
    for i, h in enumerate(hs, 3):
        h = re.sub('<[^>]+>', '', h)
        rows.append([f'L{i:02} {h}', 'BT; None', 'Preserve this existing draft subsection and its lists/tables in the 800px reading flow; 32px section gap; no card or illustration', 'Same order/wording; tables get contained horizontal scrolling and conditional hint', 'M0; contact links use shared config'])
    page('/'+slug+'/', name, f'Existing `pages/policy-content/{slug}.html` draft plus original `content/{slug}.json` evidence; client approval still required',
         'Plain title > confirmed metadata > contents > all enumerated draft clauses. No hero/photo, animated text, repeated CTA band or decorative legal icon.', rows)
    write('**Draft handling:** existing draft structure is used for layout planning, not legal approval. Do not render the authoring preamble, “what this document is,” compliance claims, source-review boxes or instructions such as “set when published” as policy body. Keep unresolved inputs in the developer decision log and block production sign-off until resolved. Preserve original source evidence and all substantive draft clauses; do not invent missing legal facts.')

page('/terms-and-conditions/', 'Terms & Conditions', '`content/terms-and-conditions.json`; no approved substantive terms available',
     'Plain title > honest unavailable-content state > Contact link. Finished visual layout can be specified; missing legal terms cannot be fabricated.', [
    ['T01 Title', 'BT; None', '800px reading column, single H1 and breadcrumb', 'Same', 'M0'],
    ['T02 Content unavailable', 'BT; None', 'Short functional notice “Terms are not available in this preview.” No WordPress placeholder or developer file references', 'Same, natural height', 'M0; remains a documented content blocker'],
    ['T03 Contact action', 'BT; None', 'Simple Contact link, no promotional strip', '44px target', 'M2; replace T02 with approved clauses and contents only when supplied'],
])

page('/?s=', 'Search including empty and no-result states', 'Compact local index derived from all retained content; no network service',
     'Title > editable query form > count > text results OR empty/no-result state. No image cards.', [
    ['S01 Title and query', 'B0; None', '900px column, Search H1, visible labeled search field and button; query reflected in input and heading', 'Field and button wrap without squeezing; query breaks safely', 'M0; trim input; Enter submits; URL preserves query/Back/Forward'],
    ['S02 Results', 'B0; None', 'Count then one-column rows: title link, content type and real excerpt; 24px vertical spacing and thin rules', 'Same, no thumbnails', 'M2 links; include products, article, main and available policy text; no fake relevance scores'],
    ['S03 Empty query', 'B0; None', 'Short prompt “Enter a word or product name to search.” plus Products link', 'Same', 'M0; no loading spinner for an empty query'],
    ['S04 No results', 'B0; None', 'Echo query, offer revised query and Products/Contact links', 'Links stack as needed', 'M0; never replace with unrelated popular products'],
])
for route, title, message in [('/cart/', 'Cart', 'Online ordering is not available. Contact us about products and pricing.'), ('/checkout/', 'Checkout', 'Online checkout is not available. Contact us to discuss an order.'), ('/my-account/', 'My Account', 'Online account access is not available. Contact us for assistance.')]:
    page(route, title+' fallback', 'Static sales-contact fallback required by the plan', 'Plain compact title > explanation > recovery links. No hero or fake transaction UI.', [
        ['F01 Title', 'B0; None', f'720px column, {title} H1, 48px top padding; no viewport min-height', '24px top padding', 'M0'],
        ['F02 Explanation', 'B2 on B0; None', message, 'Same; natural panel height', 'M0'],
        ['F03 Recovery actions', 'B0; None', 'Products and Contact links below panel, inline', 'Stacked 44px targets', 'M2; no cart counts, payment, login/password or account creation fields'],
    ])
page('/*', 'Unknown route / 404', 'Router fallback', 'Compact recovery page, no cinematic error illustration.', [
    ['N01 Missing page', 'B0; None', '720px reading column; small 404 marker, Page not found H1, concise explanation', 'Same, 24px top padding', 'M0; no animated digits'],
    ['N02 Recovery actions', 'B0; None', 'Home, Products and Contact links, inline', 'Stack as needed, 44px targets', 'M2; working destinations; host must provide appropriate missing-page HTTP behavior'],
])

write('''### Exact image register and crop instructions

All A assets below were visually inspected in the planning pass (49 including the supplied logo). All 136 G entries were viewed in contact sheets; this establishes visible subject and broad suitability, not ownership, product performance, legibility at final size or production approval. Selected placements are specified by section ID above. Dimensions are intrinsic; never stretch to fill. Exact URLs resolve under `react-app/public`.

Default for A02 only: 4:3 cover, focal 50% 50% at desktop/mobile. A01 uses the homepage focal settings above. All other assigned A images use contain at 50% 50%, natural ratio unless the section specifies a reserved frame; original light backgrounds are retained. No image filter may change film color/finish. Offscreen images lazy-load and have dimensions/aspect-ratio reserved; the single visible opening image is eager. A49 logo has empty alt inside an already named Home link, otherwise alt “Platinum PPF.”
''')
descriptions = [
    'Black sports car rear quarter', 'Worker beside film production roll', 'TPU color PPF promotional banner', 'Dealer recruitment promotional banner', 'Film-layer construction diagram', 'Window tint percentage example banner',
    'Uzbekistan flag artwork', 'Russia flag artwork', 'Iraq flag artwork', 'Kuwait flag artwork', 'Turkey flag artwork', 'India flag artwork', 'Pakistan flag artwork',
    '190 micron PPF poster with car and rolls', 'Acid Green car color illustration', 'Autumn Blue car illustration', '210 PPF poster with car and rolls', 'Car, film rolls and close-up composite', 'Stack of Platinum product boxes', 'Black car and film roll illustration, resized', 'Black car and film roll illustration, full-size',
    'Color PPF promotional poster', 'Film being applied to a silver car', 'Dark car promotional square with wording', 'Gloss black 190 micron PPF poster', 'Headlight PPF poster', 'Dark SUV and film roll composite', 'Matte PPF poster',
    '190 micron directory poster', 'Headlight directory poster', 'Matte directory poster', 'Satin directory poster', 'Gloss black directory poster', 'Small cropped general film-maker artwork', 'Color directory poster', 'Satin PPF poster', 'Crimson car color illustration', 'White sports car photograph', 'Blue sports car photograph', 'Dark car and circular detail composite', 'Window tint ceramic poster including 5% VLT wording',
    'Protective film applied to a pale car bonnet', 'Film and water on a dark car front panel', 'White car side and wheel', 'Car headlamp detail in warm light', 'Orange sports car in trees', 'Close-up of a dark car headlamp', 'Dark green sports car in a light garage', 'Supplied orange Platinum PPF logo',
]
excluded = {15:'Use G032 on color page only, not clear-190 finish proof',16:'Do not reuse as a background on every product page',24:'Not selected: text-led matte solution avoids generic glossy illustration',27:'Not selected: no direct headlight-specific proof',34:'Rejected as tint lead: low-resolution general film-maker crop',37:'Use G033 on color page only, not satin-finish proof',38:'Not selected: no decorative gallery/policy hero',39:'Not selected: no decorative Terms hero',40:'Not selected: Warranty is text-led'}
asset_rows = []
for k, url in KEY.items():
    i = int(k)
    with Image.open(PUBLIC / url.lstrip('/')) as im:
        w,h=im.size
    disposition = excluded.get(i, 'Selected where explicitly named in the route schedule; otherwise do not repeat')
    asset_rows.append([f'A{i:02}', '`'+url+'`', f'{w} x {h}', descriptions[i-1], disposition])
table(['ID', 'Exact URL', 'Dimensions', 'Visible subject / alt starting point', 'Assignment status'], asset_rows)

write('''### Exact gallery order and thumbnail/full-image pairing

Each filename below is relative to **`/assets/original/`**. This table is the definitive ordered assignment for G02 and G04; do not glob or sort filenames. All 136 pairs exist locally. Preserve each pair even when the thumbnail crop differs from the full artwork. For text-heavy posters use an uncropped thumbnail derivative if the archived thumbnail loses essential content; derive it from the assigned full image, retain the mapping and reserve the same frame. The JSON companion `docs/design/GALLERY-ASSIGNMENTS.json` carries full URLs and dimensions for implementation.

G001-G031: supplied product/promotional composites. G032-G039: supplied color-example illustrations. G040-G068: supplied production/equipment photographs. G069-G104: supplied promotional artwork. G105-G136: supplied production photographs, including orientation issues noted above. These are descriptive groups for implementation and alt-writing; do not introduce UI category claims or customer-installation labels.
''')
gallery_rows=[]
gallery_json=[]
for i,n in enumerate(GALLERY,1):
    full=n['fullImage'];thumb=n['thumbnail']
    for u in (full,thumb):
        assert (PUBLIC/u.lstrip('/')).is_file(),u
    with Image.open(PUBLIC/full.lstrip('/')) as im:
        dims=list(im.size)
    gallery_rows.append([f'G{i:03}', '`'+full.split('/')[-1]+'`','`'+thumb.split('/')[-1]+'`'])
    gallery_json.append({'id':f'G{i:03}','order':i,'fullImage':full,'thumbnail':thumb,'dimensions':dims,'fit':'contain','focalPoint':'50% 50%','inspection':'contact-sheet subject review; full-size orientation and final-size legibility check required','orientationReview':105<=i<=120 or 129<=i<=136})
table(['ID / order','Full image filename','Thumbnail filename'],gallery_rows)

write('''### Implementation acceptance for this schedule

1. For each route, mark every section ID above as implemented and source-copy reconciled. Every source paragraph, table row, FAQ and CTA explanation must have a destination; no silent omissions. Use the source heading names in this schedule to match content; h3 metric/audience/action groups stay with their parent.
2. Produce desktop and mobile screenshots for each route and open states for shared FAQ, menu, quote validation and gallery. The existing `output/visual-reference/` captures document an older implementation; they are evidence, not approved mockups for this new schedule. These written compositions are not rendered page sketches.
3. Verify 1440/1024/768/390/320 widths. At inner-page entry there is no decorative photographic banner or fixed viewport-height opening. Contact actions/first content appear immediately after the short title; product copy/actions precede artwork on mobile.
4. Check poster contain behavior and readable HTML equivalents for essential embedded wording. No directory poster loses its product name or thickness to a crop. Gallery preserves all 136 ordered entries and opens the matching full-size file. Correct sideways derivatives after individual inspection; never alter source originals.
5. Verify QOL-01 through QOL-08, form errors, menu Escape, route scroll/Back, search, contact destinations, metadata, reduced motion and failed/throttled image loading. Use IMPLEMENTATION-REVIEW.md to reproduce existing bugs.
6. Keep business, source-claim and policy questions in CONTENT-DECISION-LOG.md. Preserve substantive source content in preview, with editorial instructions outside visitor pages. Client approval is still required for disputed claims and legal drafts; a chosen image is not evidence that a claim is true.
7. Do not publish as part of implementing this schedule. Update IMPLEMENTATION-STATUS.md with actual completion and verification results, rather than “all routes complete” based only on HTTP 200 responses.

**Builder sequence:** repair the shared shell/navigation/forms, complete the 210 page P01-P09 as the reference, apply each independently specified product variant, then About/Gallery, Warranty/Contact, editorial/policies/utilities, and finally the full acceptance pass. Preserve the approved homepage while implementing its explicitly listed missing details. No new discovery/design decision is needed to choose a background or substitute image already assigned here.
''')

write('''## 16D. Section animation and interaction choreography

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
| About A01/A03/A04/A05/A07/A08/A09 | Immediate reading flow and names/benefits; M2 on real links only | No animated logo cloud, rotating statistics or moving timeline |
| About A02/A06 | Copy and assigned image M1 simultaneously | Quality text remains readable before any user action; no simulated testing equipment animation |
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
''')

addition='\n'.join(lines)
# About section IDs must not be confused with the A image register IDs.
about_start=addition.index('### About:')
about_end=addition.index('### Gallery:',about_start)
addition=addition[:about_start]+re.sub(r'\bA(0[1-9])\b', r'AB\1', addition[about_start:about_end])+addition[about_end:]
# Restore the actual A19 image reference (unaffected by 01-09 replacement).
addition=addition.replace('About A01/A03/A04/A05/A07/A08/A09', 'About AB01/AB03/AB04/AB05/AB07/AB08/AB09').replace('About A02/A06', 'About AB02/AB06')
s=PLAN.read_text(encoding='utf-8')
if '## 16C.' in s:
    start=s.index('## 16C.');end=s.index('## 17.',start);s=s[:start]+s[end:]
s=s.replace('## 17. Copy-paste prompt for Claude',addition+'\n## 17. Copy-paste prompt for Claude')
s=s.replace('Sections 16A and 16B include the full desktop/mobile layouts, image guidance, backgrounds, hover states, and animation rules.', 'Sections 16A and 16B establish the shared system. Section 16C is the authoritative route-by-route and section-by-section schedule, with exact inspected image assignments, backgrounds, desktop/mobile compositions, and the complete 136-image gallery order.')
s=s.replace('and the complete 136-image gallery order. Section 17', 'and the complete 136-image gallery order. Section 16D specifies section animation triggers, timing, easing, interaction states and reduced-motion behavior. Section 17')
s=s.replace('including sections 16A and 16B. Follow its desktop/mobile layouts, image choices and crop rules, backgrounds, hover/focus/touch states, and animation guidance. Inspect relevant candidates in docs/design/PAGE-ASSETS.md and record selected images in docs/design/IMAGE-ASSIGNMENTS.md.', 'including the authoritative section 16C. Implement every numbered section for each route, using its exact A/G image assignments, backgrounds, desktop/mobile compositions and interactions. Only the homepage gets an immersive photographic hero; inner pages follow the compact openings in 16C. Use docs/design/IMAGE-ASSIGNMENTS.md and GALLERY-ASSIGNMENTS.json as supporting assignment records, not the unselected PAGE-ASSETS candidates. Reconcile every source paragraph, table, FAQ and CTA to a section. Fix the reproduced issues in docs/IMPLEMENTATION-REVIEW.md.')
s=s.replace('including the authoritative section 16C. Implement', 'including authoritative sections 16C and 16D. Apply the section-specific animation triggers, durations, easing, hover/focus/touch and reduced-motion rules in 16D. Implement')
s=s.replace('IMAGE-ASSIGNMENTS.md and GALLERY-ASSIGNMENTS.json as supporting', 'IMAGE-ASSIGNMENTS.md and docs/design/GALLERY-ASSIGNMENTS.json as supporting')
s=s.replace('Start with phases A and B. Then implement the first product detail page as the reusable template and continue through the remaining phases as time allows. Include the approved QOL-01 through QOL-08 updates in section 13A within their relevant phases. Complete and verify useful batches rather than leaving every page partially styled. Maintain docs/IMPLEMENTATION-STATUS.md so work can resume efficiently.', 'Inspect the current implementation and docs/IMPLEMENTATION-REVIEW.md first; do not restart completed work. Repair shared shell/navigation/form issues, then finish the 210 product page section by section before applying each product-specific schedule. Complete About/Gallery, Warranty/Contact and editorial/policy/utility schedules next. Include QOL-01 through QOL-08 and all 16D motion acceptance checks. Preserve the approved homepage and original mock. Maintain docs/IMPLEMENTATION-STATUS.md with each completed section and actual verification; do not equate a styled shell or HTTP 200 response with completion.')
PLAN.write_text(s,encoding='utf-8')
register=['# Image assignments','', 'Planning assignments from section 16C of WEBSITE-IMPLEMENTATION-PLAN.md. The main plan is authoritative. These were visually inspected for composition and subject; this is not client sign-off on claims or provenance. Desktop/mobile fit and section placement are specified there.','', '| ID | Exact URL | Dimensions | Visible subject | Disposition |','| --- | --- | --- | --- | --- |']
register += ['| '+' | '.join(r)+' |' for r in asset_rows]
register += ['', 'Gallery: use GALLERY-ASSIGNMENTS.json for all 136 ordered thumbnail/full-image pairs. Every entry was inspected in a contact sheet; entries marked orientationReview need full-size derivative inspection before shipping. No original images were changed.', '', 'Source provenance: docs/design/page-assets.json, the content tree, approved mock, and docs/site-audit/download-manifest.json. Descriptions above do not verify ownership or customer-installation provenance.']
(DESIGN/'IMAGE-ASSIGNMENTS.md').write_text('\n'.join(register)+'\n',encoding='utf-8')
(DESIGN/'GALLERY-ASSIGNMENTS.json').write_text(json.dumps(gallery_json,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
(DESIGN/'SECTION-COVERAGE.json').write_text(json.dumps(coverage,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
assert len(GALLERY)==136
assert len(coverage)==27
assert s.count('## 16C.')==1 and s.count('## 17.')==1
print(f'Updated plan: {len(coverage)} route/state schedules, {sum(p["sections"] for p in coverage)} sections, {len(asset_rows)} inspected A assets, {len(GALLERY)} gallery pairs.')
