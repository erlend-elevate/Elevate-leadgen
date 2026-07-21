import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Section header inside the report: hairline + mono index + Display L H2 (sample-report.md). */
export function SectionHeader({ index, title, className }: { index: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-orange-aa">
        <span aria-hidden="true" className="inline-block h-px w-8 bg-orange-aa/60" />
        {index}
      </p>
      <h2 className="mt-4 font-serif text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-[1.0] tracking-[-0.02em] text-ink">
        {title}
      </h2>
    </div>
  )
}

/** Status chip for the evidence ledger (sample-report.md §S4). */
export function LedgerChip({ kind, children }: { kind: 'named' | 'absent' | 'error'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'sr-chip inline-block whitespace-nowrap px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]',
        kind === 'named' && 'border border-teal-aa text-teal-aa',
        kind === 'absent' && 'bg-ink text-paper',
        kind === 'error' && 'bg-orange text-ink',
      )}
    >
      {children}
    </span>
  )
}

/** Sources/platform dot cluster: ● found / ○ missing, with optional mono count (mono per design). */
export function DotCluster({ filled, total = 5, count }: { filled: number; total?: number; count?: string }) {
  return (
    <span
      className="inline-flex items-center gap-[3px] font-mono text-[12px] leading-none"
      aria-label={`${count ?? `${filled}/${total}`}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} aria-hidden="true" className={cn('sr-dot', i < filled ? 'text-ink' : 'text-ink/25')}>
          {i < filled ? '●' : '○'}
        </span>
      ))}
      {count && <span className="tnum ml-1.5 text-[11px] text-ink-soft">{count}</span>}
    </span>
  )
}

/** Plan chips: IMPACT ▲▲▲ (orange) / EFFORT ● (ink) scales (sample-report.md §S7). */
export function ScaleChip({ label, level, glyph }: { label: string; level: 1 | 2 | 3; glyph: 'triangle' | 'dot' }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-line-paper bg-paper-2/60 px-2 py-1">
      <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <span aria-label={`${label} ${level} of 3`} className="flex items-center gap-[2px] font-mono text-[10px] leading-none">
        {([1, 2, 3] as const).map((n) => (
          <span
            key={n}
            aria-hidden="true"
            className={cn(
              glyph === 'triangle' ? (n <= level ? 'text-orange' : 'text-ink/20') : n <= level ? 'text-ink' : 'text-ink/20',
            )}
          >
            {glyph === 'triangle' ? '▲' : '●'}
          </span>
        ))}
      </span>
    </span>
  )
}
