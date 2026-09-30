"use client"

import { Button } from "@/components/ui/button"
import { THEME_STORAGE_KEY } from "@/lib/theme"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.classList.toggle("dark")
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light")
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Switch between light and dark theme"
      onClick={toggleTheme}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  )
}
