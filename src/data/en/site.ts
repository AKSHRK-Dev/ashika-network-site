/**
 * 英語版のサイト全体の文言（src/data/site.ts の英語版）。
 * URL・ロゴ・アクセス解析など言語に関係ないものは、日本語版のものをそのまま使う。
 * 内部リンクは /en から始める。
 */
import { analytics, brand, dashHost, links, snsItems, type NavItem } from '../site';

export { analytics, brand, dashHost, links, snsItems };
export type { NavItem };

export const site = {
  name: 'ASHIKA Network',
  tagline: 'Affordable hosting',
  url: 'https://www.ashikanw.com',
  homeTitle: 'Connections that stay on | Servers from ¥30 a month | ASHIKA Network',
  description:
    'A place for the programs you want to keep running, from ¥30 a month in a data center in Osaka, Japan. Discord bots, web apps, scheduled scripts and more. Monthly terms, no long contracts.',
  alternateNames: ['ASHIKA', 'ASHIKAネットワーク', 'アシカネットワーク', 'あしかネットワーク'],
  tagline2: 'Connections that stay on',
  keywords:
    'hosting,server,cheap hosting,Japan hosting,Osaka,Discord bot hosting,Python hosting,Node.js hosting,24/7,VPS,ASHIKA,ASHIKA Network',
  ogImage: { path: '/uploads/image.png', width: 1200, height: 630, alt: 'ASHIKA Network logo' },
  themeColor: '#14497e',
  googleVerification: '',
} as const;

export const ui = {
  skipToContent: 'Skip to content',
  header: {
    brandAria: `${site.name} home`,
    navAria: 'Main navigation',
    login: 'Log in',
    register: 'Sign up',
    menuAria: 'Menu',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  footer: {
    brandAria: `${site.name} home`,
    snsAria: 'Social media',
    columnsAria: 'Footer links',
    legalAria: 'Terms and policies',
  },
  notFound: {
    title: 'Page not found',
    code: '404',
    lead: 'The URL may be wrong, or the page may have moved or been removed.',
    button: { label: 'Go to the home page', href: '/en' },
  },
} as const;

export const nav: NavItem[] = [
  { label: 'What you can run', href: '/en#uses' },
  { label: 'Pricing', href: '/en#plans' },
  { label: 'Top up', href: '/en#charge' },
  { label: 'FAQ', href: '/en/faq' },
  { label: 'Status', href: links.status, external: true },
];

export const notice = {
  show: true,
  text: 'VPS (dedicated IPv4 with root access) opens on October 13, 2026. Questions are welcome on',
  linkLabel: 'Discord',
  linkHref: links.discord,
  after: '',
};

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Learn',
    items: [
      { label: 'What you can run', href: '/en#uses' },
      { label: 'See pricing', href: '/en#plans' },
      { label: 'Top up your balance', href: '/en#charge' },
      { label: 'Where we are', href: '/en#location' },
      { label: 'From sign-up to launch', href: '/en#flow' },
      { label: 'Free support program', href: 'https://group.ashikanw.com/en-us/supportprogram/', external: true },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Run a Discord bot 24/7', href: '/en/discord-bot' },
      { label: 'Run Python 24/7', href: '/en/python' },
      { label: 'VPS (dedicated IPv4, root)', href: '/en/vps' },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Ask on Discord', href: links.sns.discord, external: true },
      { label: 'Check service status', href: links.status, external: true },
    ],
  },
  {
    title: 'Customer panel',
    items: [
      { label: 'Create an account', href: links.register, external: true },
      { label: 'Log in', href: links.dash, external: true },
      { label: 'Buy a server', href: links.shop, external: true },
      { label: 'Top up your balance', href: links.charge, external: true },
    ],
  },
  {
    title: 'ASHIKA Group',
    items: [
      { label: 'About ASHIKA Group', href: 'https://group.ashikanw.com/en-us/', external: true },
      { label: 'Support program', href: 'https://group.ashikanw.com/en-us/supportprogram/', external: true },
      { label: 'StoriaMC', href: 'https://storiamc.com/en-us/', external: true },
      { label: 'SABALISU', href: 'https://minecrafts.jp', external: true },
    ],
  },
];

export const footerLegal: NavItem[] = [
  { label: 'All terms and policies', href: '/en/legal' },
  { label: 'Terms of Service', href: '/en/terms' },
  { label: 'Acceptable Use Policy', href: '/en/aup' },
  { label: 'Privacy Policy', href: '/en/privacy' },
  { label: 'Legal Notice (Specified Commercial Transactions Act)', href: '/en/tokusho' },
  { label: 'Payment Services Act Notice', href: '/en/kessai' },
];

export const footerText = {
  about:
    'ASHIKA Network rents out a place for the programs you want to keep running, from ¥30 a month.\nWe run everything in a data center in northern Osaka, Japan, on monthly terms.',
  copyright: '© 2026 ASHIKA Network. All rights reserved.',
  region: 'Our servers run in a data center in Osaka, Japan.',
  credit: { before: 'Developed by', name: 'ASHIKA Group', href: 'https://group.ashikanw.com/en-us/' },
  toTop: 'Back to the top',
};
