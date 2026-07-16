## Context

The previous change (`streaming-row-browsing` + `streaming-hero-banner`, already merged to `main`) introduced the `Row`/`TitleCard` carousel pattern used by Skills, Experience, Certifications, and Projects, plus the Netflix-style Hero banner. On inspection of the current source and a live dev-server run, three concrete defects surfaced that the user independently reported:

1. **Duplicate headings.** `Experience.jsx`, `Certifications.jsx`, and `Projects.jsx` each render a section `<h2>{heading}</h2>` and then pass that same `heading` string into `<Row title={heading} .../>`, which renders its own `<h3>{title}</h3>`. The rendered page literally shows "Professional Experience" and "Projects" twice in a row. `Skills.jsx` is unaffected — its rows are titled per-category ("Frontend", "Backend & APIs", ...), distinct from the section `<h2>Technical Skills</h2>`.
2. **Scrollbar inside cards.** `TitleCard.jsx`'s hover/focus detail overlay (`absolute inset-x-0 bottom-0 max-h-[75%] overflow-y-auto ...`) has no scrollbar-suppression, unlike the row scroller itself (`.row-scroll` in `index.css` explicitly sets `scrollbar-width: none` and hides the WebKit scrollbar). On any non-macOS browser with classic scrollbars (the reporting user is on Windows), overflowing overlay content — e.g. Experience cards with a title, subtitle, and up to 3 bullets inside a `h-64 sm:h-72` card — shows a visible system scrollbar bisecting the card.
3. **Font inconsistency.** `fontFamily` is set via ~30 separate inline `style={{fontFamily: "'Bebas Neue', sans-serif"}}` / `style={{fontFamily: "Manrope, sans-serif"}}` declarations copy-pasted across 15 components. `index.css` already defines a `.font-display` utility class that is never actually used by any component — dead code that signals the intended pattern was abandoned mid-implementation. This is fragile (easy to forget on new markup) rather than currently visibly broken everywhere, but it is the direct cause of the "no consistent fonts" complaint once any component is touched without copying the exact inline string.

Separately, the user's broader ask — "make it look like Netflix" — is only half-realized: `TitleCard` in its resting (non-hovered) state is a plain frosted-glass rectangle with an icon and title. Real streaming poster cards read as posters *before* interaction (art/color treatment, not just on hover). This is a polish gap on top of the three bugs above.

## Goals / Non-Goals

**Goals:**
- Eliminate the duplicate-heading rendering bug in Experience, Certifications, Projects.
- Eliminate the visible scrollbar inside `TitleCard`'s hover overlay, cross-browser.
- Replace scattered inline `fontFamily` styles with two Tailwind theme font tokens (`font-display`, `font-body`) as the single source of truth, and delete the now-fully-redundant manual `.font-display` CSS rule in favor of the Tailwind-generated utility.
- Give `TitleCard` a resting-state visual treatment that reads as a "poster" rather than a plain panel, using only CSS (gradient wash, accent glow, watermark glyph) — no new image assets, no new dependencies.

**Non-Goals:**
- No change to section content, order, copy meaning, or the underlying `Row`/`TitleCard` interaction model (hover-reveal, scroll-snap, chevrons, keyboard/a11y semantics) — those are already correct per the existing `streaming-row-browsing` spec and stay as-is.
- No new npm dependencies (no image/video libraries, no carousel libraries).
- No changes to `api/chat.js`, i18n meaning, resume download, or any backend behavior.
- No redesign of the Hero banner (`streaming-hero-banner` capability) — it already matches spec; only the font-token migration touches it (mechanical, no visual change beyond typeface consistency).

## Decisions

**1. Row heading duplication — suppress, don't relabel.**
Add a `showTitle` boolean prop to `Row` (default `true`). When `false`, `Row` skips rendering its internal accent-bar + `<h3>` but keeps rendering the chevron controls and still uses the existing `title`/`ariaLabel` prop value for the scroll region's accessible name (`role="region" aria-label=...`). Single-row sections that already render an equivalent `<h2>` immediately above (Experience, Certifications, Projects) pass `showTitle={false}`.
- *Alternative considered:* give each row a distinct sub-label (e.g., "Selected Work" for Projects, "Timeline" for Experience) instead of suppressing. Rejected for this pass — it requires new copy across three locale files for a purely cosmetic label, adds surface area, and the section already carries an overline + `<h2>` (e.g., "NOW SHOWING" / "Projects") that fully establishes context. `showTitle` is the minimal, reusable fix and keeps `Row` API flexible for any future section with only one row.

**2. Scrollbar suppression — reuse the existing pattern.**
Add a `.titlecard-overlay-scroll` class in `index.css` with the identical rule set already proven on `.row-scroll` (`scrollbar-width: none`, `-ms-overflow-style: none`, `::-webkit-scrollbar { display: none }`), applied to the overlay `div` in `TitleCard.jsx`. No JS change needed.
- *Alternative considered:* a custom styled scrollbar (thin, accent-colored) instead of hiding it entirely. Rejected — inconsistent with the row scroller's existing "no visible scrollbar, rely on fade/chevron affordances" convention; introducing a second scrollbar treatment would itself be an inconsistency.

**3. Typography — Tailwind v4 theme font tokens.**
Register `--font-display: 'Bebas Neue', sans-serif;` and `--font-body: 'Manrope', sans-serif;` under `@theme` in `index.css`. Tailwind v4 auto-generates `font-display` / `font-body` utility classes from any `--font-*` theme key. Set `font-body` as the page-wide default once (on `body` or `#root`, already effectively true via `App.css`'s `#root { font-family: 'Manrope', sans-serif }`, kept as-is) so most components need **zero** font utility. Every remaining inline `style={{fontFamily: "'Bebas Neue', sans-serif"}}` (headings, nav wordmark, marquee text) is replaced with `className="... font-display"`. Delete the manual `.font-display { font-family: 'Bebas Neue', sans-serif }` rule in `index.css` once the Tailwind-generated utility of the same name supersedes it — keeping both would be the exact duplication this change is fixing.
- *Alternative considered:* a `<Heading>` wrapper component enforcing the font. Rejected as over-engineering for a portfolio site — a utility class is a one-word diff at each call site and matches how every other style is already applied (Tailwind classes), whereas a new component would be an abstraction with a single trivial responsibility.

**4. TitleCard resting-state poster treatment.**
Add, purely via CSS/Tailwind on the existing card markup:
- A soft radial gradient wash behind the title using the card's existing `accent` gradient prop at low opacity (`::before`-style absolutely positioned div, `aria-hidden`), instead of today's flat `from-white/8 to-white/[0.03]`.
- A large (e.g. `text-6xl`, ~15% opacity), bottom-right-anchored watermark of the card's existing `icon` prop (Projects/Certifications already pass tech/issuer icons; Skills' compact cards already show the icon at normal size and are excluded from this treatment to avoid clutter at their small size).
- No change to the hover-reveal overlay itself beyond the scrollbar fix in (2).
- *Alternative considered:* fetch/generate a placeholder "poster" image per project. Rejected — out of scope per the proposal (no new assets), and the PRD explicitly rules out new media assets for the cinematic/streaming theme.

## Risks / Trade-offs

- **[Risk] `showTitle={false}` removes the row's own accessible heading, relying solely on `aria-label`.** → Mitigation: `role="region" aria-label={ariaLabel || title}` already exists in `Row` and is unconditional; passing an explicit `ariaLabel` (already required at all call sites) preserves screen-reader landmarks even with the visual title hidden.
- **[Risk] Deleting the old `.font-display` CSS rule before all inline styles are migrated could leave a heading unstyled.** → Mitigation: migrate all inline `fontFamily: "'Bebas Neue'"` call sites to `className="font-display"` in the same task/commit as the CSS change (tasks.md sequences this as one atomic step per component, verified visually before moving on).
- **[Risk] Poster watermark glyph could reduce text contrast/legibility if opacity is too high or z-index is wrong.** → Mitigation: keep watermark `aria-hidden`, low opacity (~15%), and positioned behind (`z-index` below) the title/tags layer; verify against WCAG AA for the title text specifically (unaffected, since watermark sits behind content, not over it).
- **[Trade-off] Not adding distinct row sub-labels (Decision 1) means single-row sections have no visible row-level heading at all**, only the section `<h2>`. Acceptable because Netflix rows always sit under an implicit page-level context too, and re-introducing a label would reproduce the duplication problem being fixed — but flagged as an explicit trade-off, not an oversight.

## Migration Plan

1. CSS foundation first (theme tokens, scrollbar class, `.font-display` cleanup) — additive, no visual change until consumed.
2. `Row` and `TitleCard` component changes (props + CSS class consumption) — verified against Skills (unaffected, regression check) before touching single-row sections.
3. Per-section updates (Experience, Certifications, Projects) — one at a time, each verified live in the dev server before moving to the next.
4. Sweep remaining inline `fontFamily` styles across the rest of the app (Hero, Contact, Footer, TopNavbar, ChatWithMe, LoadingScreen, Education, StatsBar) to the new utility classes.
5. Full-page visual + reduced-motion + keyboard-nav verification pass, screenshots captured for before/after comparison.

No feature flag or staged rollout needed — this is a static portfolio site with no user data or backend state; a bad deploy is a `git revert` + redeploy.

## Open Questions

None — the user has approved fixing all three defects in a single pass (screenshots requested "when ready," i.e., after implementation).
