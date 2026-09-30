import { Section, SectionIntro } from "@/components/design-system"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const quotes = [
  {
    quote:
      "Billing is faster at the counter, and I can see which products are about to run out before the weekend rush.",
    name: "Meera Patel",
    role: "Grocery owner, Ahmedabad",
    initials: "MP",
  },
  {
    quote:
      "We stopped guessing supplier dues. Purchase orders and payments finally live in the same place.",
    name: "Arjun Singh",
    role: "Hardware store, Jaipur",
    initials: "AS",
  },
  {
    quote:
      "Three shops, one login. I check yesterday’s sales from my phone before the stores even open.",
    name: "Fatima Khan",
    role: "Apparel chain, Hyderabad",
    initials: "FK",
  },
]

export function Testimonials() {
  return (
    <Section id="testimonials" tone="surface">
      <SectionIntro title="Real Businesses. Real Results." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {quotes.map((item) => (
          <Card key={item.name} className="bg-muted shadow-none">
            <CardContent className="space-y-4">
              <div className="flex gap-0.5 text-warning" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{item.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
