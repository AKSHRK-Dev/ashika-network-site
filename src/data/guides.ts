/**
 * 読みもののページ（使い方の案内）の見出し・説明・日付。
 *
 * 本文は src/content/guides/*.html に置く。1本増やすときは
 *   1. src/content/guides/ に本文のHTMLを置く
 *   2. このファイルの guides に1件足す
 *   3. src/pages/ にページを作る（本文を読み込んで <Guide> に渡すだけ）
 *   4. src/data/site.ts の nav / footerColumns にリンクを足す
 * の4つ。検索から入ってくる人の入口になるので、説明文は具体的に書く。
 */
export type GuideLink = { href: string; title: string; desc: string };

export type Guide = {
  href: string;
  /** ページの <title> に出る名前 */
  title: string;
  /** パンくずに出す短い名前（省略すると title） */
  crumb?: string;
  /** 本文の大見出し（省略すると title） */
  heading?: string;
  /** 見出しの下に出す導入 */
  lead: string;
  /** 検索結果に出る説明文（90〜120文字が目安） */
  description: string;
  keywords: string;
  /** サイトマップに出す更新日（YYYY-MM-DD） */
  updated: string;
  /** 画面に出す更新日の表記 */
  updatedLabel: string;
  /** 本文の下に出す案内 */
  ctaTitle?: string;
  ctaLead?: string;
  /** よくある質問の構造化データを付けるか */
  withFaq?: boolean;
  related: GuideLink[];
};

const LINK = {
  discordBot: {
    href: '/discord-bot',
    title: 'Discord Bot を24時間動かす',
    desc: 'パソコンを閉じても止まらない置き場所の作り方を、月30円の構成から説明します。',
  },
  python: {
    href: '/python',
    title: 'Python を24時間動かす',
    desc: '定期実行・スクレイピング・常駐処理を、家のパソコンから離して動かす方法。',
  },
  vps: {
    href: '/vps',
    title: 'VPS（専有IPv4・ルート権限）',
    desc: '共有の構成では足りない方へ。2026年10月13日から受け付けます。',
  },
  faq: {
    href: '/faq',
    title: 'よくある質問',
    desc: '料金・支払い・スペック・規約まわりまで、まとめてお答えしています。',
  },
  plans: {
    href: '/#plans',
    title: '料金プラン',
    desc: '月30円から。メモリ・CPU・容量の違いを一覧で見比べられます。',
  },
} satisfies Record<string, GuideLink>;

export const guides: Guide[] = [
  {
    href: '/discord-bot',
    title: 'Discord Bot を24時間動かす方法',
    crumb: 'Discord Bot の常時稼働',
    heading: 'Discord Bot を、<br />24時間動かす。',
    lead: 'パソコンを閉じたらBotが落ちる。その悩みは、置き場所を移せば終わります。必要なスペックの目安から、実際に動かすまでの手順、よくあるつまずきまでまとめました。',
    description:
      'Discord Bot を24時間動かす方法を、必要なメモリの目安・料金・手順の順に説明します。discord.py と discord.js のどちらにも対応。月30円から、パソコンを閉じても止まらない置き場所を用意できます。',
    keywords:
      'Discord Bot,24時間,常時稼働,ホスティング,discord.py,discord.js,無料,格安,VPS,レンタルサーバー,Python,Node.js,落ちる,動かし続ける',
    updated: '2026-09-16',
    updatedLabel: '2026年9月16日',
    ctaTitle: 'Bot の置き場所を、いま用意する',
    ctaLead: '小さなBotなら月30円のミニで足ります。購入した数分後には、ファイルを置いて動かせます。',
    withFaq: true,
    related: [LINK.python, LINK.plans, LINK.faq],
  },
  {
    href: '/python',
    title: 'Python を24時間動かす方法',
    crumb: 'Python の常時実行',
    heading: 'Python を、<br />止めずに動かす。',
    lead: '定期実行のスクリプト、データの収集、常駐の処理。家のパソコンでやると、再起動のたびに止まります。置き場所を移すと、その心配がなくなります。',
    description:
      'Python のスクリプトを24時間動かす方法をまとめました。cron での定期実行、常駐処理、必要なメモリの目安、パソコンで動かす場合との違いまで。月30円から国内のデータセンターで動かせます。',
    keywords:
      'Python,24時間,常時実行,定期実行,cron,スクレイピング,自動化,サーバー,ホスティング,格安,VPS,スクリプト,常駐',
    updated: '2026-09-16',
    updatedLabel: '2026年9月16日',
    ctaTitle: 'スクリプトの置き場所を用意する',
    ctaLead: '軽い処理なら月30円から。重くなってきたら、上の構成に移せます。',
    related: [LINK.discordBot, LINK.plans, LINK.faq],
  },
  {
    href: '/vps',
    title: 'VPS（専有IPv4・ルート権限）',
    crumb: 'VPS',
    heading: 'VPS。<br />まるごと1台を、あなたに。',
    lead: '共有の構成では足りない方のために、専有のIPv4アドレスとルート権限が付いた構成をご用意します。受け付けは2026年10月13日からです。',
    description:
      'ASHIKA Network の VPS は、専有のIPv4アドレスとルート権限が付いた構成です。最大64GBメモリ・10コア・500GB SSD まで。受け付けは2026年10月13日から。共有プランとの違いもまとめています。',
    keywords: 'VPS,専有IPv4,ルート権限,root,格安VPS,国内VPS,大阪,仮想サーバー,64GB,10コア,SSD',
    updated: '2026-09-16',
    updatedLabel: '2026年9月16日',
    ctaTitle: '受け付けの開始をお待ちください',
    ctaLead: '2026年10月13日から受け付けます。それまでのご相談は Discord でお受けしています。',
    related: [LINK.plans, LINK.discordBot, LINK.faq],
  },
];

export const guideByHref = (href: string) => {
  const guide = guides.find((g) => g.href === href);
  if (!guide) throw new Error(`ガイドが見つかりません: ${href}`);
  return guide;
};
