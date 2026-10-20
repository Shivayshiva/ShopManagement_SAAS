import Link from "next/link"
import { Store } from "lucide-react"
import type { Shop } from "@/lib/shops"
import { shopToneClass } from "@/lib/shops"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"

export function ShopCard({
  organizationId,
  shop,
}: {
  organizationId: string
  shop: Shop
}) {
  return (
    <Link
      href={`/organization/${organizationId}/shop/${shop.id}`}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full overflow-hidden border-0 bg-surface shadow-raised ring-border transition-colors group-hover:ring-foreground/20">
        <div className={cn("relative flex h-36 items-center justify-center", shopToneClass(shop.tone))}>
          <Store className="size-10 text-foreground/50 transition-transform group-hover:scale-105" />
        </div>
        <CardContent className="gap-1 py-4">
          <h3 className="font-heading text-base font-semibold text-foreground">{shop.name}</h3>
          <p className="text-sm text-muted-foreground">{shop.city}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
