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
    { name: 'ASHIKA Network', self: true, plan: 'Memory Plus, 2 GB memory, 50% CPU', monthly: 120, perGb: 60, tax: 'tax incl.' },
    { name: 'Service A', plan: 'Game server, 0.5 vCPU, 2 GB', monthly: 180, perGb: 90, tax: 'tax not stated' },
    { name: 'Service B', plan: 'App server, 1 core, 2 GB', monthly: 398, perGb: 199, tax: 'tax not stated' },
    { name: 'Service C', plan: 'Server for programs, 50% CPU, 2 GB', monthly: 416, perGb: 208, tax: 'tax incl.' },
    { name: 'Service D', plan: 'Cloud virtual server, 1 vCPU, 2 GB', monthly: 660, perGb: 330, tax: 'tax incl. (¥600 before tax)' },
    { name: 'Service E', plan: 'VPS, 2 cores, 2 GB (1-month term)', monthly: 1040, perGb: 520, tax: 'tax not stated' },
  ],
  notes: [
    'Other services are shown without their names. Monthly prices as shown on each company\'s official site on October 26, 2026; they may have changed since.',
    'CPU, disk, traffic, contract terms and the kind of service (VPS, game server and so on) differ between companies. This compares memory only.',
    '"Tax not stated" means we could not find whether the listed price includes tax; we show it as listed. Prices listed before tax have 10% added.',
    'For services that include a fixed amount of memory in a base price and charge for more, we added enough to reach 2 GB.',
  ],
};

export const vsLabels = { before: 'Before', after: 'With ASHIKA Network' };
