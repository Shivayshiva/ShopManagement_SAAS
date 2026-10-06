"use client"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { usePathname } from "next/navigation"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lockViewport = pathname === "/register" || pathname === "/login"

  return (
    <div
      className={
        lockViewport
          ? "flex h-dvh flex-col overflow-hidden bg-background text-foreground"
          : "flex min-h-full flex-1 flex-col bg-background text-foreground"
      }
    >
      <SiteHeader />
      <main className={lockViewport ? "flex min-h-0 flex-1 flex-col overflow-hidden" : "flex-1"}>
        {children}
      </main>
      {lockViewport ? null : <SiteFooter />}
    </div>
  )
}
