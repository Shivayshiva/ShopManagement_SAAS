import { cn } from "cn";
import { cva, type VariantProps } from "class-variance-authority";

const typeVariants = cva("", {
  variants: {
    variant: {
      display:
        "font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]",
      heading:
        "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
      title: "font-heading text-base font-semibold text-foreground",
      eyebrow: "font-sans text-sm font-medium text-primary",
      body: "font-sans text-base leading-relaxed text-muted-foreground",
      caption: "font-sans text-xs text-muted-foreground",
      mono: "font-mono text-sm text-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TypeProps = React.ComponentProps<"p"> &
  VariantProps<typeof typeVariants> & {
    as?: "h1" | "h2" | "h3" | "p" | "span"
  }

export function Type({
  as: Comp = "p",
  variant,
  className,
  ...props
}: TypeProps) {
  return <Comp className={cn(typeVariants({ variant }), className)} {...props} />
}
