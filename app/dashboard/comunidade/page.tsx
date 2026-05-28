"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2,
  Image as ImageIcon,
  Plus,
  TrendingUp,
  Trophy,
  Flame,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const posts = [
  {
    id: 1,
    user: {
      name: "Marina Santos",
      avatar: "MS",
      level: 32,
      badge: "Elite",
    },
    content: "Finalmente bati meu recorde de supino! 80kg depois de 6 meses de treino consistente. Obrigada a todos pelo apoio!",
    image: null,
    likes: 234,
    comments: 45,
    liked: true,
    time: "2h atrás",
  },
  {
    id: 2,
    user: {
      name: "Pedro Oliveira",
      avatar: "PO",
      level: 45,
      badge: "Pro",
    },
    content: "365 dias de streak! Um ano inteiro sem faltar um único treino. Se eu consegui, você também consegue!",
    image: null,
    likes: 567,
    comments: 89,
    liked: false,
    time: "4h atrás",
    achievement: { name: "1 Ano de Streak", icon: "🔥" },
  },
  {
    id: 3,
    user: {
      name: "Ana Carolina",
      avatar: "AC",
      level: 28,
      badge: "Rising",
    },
    content: "Transformação de 6 meses! De 85kg para 70kg, mantendo a massa muscular. A IA do Kaizen Fit me ajudou demais no plano alimentar.",
    image: null,
    likes: 892,
    comments: 156,
    liked: true,
    time: "6h atrás",
  },
]

const challenges = [
  {
    id: 1,
    name: "Desafio 30 Dias",
    description: "Complete 30 treinos em 30 dias",
    participants: 2847,
    daysLeft: 12,
    progress: 60,
  },
  {
    id: 2,
    name: "Maratona de Proteína",
    description: "Atinja sua meta de proteína por 14 dias seguidos",
    participants: 1523,
    daysLeft: 5,
    progress: 85,
  },
  {
    id: 3,
    name: "Desafio Cardio",
    description: "Queime 5000 calorias esta semana",
    participants: 3241,
    daysLeft: 3,
    progress: 72,
  },
]

const groups = [
  { id: 1, name: "Hipertrofia Brasil", members: 12453, active: true },
  { id: 2, name: "Runners SP", members: 8721, active: true },
  { id: 3, name: "Low Carb Life", members: 5634, active: false },
  { id: 4, name: "CrossFit Warriors", members: 3298, active: true },
]

export default function ComunidadePage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([1, 3])

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Comunidade</h1>
            <p className="text-muted-foreground mt-1">
              Conecte-se, inspire e seja inspirado
            </p>
          </div>
          <Button className="gap-2 neon-glow-green">
            <Plus className="h-4 w-4" />
            Nova Publicação
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="w-full justify-start bg-secondary/50 p-1 rounded-xl">
                <TabsTrigger value="feed" className="rounded-lg">Feed</TabsTrigger>
                <TabsTrigger value="desafios" className="rounded-lg">Desafios</TabsTrigger>
                <TabsTrigger value="grupos" className="rounded-lg">Grupos</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6 space-y-4">
                {/* Create Post */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      JS
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Compartilhe sua conquista..."
                        className="bg-secondary border-0 h-12"
                      />
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ImageIcon className="h-4 w-4" />
                          Foto
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Trophy className="h-4 w-4" />
                          Conquista
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Posts */}
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                          {post.user.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.user.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                              {post.user.badge}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Nível {post.user.level} • {post.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    {post.achievement && (
                      <div className="px-4 pb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                          <span>{post.achievement.icon}</span>
                          <span>{post.achievement.name}</span>
                        </div>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="px-4 pb-4">
                      <p className="text-foreground leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Actions */}
                    <div className="px-4 py-3 border-t border-border flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          likedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="desafios" className="mt-6 space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{challenge.name}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-primary font-medium">{challenge.daysLeft} dias restantes</div>
                        <div className="text-xs text-muted-foreground">{challenge.participants.toLocaleString()} participantes</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Seu progresso</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${challenge.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="grupos" className="mt-6 space-y-4">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar grupos..."
                    className="pl-10 bg-secondary border-0"
                  />
                </div>
                {groups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {group.members.toLocaleString()} membros
                        </p>
                      </div>
                    </div>
                    <Button variant={group.active ? "outline" : "default"} size="sm">
                      {group.active ? "Membro" : "Entrar"}
                    </Button>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top da Semana</h3>
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "Pedro O.", xp: 4520, position: 1 },
                  { name: "Marina S.", xp: 4380, position: 2 },
                  { name: "João S.", xp: 4150, position: 3 },
                  { name: "Ana C.", xp: 3890, position: 4 },
                  { name: "Lucas M.", xp: 3750, position: 5 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-yellow-500 text-yellow-900" :
                      i === 1 ? "bg-gray-300 text-gray-700" :
                      i === 2 ? "bg-amber-600 text-amber-100" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {user.position}
                    </span>
                    <span className="flex-1 font-medium">{user.name}</span>
                    <span className="text-sm text-primary">{user.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Em Alta</h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {[
                  "#Transformação2024",
                  "#DesafioAgachamento",
                  "#MealPrep",
                  "#StreakChallenge",
                ].map((topic, i) => (
                  <div key={i} className="text-sm text-primary hover:underline cursor-pointer">
                    {topic}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
