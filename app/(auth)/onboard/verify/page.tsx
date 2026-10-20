import type { Metadata } from "next"
import { VerifyForm } from "@/components/auth/onboard/verify-form"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Verify contact — Sirsa-SaaS",
  description: "Verify your mobile number and email to continue onboarding.",
}

export default function VerifyOnboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-8 lg:px-10 lg:py-6">
      <div className="mb-4 shrink-0 text-center">
        <Type as="h1" variant="heading">
          Verify your contact
        </Type>
        <Type variant="body" className="mt-2">
          Confirm your mobile number and email before setting up your organization.
        </Type>
      </div>
      <VerifyForm />
    </div>
  )
}
