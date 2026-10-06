"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import {
  RadioCardField,
  SelectField,
  TextField,
} from "@/components/auth/register/form-fields"
import { GST_REGISTRATION_TYPES } from "@/components/auth/register/options"
import {
  GSTIN_REGEX,
  taxSchema,
  type TaxValues,
} from "@/components/auth/register/schema"
import { StepActions, type StepProps } from "@/components/auth/register/step-actions"

const GST_OPTIONS = [
  { value: "yes", label: "Yes", description: "I have a GSTIN for this business." },
  { value: "no", label: "No", description: "I'll add GST details later." },
] as const

const alphanumericUpper = (max: number) => (value: string) =>
  value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, max)

export function StepTax({ defaultValues, onNext, onBack }: StepProps<TaxValues>) {
  const { control, handleSubmit, getValues, setValue } = useForm<TaxValues>({
    resolver: zodResolver(taxSchema),
    mode: "onTouched",
    defaultValues: {
      gstin: "",
      pan: "",
      gstRegistrationType: "",
      ...defaultValues,
    },
  })
  const gstRegistered = useWatch({ control, name: "gstRegistered" })
  const gstin = useWatch({ control, name: "gstin" })

  // Characters 3–12 of a GSTIN are the PAN, so fill it in when the PAN is still empty.
  useEffect(() => {
    if (GSTIN_REGEX.test(gstin) && !getValues("pan")) {
      setValue("pan", gstin.slice(2, 12), { shouldValidate: true })
    }
  }, [gstin, getValues, setValue])

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <RadioCardField
        control={control}
        name="gstRegistered"
        label="Are you GST registered?"
        required
        options={GST_OPTIONS}
      />

      {gstRegistered === "yes" ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            control={control}
            name="gstin"
            label="GSTIN"
            required
            autoComplete="off"
            spellCheck={false}
            placeholder="22AAAAA0000A1Z5"
            description="15-character GST identification number."
            normalize={alphanumericUpper(15)}
            className="sm:col-span-2"
            inputClassName="font-mono tracking-wider"
          />
          <TextField
            control={control}
            name="pan"
            label="PAN"
            required
            autoComplete="off"
            spellCheck={false}
            placeholder="AAAAA0000A"
            normalize={alphanumericUpper(10)}
            inputClassName="font-mono tracking-wider"
          />
          <SelectField
            control={control}
            name="gstRegistrationType"
            label="GST registration type"
            required
            options={GST_REGISTRATION_TYPES}
            placeholder="Select registration type"
          />
        </div>
      ) : null}

      {gstRegistered === "no" ? (
        <p className="mt-6 flex gap-2.5 rounded-lg bg-muted p-4 text-base text-muted-foreground">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-info" />
          No problem. You can add your GSTIN later from business settings, and GST invoices will
          be enabled once it&apos;s added.
        </p>
      ) : null}

      <StepActions onBack={onBack && (() => onBack(getValues()))} />
    </form>
  )
}
