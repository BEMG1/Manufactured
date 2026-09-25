---
name: Bio-Industrial Ecology
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#41493e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#717a6d'
  outline-variant: '#c0c9bb'
  surface-tint: '#2a6b2c'
  primary: '#00450d'
  on-primary: '#ffffff'
  primary-container: '#1b5e20'
  on-primary-container: '#90d689'
  inverse-primary: '#91d78a'
  secondary: '#00677d'
  on-secondary: '#ffffff'
  secondary-container: '#50d9fe'
  on-secondary-container: '#005c70'
  tertiary: '#004524'
  on-tertiary: '#ffffff'
  tertiary-container: '#005f34'
  on-tertiary-container: '#6adb95'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acf4a4'
  primary-fixed-dim: '#91d78a'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#0c5216'
  secondary-fixed: '#b3ebff'
  secondary-fixed-dim: '#4cd6fb'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#88f9b0'
  tertiary-fixed-dim: '#6bdc96'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#00522c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates industrial manufacturing capability into an approachable, high-trust, eco-conscious digital catalog. Crafted specifically for commercial buyers, facility managers, and direct WhatsApp e-commerce clients, the brand narrative balances structural engineering rigor with natural biological renewal. 

The aesthetic marries **Modern Clean Corporate** clarity with **Organic Tactility**. Crisp architectural whitespace, soft botanical curves, and clean micro-textures convey premium manufacturing precision without feeling cold or detached. Interactive moments should feel brisk, lightweight, and dependable—evoking the brisk freshness of pure water and verdant botanical efficiency.

## Colors

The palette is derived directly from the planetary leaf-and-water emblem. 

- **Primary (`#1B5E20`)**: Deep Forest Green serves as the anchor of institutional trust, authority, and baseline contrast for key headings, brand accents, and high-priority action states.
- **Secondary (`#00B4D8`)**: Hydro Cyan injects fluid dynamism, applied to interactive ordering elements, WhatsApp checkout buttons, cart badges, and active state highlights.
- **Tertiary (`#48BB78`)**: Sprout Green provides positive feedback, availability markers, eco-certification badges, and subtle hover backgrounds.
- **Neutral (`#64748B`)**: Slate neutralizes eye fatigue across extensive SKU catalogs. Supporting light neutrals (`#F8FAFC` to `#F1F5F9`) furnish warm stone-inspired background layers that keep the interface clean, clinical, and sustainable.

## Typography

The type system blends the geometric balance of **Plus Jakarta Sans** for headlines and interactive affordances with the legibility of **Inter** for data tables, SKU specifications, and bulk unit measures.

- Headlines feature tight negative tracking (`-0.02em`) to maintain an authoritative, compact footprint in industrial headers and hero banners.
- `label-caps` enforces wide letter spacing (`+0.06em`) for institutional subtitles (such as "ECO-FRIENDLY SOLUTIONS S.A.S") and catalog category indicators.
- Numbers within pricing tables and WhatsApp transaction summaries must utilize tabular figures (`tnum`) for vertical alignment.

## Layout & Spacing

A structured 12-column fluid grid organizes catalog products, technical specification sheets, and inquiry modules.

- **Breakpoints**: 
  - Mobile (`< 640px`): Single column or 2-column product grid with `margin-mobile` padding and collapsed compact headers.
  - Tablet (`640px - 1024px`): 3-column product matrix with persistent quick-order drawer controls.
  - Desktop (`> 1024px`): 4-column SKU layout with pinned left navigation/category filters and a fixed-summary checkout bar.
- Hero banners deploy an airy vertical padding of `space-xl` combined with centered focal hierarchy to maintain high conversion clarity for WhatsApp dispatch prompts.

## Elevation & Depth

Visual hierarchy is achieved through crisp, light-bathed surface tiers rather than heavy artificial shadows:

- **Level 0 (Base Canvas)**: Crisp white (`#FFFFFF`) or subtle stone slate surface (`#F8FAFC`).
- **Level 1 (Catalog Cards & Containers)**: Elevated via ultra-diffused ambient drop: `0 2px 8px -2px rgba(13, 59, 20, 0.06)`, framed by a delicate 1px border (`#E2E8F0`).
- **Level 2 (Floating Action Buttons & Cart Pills)**: WhatsApp ordering triggers and floating shopping tallies project an active elevation: `0 8px 24px -4px rgba(0, 180, 216, 0.28)`.
- **Hero Treatment**: The hero banner integrates a rich linear gradient blending deep cyan into forest teal (`linear-gradient(135deg, #00B4D8 0%, #0096C7 45%, #1B5E20 100%)`) with an understated micro-dot or square geometric screen at 10% opacity, providing industrial texture without obstructing typography.

## Shapes

The design system embraces high-radius circular geometry inspired by water droplets, biological cellular walls, and the spherical corporate emblem. 

Primary buttons, category filter tags, count indicators, and floating shopping carts adopt full pill silhouettes (`roundedness: 3` / 9999px). Product cards and specification modals maintain friendly, softly rounded corners (`rounded-xl` / 1.5rem to 2rem) that ease industrial visual density into an approachable commerce experience.

## Components

### Buttons & Order CTAs
- **WhatsApp Direct Order Button**: Pill-shaped with full cyan fill (`#00B4D8`), white bold text, and a crisp icon prefix. Active state introduces `#0096C7` with a slight compress effect (`scale(0.98)`).
- **Secondary Action**: Pill-shaped with deep forest green stroke (`#1B5E20`), transparent fill, and green text. Hover engages `#1B5E20` at 6% fill.

### Eco Chips & Category Filters
- Horizontally scrollable pill tabs. 
- Inactive state: `#F1F5F9` background with `#64748B` typography.
- Active state: `#1B5E20` background with pure white typography and a subtle sprout green dot marker (`#48BB78`).

### Product Catalog Cards
- Structured vertically: 1:1 aspect ratio eco-product imagery set against a neutral field (`#F8FAFC`), followed by eco-spec badge, SKU name in `headline-sm`, wholesale unit price, and a full-width pill button for quick WhatsApp basket insertion.

### Floating Cart Bar & Header
- Header maintains a clean white bar (`#FFFFFF`) anchored by the multi-tone leaf/water logo and a persistent pill cart badge (`#00B4D8`).
- For mobile views, a pinned bottom bar displays running totals with an instantaneous "Completar pedido vía WhatsApp" trigger.

### Input Fields & Selectors
- Pill or rounded-lg search fields with inset magnifying glass, featuring a faint stone border (`#CBD5E1`) that transitions to a 2px focus ring in cyan (`#00B4D8`) with zero offset.