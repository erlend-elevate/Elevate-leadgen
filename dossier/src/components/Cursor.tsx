import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * Custom cursor (design.md §6): 10px teal dot + 28px ring, ring scales to 1.6
 * with a mono label over interactive elements. Desktop pointer:fine only,
 * augments (never replaces) the native cursor.
 */
export default function Cursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion(),
  )
  const [label, setLabel] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = (e.target as HTMLElement | null)?.closest?.('a, button, [role="button"], [data-cursor], input, select, textarea, summary')
      setActive(!!t)
      setLabel((t as HTMLElement | null)?.dataset?.cursor ?? null)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, enabled])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] size-2.5 rounded-full bg-teal"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] flex size-7 items-center justify-center rounded-full border border-teal mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: active ? 1.6 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 0.9, 0.24, 1] }}
      >
        {label && (
          <span className="font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-teal">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
