"use client";

import { useRef, type ReactNode } from "react";
import { damp, useScrollFrame } from "../lib/scroll";

type DriftProps = {
  children: ReactNode;
  /** 正值：比捲動慢（往後退）；負值：比捲動快（往前浮） */
  speed?: number;
  /** 捲離畫面上緣時淡出 */
  fadeOut?: boolean;
  className?: string;
};

/** 讓文字層與背景以不同速度移動，製造前後景深。 */
export default function Drift({ children, speed = 0.08, fadeOut = false, className = "" }: DriftProps) {
  const inner = useRef<HTMLDivElement>(null);
  const state = useRef<{ y: number; o: number } | null>(null);

  // 量測外層、位移內層，避免自身位移影響量測
  const outer = useScrollFrame<HTMLDivElement>(({ geo, scrollY, vh, dt }) => {
    const el = inner.current;
    if (!el) return;

    const offset = geo.top + geo.height / 2 - scrollY - vh / 2;
    const targetY = -offset * speed;
    // 元素上緣捲過視窗 15% 後開始淡出
    const passed = scrollY - (geo.top - vh * 0.15);
    const targetO = fadeOut ? Math.min(1, Math.max(0, 1 - passed / (geo.height * 0.9))) : 1;

    const cur = state.current;
    if (!cur) {
      state.current = { y: targetY, o: targetO };
    } else {
      const ny = damp(cur.y, targetY, 0.01, dt);
      const no = damp(cur.o, targetO, 0.01, dt);
      if (Math.abs(ny - cur.y) < 0.01 && Math.abs(no - cur.o) < 0.001) return;
      cur.y = ny;
      cur.o = no;
    }
    el.style.transform = `translate3d(0, ${state.current!.y.toFixed(2)}px, 0)`;
    if (fadeOut) el.style.opacity = state.current!.o.toFixed(3);
  });

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
