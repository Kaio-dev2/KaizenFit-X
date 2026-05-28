"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCcw,
  Share2,
  ChevronRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const product = {
  id: 1,
  name: "Camiseta Dry-Fit Premium",
  category: "Roupas Fitness",
  price: 89.90,
  originalPrice: 129.90,
  rating: 4.8,
  reviews: 234,
  description: "Camiseta de alta performance com tecnologia Dry-Fit que mantém você seco e confortável durante os treinos mais intensos. Tecido leve e respirável com proteção UV.",
  features: [
    "Tecnologia Dry-Fit de absorção de suor",
    "Proteção UV 50+",
    "Tecido antibacteriano",
    "Costuras planas anti-atrito",
    "Corte ergonômico para máxima liberdade"
  ],
  sizes: ["P", "M", "G", "GG", "XG"],
  colors: [
    { name: "Preto", value: "#000000" },
    { name: "Cinza", value: "#6B7280" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Verde", value: "#10B981" },
  ],
  images: [1, 2, 3, 4],
  inStock: true,
  badge: "Mais Vendido",
}

const reviews = [
  {
    id: 1,
    user: "Marina S.",
    rating: 5,
    date: "15/01/2024",
    comment: "Excelente qualidade! O tecido é muito confortável e realmente seca rápido. Super recomendo!",
    verified: true,
  },
  {
    id: 2,
    user: "Pedro O.",
    rating: 5,
    date: "12/01/2024",
    comment: "Comprei duas de cores diferentes. Perfeitas para treino pesado, não fica pesada de suor.",
    verified: true,
  },
  {
    id: 3,
    user: "Ana C.",
    rating: 4,
    date: "10/01/2024",
    comment: "Muito boa, só achei que podia ser um pouco mais longa. Mas a qualidade é top!",
    verified: true,
  },
]

const relatedProducts = [
  { id: 2, name: "Short Compressão", price: 119.90, rating: 4.6 },
  { id: 3, name: "Meias Performance", price: 39.90, rating: 4.7 },
  { id: 4, name: "Boné Esportivo", price: 59.90, rating: 4.5 },
  { id: 5, name: "Munhequeira Pro", price: 29.90, rating: 4.8 },
]

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/dashboard/loja" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Loja
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{product.category}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-2xl aspect-square relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-primary/50" />
                </div>
              </div>
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive">
                  -{discount}%
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "w-20 h-20 rounded-xl bg-secondary/50 flex items-center justify-center transition-all",
                    selectedImage === index 
                      ? "ring-2 ring-primary" 
                      : "hover:ring-2 hover:ring-border"
                  )}
                >
                  <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-primary font-medium">{product.category}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted"
                      )}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} avaliações
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Cor</span>
                <span className="text-sm text-muted-foreground">{selectedColor.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full transition-all",
                      selectedColor.value === color.value
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background"
                    )}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tamanho</span>
                <button className="text-sm text-primary hover:underline">
                  Guia de tamanhos
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 rounded-xl font-medium transition-all",
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="font-medium">Quantidade</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Em estoque
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 h-14 text-lg gap-2 neon-glow-green">
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={cn(
                  "h-5 w-5",
                  isWishlisted && "fill-red-500 text-red-500"
                )} />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs mt-2">Frete Grátis</p>
                <p className="text-xs text-muted-foreground">acima de R$ 199</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs mt-2">Compra Segura</p>
                <p className="text-xs text-muted-foreground">100% protegida</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs mt-2">Troca Fácil</p>
                <p className="text-xs text-muted-foreground">em até 30 dias</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="features" className="rounded-lg">Características</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">Avaliações ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4">Características do Produto</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.user}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">Compra Verificada</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-semibold text-lg mb-4">Produtos Relacionados</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/dashboard/loja/produto/${item.id}`}>
                <div className="glass-card rounded-2xl p-4 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="aspect-square bg-secondary/50 rounded-xl mb-3 flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs">{item.rating}</span>
                  </div>
                  <p className="text-primary font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
