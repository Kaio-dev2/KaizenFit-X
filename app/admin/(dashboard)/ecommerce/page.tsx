"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  CreditCard,
  Package,
  Settings,
  Search,
  Check,
  X,
  ExternalLink,
  RefreshCw,
  Eye,
  ChevronDown,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Tab = "yampi" | "shopify" | "dropi" | "pagamentos" | "pedidos"

// Mock data
const mockOrders = [
  { id: "ORD-001", customer: "Joao Silva", total: 299.90, status: "paid", date: "2024-03-15" },
  { id: "ORD-002", customer: "Maria Santos", total: 149.50, status: "shipped", date: "2024-03-14" },
  { id: "ORD-003", customer: "Pedro Costa", total: 450.00, status: "pending", date: "2024-03-14" },
  { id: "ORD-004", customer: "Ana Oliveira", total: 89.90, status: "delivered", date: "2024-03-13" },
]

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500",
  paid: "bg-blue-500/20 text-blue-500",
  processing: "bg-purple-500/20 text-purple-500",
  shipped: "bg-orange-500/20 text-orange-500",
  delivered: "bg-green-500/20 text-green-500",
  cancelled: "bg-red-500/20 text-red-500",
}

export default function EcommercePage() {
  const [activeTab, setActiveTab] = useState<Tab>("pedidos")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  // Integration states
  const [yampiConnected, setYampiConnected] = useState(false)
  const [shopifyConnected, setShopifyConnected] = useState(false)
  const [dropiConnected, setDropiConnected] = useState(false)
  const [stripeConnected, setStripeConnected] = useState(false)
  const [mercadoPagoConnected, setMercadoPagoConnected] = useState(false)
  
  // Form states
  const [yampiToken, setYampiToken] = useState("")
  const [yampiAlias, setYampiAlias] = useState("")
  const [shopifyName, setShopifyName] = useState("")
  const [shopifyApiKey, setShopifyApiKey] = useState("")
  const [shopifyAccessToken, setShopifyAccessToken] = useState("")
  const [dropiApiKey, setDropiApiKey] = useState("")
  const [stripeSecretKey, setStripeSecretKey] = useState("")
  const [stripePublishableKey, setStripePublishableKey] = useState("")
  const [mercadoPagoAccessToken, setMercadoPagoAccessToken] = useState("")
  
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: "pedidos" as Tab, name: "Pedidos", icon: Package },
    { id: "yampi" as Tab, name: "Yampi", icon: ShoppingBag },
    { id: "shopify" as Tab, name: "Shopify", icon: ShoppingBag },
    { id: "dropi" as Tab, name: "Dropi", icon: ShoppingBag },
    { id: "pagamentos" as Tab, name: "Pagamentos", icon: CreditCard },
  ]

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simular salvamento
    await new Promise(r => setTimeout(r, 1000))
    setIsSaving(false)
  }

  const handleConnect = async (integration: string) => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    
    switch (integration) {
      case "yampi":
        setYampiConnected(true)
        break
      case "shopify":
        setShopifyConnected(true)
        break
      case "dropi":
        setDropiConnected(true)
        break
      case "stripe":
        setStripeConnected(true)
        break
      case "mercadopago":
        setMercadoPagoConnected(true)
        break
    }
    
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">E-commerce</h1>
        <p className="text-muted-foreground">
          Gerencie integracoes, pedidos e pagamentos
        </p>
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
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Pedidos Tab */}
        {activeTab === "pedidos" && (
          <>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pedido ou cliente..."
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
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Pedido</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cliente</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-0">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">R$ {order.total.toFixed(2)}</td>
                        <td className="p-4">
                          <Badge className={statusColors[order.status]}>
                            {statusLabels[order.status]}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select defaultValue={order.status}>
                              <SelectTrigger className="w-[130px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="paid">Pago</SelectItem>
                                <SelectItem value="processing">Processando</SelectItem>
                                <SelectItem value="shipped">Enviado</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Yampi Tab */}
        {activeTab === "yampi" && (
          <div className="glass-card rounded-xl p-6 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Yampi</h2>
                  <p className="text-sm text-muted-foreground">Integracao com loja Yampi</p>
                </div>
              </div>
              {yampiConnected ? (
                <Badge className="bg-green-500/20 text-green-500">
                  <Check className="h-3 w-3 mr-1" />
                  Conectado
                </Badge>
              ) : (
                <Badge variant="secondary">
                  Desconectado
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yampi-token">API Token</Label>
                <Input
                  id="yampi-token"
                  type="password"
                  placeholder="Seu token da API Yampi"
                  value={yampiToken}
                  onChange={(e) => setYampiToken(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yampi-alias">Alias da Loja</Label>
                <Input
                  id="yampi-alias"
                  placeholder="nome-da-sua-loja"
                  value={yampiAlias}
                  onChange={(e) => setYampiAlias(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleConnect("yampi")}
                  disabled={isSaving || !yampiToken || !yampiAlias}
                >
                  {isSaving ? "Conectando..." : yampiConnected ? "Reconectar" : "Conectar"}
                </Button>
                {yampiConnected && (
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar Produtos
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Shopify Tab */}
        {activeTab === "shopify" && (
          <div className="glass-card rounded-xl p-6 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Shopify</h2>
                  <p className="text-sm text-muted-foreground">Integracao com loja Shopify</p>
                </div>
              </div>
              {shopifyConnected ? (
                <Badge className="bg-green-500/20 text-green-500">
                  <Check className="h-3 w-3 mr-1" />
                  Conectado
                </Badge>
              ) : (
                <Badge variant="secondary">
                  Desconectado
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopify-name">Nome da Loja</Label>
                <Input
                  id="shopify-name"
                  placeholder="sua-loja.myshopify.com"
                  value={shopifyName}
                  onChange={(e) => setShopifyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopify-api-key">API Key</Label>
                <Input
                  id="shopify-api-key"
                  type="password"
                  placeholder="Sua API Key"
                  value={shopifyApiKey}
                  onChange={(e) => setShopifyApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopify-access-token">Admin API Access Token</Label>
                <Input
                  id="shopify-access-token"
                  type="password"
                  placeholder="shpat_xxxxxx"
                  value={shopifyAccessToken}
                  onChange={(e) => setShopifyAccessToken(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => handleConnect("shopify")}
                disabled={isSaving || !shopifyName || !shopifyApiKey || !shopifyAccessToken}
              >
                {isSaving ? "Conectando..." : shopifyConnected ? "Reconectar" : "Conectar"}
              </Button>
            </div>
          </div>
        )}

        {/* Dropi Tab */}
        {activeTab === "dropi" && (
          <div className="glass-card rounded-xl p-6 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Dropi</h2>
                  <p className="text-sm text-muted-foreground">Integracao com Dropi dropshipping</p>
                </div>
              </div>
              {dropiConnected ? (
                <Badge className="bg-green-500/20 text-green-500">
                  <Check className="h-3 w-3 mr-1" />
                  Conectado
                </Badge>
              ) : (
                <Badge variant="secondary">
                  Desconectado
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dropi-api-key">API Key</Label>
                <Input
                  id="dropi-api-key"
                  type="password"
                  placeholder="Sua API Key do Dropi"
                  value={dropiApiKey}
                  onChange={(e) => setDropiApiKey(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleConnect("dropi")}
                  disabled={isSaving || !dropiApiKey}
                >
                  {isSaving ? "Conectando..." : dropiConnected ? "Reconectar" : "Conectar"}
                </Button>
                {dropiConnected && (
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Importar Produtos
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pagamentos Tab */}
        {activeTab === "pagamentos" && (
          <div className="space-y-6 max-w-2xl">
            {/* Stripe */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Stripe</h2>
                    <p className="text-sm text-muted-foreground">Pagamentos internacionais</p>
                  </div>
                </div>
                {stripeConnected ? (
                  <Badge className="bg-green-500/20 text-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Conectado
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Desconectado
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    placeholder="sk_live_xxxxxx"
                    value={stripeSecretKey}
                    onChange={(e) => setStripeSecretKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable">Publishable Key</Label>
                  <Input
                    id="stripe-publishable"
                    type="password"
                    placeholder="pk_live_xxxxxx"
                    value={stripePublishableKey}
                    onChange={(e) => setStripePublishableKey(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleConnect("stripe")}
                  disabled={isSaving || !stripeSecretKey || !stripePublishableKey}
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>

            {/* Mercado Pago */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-sky-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Mercado Pago</h2>
                    <p className="text-sm text-muted-foreground">Pagamentos no Brasil</p>
                  </div>
                </div>
                {mercadoPagoConnected ? (
                  <Badge className="bg-green-500/20 text-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Conectado
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Desconectado
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mp-access-token">Access Token</Label>
                  <Input
                    id="mp-access-token"
                    type="password"
                    placeholder="APP_USR-xxxxxx"
                    value={mercadoPagoAccessToken}
                    onChange={(e) => setMercadoPagoAccessToken(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleConnect("mercadopago")}
                  disabled={isSaving || !mercadoPagoAccessToken}
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
