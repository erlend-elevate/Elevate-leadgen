import { useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export type StampProps = {
  children: ReactNode
  /** Colour per verdict: orange (action), teal (positive / on navy), teal-aa (on paper), ink (neutral). */
  color?: 'orange' | 'teal' | 'teal-aa' | 'ink'
  /** Thump in on scroll (default true). Set false to render resolved. */
  animate?: boolean
  /** Settle rotation in degrees (design default −8). */
  rotate?: number
  className?: string
}

const COLOR_CLASSES: Record<NonNullable<StampProps['color']>, string> = {
  orange: 'border-orange text-orange-aa',
  teal: 'border-teal text-teal',
  'teal-aa': 'border-teal-aa text-teal-aa',
  ink: 'border-ink text-ink',
}

/** Rubber stamp verdict (design.md §7.5): bordered uppercase, double border, thump entrance. */
export default function Stamp({ children, color = 'orange', animate = true, rotate = -8, className }: StampProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!animate || !ref.current) return
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1, scale: 1, rotation: rotate, filter: 'blur(0px)' })
        return
      }
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 1.7, rotation: rotate - 6, filter: 'blur(1px)' },
        {
          opacity: 1,
          scale: 1,
          rotation: rotate,
          filter: 'blur(0px)',
          duration: 0.38,
          ease: 'thump',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        },
      )
    },
    { scope: ref, dependencies: [animate, rotate] },
  )

  return (
    <span
      ref={ref}
      className={cn(
        'stamp-double inline-block select-none border-2 bg-transparent px-3 py-1.5 text-center',
        'font-sans expanded text-[0.8rem] font-bold uppercase leading-none tracking-[0.14em]',
        COLOR_CLASSES[color],
        className,
      )}
      style={animate ? { opacity: 0, transform: `rotate(${rotate}deg)` } : { transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  )
}
