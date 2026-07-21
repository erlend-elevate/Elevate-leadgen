# PRIVACY POLICY — `/privacy-policy` · "File: Your Data"

A legal page that keeps the dossier voice without playing games with legal clarity. Single-column document, fully readable, no dark patterns. Content in initial render (no JS-gated text).

**SEO** — Title: `Privacy Policy — Elevate Marketing` · Description: `How Elevate Marketing collects, uses and protects your personal data when you request a GEO audit. UK GDPR compliant.` · `robots: index,follow` · Canonical `/privacy-policy`.

**Global**: Navbar (light; CTA `Get My Free Audit` → `/#form`), Footer link grid (no top CTA zone — utility page).

---

## S1 · Document header (paper)

**Layout** — centred column max 760px, top padding 160px. The whole page renders inside a document card (paper, 1px ink border, hard 8px offset shadow ink/10) like the sample report cover — legal pages are "files" too.
1. Folio strip (mono 11px, hairline box, split): `FILE — PRIVACY NOTICE` · `DOC: EM-PP-2026` · `VERSION 2.0`.
2. Case tag (orange-aa): `FILE — YOUR DATA`
3. H1 (Fraunces 560, Display L): `Privacy Policy`.
4. Meta row (mono 12px, ink-soft): `LAST UPDATED: 6 JANUARY 2026` · `CONTROLLER: ELEVATE MARKETING LTD` · `QUESTIONS: hello@elevatemarketing.co.uk`.
5. Plain-English preface (Body L, in a paper-2 callout with orange 2px left border): `The short version: we collect only what we need to run your audit, we never sell or share it, you can unsubscribe or have it deleted at any time, and we'll show you exactly what's held if you ask. The full legal version follows.`

**Animation**: document rises y 40px (0.7s snap); folio strip wipes L→R (0.4s); H1 mask-up; preface callout slides from left 16px (0.5s, 0.3s delay). No pinned/scroll effects on legal pages — calm, respectful motion only.

---

## S2 · Clauses (numbered, single column)

**Format per clause**: mono clause number (`§ 1`, orange-aa, left gutter at lg), H3 title (Archivo 700), body (Body, ink-soft, max 68ch), hairline between clauses. Sub-points as lettered mono lists (`a.` `b.` `c.`). Sticky mini-TOC on xl only (right gutter, mono 10px links: `§1 Who we are … §9 Contact`, scroll-spy like sample report).

**Content (final copy):**

**§ 1 · Who we are.** `Elevate Marketing Ltd ("we", "us") is the data controller for personal data collected through elevatemarketing.co.uk. Registered in England & Wales. Contact: hello@elevatemarketing.co.uk.`

**§ 2 · What we collect.** `When you request a GEO audit: first name, work email, company name, website URL, industry, and (optionally) a competitor's name. When you browse: standard server logs and, with your consent, anonymised analytics (see § 7). We do not collect special-category data, and we do not want any — please don't send it.`

**§ 3 · Why we collect it (lawful bases).** `a. To deliver your audit and report (performance of a contract / steps before one). b. To send your report, walkthrough link and related follow-ups (legitimate interest — you asked us to). c. To send occasional marketing email (consent — you can withdraw it in one click). d. To keep our site secure and measure performance (legitimate interest).`

**§ 4 · What we never do.** `We never sell your data. We never share it with third parties for their marketing. We never add you to lists you didn't ask for. Competitor names you submit are used solely to run comparative visibility queries.`

**§ 5 · Who processes it.** `Hosting and email delivery via GDPR-compliant processors under data-processing agreements (cloud hosting within the UK/EEA; transactional email provider). Audit queries are run against public AI platforms; no personal data is included in those queries beyond published business details.`

**§ 6 · Retention.** `Audit requests and reports: 24 months, then deleted or fully anonymised. Marketing consents: until withdrawn. Server logs: 90 days.`

**§ 7 · Cookies & analytics.** `The site works without any non-essential cookies. Analytics (privacy-respecting, cookieless where possible) loads only after you accept via the banner. No advertising trackers, no fingerprinting.`

**§ 8 · Your rights (UK GDPR).** `Access, rectification, erasure, restriction, portability, objection — and withdrawal of consent at any time. Email hello@elevatemarketing.co.uk and we respond within 30 days. You can also complain to the ICO (ico.org.uk), though we'd welcome the chance to fix things first.`

**§ 9 · Changes & contact.** `Material changes are posted here with a new version number and date. Questions, requests, complaints: hello@elevatemarketing.co.uk — Elevate Marketing Ltd, London.`

**Animation**: clauses reveal per viewport entry — clause number wipes in (clip-path L→R 0.3s), title+body rise y 16px (0.5s snap), staggered per clause but **only once and fast**; reading a legal doc must never feel gated. Mini-TOC active-state scroll-spy.
**Interactions**: TOC links smooth-scroll; clause `§ n` hover shows a link-anchor `#` for deep-linking (each clause has an id, e.g. `#clause-8`).

---

## S3 · Closing strip

Hairline, then a centred mono line: `END OF FILE — EM-PP-2026` + text link `Back to the audit ↩` (→ `/`) and `Terms of Service →` (→ `/terms`). Simple fade-up on entry.

## Responsive summary
- <1280: no mini-TOC; clause numbers move inline above titles. <768: folio strip stacks into two lines; document card padding 24px→16px; shadow 4px.

## Assets used
`logo.svg` (nav) · `logo-inverse.svg` (footer) · `favicon.svg`. No imagery — pure typographic document.
