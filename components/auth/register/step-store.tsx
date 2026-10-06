"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  SelectField,
  TextField,
  TextareaField,
} from "@/components/auth/register/form-fields"
import { INDIAN_STATES } from "@/components/auth/register/options"
import { storeSchema, type StoreValues } from "@/components/auth/register/schema"
import { StepActions, type StepProps } from "@/components/auth/register/step-actions"

export function StepStore({
  defaultValues,
  onNext,
  onBack,
  pending,
}: StepProps<StoreValues>) {
  const { control, handleSubmit, getValues } = useForm<StoreValues>({
    resolver: zodResolver(storeSchema),
    mode: "onTouched",
    defaultValues: {
      storeName: "",
      storeCode: "",
      address: "",
      city: "",
      pincode: "",
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-2">
        <TextField
          control={control}
          name="storeName"
          label="Store name"
          required
          placeholder="Main Branch"
        />
        <TextField
          control={control}
          name="storeCode"
          label="Store code"
          required
          autoComplete="off"
          spellCheck={false}
          placeholder="MAIN-01"
          description="Short code used on bills and reports."
          normalize={(value) => value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12)}
          inputClassName="font-mono tracking-wider"
        />
        <TextareaField
          control={control}
          name="address"
          label="Address"
          required
          autoComplete="street-address"
          placeholder="Shop no., building, street, area"
          rows={3}
          className="sm:col-span-2"
        />
        <TextField
          control={control}
          name="city"
          label="City"
          required
          autoComplete="address-level2"
          placeholder="Sirsa"
        />
        <SelectField
          control={control}
          name="state"
          label="State"
          required
          autoComplete="address-level1"
          options={INDIAN_STATES}
          placeholder="Select state"
        />
        <TextField
          control={control}
          name="pincode"
          label="Pincode"
          required
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="125055"
          normalize={(value) => value.replace(/\D/g, "").slice(0, 6)}
        />
      </fieldset>

      <StepActions
        onBack={onBack && (() => onBack(getValues()))}
        submitLabel={pending ? "Creating account…" : "Create account"}
        pending={pending}
      />
    </form>
  )
}
