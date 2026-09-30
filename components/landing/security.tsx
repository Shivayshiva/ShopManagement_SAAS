import { Section, SectionIntro } from "@/components/design-system"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, ShieldCheck, Users } from "lucide-react"

const items = [
  {
    title: "Protected access",
    description: "Each person signs in with their own account and only sees what their role allows.",
    icon: Lock,
  },
  {
    title: "One source of truth",
    description: "Bills, stock, and payments stay in one place instead of scattered files.",
    icon: ShieldCheck,
  },
  {
    title: "Ready for a team",
    description: "Owners, managers, and cashiers can work together without sharing a password.",
    icon: Users,
  },
]

export function Security() {
  return (
    <Section id="security" tone="surface">
      <SectionIntro
        title="Your Business Centralized and Protected."
        description="Keep shop data together, with access that matches how your team actually works."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="bg-muted shadow-none">
            <CardContent className="space-y-2">
              <item.icon className="size-5 text-primary" />
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
