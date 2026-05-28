"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dumbbell,
  Apple,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Pin,
  MoreHorizontal,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dados mockados para demonstracao
const mockWorkouts = [
  { id: "1", name: "Treino Full Body Iniciante", difficulty: "beginner", exercises: 8, createdAt: "2024-03-15" },
  { id: "2", name: "Treino de Peito e Triceps", difficulty: "intermediate", exercises: 10, createdAt: "2024-03-14" },
  { id: "3", name: "Treino de Costas e Biceps", difficulty: "intermediate", exercises: 9, createdAt: "2024-03-13" },
  { id: "4", name: "Treino HIIT Avancado", difficulty: "advanced", exercises: 12, createdAt: "2024-03-12" },
]

const mockNutritionPlans = [
  { id: "1", name: "Dieta Low Carb", type: "weight_loss", calories: 1800, createdAt: "2024-03-15" },
  { id: "2", name: "Dieta Hipercalorica", type: "gain_muscle", calories: 3000, createdAt: "2024-03-14" },
  { id: "3", name: "Dieta Equilibrada", type: "maintain", calories: 2200, createdAt: "2024-03-13" },
]

const mockPosts = [
  { id: "1", author: "Joao Silva", content: "Completei meu primeiro treino!", type: "progress", likes: 45, pinned: false, createdAt: "2024-03-15" },
  { id: "2", author: "Maria Santos", content: "Dicas para iniciantes", type: "text", likes: 120, pinned: true, createdAt: "2024-03-14" },
  { id: "3", author: "Pedro Costa", content: "Novo recorde de supino!", type: "achievement", likes: 89, pinned: false, createdAt: "2024-03-13" },
]

type Tab = "treinos" | "nutricao" | "comunidade"

const difficultyLabels: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediario",
  advanced: "Avancado",
  expert: "Expert",
}

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-yellow-500/20 text-yellow-500",
  advanced: "bg-orange-500/20 text-orange-500",
  expert: "bg-red-500/20 text-red-500",
}

export default function ConteudoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("treinos")
  const [searchQuery, setSearchQuery] = useState("")
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showNutritionDialog, setShowNutritionDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const tabs = [
    { id: "treinos" as Tab, name: "Treinos", icon: Dumbbell, count: mockWorkouts.length },
    { id: "nutricao" as Tab, name: "Planos Nutricionais", icon: Apple, count: mockNutritionPlans.length },
    { id: "comunidade" as Tab, name: "Posts da Comunidade", icon: Users, count: mockPosts.length },
  ]

  const handleDelete = (id: string) => {
    setSelectedItem(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    // Implementar delete real aqui
    console.log("Deletando item:", selectedItem)
    setShowDeleteDialog(false)
    setSelectedItem(null)
  }

  const handlePin = (id: string) => {
    // Implementar pin real aqui
    console.log("Pin/Unpin post:", id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Conteudo</h1>
          <p className="text-muted-foreground">
            Gerencie treinos, planos nutricionais e posts da comunidade
          </p>
        </div>
        <Button onClick={() => activeTab === "treinos" ? setShowWorkoutDialog(true) : activeTab === "nutricao" ? setShowNutritionDialog(true) : null}>
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === "treinos" ? "Novo Treino" : activeTab === "nutricao" ? "Novo Plano" : ""}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
            <Badge variant="secondary" className="ml-1">
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "treinos" && (
          <div className="grid gap-4">
            {mockWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Dumbbell className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{workout.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge className={difficultyColors[workout.difficulty]}>
                          {difficultyLabels[workout.difficulty]}
                        </Badge>
                        <span>{workout.exercises} exercicios</span>
                        <span>Criado em {new Date(workout.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(workout.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "nutricao" && (
          <div className="grid gap-4">
            {mockNutritionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Apple className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{plan.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{plan.calories} kcal/dia</span>
                        <span>Criado em {new Date(plan.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "comunidade" && (
          <div className="grid gap-4">
            {mockPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.author}</h3>
                        {post.pinned && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            <Pin className="h-3 w-3 mr-1" />
                            Fixado
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{post.content}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{post.likes} curtidas</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePin(post.id)}>
                        <Pin className="h-4 w-4 mr-2" />
                        {post.pinned ? "Desafixar" : "Fixar"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusao</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este item? Esta acao nao pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Workout Dialog */}
      <Dialog open={showWorkoutDialog} onOpenChange={setShowWorkoutDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar Novo Treino</DialogTitle>
            <DialogDescription>
              Preencha as informacoes do treino
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workout-name">Nome do Treino</Label>
              <Input id="workout-name" placeholder="Ex: Treino Full Body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workout-difficulty">Dificuldade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Iniciante</SelectItem>
                  <SelectItem value="intermediate">Intermediario</SelectItem>
                  <SelectItem value="advanced">Avancado</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="workout-description">Descricao</Label>
              <Textarea id="workout-description" placeholder="Descreva o treino..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWorkoutDialog(false)}>
              Cancelar
            </Button>
            <Button>Criar Treino</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Nutrition Plan Dialog */}
      <Dialog open={showNutritionDialog} onOpenChange={setShowNutritionDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar Plano Nutricional</DialogTitle>
            <DialogDescription>
              Preencha as informacoes do plano
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Nome do Plano</Label>
              <Input id="plan-name" placeholder="Ex: Dieta Low Carb" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-calories">Calorias Diarias</Label>
              <Input id="plan-calories" type="number" placeholder="2000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-type">Tipo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight_loss">Perda de Peso</SelectItem>
                  <SelectItem value="gain_muscle">Ganho de Massa</SelectItem>
                  <SelectItem value="maintain">Manutencao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-description">Descricao</Label>
              <Textarea id="plan-description" placeholder="Descreva o plano..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNutritionDialog(false)}>
              Cancelar
            </Button>
            <Button>Criar Plano</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
