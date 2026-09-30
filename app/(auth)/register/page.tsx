import { Type } from "@/components/design-system"

export default function RegisterPage() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-20">
      <Type as="h1" variant="heading">
        Start Free Trial
      </Type>
      <Type variant="body" className="mt-2">
        Create your Sirsa-SaaS account to set up your first business.
      </Type>
    </section>
  )
}
