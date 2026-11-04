"use client";

import type Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * 全站共用的捲動引擎：
 * - 單一 requestAnimationFrame 迴圈，先推進 Lenis 平滑捲動，再更新所有視差元素
 * - 元素位置只在尺寸變動時量測，每格畫面只做數學運算與寫入 transform，避免版面重算
 */

type Subscriber = {
  measure: () => void;
  update: (scrollY: number, vh: number, dt: number) => void;
};

const subscribers = new Set<Subscriber>();
let lenis: Lenis | null = null;
let rafId = 0;
let lastTime = 0;
let resizeObserver: ResizeObserver | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

function measureAll() {
  subscribers.forEach((s) => s.measure());
}

function loop(time: number) {
  lenis?.raf(time);
  const dt = lastTime ? Math.min(time - lastTime, 64) : 16.7;
  lastTime = time;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subscribers.forEach((s) => s.update(y, vh, dt));
  rafId = requestAnimationFrame(loop);
}

function start() {
  if (rafId) return;
  window.addEventListener("resize", measureAll);
  resizeObserver = new ResizeObserver(measureAll);
  resizeObserver.observe(document.body);
  rafId = requestAnimationFrame(loop);
}

function stop() {
  cancelAnimationFrame(rafId);
  rafId = 0;
  lastTime = 0;
  window.removeEventListener("resize", measureAll);
  resizeObserver?.disconnect();
  resizeObserver = null;
}

export function subscribe(sub: Subscriber) {
  subscribers.add(sub);
  sub.measure();
  start();
  return () => {
    subscribers.delete(sub);
    // Lenis 也靠這個迴圈推進，只有在沒有 Lenis 時才停止
    if (subscribers.size === 0 && !lenis) stop();
  };
}

/** 讓 Lenis 在沒有任何視差元素時也能持續運作 */
export function ensureLoop() {
  start();
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 與畫面更新頻率無關的指數緩動：每秒逼近目標的比例固定 */
export function damp(current: number, target: number, smoothing: number, dt: number) {
  return target + (current - target) * Math.exp(-smoothing * dt);
}

type Geometry = { top: number; height: number };

/**
 * 量測元素在文件中的位置，並在每格畫面以捲動位置回呼。
 * `ignoreTransform` 的元素會先暫時清掉 transform 再量，避免把自身位移算進去。
 */
export function useScrollFrame<T extends HTMLElement>(
  onFrame: (ctx: { el: T; geo: Geometry; scrollY: number; vh: number; dt: number }) => void,
) {
  const ref = useRef<T>(null);
  const frameRef = useRef(onFrame);

  useEffect(() => {
    frameRef.current = onFrame;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const geo: Geometry = { top: 0, height: 0 };
    return subscribe({
      measure: () => {
        const rect = el.getBoundingClientRect();
        geo.top = rect.top + window.scrollY;
        geo.height = rect.height;
      },
      update: (scrollY, vh, dt) => {
        // 超出畫面一段距離就跳過
        if (geo.top + geo.height < scrollY - vh * 0.5 || geo.top > scrollY + vh * 1.5) return;
        frameRef.current({ el, geo, scrollY, vh, dt });
      },
    });
  }, []);

  return ref;
}
