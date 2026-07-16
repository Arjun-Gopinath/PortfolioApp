## MODIFIED Requirements

### Requirement: Category rows render as horizontally-scrollable carousels
The Skills, Experience, Certifications, and Projects sections SHALL each present their content as one or more `Row` components: a titled or unlabeled, horizontally-scrollable carousel of `TitleCard`s, instead of a static vertical grid or pinned-scroll layout. A `Row`'s visible title SHALL NOT duplicate the text of the section's own `<h2>` heading; a `Row` MAY render without a visible title (`showTitle={false}`) when the section heading already establishes context, but MUST still expose an accessible name via `aria-label`.

#### Scenario: Section renders multiple category rows
- **WHEN** a visitor scrolls to the Skills section on a desktop viewport
- **THEN** the section renders separate rows (e.g., "Frontend", "Backend & APIs", "Data & ML"), each with its own title-card header and its own horizontally-scrollable strip of skill cards

#### Scenario: Single-row section does not duplicate its own heading
- **WHEN** a visitor scrolls to the Experience, Certifications, or Projects section
- **THEN** the section's `<h2>` heading text appears exactly once on the page, and the `Row` beneath it renders without a duplicate visible title

#### Scenario: Row scrolls horizontally via chevron controls
- **WHEN** a visitor clicks the right chevron button on a row that has more cards than fit in the viewport
- **THEN** the row scrolls smoothly to reveal additional cards, and the left chevron becomes usable to scroll back

#### Scenario: Row scrolls via touch swipe on mobile
- **WHEN** a visitor on a touch device swipes horizontally across a row
- **THEN** the row scrolls with native momentum and snaps cards into alignment, without requiring any drag library

#### Scenario: Row is keyboard and screen-reader accessible
- **WHEN** a keyboard-only visitor tabs into a row
- **THEN** the row container is a reachable, labeled region (`role="region"` with an accessible name) and each card within it remains an individual tab stop, with visible focus indicators

#### Scenario: Titleless row still exposes an accessible region name
- **WHEN** a screen-reader user navigates to a `Row` rendered with `showTitle={false}`
- **THEN** the row's `region` landmark still announces a non-empty accessible name via `aria-label`

### Requirement: TitleCard reveals detail on hover or focus
Each card rendered inside a `Row` SHALL use the shared `TitleCard` component, which SHALL reveal additional detail (synopsis/description, tags, action links) on hover or keyboard focus, and SHALL remain fully readable in its resting (non-hovered) state. The resting state SHALL include a poster-like accent treatment (gradient wash and/or watermark glyph derived from the card's existing accent/icon props) rather than a flat, undifferentiated panel. The hover/focus detail overlay SHALL NOT display a visible scrollbar when its content overflows, on any browser or OS.

#### Scenario: Card reveals synopsis on hover
- **WHEN** a visitor hovers a `TitleCard` in the Projects row
- **THEN** the card scales/lifts slightly and reveals the project's description and link actions (e.g., GitHub, live demo) without navigating away from the page

#### Scenario: Card reveals synopsis on keyboard focus
- **WHEN** a keyboard user tabs onto a `TitleCard`
- **THEN** the same detail revealed on hover is revealed on focus, and is dismissed when focus moves away

#### Scenario: Card respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion` enabled
- **THEN** the hover/focus reveal still occurs but without scale/lift motion (opacity/instant reveal only)

#### Scenario: Overflowing overlay content shows no visible scrollbar
- **WHEN** a visitor hovers or focuses a `TitleCard` whose synopsis/bullets/links exceed the overlay's `max-height`
- **THEN** the remaining content is scrollable by mouse wheel, trackpad, or touch, but no browser scrollbar track or thumb is rendered inside the card

#### Scenario: Card reads as a poster at rest
- **WHEN** a `TitleCard` is rendered in its resting (non-hovered, non-focused) state
- **THEN** the card shows a visually distinct accent treatment (gradient wash and/or icon watermark) rather than a flat, uniform panel, while title text remains at or above WCAG AA contrast

### Requirement: Skills are grouped into category rows using existing tech taxonomy
The Skills section SHALL group individual skills into rows using the existing frontend/backend/data/AI classification already used for tech-badge coloring, exposed as a shared, reusable categorization utility.

#### Scenario: Skill appears in exactly one category row
- **WHEN** the Skills section renders
- **THEN** every skill listed in the locale data appears in exactly one row corresponding to its category, with no skill duplicated across rows and no skill omitted

### Requirement: Removed pinned-scroll Projects layout
The scroll-driven, pinned "chapter" layout previously used for desktop Projects (one project per full viewport height, advanced via scroll position) SHALL be removed and replaced by the row/card browsing pattern.

#### Scenario: Projects section height matches content, not scroll-step count
- **WHEN** a visitor scrolls past the Projects section
- **THEN** the section's height reflects normal document flow (row headers plus one or more horizontally-scrollable rows) rather than `projects.length * 100vh` of pinned scroll-jacked space
