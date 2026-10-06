"use server"

import { createHmac, randomInt, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { z } from "zod"
import { MOBILE_REGEX } from "@/components/auth/register/schema"

export type OtpChannel = "mobile" | "email"

type OtpResult = { ok: true; previewCode?: string } | { ok: false; message: string }

const OTP_TTL_SECONDS = 5 * 60
const TEST_OTP = "123456"

const targetSchema = {
  mobile: z.string().regex(MOBILE_REGEX, "Enter a valid 10-digit mobile number"),
  email: z.email("Enter a valid email address"),
} satisfies Record<OtpChannel, z.ZodType<string>>

function secret() {
  return process.env.OTP_SECRET ?? "sirsa-saas-dev-otp"
}

function seal(payload: Record<string, string | number>) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = createHmac("sha256", secret()).update(body).digest("base64url")
  return `${body}.${signature}`
}

function open(token: string) {
  const [body, signature] = token.split(".")
  if (!body || !signature) return null
  const expected = createHmac("sha256", secret()).update(body).digest("base64url")
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null
  }
  return JSON.parse(Buffer.from(body, "base64url").toString()) as Record<string, string>
}

function codeHash(channel: OtpChannel, target: string, code: string) {
  return createHmac("sha256", secret()).update(`${channel}:${target}:${code}`).digest("hex")
}

function pendingName(channel: OtpChannel) {
  return `otp_pending_${channel}`
}

function verifiedName(channel: OtpChannel) {
  return `otp_verified_${channel}`
}

async function cookieStore() {
  return cookies()
}

export async function sendOtp(channel: OtpChannel, rawTarget: string): Promise<OtpResult> {
  const parsed = targetSchema[channel].safeParse(rawTarget.trim().toLowerCase())
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid value" }
  }

  const target = channel === "email" ? parsed.data : rawTarget.trim()
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0")
  const exp = Date.now() + OTP_TTL_SECONDS * 1000
  const store = await cookieStore()

  store.set(pendingName(channel), seal({ target, exp, hash: codeHash(channel, target, code) }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: OTP_TTL_SECONDS,
  })
  store.delete(verifiedName(channel))

  return {
    ok: true,
    previewCode: process.env.NODE_ENV === "production" ? undefined : code,
  }
}

export async function verifyOtp(
  channel: OtpChannel,
  rawTarget: string,
  code: string
): Promise<OtpResult> {
  const target = channel === "email" ? rawTarget.trim().toLowerCase() : rawTarget.trim()
  const normalizedCode = code.replace(/\D/g, "")
  if (normalizedCode.length !== 6) {
    return { ok: false, message: "Enter the 6-digit OTP" }
  }

  const store = await cookieStore()

  if (process.env.NODE_ENV !== "production" && normalizedCode === TEST_OTP) {
    const parsed = targetSchema[channel].safeParse(target)
    if (!parsed.success) {
      return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid value" }
    }
    store.set(verifiedName(channel), seal({ target, exp: Date.now() + OTP_TTL_SECONDS * 1000 }), {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: OTP_TTL_SECONDS,
    })
    store.delete(pendingName(channel))
    return { ok: true }
  }
  const token = store.get(pendingName(channel))?.value
  const pending = token ? open(token) : null
  if (!pending || Number(pending.exp) < Date.now()) {
    return { ok: false, message: "OTP expired. Send a new one." }
  }
  if (pending.target !== target) {
    return { ok: false, message: "Send a new OTP for this value" }
  }

  const expected = Buffer.from(pending.hash)
  const actual = Buffer.from(codeHash(channel, target, normalizedCode))
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { ok: false, message: "That OTP is incorrect" }
  }

  store.set(verifiedName(channel), seal({ target, exp: Date.now() + OTP_TTL_SECONDS * 1000 }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: OTP_TTL_SECONDS,
  })
  store.delete(pendingName(channel))
  return { ok: true }
}

export async function verifiedTargets() {
  const store = await cookieStore()
  const read = (channel: OtpChannel) => {
    const token = store.get(verifiedName(channel))?.value
    const payload = token ? open(token) : null
    if (!payload || Number(payload.exp) < Date.now()) return null
    return payload.target
  }
  return { mobile: read("mobile"), email: read("email") }
}
