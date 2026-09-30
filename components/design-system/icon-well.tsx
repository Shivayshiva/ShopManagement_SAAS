import { cn } from "cn"

export function IconWell({
  className,
  children,
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
