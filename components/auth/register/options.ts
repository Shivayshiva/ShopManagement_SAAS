export type Option<T extends string = string> = {
  value: T
  label: string
}

/** Turns an `as const` option list into the tuple shape `z.enum` expects. */
export function optionValues<const T extends readonly Option[]>(options: T) {
  return options.map((option) => option.value) as unknown as [
    T[number]["value"],
    ...T[number]["value"][],
  ]
}

export const BUSINESS_TYPES = [
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership Firm" },
  { value: "llp", label: "Limited Liability Partnership (LLP)" },
  { value: "private_limited", label: "Private Limited Company" },
  { value: "public_limited", label: "Public Limited Company" },
  { value: "opc", label: "One Person Company (OPC)" },
  { value: "huf", label: "Hindu Undivided Family (HUF)" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[]

export const BUSINESS_CATEGORIES = [
  { value: "grocery", label: "Grocery & Kirana" },
  { value: "supermarket", label: "Supermarket" },
  { value: "pharmacy", label: "Pharmacy & Medical" },
  { value: "electronics", label: "Electronics & Appliances" },
  { value: "mobile", label: "Mobile & Accessories" },
  { value: "apparel", label: "Clothing & Apparel" },
  { value: "footwear", label: "Footwear" },
  { value: "hardware", label: "Hardware & Sanitary" },
  { value: "stationery", label: "Books & Stationery" },
  { value: "cosmetics", label: "Cosmetics & Beauty" },
  { value: "jewellery", label: "Jewellery" },
  { value: "furniture", label: "Furniture & Home" },
  { value: "auto_parts", label: "Auto Parts" },
  { value: "restaurant", label: "Restaurant & Cafe" },
  { value: "bakery", label: "Bakery & Sweets" },
  { value: "wholesale", label: "Wholesale & Distribution" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[]

export const GST_REGISTRATION_TYPES = [
  { value: "regular", label: "Regular" },
  { value: "composition", label: "Composition" },
  { value: "casual", label: "Casual Taxable Person" },
  { value: "sez_unit", label: "SEZ Unit" },
  { value: "sez_developer", label: "SEZ Developer" },
  { value: "isd", label: "Input Service Distributor" },
  { value: "non_resident", label: "Non-Resident Taxable Person" },
] as const satisfies readonly Option[]

export const STATE_NAMES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const

export const INDIAN_STATES = STATE_NAMES.map((name) => ({
  value: name,
  label: name,
})) as { value: (typeof STATE_NAMES)[number]; label: string }[]

