"""Download public reference assets and compile script-free React content data.

Original JS is archived for reference only, never executed by the React app.
Run with Python 3.10+ and beautifulsoup4. Downloads are cached and resumable.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup, Comment, NavigableString

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://platinumcarfilms.com/'
PUBLIC = ROOT / 'react-app/public'
ASSETS = PUBLIC / 'assets/original'
CONTENT = PUBLIC / 'content'
ARCHIVE = ROOT / 'docs/site-audit/source'
MANIFEST = ROOT / 'docs/site-audit/download-manifest.json'
URL_RE = re.compile(r'url\(\s*[\'"]?([^\)\'"\s]+)[\'"]?\s*\)', re.I)
records = {}


def key(url):
    return sha256(url.encode()).hexdigest()[:12]


def asset_path(url):
    name = re.sub(r'[^a-zA-Z0-9._-]', '-', unquote(urlsplit(url).path.split('/')[-1]))[:130] or 'resource'
    if urlsplit(url).netloc == 'fonts.googleapis.com':
        name = 'fonts.css'
    return ASSETS / f'{key(url)}-{name}'


def download(url, destination=None):
    path = destination or asset_path(url)
    try:
        if not path.exists():
            request = Request(url, headers={'User-Agent': 'Mozilla/5.0 WebsiteMigration/1.0'})
            with urlopen(request, timeout=45) as response:
                data = response.read()
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        records[url] = {'file': path.relative_to(ROOT).as_posix(), 'bytes': path.stat().st_size}
        return path
    except Exception as exc:
        records[url] = {'error': str(exc)}
        return None


def batch(urls, archive_scripts=False):
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(download, u, ARCHIVE / 'scripts' / asset_path(u).name if archive_scripts else None): u for u in sorted(urls)}
        for i, task in enumerate(as_completed(futures), 1):
            task.result()
            if i % 40 == 0:
                print(f'Downloaded {i}/{len(futures)} resources', flush=True)


def local(url, context=BASE):
    full = urljoin(context, url)
    if full.startswith(('data:', 'mailto:', 'tel:', '#')):
        return url
    target = asset_path(full)
    if target.exists():
        return '/' + target.relative_to(PUBLIC).as_posix()
    parsed = urlsplit(full)
    if parsed.netloc == urlsplit(BASE).netloc and '/wp-' not in parsed.path:
        return parsed.path + ('?' + parsed.query if parsed.query else '') + ('#' + parsed.fragment if parsed.fragment else '')
    return full


def css_rewrite(css, context):
    # These two compatibility font files are missing on the source server.
    # Remove only the unusable font-face; all regular/solid/brand fonts remain.
    css = re.sub(r'@font-face\s*\{[^}]*fa-v4compatibility[^}]*\}', '', css, flags=re.I)
    return URL_RE.sub(lambda m: 'url("' + local(m.group(1), context) + '")', css)


def compile_node(node):
    if isinstance(node, Comment):
        return None
    if isinstance(node, NavigableString):
        return str(node)
    if not node.name or node.name in ['script', 'noscript', 'style', 'link', 'meta', 'title', 'iframe', 'object', 'embed']:
        return None
    attrs = {}
    for name, value in node.attrs.items():
        if name.startswith('on') or name in ['srcset', 'sizes', 'action', 'method', 'value'] or name.startswith('data-'):
            continue
        if name == 'src' and node.name == 'img':
            value = node.get('data-src') or value
        if name in ['src', 'href', 'poster']:
            if str(value).lower().startswith('javascript:'):
                continue
            value = local(value)
        if name == 'style':
            value = css_rewrite(value, BASE)
        attrs[name] = ' '.join(value) if isinstance(value, list) else value
    if node.name == 'img':
        attrs['loading'] = 'lazy'
        if 'fetchpriority' in attrs:
            attrs['loading'] = 'eager'
        attrs['alt'] = node.get('alt', '')
    children = [x for child in node.children if (x := compile_node(child)) is not None]
    result = {'tag': node.name, 'attrs': attrs, 'children': children}
    classes = node.get('class', [])
    if 'trigger-modal' in classes:
        result['kind'] = 'quote'
    if 'vc_tta-panel' in classes:
        result['kind'] = 'accordion'
        title = node.select_one('.vc_tta-title-text')
        body = node.select_one('.vc_tta-panel-body')
        result['title'] = title.get_text(' ', strip=True) if title else 'Details'
        result['children'] = [compile_node(x) for x in body.children if getattr(x, 'name', None)] if body else []
    if node.name == 'form':
        result['kind'] = 'search' if node.select_one('[name=s]') else 'inquiry' if node.select_one('[name=your-name]') else 'newsletter'
        result['children'] = []
    if 'wd-slider' in classes:
        result['kind'] = 'slider'
        result['children'] = [compile_node(x) for x in node.select('.wd-slide img') if not x.find_parent('noscript')]
    if 'wd-gallery-item' in classes:
        result['kind'] = 'gallery-item'
        link = node.find('a', href=True)
        image = node.find('img')
        if link and image:
            result['fullImage'] = local(link['href'])
            result['thumbnail'] = local(image.get('data-src') or image.get('src', ''))
            result['title'] = image.get('alt', '')
    return result


def main():
    for directory in [ASSETS, CONTENT, ARCHIVE]:
        directory.mkdir(parents=True, exist_ok=True)
    inventory = json.loads((ROOT / 'docs/site-audit/inventory.json').read_text(encoding='utf-8'))
    pages = {}
    for page in inventory['pages']:
        url = page['url']
        slug = urlsplit(url).path.strip('/') or 'home'
        path = download(url, ARCHIVE / (slug.replace('/', '__') + '.html'))
        if path:
            pages[url] = BeautifulSoup(path.read_text(encoding='utf-8', errors='replace'), 'html.parser')
    print(f'Read {len(pages)} pages', flush=True)
    css_urls, script_urls, media_urls = set(), set(), set()
    for url, soup in pages.items():
        css_urls.update(urljoin(url, x['href']) for x in soup.select('link[rel=stylesheet][href]'))
        script_urls.update(urljoin(url, x['src']) for x in soup.select('script[src]') if urlsplit(urljoin(url, x['src'])).netloc == urlsplit(BASE).netloc)
        for image in soup.select('img'):
            value = image.get('data-src') or image.get('src', '')
            if value and not value.startswith('data:'):
                media_urls.add(urljoin(url, value))
        for link in soup.select('.wd-gallery-item a[href]'):
            media_urls.add(urljoin(url, link['href']))
        for el in soup.select('[style], style'):
            for match in URL_RE.finditer(el.get('style', '') + (el.get_text() if el.name == 'style' else '')):
                if not match.group(1).startswith('data:'):
                    media_urls.add(urljoin(url, match.group(1)))
    batch(css_urls)
    # Resolve CSS images/fonts/imports before rewriting the cached stylesheets.
    css_sources = {}
    pending = set(css_urls)
    for _ in range(3):
        dependencies = set()
        for url in pending:
            path = asset_path(url)
            if not path.exists():
                continue
            css = path.read_text(encoding='utf-8', errors='replace')
            # Keep a pristine source copy so repeated runs never rebase local URLs.
            original = ARCHIVE / 'css' / path.name
            original.parent.mkdir(exist_ok=True)
            if original.exists():
                css = original.read_text(encoding='utf-8')
            else:
                original.write_text(css, encoding='utf-8')
            css_sources[url] = css
            for match in URL_RE.finditer(css):
                if not match.group(1).startswith(('data:', '#')):
                    dependencies.add(urljoin(url, match.group(1)))
        batch(dependencies)
        pending = {u for u in dependencies if '.css' in urlsplit(u).path and u not in css_sources}
        if not pending:
            break
    batch(media_urls)
    batch(script_urls, archive_scripts=True)
    for url, css in css_sources.items():
        asset_path(url).write_text(css_rewrite(css, url), encoding='utf-8')
    index = []
    home = pages[BASE]
    for url, soup in pages.items():
        route = urlsplit(url).path
        content = soup.select_one('.main-page-wrapper') or soup.find('main')
        if not content:
            continue
        slug = route.strip('/').replace('/', '__') or 'home'
        inline_css = '\n'.join(css_rewrite(x.get_text(), url) for x in soup.select('style'))
        styles = [local(urljoin(url, x['href'])) for x in soup.select('link[rel=stylesheet][href]') if asset_path(urljoin(url, x['href'])).exists()]
        title = soup.title.get_text(' ', strip=True)
        description = soup.find('meta', attrs={'name': 'description'})
        image = content.find('img')
        page = {'route': route, 'title': title, 'description': description.get('content', '') if description else '',
                'bodyClasses': ' '.join(soup.body.get('class', [])), 'styles': styles, 'css': inline_css,
                'content': compile_node(content)}
        (CONTENT / f'{slug}.json').write_text(json.dumps(page, ensure_ascii=False), encoding='utf-8')
        text = content.get_text(' ', strip=True)
        index.append({'route': route, 'title': title.split(' | ')[0].replace(' - Platinum Car Films', ''),
                      'description': page['description'] or text[:220], 'searchText': text.lower(),
                      'image': local(image.get('data-src') or image.get('src', '')) if image else '',
                      'file': f'/content/{slug}.json', 'legacy': route in ['/cart/', '/checkout/', '/my-account/']})
    (CONTENT / 'index.json').write_text(json.dumps(index, ensure_ascii=False), encoding='utf-8')
    footer = compile_node(home.find('footer'))
    (CONTENT / 'shared.json').write_text(json.dumps({'footer': footer, 'logo': local(BASE + 'wp-content/uploads/2026/05/logo.png'),
        'styles': [local(urljoin(BASE, x['href'])) for x in home.select('link[rel=stylesheet][href]') if asset_path(urljoin(BASE,x['href'])).exists()]}, ensure_ascii=False), encoding='utf-8')
    MANIFEST.write_text(json.dumps(records, indent=2), encoding='utf-8')
    failures = {u: r for u, r in records.items() if 'error' in r}
    print(json.dumps({'pages': len(index), 'css': len(css_sources), 'archived_scripts': len(script_urls),
                      'resources': len(records), 'bytes': sum(r.get('bytes', 0) for r in records.values()), 'failures': failures}, indent=2), flush=True)


if __name__ == '__main__':
    main()
