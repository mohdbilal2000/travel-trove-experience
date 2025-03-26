
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", asChild = false, as, ...props }, ref) => {
    // If asChild is true, use Slot, if as is provided use that, otherwise use "button"
    const Comp = asChild ? Slot : as || "button";
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === "primary" && 
            "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5",
          
          variant === "secondary" && 
            "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:translate-y-0.5",
          
          variant === "outline" && 
            "border border-input bg-background hover:bg-muted hover:text-accent-foreground active:translate-y-0.5",
          
          variant === "ghost" && 
            "hover:bg-muted hover:text-accent-foreground active:translate-y-0.5",
          
          variant === "link" && 
            "text-primary underline-offset-4 hover:underline",
          
          // Sizes
          size === "sm" && "h-9 rounded-md px-3 text-xs",
          size === "md" && "h-10 rounded-md px-5 py-2 text-sm",
          size === "lg" && "h-12 rounded-md px-8 py-3",
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
