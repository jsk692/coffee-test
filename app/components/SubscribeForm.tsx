"use client";

import { useState, type FormEvent } from "react";

/** 電子報訂閱（目前僅前端示意，尚未串接後端） */
export default function SubscribeForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 串接電子報服務
    setDone(true);
  };

  if (done) {
    return (
      <p className="animate-rise rounded-sm border border-forest/30 bg-forest/5 px-5 py-4 text-forest">
        謝謝訂閱！新豆上架時，我們會第一個通知你。
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="email" className="sr-only">
        電子郵件
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="你的電子郵件"
        className="min-w-0 flex-1 rounded-full border border-espresso/25 bg-paper px-5 py-3 outline-none transition-colors placeholder:text-coffee/50 focus:border-terracotta"
      />
      <button
        type="submit"
        className="rounded-full bg-terracotta px-7 py-3 tracking-[0.15em] text-paper transition-colors hover:bg-terracotta-dark"
      >
        訂閱新豆通知
      </button>
    </form>
  );
}
