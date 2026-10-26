/**
 * 英語版の比較表（メモリ1GBあたりの月額。src/data/compare.ts の英語版）。
 */
export const alternatives = {
  title: 'Compared per 1 GB of memory',
  lead: 'For each hosting service in Japan we took the cheapest plan with 2 GB of memory and turned its monthly price into a price per 1 GB.',
  columns: ['Service', 'Plan compared', 'Monthly (2 GB)', 'Per 1 GB'],
  scrollHint: 'Scroll sideways to see the other columns',
  yen: '',
  perMonth: '/mo',
  rows: [
    { name: 'ASHIKA Network', self: true, plan: 'Memory Plus, 2 GB memory, 50% CPU', monthly: 120, perGb: 60, tax: 'tax incl.', url: 'https://www.ashikanw.com/en#plans' },
    { name: 'NyaHost', plan: '2GB plan, 0.5 vCPU (game server)', monthly: 180, perGb: 90, tax: 'tax not stated', url: 'https://nyahost.com/price/' },
    { name: 'AGAMES', plan: 'App server, 1 core, 2 GB memory', monthly: 398, perGb: 199, tax: 'tax not stated', url: 'https://agames.jp/' },
    { name: 'SORAHOST', plan: 'Programming server, 2 GB memory, 50% CPU', monthly: 416, perGb: 208, tax: 'tax incl.', url: 'https://sorahost.net/' },
    { name: 'UGOEMO Cloud', plan: 'CloudCompute U1 small, 1 vCPU, 2 GB', monthly: 660, perGb: 330, tax: 'tax incl. (¥600 before tax)', url: 'https://cloud.ugoemo.net/services/cloud-compute' },
    { name: 'Shin VPS', plan: 'Standard, 2 cores, 2 GB (1-month term)', monthly: 1040, perGb: 520, tax: 'tax not stated', url: 'https://www.shin-vps.jp/service/price.php' },
  ],
  notes: [
    'Monthly prices as shown on each company\'s official site on October 26, 2026. They may have changed since.',
    'CPU, disk, traffic, contract terms and the kind of service (VPS, game server and so on) differ between companies. This compares memory only.',
    '"Tax not stated" means we could not find whether the price on the official price list includes tax; we show the price as listed. UGOEMO Cloud lists prices before tax, so we added 10%.',
    'SORAHOST: ¥80 base (includes 256 MB) plus ¥24 per extra 128 MB. AGAMES: ¥241 base (includes 1 GB) plus ¥157 for 2 GB.',
  ],
  sourcesLabel: 'Price pages',
};

export const vsLabels = { before: 'Before', after: 'With ASHIKA Network' };
