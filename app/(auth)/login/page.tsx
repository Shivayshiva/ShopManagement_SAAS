import { Type } from "@/components/design-system"

export default function LoginPage() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-20">
      <Type as="h1" variant="heading">
        Login
      </Type>
      <Type variant="body" className="mt-2">
        Sign in to your Sirsa-SaaS account.
      </Type>
    </section>
  )
}
