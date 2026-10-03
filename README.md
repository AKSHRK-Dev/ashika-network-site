# ASHIKA Network website

Source of [ashikanw.com](https://ashikanw.com), the homepage of ASHIKA Network: server hosting from 30 yen a month.
Built with [Astro](https://astro.build) and served by its Node adapter.

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
npm start        # serve dist/ (node ./dist/server/entry.mjs)
```

- Pages: `src/pages/`; sections of the home page: `src/components/home/`
- Text and settings (plans, FAQ, links, analytics id): `src/data/`
- Guides and legal documents: `src/content/`

---

[ashikanw.com](https://ashikanw.com)（月額 30 円から使えるサーバーホスティング ASHIKA Network）のホームページのソースです。
Astro で作られています。`npm install` のあと、`npm run dev` で手元で確認でき、`npm run build` で本番用に書き出します。
