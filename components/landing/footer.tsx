"use client"

import Link from "next/link"
import { Zap, Github, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  produto: [
    { name: "Recursos", href: "#features" },
    { name: "Preços", href: "#pricing" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ],
  empresa: [
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Carreiras", href: "/carreiras" },
    { name: "Contato", href: "/contato" },
  ],
  legal: [
    { name: "Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Cookies", href: "/cookies" },
  ],
}

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Kaizen<span className="text-primary">Fit</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              A plataforma de fitness mais avançada do mundo. Transforme seu corpo 
              com inteligência artificial.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 Kaizen Fit AI. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com dedicação no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
