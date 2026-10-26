/**
 * トップページの比較表：国内のホスティング各社を、メモリ1GBあたりの月額で並べる。
 *
 * 比べ方（変えるときはここも直す）
 *  - 各社で「メモリ 2GB」のいちばん安いプランを選び、その月額を 2 で割る。
 *  - 金額は各社の公式サイトに出ている額。税抜と書かれているものだけ 10% を足す。
 *  - 調べた日を notes に書く（景品表示法。値段は各社の都合で変わるので、見直したら日付も直す）。
 * 名指しで比べるので、CPU やディスクなどメモリ以外の違いと、税の扱いを必ず注記に書く。
 */
export type CompareRow = {
  name: string;
  /** 比べたプランと、その構成 */
  plan: string;
  /** メモリ2GBの月額（円） */
  monthly: number;
  /** メモリ1GBあたりの月額（円） */
  perGb: number;
  /** 税の扱い */
  tax: string;
  /** 料金を確かめたページ */
  url: string;
  /** ASHIKA Network の行（色を付ける） */
  self?: boolean;
};

export const alternatives = {
  title: 'メモリ1GBあたりで比べると',
  lead: '国内のホスティング各社で、メモリ 2GB のいちばん安いプランを選び、月額をメモリ 1GB あたりに直して並べました。',
  columns: ['サービス', '比べたプラン', '月額（メモリ2GB）', 'メモリ1GBあたり'],
  /** スマホで表がはみ出すときに上に出る案内 */
  scrollHint: '横にスクロールすると、ほかの列も見られます',
  yen: '円',
  perMonth: '/月',
  rows: [
    { name: 'ASHIKA Network', self: true, plan: '大容量メモリ「メモリ プラス」メモリ2GB・CPU 50%', monthly: 120, perGb: 60, tax: '税込', url: 'https://www.ashikanw.com/#plans' },
    { name: 'NyaHost', plan: '2GBプラン 0.5vCPU（ゲームサーバー）', monthly: 180, perGb: 90, tax: '税の記載なし', url: 'https://nyahost.com/price/' },
    { name: 'AGAMES', plan: 'アプリサーバー 1コア・メモリ2GB', monthly: 398, perGb: 199, tax: '税の記載なし', url: 'https://agames.jp/' },
    { name: 'SORAHOST', plan: 'プログラミングサーバー メモリ2GB・CPU 50%', monthly: 416, perGb: 208, tax: '税込', url: 'https://sorahost.net/' },
    { name: 'UGOEMO Cloud', plan: 'CloudCompute U1 small 1vCPU・メモリ2GB', monthly: 660, perGb: 330, tax: '税込（税抜 600円）', url: 'https://cloud.ugoemo.net/services/cloud-compute' },
    { name: 'シンVPS', plan: 'スタンダード 2コア・メモリ2GB（1ヶ月契約）', monthly: 1040, perGb: 520, tax: '税の記載なし', url: 'https://www.shin-vps.jp/service/price.php' },
  ] as CompareRow[],
  notes: [
    '2026年10月26日に、各社の公式サイトで確認した月額です。その後に変わっていることがあります。',
    'CPU・ディスク・転送量・契約期間・提供の形（VPS・ゲームサーバーなど）は各社で異なります。メモリだけで比べた目安です。',
    '「税の記載なし」は、公式サイトの料金表に税込・税抜の記載が見つからなかったもので、表示どおりの額を載せています。UGOEMO Cloud は税抜の表示のため、10% を足しています。',
    'SORAHOST は基本料金 80円（メモリ 256MB を含む）に、メモリ 128MB ごとの 24円を足した額、AGAMES は基本料金 241円（メモリ 1GB を含む）に、メモリ 2GB にする追加の 157円を足した額です。',
  ],
  sourcesLabel: '各社の料金ページ',
};

/** 見出しの前に付ける短い比較のラベル（各セクション共通） */
export const vsLabels = { before: 'これまで', after: 'ASHIKA Networkなら' };
