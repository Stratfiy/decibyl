"""Import the approved standalone marketing export without replacing the Next app.

Usage: python scripts/import-marketing-site.py /absolute/path/to/export/dist
Existing blog, legal, lead API and voice widget remain available.
"""
from pathlib import Path
import sys, re, shutil, json

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]).resolve()
target = root / 'public/together'
target.mkdir(parents=True, exist_ok=True)
layout = (root / 'app/layout.tsx').read_text()
widget = re.search(r'id="decibyl-widget"\s+src="([^"]+)"', layout)
routes = []
for file in source.rglob('*'):
    if not file.is_file() or file.name in ('robots.txt', 'sitemap.xml'): continue
    relative = file.relative_to(source)
    if file.suffix == '.html':
        slug = relative.parent.as_posix()
        route = '/' if slug == '.' else '/' + slug
        routes.append(route)
        dest = target / 'pages' / relative
        content = file.read_text().replace('https://decibyl-work-together.nithishk013.chatgpt.site', 'https://decibyl.ai')
        content = re.sub(r'((?:href|src)="/)([^"?#]+\.(?:css|js|ttf))', r'\1together/\2', content)
        content = re.sub(r'(href="/[^"?#]*?)/([#"])', r'\1\2', content)
        content = content.replace('https://decibyl.ai/"', 'https://decibyl.ai/"')
        content = re.sub(r'(https://decibyl\.ai/[^"<>\s#]+?)/(?=["#])', r'\1', content)
        extra = '<a href="/blog">Blog & guides</a><a href="/contact">Contact</a><a href="/legal/privacy">Privacy policy</a><a href="/legal/terms">Terms</a><a href="/legal/refund">Refund policy</a><a href="https://inapp.decibyl.ai">Open Decibyl ↗</a>'
        content = content.replace('<h3>Trust & contact</h3>', '<h3>Trust & contact</h3>' + extra)
        content = content.replace('</head>', '<meta name="google-site-verification" content="j8NFMFrj2shPvdT9CObTaU84Zu-MdPhtMOxpmSEprcE"></head>')
        if widget:
            content = content.replace('</body>', '<script id="decibyl-widget" defer src="' + widget.group(1) + '"></script></body>')
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content)
    else:
        dest = target / relative
        dest.parent.mkdir(parents=True, exist_ok=True)
        if file.suffix == '.css':
            dest.write_text(file.read_text().replace('/fonts/', '/together/fonts/'))
        else: shutil.copyfile(file, dest)
(root / 'data/marketingRoutes.json').write_text(json.dumps(sorted(routes), indent=2) + '\n')
print('Imported', len(routes), 'marketing pages and their assets.')
