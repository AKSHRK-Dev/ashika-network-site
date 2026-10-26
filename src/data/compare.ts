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
  /*
   * 他社は名前を出さず「サービスA〜」と書く（名指しの比較にしない）。どこを比べたかは、見直しのためにここに残す。
   *  A = NyaHost（https://nyahost.com/price/）
   *  B = AGAMES アプリサーバー（https://w3.agames.jp/store）
   *  C = SORAHOST プログラミングサーバー（https://sorahost.net/checkout/programming-server）
   *  D = UGOEMO Cloud CloudCompute U1 small（https://cloud.ugoemo.net/services/cloud-compute）
   *  E = シンVPS スタンダード 1ヶ月契約（https://www.shin-vps.jp/service/price.php）
   */
  rows: [
    { name: 'ASHIKA Network', self: true, plan: '大容量メモリ「メモリ プラス」メモリ2GB・CPU 50%', monthly: 120, perGb: 60, tax: '税込' },
    { name: 'サービスA', plan: 'ゲームサーバー 0.5vCPU・メモリ2GB', monthly: 180, perGb: 90, tax: '税の記載なし' },
    { name: 'サービスB', plan: 'アプリサーバー 1コア・メモリ2GB', monthly: 398, perGb: 199, tax: '税の記載なし' },
    { name: 'サービスC', plan: 'プログラム向けサーバー CPU 50%・メモリ2GB', monthly: 416, perGb: 208, tax: '税込' },
    { name: 'サービスD', plan: 'クラウドの仮想サーバー 1vCPU・メモリ2GB', monthly: 660, perGb: 330, tax: '税込（税抜 600円）' },
    { name: 'サービスE', plan: 'VPS 2コア・メモリ2GB（1ヶ月契約）', monthly: 1040, perGb: 520, tax: '税の記載なし' },
  ] as CompareRow[],
  notes: [
    '他社は名前を伏せて載せています。2026年10月26日に、各社の公式サイトで確認した月額です。その後に変わっていることがあります。',
    'CPU・ディスク・転送量・契約期間・提供の形（VPS・ゲームサーバーなど）は各社で異なります。メモリだけで比べた目安です。',
    '「税の記載なし」は、公式サイトの料金表に税込・税抜の記載が見つからなかったもので、表示どおりの額を載せています。税抜で表示されているものは 10% を足しています。',
    '基本料金に決まった量のメモリが含まれ、足りない分を足していく形のサービスは、メモリが 2GB になるように足した額にしています。',
  ],
};

/** 見出しの前に付ける短い比較のラベル（各セクション共通） */
export const vsLabels = { before: 'これまで', after: 'ASHIKA Networkなら' };
