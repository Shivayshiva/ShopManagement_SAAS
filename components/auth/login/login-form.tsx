"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TextField } from "@/components/auth/register/fields/text-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const DEMO_USERNAME = "prashant@gmail.com"
const DEMO_PASSWORD = "123456"

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { username: "", password: "" },
  })

  function signIn(values: LoginValues) {
    const username = values.username.trim().toLowerCase()
    if (username !== DEMO_USERNAME || values.password !== DEMO_PASSWORD) {
      setError("Username or password is incorrect.")
      return
    }
    setError(null)
    router.push("/")
  }

  return (
    <Card className="border-0 bg-surface shadow-raised ring-border">
      <CardContent className="px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit(signIn)} noValidate className="grid gap-4">
          <TextField
            control={control}
            name="username"
            label="Username"
            required
            type="email"
            autoComplete="username"
            placeholder="prashant@gmail.com"
          />
          <TextField
            control={control}
            name="password"
            label="Password"
            required
            type="password"
            autoComplete="current-password"
            placeholder="123456"
          />
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="h-12 text-base">
            Log in
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
