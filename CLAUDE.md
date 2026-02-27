# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Antimatter Dimensions is an incremental/idle game built with **Vue 2.6** and **@vue/cli-service 5** (Webpack). It has two UI modes: Classic and Modern. The mobile responsive work targets **Modern UI only**.

## Commands

```bash
npm ci                 # Install dependencies (use instead of npm install to respect lockfile)
npm run serve          # Dev server (localhost:8080), hot-reloads on file changes
npm run lint           # ESLint + Vue linting
npm run build:master   # Production build to dist/
```

No test suite exists in this project. Linting is the primary automated check.

## Architecture

### Bootstrap Flow

`src/main.js` → loads polyfills/shims → merges globals → `browserCheck()` → `init()` (from `src/game.js`)

### Game State

Global `window.player` object defined in `src/core/player.js` holds all game state. Uses `break_infinity.js` (`Decimal`) for arbitrary-precision numbers. Decimal constants are accessed via `DC` prefix (e.g., `DC.E1`, `DC.D0`) from `src/core/constants.js`.

### Game Loop

Components have a custom `update()` method called by the game's `setInterval`-based loop (`src/core/intervals.js`), not standard Vue reactivity. The update rate is configurable via `player.options.updateRate`.

### Vue Patterns

- Vue 2 Options API throughout (not Composition API)
- `this.$viewModel` provides shared UI state
- Tab navigation: `tab.show(true)` (true = force navigate)
- Modals: `Modal.h2p.show()`, `Modal.hide()`
- `@click.native` modifier needed for click events on child component root elements

### CSS Class Prefixes

- `c-` — component styles
- `l-` — layout styles
- `o-` — object/utility styles

### Key Directories

- `src/core/` — game logic (dimensions, autobuyers, celestials, achievements, automator, glyphs, time-studies, storage/save system)
- `src/components/` — Vue SFCs (tabs/, modals/, ui-modes/)
- `public/stylesheets/` — static CSS files loaded via index.html

## Critical: CSS Loading Order

Static CSS in `public/stylesheets/` loads via `<link>` tags in `public/index.html`. However, **`new-ui-styles.css` is imported by Vue components** (`ModernUi.vue`, `S12Ui.vue`) and **injected by Webpack at runtime after static stylesheets**.

Any overrides in static CSS files (like `mobile.css`) **must use `!important`** to win over `new-ui-styles.css`. Without it, overrides silently fail.

## Root Font Size

`html` has `font-size: 62.5%` (in `styles.css`), making **1rem = 10px**. All rem values use this base.

## CSS Architecture (Modern UI)

- **`--sidebar-width: 12.8rem`** — CSS variable for sidebar width, content margin, subtab positioning
- **`.c-modern-sidebar`** — `position: absolute`, `z-index: 5`, `width: var(--sidebar-width)`
- **`.game-container`** — `width: calc(100% - var(--sidebar-width))`, `margin-left: var(--sidebar-width)`
- **`.l-dimension-single-row`** — 7-column CSS grid for dimension rows
- **`.l-dim-row-multi-button-container`** — spans columns 5-8, `min-width: 25rem`
- **`.c-game-ui--fixed`** — fixed overlay layer with `pointer-events: none`; children need explicit `pointer-events: auto`

## Development Workflow

### Always verify in Chrome before committing

Use Chrome browser automation to visually verify all changes. **Default to mobile dimensions** since most active work targets mobile.

**Chrome verification steps:**
1. Resize window to mobile: `375x812` (default for all work)
2. Navigate to `http://localhost:8080`
3. Take screenshots and zoom into relevant areas to verify changes look correct
4. Test any interactive elements affected by the change
5. Only commit after visual verification passes

**For desktop verification**, resize to `1200x900` or wider (above `768px` breakpoint).

**Viewport reference:** Mobile `375x812` | Desktop `1200x900`+

### Mobile CSS Approach

All mobile overrides go in `public/stylesheets/mobile.css`, loaded last in `index.html`. Rules scoped inside `@media (max-width: 768px)`.

### Common Gotchas

1. **`!important` required** for overriding `new-ui-styles.css` properties (see CSS Loading Order above)
2. **`pointer-events: none`** on `.c-game-ui--fixed` — all interactive children need explicit `pointer-events: auto`
3. **z-index stacking**: `.c-game-ui--fixed` creates a stacking context at `z-index: 5`. Mobile sidebar elements need higher z-index to appear above the overlay backdrop
4. **Hover-based subtabs**: Tab buttons use `:hover` for subtab flyouts. On mobile, touch triggers hover — subtabs positioned at `left: var(--sidebar-width)` must be overridden for mobile sidebar width
5. **Scoped styles**: Some styles live in `<style scoped>` blocks in `.vue` files, not global stylesheets. Check both when investigating
6. **Tooltip positioning**: Dimension purchase count tooltip uses `transform: translate(calc(-125% - 1rem), -50%)` (left of button) — goes off-screen on mobile. `v-tooltip` tooltips use `.general-tooltip` class

## Existing Breakpoints

Classic UI (`styles.css`): 960px, 720px, 480px. Modern UI (`new-ui-styles.css`): **no media queries**. `GenericDimensionRowText` checks `window.innerWidth < 1573` in JS.
