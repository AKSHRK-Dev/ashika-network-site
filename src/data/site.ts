/**
 * サイト全体で使う定数（URL・ナビ・メタ情報）。
 * リンク先や文言を変えたいときは、まずこのファイルを見る。
 */

export const site = {
  name: 'ASHIKA Network',
  tagline: '格安ホスティング',
  url: 'https://www.ashikanw.com',
  /**
   * 検索結果に出るトップページのタイトル（30〜35文字くらいまでが切れずに出る）。
   * 「ASHIKA Network」は Google が別枠（サイト名）で出すので、ここでは繰り返さず、
   * 覚えてほしい一言と、探されている言葉を入れる。
   */
  homeTitle: '切れないつながりを｜月30円からのサーバー｜ASHIKA Network',
  /** 検索結果の説明文（トップページと、説明を指定しないページで使う。90〜120文字が目安） */
  description:
    '動かし続けたいプログラムの置き場所を、大阪のデータセンターから月30円で提供します。Discord Bot、Webアプリ、定期実行のスクリプトなど。1ヶ月単位でご契約でき、長期の縛りはありません。',
  /** 検索エンジンに伝えるサイト名の別名（構造化データ用） */
  alternateNames: ['ASHIKA', 'ASHIKAネットワーク', 'アシカネットワーク', 'あしかネットワーク'],
  /** 見出しの下に添える一言（構造化データの slogan と、SNSカードに使う） */
  tagline2: '切れないつながりを',
  keywords:
    'VPS,ホスティング,サーバー,格安,プログラム,ASHIKA,ASHIKA Network,アシカ,あしか,アシカネットワーク,あしかネットワーク,アシカネット,プログラミング,開発,激安,常時稼働,Python,Discord,Discord Bot,Webアプリ',
  ogImage: { path: '/uploads/image.png', width: 1200, height: 630, alt: 'ASHIKA Network ロゴ' },
  themeColor: '#14497e',
  /**
   * Google Search Console の所有権確認タグ（content の値だけ）。
   * 入れると <meta name="google-site-verification"> が出る。空なら何も出さない。
   */
  googleVerification: '',
} as const;

/**
 * ロゴとアイコンの画像。差し替えるときは public/ にファイルを置いて、ここのパスを変える。
 * width / height は画像そのものの大きさ（画面での表示サイズはCSSが決めるので、比率だけ合っていればよい）。
 */
export const brand = {
  /** ヘッダーとメニュー（ドロワー）に出るロゴ */
  header: { src: '/uploads/ashika.png', width: 1368, height: 248 },
  /** フッターに出るロゴ（ヘッダーとは別画像） */
  footer: { src: '/uploads/ashika-com.png', width: 929, height: 264 },
  /** タブ・検索結果・スマホのホーム画面に出るアイコン */
  icons: {
    favicon48: '/favicon-48.png',
    favicon192: '/favicon-192.png',
    appleTouch: '/apple-touch-icon.png',
  },
} as const;

/**
 * ヘッダー・フッター・404ページの細かい文言。
 * 末尾が Aria のものは読み上げ（スクリーンリーダー）用のラベルで、画面には出ない。
 */
export const ui = {
  /** キーボード操作で最初に出る「本文へ飛ぶ」リンク */
  skipToContent: '本文へ移動',
  header: {
    brandAria: `${site.name} トップページ`,
    navAria: 'メインナビゲーション',
    login: 'ログイン',
    register: 'お申し込み',
    menuAria: 'メニュー',
    menuOpen: 'メニューを開く',
    menuClose: 'メニューを閉じる',
  },
  footer: {
    brandAria: `${site.name} ホーム`,
    snsAria: 'SNS',
    columnsAria: 'フッターのリンク',
    legalAria: '規約・方針',
  },
  /** 存在しないURLのときのページ（src/pages/404.astro） */
  notFound: {
    title: 'ページが見つかりません',
    code: '404',
    lead: 'URLが間違っているか、ページが移動・削除された可能性があります。',
    button: { label: 'トップページへ', href: '/' },
  },
} as const;

/**
 * アクセス解析（Google Analytics 4）。
 * gaId に測定ID（G-XXXXXXXXXX）を入れると、本番ビルドでだけ計測タグが読み込まれる。空のままなら何も読み込まない。
 * dash.ashikanw.com にも同じIDのタグを入れると、トップページ→登録→購入のつながりを1つのプロパティで追える。
 * プライバシーポリシー第四条（アクセス解析ツール）で Google Analytics と Cookie の利用を明記済み。
 */
export const analytics = {
  gaId: 'G-CH166MZ5W5',
  /** ドメインをまたいでも同じ訪問者として数えるドメイン */
  linkerDomains: ['ashikanw.com', 'dash.ashikanw.com'],
} as const;

/**
 * 短縮リンクの入口。実際の飛び先はサーバー側の /etc/ashika/links.json で決めている。
 * Discord の招待や SNS のアカウントを変えるときは、そのファイルだけ直せばよい。
 */
const short = 'https://link.ashikanw.com';

export const links = {
  dash: 'https://dash.ashikanw.com',
  /** 残高チャージ（ログインなしで買える専用サイト） */
  charge: 'https://charge.ashikanw.com',
  shop: 'https://dash.ashikanw.com/shop',
  register: 'https://dash.ashikanw.com/register',
  status: 'https://status.ashikanw.com',
  /** API と SFTP の説明書（AKSHRK-Dev/ashika-docs） */
  docs: 'https://docs.ashikanw.com',
  discord: `${short}/discord`,
  sns: {
    discord: `${short}/discord`,
    youtube: `${short}/youtube`,
    note: `${short}/note`,
    x: `${short}/x`,
  },
} as const;

/**
 * サイトマップ（/sitemap.xml）と robots.txt の設定。
 * どちらもビルド時に site.url を使って組み立てるので、ドメインを変えても書き直す必要はない。
 * 規約ページは src/data/legal.ts の legalDocs から自動で並ぶので、ここに書かなくてよい。
 *
 * changefreq = 更新頻度の目安（always/hourly/daily/weekly/monthly/yearly/never）
 * priority   = サイト内での重要度（0.0〜1.0）
 * lastmod    = 最終更新日（YYYY-MM-DD）
 */
export const seo = {
  /** 規約ページ以外で、サイトマップに載せるページ */
  pages: [
    { path: '/', lastmod: '2026-09-16', changefreq: 'weekly', priority: 1 },
    { path: '/discord-bot', lastmod: '2026-09-16', changefreq: 'monthly', priority: 0.9 },
    { path: '/python', lastmod: '2026-09-16', changefreq: 'monthly', priority: 0.9 },
    { path: '/vps', lastmod: '2026-09-16', changefreq: 'weekly', priority: 0.8 },
    { path: '/faq', lastmod: '2026-09-16', changefreq: 'monthly', priority: 0.8 },
    { path: '/legal', lastmod: '2026-09-09', changefreq: 'monthly', priority: 0.4 },
  ],
  /** 規約ページに共通で使う値（日付だけは legalDocs の updated を使う） */
  legalDefaults: { changefreq: 'monthly', priority: 0.5 },
  /** robots.txt で検索エンジンに見せないパス。例: ['/private'] */
  disallow: [] as string[],
};

/**
 * お客様パネルのホスト名（links.dash から自動で取り出す）。
 * ブラウザ枠のアドレスバーの既定値と、アクセス解析の「パネルへ進んだクリック」の判定に使う。
 */
export const dashHost = new URL(links.dash).host;

/**
 * フッターに並ぶSNSのアイコン。
 * name は components/Icon.astro に登録されているアイコン名、size は表示px（絵柄ごとに見た目の大きさを揃えてある）。
 * 増やすときは Icon.astro にアイコンを足してから、ここに1行足す。
 */
export const snsItems = [
  { name: 'discord', label: 'Discord', href: links.sns.discord, size: 18 },
  { name: 'youtube', label: 'YouTube', href: links.sns.youtube, size: 20 },
  { name: 'note', label: 'note', href: links.sns.note, size: 24 },
  { name: 'x', label: 'X', href: links.sns.x, size: 15 },
] as const;

export type NavItem = { label: string; href: string; external?: boolean };

/** ヘッダーのナビゲーション */
export const nav: NavItem[] = [
  { label: 'できること', href: '/#uses' },
  { label: '料金', href: '/#plans' },
  { label: '残高チャージ', href: '/#charge' },
  { label: 'よくある質問', href: '/faq' },
  { label: 'ドキュメント', href: links.docs, external: true },
  { label: '稼働状況', href: links.status, external: true },
];

/** ヘッダー上のお知らせバー（出したいときは show を true に） */
export const notice = {
  show: true,
  text: 'VPS（専有IPv4・ルート権限つき）の受付は2026年10月13日からです。ご相談は',
  linkLabel: 'Discord',
  linkHref: links.discord,
  after: 'までどうぞ。',
};

/** フッターのリンク列（PCでは3列、スマホでは積んで表示） */
export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'サービス',
    items: [
      { label: '料金・プラン', href: '/#plans' },
      { label: 'できること', href: '/#uses' },
      { label: '選ばれる理由', href: '/#features' },
      { label: 'お客様パネルの画面', href: '/#panel' },
      { label: '申し込みから公開まで', href: '/#flow' },
      { label: '自分で用意する場合との比較', href: '/#compare' },
      { label: 'VPS（専有IPv4・root）', href: '/vps' },
    ],
  },
  {
    title: 'プラン',
    items: [
      { label: 'ミニ（月30円）', href: `${links.shop}/mini`, external: true },
      { label: 'ベーシック（月50円）', href: `${links.shop}/basic`, external: true },
      { label: 'プラス（月110円）', href: `${links.shop}/plus`, external: true },
      { label: 'プロ（月230円）', href: `${links.shop}/pro`, external: true },
      { label: 'マックス（月470円）', href: `${links.shop}/max`, external: true },
      { label: 'メモリ ベーシック（月100円）', href: `${links.shop}/mem-basic`, external: true },
      { label: 'メモリ プラス（月120円）', href: `${links.shop}/mem-plus`, external: true },
      { label: 'VPS・個別構成の相談', href: links.sns.discord, external: true },
    ],
  },
  {
    title: '動かせるもの',
    items: [
      { label: 'Discord Bot', href: '/discord-bot' },
      { label: 'Python のプログラム', href: '/python' },
      { label: 'Web アプリ', href: '/#uses' },
      { label: 'データ処理・定期実行', href: '/#uses' },
      { label: '開発・検証用の環境', href: '/#uses' },
      { label: 'root 権限が必要なもの（VPS）', href: '/vps' },
    ],
  },
  {
    title: 'ガイド',
    items: [
      { label: 'Discord Bot を24時間動かす', href: '/discord-bot' },
      { label: 'Python を24時間動かす', href: '/python' },
      { label: 'VPS を使う', href: '/vps' },
      { label: 'SFTP でファイルを送る', href: `${links.docs}/sftp/`, external: true },
      { label: 'よくある質問', href: '/faq' },
    ],
  },
  {
    title: '開発者向け',
    items: [
      { label: 'ドキュメント', href: links.docs, external: true },
      { label: 'API の使い方', href: `${links.docs}/api/`, external: true },
      { label: 'API リファレンス', href: `${links.docs}/api/reference/`, external: true },
      { label: 'API の使い方の例', href: `${links.docs}/api/examples/`, external: true },
      { label: 'SFTP でつなぐ', href: `${links.docs}/sftp/`, external: true },
      { label: 'APIキーを発行する', href: `${links.dash}/api-keys`, external: true },
      { label: 'GitHub', href: 'https://github.com/AKSHRK-Dev', external: true },
    ],
  },
  {
    title: 'お客様パネル',
    items: [
      { label: 'はじめて登録する', href: links.register, external: true },
      { label: 'ログインする', href: links.dash, external: true },
      { label: 'ダッシュボード', href: `${links.dash}/dashboard`, external: true },
      { label: 'サーバーの一覧', href: `${links.dash}/servers`, external: true },
      { label: 'サーバーを購入する', href: links.shop, external: true },
      { label: 'お知らせ', href: `${links.dash}/announcements`, external: true },
      { label: 'ヘルプ', href: `${links.dash}/help`, external: true },
      { label: 'アカウントの設定', href: `${links.dash}/account`, external: true },
    ],
  },
  {
    title: '残高・お支払い',
    items: [
      { label: '残高のチャージについて', href: '/#charge' },
      { label: 'チャージコードを買う', href: links.charge, external: true },
      { label: '利用明細', href: `${links.dash}/billing`, external: true },
      { label: 'お支払い方法', href: links.charge, external: true },
      { label: '資金決済法に基づく表示', href: '/kessai' },
    ],
  },
  {
    title: 'サポート',
    items: [
      { label: 'よくある質問', href: '/faq' },
      { label: 'Discord で相談する', href: links.sns.discord, external: true },
      { label: '稼働状況', href: links.status, external: true },
      { label: 'メールでのお問い合わせ', href: 'mailto:support@ashikanw.com' },
      { label: 'パネルのヘルプ', href: `${links.dash}/help`, external: true },
    ],
  },
  {
    title: '規約・方針',
    items: [
      { label: '規約・方針の一覧', href: '/legal' },
      { label: '利用規約', href: '/terms' },
      { label: '利用方針（AUP）', href: '/aup' },
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: '特定商取引法に基づく表記', href: '/tokusho' },
      { label: '資金決済法に基づく表示', href: '/kessai' },
    ],
  },
  {
    title: '設備',
    items: [
      { label: '大阪のデータセンター', href: '/#location' },
      { label: '技術・設備', href: 'https://group.ashikanw.com/ja-jp/technology/', external: true },
      { label: '稼働状況', href: links.status, external: true },
      { label: 'お客様パネルの画面', href: '/#panel' },
    ],
  },
  {
    title: 'ASHIKA Group',
    items: [
      { label: 'ASHIKA Group について', href: 'https://group.ashikanw.com/ja-jp/about/', external: true },
      { label: 'サービス', href: 'https://group.ashikanw.com/ja-jp/services/', external: true },
      { label: '理念', href: 'https://group.ashikanw.com/ja-jp/vision/', external: true },
      { label: '沿革', href: 'https://group.ashikanw.com/ja-jp/history/', external: true },
      { label: '技術・設備', href: 'https://group.ashikanw.com/ja-jp/technology/', external: true },
      { label: 'ブランド', href: 'https://group.ashikanw.com/ja-jp/brand/', external: true },
      { label: 'お問い合わせ', href: 'https://group.ashikanw.com/ja-jp/about/#contact', external: true },
    ],
  },
  {
    title: '支援・参加',
    items: [
      { label: '無料の支援プログラム', href: 'https://group.ashikanw.com/ja-jp/supportprogram/', external: true },
      { label: '支援プログラムの規約', href: 'https://group.ashikanw.com/ja-jp/supportprogram/terms/', external: true },
      { label: 'お手伝い募集', href: 'https://group.ashikanw.com/ja-jp/join/', external: true },
      { label: 'お手伝いメンバー規約', href: 'https://group.ashikanw.com/ja-jp/join/terms/', external: true },
    ],
  },
  {
    title: 'StoriaMC',
    items: [
      { label: 'StoriaMC のトップ', href: 'https://storiamc.com/ja-jp/', external: true },
      { label: 'ダウンロード', href: 'https://storiamc.com/ja-jp/downloads/', external: true },
      { label: 'リリースノート', href: 'https://storiamc.com/ja-jp/releases/', external: true },
      { label: 'しくみ', href: 'https://storiamc.com/ja-jp/how-it-works/', external: true },
      { label: 'ドキュメント', href: 'https://storiamc.com/ja-jp/docs/', external: true },
      { label: 'Storia Cluster', href: 'https://storiamc.com/ja-jp/docs/cluster/', external: true },
    ],
  },
  {
    title: '関連サービス',
    items: [
      { label: 'StoriaMC', href: 'https://storiamc.com/ja-jp/', external: true },
      { label: 'SABALISU', href: 'https://minecrafts.jp', external: true },
      { label: '4l.vc', href: 'https://4l.vc', external: true },
      { label: 'ASHIKA Group', href: 'https://group.ashikanw.com/ja-jp/', external: true },
    ],
  },
  {
    title: 'フォローする',
    items: [
      { label: 'Discord', href: links.sns.discord, external: true },
      { label: 'YouTube', href: links.sns.youtube, external: true },
      { label: 'note', href: links.sns.note, external: true },
      { label: 'X', href: links.sns.x, external: true },
      { label: 'GitHub', href: 'https://github.com/AKSHRK-Dev', external: true },
    ],
  },
  {
    title: 'このサイト',
    items: [
      { label: 'English', href: '/en' },
      { label: 'サイトマップ', href: '/sitemap.xml' },
      { label: 'トップへ戻る', href: '/' },
    ],
  },
];

/** フッター最下段に1行で並べる規約・方針のリンク */
export const footerLegal: NavItem[] = [
  { label: '規約・方針一覧', href: '/legal' },
  { label: '利用規約', href: '/terms' },
  { label: '利用方針 (AUP)', href: '/aup' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '特定商取引法に基づく表記', href: '/tokusho' },
  { label: '資金決済法に基づく表示', href: '/kessai' },
];

export const footerText = {
  about:
    'ASHIKA Network は、動かし続けたいプログラムの置き場所を月30円から貸し出しています。\n大阪・北摂のデータセンターで運用し、1ヶ月単位でご契約いただけます。',
  copyright: '© 2026 ASHIKA Network. All rights reserved.',
  region: 'サーバーは大阪のデータセンターで運用しています。',
  /** 最下段に出す制作者の表記（ASHIKA Group の企業サイトへのリンク） */
  credit: { before: 'Developed by', name: 'ASHIKA Group', href: 'https://group.ashikanw.com/ja-jp/' },
  toTop: 'ページの先頭へ',
};
