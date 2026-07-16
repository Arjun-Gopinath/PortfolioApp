## ADDED Requirements

### Requirement: Typography is applied via shared theme font tokens
The application SHALL define its two typefaces (Bebas Neue for display headings, Manrope for body text) as Tailwind theme font tokens (`font-display`, `font-body`), and every component SHALL set typeface exclusively via these utility classes or the page-wide default, rather than ad-hoc inline `style={{ fontFamily: ... }}` declarations.

#### Scenario: Display heading uses the shared token
- **WHEN** a component renders a Bebas Neue heading (section title, hero name, nav wordmark, marquee text, etc.)
- **THEN** the element carries the `font-display` utility class and no inline `fontFamily` style

#### Scenario: Body text uses the page-wide default
- **WHEN** a component renders standard body/UI text
- **THEN** the text inherits Manrope from the page-wide default (no per-component inline `fontFamily` override required)

#### Scenario: No duplicate font-family definitions
- **WHEN** the stylesheet is inspected
- **THEN** Bebas Neue is declared in exactly one place (the Tailwind `font-display` theme token) with no separate, redundant `.font-display`-style CSS rule defining the same typeface

### Requirement: Font tokens survive across locales and viewport sizes
The `font-display` / `font-body` tokens SHALL apply consistently regardless of active locale (en/es/fr) or viewport (mobile/desktop), since typography is a purely visual concern independent of content or layout branch.

#### Scenario: Locale switch does not change typeface
- **WHEN** a visitor switches the site language
- **THEN** headings remain in Bebas Neue and body text remains in Manrope, unchanged by the locale switch

#### Scenario: Mobile and desktop layout variants share the same typeface rules
- **WHEN** a section renders its mobile layout variant instead of its desktop variant (e.g., Education's stacked mobile view vs. its pinned desktop view)
- **THEN** both variants use the same `font-display`/`font-body` tokens with no divergence
