"use client"

import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal,
  Crown,
  TrendingUp,
  Flame,
  Target,
  Dumbbell,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const rankings = {
  weekly: [
    { position: 1, name: "Pedro Oliveira", avatar: "PO", xp: 4520, streak: 365, change: 0 },
    { position: 2, name: "Marina Santos", avatar: "MS", xp: 4380, streak: 89, change: 2 },
    { position: 3, name: "João Silva", avatar: "JS", xp: 4150, streak: 15, change: -1 },
    { position: 4, name: "Ana Carolina", avatar: "AC", xp: 3890, streak: 45, change: 1 },
    { position: 5, name: "Lucas Mendes", avatar: "LM", xp: 3750, streak: 23, change: -2 },
    { position: 6, name: "Juliana Costa", avatar: "JC", xp: 3620, streak: 67, change: 3 },
    { position: 7, name: "Roberto Lima", avatar: "RL", xp: 3480, streak: 12, change: 0 },
    { position: 8, name: "Carla Souza", avatar: "CS", xp: 3350, streak: 34, change: -1 },
    { position: 9, name: "Fernando Dias", avatar: "FD", xp: 3220, streak: 56, change: 2 },
    { position: 10, name: "Patricia Melo", avatar: "PM", xp: 3100, streak: 28, change: -2 },
  ],
  monthly: [
    { position: 1, name: "Marina Santos", avatar: "MS", xp: 18500, streak: 89, change: 0 },
    { position: 2, name: "Pedro Oliveira", avatar: "PO", xp: 17800, streak: 365, change: 0 },
    { position: 3, name: "Ana Carolina", avatar: "AC", xp: 16200, streak: 45, change: 2 },
  ],
  allTime: [
    { position: 1, name: "Pedro Oliveira", avatar: "PO", xp: 156000, streak: 365, change: 0 },
    { position: 2, name: "Marina Santos", avatar: "MS", xp: 142000, streak: 89, change: 0 },
    { position: 3, name: "Roberto Lima", avatar: "RL", xp: 128000, streak: 12, change: 0 },
  ]
}

const userStats = {
  position: 3,
  xp: 4150,
  totalXp: 12450,
  streak: 15,
  level: 24,
  achievements: 18,
}

const achievements = [
  { id: 1, name: "Primeiro Treino", icon: "🎯", description: "Complete seu primeiro treino", unlocked: true, date: "15/01/2024" },
  { id: 2, name: "10 Treinos", icon: "💪", description: "Complete 10 treinos", unlocked: true, date: "25/01/2024" },
  { id: 3, name: "Streak 7 Dias", icon: "🔥", description: "Mantenha 7 dias consecutivos", unlocked: true, date: "22/01/2024" },
  { id: 4, name: "Streak 30 Dias", icon: "⚡", description: "Mantenha 30 dias consecutivos", unlocked: false, progress: 50 },
  { id: 5, name: "100 Treinos", icon: "🏆", description: "Complete 100 treinos", unlocked: false, progress: 32 },
  { id: 6, name: "Meta de Peso", icon: "⚖️", description: "Atinja sua meta de peso", unlocked: false, progress: 75 },
  { id: 7, name: "Social Star", icon: "⭐", description: "Receba 100 curtidas", unlocked: true, date: "10/02/2024" },
  { id: 8, name: "Maratonista", icon: "🏃", description: "Corra 100km total", unlocked: false, progress: 45 },
]

export default function RankingPage() {
  const getPositionStyle = (position: number) => {
    if (position === 1) return "bg-yellow-500 text-yellow-900"
    if (position === 2) return "bg-gray-300 text-gray-700"
    if (position === 3) return "bg-amber-600 text-amber-100"
    return "bg-secondary text-muted-foreground"
  }

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Crown className="h-5 w-5" />
    if (position === 2) return <Medal className="h-5 w-5" />
    if (position === 3) return <Trophy className="h-5 w-5" />
    return position
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">Ranking & Conquistas</h1>
          <p className="text-muted-foreground mt-1">
            Compita, conquiste medalhas e suba de nível
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Posição Semanal", value: `#${userStats.position}`, icon: Trophy, color: "primary" },
            { label: "XP Total", value: userStats.totalXp.toLocaleString(), icon: Star, color: "accent" },
            { label: "Streak Atual", value: `${userStats.streak} dias`, icon: Flame, color: "primary" },
            { label: "Conquistas", value: `${userStats.achievements}/24`, icon: Medal, color: "accent" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-${stat.color}/20`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="weekly">
              <TabsList className="bg-secondary/50 p-1 rounded-xl">
                <TabsTrigger value="weekly" className="rounded-lg">Semanal</TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-lg">Mensal</TabsTrigger>
                <TabsTrigger value="allTime" className="rounded-lg">Geral</TabsTrigger>
              </TabsList>

              {Object.entries(rankings).map(([key, data]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="glass-card rounded-2xl overflow-hidden">
                    {/* Top 3 Podium */}
                    <div className="p-6 bg-gradient-to-b from-primary/10 to-transparent">
                      <div className="flex items-end justify-center gap-4">
                        {/* 2nd Place */}
                        {data[1] && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                          >
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                              {data[1].avatar}
                            </div>
                            <div className="font-semibold text-sm">{data[1].name.split(" ")[0]}</div>
                            <div className="text-xs text-muted-foreground">{data[1].xp.toLocaleString()} XP</div>
                            <div className="w-16 h-20 mt-2 bg-gray-300/20 rounded-t-lg flex items-center justify-center">
                              <span className="text-2xl font-bold text-gray-400">2</span>
                            </div>
                          </motion.div>
                        )}

                        {/* 1st Place */}
                        {data[0] && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                          >
                            <Crown className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-yellow-900 font-bold text-2xl ring-4 ring-yellow-500/30">
                              {data[0].avatar}
                            </div>
                            <div className="font-semibold">{data[0].name.split(" ")[0]}</div>
                            <div className="text-sm text-primary">{data[0].xp.toLocaleString()} XP</div>
                            <div className="w-20 h-28 mt-2 bg-yellow-500/20 rounded-t-lg flex items-center justify-center">
                              <span className="text-3xl font-bold text-yellow-500">1</span>
                            </div>
                          </motion.div>
                        )}

                        {/* 3rd Place */}
                        {data[2] && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                          >
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-amber-100 font-bold text-xl">
                              {data[2].avatar}
                            </div>
                            <div className="font-semibold text-sm">{data[2].name.split(" ")[0]}</div>
                            <div className="text-xs text-muted-foreground">{data[2].xp.toLocaleString()} XP</div>
                            <div className="w-16 h-16 mt-2 bg-amber-600/20 rounded-t-lg flex items-center justify-center">
                              <span className="text-2xl font-bold text-amber-600">3</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Rest of Rankings */}
                    <div className="p-4 space-y-2">
                      {data.slice(3).map((user, i) => (
                        <motion.div
                          key={user.position}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-xl ${
                            user.name === "João Silva" ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionStyle(user.position)}`}>
                            {user.position}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Flame className="h-3 w-3 text-orange-500" />
                              {user.streak} dias
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">{user.xp.toLocaleString()} XP</div>
                            <div className={`text-xs flex items-center gap-1 ${
                              user.change > 0 ? "text-green-500" : user.change < 0 ? "text-red-500" : "text-muted-foreground"
                            }`}>
                              {user.change > 0 ? "↑" : user.change < 0 ? "↓" : "–"} {Math.abs(user.change)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold mb-4">Conquistas</h2>
            <div className="space-y-4">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`p-4 rounded-xl ${
                    achievement.unlocked ? "bg-primary/10" : "bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl ${!achievement.unlocked && "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <div className={`font-medium ${!achievement.unlocked && "text-muted-foreground"}`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.unlocked ? achievement.date : achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">{achievement.progress}%</div>
                    )}
                  </div>
                  {!achievement.unlocked && (
                    <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-muted-foreground/30"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
