// Portfolio template registry.
//
// Each template is a fully self-contained design (its own component, data
// mapper, themed Button/Badge, fonts, and CSS tokens scoped under `rootClass`
// in styles/globals.css). The active one is chosen at build time by the
// NEXT_PUBLIC_PORTFOLIO_TEMPLATE env var; see pages/index.tsx.
//
// To add a future template:
//   1. create src/templates/<key>/ with Portfolio.jsx, map.ts, button.tsx,
//      badge.tsx, and an index.ts exporting a PortfolioTemplate;
//   2. scope its tokens under `.tpl-<key>` in styles/globals.css and add any
//      new color tokens to tailwind.config.js;
//   3. register it in TEMPLATES below.

import classic from "./classic";
import emerald from "./emerald";

// `urlFor(source, width, height)` builds a Sanity image URL (or null).
type UrlFor = (source: any, width: number, height: number) => string | null;

export interface PortfolioTemplate {
  key: string;
  label: string;
  Component: (props: { data: any }) => JSX.Element;
  mapPortfolio: (raw: any, urlFor: UrlFor) => any;
  favicon: string;
  rootClass: string;
}

export const TEMPLATES = { classic, emerald } as const;

export type TemplateKey = keyof typeof TEMPLATES;

// Default when the env var is unset or unrecognized.
export const DEFAULT_TEMPLATE: TemplateKey = "emerald";

export function resolveTemplate(key?: string | null): PortfolioTemplate {
  const k = (key || "").trim();
  return (TEMPLATES as Record<string, PortfolioTemplate>)[k] || TEMPLATES[DEFAULT_TEMPLATE];
}
