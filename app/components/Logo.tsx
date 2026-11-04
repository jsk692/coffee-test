type LogoProps = { className?: string };

/** 山形線條 + 品牌名 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 32" className="h-7 w-10" fill="none" aria-hidden="true">
        <path
          d="M2 28 L16 9 L24 19 L31 11 L46 28"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 22c5-2 9 1 14-1s9-2 14 0"
          stroke="var(--color-terracotta)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-[0.2em]">山嵐</span>
        <span className="mt-1 text-[0.6rem] tracking-[0.32em] opacity-75">LANSHAN ROASTERS</span>
      </span>
    </span>
  );
}
