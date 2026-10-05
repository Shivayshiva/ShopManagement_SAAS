"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { cn } from "cn"
import { TextField } from "@/components/auth/register/form-fields"
import {
  PASSWORD_RULES,
  accountSchema,
  type AccountValues,
} from "@/components/auth/register/schema"
import { StepActions, type StepProps } from "@/components/auth/register/step-actions"

const digitsOnly = (max: number) => (value: string) => value.replace(/\D/g, "").slice(0, max)

export function StepAccount({ defaultValues, onNext }: StepProps<AccountValues>) {
  const { control, handleSubmit } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      ...defaultValues,
    },
  })
  const password = useWatch({ control, name: "password" })

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          control={control}
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
          placeholder="Rahul"
        />
        <TextField
          control={control}
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          placeholder="Sharma"
        />
        <TextField
          control={control}
          name="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <TextField
          control={control}
          name="mobile"
          label="Mobile"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          prefix="+91"
          placeholder="98765 43210"
          normalize={digitsOnly(10)}
        />
        <TextField
          control={control}
          name="password"
          label="Password"
          required
          type="password"
          autoComplete="new-password"
        />
        <TextField
          control={control}
          name="confirmPassword"
          label="Confirm password"
          required
          type="password"
          autoComplete="new-password"
        />
      </div>

      <ul aria-label="Password requirements" className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(password)
          return (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                met ? "text-success" : "text-muted-foreground"
              )}
            >
              <Check aria-hidden="true" className={cn("size-3.5", !met && "opacity-30")} />
              {rule.label}
              <span className="sr-only">{met ? "(met)" : "(not met)"}</span>
            </li>
          )
        })}
      </ul>

      <StepActions />
    </form>
  )
}
