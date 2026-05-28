import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

// Rate limiting em memória (para produção, use Upstash Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

export async function POST(request: NextRequest) {
  // Rate limiting por IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  // Limpa entradas antigas periodicamente
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.timestamp > 15 * 60 * 1000) {
        rateLimitMap.delete(k)
      }
    }
  }

  // Bloqueia após 5 tentativas em 15 minutos
  if (entry && now - entry.timestamp < 15 * 60 * 1000 && entry.count >= 5) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    )
  }

  try {
    const { email, password } = await request.json()

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const secret = process.env.ADMIN_JWT_SECRET

    if (!adminEmail || !adminPassword || !secret) {
      console.error('Admin auth: Variáveis de ambiente não configuradas')
      return NextResponse.json(
        { error: 'Configuração do servidor inválida.' },
        { status: 500 }
      )
    }

    // Comparação segura — sempre no servidor, nunca exposta ao cliente
    const isValid = email === adminEmail && password === adminPassword

    if (!isValid) {
      // Incrementar tentativas
      rateLimitMap.set(ip, {
        count: (entry?.count ?? 0) + 1,
        timestamp: entry?.timestamp ?? now,
      })
      
      // Delay para dificultar brute force
      await new Promise(r => setTimeout(r, 500))
      
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      )
    }

    // Resetar contador de tentativas após login bem-sucedido
    rateLimitMap.delete(ip)

    // Criar JWT seguro com validade de 8 horas
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .setIssuedAt()
      .sign(new TextEncoder().encode(secret))

    // Setar cookie httpOnly — não acessível por JavaScript
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer logout.' },
      { status: 500 }
    )
  }
}
