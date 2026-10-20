import type { Metadata } from "next"
import Link from "next/link"
import { Building2 } from "lucide-react"
import { ShopCard } from "@/components/organization/shop-card"
import { IconWell, Type } from "@/components/design-system"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getShopsForOrganization } from "@/lib/shops"
import { cn } from "cn"

type OrganizationHomeProps = {
  params: Promise<{ organizationId: string }>
}

export async function generateMetadata({
  params,
}: OrganizationHomeProps): Promise<Metadata> {
  const { organizationId } = await params
  return {
    title: `Organization ${organizationId} — Sirsa-SaaS`,
    description: "Your organization home in Sirsa-SaaS.",
  }
}

export default async function OrganizationHomePage({ params }: OrganizationHomeProps) {
  const { organizationId } = await params
  const shops = getShopsForOrganization(organizationId)

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Organization</p>
          <Type as="h1" variant="heading" className="mt-1">
            Organization home
          </Type>
          <Type variant="body" className="mt-2">
            You are viewing <span className="font-mono text-foreground">{organizationId}</span>.
          </Type>
        </div>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
          Back to marketing site
        </Link>
      </div>

      <Card className="mt-8 border-0 bg-surface shadow-raised ring-border">
        <CardHeader className="flex-row items-center gap-3">
          <IconWell className="size-11 rounded-xl bg-accent text-accent-foreground">
            <Building2 className="size-5" />
          </IconWell>
          <div>
            <CardTitle className="text-lg">Your shops</CardTitle>
            <Type variant="body" className="mt-1 text-sm">
              Open a shop to manage billing, stock, and staff for that location.
            </Type>
          </div>
        </CardHeader>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {shops.map((shop) => (
          <ShopCard key={shop.id} organizationId={organizationId} shop={shop} />
        ))}
      </div>
    </section>
  )
}
