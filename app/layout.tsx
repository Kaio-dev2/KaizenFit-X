import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Kaizen Fit AI - Transforme Seu Corpo com Inteligência Artificial',
  description: 'A plataforma de fitness mais avançada do mundo. Treinos personalizados por IA, nutrição inteligente e uma comunidade que te impulsiona a alcançar resultados extraordinários.',
  keywords: ['fitness', 'IA', 'treino', 'nutrição', 'saúde', 'personal trainer', 'academia'],
  authors: [{ name: 'Kaizen Fit AI' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Kaizen Fit AI - Transforme Seu Corpo com Inteligência Artificial',
    description: 'A plataforma de fitness mais avançada do mundo. Treinos personalizados por IA, nutrição inteligente.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaizen Fit AI',
    description: 'Transforme seu corpo com inteligência artificial',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KaizenFit',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark bg-background">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
