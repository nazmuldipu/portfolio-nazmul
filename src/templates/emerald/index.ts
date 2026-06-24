// Emerald template — light emerald + gold jewel identity with the "N" monogram,
// Inter + JetBrains Mono. Selected with NEXT_PUBLIC_PORTFOLIO_TEMPLATE=emerald
// (the default).
import Portfolio from "./Portfolio";
import { mapPortfolio } from "./map";
import type { PortfolioTemplate } from "../index";

const template: PortfolioTemplate = {
  key: "emerald",
  label: "Emerald — light emerald + gold, N monogram (Inter + JetBrains Mono)",
  Component: Portfolio,
  mapPortfolio,
  favicon: "/favicon-emerald.svg",
  rootClass: "tpl-emerald",
};

export default template;
