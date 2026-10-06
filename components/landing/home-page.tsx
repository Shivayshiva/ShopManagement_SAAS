import { Answers } from "@/components/landing/answers"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Integrations } from "@/components/landing/integrations"
import { LogoCloud } from "@/components/landing/logo-cloud"
import { MultiShop } from "@/components/landing/multi-shop"
import { Pricing } from "@/components/landing/pricing"
import { Problems } from "@/components/landing/problems"
import { Security } from "@/components/landing/security"
import { Testimonials } from "@/components/landing/testimonials"
import { SiteShell } from "../layout/site-shell"

export function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <LogoCloud />
      <Problems />
      <Features />
      <HowItWorks />
      <MultiShop />
      <Answers />
      <Security />
      <Integrations />
      <Testimonials />
      <Pricing />
      <Faq />
    </SiteShell>
  )
}
