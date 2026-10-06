"use client"

import * as React from "react"
import { useController, type FieldValues } from "react-hook-form"
import { cn } from "cn"
import type { Option } from "@/components/auth/register/options"
import { type BaseFieldProps } from "@/components/auth/register/fields/shared"
import { FieldDescription, FieldError } from "@/components/ui/field"

export function RadioCardField<T extends FieldValues, TOut>({
  control,
  name,
  label,
  required,
  description,
  className,
  options,
}: BaseFieldProps<T, TOut> & {
  options: readonly (Option & { description?: string })[]
}) {
  const { field, fieldState } = useController({ control, name })
  const id = `${React.useId()}-${name}`
  const errorId = fieldState.error ? `${id}-error` : undefined

  return (
    <fieldset
      aria-describedby={errorId}
      aria-invalid={fieldState.invalid}
      className={cn("flex flex-col gap-3", className)}
    >
      <legend className="mb-3 flex items-center gap-1 text-base font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        ) : null}
      </legend>
      {description ? <FieldDescription className="-mt-1">{description}</FieldDescription> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option, index) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4 shadow-sm transition-colors hover:border-foreground/20 has-checked:border-ring has-checked:bg-accent has-focus-visible:ring-4 has-focus-visible:ring-ring/20",
              fieldState.invalid && "border-destructive"
            )}
          >
            <input
              type="radio"
              ref={index === 0 ? field.ref : undefined}
              name={field.name}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}
              onBlur={field.onBlur}
              className="mt-1 size-5 shrink-0 accent-primary"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-medium text-foreground">{option.label}</span>
              {option.description ? (
                <span className="text-sm text-muted-foreground">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} className="text-sm">
        {fieldState.error?.message}
      </FieldError>
    </fieldset>
  )
}
