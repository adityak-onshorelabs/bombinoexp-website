# Design System — Bombino Express

## Color Palette

Strategy: **Committed** — Admiralty Dark (deep navy) dominates; Dispatch Amber carries accent voice.

| Token | OKLCH | Use |
|---|---|---|
| Admiralty Dark | `oklch(17% 0.048 248)` | Primary bg, hero, CTAs |
| Trade Wind | `oklch(37% 0.092 245)` | Secondary, links, icons |
| Dispatch Amber | `oklch(73% 0.160 64)` | Primary CTA, accents, highlights |
| Freight Paper | `oklch(98% 0.004 246)` | Page background, white sections |
| Surface Tinted | `oklch(96% 0.006 246)` | Input bg, subtle wells |
| Muted Ink | `oklch(52% 0.035 246)` | Body copy, captions |
| Border Subtle | `oklch(88% 0.010 246)` | Card borders, dividers |

## Typography

Font: Poppins (established brand font — not a new choice)
Weights used: 300, 400, 600, 700, 800

Scale (fluid with clamp):
- Display: `clamp(2.5rem, 5vw, 4rem)` / weight 800 / tracking -0.025em / lh 1.05
- Headline: `clamp(1.5rem, 3vw, 2.25rem)` / weight 700 / tracking -0.01em / lh 1.2
- Title: `clamp(1.125rem, 2vw, 1.5rem)` / weight 600 / lh 1.3
- Body: 1rem / weight 400 / lh 1.65 / max-width 70ch
- Label: 0.6875rem / weight 600 / tracking 0.09em / uppercase

Hero headline target: `clamp(2.75rem, 5.5vw, 5rem)` / weight 800 / tracking -0.03em / lh 1.03

## Elevation / Shadow

```
hover:   0 4px 20px oklch(17% 0.048 248 / 0.12)
modal:   0 12px 48px oklch(17% 0.048 248 / 0.18), 0 4px 16px oklch(17% 0.048 248 / 0.10)
focus:   0 0 0 3px oklch(37% 0.092 245 / 0.40)
```

## Radius

```
sm: 4px   md: 8px   lg: 12px   xl: 20px   2xl: 32px   full: 9999px
```

## Spacing

4pt base grid. Major section padding: 96px (3xl) desktop, 64px (2xl) tablet, 40px (xl) mobile.

## Motion

Library: GSAP (already in project dependencies)
Easing: expo.out `cubic-bezier(0.16, 1, 0.3, 1)`, power3.out `cubic-bezier(0.33, 1, 0.68, 1)`
Durations: 0.6–0.9s entrances, 0.15–0.2s micro-interactions
Scroll-triggered: ScrollTrigger with `start: "top 85%"`
Reduced motion: `window.matchMedia("(prefers-reduced-motion: reduce)")` check before all GSAP inits

## Components

- **Button/Primary**: Dispatch Amber bg, Admiralty text, rounded-full, h-12, font-semibold
- **Button/Secondary**: transparent bg, border-white/30, freight-paper text, rounded-full, backdrop-blur-sm
- **Card/Feature**: white bg, border-subtle border, rounded-2xl, no icon-above-heading by default
- **Card/Dark**: white/5 bg, white/10 border, rounded-2xl (used on navy sections)
- **Nav**: sticky, bg-freight-paper, transparent until scrolled, 68px height

## Section Sequence

1. Navbar
2. Hero (full-vh, dark with amber accents)
3. Trust Band (marquee of destinations / partner logos)
4. Capabilities Bento (asymmetric grid, not identical cards)
5. Services Editorial List (hover-reveal, not card grid)
6. Proof Narrative (stats in context, not hero-metric template)
7. Global Offices
8. CTA Strip
9. Footer
