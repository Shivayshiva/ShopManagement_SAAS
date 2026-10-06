"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { verifyOtp, type OtpChannel } from "@/app/(auth)/register/otp-actions"

const TEST_OTP = "123456"

export function OtpVerify({
  channel,
  target,
  ready,
  onVerifiedChange,
}: {
  channel: OtpChannel
  target: string
  /** True after the phone number or email passes schema validation. */
  ready: boolean
  onVerifiedChange: (verified: boolean) => void
}) {
  const [code, setCode] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackedTarget, setTrackedTarget] = useState(target)
  const targetRef = useRef(target)

  useEffect(() => {
    targetRef.current = target
  }, [target])

  if (target !== trackedTarget) {
    setTrackedTarget(target)
    setCode("")
    setError(null)
    if (verified) {
      setVerified(false)
      onVerifiedChange(false)
    }
  }

  async function confirm(next: string) {
    const requestedTarget = target
    const result = await verifyOtp(channel, requestedTarget, next)
    if (targetRef.current !== requestedTarget) return
    if (!result.ok) {
      setError(result.message)
      return
    }
    setVerified(true)
    onVerifiedChange(true)
  }

  function onCodeChange(raw: string) {
    const next = raw.replace(/\D/g, "").slice(0, 6)
    setCode(next)
    setError(null)
    if (next.length < 6) return
    if (next !== TEST_OTP) {
      setError("That OTP is incorrect")
      return
    }
    void confirm(next)
  }

  if (!ready || verified) return null

  return (
    <div className="grid gap-2">
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="Enter OTP"
        maxLength={6}
        value={code}
        spellCheck={false}
        aria-label={`${channel} OTP`}
        onChange={(event) => onCodeChange(event.target.value)}
        className="h-12 rounded-md border-border bg-card px-3.5 text-base shadow-sm md:text-base focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20"
      />
      <p className="text-sm text-muted-foreground">Test code {TEST_OTP}</p>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
