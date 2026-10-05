/**
 * 英語版の読みもののページの見出し・説明・日付（src/data/guides.ts の英語版）。
 * 本文は src/content/guides/en/*.html。
 */
import type { Guide, GuideLink } from '../guides';

const LINK = {
  discordBot: {
    href: '/en/discord-bot',
    title: 'Run a Discord bot 24/7',
    desc: 'A place that keeps running when your PC is off, starting from the ¥30 plan.',
  },
  python: {
    href: '/en/python',
    title: 'Run Python 24/7',
    desc: 'Scheduled jobs, scraping and always-on scripts, away from your home PC.',
  },
  vps: {
    href: '/en/vps',
    title: 'VPS (dedicated IPv4, root access)',
    desc: 'For when a shared plan is not enough. Orders open October 13, 2026.',
  },
  faq: {
    href: '/en/faq',
    title: 'FAQ',
    desc: 'Prices, payment, specs and terms, all answered in one place.',
  },
  plans: {
    href: '/en#plans',
    title: 'Pricing',
    desc: 'From ¥30 a month. Compare memory, CPU and storage side by side.',
  },
} satisfies Record<string, GuideLink>;

export const guides: Guide[] = [
  {
    href: '/en/discord-bot',
    title: 'How to run a Discord bot 24/7',
    crumb: 'Discord bot hosting',
    heading: 'Run your Discord bot<br />24/7.',
    lead: 'Your bot goes down when you close your PC. Move it somewhere else and that problem is over. Here is how much it needs, how to get it running, and the usual stumbling blocks.',
    description:
      'How to run a Discord bot 24/7: how much memory it needs, what it costs, and the steps. Works with discord.py and discord.js. From ¥30 a month, a place that keeps running when your PC is off.',
    keywords:
      'Discord bot,24/7,always on,hosting,discord.py,discord.js,cheap,VPS,Python,Node.js,keep running,Japan',
    updated: '2026-09-16',
    updatedLabel: 'September 16, 2026',
    ctaTitle: 'Get a home for your bot now',
    ctaLead: 'A small bot fits in the ¥30 Mini. Minutes after buying, you can upload your files and start it.',
    withFaq: true,
    related: [LINK.python, LINK.plans, LINK.faq],
  },
  {
    href: '/en/python',
    title: 'How to run Python 24/7',
    crumb: 'Python hosting',
    heading: 'Keep your Python<br />running.',
    lead: 'Scheduled scripts, data collection, always-on jobs. On your home PC they stop every time it restarts. Move them somewhere else and that worry is gone.',
    description:
      'How to run Python scripts 24/7: scheduled jobs with cron, always-on processes, how much memory you need, and how it compares to running on your PC. From ¥30 a month in a data center in Japan.',
    keywords: 'Python,24/7,always on,scheduled,cron,scraping,automation,server,hosting,cheap,VPS,script,Japan',
    updated: '2026-09-16',
    updatedLabel: 'September 16, 2026',
    ctaTitle: 'Get a home for your scripts',
    ctaLead: 'Light jobs start at ¥30 a month. When they grow, move up a plan.',
    related: [LINK.discordBot, LINK.plans, LINK.faq],
  },
  {
    href: '/en/vps',
    title: 'VPS (dedicated IPv4, root access)',
    crumb: 'VPS',
    heading: 'VPS.<br />A whole server, yours.',
    lead: 'For those who need more than a shared plan: a setup with its own dedicated IPv4 address and root access. Orders open on October 13, 2026.',
    description:
      'The ASHIKA Network VPS comes with a dedicated IPv4 address and root access. Up to 64GB of memory, 10 cores and a 500GB SSD. Orders open October 13, 2026. Also explains how it differs from shared plans.',
    keywords: 'VPS,dedicated IPv4,root access,cheap VPS,Japan VPS,Osaka,virtual server,64GB,10 cores,SSD',
    updated: '2026-09-16',
    updatedLabel: 'September 16, 2026',
    ctaTitle: 'Orders open soon',
    ctaLead: 'We start taking orders on October 13, 2026. Until then, ask us on Discord.',
    related: [LINK.plans, LINK.discordBot, LINK.faq],
  },
];

export const guideByHref = (href: string) => {
  const guide = guides.find((g) => g.href === href);
  if (!guide) throw new Error(`Guide not found: ${href}`);
  return guide;
};
