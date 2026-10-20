"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CircleAlert } from "lucide-react"
import { StepOrganization } from "@/components/auth/register/step-organization"
import { StepTax } from "@/components/auth/register/step-tax"
import type { OrganizationValues, TaxValues } from "@/components/auth/register/schema"
import { Type } from "@/components/design-system"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { readOnboardDraft, writeOnboardDraft } from "@/lib/onboard"

export function OrganizationOnboardForm() {
  const router = useRouter()
  const [phase, setPhase] = useState<"organization" | "tax">("organization")
  const [organization, setOrganization] = useState<Partial<OrganizationValues>>({})
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const draft = readOnboardDraft()
    if (!draft?.mobile || !draft?.email) {
      router.replace("/onboard/verify")
      return
    }
    setReady(true)
  }, [router])

  function saveOrganization(values: OrganizationValues) {
    setOrganization(values)
    setError(null)
    setPhase("tax")
  }

  function saveTax(values: TaxValues) {
    setError(null)
    startTransition(() => {
      const draft = readOnboardDraft()
      if (!draft) {
        router.replace("/register")
        return
      }
      writeOnboardDraft({
        ...draft,
        businessName: organization.businessName ?? draft.businessName,
      })
      void values
      router.push("/onboard/subscription")
    })
  }

  if (!ready) {
    return (
      <Card className="border-0 bg-surface shadow-raised ring-border">
        <CardContent className="px-4 py-8 text-center sm:px-6">
          <Type variant="body">Loading…</Type>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border-0 bg-surface shadow-raised ring-border">
      <CardHeader className="shrink-0 gap-1 px-4 sm:px-6">
        <Type as="h2" variant="title" className="text-xl">
          {phase === "organization" ? "Tell us about your business" : "Tax details"}
        </Type>
        <Type variant="body" className="text-sm">
          {phase === "organization"
            ? "This creates your organization profile."
            : "Add GST details now, or skip and finish later."}
        </Type>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 sm:px-6">
        {error ? (
          <p
            role="alert"
            className="mb-4 flex gap-2.5 rounded-lg bg-destructive/10 p-4 text-base text-destructive"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        ) : null}

        {phase === "organization" ? (
          <StepOrganization
            defaultValues={organization}
            onNext={saveOrganization}
            pending={pending}
          />
        ) : (
          <StepTax
            defaultValues={undefined}
            onNext={saveTax}
            onBack={() => setPhase("organization")}
            pending={pending}
          />
        )}
      </CardContent>
    </Card>
  )
}
