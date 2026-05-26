# TextKit

> Developer-focused text utilities suite with 15+ tools across transformations, analysis, encoding, generators, and developer workflows. Built with React, TypeScript, Vite, and Tailwind CSS — designed with dark-first aesthetics and comprehensive unit test coverage.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 About

TextKit is a developer-focused text utilities suite — a single interface bringing together 15+ tools that developers reach for constantly across daily work. Case conversions for refactoring, JSON formatting for API debugging, Base64 encoding for auth tokens, slug generation for content systems, text diff for comparing outputs, lorem ipsum for mockups. The architecture isolates pure utility functions in a fully-tested library layer, isolates UI in a separate component tree, and ships dark-by-default like the developer tools its users already prefer (Linear, Vercel, Raycast).

This isn't a toy — every utility has unit test coverage, the bundle is under 120 KB gzipped, and the architecture supports adding new tools without touching existing ones.

---

## ✨ Features

### Text Transformations
- 🔠 Case conversion (UPPERCASE / lowercase / Title / Sentence / camelCase / PascalCase / snake_case / kebab-case / SCREAMING_SNAKE_CASE)
- 🔄 Reverse entire text or reverse word order
- ⬜ Whitespace operations (remove extra / remove all / trim each line)
- 📃 Line operations (remove duplicates / sort asc-desc / shuffle / reverse lines)

### Text Analysis
- 📊 Live statistics (characters with/without spaces, words, sentences, paragraphs, lines)
- ⏱️ Reading time (200 wpm) + speaking time (130 wpm) estimates
- 📏 Average word length
- 🔤 Top 10 most common words with counts
- 📈 Character frequency analysis with chart

### Encoding & Decoding
- 🔐 Base64 encode/decode (proper UTF-8 handling via TextEncoder/TextDecoder)
- 🌐 URL encode/decode (encodeURIComponent)
- 🏷️ HTML entity encode/decode (`&amp;` `&lt;` `&gt;` `&quot;` `&#39;`)

### Generators
- 📝 Lorem ipsum with word-count or paragraph-count selector
- 🔗 Slug generator (URL-friendly with fallback for empty results)
- 🎲 Random string generator with configurable character sets
- 🔑 Password generator with strength indicator

### Developer Tools
- 🧰 JSON formatter / minifier / validator with error position highlighting
- 🔍 Find & Replace with regex toggle, case-sensitive option, occurrence count
- 📑 Text diff with side-by-side line-level highlighting (additions / deletions / unchanged)

### Experience
- 🌑 Dark mode default with smooth light-mode toggle (Zustand-persisted)
- 🔤 Geist Sans + Mono fonts self-hosted via @fontsource
- ⌨️ Command palette via `Ctrl/Cmd+K` for instant tool jump
- 📜 Recent operations history (last 5, localStorage-persisted)
- 📋 One-click copy with toast confirmation on every result

---

## 💡 Design Decisions

### Why pure functions for every utility

Text transformations are mathematically pure — same input always produces same output, no side effects, no dependencies on state. Implementing them as pure functions in `src/lib/text-utils/` separates business logic from UI completely. Every function is unit-testable in isolation, swappable, composable. Component tests aren't needed because the components are thin display layers over pure functions — the logic layer is what carries the test value.

### Why Vitest over Jest

Vite-based projects deserve Vite-native tooling. Vitest reads `vite.config.ts`, shares the same transform pipeline, and runs significantly faster than Jest for the same test surface. It's API-compatible with Jest for the common cases, so existing knowledge transfers. Tests run in roughly half the time of an equivalent Jest setup on the same machine, and the dev experience of "save file → tests re-run in 50ms" is qualitatively different from Jest's typical 2-3 second feedback loop.

### Why TypeScript strict with `noUncheckedIndexedAccess`

`noUncheckedIndexedAccess` is a TypeScript flag that makes array and object access return `T | undefined` instead of just `T`. It catches a class of bugs at compile time that would otherwise crash at runtime — "cannot read property 'x' of undefined" stops happening because TypeScript forces you to handle the undefined case. The flag is opt-in because it adds friction to legitimate code, but for utility libraries where edge cases matter (empty strings, sparse arrays, missing keys), the friction pays for itself within the first bug it prevents.

### Why dark mode default

Most developer tools are dark-first because developers spend 8+ hours staring at them. Bright themes induce eye strain over long sessions. Linear, Vercel, Raycast, Cursor, VS Code, GitHub (toggle-able) — the trend is clear. TextKit defaults to dark and offers light as an option, not the reverse. Theme preference is persisted via Zustand's `persist` middleware to localStorage so the choice survives page reloads.

### Why Zustand instead of Context API for theme

React Context re-renders every consumer when the context value changes, even if the change doesn't affect that consumer. For theme state that's read everywhere, this creates unnecessary re-renders across the entire app. Zustand uses subscriptions — components only re-render when the specific slice they subscribe to changes. The bundle cost of Zustand (~1KB) is negligible compared to the render performance gain.

### Why localStorage for recent operations history

History is per-device user data — it doesn't need server sync, doesn't need authentication, doesn't justify the operational complexity of a backend. localStorage stores 5MB per origin, which holds tens of thousands of history entries (we cap at the last 5 anyway). No backend, no auth, no sync — just instant, durable, device-local memory.

### Why Unicode-aware utilities (not just ASCII)

Modern text isn't ASCII. Users paste Urdu, Arabic, Chinese, emoji. A `toUpperCase` that breaks on accented characters is broken. The transformation utilities use JavaScript's built-in Unicode-aware methods, and Base64 encoding uses `TextEncoder`/`TextDecoder` (which handle UTF-8 correctly) instead of the naive `btoa(str)` approach (which fails on any non-Latin1 character). Unit tests include Unicode cases — character frequency analysis works for Urdu text, encoding round-trips emoji correctly.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Language | TypeScript (strict + `noUncheckedIndexedAccess`) |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui (Radix primitives) |
| State Management | Zustand (with persist middleware) |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |
| Fonts | @fontsource/geist-sans, @fontsource/geist-mono |
| Icons | lucide-react |
| Notifications | react-hot-toast |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  React Application                      │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  UI Layer (components/pages)     │   │
│  │  - Sidebar (categorized)         │   │
│  │  - Tool pages (5 categories)     │   │
│  │  - Shared (TextInput, Result)    │   │
│  └─────────────┬────────────────────┘   │
│                │ imports                │
│                ▼                        │
│  ┌──────────────────────────────────┐   │
│  │  Pure Logic Layer (src/lib/)     │   │
│  │  - transformations.ts            │   │
│  │  - analysis.ts                   │   │
│  │  - encoding.ts                   │   │
│  │  - generators.ts                 │   │
│  │  - developer.ts                  │   │
│  │  (all pure functions, no UI)     │   │
│  └──────────────────────────────────┘   │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  State Layer (Zustand)           │   │
│  │  - theme.store.ts (persisted)    │   │
│  │  - history.store.ts (persisted)  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
            │
            │ (no backend — pure client app)
            ▼
       [Browser memory]
```

**Why no backend:** TextKit is a pure-client app. Every transformation runs in the user's browser. No data leaves the device. No accounts, no API calls, no analytics. The simplicity is the feature — instant load, no rate limits, no privacy concerns.

---

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** 9+

That's it. No database, no backend, no external services.

---

## 🚀 Getting Started

### Clone

```bash
git clone https://github.com/Haseebaleem/TextKit.git
cd TextKit
```

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Open `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Total bundle size: ~118 KB gzipped (JS) + 6 KB (CSS).

### Run tests

```bash
npm test
```

---

## 📁 Project Structure

```
TextKit/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx     # categorized tool nav
│   │   │   └── ThemeToggle.tsx
│   │   ├── shared/
│   │   │   ├── TextInput.tsx
│   │   │   ├── ResultPanel.tsx
│   │   │   ├── CopyButton.tsx
│   │   │   └── StatsCard.tsx
│   │   └── tools/
│   │       ├── transformations/
│   │       ├── analysis/
│   │       ├── encoding/
│   │       ├── generators/
│   │       └── developer/
│   ├── lib/
│   │   ├── text-utils/         # PURE FUNCTIONS — fully tested
│   │   │   ├── transformations.ts
│   │   │   ├── analysis.ts
│   │   │   ├── encoding.ts
│   │   │   ├── generators.ts
│   │   │   ├── developer.ts
│   │   │   └── index.ts
│   │   └── utils.ts            # shadcn's cn() helper
│   ├── stores/
│   │   ├── theme.store.ts      # persisted
│   │   └── history.store.ts    # persisted
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── tools/
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts
│   │   └── useDebouncedValue.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   └── lib/                    # unit tests for every utility
├── public/
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🧪 Testing

Unit tests cover every pure utility function with comprehensive edge cases including empty input, Unicode (Urdu, emoji), special characters, and boundary conditions:

```bash
npm test
```

**Coverage:** 101 unit tests across 6 test files — 95 utility tests + 6 smoke tests.

Sample test cases:
- `toCamelCase("hello world")` → `"helloWorld"`
- `toCamelCase("")` → `""`
- `toCamelCase("multiple   spaces")` → `"multipleSpaces"`
- `countWords("  hello   world  ")` → `2`
- `base64Encode("ñ")` → properly encodes Unicode
- `generateSlug("###")` → fallback (short uuid) instead of empty string
- `formatJson("invalid")` → returns error with position information

---

## 🗺️ Roadmap

### Additional Utilities
- [ ] QR code generator
- [ ] Hash generators (MD5, SHA-1, SHA-256)
- [ ] JWT decoder (display payload + verify signature with known key)
- [ ] CSV to JSON converter
- [ ] Markdown to HTML preview
- [ ] Color converter (hex / rgb / hsl / oklch)

### Operations
- [ ] PWA installability for offline use
- [ ] Share-by-URL — encode current tool state in URL for sharing
- [ ] Browser extension (Chrome/Firefox) for quick access
- [ ] Command palette improvements (fuzzy search, recent items)

### Accessibility & UX
- [ ] Keyboard shortcut overlay (press `?` to view)
- [ ] Screen reader optimization for all tools
- [ ] High-contrast mode option
- [ ] Configurable font size

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file. Use it as a reference, starting point, or learning resource.

---

## 👤 Author

**Haseeb Aleem**
Senior Full Stack Developer & Team Lead

- 💼 **LinkedIn:** [linkedin.com/in/haseeb-aleem-dev](https://www.linkedin.com/in/haseeb-aleem-dev/)
- 💻 **GitHub:** [github.com/Haseebaleem](https://github.com/Haseebaleem)
- 📧 **Email:** haseebaleem2802@gmail.com
- 📍 **Location:** Multan, Pakistan (Open to Saudi Arabia & GCC relocation)

---

⭐ If you found this project useful, consider giving it a star.
