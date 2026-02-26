
"use client"

import { useUser } from "@/firebase"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, isUserLoading, router, pathname])

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user && pathname !== "/login") {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
