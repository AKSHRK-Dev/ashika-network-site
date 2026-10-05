/**
 * 英語版の規約・方針の見出し・日付・説明（src/data/legal.ts の英語版）。
 * 本文は src/content/legal/en/*.html。英語版は参考訳で、日本語版が優先する（Doc.astro が断り書きを出す）。
 * en の欄には、英語版では日本語の正式名を入れて、原文の名前が分かるようにしている。
 */
import type { LegalDoc } from '../legal';

export const legalDocs: LegalDoc[] = [
  {
    href: '/en/terms',
    title: 'Terms of Service',
    heading: 'ASHIKA Network Terms of Service',
    en: '利用規約',
    date: 'Established July 21, 2026',
    updated: '2026-07-21',
    description: 'The ASHIKA Network Terms of Service. Please read them before using the service.',
    summary: 'The conditions of the service, accounts, fees, prohibited acts and the rights and obligations between us and you.',
  },
  {
    href: '/en/aup',
    title: 'Acceptable Use Policy',
    en: '利用方針（AUP）',
    date: 'Established July 21, 2026',
    updated: '2026-07-21',
    description: 'The ASHIKA Network Acceptable Use Policy (AUP). Please read it before using the service.',
    summary: 'What the service may not be used for, and the operating rules that keep it safe and fair for everyone.',
  },
  {
    href: '/en/privacy',
    title: 'Privacy Policy',
    en: 'プライバシーポリシー（個人情報保護方針）',
    date: 'Established July 21, 2026',
    updated: '2026-07-21',
    description: 'The ASHIKA Network Privacy Policy. Please read it before using the service.',
    summary: 'What personal information we collect, why, how we manage it, and when it is shared with third parties.',
  },
  {
    href: '/en/tokusho',
    title: 'Legal Notice (Specified Commercial Transactions Act)',
    listTitle: 'Legal Notice',
    heading: 'Legal Notice<br>(Specified Commercial Transactions Act)',
    en: '特定商取引法に基づく表記',
    date: 'Updated September 9, 2026',
    updated: '2026-09-09',
    description: 'The ASHIKA Network notice under the Act on Specified Commercial Transactions of Japan.',
    summary: 'Who runs the service, prices, payment methods, when the service is provided, and refund conditions.',
  },
  {
    href: '/en/kessai',
    title: 'Payment Services Act Notice',
    en: '資金決済法に基づく表示',
    date: 'Established September 9, 2026 / Revised September 15, 2026',
    updated: '2026-09-15',
    description: 'The notice under the Payment Services Act of Japan about the ASHIKA Network balance (prepaid payment instrument).',
    summary:
      'About the customer panel balance (a prepaid payment instrument): the issuer, where it can be used, expiry, refunds and how to check your balance.',
  },
];

export const legalIndex = {
  title: 'Terms and policies',
  description:
    'Links to the ASHIKA Network Terms of Service, Acceptable Use Policy, Privacy Policy, and the notices under the Specified Commercial Transactions Act and the Payment Services Act.',
  lead: [
    'The terms that apply to the service and the notices required by Japanese law.',
    'Please read them before signing up. The English versions are translations; the Japanese originals prevail.',
  ],
  listHeading: 'Documents',
  guide: {
    heading: 'Ready to sign up?',
    lead: 'Once you have read these, choose a plan and get your server.',
    button: 'Sign up',
  },
};

export const breadcrumbLabels = { home: 'Home', legal: legalIndex.title };
