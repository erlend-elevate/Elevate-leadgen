import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * Character-by-character typewriter (examiner's hand).
 * Returns the visible text and a done flag. Respects reduced motion (instant).
 */
export function useTypewriter(text: string, opts?: { start?: boolean; cps?: number; onDone?: () => void }) {
  const { start = true, cps = 30, onDone } = opts ?? {}
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      // Resolve instantly but asynchronously (no sync setState-in-effect).
      const t = setTimeout(() => {
        setOut(text)
        setDone(true)
        onDoneRef.current?.()
      }, 0)
      return () => clearTimeout(t)
    }
    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (cancelled) return
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        onDoneRef.current?.()
        return
      }
      const base = 1000 / cps
      timer = setTimeout(tick, base * (0.92 + Math.random() * 0.16)) // 8% jitter
    }
    timer = setTimeout(tick, 1000 / cps)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [text, start, cps])

  const reset = useCallback(() => {
    setOut('')
    setDone(false)
  }, [])

  return { out, done, reset }
}
