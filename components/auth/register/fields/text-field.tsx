"use client"

import * as React from "react"
import { Check, Eye, EyeOff } from "lucide-react"
import { type FieldValues } from "react-hook-form"
import { cn } from "cn"
import {
  type BaseFieldProps,
  FormField,
  controlClass,
} from "@/components/auth/register/fields/shared"
import { Input } from "@/components/ui/input"

type InputProps = Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "prefix" | "id"
>

export function TextField<T extends FieldValues, TOut>({
  control,
  name,
  label,
  required,
  description,
  className,
  prefix,
  normalize,
  inputClassName,
  verified = false,
  type = "text",
  ...inputProps
}: BaseFieldProps<T, TOut> &
  InputProps & {
    /** Static text shown inside the input, e.g. a country code. */
    prefix?: string
    /** Rewrites the raw input before it reaches form state, e.g. digits only. */
    normalize?: (value: string) => string
    inputClassName?: string
    /** Shows a tick inside the field after OTP verification. */
    verified?: boolean
  }) {
  const [revealed, setRevealed] = React.useState(false)
  const isPassword = type === "password"

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      {(field, aria) => (
        <div className="relative flex items-center">
          {prefix ? (
            <span className="pointer-events-none absolute left-3.5 border-r border-border pr-2.5 text-base text-muted-foreground">
              {prefix}
            </span>
          ) : null}
          <Input
            {...inputProps}
            {...aria}
            spellCheck={inputProps.spellCheck ?? false}
            ref={field.ref}
            name={field.name}
            type={isPassword && revealed ? "text" : type}
            value={field.value ?? ""}
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(normalize ? normalize(event.target.value) : event.target.value)
            }
            className={cn(
              controlClass,
              prefix && "pl-16",
              (isPassword || verified) && "pr-12",
              inputClassName
            )}
          />
          {verified ? (
            <span className="absolute right-3 inline-flex text-success" aria-label="Verified">
              <Check className="size-5" />
            </span>
          ) : null}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setRevealed((value) => !value)}
              aria-label={revealed ? "Hide password" : "Show password"}
              aria-pressed={revealed}
              className="absolute right-1.5 inline-flex size-10 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {revealed ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          ) : null}
        </div>
      )}
    </FormField>
  )
}
