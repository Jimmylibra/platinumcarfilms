"""Export current visual-reference captures into paginated PDF comparison books."""
from pathlib import Path
import sys, json, math, io, zipfile
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tmp/pdf-deps'))
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A3, landscape
from reportlab.lib.utils import ImageReader
import fitz

SRC=ROOT/'output/visual-reference'
OUT=ROOT/'output/pdf/visual-reference'
OUT.mkdir(parents=True,exist_ok=True)
QA=ROOT/'tmp/pdfs/visual-reference'
QA.mkdir(parents=True,exist_ok=True)
records=json.loads((SRC/'manifest.json').read_text(encoding='utf-8'))
W,H=landscape(A3)
M=36
def clean(s):
 return str(s).replace('\u2014',' - ').replace('\u2013','-').encode('latin-1','replace').decode('latin-1')
def wrap(c,s,width,size=17):
 words=clean(s).split();lines=[];line=''
 for word in words:
  test=(line+' '+word).strip()
  if c.stringWidth(test,'Helvetica-Bold',size)>width and line:lines.append(line);line=word
  else:line=test
 return lines+[line]
def frame(c,title,sub):
 c.setFillColorRGB(.98,.98,.98);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColorRGB(.10,.10,.12);c.setFont('Helvetica-Bold',17)
 for i,line in enumerate(wrap(c,title,W-2*M)):c.drawString(M,H-34-i*21,line)
 c.setFont('Helvetica',10);c.setFillColorRGB(.35,.35,.38);c.drawString(M,H-83,clean(sub))
 c.setStrokeColorRGB(1,.41,.11);c.line(M,H-96,W-M,H-96)
 c.setFont('Helvetica',9);c.drawString(M,18,'Platinum Car Films | Current React implementation | 18 September 2026')
 c.drawRightString(W-M,18,f'Page {c.getPageNumber()}')
def draw(c,img,x,top,width,height):
 c.drawImage(ImageReader(img),x,top-height,width=width,height=height,mask='auto')
def overview(c,d):
 frame(c,d['title'],f"{d['device'].title()} | {d['width']}px viewport | Full-page overview: use section pages for detail")
 for n,kind in enumerate(['appearance','wireframe']):
  img=Image.open(SRC/d['slug']/d['device']/f'{kind}.png')
  s=min((W/2-2*M)/img.width,(H-145)/img.height)
  x=M+n*W/2
  c.setFont('Helvetica-Bold',11);c.drawString(x,H-115,kind.title())
  draw(c,img,x,H-128,img.width*s,img.height*s)
 c.showPage()

for slug in dict.fromkeys(d['slug'] for d in records):
 ds=[d for d in records if d['slug']==slug]
 c=canvas.Canvas(str(OUT/f'{slug}.pdf'),pagesize=(W,H),pageCompression=1)
 c.setTitle(clean(ds[0]['title'])+' - Desktop and mobile visual reference')
 for d in ds:
  c.bookmarkPage(d['device']);c.addOutlineEntry(d['device'].title(),d['device'],0)
  overview(c,d)
  for i,section in enumerate(d['sections'],1):
   folder=SRC/slug/d['device'];a=Image.open(folder/f'section-{i:02}-appearance.png');b=Image.open(folder/f'section-{i:02}-wireframe.png')
   available=W/2-1.5*M
   width=min(available,330 if d['device']=='mobile' else available)
   scale=width/a.width;maxpx=math.floor((H-153)/scale);parts=math.ceil(a.height/maxpx)
   for part in range(parts):
    frame(c,f'{i:02}. {section["label"]}',f'{d["device"].title()} | {d["route"]} | Section {i} of {len(d["sections"])} | Part {part+1} of {parts}')
    if part==0:
     key=f'{d["device"]}-{i}';c.bookmarkPage(key);c.addOutlineEntry(clean(section['label'])[:110],key,1)
    for col,(image,label) in enumerate([(a,'Current appearance'),(b,'Structural wireframe')]):
     top=part*maxpx;bottom=min(a.height,top+maxpx);crop=image.crop((0,top,image.width,bottom));x=M+col*(W/2-M/2)
     c.setFont('Helvetica-Bold',11);c.drawString(x,H-114,label)
     draw(c,crop,x,H-127,width,(bottom-top)*scale)
    c.showPage()
 c.save();print(slug,flush=True)

c=canvas.Canvas(str(OUT/'color-palette.pdf'),pagesize=(W,H),pageCompression=1)
c.setTitle('Platinum Car Films - Current color palette')
frame(c,'Current color palette','Extracted from React CSS and rendered pages. Existing shades are retained.')
img=Image.open(SRC/'color-palette.png');s=min((W-2*M)/img.width,(H-135)/img.height)
draw(c,img,(W-img.width*s)/2,H-110,img.width*s,img.height*s);c.showPage();c.save()

summary=[]
for p in sorted(OUT.glob('*.pdf')):
 doc=fitz.open(p);assert len(doc)>0
 assert all(page.get_text().strip() for page in doc)
 summary.append({'file':p.name,'pages':len(doc)})
 if p.stem in ['home','gallery','color-palette']:
  for n in sorted(set([0,min(1,len(doc)-1),len(doc)-1])):
   doc[n].get_pixmap(matrix=fitz.Matrix(.9,.9)).save(QA/f'{p.stem}-{n+1}.png')
 doc.close()
(OUT/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>Visual reference PDFs</title><style>body{font:18px/1.7 Arial;max-width:850px;margin:50px auto}a{color:#a43c08}</style><h1>Platinum Car Films: visual reference PDFs</h1><p>Each page book includes desktop and mobile overviews followed by section comparisons. Long sections continue across pages. PDF bookmarks provide navigation.</p><ul>'+''.join(f'<li><a href="{r["file"]}">{r["file"]}</a> ({r["pages"]} pages)</li>' for r in summary)+'</ul>',encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(summary,indent=2))
with zipfile.ZipFile(OUT.parent/'Platinum-Car-Films-Visual-Reference-PDFs.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in OUT.iterdir():z.write(p,p.name)
print(f'Completed {len(summary)} PDFs, {sum(r["pages"] for r in summary)} pages',flush=True)
