"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Flame, 
  Target, 
  Trophy,
  ArrowRight,
  Play,
  ChevronRight,
  Zap,
  Calendar,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { useUser } from "@/components/user-provider"

const progressData = [
  { day: "Seg", peso: 75.2, calorias: 1850 },
  { day: "Ter", peso: 75.0, calorias: 1920 },
  { day: "Qua", peso: 74.8, calorias: 1780 },
  { day: "Qui", peso: 74.9, calorias: 2100 },
  { day: "Sex", peso: 74.5, calorias: 1950 },
  { day: "Sáb", peso: 74.3, calorias: 2200 },
  { day: "Dom", peso: 74.1, calorias: 1800 },
]

const todayWorkout = {
  name: "Peito e Tríceps",
  duration: "45 min",
  exercises: [
    { name: "Supino Reto", sets: "4x10", weight: "60kg", done: true },
    { name: "Supino Inclinado", sets: "4x10", weight: "50kg", done: true },
    { name: "Crucifixo", sets: "3x12", weight: "14kg", done: false },
    { name: "Tríceps Corda", sets: "4x12", weight: "25kg", done: false },
    { name: "Tríceps Testa", sets: "3x12", weight: "20kg", done: false },
  ]
}

const upcomingWorkouts = [
  { day: "Amanhã", name: "Costas e Bíceps", time: "08:00" },
  { day: "Quarta", name: "Pernas", time: "08:00" },
  { day: "Quinta", name: "Ombros e Abdômen", time: "08:00" },
]

const achievements = [
  { name: "Primeira Semana", icon: "🎯", unlocked: true },
  { name: "10 Treinos", icon: "💪", unlocked: true },
  { name: "Streak 7 dias", icon: "🔥", unlocked: true },
  { name: "Meta de Peso", icon: "⚖️", unlocked: false },
]

export function DashboardHome() {
  const { user } = useUser()
  const firstName = user.name.split(" ")[0]
  const completedExercises = todayWorkout.exercises.filter(e => e.done).length
  const totalExercises = todayWorkout.exercises.length
  const workoutProgress = (completedExercises / totalExercises) * 100

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Olá, {firstName}! <span className="text-2xl sm:text-3xl">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Vamos continuar sua evolução hoje?
          </p>
        </div>
        <Button className="neon-glow-green gap-2" asChild>
          <Link href="/dashboard/treinos">
            <Play className="h-4 w-4" />
            Iniciar Treino
          </Link>
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { 
            label: "Calorias Hoje", 
            value: "1,847", 
            max: "2,200 kcal", 
            icon: Flame, 
            color: "primary",
            progress: 84 
          },
          { 
            label: "Proteínas", 
            value: "142g", 
            max: "160g meta", 
            icon: Target, 
            color: "accent",
            progress: 89 
          },
          { 
            label: "Streak", 
            value: "15", 
            max: "dias seguidos", 
            icon: Zap, 
            color: "primary",
            progress: 100 
          },
          { 
            label: "XP Semanal", 
            value: "+2,450", 
            max: "Top 5%", 
            icon: Trophy, 
            color: "accent",
            progress: 95 
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                }`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.max}</div>
            <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className={`h-full rounded-full ${
                  stat.color === "primary" ? "bg-primary" : "bg-accent"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Treino de Hoje</h2>
              <p className="text-sm text-muted-foreground">{todayWorkout.name} • {todayWorkout.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{completedExercises}/{totalExercises}</span>
              <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${workoutProgress}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {todayWorkout.exercises.map((exercise, i) => (
              <motion.div
                key={exercise.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  exercise.done 
                    ? "bg-primary/10 border border-primary/30" 
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      exercise.done 
                        ? "bg-primary text-primary-foreground" 
                        : "border-2 border-muted-foreground"
                    }`}
                  >
                    {exercise.done && <span className="text-xs">✓</span>}
                  </div>
                  <span className={exercise.done ? "line-through text-muted-foreground" : "font-medium"}>
                    {exercise.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{exercise.sets}</span>
                  <span className="text-primary font-medium">{exercise.weight}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full mt-6 h-12 neon-glow-green" asChild>
            <Link href="/dashboard/treinos">
              Continuar Treino
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Workouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Próximos Treinos</h2>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingWorkouts.map((workout) => (
                <div
                  key={workout.day}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div>
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-sm text-muted-foreground">{workout.day}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {workout.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Conquistas</h2>
              <Link href="/dashboard/ranking" className="text-sm text-primary hover:underline flex items-center gap-1">
                Ver todas
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${
                    achievement.unlocked 
                      ? "bg-primary/20" 
                      : "bg-secondary/50 grayscale opacity-50"
                  }`}
                  title={achievement.name}
                >
                  {achievement.icon}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Progresso Semanal</h2>
            <p className="text-sm text-muted-foreground">Peso e calorias dos últimos 7 dias</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Peso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Calorias</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.75 0.2 145)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.75 0.2 145)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="peso"
                orientation="left"
                domain={[73, 76]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
                tickFormatter={(value) => `${value}kg`}
              />
              <YAxis 
                yAxisId="calorias"
                orientation="right"
                domain={[1500, 2500]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
              />
              <Area
                yAxisId="peso"
                type="monotone"
                dataKey="peso"
                stroke="oklch(0.75 0.2 145)"
                strokeWidth={2}
                fill="url(#colorPeso)"
              />
              <Line
                yAxisId="calorias"
                type="monotone"
                dataKey="calorias"
                stroke="oklch(0.65 0.2 250)"
                strokeWidth={2}
                dot={{ fill: 'oklch(0.65 0.2 250)', strokeWidth: 0, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
