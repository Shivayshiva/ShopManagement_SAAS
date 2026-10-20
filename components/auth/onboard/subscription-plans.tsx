"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Type } from "@/components/design-system"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "cn"
import { readOnboardDraft, writeOnboardDraft } from "@/lib/onboard"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    description: "For a single shop ready to leave spreadsheets.",
    features: ["1 shop", "Unlimited bills", "Customers and dues", "Basic reports"],
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 999,
    description: "For owners running more than one location.",
    features: ["Up to 5 shops", "Staff roles", "Purchase orders", "Profit reports"],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null as number | null,
    description: "For larger chains that need a tailored setup.",
    features: ["Unlimited shops", "Priority support", "Custom roles", "Onboarding help"],
    highlighted: false,
  },
]

function formatPrice(amount: number | null) {
  if (amount === null) return "Custom"
  return `₹${amount.toLocaleString("en-IN")}`
}

export function SubscriptionPlans() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [selecting, setSelecting] = useState<string | null>(null)

  useEffect(() => {
    const draft = readOnboardDraft()
    if (!draft?.mobile || !draft?.email) {
      router.replace("/onboard/verify")
      return
    }
    setReady(true)
  }, [router])

  function choosePlan(planId: string) {
    setSelecting(planId)
    const draft = readOnboardDraft()
    const organizationId =
      draft?.organizationId ??
      `org_${Math.random().toString(36).slice(2, 8)}`
    writeOnboardDraft({
      ...draft!,
      organizationId,
    })
    router.push(`/organization/${organizationId}`)
  }

  if (!ready) {
    return (
      <Card className="border-0 bg-surface shadow-raised ring-border">
        <CardContent className="px-4 py-8 text-center sm:px-6">
          <Type variant="body">Loading plans…</Type>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "border-0 bg-surface shadow-raised ring-border",
            plan.highlighted && "ring-2 ring-ring"
          )}
        >
          <CardHeader className="gap-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              {plan.highlighted ? <Badge>Popular</Badge> : null}
            </div>
            <p className="font-heading text-3xl font-semibold tracking-tight">
              {formatPrice(plan.price)}
              {plan.price !== null ? (
                <span className="text-base font-normal text-muted-foreground">/mo</span>
              ) : null}
            </p>
            <Type variant="body" className="text-sm">
              {plan.description}
            </Type>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="h-11 w-full"
              variant={plan.highlighted ? "default" : "outline"}
              disabled={selecting !== null}
              onClick={() => choosePlan(plan.id)}
            >
              {selecting === plan.id ? "Opening…" : `Choose ${plan.name}`}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
