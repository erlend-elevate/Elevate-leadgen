# DESIGN.md — Elevate Marketing · "The Visibility Dossier"

Global design system for the v2 campaign site: **Free AI Visibility (GEO) Audit** for UK IT companies.
Stack: React 19 + TS · Vite · Tailwind v3.4 · shadcn/ui · GSAP + ScrollTrigger · Framer Motion · Lenis · Google Fonts.

---

## 1. Concept & Art Direction

### The idea: **The Visibility Dossier**

Every AI chatbot is a witness. Your buyers are asking them questions — "Who are the best MSPs in Manchester?" — and the answers are written down somewhere you can't see. This site is the **case file that makes the invisible visible**.

The entire site is art-directed as a **forensic evidence dossier**: warm paper documents, case numbers, redacted text that wipes open, rubber stamps, mono-spaced examiner's notes in the margins — colliding with **deep-navy "interrogation room" console panels** where AI answers are typed out live. It looks like The Economist's infographics department built a crime board. It does NOT look like a SaaS template: no purple gradients, no glassmorphism, no floating blobs, no stock 3D robots, no generic rounded-card grid.

### Signature metaphor system (use consistently, never decoratively-random)

| Motif | Meaning | Usage |
|---|---|---|
| **Redaction bar** (ink rectangle over text) | What the AI *isn't saying about you* | Wipes open on scroll (scaleX 1→0); hover lets user "peek" under a bar |
| **Rubber stamp** (rotated, bordered, uppercase) | Verdicts & proof: "48H TURNAROUND", "FREE", "REQUEST LOGGED" | Thumps in on scroll entry (scale 1.7→1 + rotation settle) |
| **Case tags** (`EXHIBIT A —`, `FILE 06 —`) | Section numbering, dossier structure | Mono eyebrow above every H2 |
| **Console panel** (navy, typed text, blinking caret) | The AI being interrogated | Hero simulator, stat backdrops, sample-report findings |
| **Hairline rules + margin notes** | Examiner's annotations | 1px rules; small mono asides set in the layout gutters |
| **Folded-corner document cards** | Evidence documents | "What you get" cards, sample report modules |

### Anti-slop rules (hard constraints for implementation)

1. **No gradients-as-decoration** except the single navy console vignette and the sanctioned orange CTA hover sweep. Colour comes from flat paper/ink/navy fields.
2. **No generic icon set everywhere.** Only hand-specified glyphs: bolt, arrow `→`, caret `▍`, asterisk `*`, checkbox squares, plus/minus for accordion. Mono text labels replace iconography wherever possible.
3. **No stock photography, no generated faces.** Testimonials use typographic monogram tiles.
4. **Every animation must carry meaning** (a wipe = censorship lifted; a counter = evidence counted; a drawn line = chain of custody). No floaty "everything fades up" defaults.
5. **Paper texture is real**: grain overlay + deckled hairlines, not a flat `#fff`.

---

## 2. Colour System

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F2EEE5` | Primary light background (warm dossier paper) |
| `--paper-2` | `#E8E2D2` | Alt light sections, card fills, form field bg |
| `--ink` | `#1A1A2E` | Primary text on paper, redaction bars, footer ink panels |
| `--ink-soft` | `#4A4A5E` | Secondary text on paper (AA 8.6:1) |
| `--navy` | `#0A2540` | Console/dark sections, footer |
| `--navy-deep` | `#051729` | Console vignette end, deep panels |
| `--teal` | `#00D4AA` | "AI signal" accent — on navy/ink only. Carets, verdicts, chart highlights, focus rings on dark |
| `--teal-aa` | `#0B6B57` | Teal for *text on paper* (AA ≥4.5:1) |
| `--orange` | `#FF6B35` | CTA fills, stamps, urgency accents. **Text on orange is always `--ink`** |
| `--orange-aa` | `#B43E18` | Orange for *text/small elements on paper* (AA) |
| `--paper-on-navy` | `#EDEAE0` | Primary text on navy (13.9:1) |
| `--line-paper` | `rgba(26,26,46,.16)` | Hairlines on paper |
| `--line-navy` | `rgba(237,234,224,.14)` | Hairlines on navy |

### Contrast pairings (pre-approved, WCAG AA)

- `--ink` on `--paper` (14.8:1) — body text
- `--ink-soft` on `--paper` (8.6:1) — secondary text
- `--orange-aa` `#B43E18` on `--paper` (≈5.0:1) — small orange labels on light
- `--ink` on `--orange` (≈5.7:1) — CTA button text
- `--teal` on `--navy` (≈7.9:1) — accent text on dark
- `--paper-on-navy` on `--navy` (13.9:1) — body text on dark
- ⚠️ Never: white text on orange, teal `#00D4AA` text on paper, orange text on navy.

### Surface rhythm (the page's light/dark score)

Home alternates deliberately: **paper** hero → **navy** ticker+stats → **paper** benchmark+deliverables → **paper-2** process → **navy** testimonials → **paper** form → **paper-2** FAQ → **navy** final CTA + footer. Dark sections are the "interrogation room"; light sections are the "case file". Never place two navy sections adjacently.

---

## 3. Typography

### Fonts (Google Fonts, `display=swap`)

1. **Fraunces** — display serif. `ital,opsz,wght @ 0,9..144,300..900; 1,9..144,300..900`. The voice of the dossier: headlines, pull quotes, big numbers. Use optical size 144 for display, `SOFT 0 / WONK 1` if axes available. Feels editorial, British, authoritative — zero SaaS cliché.
2. **Archivo** — UI/body grotesque. `wght 400..800` (+ width axis 62..125 if available; use **Archivo Expanded 700** for stamps/eyebrows). Body copy, buttons, nav, tables.
3. **JetBrains Mono** — examiner's hand. `400,500,700`. Case tags, labels, form microcopy, terminal text, data, margin notes, footers.

### Type scale (fluid, `clamp()`; container 1200px)

| Style | Font / weight | Size | LH | Tracking | Notes |
|---|---|---|---|---|---|
| Display XL | Fraunces 560 | `clamp(3rem, 8vw, 6.5rem)` | 0.98 | −0.025em | Hero H1, final CTA |
| Display L | Fraunces 560 | `clamp(2.4rem, 5.4vw, 4.25rem)` | 1.0 | −0.02em | Section H2s |
| Display M | Fraunces 500 italic | `clamp(1.6rem, 3vw, 2.4rem)` | 1.1 | −0.01em | Pull quotes, verdict lines |
| H3 | Archivo 700 | `clamp(1.25rem, 2vw, 1.6rem)` | 1.2 | −0.01em | Card titles |
| Body L | Archivo 450 | `1.125rem` | 1.65 | 0 | Section intros (max 62ch) |
| Body | Archivo 400 | `1rem` | 1.65 | 0 | Default |
| Case tag / eyebrow | JetBrains Mono 500 | `0.75rem` | 1.4 | +0.22em | UPPERCASE, e.g. `EXHIBIT A — THE SHIFT` |
| Stamp | Archivo Expanded 700 | `0.8–1rem` | 1 | +0.14em | UPPERCASE, inside 2px border |
| Data / terminal | JetBrains Mono 400–700 | `0.85–1rem` | 1.55 | 0 | Console, tables, stats labels |
| Margin note | JetBrains Mono 400 | `0.72rem` | 1.5 | +0.04em | Gutters, asides; `--ink-soft` |

### Typographic signatures

- **Headline masks**: every Display headline reveals by lines sliding up out of `overflow:hidden` masks (y 110%→0).
- **Italic Fraunces interjections**: inside sans body copy, key phrases ("sending your prospects to competitors") flip to Fraunces italic — the dossier "quoting the evidence".
- **Tabular numbers**: all stats/counters use `font-feature-settings: "tnum"` (JetBrains Mono or Archivo with tnum).
- **Widow control**: headlines get manual `<br>` spec per breakpoint in page docs.

---

## 4. Layout, Grid & Spacing

- **Container**: max `1200px`, gutters `24px` (mobile) → `48px` (≥1024px).
- **Grid**: 12-col desktop / 8-col tablet / 4-col mobile. Asymmetric editorial compositions preferred (7/5, 8/4 splits; margin notes live in the outer gutter columns).
- **Spacing scale**: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`. Section padding: `96px` mobile / `144–160px` desktop vertical. Tighten to `72px` for ticker strips.
- **Breakpoints**: `sm 375 · md 768 · lg 1024 · xl 1280 · 2xl 1440`.
- **Side rail** (≥1280px only): fixed left rail, 48px wide, shows current `EXHIBIT` marker + thin progress line (ScrollTrigger). Hidden below xl and on utility pages.

---

## 5. Texture & Atmosphere

1. **Grain**: fixed full-viewport SVG `feTurbulence` (baseFrequency 0.8, 3–4% opacity, `mix-blend-mode: multiply` on paper / `screen` on navy), `pointer-events:none`, `z-index: 60`. Static (no jitter animation) for perf; pure CSS/SVG, no image asset.
2. **Console vignette**: navy sections use radial gradient `navy → navy-deep` + faint blueprint grid (`repeating-linear-gradient` 1px lines at 48px pitch, 4% opacity teal).
3. **Paper hairlines**: sections divided by 1px `--line-paper` rules with a mono `§` or case-number centered in the gap — like a document folio mark.
4. **Deckle edge** (subtle): top edge of navy sections gets a 2px torn-paper style mask? — NO; keep edges crisp. (Crispness = dossier, torn = craft fair.)

---

## 6. Motion System

### Tooling
- **Lenis** smooth scroll (`lerp 0.11`, sync with ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`).
- **GSAP + ScrollTrigger** for pins, scrubs, wipes, counters.
- **Framer Motion** for hover/tap micro-interactions, accordion, menu overlay, form state transitions.
- **SplitText-style** line/word splitting (implement with a small custom splitter if the Club plugin is unavailable — wrap words in `span.mask > span.inner`).

### Signature easings
- `snap`: `cubic-bezier(.22,.9,.24,1)` — reveals, slides (default)
- `thump`: `cubic-bezier(.34,1.56,.64,1)` — stamps settling, 0.38s
- `wipe`: `cubic-bezier(.77,0,.18,1)` — redaction bars, section transitions
- Counters: `power2.out`, snap to integer.

### Reusable animation recipes (concrete params)
- **Headline mask reveal**: lines y `110%→0`, stagger `0.08s`, dur `0.9s`, ease `snap`, trigger `top 78%`.
- **Case tag type-in**: mono eyebrow types char-by-char (or clip-path wipe L→R `0.6s`), caret `▍` blinks `steps(1) 1s`, disappears after.
- **Redaction wipe**: bar `scaleX 1→0`, origin right, dur `0.7s`, ease `wipe`, trigger `top 62%`; underlying text flashes `--orange-aa` for 200ms then settles to ink.
- **Stamp thump**: scale `1.7→1`, rotate `−14°→−8°`, opacity `0→1`, dur `0.38s`, ease `thump`, trigger `top 70%`; add 1px blur→0. Optional faint ink-stamp ring texture via border double.
- **Counter**: value 0→n over `1.4s` `power2.out` when stat becomes active in pin.
- **Bar race**: mention-share bars `width 0→x%`, scrubbed by scroll through the section (`scrub: 0.6`), staggered `0.12s`; "YOU" bar is covered by a redaction bar until the pin's final 20%.
- **Chain-of-custody line**: dashed SVG path, `stroke-dashoffset` scrubbed `top 70% → bottom 60%`.
- **Ticker**: CSS marquee `28s linear infinite`, pause on `:hover`, `prefers-reduced-motion: static wrap`.
- **Console typing**: 28–34 chars/s with 8% random jitter; caret `▍` 0.9s blink; answers render as one block per platform with 120ms inter-line stagger.
- **Page transitions** (SPA): outgoing paper sheet slides up `0.45s wipe`, incoming slides from bottom; navy pages slide horizontally from the right. Keep under 0.5s total; update document title + meta on route change.
- **Cursor** (desktop, `pointer:fine` only): 10px teal dot + 28px ring (`mix-blend-mode: difference` where feasible), ring scales `1→1.6` and shows mono label (`READ`, `OPEN`, `SEND →`) over interactive elements. Disabled for reduced motion; native cursor remains visible (ring augments, never replaces).

### Reduced motion (`prefers-reduced-motion`)
Disable: Lenis, pins (sections render fully expanded, final states shown), typing (full text shown), ticker (static), counters (final values), custom cursor, page transitions (instant). Stamps/redactions shown resolved. All content reachable without animation.

### Performance guardrails
- ≤ 8–10 simultaneous animating elements per viewport; one pinned scene at a time; kill/recreate ScrollTriggers on breakpoint change.
- Grain + vignette are CSS-only. No WebGL needed anywhere — the craft is typographic (deliberate choice; keeps LCP < 2s).
- Fonts: preload Fraunces 560 + Archivo 400/700 woff2 subsets; `font-display: swap` with size-adjusted fallback (Georgia / system-ui).

---

## 7. Shared Components

### 7.1 Navbar
- Fixed top, height 72px. Transparent over hero; after 40px scroll → `--paper` bg + 1px `--line-paper` bottom border + slight shadow. On navy sections, auto-inverts (mix-blend-difference on text, or section-aware theme class).
- Left: `logo.svg` bolt mark + "Elevate Marketing" wordmark (Archivo Expanded 700, ink; inverse on navy).
- Centre-right (≥1024): mono nav links 12px uppercase +0.18em: `The Problem` · `What You Get` · `How It Works` · `Results` · `FAQ` · `Sample Report` (Sample Report styled with `↗` suffix, orange-aa on hover). Anchor links smooth-scroll (Lenis).
- Right: small CTA button `Get My Free Audit` (height 40px). 
- Mobile: burger (2 hairlines) → full-screen **navy overlay**: giant Fraunces links stagger in (y 40px, opacity, 0.07s stagger, `snap`), mono meta row (email, case no.), close `×`. Focus-trapped, `Esc` closes, aria-expanded.
- Home page only: a thin 2px scroll-progress bar in `--orange` under the nav border.

### 7.2 Footer (all pages)
- Navy. Top zone: Fraunces italic Display M: *"Be the answer, not the omission."* + primary CTA button (except on thank-you, where it's a home link).
- Middle grid (4 → 1 col): **Case** (The Audit `/`, Sample Report `/sample-report`, FAQ `/#faq`) · **Legal** (Privacy Policy `/privacy-policy`, Terms of Service `/terms`) · **Contact** (hello@elevatemarketing.co.uk, London · Manchester · Birmingham) · **File note** (mono microcopy: "GEO audits for UK IT companies. 48-hour turnaround, zero obligation.").
- Bottom bar: `© 2026 Elevate Marketing Ltd · elevatemarketing.co.uk` · mono `Registered in England & Wales` · "Back to top ↑" (Lenis scrollTo 0).
- Footer links get underline-sweep hover (background-size trick, `wipe` ease).

### 7.3 Buttons
- **Primary**: `--orange` bg, `--ink` text (Archivo 700, 15px, +0.02em), rectangular, 2px ink border, **hard offset plate** shadow `4px 4px 0 var(--ink)`. Hover: plate collapses to `0 0 0` + button translates `4px,4px` (0.18s snap) — physical "stamp press". Arrow `→` translates +4px. Active: scale 0.98. Focus-visible: 3px `--teal` outline offset 3px (on navy sections, `--orange` outline).
- **Secondary**: transparent bg, 2px `--ink` border, ink text; hover fills with ink and text flips to paper (0.25s wipe sweep L→R using ::before scaleX). On navy: `--paper-on-navy` border/text, hover fill teal/ink text.
- **Text link CTA**: mono uppercase + arrow, orange-aa; arrow slides on hover.
- Sizes: L (56px h, hero), M (48px), S (40px, nav).

### 7.4 Redact (signature inline component)
`<Redact>` wraps text with an ink bar. Modes: `wipe` (opens on scroll, default), `peek` (hover/focus slides bar to 92% width, revealing text beneath — "peek under the redaction"; releases back on leave), `locked` (never opens — used for genuinely anonymised client data on /sample-report, with mono note `ANONYMISED — CLIENT DATA`). Always expose full text to screen readers via `aria-label`; the bar is `aria-hidden`.

### 7.5 Stamp
Bordered uppercase Archivo Expanded label, rotate −8°, double border (2px solid + inner 1px offset 3px), colour per verdict: orange (action/verdict), teal (positive/on navy), ink (neutral). Entrance: thump recipe. Optional circular variant (border-radius 50%, text on a curve not required — keep straight two-line).

### 7.6 DocCard (evidence document)
Paper card, 1px ink border, folded corner (top-right, `linear-gradient` 24px triangle + 1px crease), header row with mono `FILE Nº`, hairline separators, stamp positioned overlapping top edge. Hover: lifts −4px with hard shadow `8px 8px 0 rgba(26,26,46,.15)`; folded corner deepens.

### 7.7 ConsoleCard (interrogation terminal)
Navy-deep panel, 1px `--line-navy` border, chrome bar (3 dots in ink/teal/orange + mono title `QUERY LOG — chatgpt-5`), body in JetBrains Mono teal/paper, blinking caret. Used in hero (interactive simulator), problem section (static excerpts), sample report (findings).

### 7.8 Form elements
- Labels: mono uppercase 11px +0.18em, ink-soft; required marked `*`.
- Inputs: transparent bg, bottom-only 2px `--line-paper` border, 18px Archivo, paper texture; focus: border becomes `--orange` + mono hint appears right of label; error: border `--orange-aa` + mono error message with `▲` prefix, `aria-invalid`, `aria-describedby`.
- Select: native `<select>` styled to match (custom chevron `▾`), full keyboard support.
- Checkbox (privacy consent): square 18px, 2px ink border, teal tick draw-in (SVG dash 0.25s).
- Submit = primary button, full-width on mobile. Loading state: label swaps to mono `FILING REQUEST…` with animated ellipsis; disabled; then success transition.

### 7.9 Accordion (FAQ)
- Plus/minus mono glyph rotates 45° (0.3s snap); content height auto-animates (Framer Motion `AnimatePresence`), answer text Fraunces-italic key phrases; one open at a time; full keyboard (`button` headers, `aria-expanded`, `aria-controls`).

### 7.10 Ticker strip
Navy strip, 56px, mono uppercase items separated by `✳`: `CHATGPT ✳ GEMINI ✳ PERPLEXITY ✳ COPILOT ✳ GOOGLE AI OVERVIEWS ✳ DO THEY KNOW YOU EXIST?`. CSS marquee, duplicated track for seamless loop.

---

## 8. SEO & Technical (global)

- **Titles/meta** per page (see page docs). Pattern: `{Page} — Elevate Marketing`.
- **OG/Twitter**: `og:type website`, `og:image /og-image.png` (1200×630), `og:site_name Elevate Marketing`, `twitter:card summary_large_image`. Per-page `og:title`/`og:description`/`og:url` + canonical.
- **Favicon**: `/favicon.svg` (bolt on navy) + fallback sizes.
- **JSON-LD (sitewide, in `<head>`)** — Organization:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Elevate Marketing",
  "url": "https://elevatemarketing.co.uk",
  "logo": "https://elevatemarketing.co.uk/logo.svg",
  "email": "hello@elevatemarketing.co.uk",
  "address": { "@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB" },
  "sameAs": []
}
```
- Home adds **FAQPage** JSON-LD with the 5 FAQs (see `home.md` §12 for full copy to embed).
- React SPA: render meta per route (react-helmet-async or manual head manager). Keep all textual content in the initial render path (no content gated behind client-side fetches).
- **Analytics-ready**: CTA buttons carry `data-event` attributes (`cta_primary_hero`, `cta_secondary_hero`, `form_submit`, `sample_report_view`…). Form endpoint: POST to `/api/audit-request` (or provider), client-side validation first.

## 9. Accessibility (WCAG 2.2 AA)

- Colour pairs per §2 only. Focus-visible rings everywhere (teal on light, orange on navy), never `outline: none` without replacement.
- Semantic landmarks (`header/nav/main/section/footer`, one `h1` per page), skip-link "Skip to content".
- Hero simulator: `role="log" aria-live="polite"` on the answer stream; chips are real `<button>`s.
- Pinned sections: content order in DOM matches visual order; pins release naturally; no focus loss.
- Redact exposes text via `aria-label`. Marquee marked `aria-hidden` with a visually-hidden static equivalent list.
- Forms: programmatic labels, inline errors announced (`role="alert"` region), success state moves focus.
- Hit targets ≥44px. Reduced-motion per §6.

## 10. Page List

| Route | File | Purpose |
|---|---|---|
| `/` | `home.md` | Campaign landing: hero + prompt simulator, problem (pinned stats), competitor benchmark, deliverables, process, social proof, audit form, FAQ, final CTA |
| `/sample-report` | `sample-report.md` | Full anonymised example GEO audit ("COMPANY X Ltd") — demonstrates expertise; secondary CTA destination; ends in conversion CTA |
| `/thank-you` | `thank-you.md` | Post-submit confirmation: stamped case number, what-happens-next, cross-links. Also mirrored as inline success state on home form |
| `/privacy-policy` | `privacy-policy.md` | UK GDPR-compliant privacy notice, document-styled |
| `/terms` | `terms.md` | Terms of service incl. free-audit terms, document-styled |

## 11. Assets Manifest

> Asset generation is handled by the Scaffold agent. SVGs are vector specs; `og-image` + `hero-texture` are the only raster images — the site is otherwise typographic by design.

| Filename | Type | Description (generation prompt) | Used in | Dimensions |
|---|---|---|---|---|
| `logo.svg` | SVG | Horizontal lockup: sharp geometric lightning bolt mark (two offset angular facets, flat `--teal #00D4AA` with a `--navy #0A2540` keyline) + wordmark "ELEVATE MARKETING" in an expanded geometric grotesque, `--ink #1A1A2E` on transparent. Crisp, no gradients, no shadows. | Navbar (light surfaces) | 240×48 viewBox |
| `logo-inverse.svg` | SVG | Same lockup; bolt stays teal, wordmark in `#EDEAE0` for navy backgrounds. | Navbar on navy, footer | 240×48 viewBox |
| `logo-mark.svg` | SVG | Bolt mark alone, teal with navy keyline, transparent bg. | Footer bug, menu overlay, sample-report cover folio | 64×64 viewBox |
| `favicon.svg` | SVG | Rounded-square tile `--navy #0A2540` fill, centred teal lightning bolt, 8% corner radius. Legible at 16px. | `<head>` all pages | 64×64 viewBox |
| `og-image.png` | Image | Social card, dossier aesthetic: warm paper `#F2EEE5` background with subtle grain, giant ink editorial-serif headline "Is Your IT Business Invisible to ChatGPT?", a navy console strip along the bottom with teal mono text "FREE GEO AUDIT — 48H TURNAROUND", an orange rubber-stamp style badge "FREE", small bolt logo top-left, black redaction bar striking through the word "Invisible" partially. Flat design, high contrast, no photo elements. | OG/Twitter meta, all pages | 1200×630 (1.91:1) |
| `hero-texture.png` | Image | Abstract dark sonar/signal field: deep navy `#051729→#0A2540` background with faint concentric ring waves radiating from lower right (like sonar ping rings), a few thin teal `#00D4AA` hairline rings at 8–15% opacity, one slightly brighter ring, ultra-subtle film grain. No objects, no text, no glow blobs — restrained, editorial, dark. Used at low opacity behind console panels and the final CTA. | Home hero console card bg, final CTA bg, thank-you bg | 1600×1000 (16:10) |

*(No other imagery: testimonials use typographic monograms; charts/gauges are DOM/SVG; grain is an inline SVG filter.)*
