import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary-container)] text-[var(--on-primary-fixed)] shadow",
        secondary:
          "border-transparent bg-[var(--surface-high)] text-[var(--secondary)]",
        destructive:
          "border-transparent bg-red-900 text-red-100 shadow",
        outline:
          "border-[rgba(76,70,63,0.6)] bg-[var(--surface-high)] text-[var(--on-surface)]",
        success:
          "border-emerald-500/30 bg-emerald-950/50 text-emerald-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
