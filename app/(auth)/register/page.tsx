import type { Metadata } from "next"
import Link from "next/link"
import { registerAccount } from "@/app/(auth)/register/actions"
import { RegisterForm } from "@/components/auth/register/register-form"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Start Free Trial — Sirsa-SaaS",
  description: "Create your Sirsa-SaaS account and set up your first business and store.",
}

export default function RegisterPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <Type as="h1" variant="heading">
          Start Free Trial
        </Type>
        <Type variant="body" className="mt-2">
          Create your Sirsa-SaaS account to set up your first business.
        </Type>
      </div>

      <RegisterForm action={registerAccount} />

      <Type variant="body" className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Log in
        </Link>
      </Type>
    </section>
  )
}
