"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Dumbbell, 
  LineChart, 
  Apple, 
  Users, 
  Trophy,
  Zap,
  Shield,
  Smartphone
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "IA Personalizada",
    description: "Algoritmos avançados que aprendem com você e adaptam treinos e dietas em tempo real.",
    color: "primary",
  },
  {
    icon: Dumbbell,
    title: "Treinos Inteligentes",
    description: "Mais de 500 exercícios com vídeos HD e progressão automática baseada no seu desempenho.",
    color: "accent",
  },
  {
    icon: Apple,
    title: "Nutrição Precisa",
    description: "Planos alimentares personalizados com scanner de alimentos e receitas exclusivas.",
    color: "primary",
  },
  {
    icon: LineChart,
    title: "Analytics Avançado",
    description: "Métricas detalhadas, gráficos de progresso e insights para otimizar seus resultados.",
    color: "accent",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com milhares de pessoas, participe de desafios e compartilhe conquistas.",
    color: "primary",
  },
  {
    icon: Trophy,
    title: "Gamificação",
    description: "Sistema de XP, níveis, medalhas e rankings que tornam seu progresso divertido.",
    color: "accent",
  },
]

const additionalFeatures = [
  { icon: Zap, text: "Sincronização em tempo real" },
  { icon: Shield, text: "Dados 100% seguros" },
  { icon: Smartphone, text: "App iOS e Android" },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
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
            Recursos
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Tudo que você precisa para{" "}
            <span className="text-primary text-glow-green">evoluir</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Uma plataforma completa que combina ciência, tecnologia e comunidade 
            para maximizar seus resultados.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all"
            >
              <div 
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                  feature.color === "primary" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-accent/10 text-accent"
                }`}
              >
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {additionalFeatures.map((feature) => (
            <div key={feature.text} className="flex items-center gap-3 text-muted-foreground">
              <feature.icon className="h-5 w-5 text-primary" />
              <span>{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
