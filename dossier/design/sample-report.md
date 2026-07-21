# SAMPLE REPORT — `/sample-report` · "Exhibit: The Audit, In Full"

The secondary-CTA destination and the site's expertise proof: a complete, anonymised GEO audit for a fictional MSP, **"COMPANY X Ltd"**. The page IS the product demo — a dossier document rendered as a web page. Everything a prospect gets is shown, so conversion copy can be soft here; the document sells.

**SEO** — Title: `Sample GEO Audit Report — What AI Says About You | Elevate Marketing` · Description: `A complete anonymised GEO audit: Visibility Score, platform-by-platform results across ChatGPT, Gemini, Perplexity, Copilot and AI Overviews, competitor benchmark and a 90-day action plan.` · `robots: index,follow` · OG image `/og-image.png` · Canonical `/sample-report`. No FAQ schema here.

**Global**: Navbar (light theme; CTA stays `Get My Free Audit`), Footer per design.md. Side rail replaced by the report's own TOC. Reading progress bar (2px teal) under navbar — page-specific.

---

## S1 · Report cover (paper, full-width)

**Layout** — the page opens like a physical case file: container becomes a "document" (paper card, 1px ink border, hard 8px offset shadow in ink/10) inset 24px from container edges, with a header folio strip. 12-col inside: left col 1–8 title stack; right col 9–12 cover meta block. `logo-mark.svg` at 28px in the folio strip, right-aligned mono `ELEVATE MARKETING — GEO UNIT`.
1. Folio strip (hairline box, mono 11px, split): left `GEO AUDIT REPORT` · centre `REF: GEO-26-0147` · right `PAGES 01–06`.
2. Case tag (orange-aa): `SAMPLE REPORT — ANONYMISED CLIENT DATA`
3. H1 (Fraunces 560, Display L): `What the AI says about *Company X Ltd.*` ("Company X Ltd" in italic; the "X" is a `<Redact mode="locked">` — an ink bar with mono 10px `ANONYMISED` beneath it).
4. Sub (Body L, ink-soft, max 60ch): `A managed IT service provider in Manchester. 34 staff, £4.1m turnover, strong Google rankings — and, as of this audit, effectively invisible to every major AI platform. This is the report they received, reproduced in full.`
5. Cover meta block (right, hairline table, mono 12px rows): `SUBJECT — COMPANY X LTD (MSP, MANCHESTER)` / `DATE — JANUARY 2026` / `EXAMINER — ELEVATE MARKETING, GEO UNIT` / `SCOPE — 52 QUERIES × 5 PLATFORMS` / `TURNAROUND — 41 HOURS`.
6. Stamp overlapping the meta block: `SAMPLE` (orange outline, −8°).
7. Teaser stat row at cover bottom (mono, hairline separated, 3 cells): `VISIBILITY SCORE — 23/100` · `COMPETITORS RECOMMENDED INSTEAD — 4` · `FACTUAL ERRORS FOUND — 7`.

**Animation**: document rises from below (y 60px, 0.7s snap) with shadow drawing in; folio strips type-in L→R (clip-path, 0.4s each, stagger 0.1s); H1 line masks (stagger 0.09s); stamp thumps after 0.6s; teaser stats' numbers count up on entry (0.9s). Reading progress bar starts filling from scroll.
**Interactions**: `<Redact locked>` bar shows `ANONYMISED — CLIENT DATA` tooltip on hover/focus. Teaser cells hover-highlight (paper-2 fill).
**Mobile**: meta block stacks under sub; teaser cells stack; stamp static.

---

## S2 · Sticky TOC (desktop ≥1024) + mobile jump bar

- **Desktop**: fixed left rail inside the document (180px col), sticky `top: 120px`. Mono links 11px uppercase: `01 Executive Summary` · `02 Platform Results` · `03 Competitor Benchmark` · `04 Key Findings` · `05 The 90-Day Plan` · `06 Your Next Step`. Active item: teal `▸` marker + ink→teal-aa text (ScrollTrigger scroll-spy per section, `rootMargin -40%`). Click = Lenis smooth scroll.
- **Mobile/tablet**: horizontal scrollable chip bar, sticky under navbar (paper-2, hairline bottom), same items as chips.
- Content column sits right of TOC (col 3–12 inside document).

---

## S3 · 01 — Executive Summary

**Layout** — 8/4 split: left verdict copy, right the **Visibility Score gauge**.
1. Section header: mono index `01` + H2 (Display L): `Executive summary`.
2. Verdict (Body L): `Company X ranks on page one of Google for "IT support Manchester". Google can see them. **The AIs cannot.** Across 52 buyer-style queries on five platforms, Company X was named in answers just **4 times** — and three of those four carried factual errors. Four competitors are being recommended in their place, in answers being read right now by the buyers Company X wants most.`
3. Pull-out (Fraunces italic Display M, orange-aa): `“Page one on Google. A footnote to the machines.”` — set as an examiner's note with a hairline and mono tag `EXAMINER'S NOTE`.
4. **Gauge** (right, sticky within section): semicircular SVG dial, 0–100. Track: hairline ink; zones: 0–40 `AT RISK` (orange), 40–70 `PARTIAL` (ink/40), 70–100 `RECOMMENDED` (teal). Needle + arc fill to **23**. Centre: `23` in Fraunces 560 3.5rem + mono `/100 VISIBILITY SCORE`. Below: mono caption `AGGREGATE ACROSS 5 PLATFORMS · 52 QUERIES`.
**Animation**: gauge arc + needle sweep 0→23 (1.4s power2.out, trigger `top 70%`), number counts in sync; zone labels fade in after settle (stagger 0.08s); verdict paragraphs mask-up per line (stagger 0.05s); pull-out slides from right 24px with hairline drawing (scaleX 0→1) first.
**Interactions**: hovering the gauge shows per-platform mini-scores tooltip row (5 dots + values): `ChatGPT 18 · Gemini 27 · Perplexity 31 · Copilot 19 · AIO 21`.
**Reduced motion**: static gauge at 23.

---

## S4 · 02 — Platform Results (the evidence table)

**Layout** — full content-width table styled as a ledger: hairline rows, mono header row (`PLATFORM / MENTIONED? / SENTIMENT / ACCURACY / SOURCES CITED`), 5 data rows + summary row. Status rendered as chips: teal outline chip `NAMED`, ink chip `ABSENT`, orange chip `ERROR FOUND`. "Sources cited" shows dot clusters (● = found, ○ = missing) with mono count.

| Platform | Mentioned? | Sentiment | Accuracy | Sources cited |
|---|---|---|---|---|
| ChatGPT | `ABSENT` (0/14 queries) | — | — | ●○○○○ 1/5 |
| Gemini | `NAMED ×2` | Neutral | `ERROR FOUND` — wrong founding year | ●●○○○ 2/5 |
| Perplexity | `NAMED ×2` | Neutral | Correct, thin | ●●●○○ 3/5 |
| Copilot | `ABSENT` (0/9 queries) | — | — | ●○○○○ 1/5 |
| Google AI Overviews | `ABSENT` (0/11 queries) | — | — | ●●○○○ 2/5 |
| **TOTAL** | **4/52 queries** | — | **3 errors in 4 mentions** | — |

Below table, margin note (mono, ink-soft): `Queries included: "best MSP Manchester", "IT support for law firms", "cyber essentials consultant near me"… full query log in appendix.`
**Animation**: rows wipe in sequentially (clip-path inset from left, 0.4s, stagger 0.12s, trigger `top 75%`); chips pop per row (scale 0.8→1 thump, 0.1s after row); dot clusters draw dot-by-dot (opacity, 0.06s stagger); TOTAL row flashes paper-2 bg once on land.
**Interactions**: row hover reveals an expandable detail drawer (accordion row): one example query + abbreviated answer excerpt in ConsoleCard styling, with the competitor mention highlighted teal and Company X's absence marked with a redaction bar (`peek` mode reveals the note `not mentioned — 3 competitors recommended instead`). Keyboard-expandable (`button` row header, aria-expanded).
**Mobile**: table becomes stacked cards per platform (chip row + 2-col mini-grid), drawer still expandable.

---

## S5 · 03 — Competitor Benchmark

**Layout** — same DOM bar-chart component as home S4, but fully "solved" (this is the payoff the home page withholds). Header: mono `03` + H2 `Who gets recommended instead`. Intro (Body): `When buyers asked the AIs who to shortlist, these four names came back — repeatedly, across platforms. Company X appeared once, misattributed to a brand name retired in 2022.`
Bars (mention share, teal fills for competitors on paper — use ink fills with teal values? **Decision**: competitor bars ink, Company X bar orange, matching home for continuity):
- `Northbeam IT` 78% · `Corelan Systems` 64% · `HexGuard Security` 51% · `BrightByte` 43% · `Company X` 4% (orange, with locked redaction over the "X").
Right of each bar, mono platform dots showing which platforms named them (●●●●○ style).
Below: two-column "why they're winning" analysis card (paper-2, hairline): left `WHAT THE WINNERS HAVE` — checklist mono with teal `▣`: `Cited in 3+ industry directories AI trusts` / `Recent, consistent reviews on 2 platforms` / `Machine-readable services page (schema)` / `A Wikipedia-adjacent footprint (Crunchbase, Companies House)`; right `WHAT COMPANY X HAS` — with orange `▨`: `Strong website, invisible sources` / `Reviews on one platform, 14 months old` / `No structured data` / `Footprint: none found`.
**Animation**: bars scrub-fill like home but **resolve fully** (Company X's 4% bar is already visible — the dossier has done its job); analysis cards slide up staggered (y 32px, 0.6s, stagger 0.15s); checklists tick in item-by-item on scroll (0.07s stagger).
**Interactions**: bar hover tooltip lists exact query examples they were named in (mono, max 3).

---

## S6 · 04 — Key Findings (severity cards)

**Layout** — header: mono `04` + H2 `Seven errors, four findings that matter`. Grid of 4 finding cards (2×2 lg, 1-col sm), each a DocCard variant: top row = severity stamp (`CRITICAL` orange / `HIGH` ink / `MEDIUM` teal-aa) + mono `FINDING 01`; title (H3); body; and a **quoted evidence line** in mono, partially redacted with `peek` Redact so the reader can lift the bar:
1. `CRITICAL` — **AI is quoting retired pricing.** `Perplexity and Gemini both cite a pricing page taken offline in 2023 — quoting figures 22% below current rates to every prospect who asks.` Evidence: `> “Company X's managed plans start at <redact peek>£29/user/mo</redact>…”` note `SOURCE: CACHED PAGE, REMOVED 2023`.
2. `CRITICAL` — **Misattributed brand.** `ChatGPT attributes Company X's flagship case study to a similarly named firm in Leeds. The answer names the wrong company with full confidence.` Evidence: `> “<redact peek>XServe Ltd</redact> delivered a 400-seat migration…”` note `WRONG COMPANY — SAME SECTOR, SAME CITY`.
3. `HIGH` — **Directory silence.** `The three directories ChatGPT cites most for "MSP Manchester" queries list all four competitors. Company X appears in none. This alone likely explains the ChatGPT absence.` Evidence: `SOURCES CHECKED: <redact peek>▓▓▓▓▓▓▓</redact> — 0/3 LISTINGS`.
4. `MEDIUM` — **No machine-readable identity.** `No Organization schema, no consistent NAP, no sameAs links. AI has to guess who Company X is — and guessing is where the errors come from.` Evidence: `SCHEMA DETECTED: NONE · NAP VARIANTS FOUND: 5`.

**Animation**: cards stagger up (y 40px, 0.7s snap, stagger 0.12s); severity stamps thump per card (0.1s after card); evidence lines type in (20ms/char) when card is ≥60% visible — once.
**Interactions**: `peek` redactions slide to 8% width on hover/focus (label `HOVER TO DECLASSIFY` in mono 9px on the bar); release restores. Cards lift on hover per DocCard.

---

## S7 · 05 — The 90-Day Plan

**Layout** — header: mono `05` + H2 `From invisible to recommended in 90 days`. Intro: `Every action prioritised by expected impact on mention share. No retainer required — Company X's team can execute in-house, or we can help.` Then three phase columns (stacked on mobile), each a ledger card: phase header band (`DAYS 0–30` etc., ink band, paper text, mono), rows = actions with two chips each: `IMPACT ▲▲▲` (orange/ink/teal dots) and `EFFORT ●` scale.
- **DAYS 0–30 — STOP THE BLEEDING**: `Correct retired pricing at the source + request re-crawl` (`IMPACT ▲▲▲`/`EFFORT ●`) · `Publish Organization schema + sameAs` (`▲▲▲`/`●`) · `Fix NAP across top 10 citations` (`▲▲`/`●●`).
- **DAYS 31–60 — GET LISTED WHERE AI LOOKS**: `Claim + complete the 3 directory listings` (`▲▲▲`/`●●`) · `Launch review programme (target 15 new reviews)` (`▲▲`/`●●●`) · `Refresh case studies with machine-readable summaries` (`▲▲`/`●●`).
- **DAYS 61–90 — EARN THE RECOMMENDATION**: `Publish comparison/alternatives content AI cites` (`▲▲▲`/`●●●`) · `Digital PR: 2 placements in sector press` (`▲▲`/`●●●`) · `Re-run audit — measure mention-share delta` (`▲`/`●`).
Footer of the section, mono note: `Projected outcome at day 90, based on comparable engagements: mention share 4% → 25–35%.`
**Animation**: three columns cascade (y 48px, stagger 0.15s); rows tick in on scroll per column (0.06s stagger); the phase header bands wipe L→R (clip-path, 0.5s wipe); projection note underlines itself (2px teal draw) on entry.
**Interactions**: row hover expands a one-line "how" note (max-height tween, e.g. `How: we provide the exact schema block to paste.`).

---

## S8 · 06 — Your Next Step (conversion close, navy band inside the document)

**Layout** — a navy ConsoleCard-style panel inset in the document (breaks the paper rhythm deliberately: the file closes, the interrogation room opens). Left: case tag teal `06 — YOUR NEXT STEP` + H2 (paper-on-navy): `This is Company X's file. *Yours takes 48 hours.*` + body (paper-on-navy/70): `Free, fixed scope, report yours to keep either way. If your Visibility Score is higher than 23, we'll tell you that too.` Right: score teaser — a small gauge outline with a `?` in Fraunces + mono `YOUR SCORE — UNKNOWN`. CTA row: Primary `Get My Free Audit →` (→ `/#form` anchor) + text link `Back to the audit page ↩` (→ `/`).
**Animation**: panel fades to navy via background-color tween on scroll entry (0.5s); headline masks; the `?` in the gauge pulses once (scale 1→1.15→1, thump); CTA rises y 16px.
**Mobile**: stacks; gauge teaser above CTAs.

---

## S9 · Footer

Standard footer (design.md §7.2) — top CTA zone suppressed here (S8 already closed the sale); footer starts directly at the link grid.

## Responsive summary

- <768: cover meta/teasers stack; TOC = chip bar; table → platform cards; benchmark bars full-width; findings 1-col; plan columns stack; S8 stacks.
- 768–1023: TOC chip bar; findings 2-col; gauge beside verdict kept if ≥820px else stacked.
- ≥1024: sticky TOC rail; full ledger table.

## Assets used

`logo.svg` (nav) · `logo-inverse.svg` (footer) · `logo-mark.svg` (cover folio) · `favicon.svg` · `og-image.png`. (Gauge, bars, chips, stamps are all DOM/SVG — no raster imagery on this page.)
