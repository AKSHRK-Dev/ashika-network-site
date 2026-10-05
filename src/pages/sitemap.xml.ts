/**
 * サイトマップ（/sitemap.xml）をビルド時に組み立てる。
 * 載せるページは src/data/site.ts の seo、規約ページは src/data/legal.ts の legalDocs から取る。
 * 手で public/sitemap.xml を書いていたころと違い、文書の日付を直せばここも自動でついてくる。
 */
import type { APIRoute } from 'astro';
import { seo, site } from '../data/site';
import { legalDocs } from '../data/legal';
import { localize } from '../i18n';

type Entry = { path: string; lastmod: string; changefreq: string; priority: number };

const jaEntries: Entry[] = [
  ...seo.pages,
  ...legalDocs.map((d) => ({ path: d.href, lastmod: d.updated, ...seo.legalDefaults })),
];
/* 英語版は同じページの頭に /en を付けたもの。日本語版より少しだけ優先度を下げる */
const entries: Entry[] = [
  ...jaEntries,
  ...jaEntries.map((e) => ({ ...e, path: localize(e.path, 'en'), priority: Math.max(0.1, e.priority - 0.1) })),
];

/** trailingSlash: 'never' に合わせる。トップページだけは末尾のスラッシュを残す */
const toUrl = (path: string) => (path === '/' ? `${site.url}/` : `${site.url}${path}`);

export const GET: APIRoute = () => {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${toUrl(e.path)}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority.toFixed(1)}</priority>\n` +
          `  </url>\n`,
      )
      .join('') +
    `</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
