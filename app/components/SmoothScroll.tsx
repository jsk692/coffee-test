"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { ensureLoop, prefersReducedMotion, setLenis } from "../lib/scroll";

/** 以 Lenis 提供帶慣性的平滑捲動；使用者偏好減少動態效果時不啟用。 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      anchors: {
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      },
    });
    setLenis(lenis);
    ensureLoop();

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
