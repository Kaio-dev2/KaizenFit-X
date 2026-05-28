"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  HelpCircle, 
  MessageSquare, 
  Search,
  ChevronDown,
  Send,
  Loader2,
  Check,
  Clock,
  Mail,
  FileText,
  Dumbbell,
  CreditCard,
  ShoppingBag,
  Users,
  Brain
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@/components/user-provider"

const faqCategories = [
  { id: "geral", name: "Geral", icon: HelpCircle },
  { id: "treinos", name: "Treinos", icon: Dumbbell },
  { id: "nutricao", name: "Nutrição", icon: FileText },
  { id: "ia", name: "IA Coach", icon: Brain },
  { id: "comunidade", name: "Comunidade", icon: Users },
  { id: "loja", name: "Loja", icon: ShoppingBag },
  { id: "pagamentos", name: "Pagamentos", icon: CreditCard },
]

const faqs = [
  {
    category: "geral",
    question: "Como funciona o KaizenFit?",
    answer: "O KaizenFit é uma plataforma completa de fitness que combina treinos personalizados, acompanhamento nutricional e um coach de IA para ajudar você a alcançar seus objetivos. Nosso sistema gamificado torna a jornada mais motivadora com XP, conquistas e rankings."
  },
  {
    category: "geral",
    question: "Como altero minhas informações de perfil?",
    answer: "Acesse Configurações > Perfil para atualizar suas informações pessoais, incluindo nome, foto, dados físicos e objetivos. Manter seu perfil atualizado ajuda nosso sistema a fornecer recomendações mais precisas."
  },
  {
    category: "geral",
    question: "Como funciona o sistema de XP e níveis?",
    answer: "Você ganha XP completando treinos, registrando refeições, mantendo sua streak diária e conquistando achievements. Quanto mais XP, maior seu nível. Suba no ranking e desbloqueie badges exclusivas!"
  },
  {
    category: "treinos",
    question: "Como criar um plano de treino personalizado?",
    answer: "Vá em Treinos > Criar Plano. Você pode criar do zero ou usar nosso assistente de IA para gerar um plano baseado em seus objetivos, nível de experiência e equipamentos disponíveis."
  },
  {
    category: "treinos",
    question: "Posso modificar exercícios durante o treino?",
    answer: "Sim! Durante a execução de um treino, você pode substituir exercícios, ajustar séries, repetições e cargas. Todas as modificações são salvas automaticamente."
  },
  {
    category: "treinos",
    question: "Como registro meu progresso?",
    answer: "Ao completar cada série, marque como concluída no app. Você pode adicionar peso, número de repetições e notas. Ao finalizar o treino, você receberá um resumo com calorias queimadas e XP ganho."
  },
  {
    category: "nutricao",
    question: "Como registro minhas refeições?",
    answer: "Acesse Nutrição e clique em Adicionar Refeição. Pesquise alimentos no nosso banco de dados ou escaneie códigos de barras. Você também pode criar alimentos personalizados."
  },
  {
    category: "nutricao",
    question: "O app calcula meus macros automaticamente?",
    answer: "Sim! Com base no seu perfil (peso, altura, objetivo, nível de atividade), calculamos suas necessidades diárias de calorias, proteínas, carboidratos e gorduras."
  },
  {
    category: "ia",
    question: "O que o IA Coach pode fazer?",
    answer: "Nosso coach de IA pode criar treinos personalizados, sugerir ajustes na dieta, responder dúvidas sobre exercícios, ajudar com técnica de movimentos e fornecer motivação baseada no seu progresso."
  },
  {
    category: "ia",
    question: "O IA Coach considera meu histórico?",
    answer: "Sim! O coach tem acesso ao seu histórico de treinos, progresso, preferências e objetivos para fornecer recomendações cada vez mais personalizadas."
  },
  {
    category: "comunidade",
    question: "Como participo de grupos?",
    answer: "Acesse Comunidade > Grupos para ver grupos disponíveis. Você pode filtrar por cidade, categoria ou interesse. Participe de discussões, compartilhe progresso e conecte-se com outros membros."
  },
  {
    category: "loja",
    question: "Quais produtos vocês vendem?",
    answer: "Nossa loja oferece suplementos, equipamentos de treino, roupas fitness e acessórios. Todos os produtos são selecionados e verificados pela nossa equipe."
  },
  {
    category: "loja",
    question: "Qual o prazo de entrega?",
    answer: "O prazo varia de acordo com sua localização. Geralmente, capitais recebem em 3-5 dias úteis e outras regiões em 5-10 dias úteis. Você pode acompanhar seu pedido em tempo real."
  },
  {
    category: "pagamentos",
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartão de crédito (até 12x), cartão de débito, PIX e boleto bancário. Todas as transações são processadas de forma segura."
  },
  {
    category: "pagamentos",
    question: "Como solicito reembolso?",
    answer: "Para produtos físicos, você tem 7 dias após o recebimento para solicitar devolução. Para assinaturas, entre em contato conosco para cancelamento e reembolso proporcional."
  },
]

const ticketCategories = [
  { value: "problema_tecnico", label: "Problema técnico" },
  { value: "conta", label: "Conta e acesso" },
  { value: "pagamento", label: "Pagamento e cobrança" },
  { value: "pedido", label: "Pedidos da loja" },
  { value: "sugestao", label: "Sugestão de melhoria" },
  { value: "outro", label: "Outro assunto" },
]

export default function AjudaPage() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showTicketForm, setShowTicketForm] = useState(false)
  
  // Ticket form state
  const [ticketCategory, setTicketCategory] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketProtocol, setTicketProtocol] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    
    // Gerar protocolo unico
    const protocol = `KZF-${Date.now().toString(36).toUpperCase()}`
    const date = new Date().toLocaleDateString('pt-BR')
    
    try {
      const response = await fetch('/api/suporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.name || 'Usuario',
          email: user?.email || '',
          date,
          category: ticketCategories.find(c => c.value === ticketCategory)?.label || ticketCategory,
          description: `Assunto: ${ticketSubject}\n\n${ticketMessage}`,
          protocol,
          userId: user?.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Erro ao enviar ticket')
        return
      }

      setTicketProtocol(data.protocol)
      setSubmitted(true)
    } catch (error) {
      setSubmitError('Erro de conexao. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setShowTicketForm(false)
      setSubmitted(false)
      setTicketProtocol(null)
      setTicketCategory("")
      setTicketSubject("")
      setTicketMessage("")
      setSubmitError(null)
    }, 5000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Central de Ajuda</h1>
        <p className="text-muted-foreground">
          Encontre respostas para suas dúvidas ou entre em contato conosco
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar nas perguntas frequentes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-lg rounded-2xl"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setShowTicketForm(true)}
          className="glass-card p-6 rounded-2xl text-left hover:bg-secondary/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Abrir Ticket</h3>
              <p className="text-sm text-muted-foreground">Fale com nossa equipe</p>
            </div>
          </div>
        </button>

        <a
          href="mailto:suporte@kaizenfit.com"
          className="glass-card p-6 rounded-2xl text-left hover:bg-secondary/50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">suporte@kaizenfit.com</p>
            </div>
          </div>
        </a>
      </div>

      {/* Ticket Form Modal */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => !submitting && setShowTicketForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-card rounded-2xl p-6"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ticket Enviado!</h3>
                  <p className="text-muted-foreground mb-4">
                    Recebemos sua mensagem e responderemos em breve.
                  </p>
                  {ticketProtocol && (
                    <div className="bg-secondary rounded-xl p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Numero do protocolo:</p>
                      <p className="text-lg font-bold font-mono">{ticketProtocol}</p>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Voce recebera uma notificacao quando houver resposta.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Abrir Ticket de Suporte</h2>
                  
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select value={ticketCategory} onValueChange={setTicketCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {ticketCategories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="Resumo do seu problema"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Descreva em detalhes o que está acontecendo..."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Tempo medio de resposta: 24 horas</span>
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive" role="alert">
                        {submitError}
                      </p>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowTicketForm(false)}
                        disabled={submitting}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting || !ticketCategory || !ticketSubject || !ticketMessage}
                        className="flex-1"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Ticket
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Todas
        </button>
        {faqCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <cat.icon className="h-4 w-4" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma pergunta encontrada para sua busca.</p>
            <p className="text-sm mt-2">Tente outros termos ou abra um ticket de suporte.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-12 glass-card rounded-2xl p-6 text-center">
        <h3 className="font-semibold mb-2">Ainda precisa de ajuda?</h3>
        <p className="text-muted-foreground mb-4">
          Nossa equipe está disponível de segunda a sexta, das 9h às 18h.
        </p>
        <Button onClick={() => setShowTicketForm(true)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Falar com Suporte
        </Button>
      </div>
    </div>
  )
}
