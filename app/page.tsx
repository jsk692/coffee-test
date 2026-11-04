import type { CSSProperties, ReactNode } from "react";
import Drift from "./components/Drift";
import FlavorWheel from "./components/FlavorWheel";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Parallax from "./components/Parallax";
import Reveal from "./components/Reveal";
import SubscribeForm from "./components/SubscribeForm";
import { beans, images, navLinks, origins, steps } from "./content";

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-xs tracking-[0.35em] text-terracotta ${className}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* ── 首屏 ── */}
        <Parallax
          src={images.hero}
          alt="清晨山稜上方的雲海"
          speed={0.32}
          zoom={0}
          preload
          imageClassName="animate-hero-zoom"
          className="h-svh min-h-[620px]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/25 to-espresso/70" />
          <div className="mist pointer-events-none absolute -inset-x-1/4 bottom-0 h-2/3" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 text-paper md:px-10 md:pb-32">
            <Drift speed={0.4} fadeOut>
            <p className="animate-rise text-xs tracking-[0.4em] opacity-85" style={{ "--delay": "100ms" } as CSSProperties}>
              TAIWAN SPECIALTY COFFEE ROASTERS
            </p>
            <h1 className="mt-6 font-serif text-7xl font-black leading-none tracking-[0.25em] sm:text-8xl md:text-[10rem]">
              {["山", "嵐"].map((ch, i) => (
                <span key={ch} className="char-mask">
                  <span style={{ "--delay": `${250 + i * 140}ms` } as CSSProperties}>{ch}</span>
                </span>
              ))}
            </h1>
            <p
              className="animate-rise mt-8 max-w-xl font-serif text-lg leading-relaxed tracking-[0.12em] md:text-2xl"
              style={{ "--delay": "450ms" } as CSSProperties}
            >
              把台灣山間的霧氣與晨光，
              <br />
              烘進每一顆豆子裡。
            </p>
            <div className="animate-rise mt-10 flex flex-wrap gap-4" style={{ "--delay": "650ms" } as CSSProperties}>
              <a
                href="#origins"
                className="rounded-full bg-terracotta px-8 py-3.5 tracking-[0.15em] transition-colors hover:bg-terracotta-dark"
              >
                探索產區
              </a>
              <a
                href="#beans"
                className="rounded-full border border-paper/70 px-8 py-3.5 tracking-[0.15em] transition-colors hover:bg-paper hover:text-espresso"
              >
                本季豆單
              </a>
            </div>
            </Drift>
          </div>
          <a
            href="#story"
            aria-label="往下捲動"
            className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 text-[0.65rem] tracking-[0.3em] text-paper/80 md:right-10 md:flex"
          >
            <span className="[writing-mode:vertical-rl]">SCROLL</span>
            <span className="animate-scroll-hint h-10 w-px bg-paper/70" />
          </a>
        </Parallax>

        {/* ── 品牌故事 ── */}
        <section id="story" className="mx-auto grid max-w-7xl scroll-mt-16 items-center gap-14 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>品牌故事 OUR STORY</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
                從山上來，
                <br />
                回到你的杯中。
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 leading-loose text-coffee">
                「嵐」是山間的霧氣。台灣的咖啡長在雲霧之中，日夜溫差讓果實熟成得很慢，也讓風味更細緻。
              </p>
              <p className="mt-5 leading-loose text-coffee">
                山嵐只烘台灣在地的咖啡豆。我們與阿里山、南投、屏東的農友長期合作，以小批次細心烘焙，想讓更多人喝到這座島嶼的味道。
              </p>
            </Reveal>
            <Reveal delay={300}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-espresso/15 pt-8">
                {[
                  ["3", "合作產區"],
                  ["100%", "台灣咖啡豆"],
                  ["48h", "烘後出貨"],
                ].map(([n, label]) => (
                  <div key={label}>
                    <dt className="font-serif text-3xl font-bold text-terracotta md:text-4xl">{n}</dt>
                    <dd className="mt-2 text-sm tracking-widest text-coffee/80">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal variant="mask" delay={150}>
              <Parallax
                src={images.story}
                alt="以手沖壺沖煮咖啡"
                sizes="(min-width: 1024px) 50vw, 100vw"
                zoom={0.14}
                className="aspect-[4/5] rounded-sm"
              />
            </Reveal>
            <Drift speed={-0.08} className="absolute -bottom-8 -left-4 max-w-[15rem] md:-left-10">
              <Reveal delay={600}>
                <div className="bg-forest px-6 py-5 text-paper shadow-xl">
                  <p className="font-serif text-lg leading-relaxed tracking-widest">「慢一點，讓風味自己說話。」</p>
                </div>
              </Reveal>
            </Drift>
          </div>
        </section>

        {/* ── 產區 ── */}
        <section id="origins" className="scroll-mt-16 bg-espresso text-paper">
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-10 md:pt-36">
            <Reveal>
              <Eyebrow>產區 ORIGINS</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <h2 className="font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
                  三座山，三種風土
                </h2>
                <p className="max-w-md leading-loose text-paper/75">
                  從北回歸線附近的阿里山，到南台灣的大武山。海拔、日照和雨量不同，豆子的個性也不同。
                </p>
              </div>
            </Reveal>
          </div>

          {origins.map((o, i) => (
            <Parallax key={o.id} src={o.image} alt={`${o.name}產區風景`} speed={0.16} zoom={0.1} className="h-[88svh] min-h-[560px]">
              <div
                className={`absolute inset-0 ${
                  i % 2 === 0
                    ? "bg-gradient-to-r from-espresso/85 via-espresso/40 to-transparent"
                    : "bg-gradient-to-l from-espresso/85 via-espresso/40 to-transparent"
                }`}
              />
              <div className={`relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-16 md:items-center md:px-10 md:pb-0 ${i % 2 === 0 ? "" : "md:justify-end"}`}>
                <Drift speed={-0.1} className="max-w-lg">
                <Reveal>
                  <p className="font-serif text-6xl font-black text-paper/25 md:text-8xl">0{i + 1}</p>
                  <p className="mt-2 text-xs tracking-[0.35em] text-terracotta">{o.en.toUpperCase()}</p>
                  <h3 className="mt-3 font-serif text-4xl font-bold tracking-[0.15em] md:text-5xl">{o.name}</h3>
                  <p className="mt-6 leading-loose text-paper/85">{o.description}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-paper/25 pt-6 text-sm sm:grid-cols-4 md:grid-cols-2">
                    {[
                      ["地區", o.region],
                      ["海拔", o.altitude],
                      ["品種", o.variety],
                      ["處理法", o.process],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="tracking-[0.25em] text-paper/55">{k}</dt>
                        <dd className="mt-1 tracking-wider">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                </Drift>
              </div>
            </Parallax>
          ))}
        </section>

        {/* ── 風味輪 ── */}
        <section id="flavor" className="scroll-mt-16 bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
            <Reveal>
              <Eyebrow>風味輪 FLAVOR WHEEL</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
                台灣咖啡的味道
              </h2>
              <p className="mt-6 max-w-xl leading-loose text-coffee">
                這是我們依照台灣產區杯測紀錄手繪的風味輪。點選任一風味，看看哪幾支豆子帶有這樣的味道。
              </p>
            </Reveal>
            <div className="mt-16">
              <FlavorWheel />
            </div>
          </div>
        </section>

        {/* ── 本季豆單 ── */}
        <section id="beans" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-28 md:px-10 md:py-36">
          <Reveal>
            <Eyebrow>本季豆單 THIS SEASON</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
              這一季，從山上帶回來的
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beans.map((b, i) => (
              <Reveal key={b.name} delay={i * 120}>
                <article className="group flex h-full flex-col border border-espresso/15 bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgb(42_28_20/0.35)]">
                  <div className="relative flex aspect-[4/3] items-end overflow-hidden p-6" style={{ background: b.tone }}>
                    <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full opacity-30 transition-transform duration-700 group-hover:scale-110" aria-hidden="true">
                      <path d="M0 110 L60 40 L95 80 L130 30 L200 110 Z" fill="#2a1c14" />
                      <path d="M0 120 L50 75 L100 105 L160 60 L200 90 L200 120 Z" fill="#fbf7f0" fillOpacity=".5" />
                    </svg>
                    <span className="relative text-xs tracking-[0.3em] text-espresso/80">{b.origin}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl font-bold tracking-widest">{b.name}</h3>
                    <p className="mt-2 text-sm tracking-widest text-coffee/75">{b.process}</p>

                    <div className="mt-5 flex items-center gap-3 text-sm">
                      <span className="tracking-widest text-coffee/75">烘焙度</span>
                      <span className="flex gap-1" aria-label={`${b.roastLabel}，5 級中的第 ${b.roast} 級`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`h-2 w-2 rounded-full ${n <= b.roast ? "bg-coffee" : "bg-sand"}`}
                          />
                        ))}
                      </span>
                      <span className="tracking-widest">{b.roastLabel}</span>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {b.notes.map((n) => (
                        <li key={n} className="rounded-sm bg-cream px-2.5 py-1 text-xs tracking-widest">
                          {n}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between border-t border-espresso/10 pt-5">
                      <span className="font-serif font-semibold">{b.price}</span>
                      <a href="#visit" className="text-sm tracking-widest text-terracotta transition-colors hover:text-terracotta-dark">
                        預訂 →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 引言大圖 ── */}
        <Parallax src={images.quote} alt="麻袋中的烘焙咖啡豆" speed={0.2} zoom={0.12} className="h-[70svh] min-h-[420px]">
          <div className="absolute inset-0 bg-espresso/55" />
          <div className="relative z-10 flex h-full items-center justify-center px-5 text-center text-paper">
            <Drift speed={-0.12}>
            <Reveal>
              <p className="font-serif text-2xl font-bold leading-relaxed tracking-[0.12em] sm:text-3xl md:text-5xl md:tracking-[0.2em]">
                每一爐，只烘三公斤。
              </p>
              <p className="mt-6 text-sm tracking-[0.35em] text-paper/75">SMALL BATCH · ROASTED IN TAIWAN</p>
            </Reveal>
            </Drift>
          </div>
        </Parallax>

        {/* ── 烘焙工序 ── */}
        <section className="bg-espresso text-paper">
          <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
            <Reveal>
              <Eyebrow>烘焙工序 OUR CRAFT</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
                從產地到你手上
              </h2>
            </Reveal>
            <ol className="mt-16 grid gap-px overflow-hidden bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="bg-espresso">
                  <Reveal delay={i * 120} className="h-full p-8">
                    <span className="font-serif text-5xl font-black text-terracotta">0{i + 1}</span>
                    <h3 className="mt-6 font-serif text-2xl font-bold tracking-widest">{s.title}</h3>
                    <p className="mt-4 leading-loose text-paper/70">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 門市與訂閱 ── */}
        <section id="visit" className="mx-auto grid max-w-7xl scroll-mt-16 items-center gap-14 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
          <Reveal variant="mask">
            <Parallax
              src={images.visit}
              alt="朋友在咖啡館舉杯"
              sizes="(min-width: 1024px) 50vw, 100vw"
              zoom={0.14}
              className="aspect-[5/4] rounded-sm"
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>門市 VISIT US</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-snug tracking-[0.12em] md:text-5xl">
                來烘豆室坐坐
              </h2>
              <p className="mt-6 leading-loose text-coffee">
                烘豆室裡有一張長吧台，每週末提供本季豆款的杯測體驗。歡迎來聊聊咖啡，也聊聊山。
              </p>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-10 space-y-4 border-y border-espresso/15 py-8">
                {[
                  ["地址", "台中市西區 ○○路 ○○號（示意）"],
                  ["營業時間", "週三至週日 10:00 – 18:00"],
                  ["聯絡信箱", "hello@lanshan.example"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-6">
                    <dt className="w-20 shrink-0 text-sm tracking-widest text-coffee/70">{k}</dt>
                    <dd className="tracking-wider">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={300}>
              <p className="mb-4 mt-10 font-serif text-xl font-bold tracking-widest">新豆上架通知</p>
              <SubscribeForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-espresso text-paper/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <Logo className="text-paper" />
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm tracking-widest">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-terracotta">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs tracking-[0.2em] text-paper/50">© Lanshan Roasters 山嵐咖啡烘焙</p>
        </div>
      </footer>
    </>
  );
}
