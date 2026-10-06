"use client"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { cn } from "cn"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#resources", label: "Resources" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const auth = pathname === "/register" || pathname === "/login"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur",
        auth && "lg:ml-[42%] lg:w-[58%]"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3")}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={cn(buttonVariants(), "h-9 rounded-lg px-4")}
            >
              Start Free Trial
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>
      {open ? (
        <Container className="flex flex-col gap-1 border-t border-border py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline" }), "mt-2 h-9")}
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants(), "h-9")}
            onClick={() => setOpen(false)}
          >
            Start Free Trial
          </Link>
        </Container>
      ) : null}
    </header>
  )
}
