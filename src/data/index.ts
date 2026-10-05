/**
 * 言語ごとの文言をまとめて取り出す入口。
 * 画面の部品は `const { home } = content(langOf(Astro.url))` のように使う。
 * 日本語は src/data/*.ts、英語は src/data/en/*.ts。同じ名前で同じ形にしてある。
 */
import type { Lang } from '../i18n';

import * as siteJa from './site';
import * as homeJa from './home';
import * as compareJa from './compare';
import * as legalJa from './legal';
import * as guidesJa from './guides';
import * as faqJa from './faq-full';

import * as siteEn from './en/site';
import * as homeEn from './en/home';
import * as compareEn from './en/compare';
import * as legalEn from './en/legal';
import * as guidesEn from './en/guides';
import * as faqEn from './en/faq-full';

const ja = { site: siteJa, home: homeJa, compare: compareJa, legal: legalJa, guides: guidesJa, faq: faqJa };
const en = { site: siteEn, home: homeEn, compare: compareEn, legal: legalEn, guides: guidesEn, faq: faqEn };

export function content(lang: Lang) {
  return lang === 'en' ? en : ja;
}

/** 規約の文書ページ（src/pages/terms.astro など）が Doc レイアウトに渡す値 */
export function legalDocProps(href: string, lang: Lang) {
  const d = content(lang).legal.legalDocs.find((x) => x.href === href);
  if (!d) throw new Error(`legalDocs に ${href} がありません（${lang}）`);
  return { title: d.title, heading: d.heading ?? d.title, en: d.en, date: d.date, description: d.description, path: d.href };
}
