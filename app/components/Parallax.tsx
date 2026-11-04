"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { damp, useScrollFrame } from "../lib/scroll";

type ParallaxProps = {
  src: string;
  alt: string;
  /** 視差強度，0 為不移動；數值越大，圖片與捲動的速度差越明顯 */
  speed?: number;
  /** 進場時的額外放大量，圖片會隨捲動慢慢收回原尺寸，營造景深 */
  zoom?: number;
  className?: string;
  sizes?: string;
  preload?: boolean;
  /** 套用在圖片本身的 class，例如進場動畫 */
  imageClassName?: string;
  children?: ReactNode;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** 帶視差效果的大圖容器：圖片比容器略高，捲動時以較慢速度位移，並以緩動插值讓動態更柔順。 */
export default function Parallax({
  src,
  alt,
  speed = 0.12,
  zoom = 0.08,
  className = "",
  sizes = "100vw",
  preload = false,
  imageClassName = "",
  children,
}: ParallaxProps) {
  const layer = useRef<HTMLDivElement>(null);
  const state = useRef<{ y: number; s: number } | null>(null);

  const frame = useScrollFrame<HTMLDivElement>(({ geo, scrollY, vh, dt }) => {
    const img = layer.current;
    if (!img) return;

    // 元素中心相對視窗中心的距離（像素），在畫面正中央時為 0
    const offset = geo.top + geo.height / 2 - scrollY - vh / 2;
    const targetY = -offset * speed;
    // 從下方進場時放大，接近畫面中央時收回
    const enter = clamp(offset / (vh * 0.5 + geo.height * 0.5), 0, 1);
    const targetS = 1.02 + zoom * enter;

    const cur = state.current;
    if (!cur) {
      state.current = { y: targetY, s: targetS };
    } else {
      const ny = damp(cur.y, targetY, 0.011, dt);
      const ns = damp(cur.s, targetS, 0.008, dt);
      // 幾乎靜止時不再寫入，節省效能
      if (Math.abs(ny - cur.y) < 0.01 && Math.abs(ns - cur.s) < 0.00005) return;
      cur.y = ny;
      cur.s = ns;
    }
    const { y, s } = state.current!;
    img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
  });

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div
        ref={layer}
        className="absolute inset-x-0 -top-[22%] -bottom-[22%] will-change-transform"
        style={{ transform: `scale(${1.02 + zoom})` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={`object-cover ${imageClassName}`} />
      </div>
      {children}
    </div>
  );
}
