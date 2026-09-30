import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { cn } from "cn"

export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold tracking-tight",
        inverted ? "text-inverse-foreground" : "text-foreground",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ShoppingBag className="size-4" />
      </span>
      Sirsa-SaaS
    </Link>
  )
}
