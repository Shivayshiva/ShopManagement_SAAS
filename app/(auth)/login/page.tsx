import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login/login-form"
import { Type } from "@/components/design-system"

export const metadata: Metadata = {
  title: "Log in — Sirsa-SaaS",
  description: "Sign in to your Sirsa-SaaS account.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-4 sm:px-8 lg:px-10 lg:py-6">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <div className="mb-4 shrink-0 text-center">
          <Type as="h1" variant="heading">
            Log in
          </Type>
          <Type variant="body" className="mt-2">
            Sign in to your Sirsa-SaaS account.
          </Type>
        </div>

        <LoginForm />

        <Type variant="body" className="mt-4 shrink-0 text-center text-base">
          New to Sirsa?{" "}
          <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </Type>
      </div>
    </div>
  )
}
