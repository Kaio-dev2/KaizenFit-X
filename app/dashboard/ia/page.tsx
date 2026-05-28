"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { 
  Brain, 
  Send, 
  Sparkles, 
  Dumbbell,
  Apple,
  Target,
  Lightbulb,
  MessageSquare,
  User,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: Dumbbell, label: "Criar treino", prompt: "Crie um treino de hipertrofia para peito e tríceps" },
  { icon: Apple, label: "Plano alimentar", prompt: "Monte um plano alimentar para ganho de massa muscular" },
  { icon: Target, label: "Definir meta", prompt: "Quero perder 5kg em 2 meses, como posso fazer?" },
  { icon: Lightbulb, label: "Dicas", prompt: "Me dê dicas para melhorar meu desempenho nos treinos" },
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Olá, João! Sou seu coach de IA pessoal. Como posso ajudá-lo hoje? Posso criar treinos personalizados, planos nutricionais, responder dúvidas sobre exercícios ou ajudar a definir e alcançar suas metas.",
    timestamp: new Date(),
  }
]

export default function IAPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "treino": `Excelente! Baseado no seu perfil e objetivos, criei um treino de Peito e Tríceps otimizado:

**Aquecimento (5 min)**
- Rotação de ombros
- Flexões no joelho (2x15)

**Treino Principal**

1. **Supino Reto** - 4x10 (60kg)
   - Desça a barra até tocar levemente o peito
   - Descanso: 90s

2. **Supino Inclinado** - 4x10 (50kg)
   - Foque na contração do peitoral superior
   - Descanso: 90s

3. **Crucifixo com Halteres** - 3x12 (14kg)
   - Mantenha os cotovelos levemente flexionados
   - Descanso: 60s

4. **Tríceps Corda** - 4x12 (25kg)
   - Estenda completamente os braços
   - Descanso: 60s

5. **Tríceps Testa** - 3x12 (20kg)
   - Controle o movimento na descida
   - Descanso: 60s

Quer que eu salve esse treino no seu plano?`,
        "alimentar": `Com base no seu objetivo de ganho de massa muscular e suas métricas (75kg, 175cm), preparei um plano alimentar:

**Meta Diária**
- Calorias: 2.800 kcal
- Proteína: 180g
- Carboidratos: 350g
- Gordura: 80g

**Plano de Refeições**

🌅 **Café da Manhã (7h)**
- 4 ovos mexidos
- 2 fatias de pão integral
- 1 banana
- 200ml de leite

🍽️ **Almoço (12h)**
- 200g de frango grelhado
- 200g de arroz integral
- 150g de feijão
- Salada à vontade

🥤 **Pré-Treino (15h)**
- 1 scoop de whey
- 1 banana
- 30g de aveia

💪 **Pós-Treino (17h)**
- 1 scoop de whey
- 50g de maltodextrina

🌙 **Jantar (20h)**
- 200g de carne vermelha
- 200g de batata doce
- Legumes refogados

Posso ajustar conforme suas preferências!`,
        "default": `Entendi sua pergunta! Baseado no seu perfil e histórico de treinos, posso te ajudar com isso.

Analisando seus dados:
- Você está em uma sequência de 15 dias de treino
- Seu peso diminuiu 1.1kg na última semana
- Sua média de proteína está em 89% da meta

Recomendo que você:
1. Continue mantendo a consistência nos treinos
2. Aumente levemente a ingestão de proteína
3. Mantenha o déficit calórico moderado

Quer que eu detalhe mais algum ponto específico?`
      }

      let response = responses["default"]
      if (messageText.toLowerCase().includes("treino")) {
        response = responses["treino"]
      } else if (messageText.toLowerCase().includes("alimentar") || messageText.toLowerCase().includes("nutri")) {
        response = responses["alimentar"]
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center neon-glow-green">
            <Brain className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">IA Coach</h1>
            <p className="text-muted-foreground">Seu assistente pessoal de fitness</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {quickActions.map((action, i) => (
            <Button
              key={action.label}
              variant="outline"
              className="gap-2"
              onClick={() => handleSend(action.prompt)}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </motion.div>

        {/* Chat Area */}
        <div className="flex-1 glass-card rounded-2xl overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      message.role === "user" 
                        ? "bg-secondary" 
                        : "bg-primary/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div 
                      className={`text-xs mt-2 ${
                        message.role === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-secondary rounded-2xl p-4">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre treinos, nutrição, metas..."
                  className="h-14 pl-12 pr-4 text-base bg-secondary border-0"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="h-14 w-14 neon-glow-green"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-2">
              IA treinada com dados científicos de fitness e nutrição
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
