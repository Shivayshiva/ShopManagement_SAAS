import type { Metadata } from "next"
import { SubscriptionPlans } from "@/components/auth/onboard/subscription-plans"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Subscription plan — Sirsa-SaaS",
  description: "Choose a subscription plan for your organization.",
}

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-8 lg:px-10 lg:py-6">
      <div className="mb-6 shrink-0 text-center">
        <Type as="h1" variant="heading">
          Choose a subscription plan
        </Type>
        <Type variant="body" className="mt-2">
          Pick the plan that fits your business. You can change this later.
        </Type>
      </div>
      <SubscriptionPlans />
    </div>
  )
}
