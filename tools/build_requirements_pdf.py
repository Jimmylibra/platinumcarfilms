"""Create the PDF edition of REQUIREMENTS.md and render QA previews."""
from pathlib import Path
import re
import sys
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tmp/pdf-deps'))
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from pypdf import PdfReader
import fitz

OUT = ROOT / 'output/pdf/Platinum-Car-Films-Requirements.pdf'
QA = ROOT / 'tmp/pdfs'
OUT.parent.mkdir(parents=True, exist_ok=True)
QA.mkdir(parents=True, exist_ok=True)
fonts = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Segoe', str(fonts / 'segoeui.ttf')))
pdfmetrics.registerFont(TTFont('SegoeBold', str(fonts / 'segoeuib.ttf')))
pdfmetrics.registerFontFamily('Segoe', normal='Segoe', bold='SegoeBold', italic='Segoe', boldItalic='SegoeBold')
styles = getSampleStyleSheet()
for name, style in styles.byName.items():
    style.fontName = 'Segoe'
    style.textColor = colors.HexColor('#272b33')
styles.add(ParagraphStyle(name='BodyCopy', fontName='Segoe', fontSize=9, leading=13.5, spaceAfter=7))
styles.add(ParagraphStyle(name='DocTitle', fontName='SegoeBold', fontSize=25, leading=31, spaceAfter=15, textColor=colors.HexColor('#15171c')))
styles.add(ParagraphStyle(name='SectionTitle', fontName='SegoeBold', fontSize=14, leading=19, spaceBefore=17, spaceAfter=9, keepWithNext=True))
styles.add(ParagraphStyle(name='SubTitle', fontName='SegoeBold', fontSize=10.5, leading=15, spaceBefore=10, spaceAfter=6, keepWithNext=True))
styles.add(ParagraphStyle(name='Cell', fontName='Segoe', fontSize=8, leading=11.5, spaceAfter=0, splitLongWords=True))
styles.add(ParagraphStyle(name='CellHead', fontName='SegoeBold', fontSize=8, leading=11, textColor=colors.white))
styles.add(ParagraphStyle(name='ListCopy', parent=styles['BodyCopy'], leftIndent=13, firstLineIndent=-10, spaceAfter=5))


def rich(text):
    text = text.replace('\u2014', '-').replace('\u2013', '-').replace('\u2011', '-')
    text = escape(text)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', lambda m: f'<link href="{m[2]}" color="#b7440a">{m[1]}</link>' if m[2].startswith('http') else f'{m[1]} (<font size="7.5">{m[2]}</font>)', text)
    text = re.sub(r'`([^`]+)`', r'<font color="#744024">\1</font>', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', text)
    return text


def paragraph(text, style='BodyCopy'):
    return Paragraph(rich(text), styles[style])


width = A4[0] - 84
story = [paragraph('PLATINUM CAR FILMS', 'SubTitle'), HRFlowable(width='100%', thickness=3, color=colors.HexColor('#f06424')), Spacer(1, 15)]
lines = (ROOT / 'REQUIREMENTS.md').read_text(encoding='utf-8-sig').splitlines()
i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1
        continue
    if line.startswith('|'):
        rows = []
        while i < len(lines) and lines[i].strip().startswith('|'):
            values = [v.strip() for v in lines[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r'[:\- ]+', v) for v in values):
                rows.append(values)
            i += 1
        cols = len(rows[0])
        if cols == 4 and 'Existing URL' in rows[0]:
            widths = [width * n for n in [.105, .14, .335, .42]]
        elif cols == 4:
            widths = [width * n for n in [.12, .23, .28, .37]]
        elif cols == 3:
            widths = [width * n for n in [.17, .32, .51]]
        else:
            widths = [width * .28, width * .72] if cols == 2 else [width / cols] * cols
        cells = [[paragraph(v, 'CellHead' if r == 0 else 'Cell') for v in row] for r, row in enumerate(rows)]
        table = Table(cells, colWidths=widths, repeatRows=1, hAlign='LEFT')
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#24272e')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#f4f5f7'), colors.white]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7),
            ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ('LINEBELOW', (0, 0), (-1, 0), 1.3, colors.HexColor('#f06424')),
            ('LINEBELOW', (0, 1), (-1, -1), .3, colors.HexColor('#d9dde3')),
        ]))
        story.extend([table, Spacer(1, 9)])
        continue
    if line.startswith('# '): story.append(paragraph(line[2:], 'DocTitle'))
    elif line.startswith('## '): story.append(paragraph(line[3:], 'SectionTitle'))
    elif line.startswith('### '): story.append(paragraph(line[4:], 'SubTitle'))
    elif line.startswith('- '): story.append(paragraph('- ' + line[2:], 'ListCopy'))
    elif re.match(r'\d+\. ', line): story.append(paragraph(line, 'ListCopy'))
    else:
        text = line
        while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(r'^(#|\||- |\d+\. )', lines[i + 1].strip()):
            i += 1
            text += ' ' + lines[i].strip()
        story.append(paragraph(text))
    i += 1


def decorate(canvas, doc):
    canvas.saveState()
    canvas.setFont('Segoe', 8)
    canvas.setFillColor(colors.HexColor('#6a717c'))
    canvas.drawString(42, 26, 'PLATINUM CAR FILMS  /  STATIC REACT MIGRATION  /  17 SEP 2026')
    canvas.drawRightString(A4[0] - 42, 26, str(doc.page))
    canvas.setStrokeColor(colors.HexColor('#d9dde3'))
    canvas.line(42, 40, A4[0] - 42, 40)
    canvas.restoreState()


doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=38, bottomMargin=55,
                        title='Platinum Car Films - Static React Migration Requirements', author='Platinum Car Films Project')
doc.build(story, onFirstPage=decorate, onLaterPages=decorate)
reader = PdfReader(str(OUT))
text = '\n'.join(page.extract_text() for page in reader.pages)
assert 'Static React Migration' in text
assert 'backend' in text and 'deferred' in text
assert all((page.extract_text() or '').strip() for page in reader.pages)
(QA / 'extracted.txt').write_text(text, encoding='utf-8')
rendered = fitz.open(str(OUT))
for index, page in enumerate(rendered):
    page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25)).save(str(QA / f'page-{index+1:02}.png'))
print(f'Created {OUT} ({len(reader.pages)} pages); rendered all pages for QA.')
