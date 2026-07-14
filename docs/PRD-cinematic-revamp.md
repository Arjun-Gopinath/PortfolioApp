# PRD — "Director's Cut": Cinematic Revamp of the Portfolio App

| | |
|---|---|
| **Author** | Arjun Gopinath |
| **Date** | 2026-07-14 |
| **Status** | Draft |
| **Repo** | PortfolioApp (React 19 · Vite 5 · Tailwind CSS v4 · Framer Motion 12) |
| **Live** | https://eportfolio-arjung.vercel.app/ |

---

## 1. Background & Problem Statement

The portfolio currently ships a dark, Uber-inspired layout with Bebas Neue display type, a sky-blue accent, marquee dividers, and basic Framer Motion slide/fade entrances. It is functional and clean, but visually it reads as **bland and interchangeable** — the animations are generic (fade + translate on scroll), the sections feel like a template, and nothing about the experience is memorable enough to make a recruiter or hiring manager pause.

The site already has personality hooks (football easter eggs in the hero pitch lines and loading screen) that prove subtle theming works. This revamp extends that idea with a **movie/cinema motif** — treating the portfolio as a film about the candidate — applied with restraint so the content (experience, skills, projects, certifications) always stays the star.

## 2. Goals

1. **Make the site memorable** — a visitor should feel a distinct "cinematic" personality within the first 5 seconds without being told the theme.
2. **Elevate animation quality** — replace generic fade-ins with intentional, choreographed motion (scroll-driven, staggered, physical) across every section.
3. **Keep the theme subtle** — cinema references should be discoverable garnish (like the existing pitch lines), never costume. No popcorn buckets, no literal film clip art dominating sections.
4. **Zero functional change** — every existing feature works exactly as today (see Non-Goals / Invariants).

## 3. Non-Goals & Invariants (must not change)

- **Content**: No rewriting of resume content, experience entries, project descriptions, or certifications.
- **Features**: AI chatbot (OpenRouter edge function), i18n (en/es/fr), resume download, Open to Work badge, scroll-to-top, language switcher, and all section anchors remain fully functional and untouched in behavior.
- **Architecture**: No framework migration, no new heavyweight dependencies (no Three.js, no GSAP, no Lottie). Framer Motion 12 + Tailwind v4 + CSS are sufficient.
- **Section order**: Hero → Skills → Experience → Education → Certifications → Projects → Contact stays as-is.
- **No media assets**: No video files, no large images. All cinematic effects are CSS/SVG/JS-generated.
- **SEO/accessibility**: No regression in semantics, contrast, or keyboard navigation.

## 4. Design Concept — "The portfolio as a film"

The unifying metaphor: **the visitor is watching the feature film of Arjun's career.** The page is structured like a screening — opening titles, acts, and end credits — expressed through motion language and micro-details rather than literal imagery.

### Visual language

- **Base**: Keep the existing dark gray-950 canvas — it already reads as a darkened theater.
- **Accent evolution**: Introduce a secondary **warm amber/gold** accent (marquee-light gold, `~#f5b942` family) used sparingly for cinematic moments (title cards, hover glows, the progress "playhead"). The existing sky-blue remains the primary interactive color so the current identity isn't discarded.
- **Texture**: An extremely subtle, CSS-only **film grain** overlay (animated noise at ~2–3% opacity, `pointer-events: none`) across the page — the cinematic equivalent of the existing pitch-lines easter egg.
- **Typography**: Unchanged (Bebas Neue display + Manrope body). Bebas Neue already has strong movie-poster energy; the revamp leans into it with better letter-level animation.

## 5. Requirements

Each requirement below is scoped to an existing component. Priorities: **P0** = core of the revamp, **P1** = strong value, **P2** = polish/easter egg.

### 5.1 Loading screen — "The countdown leader" (P0)

`LoadingScreen.jsx` currently shows a bouncing football then the logo with a progress bar.

- Replace with a **film countdown leader** homage: a circle with rotating radial sweep and crosshair lines, counting **3 → 2 → 1** in Bebas Neue, followed by the AG logo "projected" in with a brief flicker.
- Keep total duration ≤ current (~1.4s tick, 3s hard cap) and keep the existing exit slide-up transition.
- Retain the football as a micro easter egg if desired (e.g., the ball briefly rolls through the countdown circle) — the two themes can coexist.
- Skipped entirely when `prefers-reduced-motion` is set (show logo + static progress only).

### 5.2 Hero — "Opening titles" (P0)

`Hero.jsx` currently fades elements in sequence.

- **Title sequence choreography**: the name animates like an opening credit — per-letter or per-word staggered reveal (clip-path rise or blur-to-sharp), followed by the role line appearing in the style of a "starring" credit (letter-spaced, small caps — the current tracking style already fits).
- **Letterbox entrance**: on first load, thin black letterbox bars at top/bottom ease outward as the hero settles — a one-time, ≤1s effect synced with the loading screen exit.
- **Spotlight cursor** (desktop only): a large, very soft radial light (~4–6% white opacity) follows the pointer over the hero, like a projector beam. Disabled on touch and reduced-motion.
- Keep pitch-lines easter egg, Open to Work badge, both CTAs, and scroll indicator exactly as they function today.

### 5.3 Section title cards — "Acts" (P0)

Applies to all section headers (Skills, Experience, Education, Certifications, Projects, Contact).

- Standardize a **title-card reveal**: as the section header enters the viewport, it appears like a film title card — a horizontal rule wipes in, the Bebas Neue heading rises with a clip-path mask, and a small overline label fades in above it.
- The overline uses subtle chapter language — e.g. `ACT I`, `ACT II`, … or `SCENE 01` — in the amber accent, letter-spaced Manrope. **These strings are cosmetic and must be added to all three locale files** (en/es/fr) like every other string.
- One shared, reusable component/variant set (e.g. `SectionTitle.jsx`) so the choreography is identical everywhere — this also removes duplicated header markup across sections.

### 5.4 Marquee dividers — "Theater marquee" (P1)

`MarqueeDivider.jsx` currently scrolls uppercase words.

- Restyle as a **cinema marquee strip**: add small dot "marquee bulbs" (CSS radial gradients) along the top and bottom edges with a slow, subtle chase shimmer; separator between words becomes a small ★ or ✦.
- Keep the existing text content, directions, and speeds. Pause the bulb shimmer under reduced motion (text marquee already should pause too — see 5.9).

### 5.5 Experience & Education timelines — "The filmstrip" (P1)

- The vertical timeline spine is restyled as a **filmstrip edge**: faint sprocket-hole notches (CSS gradient pattern) along the line, revealed progressively via a scroll-linked `scaleY`/mask animation so the strip "feeds" as you scroll.
- Timeline cards upgrade from slide-in to a **scroll-choreographed stagger**: each entry's date chip, title, and body animate in with 40–80ms offsets; the connector dot "flickers on" like a projector lamp (2-frame opacity flicker, ≤200ms).
- No change to content, dates, or accent-color-per-entry logic.

### 5.6 Projects — "Movie posters" (P0)

`Projects.jsx` cards are the highest-value surface for the theme.

- Each project card becomes a subtle **poster**: taller aspect ratio on desktop, title in Bebas Neue, and a one-line "billing block" — the tech stack rendered in the condensed, centered style of movie-poster credits (tiny, letter-spaced, all-caps). This is the single most explicit movie reference on the page, and it doubles as clearer tech-stack presentation.
- **Hover choreography** (desktop): card lifts with a soft amber glow, a gentle 2–3° perspective tilt tracking the cursor, and the GitHub/live links slide up like a lower-third. Tap on mobile shows the same links without tilt.
- Card grid entrance: staggered rise with slight scale, scroll-triggered once.
- GitHub/live links keep identical targets and behavior.

### 5.7 Footer — "End credits" (P2)

- On reaching the footer, quick links and social icons animate in as a brief **credits-style cascade** (centered lines rising in sequence, one time, ≤1.5s total). Optionally a final line: `Directed by Arjun Gopinath` (localized) — small, self-aware, and the clearest wink of the theme.
- All links unchanged.

### 5.8 Global motion & scroll system (P0)

- **Scroll progress bar** (`ScrollProgress.jsx`): restyle as a **playhead** — keep the thin top bar but add a tiny glowing head, gradient shifting from sky to amber as the "film" plays toward the end credits.
- **Shared motion vocabulary**: define one exported set of Framer Motion variants/easings (e.g. `motion.js` util) — a signature ease (`[0.76, 0, 0.24, 1]` is already used in the loader; adopt it globally), standard durations (fast 0.2s / base 0.5s / cinematic 0.8s), and stagger constants. All components consume these instead of ad-hoc inline transitions.
- **Scroll-driven effects** use Framer Motion `useScroll`/`useTransform` (already available in v12) — no new libraries.
- **Chatbot (`ChatWithMe.jsx`)**: functionality untouched; only the open/close transition adopts the shared easing, and the panel gets the same card-surface styling as the rest of the revamp.

### 5.9 Accessibility & reduced motion (P0)

- Every animation in this PRD must respect `prefers-reduced-motion: reduce`: entrances become simple fades or instant, marquees/shimmers/spotlight/tilt/grain are disabled. Framer Motion's `useReducedMotion` hook gates JS-driven motion; CSS animations are gated with the media query.
- Film grain and spotlight overlays are `aria-hidden` and `pointer-events: none`.
- Amber accent text meets WCAG AA contrast on the gray-950 background.
- No animation may trap focus, hide focus outlines, or animate on keyboard focus differently than on hover in a way that breaks usability.

### 5.10 Performance budget (P0)

- Grain, marquee bulbs, sprocket holes, spotlight: **CSS/SVG only**, animating exclusively `transform` and `opacity` (compositor-friendly). No `filter` animation on large surfaces.
- Bundle: no new runtime dependencies. Net JS added across the revamp ≤ ~10KB min+gzip.
- Lighthouse (mobile) performance score must not drop below the current baseline; measure before/after. LCP element (hero name) must not be delayed by the letter-stagger — first paint of the name starts within the same frame budget as today.
- Scroll-linked animations must not cause main-thread jank (target: no long tasks > 50ms attributable to scroll handlers; prefer Framer Motion's motion values over React state updates per scroll frame).

## 6. Explicitly Out of Scope

- Light theme / theme toggle.
- New sections (e.g., testimonials, blog) or content edits.
- Sound effects of any kind.
- Page transitions/routing (site remains a single scrolling page).
- Changes to `api/chat.js`, `systemPrompt.js`, or any backend/edge behavior.
- Replacing the football easter eggs — they stay.

## 7. Phasing & Milestones

| Phase | Scope | Requirements |
|-------|-------|--------------|
| **1 — Foundation** | Shared motion vocabulary, design tokens (amber accent, grain overlay), reduced-motion gating, `SectionTitle` component | 5.3, 5.8, 5.9 |
| **2 — Marquee moments** | Loading countdown, hero opening titles, playhead progress bar | 5.1, 5.2, 5.8 |
| **3 — Sections** | Project posters, filmstrip timelines, marquee dividers | 5.4, 5.5, 5.6 |
| **4 — Credits & polish** | Footer credits, chatbot transition polish, perf/a11y audit, locale sweep | 5.7, 5.10 |

Each phase ships independently to `main` (auto-deploys to Vercel) — the site must be presentable after every phase.

## 8. Success Criteria

1. All invariants in §3 verified manually after each phase (chatbot round-trip, language switch across all three locales, resume download, all anchors and external links).
2. `prefers-reduced-motion` walkthrough shows no moving elements beyond simple fades.
3. Lighthouse mobile performance ≥ baseline; no new console errors.
4. Subjective bar: three sections chosen at random each have at least one motion detail that did not exist before, and the movie theme is discoverable but never labels itself (except the footer "Directed by" wink).
5. All new user-visible strings exist in `en.json`, `es.json`, and `fr.json`.

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Theme reads as gimmicky | Undermines professional credibility | Every reference passes the "garnish test": remove it and the section still works; §5.6 billing block is the only overt reference above the footer |
| Animation fatigue / motion sickness | Visitors bounce | Reduced-motion support is P0, not polish; all loops are slow and low-contrast |
| Scroll jank on low-end mobile | Worse than the bland version | Perf budget in 5.10; test on throttled CPU; scroll effects degrade to static on reduced-motion |
| Amber accent clashes with sky-blue identity | Visual noise | Amber restricted to overlines, glows, and the playhead; sky-blue keeps all interactive elements |
| i18n strings forgotten for cosmetic labels | Broken es/fr experience | Locale completeness is a phase-4 exit criterion (§8.5) |

## 10. Open Questions

1. Act labels (`ACT I` / `SCENE 01`) — English film-jargon flavor vs. properly localized equivalents in es/fr? (Recommendation: localize — `ACTO I`, `ACTE I` — it's nearly free.)
2. Should the "Directed by" footer line link to the GitHub repo as a colophon?
3. Keep the loading screen on every visit, or session-gate it (show full countdown once per session, instant thereafter)? (Recommendation: session-gate via `sessionStorage`.)
