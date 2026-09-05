import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "shadow hover:opacity-90 active:scale-[0.98]",
        destructive:
          "bg-red-900 text-red-100 shadow-sm hover:bg-red-800",
        outline:
          "border border-[var(--surface-variant)] bg-[var(--surface-high)] text-[var(--on-surface)] hover:bg-[var(--surface-bright)] hover:border-[var(--outline)]",
        secondary:
          "bg-[var(--surface-container)] text-[var(--on-surface)] hover:bg-[var(--surface-high)] border border-[var(--surface-variant)]",
        ghost:
          "text-[var(--on-surface-variant)] hover:bg-[var(--surface-high)] hover:text-[var(--primary)]",
        link:
          "text-[var(--primary)] underline-offset-4 hover:underline p-0 h-auto font-normal",
        brand:
          "bg-[var(--primary-container)] text-[var(--on-primary-fixed)] hover:bg-[var(--primary-fixed-dim)] shadow-md hover:shadow-lg transition-all",
        success:
          "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-sm",
        icon: "h-9 w-9 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={style}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
