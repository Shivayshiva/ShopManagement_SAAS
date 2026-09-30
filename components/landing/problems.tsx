import { IconWell, Section, SectionIntro } from "@/components/design-system"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Clock,
  CreditCard,
  Store,
  Truck,
  Users,
  Warehouse,
} from "lucide-react"

const problems = [
  {
    title: "Stock Mismatch",
    description: "Real-time inventory tracking across all your shops.",
    icon: Warehouse,
  },
  {
    title: "Slow Billing",
    description: "Fast and accurate billing with multiple payment options.",
    icon: Clock,
  },
  {
    title: "Customer Credit",
    description: "Track customer dues and payment history in one place.",
    icon: CreditCard,
  },
  {
    title: "Supplier Payments",
    description: "Never miss supplier payments or purchase orders.",
    icon: Truck,
  },
  {
    title: "Employee Access",
    description: "Role-based permissions so each staff member sees the right work.",
    icon: Users,
  },
  {
    title: "Multi-Shop Management",
    description: "Manage every branch from a single dashboard.",
    icon: Store,
  },
]

export function Problems() {
  return (
    <Section id="solutions">
      <SectionIntro
        eyebrow="The challenge"
        title="Stop Managing Your Shop With Spreadsheets & Guesswork"
        description="You're not alone. Many shop owners struggle with stock mismatch, slow billing, customer credit, and supplier payments. Sirsa-SaaS solves these everyday problems so you can focus on growing the business."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Card key={problem.title} className="bg-surface shadow-sm">
            <CardHeader>
              <IconWell className="mb-2">
                <problem.icon className="size-4" />
              </IconWell>
              <CardTitle>{problem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{problem.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
