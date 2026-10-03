/**
 * スクロール連動のアニメーション（全ページ共通）。
 *
 * - [data-reveal]   : 上端が画面の75%の位置より上に来たら .is-in を付けてフェードイン
 * - [data-stagger]  : 子要素に --i を振って順番にフェードイン
 * - [data-parallax] : スクロール量に応じてゆっくり上下（値は速度。例: 0.06）
 * - [data-words]    : 中の .w（1文字）をスクロール位置に合わせて順に色付け
 * - [data-seq]      : 直下の子要素をスクロール位置に合わせて順に .is-on にする。
 *                     中の [data-count="40"] は 0 からその数まで数字が増える
 *
 * 「視差効果を減らす」設定のときはすべて即時表示にする。
 *
 * 効き具合を変えたいときは下の tuning を編集する。
 * ここはブラウザに配信されるスクリプトなので、文言データ（src/data/*.ts）は読み込まない。
 */

/** 動きの調整値。画面の高さを 1 とした割合と、ミリ秒。 */
const tuning = {
  /** [data-reveal] を表示し始める位置。0.75 = 要素の上端が画面の上から75%まで来たら */
  revealAt: 0.75,
  /** observer が働かなかったときに、この時間（ミリ秒）で強制的に全部表示する */
  revealFallbackMs: 4000,
  /** [data-parallax] に値を書かなかったときの速度 */
  parallaxSpeed: 0.08,
  /** 画面の上下この幅（px）より外にある要素は、視差の計算をしない */
  parallaxMargin: 200,
  /** [data-words] の色付け。start の位置で始まり、end の位置で全部点灯する */
  words: { start: 0.88, end: 0.42 },
  /** [data-seq] の順送り。start から、要素の高さ×heightFactor ぶんスクロールする間に全部点灯（minEnd より上には行かない） */
  seq: { start: 0.9, minEnd: 0.25, heightFactor: 1.1 },
  /** [data-count] の数え上げ。順送りの前半 1/rush で数え終わり、power が大きいほど終わりがゆっくりになる */
  counter: { rush: 2, power: 3 },
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function initReveal() {
  const groups = document.querySelectorAll<HTMLElement>('[data-stagger]');
  groups.forEach((g) => {
    Array.from(g.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
  });

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // 最初から画面内にあるものはすぐ表示（読み込み直後の画面）
  const vh0 = window.innerHeight;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < vh0) el.classList.add('is-in');
  });

  // それ以降は「要素の上端が画面の上から tuning.revealAt の位置より上に来たら」表示開始
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: `0px 0px -${Math.round((1 - tuning.revealAt) * 100)}% 0px` },
  );
  targets.forEach((el) => {
    if (!el.classList.contains('is-in')) io.observe(el);
  });

  // 何かの理由で observer が発火しなくても、内容を隠したままにしない
  window.setTimeout(() => targets.forEach((el) => el.classList.add('is-in')), tuning.revealFallbackMs);
}

function initScrollLinked() {
  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const wordBlocks = Array.from(document.querySelectorAll<HTMLElement>('[data-words]')).map((el) => ({
    el,
    chars: Array.from(el.querySelectorAll<HTMLElement>('.w')),
  }));

  const sequences = Array.from(document.querySelectorAll<HTMLElement>('[data-seq]')).map((el) => ({
    el,
    items: Array.from(el.children) as HTMLElement[],
    counters: Array.from(el.querySelectorAll<HTMLElement>('[data-count]')).map((c) => ({
      el: c,
      target: Number(c.dataset.count) || 0,
    })),
  }));

  if (reduceMotion) {
    wordBlocks.forEach(({ chars }) => chars.forEach((c) => c.classList.add('is-on')));
    sequences.forEach((s) => {
      s.items.forEach((it) => it.classList.add('is-on'));
      s.counters.forEach((c) => (c.el.textContent = String(c.target)));
    });
    return;
  }
  if (parallax.length === 0 && wordBlocks.length === 0 && sequences.length === 0) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    for (const el of parallax) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -tuning.parallaxMargin || rect.top > vh + tuning.parallaxMargin) continue;
      const speed = parseFloat(el.dataset.parallax || String(tuning.parallaxSpeed));
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }

    for (const { el, chars } of wordBlocks) {
      const rect = el.getBoundingClientRect();
      const start = vh * tuning.words.start; // この位置に上端が来たら始める
      const end = vh * tuning.words.end; // この位置で全部点灯
      const progress = clamp((start - rect.top) / (start - end), 0, 1);
      const count = Math.round(progress * chars.length);
      chars.forEach((c, i) => c.classList.toggle('is-on', i < count));
    }

    for (const seq of sequences) {
      const rect = seq.el.getBoundingClientRect();
      const start = vh * tuning.seq.start;
      // 要素の高さぶんスクロールする間に全部点灯（上端が画面の minEnd より上には行かない範囲で）
      const end = Math.max(vh * tuning.seq.minEnd, start - rect.height * tuning.seq.heightFactor);
      const progress = clamp((start - rect.top) / (start - end), 0, 1);
      const count = Math.round(progress * seq.items.length);
      seq.items.forEach((it, i) => it.classList.toggle('is-on', i < count));
      // 数字は前半で数え上げる
      const countProgress = clamp(progress * tuning.counter.rush, 0, 1);
      const eased = 1 - Math.pow(1 - countProgress, tuning.counter.power);
      for (const c of seq.counters) c.el.textContent = String(Math.round(eased * c.target));
    }
  };

  const request = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}

initReveal();
initScrollLinked();
