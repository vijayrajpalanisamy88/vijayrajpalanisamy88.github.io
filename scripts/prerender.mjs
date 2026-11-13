// Renders every route to static HTML (SEO + deep links on GitHub Pages), then writes sitemap.xml and 404.html.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
// preload the Latin subsets of the two variable fonts so text does not reflow late
const fonts = readdirSync(join(dist, 'assets')).filter((f) => /^(inter|jetbrains-mono)-latin-wght-normal-.*\.woff2$/.test(f));
const preload = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('\n    ');
const template = readFileSync(join(dist, 'index.html'), 'utf8').replace('<!--app-head-->', `${preload}\n    <!--app-head-->`);
const { render, routes } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const SITE = 'https://vijayrajpalanisamy88.github.io';

const page = (path) => {
  const { html, head, route } = render(path);
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-route="${route}">${html}</div>`);
};

for (const route of routes) {
  const file = join(dist, route, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(route));
  console.log('prerendered', route);
}
writeFileSync(join(dist, '404.html'), page('/__not-found__/'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(dist, '.nojekyll'), '');
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`wrote ${routes.length} pages, 404.html, sitemap.xml, robots.txt`);
