import { Type } from "@/components/design-system/type"
import { Container } from "@/components/layout/container"
import { cn } from "cn"
import { cva, type VariantProps } from "class-variance-authority"

const sectionVariants = cva("py-16 sm:py-20", {
  variants: {
    tone: {
      default: "bg-background text-foreground",
      surface: "bg-surface text-foreground",
      inverse: "bg-inverse text-inverse-foreground",
    },
  },
  defaultVariants: {
    tone: "default",
  },
})

export function Section({
  id,
  tone,
  className,
  children,
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section id={id} className={cn(sectionVariants({ tone }), className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <Type as="p" variant="eyebrow" className="mb-2">
          {eyebrow}
        </Type>
      ) : null}
      <Type as="h2" variant="heading">
        {title}
      </Type>
      {description ? (
        <Type variant="body" className="mt-3">
          {description}
        </Type>
      ) : null}
    </div>
  )
}
