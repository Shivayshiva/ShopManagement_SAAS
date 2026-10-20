import Link from "next/link"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export function ShopHeader({
  organizationId,
  shopName,
  city,
}: {
  organizationId: string
  shopName: string
  city: string
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
      <div className="min-w-0">
        <p className="truncate font-heading text-base font-semibold tracking-tight text-foreground">
          {shopName}
        </p>
        <p className="truncate text-xs text-muted-foreground">{city}</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href={`/organization/${organizationId}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8")}
        >
          Organization
        </Link>
      </div>
    </header>
  )
}
