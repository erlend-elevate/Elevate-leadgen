import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ConsoleCard from '@/components/ConsoleCard'
import Redact from '@/components/Redact'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { SectionHeader, LedgerChip, DotCluster } from './shared'

type Row = {
  platform: string
  slug: string
  status: 'absent' | 'named'
  statusDetail: string
  sentiment: string
  accuracy: 'none' | 'error' | 'ok'
  accuracyDetail: string
  sources: number
  query: string
  answer: ReactNode
  note: ReactNode
}

const HL = ({ children }: { children: ReactNode }) => <span className="font-bold text-teal">{children}</span>
const ERR = ({ children }: { children: ReactNode }) => <span className="bg-orange px-0.5 font-bold text-ink">{children}</span>

const ROWS: Row[] = [
  {
    platform: 'ChatGPT',
    slug: 'chatgpt-5',
    status: 'absent',
    statusDetail: '(0/14 queries)',
    sentiment: '—',
    accuracy: 'none',
    accuracyDetail: '—',
    sources: 1,
    query: 'best MSP Manchester',
    answer: (
      <>
        “…For managed IT in Manchester, the names that keep coming up are <HL>Northbeam IT</HL>,{' '}
        <HL>Corelan Systems</HL> and <HL>BrightByte</HL> — all established, well-reviewed providers…”
      </>
    ),
    note: (
      <>
        COMPANY X:{' '}
        <Redact mode="peek" className="text-paper-on-navy" barClassName="bg-orange">
          not mentioned — 3 competitors recommended instead
        </Redact>
      </>
    ),
  },
  {
    platform: 'Gemini',
    slug: 'gemini-3',
    status: 'named',
    statusDetail: '×2',
    sentiment: 'Neutral',
    accuracy: 'error',
    accuracyDetail: 'ERROR FOUND — wrong founding year',
    sources: 2,
    query: 'IT support for law firms',
    answer: (
      <>
        “…<HL>Company X</HL>, <ERR>founded in 2009</ERR>, provides IT support to legal practices across Greater
        Manchester…”
      </>
    ),
    note: <span className="text-paper-on-navy/60">ERROR: FOUNDED 2014, NOT 2009 — SOURCE: CACHED PAGE, REMOVED 2023</span>,
  },
  {
    platform: 'Perplexity',
    slug: 'perplexity',
    status: 'named',
    statusDetail: '×2',
    sentiment: 'Neutral',
    accuracy: 'ok',
    accuracyDetail: 'Correct, thin',
    sources: 3,
    query: 'cyber essentials consultant near me',
    answer: (
      <>
        “…<HL>Company X</HL> is a Manchester-based MSP offering Cyber Essentials preparation alongside managed
        support…”
      </>
    ),
    note: <span className="text-paper-on-navy/60">CORRECT — BUT THIN: NO SOURCE CITED, NO DETAIL BEYOND ONE LINE</span>,
  },
  {
    platform: 'Copilot',
    slug: 'copilot',
    status: 'absent',
    statusDetail: '(0/9 queries)',
    sentiment: '—',
    accuracy: 'none',
    accuracyDetail: '—',
    sources: 1,
    query: 'managed IT services for a 40-person company',
    answer: (
      <>
        “…I'd shortlist <HL>Northbeam IT</HL> for scale, or <HL>Corelan Systems</HL> if compliance matters most to
        you…”
      </>
    ),
    note: (
      <>
        COMPANY X:{' '}
        <Redact mode="peek" className="text-paper-on-navy" barClassName="bg-orange">
          not mentioned — 2 competitors recommended instead
        </Redact>
      </>
    ),
  },
  {
    platform: 'Google AI Overviews',
    slug: 'ai-overviews',
    status: 'absent',
    statusDetail: '(0/11 queries)',
    sentiment: '—',
    accuracy: 'none',
    accuracyDetail: '—',
    sources: 2,
    query: 'best MSP Manchester',
    answer: (
      <>
        “…Top-rated options include <HL>Northbeam IT</HL>, <HL>HexGuard Security</HL> and <HL>Corelan Systems</HL>,
        based on reviews and sector presence…”
      </>
    ),
    note: (
      <>
        COMPANY X:{' '}
        <Redact mode="peek" className="text-paper-on-navy" barClassName="bg-orange">
          not mentioned — 3 competitors recommended instead
        </Redact>
      </>
    ),
  },
]

/** Expandable drawer: one example query + abbreviated answer excerpt (ConsoleCard styling). */
function Drawer({ row, id }: { row: Row; id: string }) {
  return (
    <div id={id} className="px-4 pb-5 pt-1 md:px-6">
      <ConsoleCard title={`QUERY LOG — ${row.slug}`} bodyClassName="px-4 py-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-teal">▸ QUERY: “{row.query}”</p>
        <p className="mt-3 leading-[1.65] text-paper-on-navy/85">{row.answer}</p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-paper-on-navy/80">{row.note}</p>
      </ConsoleCard>
    </div>
  )
}

/** S4 — 02 Platform Results: the evidence ledger (sample-report.md §S4). */
export default function PlatformResults() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const rows = gsap.utils.toArray<HTMLElement>('.sr-row')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.sr-ledger', start: 'top 75%', once: true },
      })
      rows.forEach((row, i) => {
        const pos = i * 0.12
        // Row wipe: clip-path inset from left (opacity fallback for engines that won't clip table rows)
        tl.fromTo(
          row,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.001 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.4, ease: 'wipe' },
          pos,
        )
        const chips = row.querySelectorAll('.sr-chip')
        if (chips.length) {
          tl.fromTo(chips, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'thump' }, pos + 0.1)
        }
        const dots = row.querySelectorAll('.sr-dot')
        if (dots.length) {
          tl.fromTo(dots, { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.06 }, pos + 0.2)
        }
      })
      // TOTAL row flashes paper-2 once on land
      tl.fromTo(
        '.sr-total-row td',
        { backgroundColor: '#E8E2D2' },
        { backgroundColor: 'rgba(232,226,210,0)', duration: 0.9, ease: 'power1.out' },
        rows.length * 0.12 + 0.1,
      )
    },
    { scope: root },
  )

  const toggle = (i: number) => setOpen((v) => (v === i ? null : i))

  return (
    <section ref={root} id="report-platforms" data-nav="paper" aria-label="Platform results" className="border-t border-line-paper px-5 py-16 md:px-8 lg:py-24">
      <SectionHeader index="02" title="Platform results." />

      {/* Desktop ledger (≥768) */}
      <div className="sr-ledger mt-10 hidden md:block lg:mt-14">
        <table className="w-full border-collapse border border-ink/70">
          <caption className="sr-only">
            Platform-by-platform audit results across ChatGPT, Gemini, Perplexity, Copilot and Google AI Overviews
          </caption>
          <thead>
            <tr className="border-b border-ink/70 bg-paper-2/60">
              {['PLATFORM', 'MENTIONED?', 'SENTIMENT', 'ACCURACY', 'SOURCES CITED', ''].map((h, i) => (
                <th
                  key={h + i}
                  scope="col"
                  className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => {
              const isOpen = open === i
              const drawerId = `sr-drawer-${i}`
              return [
                <tr
                  key={row.platform}
                  onClick={() => toggle(i)}
                  className={cn(
                    'sr-row cursor-pointer border-b border-line-paper transition-colors hover:bg-paper-2/50',
                    isOpen && 'bg-paper-2/50',
                  )}
                >
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={drawerId}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(i)
                      }}
                      className="text-left font-sans text-[15px] font-bold tracking-[-0.01em] text-ink"
                    >
                      {row.platform}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <LedgerChip kind={row.status}>
                      {row.status === 'named' ? `NAMED ${row.statusDetail}` : 'ABSENT'}
                    </LedgerChip>
                    {row.status === 'absent' && (
                      <span className="tnum ml-2 font-mono text-[11px] text-ink-soft">{row.statusDetail}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 font-mono text-[12px] text-ink">{row.sentiment}</td>
                  <td className="px-4 py-4">
                    {row.accuracy === 'error' ? (
                      <>
                        <LedgerChip kind="error">ERROR FOUND</LedgerChip>
                        <span className="ml-2 font-mono text-[11px] text-ink-soft">wrong founding year</span>
                      </>
                    ) : (
                      <span className="font-mono text-[12px] text-ink">{row.accuracyDetail}</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <DotCluster filled={row.sources} count={`${row.sources}/5`} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'inline-block font-mono text-[16px] leading-none text-ink transition-transform duration-300 ease-snap',
                        isOpen && 'rotate-45',
                      )}
                    >
                      +
                    </span>
                  </td>
                </tr>,
                <tr key={`${row.platform}-drawer`} className={cn(isOpen ? 'border-b border-line-paper' : '')}>
                  <td colSpan={6} className="p-0">
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 0.9, 0.24, 1] }}
                          className="overflow-hidden"
                        >
                          <Drawer row={row} id={drawerId} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>,
              ]
            })}
            {/* TOTAL row */}
            <tr className="sr-total-row border-t-2 border-ink/70">
              <td className="px-4 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink">TOTAL</td>
              <td className="tnum px-4 py-4 font-mono text-[13px] font-bold text-ink">4/52 queries</td>
              <td className="px-4 py-4 font-mono text-[12px] text-ink">—</td>
              <td className="px-4 py-4 font-mono text-[12px] font-bold text-orange-aa">3 errors in 4 mentions</td>
              <td className="px-4 py-4 font-mono text-[12px] text-ink">—</td>
              <td className="px-4 py-4" />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards (<768) */}
      <div className="mt-8 space-y-4 md:hidden">
        {ROWS.map((row, i) => {
          const isOpen = open === i
          const drawerId = `sr-drawer-m-${i}`
          return (
            <div key={row.platform} className="sr-row border border-ink/70 bg-paper">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={drawerId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="font-sans text-[15px] font-bold tracking-[-0.01em] text-ink">{row.platform}</span>
                <span className="flex items-center gap-2">
                  <LedgerChip kind={row.status}>{row.status === 'named' ? `NAMED ${row.statusDetail}` : 'ABSENT'}</LedgerChip>
                  <span
                    aria-hidden="true"
                    className={cn('font-mono text-[16px] leading-none text-ink transition-transform duration-300 ease-snap', isOpen && 'rotate-45')}
                  >
                    +
                  </span>
                </span>
              </button>
              <div className="grid grid-cols-2 border-t border-line-paper">
                <div className="border-r border-line-paper px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">SENTIMENT</p>
                  <p className="mt-0.5 font-mono text-[12px] text-ink">{row.sentiment}</p>
                </div>
                <div className="px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">ACCURACY</p>
                  <p className="mt-0.5 font-mono text-[12px] text-ink">
                    {row.accuracy === 'error' ? <LedgerChip kind="error">ERROR FOUND</LedgerChip> : row.accuracyDetail}
                  </p>
                </div>
                <div className="col-span-2 border-t border-line-paper px-4 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">SOURCES CITED</p>
                  <p className="mt-1">
                    <DotCluster filled={row.sources} count={`${row.sources}/5`} />
                  </p>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.9, 0.24, 1] }}
                    className="overflow-hidden border-t border-line-paper"
                  >
                    <Drawer row={row} id={drawerId} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        {/* Mobile total */}
        <div className="sr-total-row flex flex-wrap items-baseline justify-between gap-2 border-2 border-ink/70 bg-paper-2/40 px-4 py-3.5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">TOTAL</span>
          <span className="tnum font-mono text-[13px] font-bold text-ink">4/52 queries</span>
          <span className="font-mono text-[11px] font-bold text-orange-aa">3 errors in 4 mentions</span>
        </div>
      </div>

      {/* Margin note */}
      <p className="mt-6 font-mono text-[0.72rem] leading-[1.6] tracking-[0.04em] text-ink-soft">
        Queries included: “best MSP Manchester”, “IT support for law firms”, “cyber essentials consultant near me”…
        full query log in appendix.
      </p>
    </section>
  )
}
