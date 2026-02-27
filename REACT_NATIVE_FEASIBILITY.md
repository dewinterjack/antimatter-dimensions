# React Native Port Feasibility Analysis

## Executive Summary

**Verdict: Not recommended. A WebView wrapper or Expo web build is far more practical.**

Antimatter Dimensions is a ~119,000-line Vue.js 2 web application — not a native iOS app. Porting it to React Native would mean rewriting virtually the entire codebase from scratch. There are more practical paths to get this running on mobile.

---

## What This Project Actually Is

Despite the repo name ("antimatter-dimensions-ios"), this is a **pure web application**:

| Aspect | Details |
|--------|---------|
| Framework | Vue.js 2.6 with Webpack 5 |
| Language | JavaScript (ES6+) |
| UI Components | **409 Vue single-file components** (.vue files) |
| Game Logic | **270 JS files** in `src/core/` |
| Total LOC | ~119,130 lines |
| Platform Targets | Web browser, Steam (via Electron) |
| Native iOS Code | **None** — zero Swift, Objective-C, or Xcode project files |

---

## Why a React Native Rewrite Is Impractical

### 1. Massive UI Rewrite (409 Vue Components -> React Native)

The UI layer alone is enormous:

- **220 tab components** across 40+ game screens (dimensions, celestials, alchemy, automator, etc.)
- **114 modal dialogs** (save management, glyph operations, cloud conflict resolution, etc.)
- **75+ shared components** (buttons, tooltips, headers, animations)
- **4 distinct UI modes** (Classic, Modern, Prestige Header, S12)

Every single `.vue` file would need to be rewritten as a React Native component. Vue's template syntax, scoped CSS, computed properties, and watchers have no 1:1 mapping to React Native. All CSS-based layouts would need to be converted to React Native's Flexbox-only `StyleSheet` system.

### 2. Heavy DOM/CSS Dependency

The game relies extensively on web-specific rendering:

- **CSS animations and transitions** throughout (glyph effects, background animations, blob snowflakes)
- **SVG rendering** for celestial navigation map (`svg-pan-zoom`, `vis-network`)
- **CodeMirror** text editor for the in-game automator scripting language
- **Canvas/WebGL** for background effects
- **HTML-based tooltips** (`v-tooltip`) with rich formatting
- **Drag-and-drop** (`vuedraggable`, `drag-drop-touch`) for glyph management

None of these have direct React Native equivalents. The CodeMirror-based automator alone (3,800 lines of compiler/lexer/parser + editor integration) would require finding or building a mobile code editor from scratch.

### 3. Global State Architecture Is Web-Centric

The game uses a massive global `window.player` object as its state store — no Vuex, no structured state management:

- Game state lives on `window.player` and is mutated directly
- UI reactivity relies on Vue 2's `Object.defineProperty`-based reactivity system
- A `GameUI` singleton manually triggers Vue re-renders
- `EventHub` (observer pattern) coordinates between game systems
- `setInterval`-based game loop at ~30fps updates everything

This would all need to be restructured for React Native (likely with something like Zustand or Redux), and every piece of game logic that touches `window.*` globals would need refactoring.

### 4. Dependencies That Don't Work in React Native

| Dependency | Purpose | RN Compatible? |
|-----------|---------|---------------|
| `vue` | Framework | No (would become React) |
| `codemirror` | Automator editor | No (DOM-based) |
| `vis-network` | Celestial navigation graph | No (DOM/Canvas) |
| `svg-pan-zoom` | SVG interaction | No (DOM-based) |
| `v-tooltip` | Tooltips | No (DOM-based) |
| `vuedraggable` | Drag and drop | No (Vue + DOM) |
| `firebase` (web SDK) | Cloud saves | Partial (need `@react-native-firebase`) |
| `mousetrap` | Keyboard shortcuts | No (irrelevant on mobile) |
| `vue-gtag` | Analytics | No (need RN analytics) |
| `break_infinity.js` | Big numbers | **Yes** (pure JS) |
| `chevrotain` | Automator parser | **Yes** (pure JS) |
| `pako` | Compression | **Yes** (pure JS) |
| `tween.js` | Animations | Partial (need RN Animated) |

### 5. Effort Estimate

A conservative estimate for a full React Native port:

| Work Item | Scope | Estimated Effort |
|-----------|-------|-----------------|
| Port 409 Vue components to React Native | Complete rewrite | 3-6 months |
| Rebuild CSS layouts as RN StyleSheets | Every screen | 1-2 months |
| Replace web-specific libraries | CodeMirror, vis-network, SVG, DnD | 2-3 months |
| Restructure global state for React | window.player -> proper state management | 1-2 months |
| Port game loop to RN-compatible approach | Background timer handling | 2-4 weeks |
| Firebase migration to RN Firebase | Cloud saving, auth | 2-4 weeks |
| Mobile-specific UX adaptation | Touch targets, screen sizes, navigation | 1-2 months |
| Testing and bug fixing | Regression testing across all systems | 2-3 months |
| **Total** | | **~12-18 months (1-2 senior devs)** |

---

## Better Alternatives

### Option A: WebView Wrapper (Recommended - Easiest)

Wrap the existing built web app in a native WebView shell using:

- **Capacitor** (from the Ionic team) or **Cordova**
- Or a bare `WKWebView` in a minimal Swift app

**Pros:**
- Works with the existing codebase as-is
- Days to weeks of effort, not months
- The game already runs in browsers — mobile Safari/Chrome rendering is fine
- Can still access native APIs (notifications, haptics) via Capacitor plugins

**Cons:**
- Slightly worse performance than native (but this is a text-heavy idle game, not a 3D game)
- WebView quirks on older devices

**Effort: 1-2 weeks**

### Option B: Expo Web / React Native Web (Hybrid)

If the goal is to eventually have a React Native codebase:

1. Start by shipping the Vue.js build inside a WebView today
2. Incrementally rewrite screens in React Native over time
3. Use `react-native-webview` to embed legacy screens while new ones are built

**Effort: 2 weeks for initial ship, then incremental**

### Option C: PWA (Progressive Web App)

The game is already a web app. Making it installable as a PWA requires:

- Adding a `manifest.json`
- Adding a service worker for offline support
- Possibly adjusting viewport/touch handling

**Effort: 1-3 days**

---

## What *Could* Be Reused in a React Native Port

If you still want to pursue React Native despite the above, here's what transfers:

- **`src/core/` game logic** — Most of the 270 JS files in `core/` are pure computation (dimension math, prestige formulas, celestial mechanics, upgrade effects). These could be imported directly as a game engine library. This is the most valuable ~50,000 lines.
- **`break_infinity.js`** — The big number library works in any JS environment.
- **`chevrotain`-based automator parser** — The lexer/parser/compiler are framework-agnostic.
- **`pako` compression and save format** — The serialization/deserialization logic is reusable.
- **`@antimatter-dimensions/notations`** — Number formatting is pure JS.
- **Game balance data** (`src/core/secret-formula/`) — All game constants and formulas transfer directly.

Roughly **40-50% of the JS logic** (by line count) is framework-agnostic and reusable. The other 50-60% (all Vue components + web-specific integrations) would need a complete rewrite.

---

## Recommendation

**Ship a WebView wrapper (Option A) now.** The game is text and numbers — it doesn't need 60fps native rendering. A Capacitor or bare WKWebView wrapper gets you to the App Store in weeks with the full game experience intact.

If native feel becomes a priority later, consider an incremental migration (Option B) where high-traffic screens are rebuilt in React Native while the rest remain in the WebView.

A full React Native rewrite (12-18 months) is only justified if there's a strong business case for native performance or if the Vue 2 codebase is being abandoned anyway (Vue 2 reached EOL in December 2023).
