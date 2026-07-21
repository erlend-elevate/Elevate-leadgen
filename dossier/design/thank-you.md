# THANK YOU — `/thank-you` · "Request Logged"

Post-submit confirmation. A short, high-craft page: the case file opens its first page. Also serves as the content spec for the **inline success state** on the home form (S8) — same copy, same components, compact layout.

**SEO** — Title: `Request received — Elevate Marketing` · `robots: noindex,nofollow` · no OG overrides needed (inherits site defaults). No JSON-LD beyond Organization.

**Global**: Navbar (light, CTA replaced by a quiet `Back to site` text link — the conversion already happened), Footer **without** top CTA zone (link grid only).

---

## S1 · Confirmation hero (paper, min-height ~72vh)

**Layout** — centred column (max 720px), generous top padding (180px). `hero-texture.png` NOT used here; instead a faint paper document stack behind the card (two offset DocCard silhouettes, 1px ink borders, rotated −2°/+1.5°, ink/5 fills) giving depth.
1. **Stamp first**: giant `REQUEST LOGGED` stamp (orange, Archivo Expanded, 1.6rem, double border, −8°) — thumps in immediately on load (0.38s thump, 0.15s delay) as the page's first beat. This is the emotional payoff of the entire site.
2. Case tag (mono, orange-aa): `FORM 06 — RECEIVED`
3. H1 (Fraunces 560, Display L, centred): `Your case file is *open.*`
4. **Case number** (mono 14px, hairline box, ink): `REF: GEO-26-0481` — characters type in (30ms/char) after the stamp settles. Generated client-side from submission timestamp (`GEO-{yy}-{mmss-based serial}`); if the user lands here directly without state, show `REF: GEO-26-____` and a quiet note `Reference appears after a completed request.`
5. Body (Body L, ink-soft, centred, max 52ch): `Check your inbox — confirmation is on its way. One of our examiners picks up your file within the hour, and your full report lands within 48 hours.`
6. Micro row (mono 11px, ink-soft): `SENT TO: {work email}` (echoed from form state if available) · `TIP: add hello@elevatemarketing.co.uk to your contacts so the report doesn't land in junk.`

**Animation**: stamp thump → case tag type-in → H1 mask-up (2 lines, stagger 0.09s) → ref types → body fades y 12px → background document silhouettes drift in (y 24px, opacity 0→1, 0.8s, stagger 0.2s, very subtle continuous parallax on mouse ≤4px, desktop only).
**Reduced motion**: everything static, fully rendered.

---

## S2 · What happens next (mini chain-of-custody, paper-2 band)

**Layout** — hairline-separated band, 3 steps in a row (stack on mobile), reusing home S6 step styling at smaller scale (numerals 2rem, H3 → Archivo 700 1.05rem). Connected by a short dashed line that draws on entry (scrub, 0.8s).
1. `WITHIN 1 HOUR` — **Examiner assigned** — `A real person reviews your submission and queues your query set.`
2. `WITHIN 48 HOURS` — **Report delivered** — `Visibility Score, competitor benchmark and your 90-day plan, as a plain-English PDF.`
3. `WHEN YOU'RE READY` — **30-minute walkthrough** — `A booking link arrives with the report. Take the call, or just keep the report.`
Steps activate sequentially on scroll (numeral ink/20→ink, 0.2s stagger).

---

## S3 · While you wait (cross-sell strip, paper)

**Layout** — single-row banner (1px ink border, paper): left mono `WHILE YOU WAIT — 12 MIN READ` · centre Fraunces italic 1.4rem: `See exactly what lands in your inbox in 48 hours.` · right Secondary button `Read the sample report ↗` (→ `/sample-report`) + beneath it a text link `Or back to the audit page ↩` (→ `/`).
**Animation**: banner wipes in clip-path L→R (0.6s wipe, trigger `top 80%`); button arrow nudges +4px on hover.
**Interactions**: banner hover — paper-2 fill sweeps.

---

## Responsive summary
- All sections stack <768; stamp scales to 1.1rem text; background silhouettes removed on small screens (perf + clutter); steps vertical with left rail.

## Assets used
`logo.svg` (nav) · `logo-inverse.svg` (footer) · `favicon.svg`. All other visuals are DOM (stamp, silhouettes, dashed rail).

## Inline variant note (home S8)
Same S1 content rendered inside the form DocCard after successful submit, minus background silhouettes; S2/S3 collapse into a single row of two text links (`What happens next ↓` → FAQ, `Read a sample report ↗`). Stamp scales to 1.2rem. Focus moves to the `REQUEST LOGGED` heading.
