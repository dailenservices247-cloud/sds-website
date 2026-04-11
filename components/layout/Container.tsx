import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component className={cn("mx-auto w-full max-w-container px-6 md:px-8", className)}>
      {children}
    </Component>
  );
}
