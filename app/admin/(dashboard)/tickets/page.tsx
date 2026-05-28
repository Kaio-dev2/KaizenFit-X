"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Calendar,
  ChevronRight,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const mockTickets = [
  { 
    id: "1", 
    protocol: "KZF-ABC123", 
    name: "Joao Silva", 
    email: "joao@email.com",
    category: "Problema tecnico", 
    description: "Nao consigo fazer login na minha conta. Ja tentei redefinir a senha mas continua dando erro.",
    status: "open", 
    createdAt: "2024-03-15T10:30:00" 
  },
  { 
    id: "2", 
    protocol: "KZF-DEF456", 
    name: "Maria Santos", 
    email: "maria@email.com",
    category: "Pagamento e cobranca", 
    description: "Fui cobrado duas vezes no mesmo mes. Gostaria de solicitar reembolso.",
    status: "in_progress", 
    createdAt: "2024-03-14T14:20:00" 
  },
  { 
    id: "3", 
    protocol: "KZF-GHI789", 
    name: "Pedro Costa", 
    email: "pedro@email.com",
    category: "Sugestao de melhoria", 
    description: "Seria interessante ter um modo escuro na aplicacao para usar durante a noite.",
    status: "resolved", 
    createdAt: "2024-03-13T09:15:00" 
  },
  { 
    id: "4", 
    protocol: "KZF-JKL012", 
    name: "Ana Oliveira", 
    email: "ana@email.com",
    category: "Pedidos da loja", 
    description: "Meu pedido esta em atraso ha 10 dias. Numero do pedido: ORD-001.",
    status: "open", 
    createdAt: "2024-03-12T16:45:00" 
  },
]

const statusLabels: Record<string, string> = {
  open: "Aberto",
  in_progress: "Em Andamento",
  resolved: "Resolvido",
  closed: "Fechado",
}

const statusColors: Record<string, string> = {
  open: "bg-yellow-500/20 text-yellow-500",
  in_progress: "bg-blue-500/20 text-blue-500",
  resolved: "bg-green-500/20 text-green-500",
  closed: "bg-gray-500/20 text-gray-500",
}

const statusIcons: Record<string, React.ReactNode> = {
  open: <AlertCircle className="h-4 w-4" />,
  in_progress: <Clock className="h-4 w-4" />,
  resolved: <CheckCircle className="h-4 w-4" />,
  closed: <XCircle className="h-4 w-4" />,
}

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null)
  const [response, setResponse] = useState("")
  const [isSending, setIsSending] = useState(false)

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = searchQuery === "" ||
      ticket.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    open: mockTickets.filter(t => t.status === "open").length,
    in_progress: mockTickets.filter(t => t.status === "in_progress").length,
    resolved: mockTickets.filter(t => t.status === "resolved").length,
  }

  const handleSendResponse = async () => {
    setIsSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsSending(false)
    setResponse("")
    setSelectedTicket(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tickets de Suporte</h1>
        <p className="text-muted-foreground">
          Gerencie os tickets de suporte dos usuarios
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Abertos</p>
              <p className="text-2xl font-bold">{stats.open}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold">{stats.in_progress}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolvidos</p>
              <p className="text-2xl font-bold">{stats.resolved}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por protocolo, nome ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="open">Abertos</SelectItem>
            <SelectItem value="in_progress">Em Andamento</SelectItem>
            <SelectItem value="resolved">Resolvidos</SelectItem>
            <SelectItem value="closed">Fechados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Nenhum ticket encontrado</p>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-muted-foreground">{ticket.protocol}</span>
                      <Badge className={statusColors[ticket.status]}>
                        {statusIcons[ticket.status]}
                        <span className="ml-1">{statusLabels[ticket.status]}</span>
                      </Badge>
                    </div>
                    <h3 className="font-semibold">{ticket.name}</h3>
                    <p className="text-sm text-muted-foreground">{ticket.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{selectedTicket.protocol}</span>
                  <Badge className={statusColors[selectedTicket.status]}>
                    {statusLabels[selectedTicket.status]}
                  </Badge>
                </div>
                <DialogTitle>{selectedTicket.category}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* User Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-medium">{selectedTicket.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedTicket.email}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Descricao</p>
                  <p>{selectedTicket.description}</p>
                </div>

                {/* Change Status */}
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">Alterar status:</p>
                  <Select defaultValue={selectedTicket.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Aberto</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="resolved">Resolvido</SelectItem>
                      <SelectItem value="closed">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Response */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Responder ao usuario:</p>
                  <Textarea
                    placeholder="Digite sua resposta..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                  Fechar
                </Button>
                <Button onClick={handleSendResponse} disabled={isSending || !response}>
                  {isSending ? "Enviando..." : "Enviar Resposta"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
