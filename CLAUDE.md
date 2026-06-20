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
  → pages/index.tsx           getStaticProps, 60s revalidation
  → src/sanity/lib/queries.ts GROQ query (getPortfolioPage)
  → src/sanity/lib/client.ts  Sanity client (env-var configured)
  → src/utils/portfolioPage.ts mapPortfolio() transforms raw CMS data
  → src/components/Portfolio.jsx single orchestrated presentation layer
```

All visible content (name, headline, experience, projects, skills, images, CV URL, social links) is CMS-driven. The only hardcoded content in the component is the section order, labels (Bengali + English), and navigation structure.

### Key files

| File | Role |
|------|------|
| `pages/index.tsx` | Entry point, `getStaticProps`, image URL builder |
| `src/components/Portfolio.jsx` | ~525-line main component; all six sections, sidebar nav, IntersectionObserver scroll logic |
| `src/utils/portfolioPage.ts` | CMS-to-UI data mapping; `mapPortfolio()`, `plain()`, `bulletPoints()`, `parseTech()` |
| `src/sanity/lib/queries.ts` | GROQ query — edit here to add new CMS fields |
| `src/sanity/lib/api.ts` | Env constants and studio URL |
| `styles/variables.css` | Font family declarations (primary, secondary, stylus, mono) |
| `styles/globals.css` | CSS custom properties (--ink, --paper, --card, --rule, --marker, --indigo) with light/dark values |

### Design system

Colors are defined as CSS custom properties in `globals.css` scoped to `.portfolio-root`. Dark mode is `@media (prefers-color-scheme: dark)` — no class-based toggle. Tailwind integrates these via `rgb(var(--token) / <alpha-value>)` in `tailwind.config.js`, so you can use `text-ink`, `bg-paper`, `bg-indigo/20`, etc.

Custom Tailwind color tokens: `ink`, `paper`, `card`, `rule`, `marker`, `indigo`, `on-marker`, `primary`, `secondary`, `accent`.

### UI components

Radix UI primitives wrapped with `class-variance-authority` live in `src/components/ui/`. Use these before reaching for new libraries: `button`, `card`, `badge`, `avatar`, `separator`, `aspect-ratio`.

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
```

These are public (prefixed `NEXT_PUBLIC_`) and safe to commit. The `.env` file is tracked.
