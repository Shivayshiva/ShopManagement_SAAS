import { Type } from "@/components/design-system"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { cn } from "cn"
import Link from "next/link"

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#solutions", label: "Solutions" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#resources", label: "Resources" },
      { href: "/#testimonials", label: "Customers" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#security", label: "Security" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Start free trial" },
      { href: "/#pricing", label: "Compare plans" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-inverse text-inverse-muted">
      <Container>
        <Separator className="bg-inverse-foreground/10" />
        <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-3 max-w-xs text-sm text-inverse-muted">
              Complete shop management software for growing businesses.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-inverse-foreground">{column.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-inverse-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  )
}
