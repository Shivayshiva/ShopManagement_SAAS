import { Section, SectionIntro, Type } from "@/components/design-system"

const steps = [
  {
    title: "Create Your Account",
    description: "Start your free trial in under a minute.",
  },
  {
    title: "Set Up Your Shop",
    description: "Add products, suppliers, employees, and customers.",
  },
  {
    title: "Start Selling",
    description: "Create bills, manage stock, and track payments.",
  },
  {
    title: "Grow Your Business",
    description: "Use reports and analytics to make better decisions.",
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionIntro
        eyebrow="How it works"
        title="How It Works"
        description="Get your shop set up and running in minutes. No technical skills required."
      />
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="text-center">
            <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
              <Type as="h3" variant="title" className="mt-4">
                {step.title}
              </Type>
              <Type variant="caption" className="mt-1 text-sm">
                {step.description}
              </Type>
          </li>
        ))}
      </ol>
    </Section>
  )
}
