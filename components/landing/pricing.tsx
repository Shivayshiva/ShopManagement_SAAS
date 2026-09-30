"use client"

import { Section, SectionIntro } from "@/components/design-system"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"
import { Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const plans = [
  {
    name: "Free Trial",
    monthly: 0,
    yearly: 0,
    description: "Try the full workflow before you commit.",
    features: ["14 days", "1 shop", "Billing and stock", "No card required"],
    cta: "Start free trial",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Starter",
    monthly: 499,
    yearly: 399,
    description: "For a single shop that is ready to leave spreadsheets.",
    features: ["1 shop", "Unlimited bills", "Customers and dues", "Basic reports"],
    cta: "Choose Starter",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Growth",
    monthly: 999,
    yearly: 799,
    description: "For owners running more than one counter or location.",
    features: [
      "Up to 5 shops",
      "Staff roles",
      "Purchase orders",
      "Profit reports",
    ],
    cta: "Choose Growth",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "For larger chains that need a tailored setup.",
    features: ["Unlimited shops", "Priority support", "Custom roles", "Onboarding help"],
    cta: "Talk to us",
    href: "/register",
    highlighted: false,
  },
]

function formatPrice(amount: number | null) {
  if (amount === null) return "Custom"
  if (amount === 0) return "₹0"
  return `₹${amount.toLocaleString("en-IN")}`
}

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <Section id="pricing">
        <SectionIntro title="Choose the Plan That Fits Your Business" />
        <div className="mt-5 text-center">
          <div className="inline-flex rounded-lg bg-surface p-1 shadow-sm ring-1 ring-border">
            <Button
              variant={yearly ? "ghost" : "default"}
              className="h-8 px-3"
              onClick={() => setYearly(false)}
            >
              Monthly
            </Button>
            <Button
              variant={yearly ? "default" : "ghost"}
              className="h-8 px-3"
              onClick={() => setYearly(true)}
            >
              Yearly
            </Button>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly
            return (
              <Card
                key={plan.name}
                className={cn(
                  "bg-surface shadow-sm",
                  plan.highlighted && "ring-2 ring-primary"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.highlighted ? <Badge>Popular</Badge> : null}
                  </div>
                  <p className="text-3xl font-semibold text-foreground">
                    {formatPrice(price)}
                    {price ? (
                      <span className="text-sm font-normal text-muted-foreground">
                        /mo
                      </span>
                    ) : null}
                  </p>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-0 bg-transparent">
                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({
                        variant: plan.highlighted ? "default" : "outline",
                      }),
                      "h-9 w-full"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
    </Section>
  )
}
