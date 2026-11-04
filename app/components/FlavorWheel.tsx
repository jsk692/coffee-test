"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { flavorCategories } from "../content";

const R_CENTER = 64;
const R_INNER = 150;
const R_OUTER = 238;

const totalNotes = flavorCategories.reduce((sum, c) => sum + c.notes.length, 0);
const STEP = 360 / totalNotes;

/** 四捨五入到小數兩位，避免伺服器與瀏覽器的三角函數結果差在末幾位造成 hydration 不一致 */
const round = (n: number) => Math.round(n * 100) / 100;

/** 角度（0 度為正上方，順時針）轉座標 */
function point(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [round(r * Math.sin(rad)), round(-r * Math.cos(rad))] as const;
}

/** 環形扇區路徑 */
function sector(r0: number, r1: number, a0: number, a1: number) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x0, y0] = point(r1, a0);
  const [x1, y1] = point(r1, a1);
  const [x2, y2] = point(r0, a1);
  const [x3, y3] = point(r0, a0);
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

/** 預先計算每個分類與風味的角度 */
const layout = (() => {
  let angle = 0;
  return flavorCategories.map((cat) => {
    const start = angle;
    const notes = cat.notes.map((note) => {
      const a0 = angle;
      angle += STEP;
      return { note, a0, a1: angle };
    });
    return { cat, start, end: angle, notes };
  });
})();

export default function FlavorWheel() {
  const [active, setActive] = useState(flavorCategories[1].key);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = flavorCategories.find((c) => c.key === active)!;

  const onKey = (key: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(key);
    }
  };

  let segIndex = 0;

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <svg
        viewBox="-260 -260 520 520"
        className={`mx-auto w-full max-w-[560px] ${drawn ? "wheel-on" : ""}`}
        role="group"
        aria-label="山嵐風味輪，點選分類查看說明"
      >
        <defs>
          {/* 手繪抖動感 */}
          <filter id="rough-a" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="4" />
          </filter>
          <filter id="rough-b" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="11" />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>
          {/* 鉛筆斜線紋理 */}
          <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#2a1c14" strokeWidth="0.8" strokeOpacity="0.16" />
          </pattern>
        </defs>

        {/* 色塊 */}
        <g filter="url(#rough-a)">
          {layout.map(({ cat, start, end, notes }) => {
            const on = cat.key === active;
            const innerDelay = segIndex++ * 70;
            return (
              <g key={cat.key}>
                <path
                  d={sector(R_CENTER, R_INNER, start, end)}
                  fill={cat.color}
                  fillOpacity={on ? 0.95 : 0.5}
                  className="wheel-seg cursor-pointer outline-none"
                  style={{
                    opacity: drawn ? 1 : 0,
                    transform: drawn ? "scale(1)" : "scale(0.7)",
                    transitionDelay: `${innerDelay}ms`,
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${cat.name} ${cat.en}`}
                  onClick={() => setActive(cat.key)}
                  onKeyDown={onKey(cat.key)}
                />
                {notes.map(({ note, a0, a1 }) => {
                  const delay = 300 + segIndex++ * 45;
                  return (
                    <path
                      key={note}
                      d={sector(R_INNER, R_OUTER, a0, a1)}
                      fill={cat.color}
                      fillOpacity={on ? 0.7 : 0.28}
                      className="wheel-seg cursor-pointer"
                      style={{
                        opacity: drawn ? 1 : 0,
                        transform: drawn ? "scale(1)" : "scale(0.85)",
                        transitionDelay: `${delay}ms`,
                      }}
                      onClick={() => setActive(cat.key)}
                      aria-hidden="true"
                    />
                  );
                })}
              </g>
            );
          })}
          <circle r={R_OUTER} fill="url(#hatch)" pointerEvents="none" />
        </g>

        {/* 手繪描線（雙線條，模擬鉛筆重描） */}
        {(["rough-a", "rough-b"] as const).map((f, i) => (
          <g
            key={f}
            filter={`url(#${f})`}
            fill="none"
            stroke="#2a1c14"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={i === 0 ? 1.6 : 0.9}
            strokeOpacity={i === 0 ? 0.85 : 0.45}
            pointerEvents="none"
          >
            {[R_CENTER, R_INNER, R_OUTER].map((r) => (
              <circle key={r} r={r} pathLength={1} className="wheel-line" />
            ))}
            {layout.flatMap(({ cat, start, notes }) => [
              <line
                key={`${cat.key}-div`}
                x1={point(R_CENTER, start)[0]}
                y1={point(R_CENTER, start)[1]}
                x2={point(R_OUTER, start)[0]}
                y2={point(R_OUTER, start)[1]}
                pathLength={1}
                className="wheel-line"
              />,
              ...notes.slice(1).map(({ note, a0 }) => (
                <line
                  key={`${note}-div`}
                  x1={point(R_INNER, a0)[0]}
                  y1={point(R_INNER, a0)[1]}
                  x2={point(R_OUTER, a0)[0]}
                  y2={point(R_OUTER, a0)[1]}
                  pathLength={1}
                  className="wheel-line"
                />
              )),
            ])}
          </g>
        ))}

        {/* 文字 */}
        <g
          className="pointer-events-none select-none font-serif transition-opacity duration-700"
          style={{ opacity: drawn ? 1 : 0, transitionDelay: "900ms" } as CSSProperties}
          fill="#2a1c14"
        >
          {layout.map(({ cat, start, end, notes }) => {
            const mid = (start + end) / 2;
            const [x, y] = point((R_CENTER + R_INNER) / 2 + 4, mid);
            return (
              <g key={cat.key}>
                <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="700" letterSpacing="1">
                  {cat.name}
                </text>
                {notes.map(({ note, a0, a1 }) => {
                  const m = (a0 + a1) / 2;
                  const [tx, ty] = point((R_INNER + R_OUTER) / 2, m);
                  const rot = m <= 180 ? m - 90 : m + 90;
                  return (
                    <text
                      key={note}
                      x={tx}
                      y={ty}
                      transform={`rotate(${rot} ${tx} ${ty})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="13"
                      letterSpacing="2"
                    >
                      {note}
                    </text>
                  );
                })}
              </g>
            );
          })}
          <text y="-8" textAnchor="middle" fontSize="20" fontWeight="900" letterSpacing="4">
            山嵐
          </text>
          <text y="16" textAnchor="middle" fontSize="8.5" letterSpacing="3" className="font-sans" fillOpacity="0.7">
            FLAVOR WHEEL
          </text>
        </g>
      </svg>

      <div>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="風味分類">
          {flavorCategories.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={c.key === active}
              onClick={() => setActive(c.key)}
              className={`rounded-full border px-4 py-1.5 text-sm tracking-widest transition-colors ${
                c.key === active
                  ? "border-espresso bg-espresso text-paper"
                  : "border-espresso/25 hover:border-espresso/60"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div key={current.key} className="animate-rise" role="tabpanel">
          <p className="text-xs tracking-[0.35em] text-terracotta">{current.en.toUpperCase()}</p>
          <h3 className="mt-3 flex items-center gap-4 font-serif text-4xl font-bold tracking-[0.15em]">
            <span className="inline-block h-4 w-4 rounded-full" style={{ background: current.color }} />
            {current.name}
          </h3>
          <p className="mt-6 max-w-md leading-loose text-coffee">{current.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {current.notes.map((n) => (
              <li key={n} className="rounded-sm bg-sand/60 px-3 py-1 text-sm tracking-widest">
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-espresso/15 pt-6">
            <p className="text-xs tracking-[0.3em] text-coffee/70">代表豆款</p>
            <ul className="mt-3 space-y-2">
              {current.beans.map((b) => (
                <li key={b} className="flex items-center gap-3 font-serif text-lg">
                  <span className="h-px w-6 bg-terracotta" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
