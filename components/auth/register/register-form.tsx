"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CircleAlert } from "lucide-react"
import type { RegisterResult } from "@/app/(auth)/register/actions"
import type { AccountValues, RegisterValues } from "@/components/auth/register/schema"
import { StepAccount } from "@/components/auth/register/step-account"
import { Type } from "@/components/design-system"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { writeOnboardDraft } from "@/lib/onboard"

export function RegisterForm({
  action,
}: {
  action: (input: RegisterValues) => Promise<RegisterResult>
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [account, setAccount] = useState<AccountValues | null>(null)
  const [pending, startTransition] = useTransition()
  const titleRef = useRef<HTMLParagraphElement>(null)

  function submit(values: AccountValues) {
    setError(null)
    setAccount(values)

    startTransition(async () => {
      try {
        const result = await action({ account: values })
        if (!result.ok) {
          setError(result.message)
          return
        }
        writeOnboardDraft({
          firstName: values.firstName,
          mobile: values.mobile,
          email: values.email,
        })
        router.push("/onboard/verify")
      } catch {
        setError("We couldn't create your account right now. Please try again.")
      }
    })
  }

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border-0 bg-surface shadow-raised ring-border">
      <CardHeader className="shrink-0 gap-2 px-4 pb-1 sm:px-5">
        <Type as="h2" variant="title" ref={titleRef} tabIndex={-1} className="text-xl">
          Create your account
        </Type>
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

        <StepAccount defaultValues={account ?? undefined} onNext={submit} pending={pending} />
      </CardContent>
    </Card>
  )
}
