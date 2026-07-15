## Purpose

Defines the streaming-service-style Hero banner: a full-bleed layout with title, logline, primary/secondary calls to action, a meta/rating summary row, preservation of existing functional elements, and full localization of any new copy.

## Requirements

### Requirement: Hero renders as a streaming-service banner with Play and More Info actions
The Hero section SHALL present a full-bleed banner layout with a title, a short logline/synopsis, and two primary calls to action styled after streaming-platform banners: a primary "Play" action and a secondary "More Info" action.

#### Scenario: Play action navigates to career content
- **WHEN** a visitor activates the "Play" call to action in the Hero
- **THEN** the page scrolls smoothly to the Experience section

#### Scenario: More Info action navigates to project content
- **WHEN** a visitor activates the "More Info" call to action in the Hero
- **THEN** the page scrolls smoothly to the Projects section

#### Scenario: Both actions remain keyboard-operable
- **WHEN** a keyboard-only visitor tabs to the "Play" or "More Info" control and presses Enter/Space
- **THEN** the corresponding scroll navigation occurs identically to a mouse click

### Requirement: Hero displays a meta/rating row
The Hero SHALL display a compact meta row (styled after a streaming content-rating/info row) summarizing at-a-glance credibility signals — such as years of experience and top skill "genre" tags — without duplicating the full skills list shown later in the page.

#### Scenario: Meta row shows summarized, non-duplicated content
- **WHEN** the Hero renders
- **THEN** the meta row shows a small, fixed number of summary tags/labels (e.g., years of experience, 2-3 top skill areas) distinct from the full, exhaustive skill rows rendered later in the Skills section

### Requirement: Hero preserves existing functional elements
All functional elements present in the current Hero (Open to Work badge, pitch-lines easter egg, scroll indicator, section anchor behavior) SHALL continue to work identically after the banner restyle.

#### Scenario: Open to Work badge still renders and links correctly
- **WHEN** the Hero renders in its new banner layout
- **THEN** the Open to Work badge is present and behaves exactly as it did before this change

#### Scenario: Scroll indicator still present
- **WHEN** a visitor loads the page and views the Hero before scrolling
- **THEN** a scroll indicator affordance is visible, consistent with pre-change behavior

### Requirement: Hero banner content is localized
Any new copy introduced for the Hero banner (e.g., "Play", "More Info", meta row labels) SHALL be present in all three supported locale files (en, es, fr) with equivalent meaning.

#### Scenario: Locale switch updates Hero banner copy
- **WHEN** a visitor switches the site language
- **THEN** the "Play"/"More Info" labels and meta row text update to the selected locale with no missing translation keys
