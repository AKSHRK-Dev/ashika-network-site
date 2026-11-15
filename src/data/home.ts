/**
 * トップページの文言・データ。
 * 料金やFAQを直したいときはここだけ編集すればよい（見た目は components/home/*.astro）。
 * 説明は「分かりにくいところだけ」に付ける方針（2026-11-15）。lead や desc が空のところは、画面にも何も出ない。
 */
import { dashHost, links } from './site';

/* ---------- ヒーロー ---------- */
export const hero = {
  /**
   * いちばん大きく出す見出し。price の数字は、表示したときに from から一気に減る。
   * 最安をうたうときは、何と・いつ比べたかを近くに書く（景品表示法）。根拠は bar.bestNote。
   */
  headline: { before: '月額', after: '円から！', second: '国内最安値', mark: '※1' },
  /** 見出しのすぐ下に並べる強み。mark の付いたものは、帯の下に根拠を書く */
  points: [
    { value: '99.9%', label: 'サーバー稼働率', mark: '※2' },
    { value: '独自ドメイン', label: '接続できます' },
    { value: '多種多様', label: 'なホスティングに対応' },
  ],
  /** 見出しのすぐ下の一言。短く、1文で */
  sub: 'Discord Bot も Web サイトも、置くだけで動き続けます。',
  lead: [
    'Discord Bot も Next.js のサイトも Web アプリも、置き場所さえあれば動き続けます。',
    '大阪のデータセンターで運用し、1ヶ月単位でご契約いただけます。',
  ],
  primary: { label: 'プランを選ぶ', href: links.shop },
  secondary: { label: '料金を比べる', href: '#plans' },
  /** 右に出すパネルの画面の説明（読み上げ用） */
  visualAlt: 'お客様パネルの、サーバーのコンソール画面',
  /** 数字が減り始めるまでの待ち時間（ミリ秒）。ページを開いてすぐでは目に入らないので少し待つ */
  countDelay: 350,
  /** 見出しの金額の動き（from から price へ）と、帯に出す注記。duration はミリ秒 */
  bar: {
    from: 1200,
    price: 30,
    duration: 1700,
    note: '税込・1ヶ月単位',
    /** 最初の画面に出す、※1 の短い根拠。全文はページのいちばん下の「注記・出典」 */
    bestShort: '※1 2026年10月 当グループ調べ（くわしくは注記へ）',
    bestNote: '※1 2026年10月 当グループ調べ。国内の Discord Bot・プログラム常時稼働向けホスティングの最安プランの月額（税込）と比べたものです。',
    uptimeNote: '※2 2026年9月17日〜10月の、当グループのサーバー（Node1）の稼働率の実績です（外部の監視サービス HetrixTools による計測）。今後の稼働を保証するものではありません。',
  },
};

/* ---------- あれも、これも ---------- */
export type UseCase = {
  /** もっと詳しい案内ページへの導線（無ければ出ない） */
  guide?: { label: string; href: string };
  label: string;
  tag: string;
  title: string[];
  desc: string[];
  points: string[];
  /** 他の方法との比較。who = 比べる相手、before = その場合、after = ASHIKA Network の場合 */
  vs?: { who: string; before: string; after: string };
};

export const uses = {
  title: ['置き場所がないから', '止まっている。'],
  /** タブが自動で次に進むまでの時間（ミリ秒）。0 に近づけるほど速く切り替わる */
  duration: 6000,
  /** タブ一覧の読み上げ用ラベル */
  tabsAria: '用途',
  lead: '',
  button: { label: 'この用途で始める', href: links.shop },
  items: [
    {
      guide: { label: 'Discord Bot の常時稼働について詳しく', href: '/discord-bot' },
      label: 'Discord Bot',
      tag: '標準プラン',
      title: ['書いたBotを', '止めずに置く'],
      desc: [],
      points: ['落ちても自動で立ち上げ直す', '複数台に分けても負担が小さい', 'ログはブラウザからそのまま追える'],
    },
    {
      label: 'Webアプリ',
      tag: '標準 / Next.js プラン',
      title: ['作ったものを', '人に見せる'],
      desc: [],
      points: ['Next.js 専用のプランを用意', '独自ドメイン・HTTPSに対応', '国内配信なので表示が速い'],
    },
    {
      guide: { label: 'Python を24時間動かす方法', href: '/python' },
      label: 'データ処理',
      tag: '大容量メモリプラン',
      title: ['重い処理を', '置きっぱなしにする'],
      desc: [],
      points: ['メモリを厚く積んだ構成を選べる', '時間のかかる処理も止めずに回せる', '決まった時刻に動かす仕組みがある'],
    },
    {
      label: '開発・検証',
      tag: '標準 / 大容量メモリ',
      title: ['試すためだけの1台を', '気軽に持つ'],
      desc: [],
      points: ['数分で用意できる', '1ヶ月から契約できる', '不要になったらすぐ手放せる'],
    },
  ] satisfies UseCase[],
};

/* ---------- 料金 ---------- */
export type Plan = {
  name: string;
  /** 月額（円）。要問い合わせのプランは null にする */
  monthly: number | null;
  /** 3ヶ月契約の総額（円）。要問い合わせのプランは null にする */
  quarterly: number | null;
  specs: string[]; // specLabels と同じ順
  fit: string; // 向いている用途（表の一番下に出る）
  hot?: boolean;
  /** 料金の下に出す1行の但し書き（受付開始日など）。無ければ出ない */
  note?: string;
  /** 申し込み先。要問い合わせのプランは Discord を指す */
  href: string;
};

export const specLabels = ['メモリ', 'CPU', '容量', 'バックアップ', 'IPv4'];

export type PlanKind = 'standard' | 'memory' | 'nextjs' | 'enterprise';

/**
 * 種別ごとのプラン一覧。
 * satisfies ではなく型注釈にしているのは、金額が null のプラン（要問い合わせ）と
 * 数値のプランを、呼び出し側で同じ Plan として扱えるようにするため。
 */
const planList: Record<PlanKind, Plan[]> = {
  standard: [
    { name: 'ミニ', monthly: 30, quarterly: 90, specs: ['256MB', '20%', '512MB', '1', '共有'], fit: 'まず1台置いてみたい', href: 'https://dash.ashikanw.com/order/mini' },
    { name: 'ベーシック', monthly: 50, quarterly: 120, specs: ['512MB', '50%', '2048MB', '2', '共有'], fit: 'Botやサイトを常時動かす', hot: true, href: 'https://dash.ashikanw.com/order/basic' },
    { name: 'プラス', monthly: 110, quarterly: 300, specs: ['1024MB', '100%', '5120MB', '3', '共有'], fit: '人が集まる・台数を増やす', href: 'https://dash.ashikanw.com/order/plus' },
    { name: 'プロ', monthly: 230, quarterly: 630, specs: ['2048MB', '150%', '10240MB', '4', '共有'], fit: '複数のサービスをまとめて置く', href: 'https://dash.ashikanw.com/order/pro' },
    { name: 'マックス', monthly: 470, quarterly: 1290, specs: ['4096MB', '200%', '20480MB', '5', '共有'], fit: '共有構成で使える上限まで使う', href: 'https://dash.ashikanw.com/order/max' },
  ],
  memory: [
    { name: 'メモリ ベーシック', monthly: 110, quarterly: 300, specs: ['1024MB', '20%', '1024MB', '1', '共有'], fit: 'まずメモリを増やしたい', href: 'https://dash.ashikanw.com/order/mem-basic' },
    { name: 'メモリ プラス', monthly: 120, quarterly: 330, specs: ['2048MB', '50%', '2048MB', '2', '共有'], fit: '重い処理を常駐させる', hot: true, href: 'https://dash.ashikanw.com/order/mem-plus' },
  ],
  nextjs: [
    { name: 'Next.js 2GB', monthly: 230, quarterly: 630, specs: ['2048MB', '150%', '10240MB', '5', '共有'], fit: '小さめのサイトや個人のアプリ', hot: true, href: 'https://dash.ashikanw.com/order/nextjs-2gb' },
    { name: 'Next.js 4GB', monthly: 470, quarterly: 1290, specs: ['4096MB', '200%', '20480MB', '5', '共有'], fit: '画像の多いサイトやアクセスの多いアプリ', href: 'https://dash.ashikanw.com/order/nextjs-4gb' },
  ],
  enterprise: [
    { name: '個別構成', monthly: null, quarterly: null, specs: ['要相談', '要相談', '要相談', '要相談', '要相談'], fit: '上記に収まらない規模で使う', href: links.discord },
  ],
};

export const plans = {
  title: ['必要な分だけ、', '必要な期間だけ。'],
  lead: [],
  kinds: [
    { key: 'standard', label: '標準プラン', desc: 'Bot・Webアプリ・検証に。CPUとメモリのバランス型。' },
    { key: 'memory', label: '大容量メモリプラン', desc: 'データ処理など、メモリを多く使う処理に。' },
    { key: 'nextjs', label: 'Next.js プラン', desc: 'Next.js 向け。置くだけでビルドして公開します。' },
    { key: 'enterprise', label: 'エンタープライズ', desc: '規格外の構成は、Discord でご相談ください。' },
  ] as const,
  terms: { monthly: '月額', quarterly: '3ヶ月契約' }, // お得率は料金データから自動計算
  /** 月額／3ヶ月契約の切り替えスイッチの横に出るバッジ。n には料金データから計算した最大割引率（%）が入る */
  badge: (n: number) => `最大${n}%お得`,
  /** 3ヶ月契約が割引にならない料金設定のときに、上の代わりに出る文言 */
  badgeNone: 'お得',
  fitLabel: 'こんな人に',
  button: 'この構成で始める',
  /** 表まわりの細かい文言 */
  labels: {
    kindsAria: 'プランの種類',
    switchAria: '3ヶ月契約の料金を表示',
    scrollHint: '横にスクロールすると、ほかの構成も見られます',
    /** 表の左上の空欄（読み上げ用。画面には出ない） */
    itemAria: '項目',
    /** スマホの料金表の、いちばん左の列の見出し */
    plan: 'プラン',
    /** hot: true のプランに付く印 */
    hot: '人気',
    price: '料金',
    ctaAria: 'お申し込み',
    /** 金額のうしろに付く単位 */
    unit: { monthly: '/月', quarterly: '/3ヶ月' },
    /**
     * 金額の下に出る小さな注記。before と after のあいだに「¥（1ヶ月あたりの実質額）」が入る。
     * 例: '3ヶ月契約なら ' + '¥50' + '/月'
     */
    note: {
      monthly: { before: '3ヶ月契約なら ', after: '/月' },
      quarterly: { before: '1ヶ月あたり ', after: '' },
    },
    /** 金額を出さないプラン（monthly が null）の表示 */
    ask: { price: '要問い合わせ', note: '構成に応じてお見積りします', button: 'Discordで相談する' },
  },
  /** 料金表のすぐ下の1行。細かい条件は、いちばん下の notes（注記・出典）に置く */
  note: ['すべて税込・国内で運用しています。'],
  list: planList,
  /** 料金表の下に出す、支援プログラム（ASHIKA Group）への案内 */
  support: {
    title: '非営利団体・学生・オープンソース開発者の方へ',
    text: '',
    label: '支援プログラムを見る',
    href: 'https://group.ashikanw.com/ja-jp/supportprogram/',
  },
};

/* ---------- ロケーション ---------- */
export const location = {
  title: ['置き場所は', '大阪・北摂。'],
  lead: '',
  /** 右側の一覧（項目名と内容） */
  specs: [
    { k: '所在', v: '大阪府・北摂のデータセンター' },
    { k: '回線', v: '国内向けに最適化' },
  ],
  /** 地図の下に並べる、ノードごとのスペックの見出し（中身は src/data/specs.ts） */
  nodesTitle: 'サーバー本体のスペック',
  /**
   * 右側の地図。ビルド時にSVGを作るときの設定。
   * 図そのもの（海岸線・府県境・市町村と区の境界）は src/data/osaka-areas.json（国土数値情報から作成）。
   */
  map: {
    /** 明るい色にする市町村（国土数値情報の市区町村名と同じ表記で） */
    city: '箕面市',
    /** 印を立てる場所の [経度, 緯度] */
    pin: [135.4706, 34.8267] as [number, number],
    /** 吹き出しを置く場所。緯度は印と同じにすると引き出し線がまっすぐになる */
    callout: [135.15, 34.8267] as [number, number],
    /** 吹き出しの文字 */
    label: '箕面市',
    labelSub: '大阪府北摂',
    /** 地図の中に名前を出す市（多いと読めなくなるので2つだけ） */
    bigCities: ['大阪市', '堺市'],
    /** 読み上げ用の説明 */
    alt: '大阪府の地図。北摂の箕面市に拠点があります',
    /** 図の下に出す断り書き */
    caption: '出典：国土数値情報（行政区域データ）国土交通省（令和7年1月1日時点）を加工して作成。原典は国土地理院の測量成果です。',
  },
};
/* ---------- パネル紹介 ---------- */
export const panel = {
  title: ['触る場所は、', 'ひとつだけ。'],
  lead: '',
  /** ブラウザ枠のアドレスバーに出すURL（既定はお客様パネル。別のものを出したいときは文字列を直接書く） */
  url: dashHost,
  shots: [
    {
      title: '残高も契約も1画面で',
      desc: '',
      tags: [],
      src: '/uploads/panel/dashboard.webp?v=20261029',
      alt: 'ダッシュボード画面',
    },
    {
      title: 'コンソールはブラウザの中',
      desc: '',
      tags: [],
      src: '/uploads/panel/server.webp?v=20261029',
      alt: 'サーバーのコンソール画面',
    },
    {
      title: '増やしたくなったら数分で',
      desc: '',
      tags: [],
      src: '/uploads/panel/shop.webp?v=20261029',
      alt: 'サーバー購入画面',
    },
  ],
  width: 2000,
  height: 1183,
};

/* ---------- 強み ---------- */
export const features = {
  /** 見出し（スクロールで1文字ずつ色が付く）。em: true の部分はブランド色になる */
  title: [
    [{ t: '安く' }, { t: '、' }, { t: '止めず' }, { t: '、' }, { t: '手間をかけない' }],
    [{ t: 'ための' }, { t: '6つ', em: true }, { t: '。' }],
  ],
  lead: [],
  /** big（¥30 などの大きい数字）のうしろに小さく出る単位 */
  bigUnit: '/月〜',
  items: [
    /* icon は Icon.astro の名前。desc は1行で読み切れる長さにする */
    { icon: 'coin', title: '月30円から', desc: '', big: '¥30' },
    { icon: 'refresh', title: '落ちても自動で復帰', desc: '' },
    { icon: 'window', title: 'ブラウザだけで操作', desc: '' },
    { icon: 'wallet', title: '請求は定額だけ', desc: '' },
    { icon: 'calendar', title: '1ヶ月で試せる', desc: '' },
    { icon: 'chat', title: '日本語で聞ける', desc: '' },
  ],
};

/* ---------- 3ステップ ---------- */
export const flow = {
  title: '申し込んでから、3手。',
  lead: '',
  steps: [
    { title: '構成を選ぶ', desc: '', href: '/#plans', linkLabel: '料金表を見る' },
    { title: 'お支払いする', desc: '', href: '/#charge', linkLabel: '残高のチャージについて' },
    { title: 'ファイルを置く', desc: '' },
  ],
};

/* ---------- 残高チャージ ---------- */
/**
 * サーバー代の支払いに使う残高の説明。
 * ログインなしで買えるチャージコードの販売ページへ案内する。
 * 決済事業者の審査でもここを見てもらうので、扱っている物・金額・支払い方法を
 * この場で読み切れるようにしておく。
 */
export const charge = {
  title: 'その場払いでも、残高からでも。',
  lead: '残高は、チャージコードで入れます。',
  /** 扱っているもの。審査で確認される項目をそのまま並べる */
  facts: [
    { label: '商品', value: 'チャージコード', note: '' },
    { label: '金額', value: '¥100 〜 ¥500,000', note: '' },
    { label: '支払い方法', value: 'カード・銀行振込・Apple Pay・Google Pay・PayPay・コンビニ・キャリア決済など', note: '' },
    { label: '受け取り', value: 'お支払い後すぐ', note: '' },
  ],
  /** 買ってから使うまでの流れ */
  steps: [
    { title: '金額を選ぶ', desc: '' },
    { title: 'お支払いする', desc: '' },
    { title: '残高に入れる', desc: '' },
  ],
  primary: { label: '残高をチャージする', href: links.charge },
  secondary: { label: '資金決済法に基づく表示', href: '/kessai' },
  note: '',
};

/* ---------- FAQ ---------- */
export const faq = {
  title: 'よくある質問',
  button: { label: 'Discordで聞く', href: links.discord },
  /** もっと細かいところまで載せたページへの案内 */
  more: { label: 'すべての質問を見る', href: '/faq' },
  items: [
    {
      q: '何ができるサービスですか？',
      a: 'プログラムを置いて動かし続ける場所を貸しています。Discord Bot・Web アプリ・定期実行のスクリプトなどに、月30円から。',
    },
    {
      q: '支払いはどうやってしますか？',
      a: 'その場払い（クレジットカード・Apple Pay・Google Pay・銀行振込）か、先にチャージした残高から。PayPay・コンビニ決済・キャリア決済などは、残高のチャージでお使いいただけます。',
    },
    {
      q: '「在庫なし」と出て買えません。',
      a: '各構成には台数の上限があります。解約や変更があると空きが戻るので、数日おきにご確認ください。',
    },
    {
      q: 'サーバーはどこにありますか？',
      a: '大阪府・北摂のデータセンターです。拠点は1か所なので、選ぶ必要はありません。',
    },
    {
      q: '標準プランと大容量メモリプランはどう違いますか？',
      a: '標準はCPUが多く、大容量メモリはメモリが多い構成です。Botやサイトなら標準を選んでください。',
    },
    {
      q: '支払いは毎月ですか？',
      a: '月額のほか、3ヶ月分をまとめても払えます。まとめたほうが、1ヶ月あたりは安くなります。',
    },
    {
      q: '買ったらすぐ使えますか？',
      a: 'はい。購入した時点で接続先が発行されます。初期設定は要りません。',
    },
    {
      q: '日本国外からでも使えますか？',
      a: 'ご利用いただけます。パネルの表示とお問い合わせの対応は日本語のみです。サーバーは大阪にあります。',
    },
  ],
};

/* ---------- 最後のCTA ---------- */
export const cta = {
  title: ['置き場所はもう、', '悩まなくていい。'],
  lead: ['月30円で1台。1ヶ月でやめられます。'],
  primary: { label: 'プランを選ぶ', href: links.shop },
  secondary: { label: 'Discordで聞いてみる', href: links.discord },
  /** 横に置く黄色いボールの中の金額 */
  ball: { top: '月額', value: '30', unit: '円', bottom: ['から・税込'] },
};


/* ---------- 新しいデザイン（2026-11）で足した文言 ---------- */
/** 各セクションの見出しの上に出す短い札 */
export const sectionLabels = {
  reasons: '選ばれる理由',
  uses: 'できること',
  plans: '料金',
  compare: '料金の比較',
  trust: '安心への取り組み',
  climate: '地球のために',
  panel: 'お客様パネル',
  location: '置き場所',
  flow: 'はじめかた',
  charge: 'お支払い',
  faq: 'よくある質問',
};

/** ヒーローの右に出す「すぐ始める」の枠と、まわりの文言 */
export const heroPick = {
  eyebrow: '動かし続けたいプログラムの置き場所',
  title: 'すぐ始めるなら、この3つ',
  lead: '',
  all: { label: 'すべてのプランを比べる', href: '#plans' },
  /** 金額のうしろ */
  unit: '/月',
  taxIn: '税込',
  /** ヒーローの下に並べる、契約の条件 */
  facts: [
    { k: '契約', v: '1ヶ月単位' },
    { k: '請求', v: '定額のみ' },
    { k: '初期費用', v: '0円' },
    { k: '置き場所', v: '大阪（国内）' },
  ],
  /** スマホで下に貼り付く申し込みの帯 */
  sticky: { text: '月30円から・税込', button: 'プランを選ぶ' },
  notesAria: '注記',
};

/** 用途の比較の見出し（左右の箱の上） */
export const usesLabels = { points: 'できること', after: 'ASHIKA Network なら' };

/* ---------- 安心への取り組み ---------- */
export const trust = {
  title: ['見えないところこそ、', 'ていねいに。'],
  lead: '',
  /** 数字で見せる実績と条件。小さい数字から順に、階段のように並ぶ。mark の付いたものは下に根拠を書く */
  statsAria: '数字で見る ASHIKA Network',
  stats: [
    { value: '0', unit: '円', label: '初期費用' },
    { value: '1', unit: 'ヶ月', label: '契約の単位' },
    { value: '30', unit: '円', label: '月額（最安プラン・税込）' },
    { value: '99.9', unit: '%', label: 'サーバー稼働率', mark: '※2' },
  ],
  items: [
    {
      icon: 'pulse',
      title: '稼働状況を、だれでも見られる',
      desc: '',
      link: { label: '稼働状況を見る', href: links.status, external: true },
    },
    {
      icon: 'refresh',
      title: '止まっても、自動で立ち上げ直す',
      desc: '',
    },
    {
      icon: 'wallet',
      title: '請求は、決めた額だけ',
      desc: '',
    },
    {
      icon: 'chip',
      title: '機械の中身も公開',
      desc: '',
      link: { label: 'サーバーのスペックを見る', href: '/specs' },
    },
    {
      icon: 'doc',
      title: '決まりごとは、読める場所に',
      desc: '',
      link: { label: '規約・方針の一覧', href: '/legal' },
    },
  ],
};

/* ---------- 地球のために（Stripe Climate） ---------- */
export const climate = {
  title: ['売上の0.5%を、', '地球温暖化を防ぐ取り組みへ。'],
  lead: 'Stripe でお支払いいただいた売上の0.5%を、二酸化炭素を取り除く技術に寄付しています（Stripe Climate）。',
  points: [
    { value: '0.5%', label: '売上からの寄付' },
    { value: '0円', label: 'お客様の追加のご負担' },
  ],
  note: '',
  link: { label: 'Stripe Climate について', href: 'https://stripe.com/jp/climate' },
};

/* ---------- 注記・出典（ページのいちばん下にまとめる） ---------- */
/**
 * 本文を短くするため、細かい条件・根拠・出典はここに集める。
 * 本文の ※1・※2 はここへのリンクになる。決済事業者の審査で確認される内容（支払い方法・受け取り方）もここに残す。
 */
export const notes = {
  title: '注記・出典',
  /** 本文から、ここへ飛ぶリンクの文字 */
  link: '注記・出典を見る',
  items: [
    { k: '※1', v: '2026年10月 当グループ調べ。国内の Discord Bot・プログラム常時稼働向けホスティングの最安プランの月額（税込）と比べたものです。' },
    { k: '※2', v: '2026年9月17日〜10月の、当グループのサーバー（Node1）の稼働率の実績です（外部の監視サービス HetrixTools による計測）。今後の稼働を保証するものではありません。' },
    { k: '料金', v: '表示はすべて税込です。標準・大容量メモリ・Next.js プランは、1つのIPアドレスをポートで分けて使います。専有のIPv4アドレスは提供していません。' },
    { k: 'お支払い', v: 'クレジットカード（VISA・MasterCard・AMEX）・銀行振込・Google Pay・Apple Pay。STORES のお店では、PayPay・JCB・d払い・auかんたん決済・ソフトバンクまとめて支払い・コンビニ決済・PayPal・楽天ペイ・あと払い（Paidy）がお使いいただけます。' },
    { k: 'チャージ', v: 'チャージコードは100円〜500,000円（100円単位）。お支払い後、画面とメールでお届けします。銀行振込は入金の確認後（1〜3営業日）、コンビニ決済は店頭でのお支払い後です。STORES でのお支払いは、コードの代わりにオーダー番号でお受け取りいただきます。未使用のコードに有効期限はありません。払い戻しは「資金決済法に基づく表示」をご確認ください。' },
    { k: '地図', v: '出典：国土数値情報（行政区域データ）国土交通省（令和7年1月1日時点）を加工して作成。原典は国土地理院の測量成果です。' },
  ],
};
