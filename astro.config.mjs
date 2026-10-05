// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// 出力は従来と同じ「/legal.html」形式。ページはすべて事前生成（静的）のまま、
// Astro 同梱の Node サーバー（dist/server/entry.mjs）が配信する。Pterodactyl の Node.js Egg で `npm start` すれば動く。
export default defineConfig({
  site: 'https://www.ashikanw.com',
  trailingSlash: 'never',
  build: {
    // preserve: faq.astro → faq.html（従来どおり）、en/index.astro → en/index.html（/en で開ける）
    format: 'preserve',
  },
  adapter: node({ mode: 'standalone' }),
  vite: {
    server: {
      // 開発サーバー（astro dev）だけの設定。トンネル経由のホスト名を許可する。
      // 先頭がドットのものはサブドメイン全体（例: xxx.aka4.me）にあたる。本番ビルドには影響しない。
      allowedHosts: ['.aka4.me'],
    },
  },
});
