"""Read-only public site inventory. Never submits forms or follows external links."""
import concurrent.futures
import json
from pathlib import Path
import re
import urllib.request
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup

BASE = 'https://platinumcarfilms.com/'
OUT = Path(__file__).resolve().parents[1] / 'docs' / 'site-audit'
SEEDS = ['', 'about-us/', 'product/', 'gallery/', 'warranty/', 'blog/',
         'contact-us/', 'shipping-policy/', 'terms-and-conditions/',
         'privacy-policy/', 'refund-policy/']


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'WebsiteRequirementsInventory/1.0'})
    with urllib.request.urlopen(request, timeout=35) as response:
        return response.status, response.geturl(), response.read().decode('utf-8', errors='replace')


def inspect(url):
    try:
        status, final, html = fetch(url)
        soup = BeautifulSoup(html, 'html.parser')
        main = soup.find('main') or soup
        links = sorted({urljoin(final, a['href']).split('#')[0] for a in soup.select('a[href]')})
        images = []
        for img in main.select('img'):
            images.append({k: img.get(k) for k in ['src', 'data-src', 'srcset', 'alt', 'width', 'height'] if img.get(k)})
        forms = []
        for form in soup.select('form'):
            fields = [{k: field.get(k) for k in ['name', 'type', 'placeholder', 'required', 'class'] if field.has_attr(k)}
                      for field in form.select('input:not([type=hidden]), textarea, select, button')]
            forms.append({'action': form.get('action'), 'method': form.get('method'), 'class': form.get('class'), 'fields': fields})
        styles = [urljoin(final, x['href']) for x in soup.select('link[rel=stylesheet][href]')]
        scripts = [urljoin(final, x['src']) for x in soup.select('script[src]')]
        plugins = sorted(set(re.findall(r'/wp-content/plugins/([^/]+)/', html)))
        themes = sorted(set(re.findall(r'/wp-content/themes/([^/]+)/', html)))
        gallery = [{k: x.get(k) for k in ['class', 'data-settings', 'data-widget_type'] if x.get(k)}
                   for x in main.select('[data-widget_type]') if any(w in str(x.get('data-widget_type')) for w in ['gallery', 'carousel', 'image', 'video'])]
        return {'url': url, 'final_url': final, 'status': status,
                'title': soup.title.get_text(' ', strip=True) if soup.title else '',
                'headings': [{'level': h.name, 'text': h.get_text(' ', strip=True)} for h in main.select('h1,h2,h3,h4')],
                'links': links, 'images': images, 'forms': forms, 'stylesheets': styles,
                'scripts': scripts, 'plugins': plugins, 'themes': themes, 'media_widgets': gallery,
                'inline_css': '\n'.join(x.get_text() for x in soup.select('style')),
                'body_classes': soup.body.get('class', []) if soup.body else [],
                'content_excerpt': main.get_text(' ', strip=True)[:800]}
    except Exception as exc:
        return {'url': url, 'error': str(exc)}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    discovery = {}
    urls = {urljoin(BASE, p) for p in SEEDS}
    pending = [urljoin(BASE, 'robots.txt'), urljoin(BASE, 'sitemap_index.xml')]
    seen = set()
    while pending and len(seen) < 12:
        url = pending.pop(0)
        if url in seen:
            continue
        seen.add(url)
        try:
            status, final, body = fetch(url)
            discovery[url] = {'status': status, 'final_url': final, 'content': body[:25000]}
            if '.xml' in final:
                root = ET.fromstring(body)
                locations = [el.text for parent in root for el in parent
                             if el.tag == '{http://www.sitemaps.org/schemas/sitemap/0.9}loc']
                for location in locations:
                    if urlsplit(location).netloc != urlsplit(BASE).netloc:
                        continue
                    if '.xml' in location:
                        pending.append(location)
                    else:
                        urls.add(location)
        except Exception as exc:
            discovery[url] = {'error': str(exc)}
    results = []
    done = set()
    for _ in range(3):
        batch = sorted(urls - done)[:70-len(done)]
        if not batch:
            break
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            items = list(pool.map(inspect, batch))
        results.extend(items)
        done.update(batch)
        for page in items:
            for link in page.get('links', []):
                parts = urlsplit(link)
                if parts.netloc == urlsplit(BASE).netloc and not parts.query and not any(x in parts.path for x in ['/wp-', '/feed', '/xmlrpc']):
                    if not re.search(r'\.[a-zA-Z0-9]{2,5}$', parts.path):
                        urls.add(link)
    (OUT / 'inventory.json').write_text(json.dumps({'base': BASE, 'date': '2026-09-17', 'discovery': discovery, 'pages': results}, indent=2, ensure_ascii=False), encoding='utf-8')
    for page in results:
        print(json.dumps({k: page.get(k) for k in ['url', 'status', 'title', 'error']}, ensure_ascii=True))
    print('Pages:', len(results))


if __name__ == '__main__':
    main()
