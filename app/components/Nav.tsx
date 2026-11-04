"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../content";
import Logo from "./Logo";

/** 固定導覽列：在首屏上方為透明白字，捲動後轉為米白底。 */
export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 80);
      // 往下捲收起、往上捲出現；忽略細微抖動
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        light
          ? "bg-transparent text-paper"
          : "bg-paper/90 text-espresso shadow-[0_1px_0_rgb(42_28_20/0.08)] backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" aria-label="山嵐 Lanshan Roasters 回到頂端" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 text-sm tracking-[0.15em] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative py-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform hover:after:scale-x-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#beans"
          className={`hidden rounded-full border px-5 py-2 text-sm tracking-[0.15em] transition-colors md:inline-block ${
            light
              ? "border-paper/60 hover:bg-paper hover:text-espresso"
              : "border-terracotta bg-terracotta text-paper hover:bg-terracotta-dark"
          }`}
        >
          選購咖啡豆
        </a>

        <button
          type="button"
          className="relative h-10 w-10 md:hidden"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute left-2 right-2 h-px bg-current transition-transform ${open ? "top-5 rotate-45" : "top-3.5"}`} />
          <span className={`absolute left-2 right-2 top-5 h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-2 right-2 h-px bg-current transition-transform ${open ? "top-5 -rotate-45" : "top-6.5"}`} />
        </button>
      </nav>

      {open && (
        <ul className="border-t border-espresso/10 bg-paper px-5 pb-6 pt-2 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-espresso/10 py-4 font-serif text-lg tracking-[0.15em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
