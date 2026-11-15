/**
 * 英語版のトップページの文言・データ（src/data/home.ts の英語版）。
 * 金額・スペック・申し込み先は日本語版と同じ。変えるときは両方を直す。
 */
import { dashHost, links } from '../site';
import type { Plan, PlanKind, UseCase } from '../home';

/* ---------- Hero ---------- */
export const hero = {
  headline: { before: 'From ¥', after: ' a month', second: 'Lowest price in Japan', mark: '*1' },
  points: [
    { value: '99.9%', label: 'server uptime', mark: '*2' },
    { value: 'Custom domains', label: 'supported' },
    { value: 'Many kinds', label: 'of hosting' },
  ],
  sub: 'Upload your bot or website, and it keeps running.',
  lead: [
    'Discord bots, Next.js sites and web apps keep running as long as they have a place to live.',
    'We run everything in a data center in Osaka, on monthly terms.',
  ],
  primary: { label: 'Choose a plan', href: links.shop },
  secondary: { label: 'Compare prices', href: '#plans' },
  /** 右に出すパネルの画面の説明（読み上げ用） */
  visualAlt: 'The server console screen of the control panel',
  countDelay: 350,
  bar: {
    from: 1200,
    price: 30,
    duration: 1700,
    note: 'Tax included. Monthly terms.',
    bestShort: '*1 Our own survey, October 2026 (see notes)',
    bestNote: '*1 Our own survey, October 2026: compared with the monthly price (tax included) of the cheapest plan of hosting services in Japan for Discord bots and always-on programs.',
    uptimeNote: '*2 Measured uptime of our server (Node1) from September 17 to October 2026, by the external monitoring service HetrixTools. This does not guarantee future uptime.',
  },
};

/* ---------- Use cases ---------- */
export const uses = {
  title: ['Stuck because', 'it has nowhere to run.'],
  duration: 6000,
  tabsAria: 'Use cases',
  lead: '',
  button: { label: 'Start with this use', href: links.shop },
  items: [
    {
      guide: { label: 'More about running a Discord bot 24/7', href: '/en/discord-bot' },
      label: 'Discord bot',
      tag: 'Standard plans',
      title: ['Keep the bot you wrote', 'running, always'],
      desc: [],
      points: ['Restarts by itself if it crashes', 'Splitting into several bots costs little', 'Follow the logs right in your browser'],
    },
    {
      label: 'Web app',
      tag: 'Standard / Next.js plans',
      title: ['Show people', 'what you made'],
      desc: [],
      points: ['Dedicated Next.js plans', 'Custom domains and HTTPS', 'Fast for visitors in Japan'],
    },
    {
      guide: { label: 'How to run Python 24/7', href: '/en/python' },
      label: 'Data processing',
      tag: 'High-memory plans',
      title: ['Leave heavy jobs', 'running on their own'],
      desc: [],
      points: ['Choose plans with plenty of memory', 'Long jobs keep going without you', 'Run things at set times'],
    },
    {
      label: 'Development and testing',
      tag: 'Standard / High-memory',
      title: ['A server just for trying things,', 'without the fuss'],
      desc: [],
      points: ['Ready in minutes', 'Contracts from one month', 'Let it go as soon as you are done'],
    },
  ] satisfies UseCase[],
};

/* ---------- Pricing ---------- */
export const specLabels = ['Memory', 'CPU', 'Storage', 'Backups', 'IPv4'];

const planList: Record<PlanKind, Plan[]> = {
  standard: [
    { name: 'Mini', monthly: 30, quarterly: 90, specs: ['256MB', '20%', '512MB', '1', 'Shared'], fit: 'Try out your first server', href: 'https://dash.ashikanw.com/order/mini' },
    { name: 'Basic', monthly: 50, quarterly: 120, specs: ['512MB', '50%', '2048MB', '2', 'Shared'], fit: 'Keep a bot or site always on', hot: true, href: 'https://dash.ashikanw.com/order/basic' },
    { name: 'Plus', monthly: 110, quarterly: 300, specs: ['1024MB', '100%', '5120MB', '3', 'Shared'], fit: 'Busier projects, or more of them', href: 'https://dash.ashikanw.com/order/plus' },
    { name: 'Pro', monthly: 230, quarterly: 630, specs: ['2048MB', '150%', '10240MB', '4', 'Shared'], fit: 'Several services in one place', href: 'https://dash.ashikanw.com/order/pro' },
    { name: 'Max', monthly: 470, quarterly: 1290, specs: ['4096MB', '200%', '20480MB', '5', 'Shared'], fit: 'The most a shared plan offers', href: 'https://dash.ashikanw.com/order/max' },
  ],
  memory: [
    { name: 'Memory Basic', monthly: 110, quarterly: 300, specs: ['1024MB', '20%', '1024MB', '1', 'Shared'], fit: 'Just need more memory', href: 'https://dash.ashikanw.com/order/mem-basic' },
    { name: 'Memory Plus', monthly: 120, quarterly: 330, specs: ['2048MB', '50%', '2048MB', '2', 'Shared'], fit: 'Keep heavy jobs running', hot: true, href: 'https://dash.ashikanw.com/order/mem-plus' },
  ],
  nextjs: [
    { name: 'Next.js 2GB', monthly: 230, quarterly: 630, specs: ['2048MB', '150%', '10240MB', '5', 'Shared'], fit: 'Small sites and personal apps', hot: true, href: 'https://dash.ashikanw.com/order/nextjs-2gb' },
    { name: 'Next.js 4GB', monthly: 470, quarterly: 1290, specs: ['4096MB', '200%', '20480MB', '5', 'Shared'], fit: 'Image-heavy sites and busy apps', href: 'https://dash.ashikanw.com/order/nextjs-4gb' },
  ],
  enterprise: [
    { name: 'Custom', monthly: null, quarterly: null, specs: ['Ask us', 'Ask us', 'Ask us', 'Ask us', 'Ask us'], fit: 'Bigger than anything above', href: links.discord },
  ],
};

export const plans = {
  title: ['Only what you need,', 'only as long as you need it.'],
  lead: [],
  kinds: [
    { key: 'standard', label: 'Standard', desc: 'Balanced CPU and memory, for bots, web apps and testing.' },
    { key: 'memory', label: 'High memory', desc: 'For programs that use a lot of memory, such as data processing.' },
    { key: 'nextjs', label: 'Next.js', desc: 'For Next.js. Upload your files and we build and publish them.' },
    { key: 'enterprise', label: 'Enterprise', desc: 'For special setups, ask us on Discord.' },
  ] as const,
  terms: { monthly: 'Monthly', quarterly: '3 months' },
  badge: (n: number) => `Save up to ${n}%`,
  badgeNone: 'Save',
  fitLabel: 'Best for',
  button: 'Start with this plan',
  labels: {
    kindsAria: 'Plan types',
    switchAria: 'Show 3-month prices',
    scrollHint: 'Scroll sideways to see the other plans',
    itemAria: 'Item',
    plan: 'Plan',
    hot: 'Popular',
    price: 'Price',
    ctaAria: 'Sign up',
    unit: { monthly: '/mo', quarterly: '/3 mo' },
    note: {
      monthly: { before: 'With 3 months: ', after: '/mo' },
      quarterly: { before: 'Per month: ', after: '' },
    },
    ask: { price: 'Ask us', note: 'We quote based on the setup', button: 'Ask on Discord' },
  },
  note: ['All prices include tax. Every plan runs in Japan.'],
  list: planList,
  support: {
    title: 'For nonprofits, students and open source developers',
    text: '',
    label: 'See the support program',
    href: 'https://group.ashikanw.com/en-us/supportprogram/',
  },
};

/* ---------- Location ---------- */
export const location = {
  title: ['Our home:', 'northern Osaka.'],
  lead: '',
  specs: [
    { k: 'Where', v: 'A data center in northern Osaka' },
    { k: 'Network', v: 'Tuned for Japan' },
  ],
  nodesTitle: 'Server hardware',
  map: {
    city: '箕面市',
    pin: [135.4706, 34.8267] as [number, number],
    callout: [135.15, 34.8267] as [number, number],
    label: 'Minoh',
    labelSub: 'Northern Osaka',
    bigCities: ['大阪市', '堺市'],
    alt: 'Map of Osaka Prefecture. We are based in Minoh, in the north.',
    caption:
      'Source: National Land Numerical Information (Administrative Areas), Ministry of Land, Infrastructure, Transport and Tourism (as of January 1, 2025), processed by ASHIKA Network. Based on survey results of the Geospatial Information Authority of Japan.',
  },
};

/* ---------- Customer panel ---------- */
export const panel = {
  title: ['One place', 'for everything.'],
  lead: '',
  url: dashHost,
  shots: [
    {
      title: 'Balance and contracts at a glance',
      desc: '',
      tags: [],
      src: '/uploads/panel/dashboard.webp?v=20261029',
      alt: 'Dashboard screen',
    },
    {
      title: 'The console is in your browser',
      desc: '',
      tags: [],
      src: '/uploads/panel/server.webp?v=20261029',
      alt: 'Server console screen',
    },
    {
      title: 'Add more in minutes',
      desc: '',
      tags: [],
      src: '/uploads/panel/shop.webp?v=20261029',
      alt: 'Server purchase screen',
    },
  ],
  width: 2000,
  height: 1183,
};

/* ---------- Features ---------- */
export const features = {
  title: [
    [{ t: 'Cheap' }, { t: ', ' }, { t: 'always on' }, { t: ', ' }, { t: 'no hassle' }, { t: ':' }],
    [{ t: 'six things', em: true }, { t: '.' }],
  ],
  lead: [],
  bigUnit: '/mo+',
  items: [
    { icon: 'coin', title: 'From ¥30 a month', desc: '', big: '¥30' },
    { icon: 'refresh', title: 'Restarts by itself', desc: '' },
    { icon: 'window', title: 'Runs in your browser', desc: '' },
    { icon: 'wallet', title: 'Flat-rate billing only', desc: '' },
    { icon: 'calendar', title: 'Try it for a month', desc: '' },
    { icon: 'chat', title: 'A community to ask', desc: '' },
  ],
};

/* ---------- Three steps ---------- */
export const flow = {
  title: 'Three steps to get started.',
  lead: '',
  steps: [
    { title: 'Pick a plan', desc: '', href: '/en#plans', linkLabel: 'See pricing' },
    { title: 'Pay', desc: '', href: '/en#charge', linkLabel: 'About top-ups' },
    { title: 'Upload your files', desc: '' },
  ],
};

/* ---------- Top up ---------- */
export const charge = {
  title: 'Pay on the spot, or from your balance.',
  lead: 'Add balance with a top-up code.',
  facts: [
    { label: 'Product', value: 'Top-up code', note: '' },
    { label: 'Amount', value: '¥100 to ¥500,000', note: '' },
    { label: 'Payment', value: 'Card, bank transfer, Apple Pay, Google Pay, PayPay, convenience store, carrier billing and more', note: '' },
    { label: 'Delivery', value: 'Right after payment', note: '' },
  ],
  steps: [
    { title: 'Choose an amount', desc: '' },
    { title: 'Pay', desc: '' },
    { title: 'Add it to your balance', desc: '' },
  ],
  primary: { label: 'Top up your balance', href: links.charge },
  secondary: { label: 'Payment Services Act Notice', href: '/en/kessai' },
  note: '',
};

/* ---------- FAQ ---------- */
export const faq = {
  title: 'FAQ',
  button: { label: 'Ask on Discord', href: links.discord },
  more: { label: 'See all questions', href: '/en/faq' },
  items: [
    {
      q: 'What does the service do?',
      a: 'A place to put programs and keep them running: Discord bots, web apps, scheduled scripts. From ¥30 a month.',
    },
    {
      q: 'How do I pay?',
      a: 'On the spot (credit card, Apple Pay, Google Pay or bank transfer), or from a balance you topped up in advance. PayPay, convenience store payment and carrier billing work for top-ups.',
    },
    {
      q: 'It says "out of stock" and I cannot buy.',
      a: 'Each plan has a limited number of slots. They free up when people cancel or change plans, so please check back every few days.',
    },
    {
      q: 'Where are the servers?',
      a: 'In a data center in northern Osaka. We have one site, so there is nothing to choose.',
    },
    {
      q: 'What is the difference between Standard and High memory?',
      a: 'Standard plans get more CPU, High-memory plans get more memory. Choose Standard for bots and sites.',
    },
    {
      q: 'Do I pay every month?',
      a: 'Monthly, or three months at once. Three months works out cheaper per month.',
    },
    {
      q: 'Can I use it right after buying?',
      a: 'Yes. Your connection details are issued the moment you buy. No setup is needed.',
    },
    {
      q: 'Can I use it from outside Japan?',
      a: 'Yes. The customer panel and our support are in Japanese only. The servers are in Osaka.',
    },
  ],
};

/* ---------- Final call to action ---------- */
export const cta = {
  title: ['No more worrying', 'about where to run it.'],
  lead: ['One server for ¥30 a month. Stop after a month if you like.'],
  primary: { label: 'Choose a plan', href: links.shop },
  secondary: { label: 'Ask on Discord', href: links.discord },
  ball: { top: 'From', value: '¥30', unit: '', bottom: ['a month', 'tax incl.'] },
};


/* ---------- Added for the new design (2026-11) ---------- */
export const sectionLabels = {
  reasons: 'Why us',
  uses: 'What you can run',
  plans: 'Pricing',
  compare: 'Price comparison',
  trust: 'Peace of mind',
  climate: 'For the planet',
  panel: 'Control panel',
  location: 'Location',
  flow: 'Getting started',
  charge: 'Payment',
  faq: 'FAQ',
};

export const heroPick = {
  eyebrow: 'A home for programs that need to keep running',
  title: 'Three quick ways to start',
  lead: '',
  all: { label: 'Compare all plans', href: '#plans' },
  unit: '/mo',
  taxIn: 'tax incl.',
  facts: [
    { k: 'Term', v: 'Monthly' },
    { k: 'Billing', v: 'Flat rate only' },
    { k: 'Setup fee', v: '¥0' },
    { k: 'Location', v: 'Osaka, Japan' },
  ],
  sticky: { text: 'From ¥30/mo, tax incl.', button: 'Choose a plan' },
  notesAria: 'Notes',
};

export const usesLabels = { points: 'What you get', after: 'With ASHIKA Network' };

/* ---------- Peace of mind ---------- */
export const trust = {
  title: ['Careful where', 'you cannot see.'],
  lead: '',
  statsAria: 'ASHIKA Network in numbers',
  stats: [
    { value: '¥0', unit: '', label: 'Setup fee' },
    { value: '1', unit: 'month', label: 'Minimum term' },
    { value: '¥30', unit: '/mo', label: 'Cheapest plan, tax incl.' },
    { value: '99.9', unit: '%', label: 'Server uptime', mark: '*2' },
  ],
  items: [
    {
      icon: 'pulse',
      title: 'Uptime anyone can check',
      desc: '',
      link: { label: 'See the status page', href: links.status, external: true },
    },
    {
      icon: 'refresh',
      title: 'Restarts on its own',
      desc: '',
    },
    {
      icon: 'wallet',
      title: 'You pay only what you chose',
      desc: '',
    },
    {
      icon: 'chip',
      title: 'Hardware in the open',
      desc: '',
      link: { label: 'See the server specs', href: '/en/specs' },
    },
    {
      icon: 'doc',
      title: 'Rules you can read',
      desc: '',
      link: { label: 'Terms and policies', href: '/en/legal' },
    },
  ],
};

/* ---------- For the planet (Stripe Climate) ---------- */
export const climate = {
  title: ['0.5% of our revenue goes', 'to fighting climate change.'],
  lead: 'We give 0.5% of the revenue paid through Stripe to carbon removal technology (Stripe Climate).',
  points: [
    { value: '0.5%', label: 'of revenue donated' },
    { value: '¥0', label: 'extra cost to you' },
  ],
  note: '',
  link: { label: 'About Stripe Climate', href: 'https://stripe.com/climate' },
};

/* ---------- Notes and sources (gathered at the very bottom of the page) ---------- */
export const notes = {
  title: 'Notes and sources',
  link: 'See notes and sources',
  items: [
    { k: '*1', v: 'Our own survey, October 2026: compared with the monthly price (tax included) of the cheapest plan of hosting services in Japan for Discord bots and always-on programs.' },
    { k: '*2', v: 'Measured uptime of our server (Node1) from September 17 to October 2026, by the external monitoring service HetrixTools. This does not guarantee future uptime.' },
    { k: 'Pricing', v: 'All prices include tax. Standard, high-memory and Next.js plans share one IP address, split by port. We do not offer dedicated IPv4 addresses.' },
    { k: 'Payment', v: 'Credit card (VISA, Mastercard, AMEX), bank transfer, Google Pay and Apple Pay. Through our STORES shop: PayPay, JCB, d Barai, au Kantan Kessai, SoftBank Matomete Shiharai, convenience store payment, PayPal, Rakuten Pay and Paidy (pay later).' },
    { k: 'Top-ups', v: 'Top-up codes are ¥100 to ¥500,000 in steps of ¥100, shown on screen and emailed right after payment. For bank transfers, after the payment is confirmed (1 to 3 business days); for convenience store payment, after you have paid at the store. STORES payments give you an order number instead of a code. Unused codes do not expire. For refunds, see the Payment Services Act Notice.' },
    { k: 'Map', v: 'Source: National Land Numerical Information (Administrative Areas), Ministry of Land, Infrastructure, Transport and Tourism (as of January 1, 2025), processed by ASHIKA Network. Based on survey results of the Geospatial Information Authority of Japan.' },
  ],
};
