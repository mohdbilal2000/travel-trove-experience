
// Re-export the shadcn/ui button to maintain backwards compatibility
import { Button as ShadcnButton, ButtonProps, buttonVariants } from "@/components/ui/button";

export type { ButtonProps };
export { buttonVariants };

// Re-export with default export for backward compatibility
export default ShadcnButton;
