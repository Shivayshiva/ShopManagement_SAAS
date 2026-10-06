"use client"

import * as React from "react"
import { type FieldValues } from "react-hook-form"
import { cn } from "cn"
import {
  type BaseFieldProps,
  FormField,
  controlClass,
} from "@/components/auth/register/fields/shared"
import { Textarea } from "@/components/ui/textarea"

export function TextareaField<T extends FieldValues, TOut>({
  control,
  name,
  label,
  required,
  description,
  className,
  ...textareaProps
}: BaseFieldProps<T, TOut> &
  Omit<
    React.ComponentProps<"textarea">,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "id"
  >) {
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
        <Textarea
          {...textareaProps}
          {...aria}
          spellCheck={textareaProps.spellCheck ?? false}
          {...field}
          value={field.value ?? ""}
          className={cn(controlClass, "h-auto min-h-20 resize-y py-3 leading-relaxed")}
        />
      )}
    </FormField>
  )
}
