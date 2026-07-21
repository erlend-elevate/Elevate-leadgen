const ITEMS = ['CHATGPT', 'GEMINI', 'PERPLEXITY', 'COPILOT', 'GOOGLE AI OVERVIEWS']

/** S2 — Ticker strip (navy, 56px): CSS marquee, duplicated track, pause on hover. */
export default function Ticker() {
  const track = (
    <>
      {ITEMS.map((it) => (
        <span key={it} className="flex items-center">
          <span className="px-5">{it}</span>
          <span aria-hidden="true" className="text-teal/70">✳</span>
        </span>
      ))}
      <span className="flex items-center">
        <span className="px-5 text-teal">DO THEY KNOW YOU EXIST?</span>
        <span aria-hidden="true" className="text-teal/70">✳</span>
      </span>
    </>
  )

  return (
    <div data-nav="navy" className="relative h-14 overflow-hidden border-y border-line-navy bg-navy motion-reduce:h-auto motion-reduce:py-3.5">
      <div
        aria-hidden="true"
        className="animate-marquee flex h-full w-max items-center whitespace-nowrap font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-paper-on-navy hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-full motion-reduce:whitespace-normal"
      >
        <div className="flex items-center motion-reduce:flex-wrap motion-reduce:justify-center">{track}</div>
        <div className="flex items-center motion-reduce:hidden" aria-hidden="true">{track}</div>
      </div>
      {/* Visually-hidden static equivalent */}
      <p className="sr-only">{[...ITEMS, 'DO THEY KNOW YOU EXIST?'].join(' · ')}</p>
    </div>
  )
}
