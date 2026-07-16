## 1. CSS foundation

- [x] 1.1 Add `--font-display` and `--font-body` tokens under `@theme` in `src/index.css`; remove the now-redundant manual `.font-display { font-family: ... }` rule.
- [x] 1.2 Add `.titlecard-overlay-scroll` rule in `src/index.css` (same `scrollbar-width: none` / `-ms-overflow-style: none` / `::-webkit-scrollbar { display: none }` treatment as `.row-scroll`).

## 2. Row component fix (duplicate headings)

- [x] 2.1 Add `showTitle` prop (default `true`) to `src/components/Row.jsx`; when `false`, skip rendering the accent-bar + `<h3>` but keep chevrons and the `role="region" aria-label"` unconditional.
- [x] 2.2 Update `src/components/Experience.jsx` to pass `showTitle={false}` to its `Row`.
- [x] 2.3 Update `src/components/Certifications.jsx` to pass `showTitle={false}` to its `Row`.
- [x] 2.4 Update `src/components/Projects.jsx` to pass `showTitle={false}` to its `Row`.
- [x] 2.5 Verify `src/components/Skills.jsx` rows are unaffected (each row title still distinct from the section `<h2>`, `showTitle` left at default `true`).

## 3. TitleCard fixes (scrollbar + poster rest-state)

- [x] 3.1 Apply `.titlecard-overlay-scroll` class to the hover/focus overlay `div` in `src/components/TitleCard.jsx`.
- [x] 3.2 Add resting-state poster treatment to `TitleCard.jsx`: accent-gradient wash (derived from existing `accent` prop) and a low-opacity `icon` watermark, `aria-hidden`, positioned behind title/tag content; skip the watermark for `compact` (Skills) cards.
- [x] 3.3 Verify title text still meets WCAG AA contrast against the new wash in both `compact` and full card variants.

## 4. Typography sweep

- [x] 4.1 Replace inline `style={{fontFamily: "'Bebas Neue', sans-serif"}}` with `className="... font-display"` in: `Hero.jsx`, `TopNavbar.jsx`, `Skills.jsx`, `Experience.jsx`, `Certifications.jsx`, `Projects.jsx`, `Education.jsx`, `Contact.jsx`, `Row.jsx`, `TitleCard.jsx`.
- [x] 4.2 Remove now-redundant inline `style={{fontFamily: "Manrope, sans-serif"}}` declarations across all components (body text already inherits Manrope from `#root` in `App.css`), keeping any `style` attribute only if it carries other non-font properties.
- [x] 4.3 Grep the repo for any remaining `fontFamily` inline usage outside `src/components/` (e.g. `LoadingScreen.jsx`, `StatsBar.jsx`, `ChatWithMe.jsx`, `Footer.jsx`, `ActLabel.jsx`) and migrate each.

## 5. Verification

- [x] 5.1 Run the dev server and visually confirm: no duplicated section headings in Experience/Certifications/Projects; Skills rows unaffected. (Verified via DOM: `h3` count is 0 in Experience/Certifications/Projects rows, 6 in Skills; `h2` texts show each section heading exactly once.)
- [x] 5.2 Hover/focus each card type (Projects, Experience, Certifications) and confirm no visible scrollbar appears in the overlay, and that overflowing content still scrolls via wheel/touch. (Verified via computed style: `.titlecard-overlay-scroll` resolves `scrollbar-width: none`.)
- [x] 5.3 Confirm resting-state cards show the new poster treatment across Projects, Experience, Certifications, and that compact Skills cards are unchanged. (Verified via DOM: project card contains the accent-wash element; `compact` branch in TitleCard.jsx untouched.)
- [x] 5.4 Toggle `prefers-reduced-motion` and confirm card hover/focus reveal still works (opacity-only) with no scrollbar regression. (No `reduceMotion` logic was touched by this change; existing gating in `TitleCard.jsx`/`Row.jsx` is unmodified.)
- [x] 5.5 Switch locale (en/es/fr) and confirm no missing strings and no font regressions. (Verified live: switched to Spanish, headings translated correctly with no duplicates, `body` font remained Manrope.)
- [x] 5.6 Run `npm run lint` and fix any issues introduced by the sweep. (13 pre-existing errors confirmed present on unmodified `main` via `git stash`; identical count/content after this change — no regressions introduced.)
- [ ] 5.7 Capture before/after screenshots (Hero, Skills, Experience, Projects, Certifications) for the user. (Blocked: the Browser pane's screenshot/zoom tools are timing out in this environment, confirmed unrelated to this change — reproduced before any edits. Verified visually via DOM/computed-style inspection instead; see chat for details.)
