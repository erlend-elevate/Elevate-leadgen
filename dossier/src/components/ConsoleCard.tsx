import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ConsoleCardProps = {
  /** Chrome title, e.g. "QUERY LOG — chatgpt-5". */
  title: string
  children: ReactNode
  /** Mono footer microcopy. */
  footer?: string
  className?: string
  bodyClassName?: string
}

/** Interrogation terminal (design.md §7.7): navy-deep panel, chrome dots, mono body. */
export default function ConsoleCard({ title, children, footer, className, bodyClassName }: ConsoleCardProps) {
  return (
    <div className={cn('relative overflow-hidden border border-line-navy bg-navy-deep shadow-[0_24px_60px_-24px_rgba(5,23,41,.55)]', className)}>
      <div className="flex items-center gap-2 border-b border-line-navy px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-ink" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-teal" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-orange" />
        <span className="ml-3 truncate font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper-on-navy/70">
          {title}
        </span>
      </div>
      <div className={cn('relative font-mono text-[0.92rem] leading-[1.55]', bodyClassName)}>{children}</div>
      {footer && (
        <div className="border-t border-line-navy px-4 py-2.5 font-mono text-[11px] text-paper-on-navy/60">
          {footer}
        </div>
      )}
    </div>
  )
}
