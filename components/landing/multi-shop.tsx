import { Section, Type } from "@/components/design-system"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"
import { Check } from "lucide-react"

const shops = [
  { name: "Shop 1", tone: "bg-chart-1/15 text-chart-1" },
  { name: "Shop 2", tone: "bg-chart-2/15 text-chart-2" },
  { name: "Shop 3", tone: "bg-chart-3/15 text-chart-3" },
  { name: "Shop 4", tone: "bg-chart-4/15 text-chart-4" },
]

const points = [
  "Centralized view of every branch",
  "Stock transfers between shops",
  "Role-based access for managers and cashiers",
  "Consolidated sales and profit reports",
  "One login for the whole business",
]

export function MultiShop() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <Card className="bg-muted shadow-none">
          <CardContent className="py-2">
            <p className="text-sm font-medium text-muted-foreground">Your Business</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {shops.map((shop) => (
                <div
                  key={shop.name}
                  className={cn(
                    "rounded-xl px-4 py-6 text-center text-sm font-semibold",
                    shop.tone
                  )}
                >
                  {shop.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div>
          <Type as="h2" variant="heading">
            One Business. Multiple Shops. One Dashboard.
          </Type>
          <Type variant="body" className="mt-3">
            See sales, stock, and staff across every location without switching
            accounts or spreadsheets.
          </Type>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
