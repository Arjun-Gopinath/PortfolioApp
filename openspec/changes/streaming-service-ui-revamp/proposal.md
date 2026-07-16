## Why

The last change ("streaming-service row browsing UI revamp") shipped the Netflix-style `Row`/`TitleCard` pattern, but the execution has visible defects that undercut the effect the user actually asked for: every multi-card section (Experience, Certifications, Projects) renders its section heading twice — once as the `<h2>` and again as the `Row`'s own title, because the section heading text is passed straight into `Row`'s `title` prop; the `TitleCard` hover-reveal overlay uses `overflow-y-auto` with no scrollbar suppression, so on Windows/non-macOS browsers a raw system scrollbar appears inside the card, breaking the "movie poster" illusion; and `font-family` is applied through ~30 scattered inline `style={{fontFamily: ...}}` declarations across 15 components instead of a shared Tailwind font token, so it silently drifts (an already-defined `.font-display` utility in `index.css` is dead code — never referenced anywhere) and any new text can end up in the wrong typeface. On top of these confirmed bugs, `TitleCard` at rest is a plain glass-morphism panel with an icon and title — it doesn't read as a "poster" the way a real streaming catalog card does, so the design pattern the user asked for ("Netflix way of display") is only half-realized.

## What Changes

- Fix duplicate row/section headings: `Row` no longer repeats the section `<h2>` text — single-row sections (Experience, Certifications, Projects) either give the row a distinct sub-label or suppress the redundant row title entirely; multi-row sections (Skills) are unaffected since their row titles already differ from the section heading.
- Suppress the scrollbar rendered inside `TitleCard`'s hover/focus overlay by applying the same scrollbar-hiding treatment already used on `.row-scroll` (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`), applied consistently across desktop browsers/OSes.
- Consolidate font-family application: replace the ~30 scattered inline `fontFamily` styles with two Tailwind utility classes wired into the theme (`font-display` for Bebas Neue headings, `font-body` for Manrope body text — a single global default on `body`/`#root` covers body text, so `font-display` becomes the only class most components still need). Remove the now-truly-used `.font-display` definition duplication.
- Strengthen the "poster" read of `TitleCard` at rest: add a subtle rest-state affordance (accent-tinted gradient wash + a small `Fa Play`/category glyph watermark, no new images/assets) so cards read as catalog posters before hover, not just after.
- No change to section content, order, i18n keys' meaning, chatbot, resume download, or any other functional behavior — this is a defect-fix and polish pass on the already-approved streaming-catalog pattern, not a new pattern.

## Capabilities

### New Capabilities
- `ui-typography`: Establishes a single, centrally-defined typography system (Tailwind theme font tokens `font-display` / `font-body`) as the only sanctioned way components set typeface, replacing ad-hoc inline `fontFamily` styles.

### Modified Capabilities
- `streaming-row-browsing`: Adds requirements that (a) a section's `Row` title MUST NOT duplicate the section's own heading text, and (b) `TitleCard`'s hover/focus detail overlay MUST NOT display a visible scrollbar when its content overflows, and (c) `TitleCard` MUST present a poster-like accent treatment in its resting (non-hovered) state, not only on hover.

## Impact

- Affected components: `Row.jsx`, `TitleCard.jsx`, `Experience.jsx`, `Certifications.jsx`, `Projects.jsx`, `Skills.jsx` (verify unaffected), plus every component currently setting `fontFamily` inline (`Hero.jsx`, `Contact.jsx`, `Footer.jsx`, `TopNavbar.jsx`, `ChatWithMe.jsx`, `LoadingScreen.jsx`, `Education.jsx`, `StatsBar.jsx`, `ActLabel.jsx` where applicable).
- Affected styles: `index.css` (`.font-display`, new `.font-body`, Tailwind `@theme` font tokens, `TitleCard` overlay scrollbar rule).
- No API, dependency, routing, or content changes. No new npm packages.
- Locale files unaffected unless a new distinct row sub-label copy is introduced (TBD in design — if added, must land in `en.json`/`es.json`/`fr.json`).
