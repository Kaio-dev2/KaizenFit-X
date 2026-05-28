"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Tag,
  Truck,
  ChevronRight,
  CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Separator } from "@/components/ui/separator"

const initialCartItems = [
  {
    id: 1,
    name: "Camiseta Dry-Fit Premium",
    size: "M",
    color: "Preto",
    price: 89.90,
    quantity: 2,
  },
  {
    id: 2,
    name: "Whey Protein Isolado 900g",
    size: null,
    color: "Chocolate",
    price: 189.90,
    quantity: 1,
  },
  {
    id: 3,
    name: "Luvas de Academia Pro",
    size: "G",
    color: "Preto",
    price: 79.90,
    quantity: 1,
  },
]

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * 0.1 : 0
  const shipping = subtotal >= 199 ? 0 : 19.90
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "KAIZEN10") {
      setAppliedCoupon("KAIZEN10")
      setCouponCode("")
    }
  }

  if (cartItems.length === 0) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">
              Explore nossa loja e encontre os melhores produtos fitness!
            </p>
            <Link href="/dashboard/loja">
              <Button className="neon-glow-green">Ir às Compras</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/dashboard/loja" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Continuar Comprando
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Carrinho</h1>
          <p className="text-muted-foreground mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "itens"} no carrinho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card rounded-2xl p-4 flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.color}
                        {item.size && ` • Tamanho ${item.size}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Coupon */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Cupom de Desconto
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <span className="font-medium text-primary">{appliedCoupon}</span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-sm text-muted-foreground hover:text-destructive"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-secondary border-0"
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Aplicar
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Experimente: KAIZEN10
              </p>
            </div>

            {/* Summary Card */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold">Resumo do Pedido</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-sm text-primary">
                    <span>Desconto (10%)</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Frete
                  </span>
                  <span className={shipping === 0 ? "text-primary" : ""}>
                    {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Frete grátis em compras acima de R$ 199
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <Link href="/dashboard/loja/checkout" className="block">
                <Button className="w-full h-14 text-lg gap-2 neon-glow-green">
                  <CreditCard className="h-5 w-5" />
                  Finalizar Compra
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Entrega estimada: 3-7 dias úteis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
