---
version: alpha
name: Level Learning
description: >
  Design tokens and binding UI rules for the Level Learning platform
  (mastery-track repo). Tokens are normative; the prose explains how to apply
  them. AI agents MUST follow the Code Rules and Do's and Don'ts sections when
  creating or modifying any UI.
colors:
  primary: "#00548b"
  primary-light: "#006CD0"
  primary-dark: "#00365A"
  on-primary: "#ffffff"
  secondary: "#424242"
  secondary-light: "#616161"
  secondary-dark: "#212121"
  on-secondary: "#ffffff"
  tertiary: "#ffffff"
  tertiary-dark: "#d6d6d6"
  success: "#66bd63"
  success-light: "#8DCF7A"
  success-dark: "#468444"
  error: "#f44336"
  error-light: "rgb(239, 120, 120)"
  error-dark: "rgb(164, 60, 60)"
  warning: "#ed6c02"
  warning-light: "#ff9800"
  warning-dark: "#e65100"
  info: "#0277bd"
  info-light: "#03a9f4"
  info-dark: "#01579b"
  text-primary: "rgba(0, 0, 0, 0.87)"
  text-secondary: "rgba(0, 0, 0, 0.54)"
  text-disabled: "rgba(0, 0, 0, 0.38)"
  black: "#151515"
  white: "#f8f8f8"
  surface: "#ffffff"
  background-light: "#f9f9f9"
  border-card: "#e0e0e0"
  grey-100: "#f5f5f5"
  grey-200: "#eeeeee"
  grey-300: "#e0e0e0"
  grey-400: "#bdbdbd"
  grey-500: "#9e9e9e"
  grey-600: "#757575"
  grey-800: "#424242"
  grey-900: "#2d2d2d"
  status-in-progress: "#939ea2"
  status-assigned: "#0277bd"
  status-submitted: "#ed6c02"
  status-done: "#66bd63"
  mastery-not-mastered: "#8d009e"
  mastery-mastered: "#66bd63"
  no-data: "#cccccc"
  lang-en: "#366ec5"
  lang-es: "#097969"
  lang-zh: "#7b559f"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -1.5px
  h2:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.5px
  h3:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1
  h4:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.25px
  h5:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1
  h6:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.15px
  subtitle1:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.15px
  subtitle2:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.1px
  body1:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.15px
  body2:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.17px
  caption:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.4px
  overline:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 1px
rounded:
  none: 0px
  game: 4px
  md: 8px
  full: 9999px
spacing:
  "0": 0px
  "0-25": 2px
  "0-5": 4px
  "1": 8px
  "1-5": 12px
  "2": 16px
  "2-5": 20px
  "3": 24px
  "4": 32px
  "5": 40px
  "6": 48px
  "8": 64px
  "10": 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.2}"
  chip-status-done:
    backgroundColor: "{colors.status-done}"
    rounded: "{rounded.full}"
---

# Level Learning — DESIGN.md

This file is the **machine-readable contract** for building UI in this repo.
The live, rendered counterpart is the design-system site:
**https://masterytrack.github.io/design-system/** — it renders the real
`*.examples.tsx` files from `mtgame/mtgame-client/src/components/`. When this
file and the code disagree, **the code wins**; update this file.

> **For AI agents:** before writing any UI code, read the
> [Code Rules for Agents](#code-rules-for-agents) and
> [Do's and Don'ts](#dos-and-donts) sections. They are binding, not advisory.

## Overview

Level Learning is a K-8 multilingual education platform (Chinese, Spanish,
English) used by three very different audiences, served by **two MUI themes**:

- **Light theme** (`LIGHT-THEME`, the default) — teacher, admin, and staff
  views: dashboards, reports, rostering, assignment management. Tone:
  professional, calm, information-dense but breathable. Blue primary, white
  surfaces, restrained color. Data (mastery, status, growth) carries the color;
  chrome stays neutral.
- **Game theme** (`GAME-THEME`) — student game views: quests, phonics games,
  avatars, rewards. Tone: playful, bold, high-energy. Heavier font weights,
  tighter radius (4px), capitalized headings.

Both themes are defined in `mtgame/mtgame-client/src/style/` and exported as
CSS variables at boot (`bootGlobalStyleVariables()` in `src/style/index.ts`),
scoped to `:root`, `.LIGHT-THEME`, and `.GAME-THEME`. When a rule or token is
not defined here, match the nearest existing screen of the same audience —
never invent a new style direction.

## Colors

The palette is MUI-based and lives in
`mtgame/mtgame-client/src/style/config/paletteLight.ts` (semantic palette) and
`paletteCustom.ts` (domain colors). Every color is available three ways — use
them in this order of preference:

1. **Component props** — `color="primary"`, `color="error"` on LL*/MUI components
2. **RCC utility classes** — `rcc-color-primary`, `rcc-bg-success-light`, etc. (`src/style/rcc.ts`)
3. **CSS variables** — `var(--primary)`, `var(--color-grey-300)`, etc. (in `.scss` files)

Semantic roles:

- **primary `#00548b`** — the brand blue. Main actions, links, active nav,
  selected states. One primary action per view.
- **secondary `#424242`** — neutral dark grey for secondary actions and chrome.
- **success / error / warning / info** — feedback states only (alerts, toasts,
  validation), not decoration.
- **Domain colors** (from `paletteCustom.ts`) are semantic and must not be
  repurposed:
  - Status: `status-assigned` (info blue), `status-submitted` (warning orange),
    `status-done` (success green), `status-in-progress` (grey)
  - Mastery: `mastery-mastered` (green), `mastery-not-mastered` (purple
    `#8d009e`), `no-data` (grey)
  - Heatmap scale: `--color-scale-min-1` (red) → `--color-scale-0` (yellow) →
    `--color-scale-plus-1` (green), with `-dark` hover variants
  - Performance bands: `exceeding`, `met`, `approaching`, `below`
  - Language tags: `lang-en` (blue), `lang-es` (teal), `lang-zh-cn`/`lang-zh-hk`
    (purple)

**Never hardcode a hex value in component code.** If a color you need doesn't
exist, add it to `paletteCustom.ts` + `rcc.ts` + the CSS variable generator in
`src/style/index.ts` so it's available everywhere — then use the token.

## Typography

One font: **Inter** (fallback Roboto/Helvetica/Arial), with Noto Sans SC/TC
for Chinese text and Heinemann for Spanish/English leveled-reading content
(`getFontFromLanguage()` in `src/style/index.ts`). Base font size 16px; body
text renders at 14px (`body1`).

Use the **`LLText`** component (`src/components/molecules/LLText/`) or MUI
`Typography` variants — never raw `<h1>`–`<h6>` tags or `font-size` overrides:

```tsx
<LLText t="h6">Section title</LLText>
<LLText t="body1">Regular paragraph text.</LLText>
<LLText t="caption" color="text-secondary">Helper text</LLText>
```

The full scale (h1–h6, subtitle1/2, body1/2, caption, overline) is in the
front matter above; the source of truth is
`src/style/config/typographyLight.ts` and `typographyGame.ts`. Buttons use
`textTransform: none` in the light theme — **no all-caps buttons**. The game
theme uses weights 700–900 and capitalized headings; it is configured in the
theme, so never replicate it with manual CSS.

## Layout

- **Spacing scale: 8px base unit** (MUI spacing). Allowed steps are the
  `--spacing*` variables: 0, 2, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64,
  72, 80px. No arbitrary values like `margin: 13px`.
- **Layout is utility-class first.** Use the RCC classes from
  `src/style/rcc.ts` (always via the `RCC` enum in TSX, composed with `clsx`):
  - Flex: `RCC.ROW`, `RCC.COLUMN`, `RCC.WRAP`, `RCC.FLEX_1`,
    `RCC.ITEMS_CENTER`, `RCC.JUSTIFY_BETWEEN`, `RCC.GAP_1` … `RCC.GAP_*`
  - Grid: `RCC.GRID`, `RCC.GRID_COLS_2/3/4`, `RCC.RESPONSIVE_GRID`,
    `RCC.COL_SPAN_FULL`
  - Margin/padding: `rcc-ma*/mt*/mb*/ml*/mr*/mh*/mv*` and `rcc-pa*/pt*/…`
    using the spacing scale (e.g. `rcc-pa2` = 16px padding)
  - Sizing: `RCC.FULL_WIDTH`, `RCC.FULL_HEIGHT`, `RCC.SHRINK_0`

```tsx
<div className={clsx(RCC.ROW, RCC.ITEMS_CENTER, RCC.GAP_2, RCC.PA_2)}>
```

- **Breakpoints** (MUI / `--breakpoint-*`): xs 0, sm 600, md 960, lg 1280,
  xl 1920. Staff views are desktop-first (teachers on laptops/projectors);
  student game views must work down to tablet.
- Only write a component `.scss` file for what utilities can't express; inline
  `style={}` is a last resort for genuinely dynamic values.

## Elevation & Depth

Flat-leaning UI with subtle elevation. Use the predefined shadows only:

- `var(--shadow)` — `0 0 4px 0 rgba(0,0,0,0.1)` — subtle lift (inputs, hovers)
- `var(--card-shadow)` — standard card elevation
- `rcc-shadow1` … `rcc-shadow9`, `rcc-shadow-big`, `rcc-shadow-none` —
  utility classes (`src/style/sass/shadow.scss`)

Most hierarchy comes from borders (`--color-border-card: #e0e0e0`,
`RCC.BORDERED`, `RCC.DIVIDER`) and background tone (`--color-background-light`
page background vs. white `paper` surfaces), not heavy shadows. Don't write
custom `box-shadow` values.

## Shapes

- **Light theme radius: 8px** (`var(--radius)`); **game theme: 4px** — both
  set on the theme, so prefer `var(--radius)` / theme defaults over literals.
- Pills/chips and avatars are fully rounded (`rounded.full`).
- Utilities: `RCC.ROUNDED_BORDER`, `RCC.FLAT_BORDER`, `RCC.CIRCLE_BORDER`.
- Don't mix radii within one view; don't introduce new radius values.

## Iconography

**FontAwesome is the only icon system.** Icons load from FontAwesome kit
`f5b9deca51` (Classic family). Two styles are licensed and used:

- **Solid** (`fa-solid`) — the default everywhere
- **Regular** (`fa-regular`) — via the `outlined` prop, for lighter emphasis

Rules:

1. **Always render icons through `LLIcon`**
   (`src/components/molecules/LLIcon/LLIcon.tsx`) or the `icon` prop of
   components that embed it (`LLButton`, `LLIconButton`, `LLCardButton`).
   Never write a raw `<i className="fa-...">` tag.
2. Pass the FontAwesome name **without the `fa-` prefix**: `icon="star"`,
   `icon="chevron-down"`, `icon="arrow-up-right-from-square"`. Verify the name
   exists at https://fontawesome.com/search?o=r&s=solid&f=classic before using it.
3. **Never** use emoji as icons, `@mui/icons-material`, inline `<svg>` icons,
   or any other icon font. (`LLReactSVG` is only for project image assets,
   not icons.)
4. Sizes are the `LLIcon` presets: `xxs | xs | small | medium | large` —
   don't set icon font-size manually.
5. Color via the `color` prop (palette names), which maps to `rcc-color-*`.

```tsx
<LLIcon icon="star" size="medium" />
<LLIcon icon="circle-question" outlined size="small" tooltip="What's this?" />
<LLIcon icon="trash" size="small" color="error" onClick={onDelete} />
<LLButton icon="plus" label="Add student" onClick={onAdd} />
```

Conventional mappings already in use — reuse, don't reinvent: close = `xmark`,
delete = `trash`, edit = `pen`, add = `plus`, help = `circle-question`
(outlined), external link = `arrow-up-right-from-square`, expand =
`chevron-down`, settings = `gear`, search = `magnifying-glass`.

## Components

**Always reach for an existing `LL*` component before an MUI primitive, and an
MUI primitive before anything custom.** The component library lives in
`mtgame/mtgame-client/src/components/` (`molecules/` = building blocks,
`organisms/` = composed features). Every component has a co-located
`*.examples.tsx` rendered live on the design-system site — check the example
before using a component:
`https://masterytrack.github.io/design-system/#/v3/dev-tools/example/<Name>`.

Mandatory mappings (raw MUI/HTML element → required component):

| Need | Use | Not |
| --- | --- | --- |
| Button | `LLButton` | MUI `Button`, `<button>` |
| Icon button | `LLIconButton` | MUI `IconButton` |
| Icon | `LLIcon` | `<i>`, svg, emoji |
| Text/heading | `LLText` | raw `<h*>`, `<p>` with styles |
| Text input | `LLTextField` / `LLTextFieldPassword` / `LLNumber` | MUI `TextField` |
| Select/search | `LLAutocomplete` / `LLAutocompleteMulti` | MUI `Select` |
| Checkbox / radio / switch | `LLCheckbox(Group)` / `LLRadioGroup` / `LLToggleSwitch` | raw MUI |
| Toggle buttons | `LLToggleButtonGroup(Multi)` | custom segmented control |
| Date | `LLDatePicker` / `LLCalendarDateRange` | raw inputs |
| Dialog/modal | `LLModal` (staff) / `LLModalGame` (game) / `StyledDialog` | MUI `Dialog` directly |
| Card | `LLCard` / `LLCardButton` | styled `<div>` |
| Chip/tag | `LLChip`, `StatusChip`, `Tag` | custom pills |
| Tooltip | `LLTooltip` (or `tooltip` props) | `title=` attribute |
| Alert / toast | `LLAlert` / `Toasts` (`useToast`) | `window.alert`, custom banners |
| Tabs | `TabBar` + `TabPanel` | custom tab UI |
| Data table | `DataGridTable` (URL-synced) / `LLSimpleTable` | hand-rolled `<table>` |
| Loading | `LoadingSpinner` / `CircularLoading` / `ProgressBar` / built-in `LLButton` loading | custom spinners |
| Empty state | `LLPlaceholder` | ad-hoc "no data" text |
| Navigation | `LLLink`, `LLBreadcrumbs`, `LLBottomNavigation`, `RouteBackHeader` | raw `<a>` |
| Charts | `AnalyticsBarChart`, `AnalyticsProgressChart`, `StudentGrowthChart` (nivo) | new chart libs |

`LLButton` behaviors you get for free (don't re-implement): async `onClick`
auto-loading state, `disabled="reason string"` renders a tooltip,
`target="_blank"` adds the external-link icon, `tooltip` adds the
`circle-question` icon, `icon="<fa-name>"` renders an `LLIcon`. Default size is
medium; only `size="large"` may override it.

Domain-specific display (mastery bubbles, level badges, star progress, coins,
status icons) already exists — `ObjectiveBubbles`, `LevelBadge`,
`LevelStarProgress`, `LLCoins`, `StatusIcon`, `StatusChip` — search
`src/components/` and the design-system site before building anything that
visualizes mastery, status, levels, or rewards.

### Creating a new component

Only when no existing component fits, and follow the pattern exactly:

```
src/components/molecules/LLThing/
├── LLThing.tsx           # named export, typed props interface
├── LLThing.scss          # only if utilities can't express the styling
└── LLThing.examples.tsx  # REQUIRED — registers it in dev-tools + design site
```

Register examples via `npm run devtools:add-component` (in `mtgame/`). A new
shared component without an `.examples.tsx` is incomplete.

## Code Rules for Agents

Hard requirements for any AI-generated UI code in this repo:

1. **React 18 function components**, TypeScript strict — no `any`, no `as`
   (per AGENTS.md). Named exports. MobX (`observer`) for shared state.
2. **Imports**: use path aliases like `@molecules/...` as seen in neighboring
   files; routing via `@reach/router` helpers and `PATHS` in
   `src/Router/routerPathHelpers.ts`.
3. **Class names**: compose with `clsx` + the `RCC` enum — never string-typed
   `"rcc-row"` literals in TSX.
4. **No new dependencies** for UI (icon packs, CSS frameworks, chart or
   component libraries) — the design system is MUI v7 + LL* + RCC + FontAwesome.
5. **No Tailwind, no styled-components, no CSS-in-JS** beyond what the MUI
   theme files already do. Component styling = RCC utilities, then co-located
   `.scss`.
6. **Theme awareness**: staff features → light theme components (`LLModal`),
   student game features → game variants (`LLModalGame`); never hand-style one
   to look like the other.
7. **Verify icon names** against FontAwesome Classic (solid/regular) — a wrong
   name renders an empty box.
8. **When unsure, copy a neighbor**: find the closest existing page/component
   serving the same audience and mirror its structure, then check its rendering
   on the design-system site.

## Do's and Don'ts

- **Do** use existing `LL*` components for every standard UI element.
- **Do** use `--spacing*` / RCC spacing utilities for all whitespace.
- **Do** use semantic color tokens; let status/mastery data own the color.
- **Do** add an `.examples.tsx` for every new shared component.
- **Do** keep one primary action per screen, primary blue, medium size.
- **Do** maintain WCAG AA contrast (4.5:1) for text on colored backgrounds —
  use the paired `contrastText`/`on-*` tokens.
- **Don't** hardcode hex colors, px spacing, font sizes, radii, or shadows.
- **Don't** use any icon source other than FontAwesome via `LLIcon` — no
  emoji, no `@mui/icons-material`, no inline SVG icons.
- **Don't** import raw MUI `Button`/`TextField`/`Dialog` when an `LL*` wrapper
  exists.
- **Don't** uppercase button labels or override `textTransform`.
- **Don't** mix light-theme and game-theme styling in one view.
- **Don't** add UI dependencies or new global styles/utility classes without
  extending `rcc.ts` + the token files.
- **Don't** re-implement loading, tooltip, disabled-reason, or external-link
  behavior that `LLButton`/`LLIcon` already provide.
