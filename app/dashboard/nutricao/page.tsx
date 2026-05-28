"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Apple, 
  Plus, 
  Camera, 
  Search,
  Flame,
  Beef,
  Wheat,
  Droplets,
  ChevronRight,
  TrendingUp,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from "recharts"

const macros = {
  calories: { current: 1847, goal: 2200, unit: "kcal" },
  protein: { current: 142, goal: 160, unit: "g" },
  carbs: { current: 180, goal: 220, unit: "g" },
  fat: { current: 65, goal: 75, unit: "g" },
}

const meals = [
  {
    id: 1,
    name: "Café da Manhã",
    time: "07:30",
    calories: 520,
    foods: [
      { name: "Ovos mexidos", quantity: "3 unidades", calories: 210, protein: 18 },
      { name: "Pão integral", quantity: "2 fatias", calories: 160, protein: 6 },
      { name: "Banana", quantity: "1 média", calories: 105, protein: 1 },
      { name: "Café com leite", quantity: "200ml", calories: 45, protein: 3 },
    ]
  },
  {
    id: 2,
    name: "Almoço",
    time: "12:30",
    calories: 680,
    foods: [
      { name: "Frango grelhado", quantity: "200g", calories: 330, protein: 62 },
      { name: "Arroz integral", quantity: "150g", calories: 170, protein: 4 },
      { name: "Feijão", quantity: "100g", calories: 95, protein: 6 },
      { name: "Salada mista", quantity: "1 porção", calories: 85, protein: 3 },
    ]
  },
  {
    id: 3,
    name: "Lanche da Tarde",
    time: "16:00",
    calories: 320,
    foods: [
      { name: "Whey Protein", quantity: "1 scoop", calories: 120, protein: 24 },
      { name: "Aveia", quantity: "50g", calories: 150, protein: 5 },
      { name: "Morango", quantity: "100g", calories: 50, protein: 1 },
    ]
  },
  {
    id: 4,
    name: "Jantar",
    time: "20:00",
    calories: 327,
    foods: [
      { name: "Salmão", quantity: "150g", calories: 280, protein: 35 },
      { name: "Legumes no vapor", quantity: "200g", calories: 47, protein: 3 },
    ]
  },
]

const suggestions = [
  { name: "Adicionar mais proteína no jantar", type: "warning" },
  { name: "Ótimo consumo de fibras hoje!", type: "success" },
  { name: "Beba mais 500ml de água", type: "info" },
]

export default function NutricaoPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const pieData = [
    { name: "Proteína", value: macros.protein.current, color: "oklch(0.75 0.2 145)" },
    { name: "Carboidratos", value: macros.carbs.current, color: "oklch(0.65 0.2 250)" },
    { name: "Gordura", value: macros.fat.current, color: "oklch(0.8 0.18 90)" },
  ]

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
            <h1 className="text-2xl sm:text-3xl font-bold">Nutrição</h1>
            <p className="text-muted-foreground mt-1">
              Acompanhe sua alimentação e atinja suas metas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Escanear
            </Button>
            <Button className="gap-2 neon-glow-green">
              <Plus className="h-4 w-4" />
              Adicionar Refeição
            </Button>
          </div>
        </motion.div>

        {/* Macros Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 glass-card rounded-2xl p-6"
          >
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Calorias</h3>
              <div className="relative w-40 h-40 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: macros.calories.current },
                        { value: macros.calories.goal - macros.calories.current }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="oklch(0.75 0.2 145)" />
                      <Cell fill="oklch(0.2 0.01 270)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{macros.calories.current}</span>
                  <span className="text-sm text-muted-foreground">/{macros.calories.goal}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Restam <span className="text-primary font-medium">{macros.calories.goal - macros.calories.current}</span> kcal
              </div>
            </div>
          </motion.div>

          {/* Macros Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { name: "Proteína", ...macros.protein, icon: Beef, color: "primary" },
              { name: "Carboidratos", ...macros.carbs, icon: Wheat, color: "accent" },
              { name: "Gordura", ...macros.fat, icon: Droplets, color: "chart-4" },
            ].map((macro, index) => (
              <motion.div
                key={macro.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${macro.color}/20`}>
                    <macro.icon className={`h-5 w-5 text-${macro.color}`} />
                  </div>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">{macro.current}{macro.unit}</div>
                <div className="text-sm text-muted-foreground mb-3">de {macro.goal}{macro.unit}</div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(macro.current / macro.goal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full bg-${macro.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar alimentos, receitas..."
            className="h-14 pl-12 text-lg bg-secondary border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap gap-3"
        >
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full text-sm ${
                suggestion.type === "success" 
                  ? "bg-primary/10 text-primary" 
                  : suggestion.type === "warning"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {suggestion.name}
            </div>
          ))}
        </motion.div>

        {/* Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">Refeições de Hoje</h2>
          
          {meals.map((meal, mealIndex) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + mealIndex * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Meal Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Apple className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {meal.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{meal.calories} kcal</div>
                    <div className="text-sm text-muted-foreground">
                      {meal.foods.reduce((acc, f) => acc + f.protein, 0)}g proteína
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              {/* Foods */}
              <div className="p-4 space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div
                    key={foodIndex}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-muted-foreground">{food.quantity}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div>{food.calories} kcal</div>
                      <div className="text-muted-foreground">{food.protein}g prot</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
