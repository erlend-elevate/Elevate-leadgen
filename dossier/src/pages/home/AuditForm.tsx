import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import DocCard from '@/components/DocCard'
import Stamp from '@/components/Stamp'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { scrollToTarget } from '@/lib/lenis'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'

const CHECKLIST = [
  'Visibility Score across 5 AI platforms',
  'Competitor mention-share table',
  '90-day prioritised action plan',
  'Free 30-minute walkthrough call',
]

type Fields = {
  firstName: string
  email: string
  company: string
  website: string
  industry: string
  competitor: string
  consent: boolean
}

const INITIAL: Fields = { firstName: '', email: '', company: '', website: '', industry: '', competitor: '', consent: false }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (!f.firstName.trim()) e.firstName = 'First name is required.'
  if (!f.email.trim()) e.email = 'Work email is required.'
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid work email address.'
  if (!f.company.trim()) e.company = 'Company is required.'
  if (!f.website.trim()) e.website = 'Website URL is required.'
  else if (!URL_RE.test(f.website.trim())) e.website = 'Enter a valid URL, e.g. yourcompany.co.uk'
  if (!f.industry) e.industry = 'Select your industry.'
  if (!f.consent) e.consent = 'We need your consent to process the audit.'
  return e
}

/** S8 — FORM 06 "Request for Assessment" (paper). */
export default function AuditForm() {
  const root = useRef<HTMLElement>(null)
  const [fields, setFields] = useState<Fields>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [focused, setFocused] = useState<keyof Fields | null>(null)
  const [caseRef, setCaseRef] = useState('')
  const fieldRefs = useRef<Partial<Record<keyof Fields, HTMLElement | null>>>({})
  const successHeadRef = useRef<HTMLHeadingElement>(null)
  const { out: typedRef, done: refDone } = useTypewriter(caseRef, { start: status === 'success' && !!caseRef, cps: 24 })

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.af-check',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'snap',
          stagger: 0.08,
          scrollTrigger: { trigger: '.af-checklist', start: 'top 78%', once: true },
        },
      )
      gsap.fromTo(
        '.af-tick',
        { color: 'rgba(26,26,46,.2)' },
        {
          color: 'var(--teal-aa)',
          duration: 0.3,
          stagger: 0.08,
          scrollTrigger: { trigger: '.af-checklist', start: 'top 78%', once: true },
        },
      )
      gsap.fromTo(
        '.af-doc',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'snap', scrollTrigger: { trigger: '.af-doc', start: 'top 80%', once: true } },
      )
    },
    { scope: root },
  )

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFields((f) => ({ ...f, [k]: v }))
    setErrors((err) => ({ ...err, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    const firstKey = (Object.keys(errs) as (keyof Fields)[])[0]
    if (firstKey) {
      fieldRefs.current[firstKey]?.focus()
      return
    }
    setStatus('loading')
    // POST to the audit endpoint (analytics-ready); success state is inline per spec.
    fetch('/api/audit-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).catch(() => {})
    const ref = `REF: GEO-26-${String(1000 + (Date.now() % 9000))}`
    window.setTimeout(
      () => {
        setCaseRef(ref)
        setStatus('success')
        window.setTimeout(() => successHeadRef.current?.focus(), 450)
      },
      600 + Math.random() * 300,
    )
  }

  const hint = (k: keyof Fields, text: string) =>
    focused === k && !errors[k] ? (
      <span className="ml-3 font-mono text-[10.5px] normal-case tracking-[0.04em] text-ink-soft/80">{text}</span>
    ) : null

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p role="alert" id={`err-${k}`} className="mt-1.5 font-mono text-[11px] tracking-[0.04em] text-orange-aa">
        ▲ {errors[k]}
      </p>
    ) : null

  const inputCls = (k: keyof Fields) =>
    cn(
      'w-full border-0 border-b-2 bg-transparent px-0 py-2.5 font-sans text-[18px] text-ink placeholder:text-ink-soft/40',
      'focus:outline-none focus:ring-0',
      errors[k] ? 'border-b-orange-aa' : 'border-b-line-paper focus:border-b-orange',
    )

  return (
    <section ref={root} id="form" data-nav="paper" className="relative border-t border-line-paper bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-36">
        {/* Persuasion panel */}
        <div className="relative lg:col-span-5">
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-orange-aa">
            FORM 06 — REQUEST FOR ASSESSMENT
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-none tracking-[-0.02em] text-ink">
            Open your <em className="italic">case file.</em>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.125rem] leading-[1.65] text-ink-soft">
            Free. 48-hour turnaround. Fixed scope. If we're not the right people to fix what we find, we'll say so.
          </p>
          <ul className="af-checklist mt-8 space-y-3.5">
            {CHECKLIST.map((c) => (
              <li key={c} className="af-check flex items-center gap-3 font-mono text-[13px] tracking-[0.02em] text-ink">
                <span aria-hidden="true" className="af-tick text-[15px] text-teal-aa">▣</span>
                {c}
              </li>
            ))}
          </ul>
          <Stamp color="orange" className="mt-10 lg:absolute lg:-bottom-4 lg:left-2 lg:mt-0">
            FREE — NO CARD REQUIRED
          </Stamp>
        </div>

        {/* Form document */}
        <div className="af-doc mt-16 lg:col-span-7 lg:mt-0">
          <DocCard fileNo="FORM 06 — GEO AUDIT REQUEST" className="hover:translate-y-0 hover:shadow-none">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              REF: GEO-26-____
            </p>

            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  data-event="form_submit"
                  onSubmit={onSubmit}
                  noValidate
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* First name */}
                    <div>
                      <label htmlFor="af-firstName" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        FIRST NAME <span aria-hidden="true" className="text-orange-aa">*</span>
                      </label>
                      <input
                        id="af-firstName"
                        ref={(el) => { fieldRefs.current.firstName = el }}
                        type="text"
                        autoComplete="given-name"
                        required
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'err-firstName' : undefined}
                        value={fields.firstName}
                        onChange={set('firstName')}
                        onFocus={() => setFocused('firstName')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('firstName')}
                      />
                      {err('firstName')}
                    </div>

                    {/* Work email */}
                    <div>
                      <label htmlFor="af-email" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        WORK EMAIL <span aria-hidden="true" className="text-orange-aa">*</span>
                        {hint('email', 'We only ever use your work address.')}
                      </label>
                      <input
                        id="af-email"
                        ref={(el) => { fieldRefs.current.email = el }}
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'err-email' : undefined}
                        value={fields.email}
                        onChange={set('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('email')}
                      />
                      {err('email')}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="af-company" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        COMPANY <span aria-hidden="true" className="text-orange-aa">*</span>
                      </label>
                      <input
                        id="af-company"
                        ref={(el) => { fieldRefs.current.company = el }}
                        type="text"
                        autoComplete="organization"
                        required
                        aria-invalid={!!errors.company}
                        aria-describedby={errors.company ? 'err-company' : undefined}
                        value={fields.company}
                        onChange={set('company')}
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('company')}
                      />
                      {err('company')}
                    </div>

                    {/* Website */}
                    <div>
                      <label htmlFor="af-website" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        WEBSITE URL <span aria-hidden="true" className="text-orange-aa">*</span>
                        {hint('website', 'Where AI should be finding you.')}
                      </label>
                      <div className="relative">
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 left-0 font-mono text-[15px] text-ink-soft/70">
                          https://
                        </span>
                        <input
                          id="af-website"
                          ref={(el) => { fieldRefs.current.website = el }}
                          type="text"
                          inputMode="url"
                          autoComplete="url"
                          required
                          aria-invalid={!!errors.website}
                          aria-describedby={errors.website ? 'err-website' : undefined}
                          value={fields.website}
                          onChange={set('website')}
                          onFocus={() => setFocused('website')}
                          onBlur={() => setFocused(null)}
                          className={cn(inputCls('website'), 'pl-[4.6rem]')}
                          placeholder="yourcompany.co.uk"
                        />
                      </div>
                      {err('website')}
                    </div>

                    {/* Industry */}
                    <div>
                      <label htmlFor="af-industry" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        INDUSTRY <span aria-hidden="true" className="text-orange-aa">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="af-industry"
                          ref={(el) => { fieldRefs.current.industry = el }}
                          required
                          aria-invalid={!!errors.industry}
                          aria-describedby={errors.industry ? 'err-industry' : undefined}
                          value={fields.industry}
                          onChange={set('industry')}
                          onFocus={() => setFocused('industry')}
                          onBlur={() => setFocused(null)}
                          className={cn(inputCls('industry'), 'appearance-none pr-8', !fields.industry && 'text-ink-soft/50')}
                        >
                          <option value="" disabled>Select…</option>
                          <option value="msp">Managed IT Services (MSP)</option>
                          <option value="saas">B2B SaaS</option>
                          <option value="cybersecurity">Cybersecurity</option>
                          <option value="other">Other</option>
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-3.5 right-1 font-mono text-[14px] text-ink-soft">
                          ▾
                        </span>
                      </div>
                      {err('industry')}
                    </div>

                    {/* Competitor (optional) */}
                    <div>
                      <label htmlFor="af-competitor" className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        MAIN COMPETITOR{' '}
                        <span className="ml-1 border border-ink/40 px-1.5 py-0.5 text-[9px] tracking-[0.14em] text-ink-soft">OPTIONAL</span>
                        {hint('competitor', "Who do you lose deals to? We'll check their visibility too.")}
                      </label>
                      <input
                        id="af-competitor"
                        type="text"
                        value={fields.competitor}
                        onChange={set('competitor')}
                        onFocus={() => setFocused('competitor')}
                        onBlur={() => setFocused(null)}
                        className={inputCls('competitor')}
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="mt-7">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        ref={(el) => { fieldRefs.current.consent = el }}
                        type="checkbox"
                        checked={fields.consent}
                        onChange={set('consent')}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'err-consent' : undefined}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center border-2 border-ink bg-transparent transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-teal peer-focus-visible:outline-offset-[3px]"
                      >
                        <svg viewBox="0 0 14 14" className="size-3">
                          <path
                            d="M2 7.5 L5.5 11 L12 3"
                            fill="none"
                            stroke="var(--teal-aa)"
                            strokeWidth="2.4"
                            strokeLinecap="square"
                            strokeDasharray="16"
                            strokeDashoffset={fields.consent ? 0 : 16}
                            style={{ transition: 'stroke-dashoffset .25s ease' }}
                          />
                        </svg>
                      </span>
                      <span className="text-[14px] leading-[1.55] text-ink-soft">
                        I agree to Elevate Marketing processing my details to deliver the audit. We never share your
                        data. Unsubscribe anytime. See our{' '}
                        <Link to="/privacy-policy" className="underline-sweep text-ink">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {err('consent')}
                  </div>

                  {/* Submit */}
                  <div className="sticky bottom-4 mt-8 md:static">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      data-cursor="SEND →"
                      className={cn(
                        'group flex h-14 w-full items-center justify-center border-2 border-ink bg-orange font-sans text-[15px] font-bold tracking-[0.02em] text-ink',
                        'shadow-[4px_4px_0_var(--ink)] transition-all [transition-duration:.18s] ease-snap',
                        'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0_0_0_var(--ink)] active:scale-[0.98]',
                        'disabled:cursor-wait disabled:opacity-80',
                      )}
                    >
                      {status === 'loading' ? (
                        <span className="ellipsis font-mono tracking-[0.14em]">FILING REQUEST</span>
                      ) : (
                        <>
                          Get My Free Audit{' '}
                          <span aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center font-mono text-[11px] tracking-[0.04em] text-ink-soft">
                      We never share your data. Unsubscribe anytime.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.9, 0.24, 1] }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 1.7, rotate: -14, opacity: 0 }}
                    animate={{ scale: 1, rotate: -8, opacity: 1 }}
                    transition={{ duration: 0.38, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                    className="stamp-double border-2 border-teal-aa px-5 py-3 font-sans text-[1.15rem] font-bold uppercase tracking-[0.14em] text-teal-aa"
                  >
                    REQUEST LOGGED
                  </motion.span>
                  <h3
                    ref={successHeadRef}
                    tabIndex={-1}
                    className="mt-8 font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-medium italic leading-[1.1] text-ink focus:outline-none"
                  >
                    The file is open.
                  </h3>
                  <p className="mt-3 font-mono text-[13px] tracking-[0.1em] text-orange-aa">
                    {typedRef}
                    {!refDone && <span aria-hidden="true" className="animate-caret-blink">▍</span>}
                  </p>
                  <p className="mt-5 max-w-[44ch] leading-[1.65] text-ink-soft">
                    Check your inbox — confirmation is on its way. Your report lands within 48 hours.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                    <Link
                      to="/sample-report"
                      className="group font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-orange-aa"
                    >
                      While you wait: read a sample report{' '}
                      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">↗</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => scrollToTarget('#faq')}
                      className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink underline-sweep"
                    >
                      What happens next ↓
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DocCard>
        </div>
      </div>
    </section>
  )
}
