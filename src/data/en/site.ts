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
  { label: 'Docs', href: links.docs, external: true },
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
    title: 'Service',
    items: [
      { label: 'Pricing and plans', href: '/en#plans' },
      { label: 'What you can run', href: '/en#uses' },
      { label: 'Why ASHIKA Network', href: '/en#features' },
      { label: 'The customer panel', href: '/en#panel' },
      { label: 'From sign-up to launch', href: '/en#flow' },
      { label: 'Compared with doing it yourself', href: '/en#compare' },
      { label: 'VPS (dedicated IPv4, root)', href: '/en/vps' },
    ],
  },
  {
    title: 'Plans',
    items: [
      { label: 'Mini (¥30/month)', href: `${links.shop}/mini`, external: true },
      { label: 'Basic (¥50/month)', href: `${links.shop}/basic`, external: true },
      { label: 'Plus (¥110/month)', href: `${links.shop}/plus`, external: true },
      { label: 'Pro (¥230/month)', href: `${links.shop}/pro`, external: true },
      { label: 'Max (¥470/month)', href: `${links.shop}/max`, external: true },
      { label: 'Memory Basic (¥100/month)', href: `${links.shop}/mem-basic`, external: true },
      { label: 'Memory Plus (¥120/month)', href: `${links.shop}/mem-plus`, external: true },
      { label: 'Ask about VPS or custom builds', href: links.sns.discord, external: true },
    ],
  },
  {
    title: 'What you can run',
    items: [
      { label: 'Discord bots', href: '/en/discord-bot' },
      { label: 'Python programs', href: '/en/python' },
      { label: 'Web apps', href: '/en#uses' },
      { label: 'Data jobs and schedules', href: '/en#uses' },
      { label: 'Development and testing', href: '/en#uses' },
      { label: 'Anything that needs root (VPS)', href: '/en/vps' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Run a Discord bot 24/7', href: '/en/discord-bot' },
      { label: 'Run Python 24/7', href: '/en/python' },
      { label: 'Using a VPS', href: '/en/vps' },
      { label: 'Send files over SFTP', href: `${links.docs}/sftp/`, external: true },
      { label: 'FAQ', href: '/en/faq' },
    ],
  },
  {
    title: 'Developers',
    items: [
      { label: 'Docs (in Japanese)', href: links.docs, external: true },
      { label: 'Using the API', href: `${links.docs}/api/`, external: true },
      { label: 'API reference', href: `${links.docs}/api/reference/`, external: true },
      { label: 'API examples', href: `${links.docs}/api/examples/`, external: true },
      { label: 'Connect over SFTP', href: `${links.docs}/sftp/`, external: true },
      { label: 'Create an API key', href: `${links.dash}/api-keys`, external: true },
      { label: 'GitHub', href: 'https://github.com/AKSHRK-Dev', external: true },
    ],
  },
  {
    title: 'Customer panel',
    items: [
      { label: 'Create an account', href: links.register, external: true },
      { label: 'Log in', href: links.dash, external: true },
      { label: 'Dashboard', href: `${links.dash}/dashboard`, external: true },
      { label: 'Your servers', href: `${links.dash}/servers`, external: true },
      { label: 'Buy a server', href: links.shop, external: true },
      { label: 'Announcements', href: `${links.dash}/announcements`, external: true },
      { label: 'Help', href: `${links.dash}/help`, external: true },
      { label: 'Account settings', href: `${links.dash}/account`, external: true },
    ],
  },
  {
    title: 'Balance and payment',
    items: [
      { label: 'How topping up works', href: '/en#charge' },
      { label: 'Buy a top-up code', href: links.charge, external: true },
      { label: 'Billing history', href: `${links.dash}/billing`, external: true },
      { label: 'Payment methods', href: links.charge, external: true },
      { label: 'Payment Services Act Notice', href: '/en/kessai' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Ask on Discord', href: links.sns.discord, external: true },
      { label: 'Service status', href: links.status, external: true },
      { label: 'Email us', href: 'mailto:support@ashikanw.com' },
      { label: 'Help in the panel', href: `${links.dash}/help`, external: true },
    ],
  },
  {
    title: 'Terms and policies',
    items: [
      { label: 'All terms and policies', href: '/en/legal' },
      { label: 'Terms of Service', href: '/en/terms' },
      { label: 'Acceptable Use Policy', href: '/en/aup' },
      { label: 'Privacy Policy', href: '/en/privacy' },
      { label: 'Legal Notice (SCTA)', href: '/en/tokusho' },
      { label: 'Payment Services Act Notice', href: '/en/kessai' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { label: 'Our data center in Osaka', href: '/en#location' },
      { label: 'Technology', href: 'https://group.ashikanw.com/en-us/technology/', external: true },
      { label: 'Service status', href: links.status, external: true },
      { label: 'The customer panel', href: '/en#panel' },
    ],
  },
  {
    title: 'ASHIKA Group',
    items: [
      { label: 'About ASHIKA Group', href: 'https://group.ashikanw.com/en-us/about/', external: true },
      { label: 'Services', href: 'https://group.ashikanw.com/en-us/services/', external: true },
      { label: 'Vision', href: 'https://group.ashikanw.com/en-us/vision/', external: true },
      { label: 'History', href: 'https://group.ashikanw.com/en-us/history/', external: true },
      { label: 'Technology', href: 'https://group.ashikanw.com/en-us/technology/', external: true },
      { label: 'Brand', href: 'https://group.ashikanw.com/en-us/brand/', external: true },
      { label: 'Contact', href: 'https://group.ashikanw.com/en-us/about/#contact', external: true },
    ],
  },
  {
    title: 'Programs',
    items: [
      { label: 'Free support program', href: 'https://group.ashikanw.com/en-us/supportprogram/', external: true },
      { label: 'Support program terms', href: 'https://group.ashikanw.com/en-us/supportprogram/terms/', external: true },
      { label: 'Join us', href: 'https://group.ashikanw.com/en-us/join/', external: true },
      { label: 'Member terms', href: 'https://group.ashikanw.com/en-us/join/terms/', external: true },
    ],
  },
  {
    title: 'StoriaMC',
    items: [
      { label: 'StoriaMC home', href: 'https://storiamc.com/en-us/', external: true },
      { label: 'Downloads', href: 'https://storiamc.com/en-us/downloads/', external: true },
      { label: 'Release notes', href: 'https://storiamc.com/en-us/releases/', external: true },
      { label: 'How it works', href: 'https://storiamc.com/en-us/how-it-works/', external: true },
      { label: 'Documentation', href: 'https://storiamc.com/en-us/docs/', external: true },
      { label: 'Storia Cluster', href: 'https://storiamc.com/en-us/docs/cluster/', external: true },
    ],
  },
  {
    title: 'Other services',
    items: [
      { label: 'StoriaMC', href: 'https://storiamc.com/en-us/', external: true },
      { label: 'SABALISU', href: 'https://minecrafts.jp', external: true },
      { label: '4l.vc', href: 'https://4l.vc/en', external: true },
      { label: 'ASHIKA Group', href: 'https://group.ashikanw.com/en-us/', external: true },
    ],
  },
  {
    title: 'Follow us',
    items: [
      { label: 'Discord', href: links.sns.discord, external: true },
      { label: 'YouTube', href: links.sns.youtube, external: true },
      { label: 'note', href: links.sns.note, external: true },
      { label: 'X', href: links.sns.x, external: true },
      { label: 'GitHub', href: 'https://github.com/AKSHRK-Dev', external: true },
    ],
  },
  {
    title: 'This site',
    items: [
      { label: '日本語', href: '/' },
      { label: 'Sitemap', href: '/sitemap.xml' },
      { label: 'Back to home', href: '/en' },
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
