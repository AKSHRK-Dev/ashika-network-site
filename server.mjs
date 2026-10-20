/**
 * 本番の起動口（npm start）。Astro の Node サーバー（dist/server/entry.mjs）をそのまま使い、
 * 返す前にセキュリティのためのヘッダーを足す。ページはすべて静的なので、受け付けるのは GET と HEAD だけ。
 * 待ち受けは HOST・PORT（既定は 127.0.0.1:4321。Cloudflare Tunnel が同じ機械から読みに来る）。
 */
import http from 'node:http';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  // スクリプトの出どころは絞らない（GA・Cloudflare のメール保護が動的に読み込むため）。
  // ほかのサイトに枠で埋め込まれること・<base> や <object> の差し込みだけを止める
  'Content-Security-Policy': "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'",
};

const server = http.createServer((req, res) => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(name, value);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }
  handler(req, res);
});

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4321);
server.listen(port, host, () => console.log(`ashikanw: http://${host}:${port}`));
