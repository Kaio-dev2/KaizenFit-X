"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Sparkles, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "50K+", label: "Usuários Ativos", icon: Users },
  { value: "2M+", label: "Treinos Completados", icon: TrendingUp },
  { value: "98%", label: "Satisfação", icon: Sparkles },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-background opacity-40" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span>Inteligência Artificial de Última Geração</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
          >
            Transforme seu corpo com{" "}
            <span className="text-primary text-glow-green">
              Inteligência Artificial
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance"
          >
            A plataforma de fitness mais avançada do mundo. Treinos personalizados, 
            nutrição inteligente e uma comunidade que te impulsiona a alcançar 
            resultados extraordinários.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-lg neon-glow-green group" asChild>
              <Link href="/cadastro">
                Começar Grátis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg group" asChild>
              <Link href="#demo">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-glow-green">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-card rounded-3xl p-2 sm:p-4 neon-glow-green/30">
              <div className="rounded-2xl bg-card overflow-hidden">
                <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold">Olá, João!</h3>
          <p className="text-sm text-muted-foreground">Vamos treinar hoje?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-lg font-bold text-primary">15</div>
              <div className="text-xs text-muted-foreground">Dias de streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Calorias", value: "1,847", max: "2,200", color: "primary" },
          { label: "Proteínas", value: "142g", max: "160g", color: "accent" },
          { label: "Treinos", value: "4/5", max: "semana", color: "primary" },
          { label: "XP Total", value: "12,450", max: "Nível 24", color: "accent" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4">
            <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.max}</div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 1 }}
                className={`h-full rounded-full ${stat.color === "primary" ? "bg-primary" : "bg-accent"}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Today's Workout */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Treino de Hoje</h4>
          <span className="text-sm text-primary">Peito e Tríceps</span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Supino Reto", sets: "4x10", weight: "60kg" },
            { name: "Supino Inclinado", sets: "4x10", weight: "50kg" },
            { name: "Crucifixo", sets: "3x12", weight: "14kg" },
            { name: "Tríceps Corda", sets: "4x12", weight: "25kg" },
          ].map((exercise, i) => (
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <span className="font-medium">{exercise.name}</span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{exercise.sets}</span>
                <span className="text-primary">{exercise.weight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
