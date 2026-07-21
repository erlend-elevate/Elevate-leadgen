import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { consumePendingAnchor, scrollToTarget } from '@/lib/lenis'
import Preloader from './home/Preloader'
import Hero from './home/Hero'
import Ticker from './home/Ticker'
import ExhibitA from './home/ExhibitA'
import ExhibitB from './home/ExhibitB'
import ExhibitC from './home/ExhibitC'
import ExhibitD from './home/ExhibitD'
import ExhibitE from './home/ExhibitE'
import AuditForm from './home/AuditForm'
import Faq from './home/Faq'
import FinalCta from './home/FinalCta'
import SideRail from './home/SideRail'

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is GEO?', acceptedAnswer: { '@type': 'Answer', text: "Generative Engine Optimisation. SEO gets you ranked on Google; GEO gets you named, described correctly and recommended inside AI answers — ChatGPT, Gemini, Perplexity, Copilot and Google's AI Overviews. As buyers move from search results to AI answers, that's where visibility has to be earned." } },
    { '@type': 'Question', name: 'How is this different from SEO?', acceptedAnswer: { '@type': 'Answer', text: 'SEO optimises for a ranked list of links. GEO optimises for the answer itself: the sources AI cites, the facts it repeats, the competitors it names. Different inputs, different levers — and right now, far less competition for them.' } },
    { '@type': 'Question', name: 'Do I need to change my website?', acceptedAnswer: { '@type': 'Answer', text: "Usually less than you'd think. Many of the highest-impact fixes are off-site: citations, directories and the sources AI already trusts. Your audit tells you exactly which lever to pull first." } },
    { '@type': 'Question', name: 'How long does the audit take?', acceptedAnswer: { '@type': 'Answer', text: '48 hours from submission to report in your inbox. The walkthrough call is 30 minutes, whenever suits you.' } },
    { '@type': 'Question', name: 'Is this really free?', acceptedAnswer: { '@type': 'Answer', text: "Yes — no card, no catch. We run free audits because roughly one in three turns into a client engagement. If yours doesn't, you still keep the report." } },
  ],
}

/** Folio mark: 1px rule with a centred mono § case-number (design.md §5). */
function Folio({ mark }: { mark: string }) {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center bg-paper">
      <span className="h-px w-full bg-line-paper" />
      <span className="absolute bg-paper px-4 font-mono text-[11px] tracking-[0.22em] text-ink-soft/70">{mark}</span>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    // Cross-page anchor handoff from Navbar (e.g. /sample-report → /#faq)
    const pending = consumePendingAnchor()
    if (pending) {
      const t = window.setTimeout(() => scrollToTarget(pending), 450)
      return () => window.clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Is Your IT Business Invisible to ChatGPT? | Free GEO Audit — Elevate Marketing</title>
        <meta
          name="description"
          content="50% of B2B buyers ask AI before they ask Google. Get a free 48-hour GEO audit: see if ChatGPT, Gemini and Perplexity know you exist — or send prospects to competitors."
        />
        <link rel="canonical" href="https://elevatemarketing.co.uk/" />
        <meta property="og:title" content="Is Your IT Business Invisible to ChatGPT? | Free GEO Audit — Elevate Marketing" />
        <meta
          property="og:description"
          content="50% of B2B buyers ask AI before they ask Google. Get a free 48-hour GEO audit: see if ChatGPT, Gemini and Perplexity know you exist — or send prospects to competitors."
        />
        <meta property="og:url" content="https://elevatemarketing.co.uk/" />
        <script type="application/ld+json">{JSON.stringify(FAQ_LD)}</script>
      </Helmet>

      <Preloader />
      <SideRail />
      <Hero />
      <Ticker />
      <ExhibitA />
      <ExhibitB />
      <Folio mark="§ FILE 02" />
      <ExhibitC />
      <Folio mark="§ FILE 03" />
      <ExhibitD />
      <ExhibitE />
      <Folio mark="§ FILE 05" />
      <AuditForm />
      <Faq />
      <FinalCta />
    </>
  )
}
