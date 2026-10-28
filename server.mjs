/**
 * 本番の起動口（npm start）。Astro の Node サーバー（dist/server/entry.mjs）をそのまま使い、
 * 返す前にセキュリティのためのヘッダーを足す。ページはすべて静的なので、受け付けるのは GET と HEAD だけ。
 * 待ち受けは HOST・PORT（既定は 127.0.0.1:4321。Cloudflare Tunnel が同じ機械から読みに来る）。
 *
 * いちばん上のお知らせの帯もここで入れる。
 *  - 中身は、管理画面（dash.ashikanw.com の「ホームページのお知らせ」）で作ったもの。パネルの /api/site/notices を
 *    SITE_NOTICE_REFRESH_MS ごとに読み、ページ（HTML）を返すときに Header.astro の目印（<!--ashika:site-notice-->）と置き換える。
 *    ビルドし直さなくても、保存してから十数秒で変わる。
 *  - 表示の開始・終了の日時は、ページを返すたびにここで判定する（読みに行く間隔に関係なく、時刻どおりに出たり消えたりする）。
 *  - パネルが止まっていても、最後に読めた中身を .cache/site-notices.json に覚えておき、それを出し続ける。
 *  - 文はすべてエスケープしてから入れる。リンク先は https:// か / で始まるものだけ。
 *  - お知らせが変わっても古いページが使い回されないよう、ページには ETag・Last-Modified を付けず、
 *    「変わっていなければ 304」の確認にも答えない。画像や JS などはこれまでどおり。
 */
import http from 'node:http';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';

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

/* ---------------------------------------------------------------- お知らせ */

const NOTICE_URL = process.env.SITE_NOTICE_URL || 'http://127.0.0.1:3000/api/site/notices';
const NOTICE_REFRESH_MS = Number(process.env.SITE_NOTICE_REFRESH_MS || 15_000);
const CACHE_DIR = new URL('./.cache/', import.meta.url);
const NOTICE_CACHE = new URL('./.cache/site-notices.json', import.meta.url);
const NOTICE_MARKER = '<!--ashika:site-notice-->';
/** 一度に出す帯の数の上限（多すぎると本文が押し下がるため） */
const NOTICE_MAX = 3;
const KINDS = new Set(['info', 'maintenance', 'incident', 'campaign']);

let notices = [];
let lastErrorLog = 0;
let refreshing = null;

async function loadCachedNotices() {
  try {
    const saved = JSON.parse(await readFile(NOTICE_CACHE, 'utf8'));
    if (Array.isArray(saved.notices)) notices = saved.notices;
  } catch {
    // まだ一度も読めていない（はじめての起動など）
  }
}

async function saveCachedNotices() {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    const tmp = new URL('./.cache/site-notices.json.tmp', import.meta.url);
    await writeFile(tmp, JSON.stringify({ savedAt: new Date().toISOString(), notices }));
    await rename(tmp, NOTICE_CACHE);
  } catch (error) {
    console.warn('[notice] 手元に保存できませんでした:', error.message);
  }
}

/** パネルから読み直す。失敗したら、それまでの中身をそのまま使う */
function refreshNotices() {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    try {
      const res = await fetch(NOTICE_URL, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      if (!Array.isArray(body.notices)) throw new Error('notices がありません');
      const changed = JSON.stringify(body.notices) !== JSON.stringify(notices);
      notices = body.notices;
      if (changed) {
        await saveCachedNotices();
        console.log(`[notice] お知らせを読み込みました（${notices.length}件）`);
      }
    } catch (error) {
      // パネルの再起動中などはよくあるので、記録は5分に1回まで
      if (Date.now() - lastErrorLog > 5 * 60_000) {
        lastErrorLog = Date.now();
        console.warn(`[notice] パネルから読めませんでした（手元の ${notices.length} 件を使います）:`, error.message);
      }
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** リンク先として出してよいか（https:// のURLか、サイトの中の / で始まるパス。// で始まるものは断る） */
function safeLink(url) {
  const value = String(url ?? '').trim();
  if (/^\/(?!\/)\S*$/.test(value)) return value;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' ? parsed.href : '';
  } catch {
    return '';
  }
}

/** { ja, en } から言語に合うものを選ぶ。英語が空なら日本語を出す */
const pick = (pair, lang) => {
  if (!pair || typeof pair !== 'object') return '';
  return String((lang === 'en' && pair.en) || pair.ja || '').trim();
};

/** いま出すべき帯の HTML（言語ごと）。無ければ空 */
function noticeHtml(lang) {
  const now = Date.now();
  const showing = notices
    .filter((n) => n && (!n.startsAt || Date.parse(n.startsAt) <= now) && (!n.endsAt || Date.parse(n.endsAt) > now))
    .filter((n) => pick(n.text, lang))
    .slice(0, NOTICE_MAX);
  if (showing.length === 0) return '';

  const bars = showing.map((n) => {
    const kind = KINDS.has(n.kind) ? n.kind : 'info';
    const mark = pick(n.mark, lang);
    const href = n.link ? safeLink(n.link.url) : '';
    const label = n.link ? pick(n.link.label, lang) : '';
    const external = href.startsWith('https://') && !href.startsWith('https://www.ashikanw.com/');
    const link = href && label ? ` <a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(label)}</a>` : '';
    const close = n.dismissible
      ? `<button class="site-notice-close" type="button" aria-label="${lang === 'en' ? 'Close' : '閉じる'}">×</button>`
      : '';
    return (
      `<div class="site-notice site-notice--${kind}" role="region" aria-label="${escapeHtml(mark || (lang === 'en' ? 'Notice' : 'お知らせ'))}" data-notice="${escapeHtml(`${n.id}:${n.version}`)}">` +
      `<div class="container site-notice-in${close ? ' has-close' : ''}">` +
      (mark ? `<span class="site-notice-mark">${escapeHtml(mark)}</span>` : '') +
      `${escapeHtml(pick(n.text, lang))}${link}${close}</div></div>`
    );
  });
  // 閉じられる帯は、閉じたことをその人のブラウザに覚えておく（中身を変えると id:version が変わるので、また出る）
  const script = showing.some((n) => n.dismissible)
    ? '<script>(function(){try{var k="ashika-notice-closed",c=JSON.parse(localStorage.getItem(k)||"[]");' +
      'document.querySelectorAll("[data-notice]").forEach(function(el){var id=el.getAttribute("data-notice");' +
      'if(c.indexOf(id)>=0){el.remove();return}var b=el.querySelector(".site-notice-close");' +
      'if(b)b.addEventListener("click",function(){c.push(id);c=c.slice(-50);try{localStorage.setItem(k,JSON.stringify(c))}catch(e){}el.remove()})})}catch(e){}})();</script>'
    : '';
  return bars.join('') + script;
}

/* ---------------------------------------------------------------- ページへの差し込み */

/** ページ（HTML）を求めるリクエストか。拡張子なし・.html のもの */
const isPagePath = (pathname) => !/\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith('.html');

const langOf = (pathname) => (/^\/en(\/|\.html$|$)/.test(pathname) ? 'en' : 'ja');

/**
 * 返そうとしている中身が HTML なら、最後まで受け取ってから目印をお知らせに置き換えて返す。
 * それ以外（リダイレクト・画像など）はそのまま流す。
 */
function injectNotices(req, res, lang) {
  const write = res.write.bind(res);
  const end = res.end.bind(res);
  const writeHead = res.writeHead;
  let mode = null;
  const chunks = [];

  // 中身が HTML かは、最初に書き始めたときのヘッダーで決める。決めたら writeHead を元に戻す
  // （Node は書き出す直前に、自分でも writeHead を呼んでヘッダーを送るため。戻さないとヘッダーが送られない）
  const decide = () => {
    if (mode) return mode;
    const type = String(res.getHeader('content-type') || '');
    mode = type.startsWith('text/html') && res.statusCode !== 304 ? 'html' : 'pass';
    res.writeHead = writeHead;
    return mode;
  };

  // writeHead はすぐにヘッダーを送ってしまうので、書き始めるまでは送らずに覚えておく（中身の長さが変わるため）
  res.writeHead = (status, reason, headers) => {
    if (reason && typeof reason === 'object') {
      headers = reason;
      reason = undefined;
    }
    res.statusCode = status;
    if (typeof reason === 'string') res.statusMessage = reason;
    if (Array.isArray(headers)) {
      for (let i = 0; i < headers.length; i += 2) res.setHeader(headers[i], headers[i + 1]);
    } else if (headers) {
      for (const [name, value] of Object.entries(headers)) if (value !== undefined) res.setHeader(name, value);
    }
    return res;
  };

  const keep = (chunk, encoding) => {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, typeof encoding === 'string' ? encoding : 'utf8'));
  };

  res.write = (chunk, encoding, callback) => {
    if (decide() === 'pass') return write(chunk, encoding, callback);
    keep(chunk, encoding);
    const done = typeof encoding === 'function' ? encoding : callback;
    if (done) process.nextTick(done);
    return true;
  };

  res.end = (chunk, encoding, callback) => {
    if (typeof chunk === 'function') {
      callback = chunk;
      chunk = undefined;
    } else if (typeof encoding === 'function') {
      callback = encoding;
      encoding = undefined;
    }
    if (decide() === 'pass') return end(chunk, encoding, callback);
    keep(chunk, encoding);
    const html = Buffer.concat(chunks).toString('utf8');
    const body = Buffer.from(html.includes(NOTICE_MARKER) ? html.replace(NOTICE_MARKER, () => noticeHtml(lang)) : html, 'utf8');
    res.removeHeader('etag');
    res.removeHeader('last-modified');
    res.setHeader('Cache-Control', 'no-cache');
    if (req.method === 'HEAD') {
      res.removeHeader('content-length');
      return end(callback);
    }
    res.setHeader('Content-Length', body.length);
    return end(body, callback);
  };
}

/* ---------------------------------------------------------------- サーバー */

const server = http.createServer((req, res) => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(name, value);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    // 壊れた %xx は Astro に任せる（404 になる）
  }
  if (isPagePath(pathname)) {
    // ページは毎回作り直して返す（お知らせが変わっても、古いページが使い回されないように）
    delete req.headers['if-none-match'];
    delete req.headers['if-modified-since'];
    delete req.headers.range;
    injectNotices(req, res, langOf(pathname));
  }
  handler(req, res);
});

await loadCachedNotices();
await refreshNotices();
setInterval(refreshNotices, NOTICE_REFRESH_MS).unref();

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4321);
server.listen(port, host, () => console.log(`ashikanw: http://${host}:${port}`));
