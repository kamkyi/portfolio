# Project Agent Instructions

## Project Identity
- This repository is a **professional portfolio website**.
- Prioritize polished UX, clear hierarchy, performance, and accessibility.
- Keep tone professional, concise, and credibility-focused (not overly casual).

## Visual Direction
- The UI direction is **Tesla-inspired** (minimal, premium, restrained, and confident).
- Keep layouts clean, high-contrast, and uncluttered.
- Prefer strong typography, generous whitespace, and simple geometry over decorative effects.
- Avoid noisy gradients, flashy neon effects, and excessive motion.

## Design System Rules (Must Follow)
- Do not introduce random spacing, radius, or colors.
- Reuse existing design tokens in `:root` and extend them only when needed.
- Keep visual rhythm consistent across all sections.

## Spacing And Padding
- Use a consistent scale based on the golden ratio (phi ~= 1.618).
- Preferred spacing steps (in px): `8, 13, 21, 34, 55, 89`.
- Use spacing tokens instead of raw values whenever possible.
- Inner padding should generally be one step smaller than outer margin/gap.
- Keep section vertical padding consistent between neighboring sections.

## Border Radius
- Use a consistent radius scale, also phi-based.
- Preferred radius steps (in px): `6, 10, 16, 26, 42`.
- Typical usage:
  - Small UI elements: `6-10px`
  - Cards/containers: `16-26px`
  - Pills/chips/buttons: `999px` only when intentionally pill-shaped

## Color Theory
- Keep the palette professional and cohesive.
- Follow the `60-30-10` balance with a Tesla-like neutral base:
  - `60%` neutral whites/grays
  - `30%` charcoal/black structure
  - `10%` restrained accent (only for CTA/highlight)
- Default to monochrome unless an accent is clearly justified.
- Ensure text/background contrast meets WCAG AA at minimum.
- Avoid adding new colors if an existing token can satisfy the need.

## Iconography
- Use **official Bootstrap Icons** only (`bi bi-*`).
- Do not mix icon libraries.
- Keep icon usage purposeful and consistent in weight/size.

## Typography And Layout Proportion
- Preserve clear hierarchy for headings, body text, and supporting labels.
- Use the golden ratio as guidance for type scale and major block proportions.
- Keep line lengths readable (roughly `45-75` characters for paragraphs).

## Component Consistency
- Buttons, cards, badges, inputs, and section headers should share consistent:
  - Padding logic
  - Radius scale
  - Shadow intensity
  - Transition timing
- If one component style changes, update peer components for consistency.

## Motion And Interaction
- Keep animations subtle and purposeful.
- Prefer smooth, understated transitions over attention-grabbing effects.
- Ensure hover/focus states are visible and consistent.

## Responsiveness And Accessibility
- Maintain strong presentation on mobile, tablet, and desktop.
- Use semantic HTML and preserve keyboard accessibility.
- Always include visible focus states for interactive elements.

## Implementation Notes
- Centralize tokens in `:root` in `styles.css`.
- Prefer editing existing classes before creating many one-off variants.
- Before finalizing UI changes, check spacing, alignment, contrast, and rhythm section-by-section.
