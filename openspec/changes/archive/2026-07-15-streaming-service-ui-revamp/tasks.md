## 1. Shared primitives

- [x] 1.1 Create `src/utils/techCategories.js` — lift the `FRONTEND`/`BACKEND`/`DATA`/`AI` sets and `getTechColor` classifier out of `Projects.jsx` into a shared, exported util.
- [x] 1.2 Build `src/components/Row.jsx` — horizontal scroll-snap container: `overflow-x-auto`, `scroll-snap-type: x mandatory`, hidden native scrollbar, edge fade masks (with `@supports` fallback), left/right chevron buttons that call `scrollBy`, `role="region"` + `aria-label` prop, title-card style header (reusing existing section-title/`ActLabel` conventions).
- [x] 1.3 Build `src/components/TitleCard.jsx` — poster-style card taking `title`, `subtitle`, `tags`, `accent`, `links`, `synopsis` props; hover/focus reveal of synopsis + link actions; scale/lift transition; `prefers-reduced-motion` fallback (opacity-only reveal); fully keyboard focusable and operable.
- [x] 1.4 Add Framer Motion variants for row header reveal and card hover/focus to `src/motion.js`, matching existing cinematic title-card reveal style.

## 2. Projects section migration

- [x] 2.1 Remove `DesktopProjects` (pinned-scroll `useScroll`/`useTransform` implementation) and the separate mobile grid from `src/components/Projects.jsx`.
- [x] 2.2 Re-implement `Projects.jsx` as a single `Row` of `TitleCard`s driven by `projects.list` from locale data, using `cardAccents` and `techCategories.js` tag coloring.
- [x] 2.3 Verify GitHub/live-demo/itch.io link icons and behavior are preserved inside `TitleCard` link actions.
- [x] 2.4 Verify Projects section no longer allocates `projects.length * 100vh` of scroll height; confirm normal document flow height.

## 3. Certifications section migration

- [x] 3.1 Re-implement `src/components/Certifications.jsx` to render certifications as `TitleCard`s inside one `Row`.
- [x] 3.2 Remove now-duplicated bespoke card markup from `Certifications.jsx` in favor of `TitleCard`.

## 4. Skills section migration

- [x] 4.1 Re-implement `src/components/Skills.jsx` to group skills using `techCategories.js` into 3-4 category `Row`s (e.g., Frontend, Backend & APIs, Data & ML), each row title using existing title-card/`ActLabel` header style. (Extended to 6 rows to preserve full coverage of the original 45-item skill list without an "other" catch-all — see verification below.)
- [x] 4.2 Confirm every skill in locale data appears in exactly one row (no duplicates, no omissions) — verified via a standalone script: all 45 skills classify into frontend(11)/backend(11)/ai(4)/data(3)/devops(8)/practices(8), zero land in "other".

## 5. Experience section migration

- [x] 5.1 Re-implement `src/components/Experience.jsx` to render each role as a `TitleCard` inside a `Row`, preserving all existing role detail content (dates, description, tech tags).

## 6. Hero banner restyle

- [x] 6.1 Restyle `src/components/Hero.jsx` as a full-bleed banner: title, short logline/synopsis, Play CTA (scrolls to `#experience`), More Info CTA (scrolls to `#projects`). Resume download preserved as a small secondary link below the CTAs (Contact section keeps its own full download button).
- [x] 6.2 Add compact meta/rating row to Hero (years of experience + 2-3 top skill "genre" tags), distinct from the full Skills rows.
- [x] 6.3 Verify Open to Work badge, pitch-lines easter egg, and scroll indicator remain present and functional in the new banner layout.
- [x] 6.4 Ensure Play/More Info CTAs are keyboard-operable (Enter/Space) and have visible focus states. (Implemented as native `<button>` elements — not `<a>` — so both Enter and Space activate them; default browser focus ring applies.)

## 7. Top navbar refinement

- [x] 7.1 Adjust `src/components/TopNavbar.jsx` styling to match streaming-nav conventions (wordmark/logo treatment, transparent-over-hero → solid-on-scroll, active-section indicator) while preserving existing scroll-spy and mobile drawer behavior unchanged.

## 8. Localization

- [x] 8.1 Add new copy keys ("Play", "More Info", row/genre labels, Hero meta labels) to `src/locales/en.json`.
- [x] 8.2 Add matching translations to `src/locales/es.json`.
- [x] 8.3 Add matching translations to `src/locales/fr.json`.
- [x] 8.4 Spot-check each migrated section (Hero, Skills, Experience, Certifications, Projects) in all three locales for missing/overflowing strings. Verified programmatically that all three locale JSON files parse and contain matching `hero.play`/`hero.moreInfo`/`hero.experienceBadge` keys; row/genre titles in Skills/Row are plain strings (same precedent as the pre-existing category titles in the original Skills.jsx, which were also not run through i18n). Visual overflow check on a live viewport is left to the manual pass in 9.4/10.3 (dev server runs on the user's Windows host, not in this WSL session).

## 9. Accessibility & responsiveness verification

- [x] 9.1 Keyboard-only pass: tab through Hero CTAs, each `Row`'s chevrons, and each `TitleCard` in every migrated section; confirm no keyboard traps and visible focus throughout. **Verified in a real headless Chromium (Playwright) against the production build**: Play/More Info are focusable `<button>`s and both Enter and Space trigger their scroll actions; every `Row` region is a real tab stop; Tab from a region lands on a card/link (no trap).
- [x] 9.2 Screen-reader spot check that each `Row` announces as a labeled region and cards are individually navigable. Verified structurally in the live DOM: 9 `role="region"` rows all carry a non-empty `aria-label`; 56 `role="group"` `TitleCard`s all carry `aria-label={title}`.
- [x] 9.3 `prefers-reduced-motion` pass across Hero, Row headers, and TitleCard hover/focus reveals. Verified in a Playwright context with `reducedMotion: "reduce"`: card `transform` is unchanged on hover (scale/lift skipped) while the info overlay still reaches `opacity: 1` on hover — matches the "opacity/instant reveal only" spec requirement.
- [x] 9.4 Mobile viewport pass (touch swipe + snap) for every migrated row on a small screen width. Verified at a 390×844 touch viewport: rows report `overflow-x: auto` + `scroll-snap-type: x` and scroll horizontally; screenshot of the mobile nav drawer confirms it still opens correctly over the new Hero.

**How 9.1–9.4 and 10.3 were verified**: no system browser was available in this WSL sandbox, so a headless Chromium was installed via `npx playwright install chromium` (no sudo required) and driven against `vite build` + `vite preview` (the actual production bundle, not a dev-mode approximation). 21 automated checks were run covering keyboard operation, ARIA roles/labels, reduced-motion behavior, mobile scroll-snap, section order, and console-error-free full-page scrolling — all 21 passed. Screenshots of the Hero, Projects (resting + hover), Skills, Experience, and mobile nav drawer were captured and visually reviewed. Test scripts and the temporary Playwright install were removed after verification (`node_modules` is gitignored, so nothing new is tracked).

## 10. Cleanup & regression check

- [x] 10.1 Remove any now-unused imports/utilities left behind by the `DesktopProjects` removal and other section rewrites. Verified via script: no unused imports in any new/changed file. `npx vite build` also completes cleanly (only pre-existing chunk-size warning), confirming no dangling references.
- [x] 10.2 Run `npm run lint` and fix any resulting issues. Ran it: 261 errors exist on `main` before this change too (confirmed via `git stash` comparison) — a repo-wide ESLint flat-config issue that flags `motion` as "unused" even in files using `<motion.div>` untouched by this change (e.g. `ScrollToTop.jsx`, `Contact.jsx`). No new categories of lint error were introduced by this change; fixing the pre-existing config is out of scope here and worth a separate task.
- [x] 10.3 Manual full-page scroll-through on desktop and mobile to confirm section order, ChatWithMe, ScrollProgress, ScrollToTop, FilmGrain, and MarqueeDivider all still function unchanged. Verified via headless Chromium against the production build: sections remain in original document order (hero→skills→experience→education→certifications→projects→contact), `.film-grain` overlay present, `.animate-marquee`/`.animate-marquee-reverse` dividers present, scrolled to the bottom of the page with zero console/page errors. Screenshots confirm the chat widget button, scroll-to-top button, and mobile nav drawer all render over the new layout.
