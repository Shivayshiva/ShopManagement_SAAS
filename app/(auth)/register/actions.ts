"use server"

import { verifiedTargets } from "@/app/(auth)/register/otp-actions"
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

  const verified = await verifiedTargets()
  if (verified.mobile !== parsed.data.account.mobile || verified.email !== parsed.data.account.email) {
    return {
      ok: false,
      step: "account",
      message: "Verify the OTP for your mobile number and email before continuing.",
    }
  }

  // TODO: persist the registration once the backend is in place. In one transaction:
  // create the user, the organization, its tax profile and the first store, then start a session.

  return { ok: true }
}
