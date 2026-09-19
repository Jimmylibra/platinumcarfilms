"""Inventory existing page media for the design handoff, without choosing new imagery."""
import json
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'react-app/public'
entries = json.loads((PUBLIC / 'content/index.json').read_text(encoding='utf-8'))
rows = []

def walk(node, found):
    if isinstance(node, str):
        return
    attrs = node.get('attrs', {})
    for key in ('src', 'data-src', 'poster'):
        if attrs.get(key):
            found.append((attrs[key], 'content ' + key, attrs.get('alt', '')))
    for key in ('fullImage', 'thumbnail'):
        if node.get(key):
            found.append((node[key], key, node.get('title', '')))
    for url in re.findall(r'url\([\"\']?([^\)\"\']+)', attrs.get('style', '')):
        found.append((url, 'inline background', ''))
    for child in node.get('children', []):
        walk(child, found)

for entry in entries:
    found = [(entry['image'], 'index image candidate', '')] if entry.get('image') else []
    source = PUBLIC / entry['file'].lstrip('/')
    if source.exists():
        page = json.loads(source.read_text(encoding='utf-8'))
        walk(page.get('content', ''), found)
        for url in re.findall(r'url\([\"\']?([^\)\"\']+)', page.get('css', '')):
            found.append((url, 'page CSS background', ''))
    media = []
    seen = set()
    for url, role, alt in found:
        if url in seen:
            continue
        seen.add(url)
        path = PUBLIC / url.split('?')[0].lstrip('/') if url.startswith('/') else None
        size = None
        if path and path.is_file():
            try:
                with Image.open(path) as im:
                    size = list(im.size)
            except OSError:
                pass
        media.append({'url': url, 'source_role': role, 'source_alt': alt,
                      'local_file_exists': bool(path and path.is_file()), 'dimensions': size})
    rows.append({'route': entry['route'], 'title': entry['title'], 'media': media})

out = ROOT / 'docs/design'
out.mkdir(exist_ok=True)
(out / 'page-assets.json').write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding='utf-8')
lines = ['# Existing page media inventory', '',
         'Generated from local content data. These are discovered candidates, not visually approved assignments. Index images can be incidental images rather than hero images. Inspect before assigning. External stylesheet backgrounds and srcset-only variants may require consulting the source archive. The approved homepage mock takes precedence over extracted homepage imagery.', '']
for row in rows:
    lines += ['## ' + row['route'], '', '| Local URL or source | Recorded role | Dimensions | File exists locally |', '| --- | --- | --- | --- |']
    for media in row['media']:
        size = ' x '.join(map(str, media['dimensions'])) if media['dimensions'] else 'Unknown'
        lines.append('| ' + media['url'].replace('|', '%7C') + ' | ' + media['source_role'] + ' | ' + size + ' | ' + str(media['local_file_exists']) + ' |')
    if not row['media']:
        lines.append('| No image discovered | Text-led layout is appropriate | | |')
    lines.append('')
(out / 'PAGE-ASSETS.md').write_text('\n'.join(lines), encoding='utf-8')
print(f'Inventoried {len(rows)} routes and {sum(len(r["media"]) for r in rows)} route/media references.')
