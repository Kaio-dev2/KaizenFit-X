"use client"

import { motion } from "framer-motion"
import { Check, Zap, Crown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    description: "Perfeito para começar sua jornada fitness",
    price: "0",
    period: "para sempre",
    icon: Zap,
    features: [
      "Treinos básicos ilimitados",
      "Rastreamento de progresso",
      "Comunidade básica",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para quem leva fitness a sério",
    price: "49",
    period: "/mês",
    icon: Crown,
    features: [
      "Tudo do Starter",
      "IA personalizada completa",
      "Planos nutricionais",
      "Análises avançadas",
      "Desafios exclusivos",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    popular: true,
  },
  {
    name: "Business",
    description: "Para academias e personal trainers",
    price: "199",
    period: "/mês",
    icon: Building2,
    features: [
      "Tudo do Pro",
      "Múltiplos usuários",
      "Dashboard de gestão",
      "API de integração",
      "White label",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Preços
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Escolha o plano{" "}
            <span className="text-primary text-glow-green">ideal</span> para você
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comece grátis e evolua conforme sua necessidade. Cancele quando quiser.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass-card rounded-3xl p-8 ${
                plan.popular ? "border-primary/50 neon-glow-green/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div 
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                    plan.popular 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <plan.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 ${plan.popular ? "neon-glow-green" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/cadastro">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Garantia de 30 dias ou seu dinheiro de volta. Sem perguntas.
        </motion.p>
      </div>
    </section>
  )
}
