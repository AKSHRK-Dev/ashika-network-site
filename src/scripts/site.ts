/**
 * サイト全体の小さな動き。
 *  - [data-reveal]: 画面に入ったら少し持ち上げて出す（中身は最初から読める。動きを減らす設定では何もしない）
 *  - 各セクションの中身は、ここで自動的に「ふわっと出す」対象にする（読み込み時に画面の下にあるものだけ。順に少しずつ遅らせる）
 *  - [data-count]: 数字を数え上げる（data-count-from から中身の数字へ）
 *  - [data-tabs]: タブの切り替え（矢印キー・Home・End に対応。自動では切り替えない）
 * メニュー・料金の切り替えなど、その部品だけの動きは各 .astro に書く。
 */

/* ---------- 表示の動き ---------- */
const motionOk = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionOk) {
  // もとから印の付いている並び（理由・安心・手順）は、左から順に少しずつ遅らせる
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const i = Array.from(el.parentElement?.children ?? []).indexOf(el);
    el.style.setProperty('--d', String(Math.max(0, i) % 6));
  });
  // 各セクションの中身。いま画面より下にあるものだけ（見えているものを一度消すと、ちらつくため）
  document.querySelectorAll<HTMLElement>('main > section:not(.hero) .container').forEach((box) => {
    Array.from(box.children).forEach((el, i) => {
      if (!(el instanceof HTMLElement) || el.hasAttribute('data-reveal') || el.querySelector('[data-reveal]')) return;
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute('data-reveal', 'fade');
      el.style.setProperty('--d', String(Math.min(i, 3)));
    });
  });
}

/* ---------- 数字の数え上げ ---------- */
function count(el: HTMLElement) {
  const text = el.textContent ?? '';
  const to = Number(text.replace(/,/g, ''));
  if (!Number.isFinite(to)) return;
  const from = Number(el.dataset.countFrom ?? 0);
  const ms = Number(el.dataset.countMs ?? 1200);
  const decimals = (text.split('.')[1] ?? '').length;
  const comma = text.includes(',');
  const show = (v: number) => {
    const s = v.toFixed(decimals);
    el.textContent = comma ? Number(s).toLocaleString('ja-JP') : s;
  };
  let start = 0;
  const step = (now: number) => {
    if (!start) start = now;
    const p = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - p, 3);
    show(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = text;
  };
  show(from);
  requestAnimationFrame(step);
}

if (motionOk) {
  const counters = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        counters.unobserve(e.target);
        const el = e.target as HTMLElement;
        window.setTimeout(() => count(el), Number(el.dataset.countDelay ?? 0));
      }
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => counters.observe(el));
}

const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (motionOk) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

/* ---------- タブ ---------- */
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls') ?? ''));

  const select = (index: number, focus = false) => {
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = panels[i];
      if (panel) panel.hidden = !on;
    });
    if (focus) tabs[index]?.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = last;
      if (next < 0) return;
      e.preventDefault();
      select(next, true);
    });
  });
});
