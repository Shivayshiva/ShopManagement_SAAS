export const ONBOARD_STORAGE_KEY = "sirsa-onboard"

export type OnboardDraft = {
  firstName?: string
  mobile: string
  email: string
  organizationId?: string
  businessName?: string
}

export function readOnboardDraft(): OnboardDraft | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(ONBOARD_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as OnboardDraft
  } catch {
    return null
  }
}

export function writeOnboardDraft(draft: OnboardDraft) {
  window.sessionStorage.setItem(ONBOARD_STORAGE_KEY, JSON.stringify(draft))
}

export function clearOnboardDraft() {
  window.sessionStorage.removeItem(ONBOARD_STORAGE_KEY)
}
