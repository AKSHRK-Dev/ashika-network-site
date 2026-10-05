/**
 * 日本語と英語の切り替え。
 *
 * 日本語は今までどおりのURL（/、/faq、/terms …）、英語は頭に /en を付けたURL（/en、/en/faq …）。
 * どちらの言語かは URL だけで決める（ブラウザの言語で勝手に飛ばさない。検索エンジンが両方を読めるように）。
 *
 * 文言そのものは src/data/*.ts（日本語）と src/data/en/*.ts（英語）にあり、
 * src/data/index.ts の content(lang) でまとめて取り出す。
 * レイアウトに直接書いていた細かい文言（目次・パンくずなど）だけは、下の chrome に置く。
 */
export type Lang = 'ja' | 'en';

export const LANGS: readonly Lang[] = ['ja', 'en'];

/** URL から言語を決める */
export function langOf(url: URL): Lang {
  const p = url.pathname;
  return p === '/en' || p === '/en.html' || p.startsWith('/en/') ? 'en' : 'ja';
}

/** 言語の頭を外した、日本語側のパス（/en/faq → /faq、/en → /） */
export function basePath(pathname: string): string {
  const p = pathname.replace(/\.html$/, '');
  if (p === '/en' || p === '/en/') return '/';
  if (p.startsWith('/en/')) return p.slice(3);
  return p || '/';
}

/**
 * 内部リンクを、その言語のURLにする。
 * 外部リンク（https://…）や、ページの中の移動（#…）はそのまま返す。
 */
export function localize(href: string, lang: Lang): string {
  if (lang === 'ja' || !href.startsWith('/')) return href;
  if (href.startsWith('/en/') || href === '/en' || href.startsWith('/en#')) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

/** 同じページの、別の言語のURL（言語の切り替えと hreflang に使う） */
export function pathIn(pathname: string, lang: Lang): string {
  return localize(basePath(pathname), lang);
}

/** <html lang> と og:locale と構造化データの inLanguage */
export const locale = {
  ja: { html: 'ja', og: 'ja_JP', schema: 'ja' },
  en: { html: 'en', og: 'en_US', schema: 'en' },
} as const;

/** レイアウトに直接書いていた細かい文言 */
export const chrome = {
  ja: {
    notice: 'お知らせ',
    toTop: 'ページの先頭へ戻る',
    toc: '目次',
    docTocAria: 'この文書の目次',
    pageTocAria: 'このページの目次',
    home: 'ホーム',
    updated: '最終更新',
    relatedAria: '関連するページ',
    related: 'こちらもどうぞ',
    guideCtaTitle: 'まずは1台、置いてみてください',
    guideCtaLead: '月30円から借りられます。合わなければ1ヶ月でやめられます。',
    pickPlan: 'プランを選ぶ',
    seePrices: '料金を見る',
    country: '日本',
    switchTo: 'English',
    switchAria: 'English version',
    /** 英語版の規約ページにだけ出す断り書き（日本語版では使わない） */
    translationNote: '',
    translationLink: '',
  },
  en: {
    notice: 'Notice',
    toTop: 'Back to the top',
    toc: 'Contents',
    docTocAria: 'Contents of this document',
    pageTocAria: 'Contents of this page',
    home: 'Home',
    updated: 'Last updated',
    relatedAria: 'Related pages',
    related: 'You may also like',
    guideCtaTitle: 'Start with one server',
    guideCtaLead: 'From ¥30 a month. If it does not suit you, stop after one month.',
    pickPlan: 'Choose a plan',
    seePrices: 'See prices',
    country: 'Japan',
    switchTo: '日本語',
    switchAria: '日本語版',
    translationNote:
      'This English version is a translation provided for convenience. If it differs from the Japanese original, the Japanese original prevails.',
    translationLink: 'Read the Japanese original',
  },
} as const;
