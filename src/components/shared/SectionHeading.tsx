
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  alignment = "center",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        "mb-10",
        alignment === "center" && "text-center",
        alignment === "left" && "text-left",
        alignment === "right" && "text-right",
        className
      )}
    >
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-display font-medium mb-3",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={cn(
            "text-lg text-muted-foreground max-w-3xl mx-auto",
            alignment === "center" && "mx-auto",
            alignment === "left" && "ml-0",
            alignment === "right" && "mr-0",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
