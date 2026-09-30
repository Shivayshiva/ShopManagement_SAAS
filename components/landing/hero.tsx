import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Type } from "@/components/design-system"
import { Container } from "@/components/layout/container"
import { cn } from "cn"
import { Check } from "lucide-react"
import Link from "next/link"

const products = [
  { name: "Basmati Rice 5kg", value: 86 },
  { name: "Sunflower Oil 1L", value: 72 },
  { name: "Toor Dal 1kg", value: 58 },
  { name: "Detergent 1kg", value: 41 },
]

export function Hero() {
  return (
    <section className="overflow-hidden bg-surface">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <Badge variant="secondary" className="h-6 bg-accent text-accent-foreground">
            Built for growing shops
          </Badge>
          <Type as="h1" variant="display" className="mt-4 max-w-xl">
            Complete Shop Management Software for Growing Businesses
          </Type>
          <Type variant="body" className="mt-4 max-w-lg sm:text-lg">
            Manage your stock, inventory, customers, suppliers, employees,
            expenses and more — all from one powerful and easy to use platform.
          </Type>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className={cn(buttonVariants(), "h-10 rounded-lg px-5")}
            >
              Start Free Trial
            </Link>
            <Link
              href="/#pricing"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 rounded-lg bg-surface px-5"
              )}
            >
              View Demo & Pricing
            </Link>
          </div>
          <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5">
            {["No credit card required", "Setup in minutes"].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Card className="border-0 bg-surface shadow-raised ring-border">
          <CardHeader>
            <div>
              <p className="text-xs font-medium text-primary">Sirsa-SaaS</p>
              <CardTitle className="text-lg">Business Overview</CardTitle>
            </div>
            <p
              data-slot="card-action"
              className="text-xs text-muted-foreground"
            >
              Apr 1, 2025 – Apr 30, 2025
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Total Revenue" value="₹1,42,850" />
              <Stat label="Sales" value="543" />
              <Stat label="Expenses" value="₹48,210" />
            </div>
            <svg viewBox="0 0 320 90" className="h-24 w-full text-primary" aria-hidden>
              <path
                d="M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 S 210 62, 240 34 S 290 18, 320 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 S 210 62, 240 34 S 290 18, 320 22 V 90 H 0 Z"
                fill="currentColor"
                opacity="0.12"
              />
            </svg>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Top Products
              </p>
              <ul className="space-y-2">
                {products.map((product) => (
                  <li key={product.name} className="grid grid-cols-[1fr_72px] items-center gap-3 text-xs">
                    <span className="truncate text-foreground">{product.name}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${product.value}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
