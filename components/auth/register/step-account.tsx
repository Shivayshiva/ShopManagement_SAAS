"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { SelectField, TextareaField, TextField } from "@/components/auth/register/form-fields"
import { OtpVerify } from "@/components/auth/register/otp-verify"
import { INDIAN_STATES } from "@/components/auth/register/options"
import { accountSchema, type AccountValues } from "@/components/auth/register/schema"
import { StepActions, type StepProps } from "@/components/auth/register/step-actions"

const digitsOnly = (max: number) => (value: string) => value.replace(/\D/g, "").slice(0, max)

const panOnly = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10)

export function StepAccount({ defaultValues, onNext }: StepProps<AccountValues>) {
  const [mobileVerified, setMobileVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)
  const { control, handleSubmit } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobile: "",
      email: "",
      aadhaar: "",
      pan: "",
      town: "",
      city: "",
      state: undefined,
      addressLine1: "",
      addressLine2: "",
      ...defaultValues,
    },
  })
  const mobile = useWatch({ control, name: "mobile" }) ?? ""
  const email = useWatch({ control, name: "email" }) ?? ""
  const mobileReady = accountSchema.shape.mobile.safeParse(mobile).success
  const emailReady = accountSchema.shape.email.safeParse(email).success

  function continueAccount(values: AccountValues) {
    if (!mobileVerified || !emailVerified) {
      setStepError("Verify the OTP for your mobile number and email before continuing.")
      return
    }
    setStepError(null)
    onNext(values)
  }

  return (
    <form onSubmit={handleSubmit(continueAccount)} noValidate>
      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-6">
        <TextField
          control={control}
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
          placeholder="Rahul"
          className="sm:col-span-2"
        />
        <TextField
          control={control}
          name="middleName"
          label="Middle name"
          autoComplete="additional-name"
          className="sm:col-span-2"
        />
        <TextField
          control={control}
          name="lastName"
          label="Last name"
          autoComplete="family-name"
          placeholder="Sharma"
          className="sm:col-span-2"
        />
        <div className="grid gap-3 sm:col-span-3">
          <TextField
            control={control}
            name="mobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            prefix="+91"
            placeholder="98765 43210"
            normalize={digitsOnly(10)}
            verified={mobileVerified}
          />
          <OtpVerify
            channel="mobile"
            target={mobile}
            ready={mobileReady}
            onVerifiedChange={setMobileVerified}
          />
        </div>
        <div className="grid gap-3 sm:col-span-3">
          <TextField
            control={control}
            name="email"
            label="Email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            verified={emailVerified}
          />
          <OtpVerify
            channel="email"
            target={email}
            ready={emailReady}
            onVerifiedChange={setEmailVerified}
          />
        </div>
        <TextField
          control={control}
          name="aadhaar"
          label="Aadhaar card number"
          required
          inputMode="numeric"
          autoComplete="off"
          placeholder="1234 5678 9012"
          normalize={digitsOnly(12)}
          className="sm:col-span-3"
        />
        <TextField
          control={control}
          name="pan"
          label="PAN card number"
          required
          autoComplete="off"
          placeholder="ABCDE1234F"
          normalize={panOnly}
          className="sm:col-span-3"
        />
        <TextField
          control={control}
          name="town"
          label="Town"
          autoComplete="address-level3"
          className="sm:col-span-2"
        />
        <TextField
          control={control}
          name="city"
          label="City"
          required
          autoComplete="address-level2"
          className="sm:col-span-2"
        />
        <SelectField
          control={control}
          name="state"
          label="State"
          required
          autoComplete="address-level1"
          placeholder="Select a state"
          options={INDIAN_STATES}
          className="sm:col-span-2"
        />
        <TextareaField
          control={control}
          name="addressLine1"
          label="Address line 1"
          required
          autoComplete="address-line1"
          rows={2}
          className="sm:col-span-6"
        />
        <TextareaField
          control={control}
          name="addressLine2"
          label="Address line 2"
          autoComplete="address-line2"
          rows={2}
          className="sm:col-span-6"
        />
      </div>

      {stepError ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {stepError}
        </p>
      ) : null}

      <StepActions />
    </form>
  )
}
