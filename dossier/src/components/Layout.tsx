import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { initLenis, consumePendingAnchor, setPendingAnchor, getLenis, scrollToTarget } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

/**
 * Shared chrome (design.md §7): fixed navbar + footer + grain + cursor + Lenis.
 * Routing pattern B — renders <Outlet/>, App.tsx MUST use nested <Route>s.
 * The Layout owns the 72px nav offset; full-bleed heroes opt out inside pages.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    initLenis()
  }, [])

  useEffect(() => {
    // Route change: unless Home is about to consume a pending anchor, jump to top.
    // First render keeps the browser's native anchor position (deep links like /#faq).
    const pending = consumePendingAnchor()
    if (pending) {
      setPendingAnchor(pending) // hand it back for Home's mount effect
    } else if (window.location.hash) {
      // Deep link (e.g. /#faq): scroll once the page has rendered.
      const h = window.location.hash
      window.setTimeout(() => scrollToTarget(h), 500)
    } else {
      getLenis()?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }
    firstRender.current = false
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-orange focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.18em] focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main id="content" className="pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
