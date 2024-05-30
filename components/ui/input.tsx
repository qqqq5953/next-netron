import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "bottom" | "all";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "all", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          ` ${variant === "bottom" ?
            "border-b" :
            "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          } flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
