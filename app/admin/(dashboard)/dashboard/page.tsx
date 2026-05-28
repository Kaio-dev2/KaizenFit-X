"use client"

import { motion } from "framer-motion"
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  {
    name: "Total de Usuários",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500/20 text-blue-500"
  },
  {
    name: "Pedidos Hoje",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "bg-green-500/20 text-green-500"
  },
  {
    name: "Receita Mensal",
    value: "R$ 85.420",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "bg-primary/20 text-primary"
  },
  {
    name: "Taxa de Conversão",
    value: "3.24%",
    change: "-0.4%",
    trend: "down",
    icon: Activity,
    color: "bg-orange-500/20 text-orange-500"
  },
]

const recentOrders = [
  { id: "#12847", customer: "João Silva", product: "Whey Protein 1kg", value: "R$ 189,90", status: "Pago", time: "2 min" },
  { id: "#12846", customer: "Maria Santos", product: "Creatina 300g", value: "R$ 79,90", status: "Enviado", time: "15 min" },
  { id: "#12845", customer: "Pedro Costa", product: "BCAA 120 caps", value: "R$ 59,90", status: "Processando", time: "32 min" },
  { id: "#12844", customer: "Ana Oliveira", product: "Pré-treino 300g", value: "R$ 99,90", status: "Pago", time: "1h" },
  { id: "#12843", customer: "Carlos Lima", product: "Glutamina 300g", value: "R$ 69,90", status: "Entregue", time: "2h" },
]

const recentUsers = [
  { name: "Lucas Mendes", email: "lucas@email.com", plan: "Premium", joined: "Hoje" },
  { name: "Fernanda Reis", email: "fer@email.com", plan: "Free", joined: "Hoje" },
  { name: "Ricardo Souza", email: "ricardo@email.com", plan: "Premium", joined: "Ontem" },
  { name: "Juliana Alves", email: "ju@email.com", plan: "Free", joined: "Ontem" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pago": return "bg-green-500/20 text-green-500"
    case "Enviado": return "bg-blue-500/20 text-blue-500"
    case "Processando": return "bg-yellow-500/20 text-yellow-500"
    case "Entregue": return "bg-primary/20 text-primary"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema e métricas principais
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
            <Button variant="outline" size="sm">
              Ver todos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">Produto</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Valor</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Ação</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-2 font-medium">{order.id}</td>
                    <td className="py-3 px-2">{order.customer}</td>
                    <td className="py-3 px-2 hidden md:table-cell text-muted-foreground">{order.product}</td>
                    <td className="py-3 px-2 font-medium">{order.value}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Novos Usuários</h2>
            <Button variant="outline" size="sm">
              Ver todos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <motion.div
                key={user.email}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    user.plan === "Premium" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {user.plan}
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">{user.joined}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-primary">98.5%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold">234ms</div>
          <div className="text-sm text-muted-foreground">Tempo médio de resposta</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold">47</div>
          <div className="text-sm text-muted-foreground">Tickets pendentes</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-green-500">+892</div>
          <div className="text-sm text-muted-foreground">Usuários ativos hoje</div>
        </div>
      </div>
    </div>
  )
}
