"use server"

import {
  registerSchema,
  type RegisterValues,
} from "@/components/auth/register/schema"

export type RegisterResult =
  | { ok: true }
  | { ok: false; message: string }

export async function registerAccount(input: RegisterValues): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details need another look. Please review and try again.",
    }
  }

  // TODO: persist the user account once the backend is in place.

  return { ok: true }
}
