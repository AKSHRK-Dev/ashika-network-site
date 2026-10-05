/**
 * 英語版のトップページの文言・データ（src/data/home.ts の英語版）。
 * 金額・スペック・申し込み先は日本語版と同じ。変えるときは両方を直す。
 */
import { dashHost, links } from '../site';
import type { Plan, PlanKind, UseCase } from '../home';

/* ---------- Hero ---------- */
export const hero = {
  title: ['Connections', 'that stay on'],
  lead: [
    'Discord bots and web apps keep running as long as they have a place to live.',
    'We give them that place, from ¥30 a month, in a data center in Osaka.',
  ],
  primary: { label: 'Choose a plan', href: links.shop },
  secondary: { label: 'Compare prices', href: '#plans' },
  countDelay: 350,
  bar: {
    label: 'Smallest plan',
    from: 1200,
    price: 30,
    duration: 1700,
    suffix: '/month and up',
    note: 'Tax included. Monthly terms.',
  },
};

/* ---------- Use cases ---------- */
export const uses = {
  title: ['Stuck because', 'it has nowhere to run.'],
  duration: 6000,
  tabsAria: 'Use cases',
  lead: 'The code you wrote and the server you want to open can move forward once they have somewhere to run. Pick one of the four most common uses.',
  button: { label: 'Start with this use', href: links.shop },
  items: [
    {
      guide: { label: 'More about running a Discord bot 24/7', href: '/en/discord-bot' },
      label: 'Discord bot',
      tag: 'Standard plans',
      title: ['Keep the bot you wrote', 'running, always'],
      desc: ['Upload your files and start it. We take care of keeping it running.'],
      points: ['Restarts by itself if it crashes', 'Splitting into several bots costs little', 'Follow the logs right in your browser'],
      vs: {
        who: 'On your own PC',
        before: 'You pay for the electricity, and if it crashes while you sleep, nobody notices.',
        after: 'Always on. Crashes are detected and it comes back by itself.',
      },
    },
    {
      label: 'Web app',
      tag: 'Standard plans',
      title: ['Show people', 'what you made'],
      desc: ['Runs on the major runtimes. Point your own domain at it and it is live.'],
      points: ['Keep the language you already use', 'Custom domains and HTTPS', 'Fast for visitors in Japan'],
      vs: {
        who: 'On free hosting',
        before: 'Projects vanish if left alone for a while, or HTTPS is not available.',
        after: 'From ¥30 a month, with no expiry and no such limits.',
      },
    },
    {
      guide: { label: 'How to run Python 24/7', href: '/en/python' },
      label: 'Data processing',
      tag: 'High-memory plans',
      title: ['Leave heavy jobs', 'running on their own'],
      desc: ['Keep memory-hungry jobs running: aggregation, conversion, collection.'],
      points: ['Choose plans with plenty of memory', 'Long jobs keep going without you', 'Run things at set times'],
      vs: {
        who: 'On your own PC',
        before: 'It only progresses while your PC is open, and you cannot leave until it is done.',
        after: 'Leave it running. No need to wait for it to finish.',
      },
    },
    {
      label: 'Development and testing',
      tag: 'Standard / High-memory',
      title: ['A server just for trying things,', 'without the fuss'],
      desc: ['Good for checking things before production, or for tests with a set end date.'],
      points: ['Ready in minutes', 'Contracts from one month', 'Let it go as soon as you are done'],
      vs: {
        who: 'On pay-as-you-go clouds',
        before: 'Forget to delete something and an unexpected bill arrives the next month.',
        after: 'Flat rate. You are never charged more than the balance you topped up.',
      },
    },
  ] satisfies UseCase[],
};

/* ---------- Pricing ---------- */
export const specLabels = ['Memory', 'CPU', 'Storage', 'Backups', 'IPv4'];

const planList: Record<PlanKind, Plan[]> = {
  standard: [
    { name: 'Mini', monthly: 30, quarterly: 90, specs: ['256MB', '20%', '512MB', '1', 'Shared'], fit: 'Try out your first server', href: 'https://dash.ashikanw.com/shop/mini' },
    { name: 'Basic', monthly: 50, quarterly: 120, specs: ['512MB', '50%', '2048MB', '2', 'Shared'], fit: 'Keep a bot or site always on', hot: true, href: 'https://dash.ashikanw.com/shop/basic' },
    { name: 'Plus', monthly: 110, quarterly: 300, specs: ['1024MB', '100%', '5120MB', '3', 'Shared'], fit: 'Busier projects, or more of them', href: 'https://dash.ashikanw.com/shop/plus' },
    { name: 'Pro', monthly: 230, quarterly: 630, specs: ['2048MB', '150%', '10240MB', '4', 'Shared'], fit: 'Several services in one place', href: 'https://dash.ashikanw.com/shop/pro' },
    { name: 'Max', monthly: 470, quarterly: 1290, specs: ['4096MB', '200%', '20480MB', '5', 'Shared'], fit: 'The most a shared plan offers', href: 'https://dash.ashikanw.com/shop/max' },
  ],
  memory: [
    { name: 'Memory Basic', monthly: 100, quarterly: 275, specs: ['1024MB', '20%', '1024MB', '1', 'Shared'], fit: 'Just need more memory', href: 'https://dash.ashikanw.com/shop/mem-basic' },
    { name: 'Memory Plus', monthly: 120, quarterly: 330, specs: ['2048MB', '50%', '2048MB', '2', 'Shared'], fit: 'Keep heavy jobs running', hot: true, href: 'https://dash.ashikanw.com/shop/mem-plus' },
  ],
  enterprise: [
    { name: 'VPS', monthly: null, quarterly: null, specs: ['Up to 64GB', '10 cores', '500GB SSD', 'None', '1 dedicated'], fit: 'You need dedicated IPv4 and root', hot: true, note: 'Orders open October 13, 2026', href: links.discord },
    { name: 'Custom', monthly: null, quarterly: null, specs: ['Ask us', 'Ask us', 'Ask us', 'Ask us', 'Ask us'], fit: 'Bigger than anything above', href: links.discord },
  ],
};

export const plans = {
  title: ['Only what you need,', 'only as long as you need it.'],
  lead: ['The use only decides how much memory and CPU you need.', 'If unsure, start with the popular plan and move up when it is not enough.'],
  kinds: [
    { key: 'standard', label: 'Standard', desc: 'Balanced CPU and memory. Works for bots, web apps and testing alike.' },
    { key: 'memory', label: 'High memory', desc: 'Plenty of memory. For always-on programs that use a lot of it, such as data processing.' },
    { key: 'enterprise', label: 'Enterprise', desc: 'Dedicated VPS and large setups, arranged one by one. VPS orders open on October 13, 2026; until then, ask us on Discord.' },
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
  note: [
    'All prices include tax. Every plan runs in Japan.',
    'You can pay by credit card (VISA, Mastercard, AMEX), PayPay, bank transfer, Google Pay or Apple Pay.',
    'Standard and high-memory plans share one IP address, split by port. If you need a dedicated IPv4 address, see Enterprise.',
  ],
  list: planList,
  support: {
    title: 'For nonprofits, students and open source developers',
    text: 'Through the ASHIKA Group support program, approved applicants can use servers for free (up to 20 for nonprofits, up to 10 for individuals).',
    label: 'See the support program',
    href: 'https://group.ashikanw.com/en-us/supportprogram/',
  },
};

/* ---------- Location ---------- */
export const location = {
  title: ['Our home:', 'northern Osaka.'],
  lead: 'Every server runs in a data center in the Hokusetsu area of northern Osaka. Connections from within Japan see almost no delay from distance.',
  specs: [
    { k: 'Where', v: 'A data center in the Hokusetsu area, Osaka Prefecture' },
    { k: 'Network', v: 'Connected over routes tuned for Japan' },
    { k: 'Choosing', v: 'We have one site, so there is nothing to choose when you buy' },
  ],
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
  lead: 'Buying, starting, stopping and managing files all happen on the same screen. (The panel itself is in Japanese.)',
  url: dashHost,
  shots: [
    {
      title: 'Balance and contracts at a glance',
      desc: 'How much is left, and which server runs until when. You see it the moment you open it.',
      tags: [],
      src: '/uploads/panel/dashboard.webp',
      alt: 'Dashboard screen',
    },
    {
      title: 'The console is in your browser',
      desc: 'Start, stop, restart and read the logs without connecting over SSH.',
      tags: [],
      src: '/uploads/panel/server.webp',
      alt: 'Server console screen',
    },
    {
      title: 'Add more in minutes',
      desc: 'Pick a plan and a period. It is paid from your balance and ready to use.',
      tags: [],
      src: '/uploads/panel/shop.webp',
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
  lead: ['From your very first server to running a busy community.', 'Here are the six things we offer.'],
  bigUnit: '/mo+',
  items: [
    { title: 'From ¥30 a month', desc: 'Less than a can of soda gets you a server of your own.', big: '¥30' },
    { title: 'Stays up', desc: 'Crashes are detected and restarted automatically. If it falls over at night, it is running again by morning.' },
    { title: 'No SSH needed', desc: 'Start it and edit files from your browser. No need to set anything up on your computer.' },
    { title: 'Flat-rate billing only', desc: 'No pay-as-you-go bills. You are never charged more than the balance you topped up.' },
    { title: 'Try it for a month', desc: 'No long contracts. If it does not suit you, stop at the end of the period.' },
    { title: 'A community to ask', desc: 'Stuck? Ask on Discord, where others run the same setup. (Mostly in Japanese.)' },
  ],
};

/* ---------- Three steps ---------- */
export const flow = {
  title: 'Three steps after signing up.',
  lead: 'No complicated setup. Add balance, pick a plan, upload your files.',
  steps: [
    { title: 'Add balance', desc: 'Top up by credit card, PayPay, bank transfer, Apple Pay or Google Pay. It arrives in minutes (bank transfers take 1 to 3 business days).', href: '/en#charge', linkLabel: 'How to top up' },
    { title: 'Pick a plan', desc: 'Choose a plan and a period and buy it. Your connection details are issued right away.' },
    { title: 'Upload your files', desc: 'Upload your code and start it. It is now reachable from the outside.' },
  ],
};

/* ---------- Top up ---------- */
export const charge = {
  title: 'Servers are paid from your balance.',
  lead: 'You add balance first, and server fees are paid from it. Balance is added with a top-up code.',
  facts: [
    { label: 'Product', value: 'Top-up code', note: 'Used to pay for ASHIKA Network servers.' },
    { label: 'Amount', value: '¥100 to ¥500,000', note: 'In steps of ¥100.' },
    { label: 'Payment', value: 'PayPay, credit card, bank transfer, Apple Pay, Google Pay', note: 'We accept VISA, Mastercard and AMEX.' },
    { label: 'Delivery', value: 'Right after payment', note: 'Shown on screen and sent by email. For bank transfers, we email it once the payment is confirmed. With PayPay, you receive a STORES order number instead of a code.' },
  ],
  steps: [
    { title: 'Choose an amount', desc: 'Pick a common amount, or type one in steps of ¥100.' },
    { title: 'Pay', desc: 'Card and bank transfer payments issue a top-up code. PayPay takes you to another page and sends an order number after payment. No account needed for either.' },
    { title: 'Add it to your balance', desc: 'Enter the code under "Balance and history" in the customer panel. With PayPay, enter the order number instead.' },
  ],
  primary: { label: 'Top up your balance', href: links.charge },
  secondary: { label: 'Payment Services Act Notice', href: '/en/kessai' },
  note: 'Unused top-up codes do not expire. For refunds, see the Payment Services Act Notice.',
};

/* ---------- FAQ ---------- */
export const faq = {
  title: 'FAQ',
  button: { label: 'Ask on Discord', href: links.discord },
  more: { label: 'See all questions', href: '/en/faq' },
  items: [
    {
      q: 'What does the service do?',
      a: 'We rent out a place to put programs and keep them running: Discord bots, web apps, scheduled scripts, data aggregation and conversion. From ¥30 a month.',
    },
    {
      q: 'How do I pay?',
      a: 'You top up your balance first, and server fees are paid from it. Top-ups accept PayPay, credit cards (VISA, Mastercard, AMEX), bank transfer, Apple Pay and Google Pay, from ¥100 to ¥500,000 in steps of ¥100. You can buy a top-up without an account. For bank transfers we send the code once the payment is confirmed (1 to 3 business days). PayPay has no top-up code: enter the order number you receive from STORES and it is added to your balance.',
    },
    {
      q: 'It says "out of stock" and I cannot buy.',
      a: 'Each plan has a limited number of slots, and it shows out of stock when they are full. There is no fixed date for adding more, but slots free up automatically when people cancel or change plans. Please check back every few days.',
    },
    {
      q: 'Where are the servers?',
      a: 'In a data center in the Hokusetsu area of northern Osaka. We have one site, so there is nothing to choose when you buy. Even if you use it from outside Japan, the servers are in Osaka.',
    },
    {
      q: 'What is the difference between Standard and High memory?',
      a: 'At the same price, Standard plans get more CPU and High-memory plans get more memory. Choose Standard for bots and sites, and High memory for jobs that use a lot of memory.',
    },
    {
      q: 'Do I pay every month?',
      a: 'You can pay monthly, or for three months at once. Three months works out cheaper per month. See the pricing table above.',
    },
    {
      q: 'Can I use it right after buying?',
      a: 'Your connection details are issued the moment you buy, and you can upload files right away. No setup is needed.',
    },
    {
      q: 'Can I use it from outside Japan?',
      a: 'Yes. There are no regional limits on signing up, paying or using your server. The website is available in English, but the customer panel and our support are in Japanese only. The servers are in Osaka, so connections from far away take longer.',
    },
  ],
};

/* ---------- Final call to action ---------- */
export const cta = {
  title: ['No more worrying', 'about where to run it.'],
  lead: ['One server for ¥30 a month. If it does not suit you, stop after a month.', 'Start small and see.'],
  primary: { label: 'Choose a plan', href: links.shop },
  secondary: { label: 'Ask on Discord', href: links.discord },
};
