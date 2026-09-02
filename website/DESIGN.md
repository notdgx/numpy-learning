---
version: alpha
name: notdgx-dark-developer-design-system
description: |
  Standalone dark-canvas developer website design system for notdgx. Preserve the useful visual
  vocabulary, spacing, typography hierarchy, component geometry, responsive behavior, and interaction
  patterns from the provided design analysis while removing all source-product identity, source-brand
  references, source legal/credit material, and pre-default third-party product showcases.
  The implementation is grayscale-first, gradient-blended, Phosphor-icon driven, keyboard-first,
  and includes grouped social links plus UPI donation interactions.

colors:
  primary: "#ffffff"
  primary-pressed: "#e8e8e8"
  on-primary: "#000000"
  ink: "#f5f5f5"
  body: "#d0d0d0"
  charcoal: "#c2c2c2"
  mute: "#9b9b9b"
  ash: "#6f6f6f"
  stone: "#4a4a4a"
  on-dark: "#ffffff"
  on-dark-mute: "rgba(255,255,255,0.72)"
  canvas: "#050505"
  surface: "#0a0a0a"
  surface-elevated: "#101010"
  surface-card: "#151515"
  button-fg: "#1b1b1b"
  hairline: "#262626"
  hairline-soft: "rgba(255,255,255,0.075)"
  hairline-strong: "rgba(255,255,255,0.16)"
  accent-blue: "#c9c9c9"
  accent-blue-soft: "rgba(255,255,255,0.08)"
  accent-red: "#bbbbbb"
  accent-red-soft: "rgba(255,255,255,0.08)"
  accent-green: "#d2d2d2"
  accent-green-soft: "rgba(255,255,255,0.08)"
  accent-yellow: "#dddddd"
  accent-yellow-soft: "rgba(255,255,255,0.08)"
  hero-stripe-start: "#3a3a3a"
  hero-stripe-end: "#090909"
  gradient-soft-start: "rgba(255,255,255,0.11)"
  gradient-soft-mid: "rgba(255,255,255,0.035)"
  gradient-soft-end: "rgba(0,0,0,0)"

typography:
  display-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0
    fontFeature: '"calt", "kern", "liga"'
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  heading-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  heading-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: 0
    fontFeature: '"calt", "kern", "liga"'
  heading-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  heading-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
    fontFeature: '"calt", "kern", "liga"'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
    fontFeature: '"calt", "kern", "liga"'
  body-strong:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
    fontFeature: '"calt", "kern", "liga"'
  body-sm-strong:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'
  caption-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.1px
    fontFeature: '"calt", "kern", "liga"'
  caption-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.4px
    fontFeature: '"calt", "kern", "liga"'
  link-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.3px
    fontFeature: '"calt", "kern", "liga"'
  button-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0.2px
    fontFeature: '"calt", "kern", "liga"'

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 16px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 36px
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 36px
  button-tertiary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 36px
  button-disabled:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ash}"
    rounded: "{rounded.md}"
  resource-action-button:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 6px 14px
  text-input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 36px
  text-input-focused:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
  resource-search-bar:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 44px
  command-palette-row:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 6px 10px
  command-palette-row-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
  pill-tab:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  pill-tab-active:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
  badge-neutral:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark-mute}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  badge-info-soft:
    backgroundColor: "{colors.accent-blue-soft}"
    textColor: "{colors.accent-blue}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.xs}"
    padding: 2px 8px
  command-palette-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 0px
  feature-card-dark:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  feature-card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  resource-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
  content-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  content-card-featured:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  hero-gradient-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.none}"
    padding: 96px 48px
  app-icon-tile:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    size: 48px
  app-icon-tile-large:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    size: 64px
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.none}"
    height: 56px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 64px 48px
  link-inline:
    textColor: "{colors.on-dark}"
    typography: "{typography.link-md}"
---


# notdgx Design System

## 0. Authority, priorities, and removal rules

This document is a standalone implementation specification for the notdgx website. Preserve the useful
visual tokens and structural ideas from the retained design analysis below, but the rules in Sections 0–18
are authoritative whenever any later inherited note conflicts with them.

### Remove or never introduce

- Any previous/reference/source brand name, wordmark, logo, favicon, legal identification, credits, or licensing text.
- Any source-brand URL, product ownership statement, or source-specific attribution.
- Any pre-populated third-party product showcase, pricing shell, store/resource area, or branded
  product-detail display that makes the site look like a separate company's product.
- Colored platform/social icons.
- Emoji anywhere in the interface.
- Custom decorative sliders, range sliders, scrubbers, slider-like cards, or oversized custom scroll controls.

Keep the design dark, grayscale-first, and visually integrated. Where two areas would otherwise create a
hard color boundary, use a soft grayscale gradient transition rather than adding a new accent color.

## 1. Identity and favicon

Creator: **notdgx**

GitHub: `https://github.com/notdgx/`

Contact email: `howdgx@gmail.com`

Favicon / compact icon:
`https://github.com/notdgx/assets/blob/main/logo/logo-circle.png`

Use the supplied icon for the browser favicon and compact icon contexts. **Do not display that logo next
to the `notdgx` title in the navbar.** The navbar title is text-only.

### Copyright attribution

Footer text must include:

`© 2026 notdgx. All rights reserved.`

No other source/reference legal or copyright text should appear.

## 2. Required links

| Platform | Username | Destination |
|---|---|---|
| GitHub | `notdgx` | `https://github.com/notdgx/` |
| YouTube | `notdgx` | `https://www.youtube.com/@notdgx` |
| YouTube | `howdgx` | `https://www.youtube.com/@howdgx` |
| Instagram | `notdgx` | `https://www.instagram.com/notdgx` |
| Instagram | `howdgx` | `https://www.instagram.com/howdgx` |
| X | `notdgxsh` | `https://x.com/notdgxsh` |
| Email | `howdgx@gmail.com` | `mailto:howdgx@gmail.com` |

All social/external web links open in a new tab:

```html
target="_blank"
rel="noopener noreferrer"
```

## 3. Phosphor Icons: grayscale only

Use **Phosphor Icons** for interface and platform icons:

`https://github.com/phosphor-icons/homepage`

Never use emoji. Platform icons must be grayscale and inherit the interface text color. Do not use colored
YouTube, Instagram, GitHub, or X marks. Use Phosphor menu, close, chevron, arrow, search, external-link,
copy, mail, donation, and platform icons wherever available.

## 4. Navbar

### 4.1 Structure

Desktop navbar:

- left: **text-only `python-learning` title** (Times NR MT font, bold + italic)
- center: primary page navigation (Home, Notes, Projects, Practice)
- center/right: `Links` dropdown
- right: GitHub Star badge, **text-only `Donate` CTA button (NO currency/rupee logo)**

Mobile navbar:
- left: `python-learning` brand title (scaled to `17px` on `< 480px`)
- right: GitHub star icon button, compact Donate CTA, and **3-line SVG hamburger menu button**

### 4.2 Donate Button Rule:
The primary Donate button in the navigation header must be a clean, styled button displaying text only:
```html
<button class="btn-primary nav-donate-btn">
  <span>Donate</span>
</button>
```
**Never attach a rupee (`₹` / `CurrencyInr`) or currency logo to the navbar donate button.**

### 4.3 Mobile Navigation Drawer:
When the 3-line hamburger menu is tapped on mobile viewports (`< 768px`), it opens a full-screen navigation overlay.
- **Portaling Invariant**: Must be rendered via `createPortal(drawer, document.body)` so it is never trapped or clipped inside parent containers with CSS `backdrop-filter`.
- Contains touch-friendly option items: Home, Notes Explorer, Projects, Practice, Links Directory, plus Donate and GitHub repository actions.
- Automatically closes upon tapping any link, pressing `Escape`, or switching routes.

### 4.4 Title typography

Use the supplied `Times NR MT Regular.otf` **only** for the navbar title.

```css
@font-face {
  font-family: "Times NR MT";
  src: url("/fonts/Times%20NR%20MT%20Regular.otf") format("opentype");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
```

The title is **bold and italic already at rest**. Hover/focus should not change its weight or style; it
should animate the underline from left to right.

```css
.site-title {
  position: relative;
  display: inline-block;
  font-family: "Times NR MT", serif;
  font-weight: 700;
  font-style: italic;
}

.site-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 180ms ease;
}

.site-title:is(:hover, :focus-visible)::after {
  transform: scaleX(1);
}
```

## 5. Links dropdown

`Links` automatically opens on hover and on keyboard focus. Its pointer path must remain continuously
connected to the menu. The menu must **not disappear when the pointer travels from the trigger to a row**.

Use a zero/dead-gap layout or an invisible hover bridge, plus a short close grace period. Do not use a
visual gap that breaks hit testing. Do not use `display:none` while transitioning out if that causes the
menu to vanish underneath the pointer.

Suggested interaction contract:

- hover trigger: open
- pointer over menu: stay open
- pointer leaves both trigger and menu: close after about 100–160ms
- re-enter before timer completes: cancel close
- keyboard focus inside menu: keep open
- Enter/Space: toggle/activate
- Arrow Down/Up: move through rows
- Home/End: first/last row
- Escape: close and return focus to `Links`
- click outside: close
- Tab: traverse real visible controls only

Rows must show only: **Phosphor platform icon + username**. Do not write the platform name beside the
username because the icon already identifies it.

Rows:

- YouTube icon + `notdgx`
- YouTube icon + `howdgx`
- Instagram icon + `notdgx`
- Instagram icon + `howdgx`
- X icon + `notdgxsh`
- GitHub icon + `notdgx`
- donation icon + `Donate via UPI` as the **final row**

The username/text is clickable. All web links open in a new tab.

### Hover-path implementation example

```css
.links-wrap { position: relative; }

.links-menu {
  position: absolute;
  top: calc(100% - 1px);
  left: 50%;
  transform: translate(-50%, -6px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease;
}

.links-menu::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -10px;
  height: 10px;
}

.links-wrap:is(:hover, :focus-within) .links-menu,
.links-menu[data-open="true"] {
  transform: translate(-50%, 0);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
```

## 6. Donation / UPI

Donation appears in all of these locations:

- navbar `Donate` button
- dedicated main-content donation block/card
- footer donation action
- final item in the `Links` dropdown

UPI ID:

`notdgx@upi`

Exact QR payload:

`upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR`

Do not modify the payload.

### 6.1 UPI hover/focus panel

Hovering or focusing the UPI donation row/button reveals a QR panel that **slides downward directly beneath the
UPI row**. The interaction must feel like a native part of this dark, grayscale UI rather than a generic browser
popover.

**Critical blur rule:** while the UPI QR panel is open, everything in the page background must become visually
blurred/softened **except the complete donation/link list itself**. The donation list, its rows, the UPI trigger, the QR
panel, all icons, usernames, and all text inside the list remain fully sharp and interactive.

Required visual stacking:

```text
base page / content
        ↓
full-page translucent grayscale backdrop + blur
        ↓
donation/link list and open UPI panel (sharp, interactive)
```

Implementation guidance:
- Place the backdrop between the page and the donation list rather than applying `filter: blur()` to the entire parent.
- Prefer `backdrop-filter: blur(...)` on the backdrop layer so the page behind it is softened without blurring the list.
- Add a restrained black/translucent wash to reduce contrast behind the list without changing the list itself.
- The list and UPI panel must be in a higher stacking context than the backdrop.
- Do not blur or dim the QR code, the UPI row, or any list item.
- The QR panel slides down 160–220ms with the same understated easing language used elsewhere.
- Pointer travel from the UPI row into the QR panel must not close the panel.
- Closing should occur only after leaving the complete interactive list/panel region, using a short close grace period.
- Hover and keyboard focus must produce the same visible state.
- Click/tap toggles the UPI panel on touch devices.
- `Esc` closes the panel and restores focus to the UPI trigger.
- `Arrow Up` / `Arrow Down` navigate list items while the donation list owns keyboard navigation.
- `Enter` / `Space` activates the focused item.
- `Tab` / `Shift+Tab` preserve a logical order through trigger, list, QR, and surrounding controls.

Do not replace this interaction with an always-open QR code. The intended behavior is specifically **hover/focus →
slide down → background blurs except the list → close on exit/Escape**.

### 6.2 Accessible markup example

```html
<div class="donation-list" data-donation-list>
  <button
    type="button"
    aria-expanded="false"
    aria-controls="upi-panel"
    aria-haspopup="dialog"
  >
    Donate via UPI
  </button>

  <div id="upi-panel" hidden>
    <p>UPI: <code>notdgx@upi</code></p>
    <div aria-label="UPI QR code">
      <!-- QR generated from the exact UPI URI -->
    </div>
  </div>
</div>
```

The QR panel must remain inside the same interactive region as its trigger so the pointer can travel downward without
closing it. Use `aria-expanded`, `aria-controls`, and appropriate dialog/menu semantics without introducing a browser-default
visual style.

No emoji.

## 7. Footer social grouping

Do **not** show two YouTube icons or two Instagram icons in the footer.

Show exactly:

- one YouTube icon → hover/focus reveals `notdgx` and `howdgx`
- one Instagram icon → hover/focus reveals `notdgx` and `howdgx`
- one X icon → `notdgxsh`
- one GitHub icon → `notdgx`
- one mail icon → `howdgx@gmail.com`

The collapsed footer should identify platforms by icons rather than repeated platform-name text.

The expanded group menus must retain the same continuous hover path rules as the navbar dropdown.

## 8. Footer visual layer and readability

Use the supplied Predictive Arc canvas in the footer exactly:

```tsx
import { PredictiveArcCanvas } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css"; 
 
export function Scene() { 
  return ( 
    <div className="shader-frame"> 
      <PredictiveArcCanvas 
        variant="ribbon-field" 
        speed={0.81} 
        pointerAmount={2.00} 
        smoothing={0.055} 
        hue={87} 
        saturation={1.00} 
        brightness={1.00} 
        opacity={1.00} 
      /> 
    </div> 
  ); 
}
```

Add a **black bottom-only gradient vignette**. It should be strongest at the bottom edge, fade upward,
and never block interaction.

```css
.footer-vignette {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 42%;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.34) 38%,
    rgba(0,0,0,0.82) 78%,
    #000 100%
  );
}
```

Footer content must stack above the vignette.

### 8.1 Footer text shadow

The footer text in the supplied visual is too easy to lose against the animated background. All headings,
links, muted text, and copyright text need a subtle **black shadow** for readability.

```css
.footer-heading,
.footer-link,
.footer-text,
.footer-meta {
  text-shadow:
    0 1px 2px rgba(0,0,0,0.95),
    0 2px 8px rgba(0,0,0,0.65);
}
```

This must read as legibility support, not as a glow.

## 9. Slider / range control styling

Do **not** use the ugly browser-default sliders shown in the reference screenshots. The instruction is not to ban
functional sliders; it is to prevent generic operating-system/browser slider chrome from breaking the visual language.

Whenever a real slider or range input is required, style it so it belongs to this dark grayscale design system:

- thin, compact rail using the existing near-black surface/hairline tones
- small rounded thumb using the same radius vocabulary as buttons and compact controls
- grayscale only; no bright browser-blue, purple, red, green, or orange accents
- use a subtle grayscale gradient or tonal merge between track, fill, and surrounding surface so there is no harsh color break
- hover, focus, active, and disabled states use the same surface ladder instead of platform-default colors
- focus remains clearly visible and keyboard-operable
- no oversized thumbs, thick rails, decorative neon fills, fake timeline bars, scrubbers, or giant slider tracks
- no custom horizontal slider used merely for decoration or page navigation
- do not replace ordinary scrolling with a fake slider

For purely visual section transitions or progress treatments, use the existing grayscale gradient language rather than a
functional-looking slider.

The goal is a **theme-matched slider**, not the default slider and not an over-designed custom widget.

## 10. Keyboard interaction: required everywhere

**Important: keyboard accessibility does not require visible shortcut indicators. Do not display any keyboard-command hints anywhere in the UI.**

The interface may be operated fully with the keyboard, but users must never see keycap badges, shortcut labels, shortcut legends, command-key indicators, or shortcut instructions beside controls. Keyboard operation is an accessibility behavior, not a visual decoration.

The entire website must be operable from the keyboard.

Required:

- Tab / Shift+Tab: complete predictable traversal
- Enter: activate links/buttons and open assigned controls
- Space: activate/toggle buttons and controls
- Arrow Up/Down: vertical menus/lists
- Arrow Left/Right: horizontal tab/navigation groups where assigned
- Home/End: first/last item in composite widgets
- Escape: dismiss the active popup/menu/drawer/dialog/overlay

### 10.1 Escape from text inputs

Escape must still work when focus is inside a text box. It should dismiss the current temporary popup,
overlay, suggestion list, or focus mode when one owns the event. It must not submit the form, unexpectedly
lose typed content, or navigate away. When nothing owns Escape, it may clear temporary focus UI without
destroying user data.

### 10.2 Focus restoration

When a popup/menu/drawer closes:

1. close it
2. restore focus to the opening trigger
3. ensure the trigger remains visible and enabled
4. never leave focus on a hidden/disconnected node

Use a visible `:focus-visible` treatment on every interactive element.

```css
:focus-visible {
  outline: 1px solid rgba(255,255,255,0.55);
  outline-offset: 3px;
}
```

## 11. Hover and focus parity

Anything accessible on hover must also be accessible on keyboard focus. Hover must never be the only path
to critical actions or content.

Dropdowns must remain open when the pointer travels to them; avoid the disappearing-menu problem by using
a connected hit region and a short close delay.

## 12. Search and form behavior

Use real accessible form controls. Avoid fake text inputs.

Search:

- visible/programmatic label
- focus-visible styling
- Enter submits
- Escape dismisses an overlay or suggestion surface
- Arrow keys navigate suggestions when suggestions exist

Do not use range sliders for search filters; use tabs, buttons, checkboxes, or compact chips.

## 13. Gradient blending / color transitions

The UI should read as one integrated dark grayscale environment. Do not place isolated hard color patches
where a blended neutral gradient can achieve the same separation.

Recommended transition:

```css
background: linear-gradient(120deg,
  rgba(255,255,255,0.03),
  rgba(255,255,255,0.012) 45%,
  rgba(0,0,0,0) 100%);
```

Recommended divider:

```css
background: linear-gradient(90deg,
  rgba(255,255,255,0),
  rgba(255,255,255,0.12),
  rgba(255,255,255,0));
```

Keep the gradients subtle. They should merge tones rather than look like hard colored decorations.

## 14. No pre-default product showcase

The site must not boot with an unrelated or separate product identity. Remove any pre-default section that
shows another brand, product name, company, store, pricing plans, third-party marketplace, extension list,
or product-specific feature marketing.

When the site needs cards, populate them with actual notdgx content. When data is unavailable, render a
clean empty state or omit the section; do not fill it with invented products/brands.

## 15. Responsive behavior

Retain the useful responsive structure from the original design analysis, with the priority interaction
changes above.

| Breakpoint | Width | Behavior |
|---|---:|---|
| ultrawide | 1920px+ | max-width content with generous outer gutters |
| desktop-large | 1440px | full navbar and multi-column footer |
| desktop | 1280px | full desktop structure with tighter gutters |
| desktop-small | 1024px | reduce density while preserving keyboard order |
| tablet | 768px | mobile navigation/drawer, stacked sections |
| mobile | 480px | single-column content and stacked footer groups |
| mobile-narrow | 320px | tighter padding and no horizontal slider UI |

## 16. Footer content structure

A multi-column footer may be retained, but its copy must be notdgx-specific. Suggested group roles:

- Product / site area
- Core Features / site capabilities
- Resources / actual site resources
- Company / About notdgx, Design System, Manifesto, Contact
- Community / grouped social icons
- By notdgx / creator note, Donate, copyright

Do not invent filler brands or products.

## 17. Accessibility and motion

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

The Predictive Arc may be paused or replaced by a static neutral background for reduced-motion users.
Dropdowns and QR panels may switch to immediate visibility changes.

## 18. Acceptance checklist

- [ ] Identity is `notdgx`.
- [ ] Favicon uses `https://github.com/notdgx/assets/blob/main/logo/logo-circle.png`.
- [ ] Navbar title is text-only; no logo beside it.
- [ ] Navbar title uses Times NR MT only.
- [ ] Navbar title is bold italic at rest.
- [ ] Hover/focus animates the underline left-to-right.
- [ ] Links menu opens on hover/focus.
- [ ] Pointer path from Links trigger to menu never causes disappearance.
- [ ] Links rows use icon + username only; no written platform names.
- [ ] Donate is in navbar, main content, footer, and final Links-menu row.
- [ ] UPI ID is exactly `notdgx@upi`.
- [ ] QR payload is exactly `upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR`.
- [ ] UPI QR slides down on hover/focus and background softens/blurs.
- [ ] While the UPI QR is open, everything behind the donation list is blurred/softened, while the entire donation list and QR remain perfectly sharp and interactive.
- [ ] QR remains crisp and readable.
- [ ] Footer has one YouTube icon and one Instagram icon; each expands to two usernames.
- [ ] X, GitHub, and mail each use one grayscale Phosphor icon.
- [ ] No emoji exists anywhere.
- [ ] No colored platform icons exist.
- [ ] Footer text remains readable with subtle black text-shadow.
- [ ] Footer contains the exact Predictive Arc scene code.
- [ ] Footer has a black bottom-only gradient vignette.
- [ ] Copyright is `© 2026 notdgx. All rights reserved.`
- [ ] Contact email is `howdgx@gmail.com`.
- [ ] External links use `target="_blank"` and `rel="noopener noreferrer"`.
- [ ] Escape closes every relevant menu, popup, drawer, overlay, and form surface.
- [ ] Escape still behaves correctly while focus is in a text input.
- [ ] Arrow keys navigate relevant composite widgets.
- [ ] Every interactive element has a visible focus treatment.
- [ ] Any required sliders use the grayscale theme-matched control treatment and never the ugly browser-default appearance.
- [ ] No unrelated pre-default product showcase is present.
- [ ] Hard chromatic transitions are replaced by subtle grayscale gradients.
- [ ] Reduced-motion behavior is implemented.

## Overview

notdgx's website reads like an extended product screenshot. The chrome IS the in-product command palette at marketing scale: pure near-black canvas (`{colors.canvas}` — `#050505`), hairline 1px borders (`{colors.hairline}` — `#262626`), command-palette-style cards with rounded corners between 6 and 16px, Inter typography with standard kerning, ligatures, and contextual alternates enabled (a single character — the alternate `g` — that gives the site's typography its signature subtle distinction), a white primary action treatment, and small neutral tonal differences reserved for category illustrations.

The system has effectively one surface mode — dark — with a faint three-step surface ladder (`{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}`) carrying cards, in-card panels, and key-cap glyph backgrounds. The signature decorative moment is a **neutral diagonal gradient band** across the very top of the home page hero, used as a launch-banner motif behind the headline (the only time saturated red appears on chrome). Beyond that single moment, color in the chrome is reserved for category accents inside resource and feature illustrations: community resources yellow, messaging resources red, productivity resources green, info blue.

The design philosophy is "the marketing page is the product." Section rhythm is generous (`{spacing.section}` 96px) but the page never breaks tonal continuity — the whole site sits in one continuous dark mode, full-bleed product UI screenshots show the site's site-specific interface surfaces, and the typography ligature settings (``) are inherited from the in-product app's text rendering.

**Key Characteristics:**
- Single dark surface mode with a 4-step surface ladder: `{colors.canvas}` (#050505) → `{colors.surface}` (#0a0a0a) → `{colors.surface-elevated}` (#101010) → `{colors.surface-card}` (#151515)
- White CTA pill (`{colors.primary}` — #ffffff) is the universal primary action; everything else is monochrome dark
- Inter typography with standard kerning and ligatures enabled; do not require proprietary or stylistic-set features
- Hairline 1px borders (`{colors.hairline}` — #262626) carry every card edge; there are no decorative drop shadows in the system
- Multi-radius card vocabulary: `{rounded.sm}` (6px) for compact controls and small tags, `{rounded.md}` (8px) for buttons and small cards, `{rounded.lg}` (10px) for feature cards, `{rounded.xl}` (16px) for hero command-palette mockup containers
- Saturated category accents (`{colors.accent-yellow}` for community resources, `{colors.accent-red}` for messaging resources/platform resources, `{colors.accent-green}` for productivity tools, `{colors.accent-blue}` for info) appear only inside resource tile imagery — never on chrome
- Signature neutral diagonal gradient band at the very top of the hero — three angled stripes in `{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`, used once per page maximum

## Colors

> **Source pages:** `/` (home), `/resource` (resource marketplace), `/core-features/ai` (feature page), `/content` (plan tiers), `/thomas/hacker-news` (single resource detail). The retained visual vocabulary uses the same dark surface ladder, hairline borders, white CTA, and standard Inter typography throughout.

### Brand & Accent
- **White** (`{colors.primary}` — `#ffffff`): the universal primary CTA pill background. "Primary action" / "Open resource" / "Primary action" — every primary action carries it.
- **White Pressed** (`{colors.primary-pressed}` — `#e8e8e8`): pressed-state for the primary pill — a single notch dimmer.
- **On Primary** (`{colors.on-primary}` — `#000000`): pure black text on the white CTA — the only place black appears as text in the system.

### Surface
- **Canvas** (`{colors.canvas}` — `#050505`): pure-near-black page background. The dominant surface across every page.
- **Surface** (`{colors.surface}` — `#0a0a0a`): card and elevated panel background — one notch lighter than canvas.
- **Surface Elevated** (`{colors.surface-elevated}` — `#101010`): button-tertiary fill, text-input fill, resource-search-bar fill, pill-tab-active fill.
- **Surface Card** (`{colors.surface-card}` — `#151515`): app-icon-tile background, compact-control fill, command-palette row hover.
- **Button FG (in-card)** (`{colors.button-fg}` — `#18191a`): rare deep-card variant used inside featured content tier card backgrounds.
- **Hairline** (`{colors.hairline}` — `#262626`): the universal 1px card border. Carries every card edge across every page.
- **Hairline Soft** (`{colors.hairline-soft}` — `rgba(255,255,255,0.08)`): even fainter border on translucent over-image overlays.
- **Hairline Strong** (`{colors.hairline-strong}` — `rgba(255,255,255,0.16)`): stronger 1px divider where a regular hairline reads as too soft.

### Text
- **Ink** (`{colors.ink}` — `#f4f4f6`): primary headlines on dark canvas. Slightly off-white for tonal coherence with the near-black background.
- **Body** (`{colors.body}` — `#d0d0d0`): default paragraph text and inline-link color.
- **Charcoal** (`{colors.charcoal}` — `#c2c2c2`): subtly brighter body where ink reads too soft.
- **Mute** (`{colors.mute}` — `#9b9b9b`): metadata, footer link text, secondary captions.
- **Ash** (`{colors.ash}` — `#6f6f6f`): disabled-state text, lowest-emphasis utility.
- **Stone** (`{colors.stone}` — `#4a4a4a`): least-emphasis caption text and disabled icon color.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): interactive-state primary text (button label, focused tab).
- **On Dark Mute** (`{colors.on-dark-mute}` — `rgba(255,255,255,0.72)`): translucent secondary text on dark surfaces.

### Semantic
- **Accent Blue** (`{colors.accent-blue}` — `#c9c9c9`) + **Soft** (`{colors.accent-blue-soft}` — `rgba(255,255,255,0.08)`): info and informational badge — used inside feature illustrations and the rare "New" pill.
- **Accent Red** (`{colors.accent-red}` — `#bbbbbb`) + **Soft** (`{colors.accent-red-soft}` — `rgba(255,255,255,0.08)`): destructive/error indicator + messaging resources/platform resources category accent in resource illustrations.
- **Accent Green** (`{colors.accent-green}` — `#d2d2d2`) + **Soft** (`{colors.accent-green-soft}` — `rgba(255,255,255,0.08)`): success state + productivity category accent in resource illustrations.
- **Accent Yellow** (`{colors.accent-yellow}` — `#dddddd`) + **Soft** (`{colors.accent-yellow-soft}` — `rgba(255,255,255,0.08)`): "warning" semantic + the community resources orange-yellow that appears as the most prominent accent illustration on the home page hero.

### Brand Gradient
- **Neutral Hero Gradient** — three diagonal red stripes layered across the very top of the home page hero, fading from `{colors.hero-stripe-start}` (`#3a3a3a`) to `{colors.hero-stripe-end}` (`#090909`). The system's only chromatic gradient on chrome — used once per page maximum and reserved for hero launch-banner moments.

## Typography

### Font Family
**Inter** is the system's primary face, loaded with the `Inter Fallback` system fallback variant. Critically, the site enables `font-feature-settings: "calt", "kern", "liga"` site-wide — the typography feature configuration swaps in Inter's alternate `g` glyph (single-story open `g`), which is the brand's signature typographic detail. Standard ligatures (`liga`), kerning (`kern`), and contextual alternates (`calt`) are also active. The display tier additionally enables `` and `` and disables standard `liga` to render the hero "the site Featured" wordmark with its distinctive geometric construction.

There is no monospace face used outside of inline `<code>` chips in documentation; the marketing pages use Inter for everything.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 600 | 1.1 | 0 | Hero "Built for the perfect tools" / "The new way to..." headline (with `liga: 0`, ``, ``) |
| `{typography.display-lg}` | 56px | 500 | 1.17 | 0.2px | Section headline ("Explore", "Content", resource hero "Resources") |
| `{typography.heading-xl}` | 24px | 500 | 1.6 | 0.2px | Sub-section heading, content-tier name |
| `{typography.heading-lg}` | 22px | 500 | 1.15 | 0 | Mid-section feature heading |
| `{typography.heading-md}` | 20px | 500 | 1.4 | 0.2px | Card group title, in-card heading |
| `{typography.heading-sm}` | 18px | 500 | 1.4 | 0.2px | Small heading, resource card title |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0 | Content tier description, hero subtitle |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default body, paragraph text |
| `{typography.body-strong}` | 16px | 500 | 1.4 | 0.2px | Inline emphasis, primary nav link |
| `{typography.body-sm}` | 14px | 400 | 1.6 | 0 | Card description, secondary copy |
| `{typography.body-sm-strong}` | 14px | 500 | 1.6 | 0.2px | In-card label, table-header text |
| `{typography.caption-md}` | 13px | 400 | 1.4 | 0.1px | Caption, metadata |
| `{typography.caption-sm}` | 12px | 400 | 1.5 | 0.4px | Smallest utility text, badge label |
| `{typography.link-md}` | 16px | 500 | 1.4 | 0.3px | Inline body anchor link |
| `{typography.button-md}` | 14px | 500 | 1.6 | 0.2px | Standard button label |

### Principles
The hierarchy works on a 1.6-line-height ladder for body and a 1.1–1.4 ladder for display/heading. Letter-spacing is consistently positive (0.1–0.4px) — slightly opening the type — which gives the site's chrome an airy quality at body sizes despite the dark canvas. Typography should remain clean and consistent without requiring special stylistic substitutions.

### Note on Font Substitutes
Inter is open-source and Google-Fonts-hosted; load it directly. To preserve the brand's signature look, you must enable `font-feature-settings: "calt", "kern", "liga"` on the body element. Without ``, the typography is recognizably "Inter default" rather than "the site." On systems where Inter cannot be loaded, the documented fallback is `Inter Fallback` (a self-hosted variant) → `system-ui`. **JetBrains Mono** or **Geist Mono** are acceptable substitutes for inline code chips when needed, though the site's marketing chrome rarely uses code-styled text.

## Layout

### Spacing System
- **Base unit:** 8px (with 2/4/12px steps for tight inline gaps).
- **Tokens (front matter):** `{spacing.xxs}` (2px) · `{spacing.xs}` (4px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (16px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.section}` (96px).
- **Universal section rhythm:** every page in the set uses `{spacing.section}` (96px) as the vertical gap between major content blocks. Card grids use `{spacing.lg}` (16px) gutters; in-card padding sits at `{spacing.xl}` (24px) for feature cards and `{spacing.lg}` (16px) for resource resource cards.

### Grid & Container
- **Max width:** ~1240px content area at desktop with 24px gutters (~48px at ultrawide). Hero command-palette mockups run wider (~1080px) with the page background extending to full bleed.
- **Resources resource grid:** 2-up at desktop with rows of 2 cards stacked, collapsing to 1-up at mobile. Each card is a horizontal layout with a large square app icon at the left and copy + Install button at the right.
- **Content tier grid:** 3-up at desktop (Free / Featured / Advanced content), collapsing to 1-up stacked at mobile.
- **Featured resource card grid:** 3-up at desktop in the "Featured" row at the top of the resource page.
- **Comparison table:** full-width on the content page below the tier cards — 5-column table (Free / Featured / Advanced AI / Custom / Extended) with feature rows.
- **Footer:** 6-column horizontal link grid at desktop, collapsing to 2-up at tablet and 1-up at mobile.

### Whitespace Philosophy
Whitespace is generous and the canvas is uninterrupted. Sections sit 96px apart with no decorative dividers between them — the dark canvas continues edge-to-edge from hero to footer. Inside a section, content is left-aligned in a tight column, with command-palette mockup imagery occupying the right 50–60% of the band on home-page feature rows. The signature decorative element — the neutral diagonal gradient band — only appears in the very first hero band; from the second section down, the page is monochrome dark.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Default for canvas-on-canvas blocks, hero text, footer body |
| 1 — Hairline border | 1px solid `{colors.hairline}` (#262626) | Every card on `{colors.surface}`, resource resource card, content tier card |
| 2 — Hairline strong | 1px solid `{colors.hairline-strong}` | Stronger inline divider, table-row separator on the comparison table |
| 3 — Surface ladder elevation | `{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}` | Multi-step background-color ladder used to create elevation without shadows |

The system has no drop-shadow elevation at all. Depth is built entirely from the surface-color ladder: each notch lighter on the dark scale reads as one step closer to the viewer.

### Decorative Depth
Depth comes from product imagery and a single stripe-gradient band:
- **Hero stripe gradient** — three diagonal red stripes (`{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`) layered across the home-page hero band, evoking a launch-banner / motion-blur effect. The system's signature decorative moment.
- **Command-palette mockups** — full-fidelity the site in-product UI screenshots (the actual Spotlight-style overlay with rounded controls, command rows, and accent-color glyphs) sitting inside the home-page hero and feature rows. These ARE the brand decoration.
- **App icon tiles** — small 48–64px rounded-corner tiles displaying site-specific neutral icons (messaging resources, media resources, design resources, knowledge resources, productivity resources, community resources) inside resource and feature illustrations.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Hero band, primary nav, footer, full-bleed structural surfaces |
| `{rounded.xs}` | 4px | Badge chips, small inline tags |
| `{rounded.sm}` | 6px | Command-palette row, inline buttons, micro chips |
| `{rounded.md}` | 8px | Standard buttons, text inputs, resource search bar, app-icon tiles, resource resource card |
| `{rounded.lg}` | 10px | Feature card, command-palette mockup card, content tier card |
| `{rounded.xl}` | 16px | Large hero command-palette mockup container, oversized feature panel |
| `{rounded.full}` | 9999px | Pill-tab chips, avatar circles |

The radius vocabulary clusters tightly between 4 and 16px, with most chrome at 6–10px. The system never goes flat (0px) on cards and never above 16px except for fully-rounded pills.

### Photography Geometry
There is no traditional photography. Visual elements are limited to:
- **Command-palette mockups** — full-fidelity the site UI screenshots at 16:9 or 4:3 aspect inside `{rounded.xl}` (16px) containers.
- **App icon tiles** — 48–64px square at `{rounded.md}` (8px), displaying site-specific neutral icons.
- **Avatar circles** — 32–40px at `{rounded.full}` for in-resource author attribution.
- **Hero stripe gradient** — full-bleed wash with no aspect ratio.

## Components

> **No hover states documented** per system policy. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`** — the universal the site CTA
- Background `{colors.primary}` (white), text `{colors.on-primary}` (black), type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Used for "Primary action" (sticky top-nav CTA), "Primary action", "Install" — every primary action across every surface.
- Pressed state lives in `button-primary-pressed` — background dims to `{colors.primary-pressed}`.

**`button-secondary`** — transparent text button
- Background transparent, text `{colors.on-dark}`, type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Lower-emphasis action: "Sign in" (top nav), "Learn more →", "View on GitHub".

**`button-tertiary`** — soft surface button
- Background `{colors.surface-elevated}`, text `{colors.on-dark}`, type `{typography.button-md}`, padding `8px 16px`, height ~36px, rounded `{rounded.md}`.
- Mid-emphasis: "Watch demo", "View resource", "Manage" buttons inside cards.

**`button-disabled`**
- Background `{colors.surface-elevated}`, text `{colors.ash}` — dim utility state.

**`install-button`** — the resource-page install pill
- Background transparent with 1px solid `{colors.hairline-strong}` border, text `{colors.on-dark}`, type `{typography.button-md}`, padding `6px 14px`, rounded `{rounded.md}`.
- Sits at the right edge of every resource resource card with the label "Open resource".

### Filter & Tab Chips

**`pill-tab`** + **`pill-tab-active`** — small filter chip strip
- Default: transparent background, text `{colors.body}`, type `{typography.body-sm}`, padding `4px 10px`, rounded `{rounded.full}`.
- Active: background flips to `{colors.surface-elevated}`, text `{colors.on-dark}` — the chip "lifts" by one surface notch.
- Used in the resource filter row ("All Extensions", "Recently Added", "Most Popular") and similar segmented controls.

**`badge-pro`** — small Featured/Plan label
- Background `{colors.surface-elevated}`, text `{colors.on-dark-mute}`, type `{typography.caption-sm}`, padding `2px 6px`, rounded `{rounded.xs}`.
- Inline "Featured" / "Advanced" / "Free" tier indicators on content tier cards.

**`badge-info-soft`** — translucent info chip
- Background `{colors.accent-blue-soft}`, text `{colors.accent-blue}`, type `{typography.caption-sm}`, padding `2px 8px`, rounded `{rounded.xs}`.
- Rare "New" / "Beta" inline tag.

### Inputs & Forms

**`text-input`** + **`text-input-focused`**
- Default: background `{colors.surface-elevated}`, text `{colors.on-dark}`, 1px solid `{colors.hairline}`, type `{typography.body-md}`, padding `8px 12px`, height ~36px, rounded `{rounded.md}`.
- Focused: same surface; 1px border becomes `{colors.hairline-strong}` — a subtle brightening rather than a colored ring.

**`resource-search-bar`** — the resource-page search field
- Background `{colors.surface-elevated}`, text `{colors.on-dark}`, type `{typography.body-md}`, padding `10px 16px`, height ~44px, rounded `{rounded.md}`.
- Sits at the top of the resource page hero with a magnifier icon at the left and "Search the resource..." placeholder. Slightly taller than the standard `text-input`.

### Cards & Containers

**`command-palette-card`** — the home-page hero command-palette mockup
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding 0 (the mockup contents fill the card), rounded `{rounded.lg}` or `{rounded.xl}` depending on hero size.
- Layout: top header strip with macOS traffic-light dots + a search input row, body with a vertical stack of `{component.command-palette-row}` items, bottom-right empty utility area.

**`command-palette-row`** + **`command-palette-row-active`** — single row inside the command palette
- Default: transparent background, text `{colors.on-dark}` in `{typography.body-md}`, padding `6px 10px`, rounded `{rounded.sm}`.
- Active: background `{colors.surface-card}` (one notch lighter than the surrounding palette card) — the selection state.
- Each row contains a small app-icon tile + label. Do not add keyboard-keyboard interaction hint badges or key glyphs.

**`feature-card-dark`** — standard product feature card
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.xl}` (24px), rounded `{rounded.lg}`.
- Used in 2- or 3-up grids on home and feature pages — pairs a small product mockup or app-icon row with body copy and a "Learn more →" `{component.button-secondary}`.

**`feature-card-elevated`** — slightly-elevated variant
- Same chrome as `feature-card-dark` but background flips to `{colors.surface-elevated}` — used to break visual rhythm in alternating feature rows.

**`resource-resource-card`** — resource-page resource card
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.lg}` (16px), rounded `{rounded.md}`.
- Layout: 48px `{component.app-icon-tile}` at left, vertical stack of name + by-author metadata + 1-line description in the center, `{component.install-button}` at the right edge.

**`content-tier-card`** — content plan card (default tier)
- Container: background `{colors.surface}`, 1px solid `{colors.hairline}`, padding `{spacing.xl}` (24px), rounded `{rounded.lg}`.
- Layout: tier name in `{typography.heading-xl}` (24px), price in larger numeric in `{typography.display-lg}`, body description in `{typography.body-lg}`, CTA `{component.button-primary}` (or `{component.button-secondary}` for free tier), feature checklist with `✓` glyphs.

**`content-tier-card-featured`** — middle "Featured" featured tier
- Same chrome but background flips to `{colors.surface-elevated}` (one notch lighter) — the only visual cue distinguishing the featured tier from the surrounding cards.

**`hero-stripe-band`** — home-page hero with red stripe gradient
- Background `{colors.canvas}` with three diagonal red stripes layered across the top half (`{colors.hero-stripe-start}` → `{colors.hero-stripe-end}`).
- Padding `{spacing.section}` 96px vertical / 48px horizontal, rounded `{rounded.none}`.
- Carries the hero headline in `{typography.display-xl}` and a single `{component.button-primary}` "Primary action" CTA.

### Decorative

**`app-icon-tile`** — small 48px square app icon
- Background `{colors.surface-card}`, padding 0 (icon fills the tile), rounded `{rounded.md}`, size 48×48.
- Used in command-palette rows and resource resource cards.

**`app-icon-tile-large`** — 64px feature variant
- Same but at 64×64. Used in featured resource cards and home-page hero illustration rows.

### Navigation

**`primary-nav`**
- Background `{colors.canvas}`, text `{colors.on-dark}`, height ~56px, type `{typography.body-sm-strong}`, rounded `{rounded.none}`, with a 1px `{colors.hairline}` bottom rule.
- Layout (desktop): the site wordmark at left, centered nav cluster ("Featured · AI · Resources · Manual · Changelog · Blog · Content"), right cluster (Sign in link + the always-white `{component.button-primary}` "Primary action" CTA pill).

**Top Nav (Mobile)**
- Hamburger menu icon at left, the site wordmark at center, "Primary action" white CTA pill at right. Primary nav collapses into a full-screen drawer that slides from the left.

### Footer

**`footer-section`**
- Background `{colors.canvas}`, text `{colors.body}` in `{typography.body-sm}`, padding `64px 48px`, with a 1px `{colors.hairline}` top rule.
- Layout: 6-column horizontal link grid (Featuredduct · Core Features · Top Extensions · Company · Community · By the site) with column headers in `{typography.body-sm-strong}` `{colors.on-dark}` and link lists in `{typography.body-sm}` `{colors.body}`.
- Bottom row: small the site wordmark + a subscribe contact/input field with `{component.button-primary}` "Subscribe" at the right.
- The very top of the footer band has a faint neutral stripe-gradient repeat — a smaller echo of the hero's diagonal stripe motif.

### Inline

**`link-inline`** — body-prose anchor link
- `{colors.on-dark}` text with no underline by default; underlines on focus. Inline body links are full-white rather than a tinted accent color, which keeps the dark canvas tonally pure.

## Do's and Don'ts

### Do
- Keep all keyboard behavior invisible in the visual UI: users can navigate with the keyboard, but controls must not advertise key combinations.
- Render the entire site in one continuous dark mode. There is no light variant in the system.
- Use `{colors.primary}` (white pill) for every primary CTA. There is no second primary color — white IS the brand action.
- Build elevation from the surface-color ladder (`{colors.canvas}` → `{colors.surface}` → `{colors.surface-elevated}` → `{colors.surface-card}`), never from drop shadows.
- Enable `font-feature-settings: "calt", "kern", "liga"` on the body element. The  alternate `g` is part of the brand identity.
- Anchor a `{component.command-palette-card}` mockup as the hero's load-bearing visual. Real the site UI is the brand.
- Reserve `{colors.hero-stripe-start}` → `{colors.hero-stripe-end}` neutral gradient for the hero band exactly once per page. Never repeat the stripe gradient deeper in the page.
- Use neutral category accents (`{colors.accent-yellow}`, `{colors.accent-red}`, `{colors.accent-green}`, `{colors.accent-blue}`) only inside resource and feature illustrations — never on chrome buttons or text.

### Don't
- Don't introduce a light mode. The system is dark-only by design.
- Don't add drop shadows on cards. Elevation is built from the surface ladder, not from shadows.
- Don't replace `{colors.primary}` (white) with a tinted accent for the primary CTA. Pure white is the brand action color.
- Don't use the hard chromatic accents (`{colors.accent-yellow}`, `{colors.accent-red}`, `{colors.accent-green}`, `{colors.accent-blue}`) on text, buttons, or chrome surfaces. They belong inside resource illustrations.
- Don't repeat the neutral hero gradient outside the top hero band. The one-band rule is the system's restraint.
- Do not require any proprietary or stylistic-set font feature for the interface. Standard Inter rendering is sufficient.
- Don't pad cards with 32px+ on all sides. The system runs tight at 16–24px in-card padding.

## 18A. No visible keyboard shortcut indicators

The site must contain **zero visible keyboard-command indicators**. This applies globally, including navigation, search, command-like panels, cards, buttons, dialogs, forms, menus, tooltips, footers, onboarding surfaces, and mobile drawers.

Do not render keyboard-command badges, shortcut labels, command-key hints, keyboard legends, or helper text whose purpose is to advertise a key combination. Search and command-style interfaces must not place any keyboard-command notation beside results or controls.

Keyboard navigation remains fully supported through semantic controls, predictable focus management, and the interaction rules in this document. The interface should not visually teach keyboard commands.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| ultrawide | 1920px+ | Content max-width holds at 1240px; outer gutters grow to ~80px |
| desktop-large | 1440px | Default — 3-up content grid, 2-up resource resource grid |
| desktop | 1280px | Same with narrower outer gutters |
| desktop-small | 1024px | 3-up content collapses to 2+1; primary nav remains horizontal |
| tablet | 768px | Content → 1-up stacked; primary nav becomes hamburger drawer |
| mobile | 480px | Single-column everything; hero `{typography.display-xl}` scales 64px → ~36px |
| mobile-narrow | 320px | Section padding tightens to 48px |

### Touch Targets
All interactive elements meet WCAG AA at 36px+. `{component.button-primary}` and `{component.button-tertiary}` sit at 36px height with 16px padding. `{component.text-input}` sits at 36px. `{component.resource-search-bar}` sits at 44px (above AAA). `{component.pill-tab}` is ~24–28px height with 10px padding extending to 36–40px tappable via inline padding (above AA but below AAA — intentional, the chips are compact). `{component.install-button}` sits at ~32px height with 14px padding.

### Collapsing Strategy
- **Primary nav:** desktop horizontal cluster → tablet hamburger drawer at 768px. The white "Primary action" CTA stays visible at every breakpoint.
- **Hero command-palette mockup:** desktop full-fidelity 2-column with copy at left + mockup at right → tablet stacks vertical with mockup below copy → mobile mockup scales down to ~80% width.
- **Resources resource grid:** 2-up → 1-up at tablet.
- **Content tier grid:** 3-up → 2+1 at desktop-small → 1-up stacked at tablet.
- **Comparison table:** desktop full 5-column → tablet horizontal scroll → mobile vertical card stack with one tier per card.
- **Footer:** 6-up link columns → 3-up at tablet → 2-up at mobile-landscape → 1-up at mobile.
- **Section padding:** `{spacing.section}` (96px) desktop → 64px tablet → 48px mobile.
- **Hero headline:** `{typography.display-xl}` (64px) at desktop, scaling 56px / 44px / 36px down the breakpoint stack.

### Image Behavior
The only "imagery" in the system is in-product the site UI screenshots and small app-icon assets:
- **Command-palette mockups** scale fluidly with the container; the in-product UI itself is responsive and re-renders for each breakpoint.
- **App-icon tiles** stay at 48–64px fixed size at every breakpoint; they tile in flexible rows that wrap at narrower widths.
- **Hero stripe gradient** stays at the top of the hero band at every breakpoint with the stripe angle preserved.

## Iteration Guide

1. Focus on ONE component at a time. Pull its YAML entry and verify every property resolves.
2. Reference component names and tokens directly (`{colors.primary}`, `{component.button-primary-pressed}`, `{rounded.md}`) — do not paraphrase.
3. Run `npx @google/design.md lint DESIGN.md` after edits — `broken-ref`, `contrast-ratio`, and `orphaned-tokens` warnings flag issues automatically.
4. Add new variants as separate component entries (`-pressed`, `-disabled`, `-active`) — do not bury them inside prose.
5. Default body to `{typography.body-md}` (16px / 400 / 1.6); reach for `{typography.body-strong}` for emphasis; reserve `{typography.display-xl}` strictly for the hero band.
6. Keep `{colors.primary}` (white CTA pill) scarce per viewport — at most one solid white pill per fold.
7. When introducing a new component, ask whether it can be expressed with the existing surface-ladder + 8px-radius + Inter typography vocabulary before adding new tokens. The system's strength is that it almost never needs new ones.

## Known Gaps

- **Mobile screenshots not captured** — responsive behavior synthesizes the site's mobile pattern (hamburger drawer, single-column grid, hero downscale) from desktop evidence and the breakpoint stack.
- **Hover states not documented** by system policy. the site's interactive UI has rich hover behavior on command-palette rows that this document doesn't capture.
- **In-product app chrome** (the actual the site launcher running on macOS) is referenced in marketing screenshots but not documented as a separate UI system here. The marketing site is documented; the in-product app surface is its own design system.
- **Dark mode is the only mode** — no light variant exists in the captured surfaces.
- **Form validation states** beyond the focused-input border treatment are not present in the captured surfaces.
- **Authenticated chrome** (account dashboard, billing settings, team management) not in the captured pages.

## 19. Final authority override for retained legacy notes

The sections retained from the original analysis are intentionally preserved for useful spacing, type
hierarchy, radius, component, responsive, and depth information. When any retained paragraph conflicts
with this document, this final rule set wins:

- identity is `python-learning` (maintained by `notdgx`)
- navbar title is text-only (`python-learning`); no logo beside the title
- navbar title uses Times NR MT and is bold italic at rest; hover/focus only animates its underline
- navbar Donate CTA is text-only: `<span>Donate</span>` — **strictly zero currency/rupee logos**
- Links menu is icon + username, without redundant written platform labels
- mobile full-screen drawers must be mounted to `document.body` via React `createPortal` to prevent CSS `backdrop-filter` clipping

---

## 20. Connected Practice & Theory UI Patterns

When notes and practice items share identical relative paths (`notes/NN-topic/NN-subtopic/NN-name.md` ↔ `practice/NN-topic/NN-subtopic/NN-name.md`):

### 20.1 In Note Detail View (`NoteDetailPage.tsx`)
- Right rail (Desktop) and mobile TOC section: Render an elevated card:
  - Label: `Practice Related Problems`
  - Visual: `Lightbulb` icon + note title + `ArrowRight`
  - Action: Navigates directly to `/practice/<topic>/<subtopic>/<name>`

### 20.2 In Practice View (`PracticePage.tsx`)
- Problem statement header: Render a secondary theory link:
  - Label: `Review Theory Note`
  - Visual: `BookOpen` icon + `ArrowLeft`
  - Action: Navigates directly back to `/notes/<topic>/<subtopic>/<name>`

---

## 21. WebGL Background Shaders & Zero Vignette Rule

### 21.1 Hero Ribbon Field (`RibbonFieldBackground.tsx`)
- WebGL GPU-accelerated ribbon field shader.
- Slow, continuous hue cycling with mouse/pointer drift.
- Responsive container: 16:9 on desktop, fluid height on mobile (`aspect-ratio: auto`).

### 21.2 Footer Emerald Horizon (`EmeraldHorizonBackground.tsx`)
- Three.js undulating wave plane.
- **Strict Invariant**: `vignette = 0` (Zero Vignette Rule). Under no circumstances may a radial vignette or corner shading be enabled on the footer shader.
- Synchronized hue cycling with hero background.

---

## 22. Mobile Viewport & Touch Invariants

- **Card Grids**: All card collections (Home topics, Notes Explorer subtopics, Links directory, Practice previews) must use `grid-template-columns: repeat(auto-fit, minmax(270px, 1fr))` to guarantee zero horizontal overflow on small 320px–375px phone viewports.
- **Touch Targets**: Minimum 36px height; text inputs 44px; touch actions use `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent`.
- **Social Popovers (Footer & Dropdowns)**: Support both desktop hover bridges and tap-to-toggle click handlers with outside-click dismissal for mobile touch devices.
- **Topic Navigation Drawer**: On screens `< 1024px`, TopicSidebar transitions to a smooth off-canvas drawer with dark backdrop blur (`rgba(0,0,0,0.75)`), body scroll locking, and auto-closing on note tap.
- the pointer path into every hover menu stays connected so the menu never vanishes en route
- one YouTube footer icon expands to two YouTube usernames
- one Instagram footer icon expands to two Instagram usernames
- all icons are grayscale Phosphor Icons; no emoji
- Donate is present in navbar, main content, footer, and final Links-dropdown row
- final Links-dropdown row is the UPI donation row and opens a slide-down QR panel on hover/focus
- UPI QR uses exactly `upi://pay?pa=notdgx@upi&pn=notdgx&cu=INR`
- hero uses the Ribbon Field WebGL animation with synchronized slow hue cycling
- footer uses the Emerald Horizon Three.js animation with synchronized hue cycling and **vignette = 0 (zero vignette)**
- footer text uses subtle black shadow for readability
- no decorative sliders or fake slider rails; any real range control uses the theme-matched grayscale treatment
- no unrelated pre-default product/company display
- no hard chromatic accent blocks; blend tonal differences using grayscale gradients
- Escape, arrows, Tab, Enter, Space, Home/End, and normal form/search navigation work wherever applicable, without any visible shortcut indicators


