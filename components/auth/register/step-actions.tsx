"use client"

import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export type StepProps<TValues, TOut = TValues> = {
  defaultValues?: Partial<TValues>
  onNext: (values: TOut) => void
  /** Receives unvalidated values so in-progress edits survive going back. */
  onBack?: (values: TValues) => void
  pending?: boolean
}

export function StepActions({
  onBack,
  submitLabel = "Continue",
  pending = false,
}: {
  onBack?: () => void
  submitLabel?: string
  pending?: boolean
}) {
  return (
    <div className="mt-5 flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end">
      {onBack ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={pending}
          className="h-12 px-5 text-base"
        >
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}
      <Button type="submit" size="lg" disabled={pending} className="h-12 px-6 text-base">
        {pending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : null}
        {submitLabel}
        {pending ? null : <ArrowRight data-icon="inline-end" />}
      </Button>
    </div>
  )
}
