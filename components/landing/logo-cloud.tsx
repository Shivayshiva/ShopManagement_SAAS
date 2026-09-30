import { Section } from "@/components/design-system"
import { Car, HeartPulse, Leaf, Shirt, UtensilsCrossed } from "lucide-react"

const brands = [
  { name: "FoodMart", icon: UtensilsCrossed },
  { name: "StyleHub", icon: Shirt },
  { name: "AutoWorld", icon: Car },
  { name: "GreenGrocers", icon: Leaf },
  { name: "HealthPlus", icon: HeartPulse },
]

export function LogoCloud() {
  return (
    <Section tone="surface" className="border-y border-border py-8">
      <p className="text-center text-sm text-muted-foreground">
        Trusted by 5,000+ shop owners and businesses
      </p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {brands.map((brand) => (
          <li
            key={brand.name}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
          >
            <brand.icon className="size-4" />
            {brand.name}
          </li>
        ))}
      </ul>
    </Section>
  )
}
