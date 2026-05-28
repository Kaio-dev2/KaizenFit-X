"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { 
  Search,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  ChevronRight,
  Shirt,
  Dumbbell,
  Apple,
  Flame,
  Sparkles,
  Building2,
  Grid3X3,
  List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "Todos", icon: Grid3X3, count: 156 },
  { id: "roupas", name: "Roupas Fitness", icon: Shirt, count: 48 },
  { id: "acessorios", name: "Acessórios", icon: Dumbbell, count: 32 },
  { id: "suplementos", name: "Suplementos", icon: Apple, count: 45 },
  { id: "crossfit", name: "CrossFit", icon: Flame, count: 18 },
  { id: "wellness", name: "Wellness", icon: Sparkles, count: 13 },
]

const products = [
  {
    id: 1,
    name: "Camiseta Dry-Fit Premium",
    category: "roupas",
    price: 89.90,
    originalPrice: 129.90,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder-product.jpg",
    badge: "Mais Vendido",
    badgeColor: "primary",
  },
  {
    id: 2,
    name: "Whey Protein Isolado 900g",
    category: "suplementos",
    price: 189.90,
    originalPrice: null,
    rating: 4.9,
    reviews: 567,
    image: "/placeholder-product.jpg",
    badge: "Novo",
    badgeColor: "accent",
  },
  {
    id: 3,
    name: "Luvas de Academia Pro",
    category: "acessorios",
    price: 79.90,
    originalPrice: 99.90,
    rating: 4.7,
    reviews: 189,
    image: "/placeholder-product.jpg",
    badge: "-20%",
    badgeColor: "destructive",
  },
  {
    id: 4,
    name: "Short Compressão Masculino",
    category: "roupas",
    price: 119.90,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder-product.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: 5,
    name: "Creatina Monohidratada 300g",
    category: "suplementos",
    price: 89.90,
    originalPrice: 109.90,
    rating: 4.9,
    reviews: 823,
    image: "/placeholder-product.jpg",
    badge: "Top #1",
    badgeColor: "primary",
  },
  {
    id: 6,
    name: "Corda de Pular Speed Rope",
    category: "crossfit",
    price: 59.90,
    originalPrice: null,
    rating: 4.5,
    reviews: 98,
    image: "/placeholder-product.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: 7,
    name: "Garrafa Térmica 1L",
    category: "acessorios",
    price: 69.90,
    originalPrice: 89.90,
    rating: 4.8,
    reviews: 412,
    image: "/placeholder-product.jpg",
    badge: "-22%",
    badgeColor: "destructive",
  },
  {
    id: 8,
    name: "Legging Feminina High Waist",
    category: "roupas",
    price: 149.90,
    originalPrice: null,
    rating: 4.9,
    reviews: 678,
    image: "/placeholder-product.jpg",
    badge: "Bestseller",
    badgeColor: "primary",
  },
  {
    id: 9,
    name: "BCAA 2:1:1 Caps",
    category: "suplementos",
    price: 69.90,
    originalPrice: null,
    rating: 4.6,
    reviews: 234,
    image: "/placeholder-product.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: 10,
    name: "Kettlebell 12kg",
    category: "crossfit",
    price: 199.90,
    originalPrice: 249.90,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder-product.jpg",
    badge: "-20%",
    badgeColor: "destructive",
  },
  {
    id: 11,
    name: "Foam Roller Premium",
    category: "wellness",
    price: 89.90,
    originalPrice: null,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder-product.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: 12,
    name: "Top Esportivo Feminino",
    category: "roupas",
    price: 99.90,
    originalPrice: 129.90,
    rating: 4.7,
    reviews: 345,
    image: "/placeholder-product.jpg",
    badge: "-23%",
    badgeColor: "destructive",
  },
]

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [wishlist, setWishlist] = useState<number[]>([2, 5])
  const [cart, setCart] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart(prev => [...prev, productId])
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Loja Fitness</h1>
            <p className="text-muted-foreground mt-1">
              Encontre tudo para sua jornada fitness
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/loja/wishlist">
              <Button variant="outline" className="gap-2 relative">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favoritos</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/dashboard/loja/carrinho">
              <Button className="gap-2 neon-glow-green relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-0 h-12"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span className="font-medium">{category.name}</span>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                selectedCategory === category.id
                  ? "bg-primary-foreground/20"
                  : "bg-muted"
              )}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "grid gap-4",
            viewMode === "grid" 
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1"
          )}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Link href={`/dashboard/loja/produto/${product.id}`}>
                <div className={cn(
                  "glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all hover:border-primary/50",
                  viewMode === "list" && "flex"
                )}>
                  {/* Image */}
                  <div className={cn(
                    "relative bg-secondary/50",
                    viewMode === "grid" ? "aspect-square" : "w-32 sm:w-48 flex-shrink-0"
                  )}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-primary/50" />
                      </div>
                    </div>
                    {product.badge && (
                      <Badge 
                        className={cn(
                          "absolute top-3 left-3",
                          product.badgeColor === "primary" && "bg-primary",
                          product.badgeColor === "accent" && "bg-accent",
                          product.badgeColor === "destructive" && "bg-destructive"
                        )}
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(product.id)
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={cn(
                        "h-4 w-4",
                        wishlist.includes(product.id) && "fill-red-500 text-red-500"
                      )} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className={cn(
                    "p-4",
                    viewMode === "list" && "flex-1 flex flex-col justify-center"
                  )}>
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {viewMode === "list" && (
                      <Button 
                        onClick={(e) => {
                          e.preventDefault()
                          addToCart(product.id)
                        }}
                        className="mt-3 w-fit"
                        size="sm"
                      >
                        Adicionar
                      </Button>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente buscar por outros termos ou categorias
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
