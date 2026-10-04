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

/**
 * 表示の仕方を、要素の種類から決めて data-anim に書く（見た目は global.css）。
 *   wipe: 見出しが左から幕を開けるように   curtain: 図や画面写真が引き幕のように
 *   left / right: 横からすべり込む          flip: カードが起き上がる
 *   zoom: 少し大きく寄ってくる              lines: 見出しの行が下からせり上がる
 * ページ側は data-reveal を付けるだけでよい。data-anim を書けば、そちらが優先される。
 */
function animFor(el: HTMLElement): string {
  if (el.id === 'hero-title') return 'lines';
  if (el.matches('.sec-head, .faq-head, .uses-head, h2')) return 'wipe';
  if (el.matches('figure, .map, .sc-item, .table-wrap, .alt-scroll')) return 'curtain';
  if (el.matches('.loc-copy, .support-note, .guide')) return 'left';
  if (el.matches('.charge-grid, .steps')) return 'kids';
  if (el.matches('.cta-in')) return 'zoom';
  return 'up';
}

function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!el.dataset.anim) el.dataset.anim = animFor(el);
    // 子要素を順番に出す種類は、子に番号を振る
    if (el.dataset.anim === 'kids') Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
  });
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
  // 幕で隠して始める種類（wipe・curtain）は、隠れている間「見えていない」扱いになるので、親を見張る
  const watched = new Map<Element, HTMLElement[]>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (watched.get(entry.target) || []).forEach((el) => el.classList.add('is-in'));
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: `0px 0px -${Math.round((1 - tuning.revealAt) * 100)}% 0px` },
  );
  targets.forEach((el) => {
    if (el.classList.contains('is-in')) return;
    const clipped = el.dataset.anim === 'wipe' || el.dataset.anim === 'curtain';
    const watch = clipped && el.parentElement ? el.parentElement : el;
    if (!watched.has(watch)) {
      watched.set(watch, []);
      io.observe(watch);
    }
    watched.get(watch)!.push(el);
  });

  // 念のため：observer が知らせてこなくても、スクロールして画面に入ったものは出す（iPhone の Safari 対策）
  const pending = new Set(Array.from(targets).filter((el) => !el.classList.contains('is-in')));
  const check = () => {
    const limit = window.innerHeight * tuning.revealAt;
    for (const el of pending) {
      if (el.classList.contains('is-in')) { pending.delete(el); continue; }
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) { el.classList.add('is-in'); pending.delete(el); }
    }
  };
  window.addEventListener('scroll', () => requestAnimationFrame(check), { passive: true });

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

/* =========================================================
   ちょっとした仕掛け（全ページ）
   ========================================================= */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** カードがマウスのほうへ少し傾き、ボタンはマウスに寄る */
function initTilt() {
  if (reduceMotion || !finePointer) return;
  document.querySelectorAll<HTMLElement>('.feat-grid > li, .sc-item, .charge-grid > *, .uses-body .use, .doc-list > li').forEach((el) => {
    el.classList.add('tilt');
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${((x - 0.5) * 7).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      el.classList.add('tilting');
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
  document.querySelectorAll<HTMLElement>('.btn-primary, .btn.btn-primary, .cta-in .btn').forEach((el) => {
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${((ev.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px`);
      el.style.setProperty('--ty', `${((ev.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    });
  });
}

/** ヒーローの上でマウスを動かすと、泡が浮かんで光がついてくる */
function initHeroBubbles() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero || reduceMotion || !finePointer) return;
  let last = 0;
  hero.addEventListener('pointermove', (ev) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--lx', `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    hero.style.setProperty('--ly', `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    const now = performance.now();
    if (now - last < 50) return;
    last = now;
    const b = document.createElement('span');
    const size = 6 + Math.random() * 12;
    b.className = 'bubble';
    b.style.cssText = `left:${ev.clientX - r.left}px;top:${ev.clientY - r.top}px;width:${size}px;height:${size}px;--dx:${((Math.random() - 0.5) * 40).toFixed(0)}px`;
    b.addEventListener('animationend', () => b.remove());
    hero.appendChild(b);
  });
}

/** 読んだ位置のバーと、アシカの「先頭へ戻る」ボタン */
function initProgressAndTop() {
  const bar = document.querySelector<HTMLElement>('.read-progress');
  const top = document.querySelector<HTMLButtonElement>('.to-top');
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
    if (top) top.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }
  }, { passive: true });
  update();
  top?.addEventListener('click', () => {
    top.classList.remove('launch');
    void top.offsetWidth;
    top.classList.add('launch');
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

/** 隠し要素：「ashika」と打つか ↑↑↓↓←→←→BA で、アシカが降ってくる */
function initSecret() {
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let at = 0;
  let typed = '';
  const rain = (count: number) => {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.src = '/uploads/seal.png';
      img.alt = '';
      img.className = 'seal-rain';
      img.style.left = `${Math.random() * 100}vw`;
      img.style.width = `${32 + Math.random() * 48}px`;
      img.style.animationDuration = `${2.2 + Math.random() * 2.4}s`;
      img.style.animationDelay = `${Math.random() * 1.2}s`;
      img.style.setProperty('--r', `${(Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 540)}deg`);
      img.addEventListener('animationend', () => img.remove());
      document.body.appendChild(img);
    }
  };
  document.addEventListener('keydown', (ev) => {
    const target = ev.target as HTMLElement | null;
    if (target?.closest('input, textarea, select')) return;
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    at = k === code[at] ? at + 1 : k === code[0] ? 1 : 0;
    if (at === code.length) { at = 0; rain(36); }
    if (ev.key.length === 1) {
      typed = (typed + k).slice(-6);
      if (typed === 'ashika') rain(24);
    }
  });
}

initReveal();
initScrollLinked();
initTilt();
initHeroBubbles();
initProgressAndTop();
initSecret();
