"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SelectField, TextField } from "@/components/auth/register/form-fields"
import { BUSINESS_CATEGORIES, BUSINESS_TYPES } from "@/components/auth/register/options"
import {
  organizationSchema,
  type OrganizationValues,
} from "@/components/auth/register/schema"
import { StepActions, type StepProps } from "@/components/auth/register/step-actions"

export function StepOrganization({
  defaultValues,
  onNext,
  onBack,
}: StepProps<OrganizationValues>) {
  const { control, handleSubmit, getValues } = useForm<OrganizationValues>({
    resolver: zodResolver(organizationSchema),
    mode: "onTouched",
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          control={control}
          name="businessName"
          label="Business name"
          required
          autoComplete="organization"
          placeholder="Sharma General Store"
          description="Shown on invoices and receipts."
          className="sm:col-span-2"
        />
        <SelectField
          control={control}
          name="businessType"
          label="Business type"
          required
          options={BUSINESS_TYPES}
          placeholder="Select business type"
        />
        <SelectField
          control={control}
          name="businessCategory"
          label="Business category"
          required
          options={BUSINESS_CATEGORIES}
          placeholder="Select category"
        />
        <TextField
          control={control}
          name="businessEmail"
          label="Business email"
          type="email"
          autoComplete="email"
          placeholder="accounts@yourshop.com"
          description="Optional. Used for invoices and reports."
        />
        <TextField
          control={control}
          name="businessPhone"
          label="Business phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="0172 1234567"
          description="Optional. Mobile or landline with STD code."
          normalize={(value) => value.replace(/\D/g, "").slice(0, 12)}
        />
      </div>

      <StepActions onBack={onBack && (() => onBack(getValues()))} />
    </form>
  )
}
