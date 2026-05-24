# TextKit

> A modern, developer-focused text utilities suite — 15+ tools across 5 categories, running entirely in your browser.

[![Node](https://img.shields.io/badge/Node-22+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎬 Demo

> _Screenshot / GIF coming soon — drop your captures into `docs/` and link them here._

<p align="center">
  <img src="docs/textkit-hero.png" alt="TextKit hero screenshot" width="800" />
</p>

---

## ✨ Features

**15+ utilities across 5 categories — all client-side, no data ever leaves your browser.**

### 🪄 Transformations
- **Case conversion** — `UPPER`, `lower`, `Title Case`, `Sentence case`
- **Programming case** — `camelCase`, `PascalCase`, `snake_case`, `kebab-case`, `SCREAMING_SNAKE_CASE`
- **Reverse** — reverse all characters or reverse word order
- **Whitespace** — remove extra spaces, strip all whitespace, trim each line
- **Line operations** — dedupe, sort (asc/desc), reverse, shuffle

### 📊 Analysis
- **Live statistics** — characters (with/without spaces), words, sentences, paragraphs, lines
- **Time estimates** — reading time (200 wpm) and speaking time (130 wpm)
- **Frequencies** — top 10 words and top 10 characters with proportional bar charts
- **Averages** — average word length

### 🔐 Encoding
- **Base64** — UTF-8 safe via `TextEncoder` / `TextDecoder` (handles emoji, Urdu, accented characters)
- **URL component** — `encodeURIComponent` / `decodeURIComponent`
- **HTML entities** — `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and numeric/hex entity decoding

### ✨ Generators
- **Lorem ipsum** — words or paragraphs
- **URL slug** — diacritic stripping, fallback for empty results
- **Random string** — configurable charset (upper, lower, numbers, symbols) and length
- **Password** — strong random with strength meter (very-weak → very-strong)

### 🛠️ Developer
- **JSON** — format (pretty-print), minify, and validate with parser-error position
- **Find & Replace** — regex mode, case-sensitivity toggle, live match count
- **Text Diff** — side-by-side line diff with additions / deletions color-coded

### 🎨 UX
- **Dark mode by default** with Zustand-persisted toggle
- **⌘K / Ctrl+K** command palette to jump to any tool
- **Recent operations** — last 10 actions saved to localStorage; one-click to recall input
- **Copy buttons everywhere** with toast confirmation
- **Mobile-responsive** — sidebar collapses on small screens

---

## 📖 Project Origin

This project began as a learning exercise — a basic text utility app built while following [Code with Harry](https://www.youtube.com/@CodeWithHarry)'s React tutorial series in 2023, when I was deepening my React fundamentals after several years of full-stack work. The original implementation covered five operations (uppercase, lowercase, clear, copy, whitespace cleanup) and basic text statistics.

In 2026, I rebuilt it from scratch as **TextKit** — a comprehensive developer-focused text utilities suite. The modernization includes:

- Migrated from **Create React App → Vite + TypeScript strict mode**
- Replaced Bootstrap with **Tailwind CSS + shadcn/ui** for a modern, accessible UI
- Expanded from **5 to 15+ utilities** across 5 categories
- Added **comprehensive unit test coverage** (100+ cases) with Vitest
- Implemented **proper architecture**: pure utility functions, Zustand state, React Router, dark mode via reactive store (not DOM mutation)
- Added **developer-focused tools**: JSON formatter, find/replace with regex, text diff, encoding/decoding

Mentioning the tutorial origin transparently — learning from quality educators is part of every developer's journey, and rebuilding learning projects with production-grade architecture is itself a valuable skill.

---

## 🛠️ Tech Stack

| Layer            | Tool                                          |
| ---------------- | --------------------------------------------- |
| Framework        | React 18                                      |
| Language         | TypeScript (strict mode)                      |
| Build            | Vite 5                                        |
| Styling          | Tailwind CSS v3 + CSS variables               |
| UI primitives    | shadcn/ui (Radix UI under the hood)           |
| Icons            | lucide-react                                  |
| State            | Zustand (theme + recent operations, persisted) |
| Routing          | React Router v6                               |
| Command palette  | cmdk                                          |
| Toasts           | react-hot-toast                               |
| Text diff        | `diff`                                        |
| Testing          | Vitest + Testing Library                      |

---

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/Haseebaleem/TextKit.git
cd TextKit

# install
npm install

# develop
npm run dev          # http://localhost:5173

# verify
npm run typecheck
npm test
npm run build        # outputs dist/
npm run preview      # preview the production build
```

Requires **Node 18+** (developed against 22).

---

## 🧪 Testing

```bash
npm test             # one-shot run
npm run test:watch   # watch mode
```

**101 unit tests** across 6 test files cover every pure utility function in `src/lib/text-utils/` — including edge cases for empty input, multi-word handling, Unicode (emoji, Urdu, accented characters), regex round-trips, and JSON parser-error reporting.

---

## 🗺️ Roadmap

- [ ] PWA support (offline + installable)
- [ ] Share-by-URL: encode current input + tool selection into a deep link
- [ ] Browser extension (right-click → run any TextKit tool on selected text)
- [ ] More utilities: JWT decoder, UUID generator, color converters, regex tester, markdown → HTML
- [ ] Internationalization (English first, then Urdu)
- [ ] Optional syntax highlighting for JSON / diff via `react-syntax-highlighter`

---

## 📄 License

[MIT](LICENSE) © Haseeb Aleem

---

## 👤 Author

**Haseeb Aleem** — full-stack developer

- 🔐 [Auth-Boilerplate](https://github.com/Haseebaleem/auth-boilerplate) — production-grade authentication starter
- ✅ [Task-Manager](https://github.com/Haseebaleem/Task-Manager) — modern task management app
- 🛒 [Inventory-POS](https://github.com/Haseebaleem/Inventory-POS) — inventory + point-of-sale system
- 🌍 [Marketplace](https://github.com/Haseebaleem/Marketplace) — multi-vendor commerce platform
- 💼 [LinkedIn](https://linkedin.com/in/haseeb-aleem-dev)
- 🐙 [GitHub](https://github.com/Haseebaleem)
- ✉️ [haseebaleem2802@gmail.com](mailto:haseebaleem2802@gmail.com)
