"use client"

import { type FieldValues } from "react-hook-form"
import { cn } from "cn"
import type { Option } from "@/components/auth/register/options"
import {
  type BaseFieldProps,
  FormField,
  controlClass,
} from "@/components/auth/register/fields/shared"
import { NativeSelect } from "@/components/ui/native-select"

export function SelectField<T extends FieldValues, TOut>({
  control,
  name,
  label,
  required,
  description,
  className,
  options,
  placeholder = "Select an option",
  ...selectProps
}: BaseFieldProps<T, TOut> &
  Omit<
    React.ComponentProps<"select">,
    "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "id" | "children"
  > & {
    options: readonly Option[]
    placeholder?: string
  }) {
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
        <NativeSelect
          {...selectProps}
          {...aria}
          {...field}
          value={field.value ?? ""}
          className={cn(controlClass, "pr-10")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      )}
    </FormField>
  )
}
