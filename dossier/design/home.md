# HOME — `/` · "The Visibility Dossier"

Campaign landing page. One continuous scroll narrative in five "exhibits", closing with the request form.
Global chrome (Navbar, Footer, grain, cursor, Lenis) per `design.md`. Side rail visible ≥1280px with markers: `OPENING` · `EXHIBIT A–E` · `FORM 06` · `CLOSING`.

**SEO** — Title: `Is Your IT Business Invisible to ChatGPT? | Free GEO Audit — Elevate Marketing` · Description: `50% of B2B buyers ask AI before they ask Google. Get a free 48-hour GEO audit: see if ChatGPT, Gemini and Perplexity know you exist — or send prospects to competitors.` · Canonical `/` · OG per design.md + FAQPage JSON-LD (copy in §12).

---

## S0 · Preloader — "Opening the file"

- **Layout**: fixed full-viewport `--paper` overlay, `z-index: 100`. Centre: mono boot log (14px, `--ink`), bottom-right: `logo-mark.svg` at 32px, opacity .5.
- **Sequence** (total ≤ 1.1s, then unmount):
  1. `ELEVATE MARKETING — GEO UNIT` types in (40ms/char)
  2. `OPENING CASE FILE Nº 001 …` types in
  3. `QUERYING 5 AI PLATFORMS ✓` — the `✓` stamps in teal
- **Exit**: overlay wipes up (`clip-path inset(0 0 100% 0)`, 0.45s, `wipe` ease) revealing hero; hero headline animation starts 0.1s after wipe begins.
- **Rules**: skipped entirely on repeat visits (sessionStorage) and for `prefers-reduced-motion` (content simply renders). No layout shift — hero is fully rendered beneath. `aria-hidden`.

---

## S1 · Hero — "The Interrogation" (paper)

**Layout** — 12-col grid, min-height 100vh, padding-top 160px. Left col 1–7: editorial stack. Right col 8–12: ConsoleCard (the Prompt Simulator), vertically centred, slight 2° rotation baseline at 0. Margin note in far-left gutter (≥xl): vertical mono `LONDON · MANCHESTER · BIRMINGHAM`.

**Elements & copy (left stack):**
1. Case tag: `CASE FILE Nº 001 — AI VISIBILITY ASSESSMENT` (mono, orange-aa).
2. **H1** (Fraunces 560, Display XL, ink):
   `Is Your IT Business` / `*Invisible* to ChatGPT?`
   — "Invisible" set in Fraunces italic and **born redacted**: covered by an ink redaction bar that wipes open during load (see Animation). The word carries a teal underline-swipe after reveal (2px, drawn L→R in 0.4s).
3. Sub (Body L, `--ink-soft`, max 56ch): `50% of B2B buyers ask AI before they ask Google. Get your free GEO audit and see if ChatGPT, Gemini and Perplexity know you exist — or if they're *sending your prospects to competitors.*` (final clause in Fraunces italic).
4. CTA row (24px gap): Primary L `Get My Free Audit →` · Text link `See a sample audit report ↗` (→ `/sample-report`).
5. Micro-proof row (mono 12px, ink-soft, separated by `·`): `48-HOUR TURNAROUND` · `NO CARD REQUIRED` · `UNSUBSCRIBE ANYTIME`.

**Prompt Simulator (right, ConsoleCard, interactive)** — chrome title `QUERY LOG — LIVE INTERROGATION`.
- Three question chips (mono 12px, 1px teal/40 border, teal text): `Best MSPs in Manchester?` · `Top cybersecurity firms for finance?` · `B2B SaaS onboarding tools?`
- On click: the question types into the console as a `> ` prompt, then the "AI answer" streams (typing recipe, design.md §6):
  - Answer lines mention 3 fictional competitors, e.g. chip 1: `1. Northbeam IT — 24/7 monitoring, strong reviews` / `2. Corelan Systems — enterprise focus` / `3. BrightByte — fast-growing, competitive pricing`
  - Final line renders in orange mono: `— 3 providers recommended. Your company: not mentioned.` with a small ink redaction bar over "not mentioned" that wipes open, and a mini stamp `NOT MENTIONED` (orange outline) thumps in at the console's corner.
- Footer of card: mono 11px, `--paper-on-navy`/60: `Simulated answer. Your audit runs 50+ real queries across 5 platforms.`
- Background: `hero-texture.png` at 40% opacity behind the console card only, `background-size: cover`.

**Animation (load, after preloader wipe):** case tag type-in (0.5s) → H1 line masks up (2 lines, stagger 0.09s, 0.9s snap) → "Invisible" redaction wipe (0.7s, origin right, +0.2s delay after line) → sub fades/slides 16px (0.6s) → CTAs stagger in (0.06s, y 12px) → ConsoleCard slides in from right 40px + rotate 1.5°→0 (0.8s snap) → first chip auto-pulses twice (subtle scale 1→1.04, teal border brighten) as an invitation. On scroll: whole hero has slight parallax — left stack moves at 0.9× scroll, console at 1.05× (yPercent ±6, scrub), disabled <lg.
**Interactions:** chips run the simulator (re-runnable; subsequent runs skip intro typing of the prompt); primary CTA smooth-scrolls to the form (S8, `#form`); sample-report link routes with page transition. Hovering the console lifts it −4px with hard navy shadow.
**Mobile**: stacks — headline → sub → CTAs → simulator (full width, chips wrap). H1 breaks: `Is Your IT` / `Business *Invisible*` / `to ChatGPT?`

---

## S2 · Ticker (navy, 56px)

- **Content**: `CHATGPT ✳ GEMINI ✳ PERPLEXITY ✳ COPILOT ✳ GOOGLE AI OVERVIEWS ✳ DO THEY KNOW YOU EXIST?` (mono 13px uppercase, `--paper-on-navy`; the question in teal).
- **Animation**: CSS marquee 28s linear infinite, duplicated track; pause on hover; static wrapped row for reduced motion. Strip slides up into place on scroll (y 100%→0, 0.5s snap, once).
- Serves as the light→dark hinge between hero and Exhibit A.

---

## S3 · EXHIBIT A — "The Shift" · pinned stat sequence (navy, 300vh pin)

**Layout** — full-viewport pinned stage. Top-left: case tag `EXHIBIT A — THE SHIFT` + mono subline `Evidence: three numbers your pipeline already feels`. Centre-left: giant stat zone; right third: metaphor panel; bottom: three mono index tabs `01 ZERO-CLICK` / `02 AI-FIRST BUYERS` / `03 ERROR RATE` showing progress (active tab teal, others 40%).

**The three stats (each "scene" = one third of the pin):**
1. `69%` (Fraunces 560, clamp 6–10rem, teal figure, paper-on-navy caption) — caption: `of searches now end without a click. AI answers the question directly — your website never gets the visit.`
   Metaphor panel: a mono search bar illustration (DOM) whose cursor blinks… and never clicks; a `0 CLICKS` counter ticks.
2. `50%` — caption: `of B2B buyers now start research in an AI chatbot, not a search engine. The shortlist is written before you know they exist.`
   Metaphor: a horizontal split-bar that fills to the 50% line in teal vs ink, labels `ASKS AI` / `ASKS GOOGLE`.
3. `14%` — caption: `of AI answers contain factual errors. If an AI describes your business at all, it may be describing it wrong.`
   Metaphor: a short "company description" paragraph in mono where words glitch/swap (e.g. `founded 2019`→`founded 2009`, `24/7 support`→`office hours`) with strikethroughs, ending with stamp `UNVERIFIED`.
- Closing beat (last 10% of pin): all three figures shrink to a summary line (mono): `FEWER CLICKS · AI-FIRST BUYERS · WRONG FACTS — and no one told you.` then the pin releases.

**Animation** — pin duration 300vh, scrub. Per scene: number counts 0→value (1.4s power2.out, tnum), caption lines mask-up (stagger 0.06s), metaphor animates on its own mini-timeline; outgoing scene slides left −60px + fades (0.4s), incoming from right. Index tabs fill a 2px teal progress underline synced to scrub. Scene transitions at 33%/66% of pin. On unpin, section slides away revealing paper (no gap).
**Reduced motion**: no pin — three stat blocks stack statically with final values and resolved metaphors.
**Interactions**: index tabs clickable (Lenis scrolls to that scene's scroll position).

---

## S4 · EXHIBIT B — "The Line-Up" · competitor benchmark (paper)

**Layout** — 12-col: header col 1–6, intro col 7–11; chart col 1–8; aside col 9–12 (margin-note style).
1. Case tag: `EXHIBIT B — THE LINE-UP`
2. H2 (Display L): `Who does the AI recommend *instead of you?*` (final clause italic).
3. Intro (Body L, ink-soft): `We ask ChatGPT, Gemini, Perplexity, Copilot and Google AI Overviews the questions your buyers ask — then we count the names. Here's a typical mention-share result for a Manchester MSP:`
4. **Mention-share chart** (DOM bars, not an image): 5 rows. Each row: company name (Archivo 700), horizontal track (1px ink border, paper-2 fill), fill bar in ink; value in mono right-aligned.
   - `Northbeam IT` — 78%
   - `Corelan Systems` — 64%
   - `HexGuard Security` — 51%
   - `BrightByte` — 43%
   - `YOUR COMPANY` — bar covered by a redaction bar labelled `█` that opens to reveal `4%` in orange-aa, with mono note `mentioned once, misattributed to a former brand name`.
   Platform ticks under the chart: mono 11px: `AGGREGATE OF 50 BUYER-STYLE QUERIES ACROSS 5 PLATFORMS — ILLUSTRATIVE SAMPLE`.
5. Aside (margin note, mono, ink-soft): `Most firms we audit assume they're "kind of visible". The count usually says otherwise.` + text link `See the full sample report ↗`.
6. Stamp overlapping chart top-right: `TYPICAL, NOT THEORETICAL` (ink outline).

**Animation**: bars scrub-fill `width 0→x%` (scrub 0.6, trigger `top 75%→bottom 45%`), stagger 0.12s; competitor fills are ink, and **as each bar lands its value counts up**. "YOUR COMPANY" row: redaction bar holds until the final 20% of the scrub, then wipes (0.7s wipe ease) revealing the 4% bar in `--orange` — the emotional gut-punch. Stamp thumps at chart completion. H2/case tag standard reveals.
**Interactions**: hovering a row highlights it (paper-2 bg) and shows a tooltip card: which platforms mentioned them (5 platform dots, teal = mentioned, ink/20 = not). Tooltip is `role="tooltip"`, also on focus. "YOUR COMPANY" row hover shows note `This is where the audit starts.`
**Mobile**: bars full-width, values above bars; aside moves under chart.

---

## S5 · EXHIBIT C — "What You Get" · three DocCards (paper, hairline-separated from S4)

**Layout** — header row (case tag `EXHIBIT C — THE DELIVERABLES` + H2 `Your audit, *in evidence.*` + intro right-aligned): intro (Body L): `A free, fixed-scope audit. Three documents, one picture: whether AI can see you, who it sees instead, and how to fix it.` Below: 3 DocCards in a row (lg), stacked with 16px overlap offsets (md/sm). Cards fan from a shared origin on scroll (desktop): initial rotate −3°/0°/+3°, y 60px, settle to 0° with stagger 0.12s (0.9s snap, trigger `top 70%`).

**Card 1** — header mono `FILE 01` + stamp `48H` (orange).
H3: `The 48-Hour Analysis`. Body: `We interrogate five AI platforms — ChatGPT, Gemini, Perplexity, Copilot and Google AI Overviews — with the questions your buyers actually ask. Every mention, omission and misstatement, documented.` Footer hairline + mono meta: `5 PLATFORMS · 50+ QUERIES · EVERY ANSWER LOGGED`.

**Card 2** — `FILE 02` + stamp `BENCHMARK` (ink).
H3: `The Competitor Benchmark`. Body: `See exactly who the AIs recommend instead of you, how often, and what they're doing that you're not. A ranked mention-share table — no guesswork.` Meta: `MENTION SHARE · SENTIMENT · SOURCE CITATIONS`.

**Card 3** — `FILE 03` + stamp `90 DAYS` (teal-aa).
H3: `The 90-Day Action Plan`. Body: `A prioritised roadmap from invisible to recommended: the citations to earn, the facts to correct, the content AI is actually looking for. Ordered by impact, written in plain English.` Meta: `PRIORITISED · PLAIN ENGLISH · NO RETAINER REQUIRED`.

**Below cards**: secondary CTA banner (1px ink border, paper-2): left mono `EXHIBIT C.1 — PROOF IT'S REAL` · centre: Fraunces italic `Read a complete anonymised audit before you commit two minutes.` · right: Secondary button `See a sample audit report ↗` → `/sample-report`.
**Animation**: fan-in above; stamps thump 0.15s after each card lands; banner wipes in (clip-path inset L→R, 0.6s). Card hover per DocCard spec (lift + corner deepen).
**Mobile**: cards stack full-width, no rotation; banner stacks.

---

## S6 · EXHIBIT D — "Chain of Custody" · process (paper-2)

**Layout** — header: case tag `EXHIBIT D — CHAIN OF CUSTODY` + H2 `From form to findings in *four steps.*` Below: horizontal 4-step track (lg) connected by a dashed 2px SVG path; vertical stack (md/sm) with the path running down the left edge. Each step: large mono numeral `01`–`04` (JetBrains Mono 700, 3rem, ink/20), title (H3), body (Body, ink-soft), mono time-chip (e.g. `2 MIN`).

**Steps & copy:**
1. `Submit your details` — `Two minutes. Name, work email, website — and one competitor, if you like. That's all we need to open the file.` chip `2 MIN`
2. `We run the audit` — `Within 48 hours your business has been put through 50+ buyer-style queries across five AI platforms. Every answer logged.` chip `48 HOURS`
3. `Receive your report` — `A plain-English PDF: your Visibility Score, the benchmark, and the 90-day plan. Yours to keep, whatever happens next.` chip `YOURS TO KEEP`
4. `Book your walkthrough` — `A free 30-minute call. We walk you through the findings and answer anything. No obligation, no hard sell.` chip `30 MIN · FREE`

**Animation**: dashed path draws with scroll (`stroke-dashoffset`, scrub `top 70%→bottom 55%`); each step activates as the line reaches it — numeral flips ink/20→ink, title mask-up, time-chip pops (scale 0.8→1, thump), 0.15s stagger between elements. H2 standard reveal.
**Interactions**: hovering a step highlights its segment of the path (dash turns teal, animated march) — pure CSS on `:hover`/`focus-within`.
**Mobile**: vertical rail, path draws top→bottom; steps slide in from left 24px, stagger 0.1s.

---

## S7 · EXHIBIT E — "Field Reports" · social proof (navy)

**Layout** — header row: case tag `EXHIBIT E — FIELD REPORTS` (teal) + H2 (paper-on-navy): `Audited. Benchmarked. *Quoted by the machines.*` Right: credibility numbers strip (3 items, mono): `140+ AUDITS DELIVERED` · `5 AI PLATFORMS TRACKED` · `3× AVG. MENTION LIFT — 90 DAYS*` with footnote `*for clients who implement the plan` (10px, paper-on-navy/50).
Below: 3 testimonial cards (navy-deep panels, 1px `--line-navy`, folded corner in teal). Each: quote (Fraunces italic, Display M scaled down to 1.35rem, paper-on-navy), hairline, attribution row: **monogram tile** (44px square, teal border, Fraunces initials, teal) + name (Archivo 700) + role · sector · city (mono 11px, teal/70).

**Testimonials:**
1. `“We'd spent six figures on SEO. The audit showed Perplexity had never once named us. Ninety days later, we're in three of the five answers that matter.”` — **Sarah Whitmore**, Marketing Director · B2B SaaS · London. Tile `SW`.
2. `“The competitor benchmark alone was worth it — and it was free. Seeing exactly who ChatGPT recommends instead of us was… uncomfortable. Useful, though.”` — **James Okafor**, CEO · Managed IT Services · Manchester. Tile `JO`.
3. `“The report found AI quoting pricing we retired in 2023. We'd never have caught that ourselves.”` — **Priya Shah**, IT Director · Cybersecurity · Birmingham. Tile `PS`.

**Animation**: numbers strip counters roll up (140/5/3×, 1.2s power2.out, trigger `top 75%`, stagger 0.15s); testimonial cards slide up staggered (y 48px, 0.8s snap, stagger 0.12s); quotes' opening quotation mark (Fraunces 6rem, teal/30) parallaxes −10% on scrub. Hover: card border brightens to teal/60, monogram tile fills teal → ink text (0.25s).
**Trust microcopy** (mono 11px, centred, paper-on-navy/50, below cards): `Testimonials from audit clients; names shared with permission. Reports anonymised by default — see our Privacy Policy.`
**Mobile**: numbers strip wraps 2+1; cards stack.

---

## S8 · Section divider + FORM 06 — "Request for Assessment" (paper)

**Layout** — 12-col: left col 1–5 is the persuasion panel; right col 6–12 is the form document.
**Left panel**: case tag `FORM 06 — REQUEST FOR ASSESSMENT` · H2 (Display L): `Open your *case file.*` · Body L: `Free. 48-hour turnaround. Fixed scope. If we're not the right people to fix what we find, we'll say so.` · checklist (mono 13px, each with teal `▣`): `Visibility Score across 5 AI platforms` / `Competitor mention-share table` / `90-day prioritised action plan` / `Free 30-minute walkthrough call` · stamp `FREE — NO CARD REQUIRED` (orange, rotate −8°) overlapping the panel bottom.
**Right: the form (DocCard, paper, ink border, header bar `FORM 06 — GEO AUDIT REQUEST` + mono serial field pre-printed `REF: GEO-26-____`).**
Fields (per §7.8), in order:
1. `FIRST NAME *` — text input, autocomplete given-name
2. `WORK EMAIL *` — email input; mono hint on focus: `We only ever use your work address.`
3. `COMPANY *` — text
4. `WEBSITE URL *` — url input, prefix mono `https://` shown inside field; hint: `Where AI should be finding you.`
5. `INDUSTRY *` — select: `Managed IT Services (MSP)` / `B2B SaaS` / `Cybersecurity` / `Other`
6. `MAIN COMPETITOR` (optional, tag `OPTIONAL` mono chip) — text; hint: `Who do you lose deals to? We'll check their visibility too.`
7. Consent checkbox: `I agree to Elevate Marketing processing my details to deliver the audit. We never share your data. Unsubscribe anytime.` (links: `Privacy Policy` → `/privacy-policy`)
Submit: Primary L full-width: `Get My Free Audit →`. Under it, mono 11px centred: `We never share your data. Unsubscribe anytime.`

**Validation** (client-side, inline): required, email pattern, URL pattern; errors per design.md (orange-aa border + `▲` mono message, `role="alert"`, focus moves to first error).
**Submit flow**: loading (`FILING REQUEST…` + animated dots, 600–900ms) → **inline success state**: form fields collapse (height tween 0.4s), replaced by success panel: giant stamp `REQUEST LOGGED` thumps in (rotate −8°), case number `REF: GEO-26-0481` (generated from timestamp) types in mono, confirmation copy: `Check your inbox — confirmation is on its way. Your report lands within 48 hours.` + two text links: `While you wait: read a sample report ↗` and `What happens next ↓` (scrolls to FAQ). Focus moves to success heading (`tabindex=-1`). Also fires `data-event="form_submit"` and routes to `/thank-you` **only if** the implementation prefers a dedicated route for email-tracking — default spec is inline state with the same content (the `/thank-you` page exists as shareable/standalone variant).
**Animation**: left checklist items stagger in (x −20px, 0.5s, stagger 0.08s) each tick `▣` filling teal as it lands; form DocCard rises y 40px (0.8s snap); stamp thumps at `top 70%`.
**Mobile**: persuasion panel stacks above form; stamp static (no overlap); submit sticky-bottom within viewport until scrolled past (position: sticky, bottom 16px, only while form in view).

---

## S9 · FAQ — "Cross-Examination" (paper-2)

**Layout** — 12-col: left col 1–4 sticky header (case tag `FILE 07 — CROSS-EXAMINATION` + H2 `Straight answers, *on the record.*` + margin note: `Anything else? hello@elevatemarketing.co.uk`); right col 5–12: accordion of 5 items. Each item: header row = mono index `Q.01` + question (Archivo 700, 1.15rem) + plus/minus glyph; answer (Body, ink-soft, Fraunces-italic key phrases) over a hairline.

**Q&A copy (verbatim — also feeds FAQPage JSON-LD):**
1. **What is GEO?** — `Generative Engine Optimisation. SEO gets you ranked on Google; GEO gets you named, described correctly and recommended inside AI answers — ChatGPT, Gemini, Perplexity, Copilot and Google's AI Overviews. As buyers move from search results to AI answers, that's where visibility has to be earned.`
2. **How is this different from SEO?** — `SEO optimises for a ranked list of links. GEO optimises for the answer itself: the sources AI cites, the facts it repeats, the competitors it names. Different inputs, different levers — and right now, far less competition for them.`
3. **Do I need to change my website?** — `Usually less than you'd think. Many of the highest-impact fixes are off-site: citations, directories and the sources AI already trusts. Your audit tells you exactly which lever to pull first.`
4. **How long does the audit take?** — `48 hours from submission to report in your inbox. The walkthrough call is 30 minutes, whenever suits you.`
5. **Is this really free?** — `Yes — no card, no catch. We run free audits because roughly one in three turns into a client engagement. If yours doesn't, you still keep the report.`

**Animation**: header sticky (top 120px) on lg; accordion items fade/slide up staggered (y 24px, 0.5s, stagger 0.08s, trigger `top 78%`); open/close per Accordion spec (height tween 0.35s snap, glyph rotate 45°). First item auto-opens when section enters viewport (0.4s delay) as an invitation.
**Interactions**: one item open at a time; full keyboard support; `Q.0n` index turns teal when open.

---

## S10 · Final CTA — "Closing Statement" (navy, full-bleed)

**Layout** — centred stack, generous 160px vertical padding; `hero-texture.png` background at 50% opacity + console vignette; grain screen-blended.
1. Case tag (teal): `CLOSING STATEMENT`
2. Display XL, centred, paper-on-navy (Fraunces, line-broken):
   `Half your buyers already asked.` / `*What did the AI say about you?*` (second line italic, teal).
3. Sub (Body L, paper-on-navy/70, centred, max 48ch): `Find out in 48 hours. Free audit, fixed scope, report yours to keep.`
4. Primary L button `Get My Free Audit →` (orange, ink plate shadow — on navy the plate is `--teal` at 40%).
5. Mono micro (paper-on-navy/50): `TAKES 2 MINUTES · NO CARD · UNSUBSCRIBE ANYTIME`.

**Animation**: background rings drift slowly (background-position 20s loop, or very subtle scale 1→1.04 scrub) — the only ambient motion on the page; headline lines mask-up with 0.12s stagger; button rises y 20px + a one-time teal pulse ring (box-shadow 0 0 0 0 → 0 0 0 14px transparent, 1.2s) to draw the eye; stamp `FREE` thumps next to button on lg.
**Interactions**: button smooth-scrolls to S8 form (or focuses first name field after scroll). 

---

## S11 · Footer

Per `design.md` §7.2. Home instance includes the top CTA zone. Tagline: *"Be the answer, not the omission."*

---

## S12 · FAQPage JSON-LD (embed verbatim, home `<head>`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is GEO?", "acceptedAnswer": { "@type": "Answer", "text": "Generative Engine Optimisation. SEO gets you ranked on Google; GEO gets you named, described correctly and recommended inside AI answers — ChatGPT, Gemini, Perplexity, Copilot and Google's AI Overviews. As buyers move from search results to AI answers, that's where visibility has to be earned." } },
    { "@type": "Question", "name": "How is this different from SEO?", "acceptedAnswer": { "@type": "Answer", "text": "SEO optimises for a ranked list of links. GEO optimises for the answer itself: the sources AI cites, the facts it repeats, the competitors it names. Different inputs, different levers — and right now, far less competition for them." } },
    { "@type": "Question", "name": "Do I need to change my website?", "acceptedAnswer": { "@type": "Answer", "text": "Usually less than you'd think. Many of the highest-impact fixes are off-site: citations, directories and the sources AI already trusts. Your audit tells you exactly which lever to pull first." } },
    { "@type": "Question", "name": "How long does the audit take?", "acceptedAnswer": { "@type": "Answer", "text": "48 hours from submission to report in your inbox. The walkthrough call is 30 minutes, whenever suits you." } },
    { "@type": "Question", "name": "Is this really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — no card, no catch. We run free audits because roughly one in three turns into a client engagement. If yours doesn't, you still keep the report." } }
  ]
}
```

---

## Responsive summary (home)

| Breakpoint | Key changes |
|---|---|
| <768 | Hero stacks (headline→CTAs→simulator); stats pin becomes stacked static scenes (keep count-up on view); benchmark bars full-width; DocCards stack, no fan; process vertical rail; form sticky submit; FAQ header not sticky; final CTA text `clamp` handles scale; side rail hidden |
| 768–1023 | Hero 2-col collapses at 820px→ stacked; testimonials 1-col; deliverable cards 3→1 col; process 2×2 grid without connecting path |
| ≥1024 | Full spec; side rail ≥1280; margin notes ≥1280 only |

## Assets used (from design.md §11)

`logo.svg` + `logo-inverse.svg` (nav on paper/navy, menu overlay) · `logo-mark.svg` (preloader) · `hero-texture.png` (S1 console bg, S10 bg) · `favicon.svg` · `og-image.png` · `logo-inverse.svg` (footer).
