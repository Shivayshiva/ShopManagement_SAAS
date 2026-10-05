import { z } from "zod"
import {
  BUSINESS_CATEGORIES,
  BUSINESS_TYPES,
  GST_REGISTRATION_TYPES,
  STATE_NAMES,
  optionValues,
} from "@/components/auth/register/options"

export const MOBILE_REGEX = /^[6-9]\d{9}$/
export const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
export const PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/
const PERSON_NAME_REGEX = /^[\p{L}][\p{L} .'-]*$/u
const STORE_CODE_REGEX = /^[A-Z0-9][A-Z0-9-]*$/
const PINCODE_REGEX = /^[1-9]\d{5}$/
const PHONE_REGEX = /^\d{10,12}$/

export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { id: "lower", label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { id: "number", label: "One number", test: (v: string) => /\d/.test(v) },
  { id: "symbol", label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const

const personName = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(50, `${label} must be 50 characters or fewer`)
    .regex(PERSON_NAME_REGEX, `${label} can only contain letters`)

const password = PASSWORD_RULES.reduce(
  (schema, rule) => schema.refine(rule.test, `Password needs ${rule.label.toLowerCase()}`),
  z.string().min(1, "Password is required").max(64, "Password must be 64 characters or fewer")
)

const passwordPair = z.object({
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
})

/* Step 1 — Create account */
export const accountSchema = z
  .object({
    firstName: personName("First name"),
    lastName: personName("Last name"),
    email: z.string().trim().toLowerCase().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
    mobile: z
      .string()
      .min(1, "Mobile number is required")
      .regex(MOBILE_REGEX, "Enter a valid 10-digit mobile number"),
    password,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
    // Compare passwords even while other fields on this step are still invalid.
    when: ({ value }) => passwordPair.safeParse(value).success,
  })

/* Step 2 — Organization */
export const organizationSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name is required")
    .max(100, "Business name must be 100 characters or fewer"),
  businessType: z.enum(optionValues(BUSINESS_TYPES), {
    error: "Select a business type",
  }),
  businessCategory: z.enum(optionValues(BUSINESS_CATEGORIES), {
    error: "Select a business category",
  }),
  businessEmail: z
    .string()
    .trim()
    .toLowerCase()
    .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address"),
  businessPhone: z
    .string()
    .trim()
    .refine((v) => v === "" || PHONE_REGEX.test(v), "Enter a valid 10–12 digit phone number"),
})

/* Step 3 — Tax */
export const taxSchema = z
  .object({
    gstRegistered: z.enum(["yes", "no"], {
      error: "Tell us whether your business is GST registered",
    }),
    gstin: z.string().trim().toUpperCase(),
    pan: z.string().trim().toUpperCase(),
    gstRegistrationType: z.union([
      z.enum(optionValues(GST_REGISTRATION_TYPES)),
      z.literal(""),
    ]),
  })
  .superRefine((data, ctx) => {
    if (data.gstRegistered !== "yes") return

    if (!data.gstin) {
      ctx.addIssue({ code: "custom", path: ["gstin"], message: "GSTIN is required" })
    } else if (!GSTIN_REGEX.test(data.gstin)) {
      ctx.addIssue({ code: "custom", path: ["gstin"], message: "Enter a valid 15-character GSTIN" })
    }

    if (!data.pan) {
      ctx.addIssue({ code: "custom", path: ["pan"], message: "PAN is required" })
    } else if (!PAN_REGEX.test(data.pan)) {
      ctx.addIssue({ code: "custom", path: ["pan"], message: "Enter a valid 10-character PAN" })
    } else if (GSTIN_REGEX.test(data.gstin) && data.gstin.slice(2, 12) !== data.pan) {
      ctx.addIssue({ code: "custom", path: ["pan"], message: "PAN does not match the PAN in your GSTIN" })
    }

    if (!data.gstRegistrationType) {
      ctx.addIssue({
        code: "custom",
        path: ["gstRegistrationType"],
        message: "Select a GST registration type",
      })
    }
  })
  // Drop GST details when the business is not registered, so stale values are never submitted.
  .transform((data) =>
    data.gstRegistered === "yes"
      ? data
      : { ...data, gstin: "", pan: "", gstRegistrationType: "" as const }
  )

/* Step 4 — Store */
export const storeSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(2, "Store name is required")
    .max(100, "Store name must be 100 characters or fewer"),
  storeCode: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, "Store code must be at least 2 characters")
    .max(12, "Store code must be 12 characters or fewer")
    .regex(STORE_CODE_REGEX, "Use only letters, numbers and hyphens"),
  address: z
    .string()
    .trim()
    .min(5, "Address is required")
    .max(250, "Address must be 250 characters or fewer"),
  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(60, "City must be 60 characters or fewer"),
  state: z.enum(STATE_NAMES, { error: "Select a state" }),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(PINCODE_REGEX, "Enter a valid 6-digit pincode"),
})

export const registerSchema = z.object({
  account: accountSchema,
  organization: organizationSchema,
  tax: taxSchema,
  store: storeSchema,
})

export type AccountValues = z.input<typeof accountSchema>
export type OrganizationValues = z.input<typeof organizationSchema>
export type TaxValues = z.input<typeof taxSchema>
export type StoreValues = z.input<typeof storeSchema>

export type RegisterValues = z.input<typeof registerSchema>
export type RegisterPayload = z.output<typeof registerSchema>
