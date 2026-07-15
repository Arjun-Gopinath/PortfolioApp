## Why

The portfolio just shipped a "Director's Cut" cinematic revamp (film grain, marquee dividers, act labels, Bebas Neue title cards) that gives it a movie-set personality, but the *browsing pattern* is still a static single-column scroll. Streaming platforms (Netflix, Disney+, Hulu) have trained every visitor to expect a specific, highly legible interaction language — a full-bleed hero with a "play/more info" pair, horizontally-scrolling rows of cards grouped by category, hover-to-preview cards, and a top nav that darkens on scroll. Adopting that language turns the existing cinema *theme* into a cinema *product* — content (skills, experience, projects, certifications) becomes "titles" a recruiter can browse the way they browse a streaming catalog, which is more memorable and more navigable than a long scroll.

## What Changes

- Restyle `TopNavbar` as a streaming-service nav: logo-as-wordmark, primary nav items, profile-style "resume" avatar/menu, transparent-over-hero → solid-on-scroll gradient behavior (already partially present, refined to match streaming nav conventions).
- Rebuild `Hero` as a full-bleed streaming banner: large backdrop treatment, title, short logline/synopsis, a primary "Play" CTA (scrolls to Experience / opens resume) and a secondary "More Info" CTA (scrolls to Projects/About), age/experience "rating badge" style meta row (years of experience, top skills as genre tags).
- Convert `Skills`, `Experience`, `Certifications`, and `Projects` from vertical/pinned-scroll layouts into **horizontally-scrolling "rows"** (carousels) grouped by category (e.g., "Frontend", "Backend", "AI/ML" rows for skills; each job as a card in an "Experience" row; each project as a card in a "Continue Building" / "Projects" row), each row with a title-card header consistent with the existing cinematic title-card component.
- Add a reusable **`TitleCard`** component (streaming-style hover card): scales up on hover/focus, reveals a short synopsis, tags, and quick actions (e.g., link icons, "see more") — replacing the bespoke card markup duplicated today in `Projects.jsx`, `Certifications.jsx`, and `Skills.jsx`.
- Add a reusable **`Row`** component (horizontal scroll container with drag/scroll-snap, edge fade masks, and left/right chevron controls) used by every converted section.
- Preserve `Education`, `Contact`, `Footer`, `ChatWithMe`, `LoadingScreen`, `FilmGrain`, `ScrollProgress`, `MarqueeDivider`, `ActLabel` behaviorally — only restyle where needed to match the new row/card visual language (no new sections, no removed sections).
- Mobile: rows become native horizontal-scroll with momentum + snap (no drag library), preserving current mobile card-grid content but in single-row swipeable carousels instead of static grids.
- Update `en`/`es`/`fr` locale files with any new copy strings (e.g., "Play", "More Info", row/genre labels) — no existing string values change meaning.

## Capabilities

### New Capabilities
- `streaming-row-browsing`: horizontally-scrollable, category-grouped "row" browsing pattern (row header + card carousel + scroll controls) used to present Skills, Experience, Certifications, and Projects.
- `streaming-hero-banner`: full-bleed hero banner with Play/More Info CTAs and a "rating meta" row, replacing the current single-CTA hero layout.

### Modified Capabilities
- (none — no existing `openspec/specs/` capabilities exist yet for this repo; all portfolio UI behavior is being captured fresh under the two new capabilities above plus the sections listed under Impact.)

## Impact

- **Components rewritten**: `Hero.jsx`, `TopNavbar.jsx`, `Skills.jsx`, `Experience.jsx`, `Certifications.jsx`, `Projects.jsx`.
- **New shared components**: `Row.jsx` (horizontal carousel shell), `TitleCard.jsx` (hover-preview card), reusing existing `ActLabel`/section-title conventions for row headers.
- **Removed/replaced markup**: bespoke pinned-scroll layout in `Projects.jsx` (`DesktopProjects`), bespoke grid layouts in `Skills.jsx`/`Certifications.jsx`.
- **Styling**: extends existing Tailwind v4 + `motion.js` variants; no new CSS framework. Scroll-snap/drag uses native CSS (`scroll-snap-type`, `overflow-x: auto`) plus Framer Motion `drag="x"` — no new dependency.
- **i18n**: `en.json`, `es.json`, `fr.json` gain a handful of new keys (CTA labels, row headers); no structural schema change beyond additive keys.
- **No backend/API impact**: purely front-end presentational change; `ChatWithMe` edge function and resume download untouched.
- **Section order unchanged**: Hero → Skills → Experience → Education → Certifications → Projects → Contact remains the same; only the *within-section* layout changes to rows.
