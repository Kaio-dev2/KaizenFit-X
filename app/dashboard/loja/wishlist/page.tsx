"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft,
  Trash2,
  ShoppingCart,
  Heart,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"

const initialWishlist = [
  {
    id: 2,
    name: "Whey Protein Isolado 900g",
    category: "Suplementos",
    price: 189.90,
    originalPrice: null,
    rating: 4.9,
    inStock: true,
    badge: "Novo",
  },
  {
    id: 5,
    name: "Creatina Monohidratada 300g",
    category: "Suplementos",
    price: 89.90,
    originalPrice: 109.90,
    rating: 4.9,
    inStock: true,
    badge: "Top #1",
  },
  {
    id: 8,
    name: "Legging Feminina High Waist",
    category: "Roupas Fitness",
    price: 149.90,
    originalPrice: null,
    rating: 4.9,
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: 10,
    name: "Kettlebell 12kg",
    category: "CrossFit",
    price: 199.90,
    originalPrice: 249.90,
    rating: 4.7,
    inStock: false,
    badge: null,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  if (wishlist.length === 0) {
    return (
      <DashboardLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Sua lista está vazia</h2>
            <p className="text-muted-foreground mb-6">
              Salve seus produtos favoritos para comprar depois!
            </p>
            <Link href="/dashboard/loja">
              <Button className="neon-glow-green">Explorar Loja</Button>
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
            Voltar para Loja
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Lista de Desejos</h1>
          <p className="text-muted-foreground mt-1">
            {wishlist.length} {wishlist.length === 1 ? "item salvo" : "itens salvos"}
          </p>
        </motion.div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-primary/50" />
                  </div>
                </div>
                {item.badge && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    {item.badge}
                  </Badge>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">Esgotado</span>
                  </div>
                )}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <h3 className="font-semibold mt-1 line-clamp-2">{item.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-primary">
                    R$ {item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button 
                  className="w-full mt-4 gap-2" 
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {item.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
