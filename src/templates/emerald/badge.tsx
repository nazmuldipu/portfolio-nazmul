import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

// Chips. `tech` = filled emerald-tint chip used on work cards. `techGhost` =
// lighter outline chip used in the experience timeline. `skill` = the toolbox
// chip (Inter, white fill). Mono variants carry tabular figures for dates/tech.
const badgeVariants = cva(
  "inline-flex items-center rounded-full border transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        tech: "border-emerald-20 bg-emerald-tint px-[11px] py-[5px] font-mono text-xs text-emerald",
        techGhost:
          "border-rule bg-transparent px-[11px] py-[5px] font-mono text-xs text-graphite",
        skill:
          "border-rule bg-card px-4 py-2 text-sm font-medium text-ink hover:border-emerald-20",
        default: "border-rule bg-mist px-2.5 py-0.5 text-xs font-medium text-ink/80",
      },
    },
    defaultVariants: {
      variant: "tech",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
