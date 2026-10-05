/**
 * 英語版のよくある質問のページ（src/data/faq-full.ts の英語版）。
 * 答えは日本語版と同じ内容にすること。仕様が変わったら両方を直す。
 */
import type { FaqGroup } from '../faq-full';

export const faqPage = {
  title: 'FAQ',
  heading: 'Frequently asked questions',
  lead: 'The questions we hear most before people sign up. If yours is not here, feel free to ask on Discord.',
  description:
    'Answers to common questions about ASHIKA Network: prices and payment, what you can run, how to size your server, contract periods and cancelling, and what to do when something goes wrong. Hosting from ¥30 a month.',
  keywords:
    'ASHIKA Network,FAQ,pricing,payment,PayPay,cancel,specs,memory,Discord bot,Python,Node.js,VPS,hosting',
  updated: '2026-10-05',
  updatedLabel: 'October 5, 2026',
  ask: {
    title: 'Not here? Just ask.',
    lead: 'We answer on Discord (in Japanese). Many people there run the same setup, so you may get an answer on the spot.',
    button: 'Ask on Discord',
  },
  related: [
    { href: '/en/discord-bot', title: 'Run a Discord bot 24/7', desc: 'How much memory it needs, and the steps to get it running.' },
    { href: '/en/python', title: 'Run Python 24/7', desc: 'Scheduled and always-on jobs, away from your home PC.' },
    { href: '/en/vps', title: 'VPS (dedicated IPv4, root access)', desc: 'Orders open October 13, 2026.' },
  ],
};

export const faqGroups: FaqGroup[] = [
  {
    id: 'service',
    title: 'About the service',
    items: [
      {
        q: 'What does the service do?',
        a: 'We rent out a place to put programs and keep them running: Discord bots, web apps, scheduled scripts, data aggregation and conversion. From ¥30 a month.',
      },
      {
        q: 'Is it shared hosting or a VPS?',
        a: 'Standard and high-memory plans are shared: one machine is split between several customers. They come without administrator rights, and one IPv4 address is shared by port. If you need a dedicated IPv4 address and administrator rights, consider the VPS, which opens for orders on October 13, 2026.',
      },
      {
        q: 'Where are the servers?',
        a: 'In a data center in the Hokusetsu area of northern Osaka. We have one site, so there is nothing to choose when you buy. Even if you use it from outside Japan, the servers are in Osaka.',
      },
      {
        q: 'Can I use it from outside Japan?',
        a: 'Yes. There are no regional limits on signing up, paying or using your server. The website is available in English, but the customer panel and our support are in Japanese only. The servers are in Osaka, so connections from far away take longer.',
      },
      {
        q: 'Can individuals sign up?',
        a: 'Yes. Both companies and individuals can sign up. All you need is an email address and a way to pay.',
      },
      {
        q: 'Is there a way to use it for free?',
        a: 'ASHIKA Group runs a support program. After review, nonprofits can use up to 20 servers for free, and individuals such as students, open source developers, people running communities for free and people in financial hardship can use up to 10. See the support program page (group.ashikanw.com/en-us/supportprogram/) for details.',
      },
      {
        q: 'Can minors sign up?',
        a: 'Yes, with the consent of a parent or guardian. See the Terms of Service for details.',
      },
    ],
  },
  {
    id: 'price',
    title: 'Prices and payment',
    items: [
      {
        q: 'What is the cheapest plan?',
        a: 'Mini, at ¥30 a month: 256MB of memory, 20% CPU and 512MB of storage. That is plenty for a small Discord bot or light scheduled jobs. Paying for three months at once costs ¥90, which is cheaper per month.',
      },
      {
        q: 'How do I pay?',
        a: 'You top up your balance first, and server fees are paid from it. Top-ups accept PayPay, credit cards (VISA, Mastercard, AMEX), bank transfer, Apple Pay and Google Pay, from ¥100 to ¥500,000 in steps of ¥100. You can buy a top-up without an account.',
      },
      {
        q: 'How does paying with PayPay work?',
        a: 'PayPay payments are made on our shop page on STORES. After paying, STORES sends you an order number; enter it with the amount on the top-up screen and it is added to your balance right away. PayPay is the only method without a top-up code.',
      },
      {
        q: 'How long does a bank transfer take?',
        a: 'We send the top-up code once the payment is confirmed. Because of bank hours, this takes about 1 to 3 business days. When transferring, always use the reference number shown in the instructions exactly as written.',
      },
      {
        q: 'Is there pay-as-you-go billing?',
        a: 'No. Everything is flat rate. Fees are taken from the balance you topped up in advance, so you can never be charged more than your balance. There are no surprise bills the next month for something you forgot to delete.',
      },
      {
        q: 'Do I pay every month?',
        a: 'You can pay monthly, or for three months at once. Three months works out cheaper per month. See the pricing table for amounts.',
      },
      {
        q: 'Does my balance expire?',
        a: 'It is valid for 12 months, counting from the month in which you no longer have a running server. It also expires when you delete your account. See the Payment Services Act Notice for details.',
      },
      {
        q: 'Can my balance be refunded?',
        a: 'We do not give refunds, except where required by law. Balance cannot be transferred to anyone else or exchanged for cash.',
      },
      {
        q: 'Do you issue invoices or receipts?',
        a: 'You can see your top-ups and payments at any time under "Balance and history" in the customer panel. If you need a paper document, please contact us.',
      },
      {
        q: 'Is there a setup fee?',
        a: 'No. You only pay for the plan you choose.',
      },
    ],
  },
  {
    id: 'spec',
    title: 'What you can run, and specs',
    items: [
      {
        q: 'Which languages can I use?',
        a: 'Python and Node.js. Discord bots, web apps, scheduled scripts and anything else written in them can be uploaded and run as they are.',
      },
      {
        q: 'Do I need to connect over SSH?',
        a: 'No. Uploading and editing files, starting and stopping, and reading logs are all done in the customer panel in your browser. You do not need to install anything on your computer.',
      },
      {
        q: 'How much memory should I choose?',
        a: 'A Discord bot that only answers commands fits in the 256MB Mini; one used regularly on several servers is better on the 512MB Basic. Jobs that handle tables with tens of thousands of rows should have 1GB or more. If unsure, start small and move up when it is not enough.',
      },
      {
        q: 'What is the difference between Standard and High memory?',
        a: 'At the same price, Standard plans get more CPU and High-memory plans get more memory. Choose Standard for bots and sites, and High memory for jobs that use a lot of memory.',
      },
      {
        q: 'What do "20%" and "100%" CPU mean?',
        a: 'They show how much of one CPU core you can use, where one full core is 100%. 20% is a fifth of a core, and 200% is two cores. Nothing is used while your program is idle.',
      },
      {
        q: 'Can I use my own domain?',
        a: 'For web apps, you can point your own domain at it and serve it over HTTPS. Shared plans cannot use ports 80 and 443 directly, though, so the method depends on your setup. Please ask us on Discord.',
      },
      {
        q: 'Do I get my own IP address?',
        a: 'Standard and high-memory plans share one IP address, split by port. If you need a dedicated IPv4 address, use the VPS, which opens for orders on October 13, 2026.',
      },
      {
        q: 'Are there backups?',
        a: 'Each plan keeps a set number of backups: one for Mini, and more for the larger plans. The VPS comes without backups, so please arrange your own.',
      },
      {
        q: 'What happens if my program crashes?',
        a: 'The crash is detected and the program is restarted automatically. If it falls over at night, it is running again by morning. You can follow the logs in your browser, so if it keeps crashing, take a look at them.',
      },
      {
        q: 'Can I change plans later?',
        a: 'Yes. When it is not enough, you can move up to a larger plan. The customer panel shows you how.',
      },
    ],
  },
  {
    id: 'contract',
    title: 'Signing up and contract periods',
    items: [
      {
        q: 'Can I use it right after buying?',
        a: 'Your connection details are issued the moment you buy, and you can upload files right away. No setup is needed. You can be up and running within minutes.',
      },
      {
        q: 'It says "out of stock" and I cannot buy.',
        a: 'Each plan has a limited number of slots, and it shows out of stock when they are full. There is no fixed date for adding more, but slots free up automatically when people cancel or change plans. Please check back every few days.',
      },
      {
        q: 'Is there a minimum contract period?',
        a: 'No. Contracts are monthly. If it does not suit you, it ends at the end of that period.',
      },
      {
        q: 'How do I cancel?',
        a: 'If you do not renew, the contract ends when the period is over. There is no cancellation fee. If you want to stop right away, you can delete the server in the customer panel.',
      },
      {
        q: 'What happens when the contract period ends?',
        a: 'When the period is over, the server is stopped and you can still renew for 3 days. If it has not been renewed by the fourth day, it is deleted automatically together with its data. Please take out any files you need while it is stopped.',
      },
      {
        q: 'I missed the renewal date.',
        a: 'Within 3 days, you can still renew in the customer panel. The server is only stopped, and the data is still there. On the fourth day it is deleted, so please act soon.',
      },
      {
        q: 'Can I buy without an account?',
        a: 'Top-up codes can be bought without an account. To rent a server you need an account, but you can buy a code first and add it to your balance after signing up.',
      },
    ],
  },
  {
    id: 'support',
    title: 'When something goes wrong',
    items: [
      {
        q: 'How do I contact you?',
        a: 'On Discord. Open a ticket and a private channel is created for you. Many people there use the same setup, so you may get an answer from them too. Support is provided in Japanese.',
      },
      {
        q: 'It works on my computer but not on the server.',
        a: 'Almost always, either a library or an environment variable is missing. Upload requirements.txt for Python, or package.json for Node.js, together with your code. For Discord bots, also check the privileged intents settings.',
      },
      {
        q: 'My top-up code has not arrived.',
        a: 'Please check your spam folder. For bank transfers, the code is issued once the payment is confirmed, so allow 1 to 3 business days. If it still has not arrived, please contact us.',
      },
      {
        q: 'Where can I see the service status?',
        a: 'Use the "Status" link in the header or footer. When there is an outage, we also announce it on Discord.',
      },
      {
        q: 'My data is gone.',
        a: 'Each plan keeps backups. You may be able to restore them in the customer panel, so please check there first. Data deleted on the fourth day after the contract period ended cannot be restored.',
      },
    ],
  },
];

export const allFaqItems = faqGroups.flatMap((group) => group.items);
