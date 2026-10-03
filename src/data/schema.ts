/**
 * 検索エンジンに渡す構造化データ（JSON-LD）の組み立て。
 *
 * 共通のもの（Organization / WebSite / WebPage）は Base.astro が出す。
 * ここはページごとに足すぶん（料金・よくある質問・パンくず）だけを作る。
 *
 * 文言や金額はすべて既存のデータから引いてくる。ここで別に書くと、
 * 画面に出ている内容と検索エンジンに渡す内容がずれていくため。
 */
import { site } from './site';
import { faq, plans, specLabels, type Plan } from './home';
import { allFaqItems } from './faq-full';

const ORG = { '@id': `${site.url}/#organization` };

/** 「よくある質問」。画面に出ているものと同じ内容を渡す */
export function faqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** よくある質問のページ（/faq）。こちらは全部の質問を渡す */
export function fullFaqSchema(url: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: allFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** 料金表の1行を、値段つきの商品として表す */
function planSchema(plan: Plan, kindLabel: string) {
  const specs = specLabels.map((label, i) => ({
    '@type': 'PropertyValue',
    name: label,
    value: plan.specs[i] ?? '',
  }));

  return {
    '@type': 'Product',
    name: `${plan.name}（${kindLabel}）`,
    description: `${kindLabel}の${plan.name}。${specLabels
      .map((label, i) => `${label} ${plan.specs[i]}`)
      .join('・')}。${plan.fit}方に向いています。`,
    brand: ORG,
    category: 'ホスティング',
    additionalProperty: specs,
    ...(plan.monthly === null
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            url: plan.href,
            price: String(plan.monthly),
            priceCurrency: 'JPY',
            availability: 'https://schema.org/InStock',
            seller: ORG,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(plan.monthly),
              priceCurrency: 'JPY',
              /** 1ヶ月あたりの値段であることを示す（MON = 月） */
              unitCode: 'MON',
              billingIncrement: 1,
            },
          },
        }),
  };
}

/** 提供しているもの全体。値段の一覧を添えて、何をいくらで売っているかを伝える */
export function serviceSchema() {
  const items = plans.kinds.flatMap((kind) =>
    plans.list[kind.key].map((plan) => ({
      '@type': 'Offer',
      itemOffered: planSchema(plan, kind.label),
    })),
  );

  return {
    '@type': 'Service',
    '@id': `${site.url}/#service`,
    name: 'ASHIKA Network のホスティング',
    serviceType: 'ホスティング',
    description: site.description,
    provider: ORG,
    areaServed: { '@type': 'Country', name: '日本' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      lowPrice: '30',
      offerCount: String(items.length),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '料金プラン',
      itemListElement: items,
    },
  };
}

/** パンくず。トップから今のページまでの道のりを渡す */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'ホーム', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? `${site.url}/` : `${site.url}${c.path}`,
    })),
  };
}

/** 手順の説明（「〜する方法」のページ用） */
export function howToSchema(params: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
