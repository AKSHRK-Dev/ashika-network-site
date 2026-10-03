/**
 * robots.txt をビルド時に組み立てる。
 * 見せたくないパスは src/data/site.ts の seo.disallow に足す。サイトマップのURLは site.url から作る。
 */
import type { APIRoute } from 'astro';
import { seo, site } from '../data/site';

export const GET: APIRoute = () => {
  const body =
    `User-agent: *\n` +
    `Allow: /\n` +
    seo.disallow.map((path) => `Disallow: ${path}\n`).join('') +
    `\n` +
    `Sitemap: ${site.url}/sitemap.xml\n`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
