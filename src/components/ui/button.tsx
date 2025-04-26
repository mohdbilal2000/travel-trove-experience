
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-maroon-600 text-white hover:bg-maroon-700 active:bg-maroon-800",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-muted hover:text-maroon-600 text-royal-800",
        secondary:
          "bg-amber-500 text-royal-800 hover:bg-amber-600 hover:text-royal-900 active:bg-amber-700",
        ghost: "hover:bg-muted hover:text-maroon-600 text-royal-700",
        link: "text-maroon-600 underline-offset-4 hover:underline",
        accent: "bg-royal-700 text-white hover:bg-royal-800 active:bg-royal-900",
        saffron: "bg-amber-800 text-white hover:bg-amber-900 active:bg-amber-950",
        turquoise: "bg-[#40E0D0] text-royal-800 hover:bg-[#30D0C0] active:bg-[#20C0B0]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        md: "h-10 rounded-md px-5 py-2",
        lg: "h-12 rounded-md px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, as, ...props }, ref) => {
    const Comp = asChild ? Slot : as || "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
