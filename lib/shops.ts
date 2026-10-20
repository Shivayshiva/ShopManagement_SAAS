export type Shop = {
  id: string
  name: string
  city: string
  /** Soft accent used as the thumbnail placeholder until real photos exist. */
  tone: "sage" | "mint" | "sand" | "sky" | "rose" | "slate"
}

const DEMO_SHOPS: Shop[] = [
  { id: "main-market", name: "Main Market Store", city: "Chandigarh", tone: "sage" },
  { id: "sector-17", name: "Sector 17 Boutique", city: "Chandigarh", tone: "mint" },
  { id: "industrial-area", name: "Industrial Area Hub", city: "Mohali", tone: "sand" },
  { id: "zac-plaza", name: "ZAC Plaza Outlet", city: "Panchkula", tone: "sky" },
  { id: "railway-road", name: "Railway Road Shop", city: "Ambala", tone: "rose" },
  { id: "city-center", name: "City Center Store", city: "Ludhiana", tone: "slate" },
]

const toneClass: Record<Shop["tone"], string> = {
  sage: "bg-accent",
  mint: "bg-success/20",
  sand: "bg-warning/20",
  sky: "bg-info/20",
  rose: "bg-destructive/15",
  slate: "bg-muted",
}

export function getShopsForOrganization(_organizationId: string): Shop[] {
  return DEMO_SHOPS
}

export function getShop(organizationId: string, shopId: string): Shop | undefined {
  return getShopsForOrganization(organizationId).find((shop) => shop.id === shopId)
}

export function shopToneClass(tone: Shop["tone"]) {
  return toneClass[tone]
}
