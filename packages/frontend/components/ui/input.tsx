import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border bg-[var(--surface-lowest)] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--outline)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary-container)] disabled:cursor-not-allowed disabled:opacity-50 text-[var(--on-surface)]",
          className
        )}
        style={{
          borderColor: "var(--surface-variant)",
          ...style,
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
