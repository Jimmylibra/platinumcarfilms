from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, html, collections, re, zipfile

root=Path(__file__).resolve().parents[1]
out=root/'output/visual-reference'
data=json.loads((out/'manifest.json').read_text())
font_path='C:/Windows/Fonts/segoeui.ttf'
def font(n): return ImageFont.truetype(font_path,n)
def esc(s): return html.escape(str(s))
css='body{font:16px/1.5 Arial;margin:40px;background:#f5f5f5;color:#222}h1{font-size:32px}a{color:#9b3c0d}img{max-width:100%;height:auto;border:1px solid #ddd} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px} .card{background:white;padding:20px} .preview{height:320px;width:100%;object-fit:cover;object-position:top} .pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}small{color:#666}'
def page(title,body):return f'<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{esc(title)}</title><style>{css}</style><body><h1>{esc(title)}</h1>{body}</body></html>'
palette=[('#ff691b','React accent'),('#0a0a0c','React background'),('#15151a','Panel / dialog'),('#aaaab3','Body text'),('#ff9b64','Keyboard focus'),('#ffffff','Light text / surfaces')]
counts=collections.Counter()
for d in data:
 for k,v in d['colors'].items():
  role,c=k.split('|',1)
  if role!='borderTopColor':counts[c]+=v
for c,n in counts.most_common(16):
 nums=re.findall(r'\d+',c)
 if len(nums)==3:
  hexc='#'+''.join(f'{int(x):02x}' for x in nums)
  if hexc not in [x[0] for x in palette]:palette.append((hexc,f'Rendered color ({n} uses)'))
palette=palette[:18]
im=Image.new('RGB',(1440,220+((len(palette)+2)//3)*180),'#f7f7f7');draw=ImageDraw.Draw(im)
draw.text((48,36),'PLATINUM CAR FILMS',font=font(34),fill='#202020')
draw.text((48,92),'Current palette | extracted from React CSS and rendered pages',font=font(23),fill='#555555')
draw.text((48,135),'Existing colors, not a proposed redesign. Similar shades are retained.',font=font(20),fill='#555555')
for i,(c,label) in enumerate(palette):
 x=48+(i%3)*456;y=200+(i//3)*180
 draw.rounded_rectangle((x,y,x+415,y+85),radius=8,fill=c,outline='#cccccc')
 draw.text((x,y+95),c.upper(),font=font(24),fill='#222222');draw.text((x,y+130),label,font=font(18),fill='#555555')
im.save(out/'color-palette.png')
(out/'palette.json').write_text(json.dumps({'swatches':palette,'observed_color_counts':dict(counts),'fonts':dict(collections.Counter({k:sum(d['fonts'].get(k,0) for d in data) for d in data for k in d['fonts']}))},indent=2))
cards=[];total=0
for slug in dict.fromkeys(d['slug'] for d in data):
 records=[d for d in data if d['slug']==slug];title=records[0]['title'];body='<p><a href="../index.html">All pages</a></p>'
 for d in records:
  folder=out/slug/d['device'];appearance=Image.open(folder/'appearance.png');wire=Image.open(folder/'wireframe.png')
  body+=f'<h2>{d["device"].title()} | {d["width"]}px</h2><p><a href="{d["device"]}/appearance.png">Full appearance PNG</a> | <a href="{d["device"]}/wireframe.png">Full wireframe PNG</a> | <a href="{d["device"]}/wireframe.svg">Editable SVG</a></p><div class="grid">'
  for i,s in enumerate(d['sections'],1):
   y=max(0,int(s['y']));bottom=min(appearance.height,int(s['y']+s['h']+.999))
   if bottom<=y:continue
   name=f'section-{i:02}'
   appearance.crop((0,y,appearance.width,bottom)).save(folder/f'{name}-appearance.png')
   wire.crop((0,y,wire.width,min(wire.height,bottom))).save(folder/f'{name}-wireframe.png')
   total+=1
   body+=f'<div class="card"><h3>{i:02}. {esc(s["label"])}</h3><div class="pair"><a href="{d["device"]}/{name}-appearance.png"><img loading="lazy" src="{d["device"]}/{name}-appearance.png"></a><a href="{d["device"]}/{name}-wireframe.png"><img loading="lazy" src="{d["device"]}/{name}-wireframe.png"></a></div><small>Current appearance / structural wireframe</small></div>'
  body+='</div>'
  thumb=appearance.copy();thumb.thumbnail((360,16000));thumb.crop((0,0,thumb.width,min(500,thumb.height))).save(folder/'thumbnail.png')
 (out/slug/'index.html').write_text(page(title,body),encoding='utf-8')
 cards.append(f'<div class="card"><h2><a href="{slug}/index.html">{esc(title)}</a></h2><p>{esc(records[0]["route"])}</p><div class="pair"><a href="{slug}/index.html"><img class="preview" loading="lazy" src="{slug}/desktop/thumbnail.png"></a><a href="{slug}/index.html"><img class="preview" loading="lazy" src="{slug}/mobile/thumbnail.png"></a></div><small>Desktop / mobile. Open for full pages and every section.</small></div>')
(out/'index.html').write_text(page('Platinum Car Films | Current design reference',f'<p>Local React implementation, captured 18 September 2026. Desktop: 1440 x 1000 viewport. Mobile: 390 x 844 viewport. Full-page images extend to the full content height.</p><p>{len(cards)} routes, {len(data)} page captures, {total} section pairs. Wireframes use measured layout boxes: crossed boxes are images, dark bars are headings, light bars are body text. These are structural diagrams, not redesigned screens.</p><p>Default page states are shown. Hidden carousel slides, expanded menus, dialogs and accordion answers are not exhaustively captured. Forms remain static previews. Existing visual and content issues are preserved.</p><a href="color-palette.png"><img style="max-width:900px" src="color-palette.png"></a><div class="grid">'+''.join(cards)+'</div>'),encoding='utf-8')
(out/'README.md').write_text(f'# Current design reference\n\nOpen index.html to browse {len(cards)} routes at desktop and mobile widths.\n\n- color-palette.png: current palette\n- Each route/device directory: appearance.png, wireframe.png, editable wireframe.svg, and numbered section PNG pairs\n- manifest.json: routes, section names and bounds, observed colors and fonts\n- palette.json: swatches and measured usage\n\nCaptured from the local React app, not the live WordPress site. No application files were changed. Default visible states only; no backend submissions. Wireframes simplify rendered geometry rather than proposing changes.\n\n{total} section pairs across {len(data)} captures.\n',encoding='utf-8')
with zipfile.ZipFile(out.parent/'Platinum-Car-Films-Visual-Reference.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in out.rglob('*'):
  if p.is_file():z.write(p,Path('visual-reference')/p.relative_to(out))
print(f'Packaged {len(cards)} routes, {len(data)} captures, {total} section pairs')
