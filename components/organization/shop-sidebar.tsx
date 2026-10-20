"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { cn } from "cn"

const links = [
  { segment: "", label: "Overview", icon: LayoutDashboard },
  { segment: "billing", label: "Billing", icon: Receipt },
  { segment: "inventory", label: "Inventory", icon: Boxes },
  { segment: "customers", label: "Customers", icon: Users },
  { segment: "reports", label: "Reports", icon: BarChart3 },
  { segment: "settings", label: "Settings", icon: Settings },
] as const

export function ShopSidebar({
  organizationId,
  shopId,
  shopName,
}: {
  organizationId: string
  shopId: string
  shopName: string
}) {
  const pathname = usePathname()
  const base = `/organization/${organizationId}/shop/${shopId}`

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-4 py-4">
        <Logo className="text-sm" />
        <p className="mt-3 truncate text-sm font-medium text-foreground">{shopName}</p>
        <Link
          href={`/organization/${organizationId}`}
          className="mt-1 block text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Switch shop
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((link) => {
          const href = link.segment ? `${base}/${link.segment}` : base
          const active = pathname === href

          return (
            <Link
              key={link.label}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="size-4 shrink-0" />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
