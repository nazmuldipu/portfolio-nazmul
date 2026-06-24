# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals)
npm run start    # Start production server
```

No test suite exists.

## Architecture

Next.js 14 with **Pages Router** (not App Router). Single-page portfolio with ISR.

### Data flow

```
Sanity CMS (project: u3z7hv6o)
  → pages/index.tsx              getStaticProps, 60s revalidation; picks template by env
  → src/sanity/lib/queries.ts    GROQ query (getPortfolioPage) — shared by all templates
  → src/sanity/lib/client.ts     Sanity client (env-var configured)
  → src/templates/index.ts       registry: resolveTemplate(env) → { Component, mapPortfolio, … }
  → src/templates/<key>/map.ts   mapPortfolio() transforms raw CMS data (per-template shape)
  → src/templates/<key>/Portfolio.jsx  the presentation layer for that template
```

All visible content (name, headline, experience, projects, skills, images, social links) is CMS-driven. The only hardcoded content in a template is its section order, labels, and navigation structure.

### Templates

The page renders one of several **self-contained templates**, selected at build time by `NEXT_PUBLIC_PORTFOLIO_TEMPLATE` (see Env vars). Each lives in `src/templates/<key>/` with its own `Portfolio.jsx`, `map.ts` (mapper), themed `button.tsx` + `badge.tsx`, and an `index.ts` exporting a `PortfolioTemplate`. The registry in `src/templates/index.ts` maps the env value to a template; unknown/unset → `DEFAULT_TEMPLATE`.

Current templates:
- `emerald` (default) — light emerald + gold jewel identity, "N" monogram, Inter + JetBrains Mono.
- `classic` — numbered "syllabus" rail with bilingual labels, Bricolage Grotesque + IBM Plex Sans, indigo/marker accents, dark-mode swap.

**Adding a template:** create `src/templates/<key>/` (mirror an existing one), scope its tokens under `.tpl-<key>` in `globals.css`, add any new color tokens to `tailwind.config.js`, then register it in `TEMPLATES`. The query in `queries.ts` is shared, so a new mapper just reshapes the same `raw` document.

### Key files

| File | Role |
|------|------|
| `pages/index.tsx` | Entry point, `getStaticProps`, image URL builder, template selection |
| `src/templates/index.ts` | Template registry + `resolveTemplate()` + `DEFAULT_TEMPLATE` |
| `src/templates/<key>/Portfolio.jsx` | A template's main component (sections, nav, IntersectionObserver reveal) |
| `src/templates/<key>/map.ts` | A template's CMS-to-UI mapping; `mapPortfolio(raw, urlFor)` |
| `src/sanity/lib/queries.ts` | GROQ query — shared by all templates; edit to add CMS fields |
| `src/sanity/lib/api.ts` | Env constants and studio URL |
| `styles/variables.css` | Base font-family declarations |
| `styles/globals.css` | Per-template tokens scoped under `.tpl-<key>` (+ shared base, fonts) |

### Design system

Each template defines its CSS custom properties scoped to its root class `.tpl-<key>` in `globals.css`; the active template's wrapper `<div>` carries that class. Tailwind integrates the **union** of tokens via `rgb(var(--token) / <alpha-value>)` in `tailwind.config.js`, so shared, var-backed names (`text-ink`, `bg-paper`, `bg-emerald/20`, `bg-marker`) resolve to whichever template is active. Dark mode is `classic`-only (`@media (prefers-color-scheme: dark)` scoped to `.tpl-classic`).

Custom Tailwind color tokens: shared `ink`, `paper`, `card`, `rule`; `classic` adds `marker`, `indigo`, `on-marker`; `emerald` adds `graphite`, `mist`, `mint`, `emerald`(+`-90/-70/-20/-tint`), `gold`, `gold-bright`. (Plus the legacy site tokens `primary`, `secondary`, `accent`.)

### UI components

Theme-agnostic Radix primitives live in `src/components/ui/` (`card`, `separator`, `avatar`, `aspect-ratio`) — they use shared var-backed tokens and work under any template. Design-specific primitives (`button`, `badge`) are **per-template** (`src/templates/<key>/button.tsx`, `badge.tsx`). Use these before reaching for new libraries.

### Routing

- `/` → portfolio (home)
- `/portfolio` → permanent redirect to `/` (configured in `next.config.js`)
- No other routes. No API routes.

### Images

All images are served from `cdn.sanity.io` via the Sanity image URL builder. The Next.js `<Image>` remote hostname is configured to allow this domain. CV falls back through: Sanity-linked asset → `cvUrl` field → `/public/nazmul_alam_cv.pdf`.

## Env vars

```
NEXT_PUBLIC_SANITY_PROJECT_ID=u3z7hv6o
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01
NEXT_PUBLIC_PORTFOLIO_TEMPLATE=emerald   # which template to render: emerald (default) | classic
```

These are public (prefixed `NEXT_PUBLIC_`). `.env` is gitignored; the tracked template is `.env.example` — keep it in sync when adding vars. `NEXT_PUBLIC_PORTFOLIO_TEMPLATE` is inlined at build time — changing it requires a rebuild (`npm run build`), not just a restart of `npm run start`.
