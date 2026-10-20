import { notFound } from "next/navigation"
import { ShopHeader } from "@/components/organization/shop-header"
import { ShopSidebar } from "@/components/organization/shop-sidebar"
import { getShop } from "@/lib/shops"

export function ShopShell({
  organizationId,
  shopId,
  children,
}: {
  organizationId: string
  shopId: string
  children: React.ReactNode
}) {
  const shop = getShop(organizationId, shopId)
  if (!shop) notFound()

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <ShopSidebar organizationId={organizationId} shopId={shopId} shopName={shop.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ShopHeader organizationId={organizationId} shopName={shop.name} city={shop.city} />
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="shop-panel min-h-full rounded-xl border border-border bg-white p-4 shadow-sm sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
