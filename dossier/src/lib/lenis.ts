import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis: Lenis | null = null

/** Initialise the page-wide Lenis smooth scroll (design.md §6: lerp 0.11, synced to ScrollTrigger). */
export function initLenis(): Lenis | null {
  if (lenis) return lenis
  if (typeof window === 'undefined' || prefersReducedMotion()) return null
  lenis = new Lenis({ lerp: 0.11 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

const NAV_OFFSET = -72

/** Smooth-scroll to a selector/element/number, respecting the fixed nav height. */
export function scrollToTarget(target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) {
  const offset = opts?.offset ?? NAV_OFFSET
  if (lenis) {
    lenis.scrollTo(target as never, { offset, duration: opts?.immediate ? 0 : 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: opts?.immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: y, behavior: opts?.immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

export function stopScroll() {
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function startScroll() {
  lenis?.start()
  document.documentElement.style.overflow = ''
}

/* Cross-page anchor handoff: Navbar stores a pending hash, Home consumes it after mount. */
let pendingAnchor: string | null = null
export function setPendingAnchor(hash: string) {
  pendingAnchor = hash
}
export function consumePendingAnchor(): string | null {
  const a = pendingAnchor
  pendingAnchor = null
  return a
}
