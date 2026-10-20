"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { OtpVerify } from "@/components/auth/register/otp-verify"
import { MOBILE_REGEX } from "@/components/auth/register/schema"
import { Type } from "@/components/design-system"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { readOnboardDraft, writeOnboardDraft } from "@/lib/onboard"
import { z } from "zod"

const emailSchema = z.string().trim().toLowerCase().pipe(z.email())

export function VerifyForm() {
  const router = useRouter()
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [mobileVerified, setMobileVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const draft = readOnboardDraft()
    if (!draft) {
      router.replace("/register")
      return
    }
    setMobile(draft.mobile)
    setEmail(draft.email)
    setReady(true)
  }, [router])

  const mobileReady = MOBILE_REGEX.test(mobile)
  const emailReady = emailSchema.safeParse(email).success

  function continueOnboarding() {
    if (!mobileVerified || !emailVerified) {
      setError("Verify both your mobile number and email before continuing.")
      return
    }
    const draft = readOnboardDraft()
    writeOnboardDraft({
      firstName: draft?.firstName,
      mobile,
      email,
      organizationId: draft?.organizationId,
      businessName: draft?.businessName,
    })
    router.push("/onboard/organization")
  }

  if (!ready) {
    return (
      <Card className="border-0 bg-surface shadow-raised ring-border">
        <CardContent className="px-4 py-8 text-center sm:px-6">
          <Type variant="body">Loading your details…</Type>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-surface shadow-raised ring-border">
      <CardHeader className="gap-1 px-4 sm:px-6">
        <Type as="h2" variant="title" className="text-xl">
          Verify email and mobile
        </Type>
        <Type variant="body" className="text-sm">
          Enter the test code 123456 for each channel.
        </Type>
      </CardHeader>
      <CardContent className="grid gap-6 px-4 pb-5 sm:px-6">
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="verify-mobile" className="text-base font-medium">
              Mobile number
              {mobileVerified ? (
                <Check className="ml-1 inline size-4 text-success" aria-label="Verified" />
              ) : null}
            </Label>
            <Input
              id="verify-mobile"
              value={mobile}
              disabled={mobileVerified}
              inputMode="numeric"
              onChange={(event) => {
                setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
                setMobileVerified(false)
                setError(null)
              }}
              className="h-12 rounded-md border-border bg-card px-3.5 text-base"
            />
          </div>
          <OtpVerify
            channel="mobile"
            target={mobile}
            ready={mobileReady && !mobileVerified}
            onVerifiedChange={setMobileVerified}
          />
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="verify-email" className="text-base font-medium">
              Email
              {emailVerified ? (
                <Check className="ml-1 inline size-4 text-success" aria-label="Verified" />
              ) : null}
            </Label>
            <Input
              id="verify-email"
              type="email"
              value={email}
              disabled={emailVerified}
              onChange={(event) => {
                setEmail(event.target.value)
                setEmailVerified(false)
                setError(null)
              }}
              className="h-12 rounded-md border-border bg-card px-3.5 text-base"
            />
          </div>
          <OtpVerify
            channel="email"
            target={email}
            ready={emailReady && !emailVerified}
            onVerifiedChange={setEmailVerified}
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="button"
          className="h-12 text-base"
          disabled={!mobileVerified || !emailVerified}
          onClick={continueOnboarding}
        >
          Continue to organization
        </Button>
      </CardContent>
    </Card>
  )
}
