import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 100
const MAX_AUTH_REQUESTS_PER_WINDOW = 10

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(k)
      }
    }
  }

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return false
  }

  if (entry.count >= maxRequests) {
    return true
  }

  entry.count++
  return false
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.facebook.net; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https: http:; " +
    "connect-src 'self' https://*.googleapis.com https://*.facebook.com https://*.vercel.app wss:; " +
    "frame-ancestors 'none';"
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getRateLimitKey(request)

  // Rotas públicas — nunca redirecionar
  const publicRoutes = ['/', '/login', '/cadastro', '/admin', '/recuperar-senha']
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/admin'))) {
    const response = NextResponse.next()
    return addSecurityHeaders(response)
  }

  // Rate limiting
  const isAuthRoute = pathname.startsWith('/api/auth') ||
                      pathname === '/login' ||
                      pathname === '/cadastro' ||
                      pathname === '/recuperar-senha'

  const rateLimitKey = isAuthRoute ? `auth:${ip}` : `general:${ip}`
  const maxRequests = isAuthRoute ? MAX_AUTH_REQUESTS_PER_WINDOW : MAX_REQUESTS_PER_WINDOW

  if (isRateLimited(rateLimitKey, maxRequests)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Muitas requisições. Por favor, aguarde um momento.',
        retryAfter: 60
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      }
    )
  }

  // Rotas protegidas pelo Better Auth
  const protectedRoutes = ['/dashboard', '/onboarding']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  const sessionCookie = request.cookies.get('better-auth.session_token')

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Usuário já logado tentando acessar login/cadastro
  const authPages = ['/login', '/cadastro']
  if (authPages.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const response = NextResponse.next()
  return addSecurityHeaders(response)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}