import Link from "next/link"
import { redirect } from "next/navigation"
import { verifyAdminSession } from "@/lib/admin-auth"
import { AdminLayoutClient } from "./admin-layout-client"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verificação de sessão no servidor
  const isAuthorized = await verifyAdminSession()
  
  if (!isAuthorized) {
    redirect('/admin')
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
