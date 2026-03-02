# Copilot Instructions For This Repository

## Context
- This is a **professional portfolio website** built with HTML, CSS, and JavaScript.
- Generate production-quality, readable code that preserves a premium, professional visual style.
- Visual reference direction: **Tesla-inspired** (minimal, clean, high-contrast, premium).

## Required UI Standards
- Maintain **consistent spacing, padding, radius, and color usage**.
- Do not use random pixel values when a scale/token is available.
- Reuse and extend CSS variables in `:root` instead of hardcoding repeated values.

## Golden Ratio Rhythm
- Use phi-based spacing guidance (`~1.618`) for layout rhythm.
- Preferred spacing scale (px): `8, 13, 21, 34, 55, 89`.
- Preferred radius scale (px): `6, 10, 16, 26, 42`.
- Keep section spacing and component padding visually consistent across the page.

## Color Theory Rules
- Keep colors professional, restrained, and mostly neutral.
- Follow `60-30-10` distribution:
  - 60% neutral background tones
  - 30% dark structural tones
  - 10% accent for CTA/highlight only
- Avoid colorful or noisy palettes unless explicitly requested.
- Preserve accessible contrast (WCAG AA minimum for text).

## Icon Rules
- Use **Bootstrap Icons** (`bi bi-*`) as the only icon system.
- Do not introduce Font Awesome or mixed icon sets.
- Keep icon sizing and stroke weight consistent per section/component.

## Component Consistency
- Keep buttons, cards, badges, and form controls consistent in:
  - Spacing
  - Corner radius
  - Border and shadow weight
  - Interaction transitions
- Avoid introducing one-off styles unless explicitly requested.

## Layout And Accessibility
- Keep responsive behavior strong on mobile/tablet/desktop.
- Prefer semantic HTML and keyboard-accessible interactions.
- Always include clear hover and focus-visible states.

## Output Preferences
- Prefer minimal, targeted edits over broad rewrites.
- When adding styles, place them in existing structure and naming conventions.
- Keep code concise and maintainable; avoid unnecessary dependencies.
