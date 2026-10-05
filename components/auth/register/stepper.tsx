import { Check } from "lucide-react"
import { cn } from "cn"

export function Stepper({
  steps,
  current,
}: {
  steps: readonly { label: string }[]
  current: number
}) {
  return (
    <ol aria-label="Registration progress" className="flex items-center gap-2">
      {steps.map((step, index) => {
        const done = index < current
        const active = index === current

        return (
          <li
            key={step.label}
            aria-current={active ? "step" : undefined}
            className={cn("flex items-center gap-2", index < steps.length - 1 && "flex-1")}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-accent text-accent-foreground",
                !done && !active && "border-border bg-surface text-muted-foreground"
              )}
            >
              {done ? <Check aria-hidden="true" className="size-3.5" /> : index + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium whitespace-nowrap md:inline",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.label}
              {done ? <span className="sr-only"> (completed)</span> : null}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px min-w-4 flex-1 transition-colors",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
