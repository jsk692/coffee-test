"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** 延遲毫秒數，用於同一區塊內的錯落淡入 */
  delay?: number;
  /** fade：模糊淡入上移；mask：由下往上展開，適合圖片 */
  variant?: "fade" | "mask";
  className?: string;
};

/** 元素捲動進入畫面時淡入，只觸發一次。 */
export default function Reveal({ children, delay = 0, variant = "fade", className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = { "--delay": `${delay}ms` } as CSSProperties;

  // 被 clip-path 完全遮住的元素不會觸發 IntersectionObserver，
  // 所以遮罩模式改為觀察外層、裁切內層。
  if (variant === "mask") {
    return (
      <div ref={ref} className={className}>
        <div className={`reveal-mask ${visible ? "is-visible" : ""}`} style={style}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
