"""Build a single PDF walking through every homepage-mock section, desktop
and mobile, each with a screenshot and a short note on its intended use.

This is a one-off deliverable for the /mock homepage review, not part of the
build_visual_reference_pdfs.py pipeline (which covers the full react-app
site). Kept separate so it doesn't get swept up by the full-site regeneration.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tmp/pdf-deps'))
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader

SRC = ROOT / 'output/mock-preview/sections'
OUT = ROOT / 'output/pdf'
OUT.mkdir(parents=True, exist_ok=True)
OUT_FILE = OUT / 'Platinum-PPF-Homepage-Mock-Section-Reference.pdf'

W, H = A4
M = 40

SECTIONS = [
    {
        'slug': 'header-nav',
        'title': 'Header & Navigation',
        'use': "Persistent site identity and wayfinding. Fixed to the top of every "
               "scroll position so the 7 primary routes and the Get a Quote CTA stay "
               "reachable at all times. On narrower screens it collapses to a hamburger "
               "menu to avoid cramping the logo and CTA together.",
    },
    {
        'slug': 'hero',
        'title': 'Hero',
        'use': "First-impression section: states who the company serves (installers, "
               "distributors, OEM buyers) and gives the two highest-intent actions "
               "immediately -- Request Wholesale Price (opens the quote dialog) and "
               "Explore PPF Range. The floating feature badges reinforce three product "
               "claims without competing with the headline.",
    },
    {
        'slug': 'stats',
        'title': 'Stats Strip',
        'use': "Quick credibility bar beneath the hero. Gives skimming visitors a "
               "handful of concrete numbers (thickness range, coverage, etc.) before "
               "they commit to reading further -- count up into view on first scroll "
               "past this point.",
    },
    {
        'slug': 'profile',
        'title': 'Company Profile',
        'use': "Answers 'what do you actually make' for a B2B buyer evaluating a new "
               "supplier: product range, OEM/ODM capability, and the company's own "
               "positioning statement, paired with a real factory photo for "
               "manufacturing credibility.",
    },
    {
        'slug': 'banners',
        'title': 'Banner Slider',
        'use': "Rotating promotional space for whatever the business wants to "
               "spotlight next -- currently product-line and dealer-recruitment "
               "banners. Swappable without touching page structure.",
    },
    {
        'slug': 'material',
        'title': 'Material / Film Story (8 features)',
        'use': "The technical trust-builder: walks a buyer through all 8 layers/"
               "properties of the film (polymer base through OEM/ODM customization), "
               "each paired with a concrete advantage and the human benefit it "
               "translates to. On desktop the image tracks whichever feature is "
               "active; on mobile the image stack is intentionally hidden since it "
               "can't stay in view while scrolling a single column, so the cards carry "
               "the section alone.",
    },
    {
        'slug': 'comparison',
        'title': 'Comparison Table',
        'use': "Direct Platinum-vs-generic-alternative comparison across 7 buying "
               "criteria. Exists to pre-empt the 'why not just buy the cheaper roll' "
               "objection before a distributor or installer raises it.",
    },
    {
        'slug': 'audience',
        'title': 'Who It’s For (audience cards)',
        'use': "Segments the pitch by buyer type -- distributor, installer/detailing "
               "studio, OEM/private-label buyer, reseller, enthusiast -- so each visitor "
               "can self-identify and jump straight to the CTA that matches their "
               "actual need instead of one generic pitch for everyone.",
    },
    {
        'slug': 'faq',
        'title': 'FAQ',
        'use': "Handles the recurring pre-sale questions (mil thickness differences, "
               "PPF vs PVC, testing, customization, wholesale availability) inline so "
               "they don't have to be answered one-by-one over email or WhatsApp.",
    },
    {
        'slug': 'partners',
        'title': 'Partners / Flags Strip',
        'use': "Signals international reach and existing distribution relationships "
               "at a glance -- a lightweight trust signal placed just before the "
               "closing CTA, where a hesitant buyer is deciding whether to commit.",
    },
    {
        'slug': 'contact',
        'title': 'Final CTA',
        'use': "The page's last conversion point once every objection above has been "
               "addressed: a direct inquiry action plus a fallback direct-email option "
               "for buyers who'd rather not use a form.",
    },
    {
        'slug': 'footer',
        'title': 'Footer',
        'use': "Utility layer: full contact details (two phone numbers, email, "
               "address), quick links to every other page, policy links, and the "
               "newsletter signup -- the catch-all for a visitor who scrolled straight "
               "to the bottom looking for contact info.",
    },
    {
        'slug': 'quote-dialog',
        'title': 'Quote / Inquiry Dialog',
        'use': "The shared conversion modal every 'Get a Quote' / 'Request Wholesale "
               "Price' / 'Start OEM/ODM Inquiry' trigger opens across the page. One "
               "consistent field set (name, company, email, WhatsApp, product need) "
               "regardless of which button opened it, so the buyer never re-learns a "
               "new form.",
    },
]


def clean(s):
    return str(s).replace('—', ' - ').replace('–', '-').replace('’', "'")


def wrap(c, s, width, font='Helvetica', size=10.5):
    words = clean(s).split()
    lines, line = [], ''
    for word in words:
        test = (line + ' ' + word).strip()
        if c.stringWidth(test, font, size) > width and line:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    return lines


def cover(c):
    c.setFillColorRGB(0.04, 0.04, 0.047)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColorRGB(1, 0.41, 0.11)
    c.rect(M, H - 160, 46, 5, fill=1, stroke=0)
    c.setFillColorRGB(0.96, 0.96, 0.96)
    c.setFont('Helvetica-Bold', 26)
    c.drawString(M, H - 210, 'Platinum PPF - Homepage Mock')
    c.drawString(M, H - 244, 'Section Reference')
    c.setFont('Helvetica', 12)
    c.setFillColorRGB(0.72, 0.72, 0.76)
    for i, line in enumerate(wrap(c, 'Every homepage section captured at desktop (1440px) and mobile '
                                     '(390px), with a short note on what each section is for. Reference '
                                     'material for review, not a spec change.', W - 2 * M, size=12)):
        c.drawString(M, H - 280 - i * 17, line)
    c.setFont('Helvetica', 9)
    c.setFillColorRGB(0.5, 0.5, 0.54)
    c.drawString(M, 30, 'react-app/public/mock/ -- design-preview build, no live functionality changes')
    c.showPage()


def toc(c):
    c.setFillColorRGB(1, 1, 1)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColorRGB(0.08, 0.08, 0.1)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(M, H - 50, 'Contents')
    c.setStrokeColorRGB(1, 0.41, 0.11)
    c.line(M, H - 60, W - M, H - 60)
    y = H - 90
    c.setFont('Helvetica', 11)
    for i, s in enumerate(SECTIONS, 1):
        c.setFillColorRGB(0.15, 0.15, 0.17)
        c.drawString(M, y, f'{i:02}. {clean(s["title"])}')
        c.setFillColorRGB(0.55, 0.55, 0.6)
        c.drawRightString(W - M, y, 'Desktop + Mobile')
        y -= 22
    c.showPage()


def section_pages(c, idx, s):
    for device, label in [('desktop', 'Desktop -- 1440px'), ('mobile', 'Mobile -- 390px')]:
        img_path = SRC / f'{device}-{s["slug"]}.png'
        img = Image.open(img_path)

        c.setFillColorRGB(1, 1, 1)
        c.rect(0, 0, W, H, fill=1, stroke=0)

        c.setFillColorRGB(0.08, 0.08, 0.1)
        c.setFont('Helvetica-Bold', 15)
        c.drawString(M, H - 44, f'{idx:02}. {clean(s["title"])}')
        c.setFont('Helvetica', 10)
        c.setFillColorRGB(0.55, 0.55, 0.6)
        c.drawString(M, H - 60, label)
        c.setStrokeColorRGB(1, 0.41, 0.11)
        c.line(M, H - 68, W - M, H - 68)

        # Intended use block
        c.setFont('Helvetica-Bold', 9.5)
        c.setFillColorRGB(1, 0.41, 0.11)
        c.drawString(M, H - 86, 'INTENDED USE')
        c.setFont('Helvetica', 9.5)
        c.setFillColorRGB(0.25, 0.25, 0.28)
        lines = wrap(c, s['use'], W - 2 * M, size=9.5)
        text_h = 14 + len(lines) * 13
        for i, line in enumerate(lines):
            c.drawString(M, H - 100 - i * 13, line)

        # Image, scaled to fit remaining space
        img_top = H - 100 - text_h - 10
        avail_w = W - 2 * M
        avail_h = img_top - 50
        scale = min(avail_w / img.width, avail_h / img.height)
        draw_w, draw_h = img.width * scale, img.height * scale
        x = (W - draw_w) / 2
        y = img_top - draw_h
        c.setStrokeColorRGB(0.85, 0.85, 0.87)
        c.setLineWidth(0.5)
        c.rect(x - 1, y - 1, draw_w + 2, draw_h + 2, fill=0, stroke=1)
        c.drawImage(ImageReader(img), x, y, width=draw_w, height=draw_h, mask='auto')

        c.setFont('Helvetica', 8)
        c.setFillColorRGB(0.6, 0.6, 0.64)
        c.drawString(M, 24, 'Platinum PPF | Homepage mock section reference')
        c.drawRightString(W - M, 24, f'Page {c.getPageNumber()}')
        c.showPage()


def main():
    c = canvas.Canvas(str(OUT_FILE), pagesize=A4, pageCompression=1)
    c.setTitle('Platinum PPF - Homepage Mock Section Reference')
    cover(c)
    toc(c)
    for i, s in enumerate(SECTIONS, 1):
        c.bookmarkPage(s['slug'])
        c.addOutlineEntry(clean(s['title']), s['slug'], 0)
        section_pages(c, i, s)
    c.save()
    print(f'Wrote {OUT_FILE}')


if __name__ == '__main__':
    main()
