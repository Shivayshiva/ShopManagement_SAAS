import type { Metadata } from "next"
import Link from "next/link"
import { registerAccount } from "@/app/(auth)/register/actions"
import { RegisterForm } from "@/components/auth/register/register-form"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Start Free Trial — Sirsa-SaaS",
  description: "Create your Sirsa-SaaS account and set up your first business.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-8 lg:px-10 lg:py-6">
      <div className="mb-4 shrink-0 text-center">
        <Type as="h1" variant="heading">
          Create your account
        </Type>
        <Type variant="body" className="mt-2">
          Start with your personal details. Next you will verify contact and onboard your
          organization.
        </Type>
      </div>
      <RegisterForm action={registerAccount} />
      <Type variant="body" className="mt-4 shrink-0 text-center text-base">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Log in
        </Link>
      </Type>
    </div>
  )
}
