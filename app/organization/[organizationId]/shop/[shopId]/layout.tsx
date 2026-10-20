import { ShopShell } from "@/components/organization/shop-shell"

type ShopLayoutProps = {
  children: React.ReactNode
  params: Promise<{ organizationId: string; shopId: string }>
}

export default async function ShopLayout({ children, params }: ShopLayoutProps) {
  const { organizationId, shopId } = await params;
  return (
    <ShopShell organizationId={organizationId} shopId={shopId}>
      {children}
    </ShopShell>
  )
}
