"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Dumbbell, 
  Scale, 
  Clock,
  Apple,
  Trophy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const steps = [
  { id: 1, title: "Objetivo", icon: Target },
  { id: 2, title: "Experiência", icon: Dumbbell },
  { id: 3, title: "Medidas", icon: Scale },
  { id: 4, title: "Rotina", icon: Clock },
  { id: 5, title: "Dieta", icon: Apple },
]

const objectives = [
  { id: "lose", label: "Perder Peso", description: "Queimar gordura e definir", emoji: "🔥" },
  { id: "gain", label: "Ganhar Massa", description: "Construir músculos", emoji: "💪" },
  { id: "maintain", label: "Manter Forma", description: "Saúde e bem-estar", emoji: "⚡" },
  { id: "athletic", label: "Performance", description: "Melhorar desempenho", emoji: "🏆" },
]

const experienceLevels = [
  { id: "beginner", label: "Iniciante", description: "Menos de 6 meses", emoji: "🌱" },
  { id: "intermediate", label: "Intermediário", description: "6 meses a 2 anos", emoji: "🌿" },
  { id: "advanced", label: "Avançado", description: "2+ anos de treino", emoji: "🌳" },
  { id: "athlete", label: "Atleta", description: "Competidor/profissional", emoji: "🏅" },
]

const weeklyFrequency = [
  { id: "2", label: "2x por semana", description: "Iniciando devagar" },
  { id: "3", label: "3x por semana", description: "Equilíbrio ideal" },
  { id: "4", label: "4x por semana", description: "Dedicação séria" },
  { id: "5", label: "5-6x por semana", description: "Foco total" },
]

const dietPreferences = [
  { id: "normal", label: "Sem Restrição", description: "Como de tudo" },
  { id: "vegetarian", label: "Vegetariano", description: "Sem carnes" },
  { id: "vegan", label: "Vegano", description: "100% plant-based" },
  { id: "lowcarb", label: "Low Carb", description: "Baixo carboidrato" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    objective: "",
    experience: "",
    weight: "",
    height: "",
    age: "",
    frequency: "",
    diet: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.objective !== ""
      case 2: return formData.experience !== ""
      case 3: return formData.weight !== "" && formData.height !== "" && formData.age !== ""
      case 4: return formData.frequency !== ""
      case 5: return formData.diet !== ""
      default: return false
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary neon-glow-green">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Kaizen<span className="text-primary">Fit</span>
            </span>
          </div>
          
          {/* Progress Steps */}
          <div className="hidden sm:flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= step.id ? "var(--primary)" : "var(--secondary)",
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep >= step.id 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-8 h-0.5 mx-1 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {currentStep} de {steps.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Objective */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Qual é seu objetivo principal?</h1>
                  <p className="text-muted-foreground">
                    Isso nos ajuda a personalizar seus treinos e dieta
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {objectives.map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => setFormData({ ...formData, objective: obj.id })}
                      className={`p-6 rounded-2xl text-left transition-all ${
                        formData.objective === obj.id
                          ? "glass-card border-primary neon-glow-green/20"
                          : "glass-card hover:border-primary/30"
                      }`}
                    >
                      <span className="text-3xl mb-3 block">{obj.emoji}</span>
                      <div className="font-semibold text-lg">{obj.label}</div>
                      <div className="text-sm text-muted-foreground">{obj.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Experience */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Qual seu nível de experiência?</h1>
                  <p className="text-muted-foreground">
                    Adaptaremos a intensidade dos treinos
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setFormData({ ...formData, experience: level.id })}
                      className={`p-6 rounded-2xl text-left transition-all ${
                        formData.experience === level.id
                          ? "glass-card border-primary neon-glow-green/20"
                          : "glass-card hover:border-primary/30"
                      }`}
                    >
                      <span className="text-3xl mb-3 block">{level.emoji}</span>
                      <div className="font-semibold text-lg">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Measurements */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Scale className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Suas medidas atuais</h1>
                  <p className="text-muted-foreground">
                    Para calcular seu plano nutricional ideal
                  </p>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso atual (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="75"
                      className="h-14 text-lg bg-secondary border-border"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      className="h-14 text-lg bg-secondary border-border"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="28"
                      className="h-14 text-lg bg-secondary border-border"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Frequency */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Quantas vezes quer treinar?</h1>
                  <p className="text-muted-foreground">
                    Montaremos um cronograma que funciona para você
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {weeklyFrequency.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFormData({ ...formData, frequency: freq.id })}
                      className={`p-6 rounded-2xl text-left transition-all ${
                        formData.frequency === freq.id
                          ? "glass-card border-primary neon-glow-green/20"
                          : "glass-card hover:border-primary/30"
                      }`}
                    >
                      <div className="font-semibold text-lg">{freq.label}</div>
                      <div className="text-sm text-muted-foreground">{freq.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Diet */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Apple className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Preferência alimentar</h1>
                  <p className="text-muted-foreground">
                    Para criar receitas e planos que você vai adorar
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dietPreferences.map((diet) => (
                    <button
                      key={diet.id}
                      onClick={() => setFormData({ ...formData, diet: diet.id })}
                      className={`p-6 rounded-2xl text-left transition-all ${
                        formData.diet === diet.id
                          ? "glass-card border-primary neon-glow-green/20"
                          : "glass-card hover:border-primary/30"
                      }`}
                    >
                      <div className="font-semibold text-lg">{diet.label}</div>
                      <div className="text-sm text-muted-foreground">{diet.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 neon-glow-green"
            >
              Próximo
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed() || isLoading}
              className="gap-2 neon-glow-green"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  Começar Jornada
                </>
              )}
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
