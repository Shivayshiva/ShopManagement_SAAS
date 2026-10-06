"use client"

import * as React from "react"
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form"
import { cn } from "cn"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

export const controlClass =
  "h-12 rounded-md border-border bg-card px-3.5 text-base shadow-sm md:text-base placeholder:text-muted-foreground/70 hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20"

type ControlAria = {
  id: string
  "aria-invalid": boolean
  "aria-describedby"?: string
  "aria-required"?: boolean
}

export type BaseFieldProps<T extends FieldValues, TOut> = Pick<
  UseControllerProps<T, Path<T>, TOut>,
  "control" | "name"
> & {
  label: string
  required?: boolean
  description?: React.ReactNode
  className?: string
}

/** Wires label, description and error to a single controlled form control. */
export function FormField<T extends FieldValues, TOut>({
  control,
  name,
  label,
  required,
  description,
  className,
  children,
}: BaseFieldProps<T, TOut> & {
  children: (field: ControllerRenderProps<T, Path<T>>, aria: ControlAria) => React.ReactNode
}) {
  const { field, fieldState } = useController({ control, name })
  const id = `${React.useId()}-${name}`
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = fieldState.error ? `${id}-error` : undefined

  return (
    <Field invalid={fieldState.invalid} className={cn("gap-2", className)}>
      <FieldLabel htmlFor={id} required={required} className="text-base font-medium">
        {label}
      </FieldLabel>
      {children(field, {
        id,
        "aria-invalid": fieldState.invalid,
        "aria-describedby": [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
        "aria-required": required || undefined,
      })}
      {description ? (
        <FieldDescription id={descriptionId} className="text-sm">
          {description}
        </FieldDescription>
      ) : null}
      <FieldError id={errorId} className="text-sm">
        {fieldState.error?.message}
      </FieldError>
    </Field>
  )
}
