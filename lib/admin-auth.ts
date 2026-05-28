import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    
    if (!token) {
      return false
    }

    const secret = process.env.ADMIN_JWT_SECRET
    
    if (!secret) {
      console.error('ADMIN_JWT_SECRET não está configurado')
      return false
    }

    await jwtVerify(token, new TextEncoder().encode(secret))
    return true
  } catch (error) {
    // Token inválido ou expirado
    return false
  }
}
