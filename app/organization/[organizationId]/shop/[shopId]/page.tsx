import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Type } from "@/components/design-system"
import { getShop } from "@/lib/shops"

type ShopPageProps = {
  params: Promise<{ organizationId: string; shopId: string }>
}

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { organizationId, shopId } = await params
  const shop = getShop(organizationId, shopId)
  return {
    title: shop ? `${shop.name} — Sirsa-SaaS` : "Shop — Sirsa-SaaS",
    description: shop ? `${shop.name} in ${shop.city}` : "Shop details",
  }
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { organizationId, shopId } = await params
  const shop = getShop(organizationId, shopId)

  if (!shop) notFound()

  return (
    <div>
      <Type variant="body" className="mt-6 text-sm">
        Billing, stock, and staff tools for {shop.name} will live in this workspace.
      </Type>
    </div>
  )
}
