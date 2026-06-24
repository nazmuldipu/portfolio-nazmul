import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

// Themed to the emerald + gold palette via CSS variables (--emerald, --gold, …)
// so these primitives never collide with the existing site's Tailwind color
// tokens. One-spark-per-surface: on light, the primary CTA flips emerald → gold
// on hover (the page's one bold interaction); `onEmerald*` variants live on the
// emerald surfaces.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA on light surfaces: emerald → gold on hover.
        emerald: "bg-emerald font-semibold text-white hover:bg-gold hover:text-emerald",
        // Filled CTA on emerald surfaces: white → emerald-tint on hover.
        onEmerald:
          "bg-white font-semibold text-emerald hover:bg-emerald-tint",
        // Ghost/outline CTA on emerald surfaces.
        onEmeraldOutline:
          "border-[1.5px] border-white/40 bg-transparent font-semibold text-white hover:border-white hover:bg-white/[0.12]",
        outline:
          "border border-rule bg-transparent text-ink hover:border-emerald-20 hover:bg-emerald-tint/60",
        ghost: "text-ink hover:bg-ink/5",
        link: "rounded-none text-emerald underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "emerald",
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
