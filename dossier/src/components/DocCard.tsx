import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type DocCardProps = {
  /** Mono header, e.g. "FILE 01" or "FORM 06 — GEO AUDIT REQUEST". */
  fileNo?: string
  /** Slot overlapping the header row, right side (usually a <Stamp/>). */
  stamp?: ReactNode
  /** Mono meta line rendered below a hairline at the card foot. */
  meta?: string
  className?: string
  bodyClassName?: string
  children: ReactNode
  /** Use the teal-on-navy folded corner (for navy-deep panels). */
  navy?: boolean
}

/** Evidence document card (design.md §7.6): paper, ink border, folded corner, mono FILE header. */
export default function DocCard({ fileNo, stamp, meta, className, bodyClassName, children, navy = false }: DocCardProps) {
  return (
    <article
      className={cn(
        'doc-fold relative border transition-all duration-300 ease-snap',
        navy
          ? 'doc-fold-navy border-line-navy bg-navy-deep'
          : 'border-ink/70 bg-paper hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(26,26,46,.15)]',
        className,
      )}
    >
      {(fileNo || stamp) && (
        <header className={cn('flex items-center justify-between gap-3 border-b px-6 py-3.5', navy ? 'border-line-navy' : 'border-line-paper')}>
          <span className={cn('font-mono text-[11px] font-medium uppercase tracking-[0.22em]', navy ? 'text-teal' : 'text-ink-soft')}>
            {fileNo}
          </span>
          {stamp}
        </header>
      )}
      <div className={cn('px-6 py-6', bodyClassName)}>{children}</div>
      {meta && (
        <footer className={cn('border-t px-6 py-3', navy ? 'border-line-navy' : 'border-line-paper')}>
          <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.18em]', navy ? 'text-paper-on-navy/60' : 'text-ink-soft/80')}>
            {meta}
          </span>
        </footer>
      )}
    </article>
  )
}
