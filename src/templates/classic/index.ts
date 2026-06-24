// Classic template — the original design: a numbered "syllabus" rail with
// bilingual labels, Bricolage Grotesque + IBM Plex Sans, indigo/marker accents,
// and a dark-mode swap. Selected with NEXT_PUBLIC_PORTFOLIO_TEMPLATE=classic.
import Portfolio from "./Portfolio";
import { mapPortfolio } from "./map";
import type { PortfolioTemplate } from "../index";

const template: PortfolioTemplate = {
  key: "classic",
  label: "Classic — syllabus rail (Bricolage Grotesque, indigo + marker)",
  Component: Portfolio,
  mapPortfolio,
  favicon: "/favicon-classic.svg",
  rootClass: "tpl-classic",
};

export default template;
