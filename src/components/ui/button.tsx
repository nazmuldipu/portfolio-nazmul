import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

// Themed to the Cefalo palette via CSS variables (--navy, --cyan, --rule, …) so
// these primitives never collide with the existing site's Tailwind color tokens.
// Pill CTAs follow the design's one-accent-per-surface rule: navy fill shifts to
// cyan on hover (light surfaces); the `onNavy*` variants live on navy surfaces.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA on light surfaces: navy → cyan on hover.
        navy: "bg-navy font-semibold text-white hover:bg-cyan",
        // Filled CTA on navy surfaces: white → navy-tint on hover.
        onNavy:
          "bg-white font-semibold text-navy hover:bg-navy-tint",
        // Ghost/outline CTA on navy surfaces.
        onNavyOutline:
          "border-[1.5px] border-white/40 bg-transparent font-semibold text-white hover:border-white hover:bg-white/[0.12]",
        outline:
          "border border-rule bg-transparent text-ink hover:border-navy-20 hover:bg-navy-tint/60",
        ghost: "text-ink hover:bg-ink/5",
        link: "rounded-none text-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "navy",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
