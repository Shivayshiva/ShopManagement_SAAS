"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form"
import { cn } from "cn"
import type { Option } from "@/components/auth/register/options"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

type ControlAria = {
  id: string
  "aria-invalid": boolean
  "aria-describedby"?: string
  "aria-required"?: boolean
}

type BaseFieldProps<T extends FieldValues, TOut> = Pick<
  UseControllerProps<T, Path<T>, TOut>,
  "control" | "name"
> & {
  label: string
  required?: boolean
  description?: React.ReactNode
  className?: string
}

/** Wires label, description and error to a single controlled form control. */
function FormField<T extends FieldValues, TOut>({
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
    <Field invalid={fieldState.invalid} className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {children(field, {
        id,
        "aria-invalid": fieldState.invalid,
        "aria-describedby": [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
        "aria-required": required || undefined,
      })}
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      <FieldError id={errorId}>{fieldState.error?.message}</FieldError>
    </Field>
  )
}

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
  type = "text",
  ...inputProps
}: BaseFieldProps<T, TOut> &
  InputProps & {
    /** Static text shown inside the input, e.g. a country code. */
    prefix?: string
    /** Rewrites the raw input before it reaches form state, e.g. digits only. */
    normalize?: (value: string) => string
    inputClassName?: string
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
            <span className="pointer-events-none absolute left-3 text-sm text-muted-foreground">
              {prefix}
            </span>
          ) : null}
          <Input
            {...inputProps}
            {...aria}
            ref={field.ref}
            name={field.name}
            type={isPassword && revealed ? "text" : type}
            value={field.value ?? ""}
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(normalize ? normalize(event.target.value) : event.target.value)
            }
            className={cn(prefix && "pl-11", isPassword && "pr-10", inputClassName)}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setRevealed((value) => !value)}
              aria-label={revealed ? "Hide password" : "Show password"}
              aria-pressed={revealed}
              className="absolute right-1 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          ) : null}
        </div>
      )}
    </FormField>
  )
}

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
        <Textarea {...textareaProps} {...aria} {...field} value={field.value ?? ""} />
      )}
    </FormField>
  )
}

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
        <NativeSelect {...selectProps} {...aria} {...field} value={field.value ?? ""}>
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
      <legend className="mb-3 flex items-center gap-1 text-sm font-medium">
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
              "flex cursor-pointer items-start gap-3 rounded-lg border border-input p-3.5 transition-colors hover:bg-muted/60 has-checked:border-primary has-checked:bg-accent has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
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
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">{option.label}</span>
              {option.description ? (
                <span className="text-xs text-muted-foreground">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId}>{fieldState.error?.message}</FieldError>
    </fieldset>
  )
}
