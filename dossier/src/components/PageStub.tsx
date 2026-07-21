import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

type PageStubProps = {
  title: string
  description: string
  caseTag: string
  heading: string
  note: string
}

/** Temporary dossier-styled route stub — page agents replace these. */
export default function PageStub({ title, description, caseTag, heading, note }: PageStubProps) {
  return (
    <>
      <Helmet>
        <title>{title} — Elevate Marketing</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12 lg:py-32">
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-orange-aa">{caseTag}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,5.4vw,4.25rem)] font-medium leading-none tracking-[-0.02em] text-ink">
          {heading}
        </h1>
        <p className="mt-6 max-w-[62ch] text-[1.125rem] leading-[1.65] text-ink-soft">{note}</p>
        <Link
          to="/"
          className="mt-10 inline-flex h-12 items-center border-2 border-ink bg-orange px-6 font-sans text-[15px] font-bold text-ink shadow-[4px_4px_0_var(--ink)] transition-all [transition-duration:.18s] ease-snap hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[0_0_0_var(--ink)]"
        >
          ← Back to the case file
        </Link>
      </div>
    </>
  )
}
