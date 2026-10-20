import type { Metadata } from "next"
import { OrganizationOnboardForm } from "@/components/auth/onboard/organization-form"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Organization onboarding — Sirsa-SaaS",
  description: "Set up your organization and tax details.",
}

export default function OrganizationOnboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-8 lg:px-10 lg:py-6">
      <div className="mb-4 shrink-0 text-center">
        <Type as="h1" variant="heading">
          Onboard your organization
        </Type>
        <Type variant="body" className="mt-2">
          Tell us about your business so you can start managing shops.
        </Type>
      </div>
      <OrganizationOnboardForm />
    </div>
  )
}
