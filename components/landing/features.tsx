import { Section, SectionIntro } from "@/components/design-system"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const groups = [
  {
    title: "Sales & Billing",
    items: [
      "Quick billing and invoices",
      "Returns and exchanges",
      "Multiple payment modes",
      "Discounts and offers",
    ],
  },
  {
    title: "Inventory Management",
    items: [
      "Stock tracking and alerts",
      "Product categories",
      "Barcode support",
      "Optional warehouse view",
    ],
  },
  {
    title: "Purchasing & Suppliers",
    items: [
      "Purchase orders",
      "Supplier ledger",
      "Payment tracking",
      "Purchase returns",
    ],
  },
  {
    title: "Customers",
    items: [
      "Customer profiles",
      "Credit and dues",
      "Purchase history",
      "Loyalty and follow-ups",
    ],
  },
  {
    title: "Employees",
    items: [
      "Staff accounts",
      "Role permissions",
      "Optional attendance",
      "Commission tracking",
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      "Sales reports",
      "Profit and loss",
      "Inventory reports",
      "GST-ready summaries",
    ],
  },
]

export function Features() {
  return (
    <Section id="features" tone="surface">
      <SectionIntro
        eyebrow="Everything you need"
        title="Powerful Features for Every Part of Your Business"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.title} className="bg-muted shadow-none">
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
