"use server"

import {
  registerSchema,
  type RegisterValues,
} from "@/components/auth/register/schema"

export type RegisterStepKey = keyof RegisterValues

export type RegisterResult =
  | { ok: true }
  | { ok: false; message: string; step?: RegisterStepKey }

export async function registerAccount(input: RegisterValues): Promise<RegisterResult> {
  // Never trust client-side validation: re-check the full payload on the server.
  const parsed = registerSchema.safeParse(input)

  if (!parsed.success) {
    const step = parsed.error.issues[0]?.path[0] as RegisterStepKey | undefined
    return {
      ok: false,
      step,
      message: "Some details need another look. Please review this step and try again.",
    }
  }

  // TODO: persist the registration once the backend is in place. In one transaction:
  // create the user (hash `account.password`, never store `confirmPassword`), the
  // organization, its tax profile and the first store, then start a session.

  return { ok: true }
}
