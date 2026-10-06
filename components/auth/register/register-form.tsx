"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { CircleAlert, CircleCheck } from "lucide-react"
import { cn } from "cn"
import type { RegisterResult, RegisterStepKey } from "@/app/(auth)/register/actions"
import type { RegisterValues } from "@/components/auth/register/schema"
import { StepAccount } from "@/components/auth/register/step-account"
import { StepOrganization } from "@/components/auth/register/step-organization"
import { StepStore } from "@/components/auth/register/step-store"
import { StepTax } from "@/components/auth/register/step-tax"
import { Stepper } from "@/components/auth/register/stepper"
import { IconWell, Type } from "@/components/design-system"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const STEPS = [
  {
    key: "account",
    label: "User Account",
    title: "Create your account",
  },
  {
    key: "organization",
    label: "Organization",
    title: "Tell us about your business",
  },
  {
    key: "tax",
    label: "Tax",
    title: "Tax details",
  },
  {
    key: "store",
    label: "Store",
    title: "Set up your first store",
  },
] as const satisfies readonly { key: RegisterStepKey; label: string; title: string }[]

type Draft = Partial<{ [K in RegisterStepKey]: Partial<RegisterValues[K]> }>

export function RegisterForm({
  action,
}: {
  action: (input: RegisterValues) => Promise<RegisterResult>
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [draft, setDraft] = useState<Draft>({})
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [pending, startTransition] = useTransition()
  const titleRef = useRef<HTMLParagraphElement>(null)
  const lastView = useRef(`${stepIndex}:${completed}`)

  const step = STEPS[stepIndex]

  // Move focus to the new step's heading so keyboard and screen reader users keep their place.
  useEffect(() => {
    const view = `${stepIndex}:${completed}`
    if (lastView.current === view) return
    lastView.current = view
    titleRef.current?.focus()
  }, [stepIndex, completed])

  function save<K extends RegisterStepKey>(key: K, values: RegisterValues[K]) {
    setDraft((current) => ({ ...current, [key]: values }))
  }

  function next<K extends RegisterStepKey>(key: K) {
    return (values: RegisterValues[K]) => {
      save(key, values)
      setError(null)
      setStepIndex((index) => Math.min(index + 1, STEPS.length - 1))
    }
  }

  function back<K extends RegisterStepKey>(key: K) {
    return (values: RegisterValues[K]) => {
      save(key, values)
      setError(null)
      setStepIndex((index) => Math.max(index - 1, 0))
    }
  }

  function submit(store: RegisterValues["store"]) {
    save("store", store)
    setError(null)

    // Every earlier step was validated before the user could reach this one.
    const payload = { ...draft, store } as RegisterValues

    startTransition(async () => {
      try {
        const result = await action(payload)
        if (result.ok) {
          setCompleted(true)
          return
        }
        setError(result.message)
        if (result.step) {
          setStepIndex(STEPS.findIndex((s) => s.key === result.step))
        }
      } catch {
        setError("We couldn't create your account right now. Please try again.")
      }
    })
  }

  if (completed) {
    return (
      <Card className="border-0 bg-surface shadow-raised ring-border">
        <CardContent className="flex flex-col items-center px-6 py-8 text-center sm:px-10">
          <IconWell className="size-12 rounded-full bg-success/10 text-success">
            <CircleCheck className="size-6" />
          </IconWell>
          <Type
            as="h2"
            variant="title"
            ref={titleRef}
            tabIndex={-1}
            className="mt-4 text-xl outline-none"
          >
            Your account is ready
          </Type>
          <Type variant="body" className="mt-2 max-w-sm text-sm">
            {draft.organization?.businessName} and {draft.store?.storeName} are set up. Sign in to
            start managing your shop.
          </Type>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-10 px-5")}>
            Continue to login
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border-0 bg-surface shadow-raised ring-border">
      <CardHeader className="shrink-0 gap-2 px-4 pb-1 sm:px-5">
        <Stepper steps={STEPS} current={stepIndex} />
        <div>
          <Type as="p" variant="eyebrow" className="text-xs">
            Step {stepIndex + 1} of {STEPS.length}
          </Type>
          <Type
            as="h2"
            variant="title"
            ref={titleRef}
            tabIndex={-1}
            className="mt-1 text-xl"
          >
            {step.title}
          </Type>
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-y-auto px-4 pb-3 sm:px-5">
        {error ? (
          <p
            role="alert"
            className="mb-5 flex gap-2.5 rounded-lg bg-destructive/10 p-4 text-base text-destructive"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        ) : null}

        {step.key === "account" ? (
          <StepAccount defaultValues={draft.account} onNext={next("account")} />
        ) : null}
        {step.key === "organization" ? (
          <StepOrganization
            defaultValues={draft.organization}
            onNext={next("organization")}
            onBack={back("organization")}
          />
        ) : null}
        {step.key === "tax" ? (
          <StepTax defaultValues={draft.tax} onNext={next("tax")} onBack={back("tax")} />
        ) : null}
        {step.key === "store" ? (
          <StepStore
            defaultValues={draft.store ?? { storeName: draft.organization?.businessName ?? "" }}
            onNext={submit}
            onBack={back("store")}
            pending={pending}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}
