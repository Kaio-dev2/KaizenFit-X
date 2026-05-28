import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { UserProvider } from "@/components/user-provider"

export default async function DashboardProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <UserProvider user={session.user}>
      {children}
    </UserProvider>
  )
}
