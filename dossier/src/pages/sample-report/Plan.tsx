import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { SectionHeader, ScaleChip } from './shared'

type Action = {
  text: string
  impact: 1 | 2 | 3
  effort: 1 | 2 | 3
  how: string
}

type Phase = {
  days: string
  name: string
  actions: Action[]
}

const PHASES: Phase[] = [
  {
    days: 'DAYS 0–30',
    name: 'STOP THE BLEEDING',
    actions: [
      {
        text: 'Correct retired pricing at the source + request re-crawl',
        impact: 3,
        effort: 1,
        how: 'How: we identify every cached source and file the correction and re-crawl requests.',
      },
      {
        text: 'Publish Organization schema + sameAs',
        impact: 3,
        effort: 1,
        how: 'How: we provide the exact schema block to paste.',
      },
      {
        text: 'Fix NAP across top 10 citations',
        impact: 2,
        effort: 2,
        how: 'How: we send the citation list with the correct details pre-filled.',
      },
    ],
  },
  {
    days: 'DAYS 31–60',
    name: 'GET LISTED WHERE AI LOOKS',
    actions: [
      {
        text: 'Claim + complete the 3 directory listings',
        impact: 3,
        effort: 2,
        how: 'How: we hand over the three profiles, written and ready to submit.',
      },
      {
        text: 'Launch review programme (target 15 new reviews)',
        impact: 2,
        effort: 3,
        how: 'How: a 3-email sequence your account managers can send as-is.',
      },
      {
        text: 'Refresh case studies with machine-readable summaries',
        impact: 2,
        effort: 2,
        how: 'How: we reformat your top five case studies with AI-readable summaries.',
      },
    ],
  },
  {
    days: 'DAYS 61–90',
    name: 'EARN THE RECOMMENDATION',
    actions: [
      {
        text: 'Publish comparison/alternatives content AI cites',
        impact: 3,
        effort: 3,
        how: 'How: we outline the exact articles; your team or ours writes them.',
      },
      {
        text: 'Digital PR: 2 placements in sector press',
        impact: 2,
        effort: 3,
        how: 'How: we pitch the angles — you approve every word.',
      },
      {
        text: 'Re-run audit — measure mention-share delta',
        impact: 1,
        effort: 1,
        how: 'How: same 52 queries, same method — the delta is the deliverable.',
      },
    ],
  },
]

/** S7 — 05 The 90-Day Plan (sample-report.md §S7). */
export default function Plan() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Three columns cascade
      gsap.fromTo(
        '.srp-col',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'snap',
          stagger: 0.15,
          scrollTrigger: { trigger: '.srp-grid', start: 'top 75%', once: true },
        },
      )

      // Phase header bands wipe L→R
      gsap.fromTo(
        '.srp-band-inner',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.5,
          ease: 'wipe',
          stagger: 0.15,
          scrollTrigger: { trigger: '.srp-grid', start: 'top 72%', once: true },
        },
      )

      // Rows tick in per column
      gsap.fromTo(
        '.srp-row',
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'snap',
          stagger: 0.06,
          scrollTrigger: { trigger: '.srp-grid', start: 'top 70%', once: true },
        },
      )

      // Projection note underlines itself (2px teal draw)
      gsap.fromTo(
        '.srp-underline',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'wipe',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '.srp-projection', start: 'top 80%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="report-plan" data-nav="paper" aria-label="The 90-day plan" className="border-t border-line-paper px-5 py-16 md:px-8 lg:py-24">
      <SectionHeader index="05" title="From invisible to recommended in 90 days" />
      <p className="mt-6 max-w-[62ch] leading-[1.65] text-ink-soft">
        Every action prioritised by expected impact on mention share. No retainer required — Company X's team can
        execute in-house, or we can help.
      </p>

      <div className="srp-grid mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:mt-14">
        {PHASES.map((phase) => (
          <div key={phase.days} className="srp-col flex flex-col border border-ink/70 bg-paper">
            {/* Phase header band */}
            <div className="srp-band bg-ink px-4 py-3.5 text-paper">
              <div className="srp-band-inner">
                <p className="tnum font-mono text-[12px] font-bold tracking-[0.18em]">{phase.days}</p>
                <p className="expanded mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-paper/70">
                  {phase.name}
                </p>
              </div>
            </div>
            {/* Actions */}
            <ul className="flex-1">
              {phase.actions.map((a, i) => (
                <li
                  key={a.text}
                  tabIndex={0}
                  className={
                    'srp-row group px-4 py-3.5 outline-offset-[-3px] transition-colors hover:bg-paper-2/50' +
                    (i > 0 ? ' border-t border-line-paper' : '')
                  }
                >
                  <p className="text-[14px] font-medium leading-[1.45] text-ink">{a.text}</p>
                  <p className="mt-2.5 flex flex-wrap gap-2">
                    <ScaleChip label="IMPACT" level={a.impact} glyph="triangle" />
                    <ScaleChip label="EFFORT" level={a.effort} glyph="dot" />
                  </p>
                  {/* Hover "how" note (max-height tween) */}
                  <p className="max-h-0 overflow-hidden font-mono text-[10.5px] leading-[1.5] tracking-[0.02em] text-ink-soft opacity-0 transition-all duration-300 ease-snap group-hover:max-h-14 group-hover:pt-2 group-hover:opacity-100 group-focus-within:max-h-14 group-focus-within:pt-2 group-focus-within:opacity-100">
                    {a.how}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projection note */}
      <p className="srp-projection mt-10 inline-block font-mono text-[12px] leading-[1.6] tracking-[0.04em] text-ink">
        <span className="relative inline-block pb-1.5">
          Projected outcome at day 90, based on comparable engagements: mention share{' '}
          <span className="tnum font-bold">4% → 25–35%</span>.
          <span aria-hidden="true" className="srp-underline absolute bottom-0 left-0 h-0.5 w-full bg-teal" />
        </span>
      </p>
    </section>
  )
}
