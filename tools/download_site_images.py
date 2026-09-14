#!/usr/bin/env python3
"""Download public image assets from platinumcarfilms.com.

The script first downloads known current-site assets from image-manifest.txt,
then crawls key public pages to discover additional WordPress images.
Run locally with: python tools/download_site_images.py
"""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
START='https://platinumcarfilms.com/'
DOMAIN='platinumcarfilms.com'
OUT=ROOT/'assets'/'original-site'
MANIFEST=OUT/'image-manifest.txt'
OUT.mkdir(parents=True,exist_ok=True)
PAGES=['/','/about-us/','/gallery/','/product/','/warranty/','/blog/']
IMG_EXT=('.jpg','.jpeg','.png','.webp','.avif','.gif','.svg')
UA={'User-Agent':'Mozilla/5.0 PlatinumPPF asset downloader'}

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls=set()
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag=='img':
            for k in ('src','data-src','data-lazy-src'):
                if d.get(k): self.urls.add(d[k])
            if d.get('srcset'):
                for part in d['srcset'].split(','):
                    self.urls.add(part.strip().split(' ')[0])
        style=d.get('style','')
        for u in re.findall(r'url\(["\']?([^\)"\']+)',style): self.urls.add(u)

def get(url):
    req=Request(url,headers=UA)
    with urlopen(req,timeout=30) as r: return r.read(), r.headers.get('content-type','')

images=set()
if MANIFEST.exists():
    for line in MANIFEST.read_text().splitlines():
        line=line.strip()
        if line and not line.startswith('#'): images.add(line)

for path in PAGES:
    url=urljoin(START,path)
    try:
        data,_=get(url)
        text=data.decode('utf-8','ignore')
        p=Parser(); p.feed(text)
        for u in p.urls:
            full=urljoin(url,u)
            pu=urlparse(full)
            if pu.netloc.replace('www.','')==DOMAIN and ('/wp-content/uploads/' in pu.path or pu.path.lower().endswith(IMG_EXT)):
                images.add(full)
        for u in re.findall(r'https?://[^"\'\s)]+/wp-content/uploads/[^"\'\s)]+',text):
            images.add(u.replace('\\/','/'))
    except Exception as e:
        print('page failed:',url,e)

for i,url in enumerate(sorted(images),1):
    try:
        name=Path(urlparse(url).path).name.split('?')[0]
        if not name: continue
        dest=OUT/name
        if dest.exists():
            print(f'[{i}/{len(images)}] exists {name}'); continue
        data,_=get(url)
        dest.write_bytes(data)
        print(f'[{i}/{len(images)}] saved {name}')
    except Exception as e:
        print('asset failed:',url,e)
print(f'Done. Found {len(images)} image URLs. Files are in {OUT}')
