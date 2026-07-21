import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

const NUMBERS = [
  { value: 140, suffix: '+', label: 'AUDITS DELIVERED' },
  { value: 5, suffix: '', label: 'AI PLATFORMS TRACKED' },
  { value: 3, suffix: '×', label: 'AVG. MENTION LIFT — 90 DAYS*' },
]

const TESTIMONIALS = [
  {
    quote:
      "We'd spent six figures on SEO. The audit showed Perplexity had never once named us. Ninety days later, we're in three of the five answers that matter.",
    name: 'Sarah Whitmore',
    role: 'Marketing Director · B2B SaaS · London',
    tile: 'SW',
  },
  {
    quote:
      'The competitor benchmark alone was worth it — and it was free. Seeing exactly who ChatGPT recommends instead of us was… uncomfortable. Useful, though.',
    name: 'James Okafor',
    role: 'CEO · Managed IT Services · Manchester',
    tile: 'JO',
  },
  {
    quote: "The report found AI quoting pricing we retired in 2023. We'd never have caught that ourselves.",
    name: 'Priya Shah',
    role: 'IT Director · Cybersecurity · Birmingham',
    tile: 'PS',
  },
]

/** S7 — EXHIBIT E "Field Reports": social proof (navy). */
export default function ExhibitE() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      // Credibility counters
      NUMBERS.forEach((n, i) => {
        const el = root.current?.querySelector<HTMLElement>(`.ee-num-${i}`)
        if (!el) return
        if (reduced) {
          el.textContent = `${n.value}${n.suffix}`
          return
        }
        const obj = { v: 0 }
        gsap.to(obj, {
          v: n.value,
          duration: 1.2,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: '.ee-numbers', start: 'top 75%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${n.suffix}`
          },
        })
      })
      if (reduced) return
      gsap.fromTo(
        '.ee-card',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'snap',
          stagger: 0.12,
          scrollTrigger: { trigger: '.ee-cards', start: 'top 78%', once: true },
        },
      )
      // Opening quote marks parallax −10% on scrub
      gsap.utils.toArray<HTMLElement>('.ee-qmark').forEach((q) => {
        gsap.to(q, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: q, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="exhibit-e" data-nav="navy" className="console-vignette relative text-paper-on-navy">
      <div className="grain-screen" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-36">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-teal">
              EXHIBIT E — FIELD REPORTS
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-none tracking-[-0.02em]">
              Audited. Benchmarked. <em className="italic text-teal">Quoted by the machines.</em>
            </h2>
          </div>
          {/* Credibility numbers strip */}
          <div className="ee-numbers mt-10 lg:col-span-5 lg:mt-0">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {NUMBERS.map((n, i) => (
                <div key={n.label}>
                  <p className={`ee-num-${i} tnum font-serif text-[2rem] font-medium leading-none text-teal`}>
                    0{n.suffix}
                  </p>
                  <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper-on-navy/70">{n.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-paper-on-navy/50">*for clients who implement the plan</p>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="ee-cards mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="ee-card doc-fold doc-fold-navy group relative border border-line-navy bg-navy-deep p-7 transition-colors duration-300 hover:border-teal/60"
            >
              <span aria-hidden="true" className="ee-qmark pointer-events-none absolute -top-3 left-4 font-serif text-[6rem] leading-none text-teal/30">
                “
              </span>
              <blockquote className="relative pt-10 font-serif text-[1.35rem] font-medium italic leading-[1.35] tracking-[-0.01em] text-paper-on-navy">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line-navy pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center border border-teal font-serif text-[1.05rem] font-medium text-teal transition-colors [transition-duration:.25s] group-hover:bg-teal group-hover:text-ink"
                >
                  {t.tile}
                </span>
                <span>
                  <span className="block font-sans text-[15px] font-bold text-paper-on-navy">{t.name}</span>
                  <span className="mt-0.5 block font-mono text-[11px] tracking-[0.04em] text-teal/70">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] tracking-[0.04em] text-paper-on-navy/50">
          Testimonials from audit clients; names shared with permission. Reports anonymised by default — see our
          Privacy Policy.
        </p>
      </div>
    </section>
  )
}
