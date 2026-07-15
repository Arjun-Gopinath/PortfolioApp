## Context

The repo is a React 19 + Vite 5 + Tailwind v4 + Framer Motion 12 single-page portfolio, currently mid-way through a "cinematic revamp" (see `docs/PRD-cinematic-revamp.md`): dark canvas, Bebas Neue display type, amber/gold accent, film grain overlay, `ActLabel`/title-card section headers, and marquee dividers. This change layers a **streaming-service browsing pattern** on top of that visual language rather than replacing it — the film-poster/marquee aesthetic stays, but the layout mechanics (vertical scroll of static sections) become the horizontal "row" pattern used by Netflix/Disney+/Hulu.

Key existing constraints carried over from the cinematic PRD and still binding here:
- No new heavyweight dependencies (no swiper/embla/slick) — rows must be built with native CSS scroll-snap + Framer Motion `drag`.
- No video/large media assets.
- i18n (en/es/fr) must stay in sync for any new string.
- Section order (Hero → Skills → Experience → Education → Certifications → Projects → Contact) is unchanged; this is a within-section layout change plus two new shared components.
- `Projects.jsx` currently has a bespoke desktop "pinned scroll" implementation (`DesktopProjects`, scroll-driven `useScroll`/`useTransform`) that must be removed and replaced by the shared `Row`/`TitleCard` pattern — this is the biggest single removal.

## Goals / Non-Goals

**Goals:**
- Introduce two reusable primitives — `Row` (horizontal carousel shell) and `TitleCard` (hover-preview card) — used consistently across Skills, Experience, Certifications, and Projects.
- Give the Hero a streaming-banner layout: Play / More Info CTAs, meta/rating row.
- Keep interaction cost low: no drag library, no carousel dependency, works with mouse wheel (shift+scroll or trackpad horizontal), touch swipe, and chevron buttons for accessibility/keyboard.
- Preserve all existing functional behavior (i18n switching, resume download, chatbot, scroll-to-top, nav anchors, reduced-motion handling).

**Non-Goals:**
- No backend/data model changes; content still comes from `locales/*.json`.
- No redesign of `Education`, `Contact`, `Footer`, `LoadingScreen`, `FilmGrain`, `ChatWithMe` beyond token/visual touch-ups needed for consistency with rows (these keep their current layout shape).
- No video previews or autoplay media on card hover (true streaming-service video-preview-on-hover is explicitly out of scope — static/animated CSS only, consistent with the "no media assets" invariant).
- No server-driven personalization/recommendation logic — row contents are static, derived from existing locale data.

## Decisions

### 1. Build `Row` on native CSS scroll-snap, not a carousel library
**Decision**: `Row.jsx` wraps children in an `overflow-x-auto` flex container with `scroll-snap-type: x mandatory`, `scrollbar-width: none`, edge fade masks via `mask-image` gradients, and optional left/right chevron buttons that call `scrollBy({ left, behavior: "smooth" })`.
**Why**: Matches the existing "no new heavyweight dependencies" constraint from the cinematic PRD; native scroll-snap gives free momentum/touch behavior on mobile without JS; chevrons give keyboard/mouse users an explicit affordance.
**Alternatives considered**: `embla-carousel` (rejected — new dependency, overkill for ~4-8 items per row); Framer Motion `drag="x"` with manual bounds (rejected as primary mechanism — reinvents scroll physics poorly; kept only as a progressive enhancement if needed for desktop mouse-drag "grab" feel, layered on top of native scroll rather than replacing it).

### 2. `TitleCard` replaces bespoke card markup in Projects/Certifications/Skills
**Decision**: One `TitleCard.jsx` component with props (`title`, `subtitle`, `tags`, `accent`, `links`, `synopsis`) renders a fixed-aspect poster-style card that scales/lifts on hover/focus and reveals `synopsis` + `links` in an overlay, using the existing `cardAccents` gradient palette and `getTechColor`/tag-badge styling already in `Projects.jsx`.
**Why**: Removes triplicated card markup (today duplicated across `Projects.jsx` desktop+mobile, `Certifications.jsx`, `Skills.jsx`) and gives one place to keep hover/focus/reduced-motion behavior correct.
**Alternatives considered**: Per-section bespoke cards (status quo) — rejected, it's the exact duplication this change is meant to remove.

### 3. Skills becomes rows-by-category instead of a single grid/cloud
**Decision**: Group skills by the existing `FRONTEND`/`BACKEND`/`DATA`/`AI` categorization logic (already present as classifier sets in `Projects.jsx`, to be lifted into a shared `techCategories.js` util) into 3-4 `Row`s, each with a genre-style title ("Frontend", "Backend & APIs", "Data & ML").
**Why**: Reuses classification logic that already exists (currently only used for tech-badge coloring); turns an implicit taxonomy into visible row structure, which is the core "streaming catalog" metaphor.
**Alternatives considered**: Keep Skills as a single wrapped tag cloud — rejected, doesn't fit the row pattern and under-uses existing categorization.

### 4. Hero CTAs map to existing scroll/download actions, not new pages
**Decision**: "Play" scrolls to `#experience` (starts "watching" the career story) or triggers resume download (open question below); "More Info" scrolls to `#projects`. Both are anchor-based, consistent with current nav's anchor-scroll pattern — no routing library introduced.
**Why**: Zero new navigation/routing surface; consistent with SPA/anchor-scroll architecture already in place.

### 5. Mobile rows: same `Row` component, no separate mobile-only code path
**Decision**: Unlike the current `Projects.jsx` (which forks into `DesktopProjects` vs. a separate mobile grid), the new `Row`/`TitleCard` pair is responsive by default — same markup, native scroll-snap works identically on touch and desktop, card width changes via Tailwind responsive classes only.
**Why**: Eliminates the dual-implementation maintenance burden the current pinned-scroll `Projects.jsx` has; simplifies the diff and reduces future drift between mobile/desktop behavior.

## Risks / Trade-offs

- **[Risk] Native scroll-snap row + Framer Motion page-scroll animations (`whileInView`) can interact oddly (row cards animating in while user horizontally scrolls) → Mitigation**: row-level `whileInView` triggers only on the row container entering vertical viewport (existing pattern from `MarqueeDivider`/title-card reveal), not per-card; per-card hover/focus animation is independent of scroll-into-view.
- **[Risk] Removing `DesktopProjects`' pinned-scroll "chaptered" experience loses a distinctive interaction some visitors may have liked → Mitigation**: the row/hover-card pattern is itself the intended new signature interaction (streaming-catalog browsing); the `activeStep` dot-timeline concept can be preserved as row progress dots under a `Row` if design review wants it, but is not required.
- **[Risk] Horizontal scroll rows are a known accessibility pitfall (keyboard users, screen readers) → Mitigation**: `Row` renders a real horizontally-scrollable region with `tabIndex=0`, `role="region"` + `aria-label`, visible focus-visible chevron buttons, and each card remains a normal tab-stop; no `overflow: hidden` that traps content.
- **[Risk] Edge fade masks (`mask-image`) have inconsistent Safari support → Mitigation**: fall back gracefully (no mask = square edge, still functional) via `@supports (mask-image: ...)`.
- **[Trade-off] Losing the scroll-scrubbed "one project per 100vh" pinned section reduces total page scroll height on Projects — acceptable since the proposal's goal is faster, more familiar browsing over a cinematic set-piece.

## Migration Plan

1. Build `Row.jsx` and `TitleCard.jsx` in isolation (Storybook-less, but can be smoke-tested by temporarily mounting in `Projects.jsx`) — no visual change to other sections yet.
2. Migrate `Projects.jsx` first (highest-value, most duplicated code, existing bespoke pinned-scroll to retire) — replace `DesktopProjects` + mobile grid with a single `Row` of `TitleCard`s.
3. Migrate `Certifications.jsx`, then `Skills.jsx` (introducing shared `techCategories.js`), then `Experience.jsx`.
4. Restyle `Hero.jsx` banner + `TopNavbar.jsx` nav treatment last, since they're visually independent of the row work and easiest to verify in isolation.
5. Add/verify i18n keys across `en.json`/`es.json`/`fr.json` as each section migrates (not batched at the end) to keep locale files in sync per-commit.
6. No feature flag / rollback infra exists in this repo (static SPA deployed to Vercel) — rollback is a plain `git revert` of the merge commit if issues are found post-deploy.

## Open Questions

- Should "Play" on the Hero trigger resume download directly, or just scroll to Experience (with resume download remaining only in Contact/footer as today)? Default assumption: scroll-to-Experience, since immediate file download on a "Play" click could surprise users; resume download stays where it already is.
- Should the retired `activeStep` dot-timeline from `DesktopProjects` be preserved as an optional `Row` progress indicator, or dropped entirely in favor of native scrollbar-less scroll-snap? Default assumption: drop it, keep `Row` chevrons + snap as the only progress affordance, to avoid re-introducing the complexity being removed.
