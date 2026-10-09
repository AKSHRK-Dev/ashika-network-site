/**
 * 規約・方針の文書データ（/legal の一覧ページと、各文書ページの見出し・日付・説明）。
 *
 * 文書を1本増やすときは
 *   1. src/content/legal/ に本文のHTMLを置く
 *   2. このファイルの legalDocs に1件足す
 *   3. src/pages/ に <Doc {...legalDocProps('/xxx')}> だけのページを作る
 *   4. src/data/site.ts（と en/site.ts）の footerColumns の「規約・方針」列にリンクを足す
 * の4つ。本文以外の文言はすべてここで直せる。
 */
export type LegalDoc = {
  href: string;
  /** ページの <title> とパンくずに出る名前 */
  title: string;
  /** /legal の一覧に出す名前（省略すると title と同じ） */
  listTitle?: string;
  /** 文書ページの大見出し。<br> などのHTMLを書ける（省略すると title と同じ） */
  heading?: string;
  /** 見出しの下に小さく出る英語名 */
  en: string;
  /** 見出しの下に出る日付（「2026年7月21日 制定」のように表記ごと書く） */
  date: string;
  /** サイトマップに出す更新日（YYYY-MM-DD）。date と同じ日を機械が読める形で書く */
  updated: string;
  /** 検索結果に出る説明文 */
  description: string;
  /** /legal の一覧に出す説明文 */
  summary: string;
};

export const legalDocs: LegalDoc[] = [
  {
    href: '/terms',
    title: '利用規約',
    heading: 'ASHIKA Network 利用規約',
    en: 'Terms of Service',
    date: '2026年7月21日 制定',
    updated: '2026-07-21',
    description: 'ASHIKA Networkの利用規約です。ご利用前に必ずご確認ください。',
    summary: 'サービスの提供条件、アカウント、料金、禁止事項など、当社とお客様との権利義務関係を定めています。',
  },
  {
    href: '/aup',
    title: '利用方針 (AUP)',
    listTitle: '利用方針（AUP）',
    heading: '利用方針（AUP）',
    en: 'Acceptable Use Policy',
    date: '2026年7月21日 制定',
    updated: '2026-07-21',
    description: 'ASHIKA Networkの利用方針(AUP)です。ご利用前に必ずご確認ください。',
    summary: 'サービスを安全かつ公平にご利用いただくため、利用できない用途や運用上のルールを定めています。',
  },
  {
    href: '/privacy',
    title: 'プライバシーポリシー',
    heading: 'プライバシーポリシー<br>（個人情報保護方針）',
    en: 'Privacy Policy',
    date: '2026年7月21日 制定',
    updated: '2026-07-21',
    description: 'ASHIKA Networkのプライバシーポリシーです。ご利用前に必ずご確認ください。',
    summary: '取得する個人情報、その利用目的、管理方法、第三者への提供などの取り扱いを定めています。',
  },
  {
    href: '/tokusho',
    title: '特定商取引法に基づく表記',
    en: 'Legal Notice',
    date: '2026年9月9日 更新',
    updated: '2026-09-09',
    description: 'ASHIKA Networkの特定商取引法に基づく表記です。ご利用前にご確認ください。',
    summary: '運営元、販売価格、支払方法、サービスの提供時期、返金条件などを掲載しています。',
  },
  {
    href: '/kessai',
    title: '資金決済法に基づく表示',
    en: 'Payment Services Act Notice',
    date: '2026年9月9日 制定 / 2026年9月15日 改定',
    updated: '2026-09-15',
    description: 'ASHIKA Networkのチャージ残高（前払式支払手段）に関する、資金決済法に基づく表示です。',
    summary:
      'お客様パネルのチャージ残高（前払式支払手段）について、発行者、使用できる範囲、有効期限、払戻し、残高の確認方法などを表示しています。',
  },
];

/** 文書ページ（src/pages/terms.astro など）が Doc レイアウトに渡す値をまとめて取り出す */
export function legalDocProps(href: string) {
  const d = legalDocs.find((x) => x.href === href);
  if (!d) throw new Error(`src/data/legal.ts の legalDocs に ${href} がありません`);
  return { title: d.title, heading: d.heading ?? d.title, en: d.en, date: d.date, description: d.description, path: d.href };
}

/** 一覧ページ（/legal）の文言 */
export const legalIndex = {
  title: '規約・方針',
  description:
    'ASHIKA Networkの利用規約、利用方針、プライバシーポリシー、特定商取引法に基づく表記、資金決済法に基づく表示のリンク集のページです。',
  /** 見出しの下の文。配列の区切りでPCだけ改行する */
  lead: ['ご利用にあたって適用される規約と、法令に基づく表示をまとめています。', 'お申し込みの前にご確認ください。'],
  listHeading: '各文書のご案内',
  /** 一覧の下に出るお申し込みの案内 */
  guide: {
    heading: 'お申し込みのご案内',
    lead: 'これらをお読みいただいた後は、プランを選んでサーバーを契約してみましょう。',
    button: 'お申し込み',
  },
};

/** 文書ページの検索結果に出るパンくず（ホーム › 規約・方針 › 各文書）の名前 */
export const breadcrumbLabels = { home: 'ホーム', legal: legalIndex.title };
