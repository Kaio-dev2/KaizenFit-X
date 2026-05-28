"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Play, 
  Pause, 
  SkipForward, 
  Check, 
  Clock, 
  Flame,
  ChevronRight,
  Plus,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const workoutPlans = [
  {
    id: 1,
    name: "Peito e Tríceps",
    day: "Segunda",
    duration: "45 min",
    exercises: 5,
    calories: 320,
    active: true,
  },
  {
    id: 2,
    name: "Costas e Bíceps",
    day: "Terça",
    duration: "50 min",
    exercises: 6,
    calories: 350,
    active: false,
  },
  {
    id: 3,
    name: "Pernas",
    day: "Quarta",
    duration: "55 min",
    exercises: 6,
    calories: 450,
    active: false,
  },
  {
    id: 4,
    name: "Ombros e Abdômen",
    day: "Quinta",
    duration: "40 min",
    exercises: 5,
    calories: 280,
    active: false,
  },
  {
    id: 5,
    name: "Full Body",
    day: "Sexta",
    duration: "60 min",
    exercises: 8,
    calories: 500,
    active: false,
  },
]

const currentExercises = [
  {
    id: 1,
    name: "Supino Reto",
    sets: 4,
    reps: 10,
    weight: "60kg",
    rest: 90,
    videoUrl: "#",
    completed: true,
    currentSet: 4,
  },
  {
    id: 2,
    name: "Supino Inclinado",
    sets: 4,
    reps: 10,
    weight: "50kg",
    rest: 90,
    videoUrl: "#",
    completed: true,
    currentSet: 4,
  },
  {
    id: 3,
    name: "Crucifixo",
    sets: 3,
    reps: 12,
    weight: "14kg",
    rest: 60,
    videoUrl: "#",
    completed: false,
    currentSet: 2,
  },
  {
    id: 4,
    name: "Tríceps Corda",
    sets: 4,
    reps: 12,
    weight: "25kg",
    rest: 60,
    videoUrl: "#",
    completed: false,
    currentSet: 0,
  },
  {
    id: 5,
    name: "Tríceps Testa",
    sets: 3,
    reps: 12,
    weight: "20kg",
    rest: 60,
    videoUrl: "#",
    completed: false,
    currentSet: 0,
  },
]

export default function TreinosPage() {
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(90)
  const [selectedPlan, setSelectedPlan] = useState(workoutPlans[0])
  const [exercises, setExercises] = useState(currentExercises)

  const currentExercise = exercises.find(e => !e.completed && e.currentSet < e.sets) || exercises[exercises.length - 1]
  const completedCount = exercises.filter(e => e.completed).length

  const handleCompleteSet = () => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === currentExercise.id) {
        const newCurrentSet = ex.currentSet + 1
        return {
          ...ex,
          currentSet: newCurrentSet,
          completed: newCurrentSet >= ex.sets
        }
      }
      return ex
    }))
    setIsResting(true)
    setRestTime(currentExercise.rest)
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
            <h1 className="text-2xl sm:text-3xl font-bold">Treinos</h1>
            <p className="text-muted-foreground mt-1">
              Seu plano de treinos personalizado pela IA
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Treino
            </Button>
          </div>
        </motion.div>

        {/* Weekly Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Plano Semanal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workoutPlans.map((plan, index) => (
              <motion.button
                key={plan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedPlan(plan)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  selectedPlan.id === plan.id
                    ? "glass-card border-primary neon-glow-green/20"
                    : "glass-card hover:border-primary/30"
                }`}
              >
                <div className="text-xs text-primary font-medium mb-1">{plan.day}</div>
                <div className="font-semibold mb-2">{plan.name}</div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {plan.calories}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Workout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedPlan.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {completedCount}/{exercises.length} exercícios completos
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedCount / exercises.length) * 100}%` }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((completedCount / exercises.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Exercise List */}
              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className={`p-4 rounded-xl transition-all ${
                      exercise.completed
                        ? "bg-primary/10 border border-primary/30"
                        : currentExercise.id === exercise.id
                        ? "bg-secondary border border-primary"
                        : "bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            exercise.completed 
                              ? "bg-primary text-primary-foreground" 
                              : currentExercise.id === exercise.id
                              ? "bg-primary/20 text-primary border-2 border-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {exercise.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                        <div>
                          <div className={`font-medium ${exercise.completed ? "line-through text-muted-foreground" : ""}`}>
                            {exercise.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exercise.sets}x{exercise.reps} • {exercise.weight}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!exercise.completed && (
                          <div className="text-sm text-muted-foreground">
                            {exercise.currentSet}/{exercise.sets} séries
                          </div>
                        )}
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Current Exercise / Rest Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current Exercise Card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Exercício Atual</h3>
              
              {/* Video Placeholder */}
              <div className="aspect-video rounded-xl bg-secondary mb-4 flex items-center justify-center">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>

              <div className="text-center mb-4">
                <h4 className="text-xl font-bold">{currentExercise.name}</h4>
                <p className="text-muted-foreground">
                  Série {currentExercise.currentSet + 1} de {currentExercise.sets}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-secondary">
                  <div className="text-lg font-bold">{currentExercise.reps}</div>
                  <div className="text-xs text-muted-foreground">Reps</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary">
                  <div className="text-lg font-bold">{currentExercise.weight}</div>
                  <div className="text-xs text-muted-foreground">Peso</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary">
                  <div className="text-lg font-bold">{currentExercise.rest}s</div>
                  <div className="text-xs text-muted-foreground">Descanso</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => {}}
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Pular
                </Button>
                <Button 
                  className="flex-1 h-12 neon-glow-green"
                  onClick={handleCompleteSet}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Completar
                </Button>
              </div>
            </div>

            {/* Rest Timer */}
            {isResting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-6 text-center border-primary neon-glow-green/30"
              >
                <h3 className="text-lg font-semibold mb-2">Descansando</h3>
                <div className="text-5xl font-bold text-primary mb-4">{restTime}s</div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setRestTime(r => Math.max(0, r - 15))}
                  >
                    -15s
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setIsResting(false)}
                  >
                    Pular
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setRestTime(r => r + 15)}
                  >
                    +15s
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
