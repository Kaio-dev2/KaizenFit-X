"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  Shield,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const users = [
  { id: "1", name: "João Silva", email: "joao@email.com", role: "user", status: "active", xp: 5420, level: 8, joined: "2024-01-15", lastActive: "Hoje" },
  { id: "2", name: "Maria Santos", email: "maria@email.com", role: "user", status: "active", xp: 12340, level: 15, joined: "2023-12-01", lastActive: "Hoje" },
  { id: "3", name: "Pedro Costa", email: "pedro@email.com", role: "moderator", status: "active", xp: 8900, level: 12, joined: "2023-11-20", lastActive: "Ontem" },
  { id: "4", name: "Ana Oliveira", email: "ana@email.com", role: "user", status: "banned", xp: 3200, level: 5, joined: "2024-02-01", lastActive: "1 semana" },
  { id: "5", name: "Carlos Lima", email: "carlos@email.com", role: "admin", status: "active", xp: 25000, level: 25, joined: "2023-06-15", lastActive: "Hoje" },
  { id: "6", name: "Fernanda Reis", email: "fernanda@email.com", role: "user", status: "active", xp: 1500, level: 3, joined: "2024-03-01", lastActive: "3 dias" },
  { id: "7", name: "Lucas Mendes", email: "lucas@email.com", role: "user", status: "inactive", xp: 450, level: 1, joined: "2024-02-20", lastActive: "2 semanas" },
  { id: "8", name: "Juliana Alves", email: "juliana@email.com", role: "support", status: "active", xp: 7800, level: 10, joined: "2023-09-10", lastActive: "Hoje" },
]

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin": return "bg-destructive/20 text-destructive"
    case "moderator": return "bg-blue-500/20 text-blue-500"
    case "support": return "bg-orange-500/20 text-orange-500"
    default: return "bg-muted text-muted-foreground"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-500/20 text-green-500"
    case "inactive": return "bg-yellow-500/20 text-yellow-500"
    case "banned": return "bg-destructive/20 text-destructive"
    default: return "bg-muted text-muted-foreground"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active": return "Ativo"
    case "inactive": return "Inativo"
    case "banned": return "Banido"
    default: return status
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case "admin": return "Admin"
    case "moderator": return "Moderador"
    case "support": return "Suporte"
    case "user": return "Usuário"
    default: return role
  }
}

export default function AdminUsuariosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie todos os usuários do sistema
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">12,847</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">11,423</div>
              <div className="text-sm text-muted-foreground">Ativos</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <UserX className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Inativos</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Ban className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="text-2xl font-bold">190</div>
              <div className="text-sm text-muted-foreground">Banidos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas funções</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="moderator">Moderador</SelectItem>
                <SelectItem value="support">Suporte</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="banned">Banido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Usuário</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">Função</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden lg:table-cell">Nível / XP</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden xl:table-cell">Última atividade</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                        {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    <div>
                      <span className="font-medium">Nível {user.level}</span>
                      <span className="text-muted-foreground text-sm ml-2">({user.xp.toLocaleString()} XP)</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden xl:table-cell text-muted-foreground">
                    {user.lastActive}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Alterar função
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Banir usuário
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuários
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-3">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
