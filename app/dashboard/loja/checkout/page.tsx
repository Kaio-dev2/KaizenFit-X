"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Lock,
  ChevronRight,
  Check,
  Building2,
  Smartphone,
  QrCode,
  Receipt
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const orderItems = [
  { id: 1, name: "Camiseta Dry-Fit Premium", size: "M", price: 89.90, quantity: 2 },
  { id: 2, name: "Whey Protein Isolado 900g", size: null, price: 189.90, quantity: 1 },
  { id: 3, name: "Luvas de Academia Pro", size: "G", price: 79.90, quantity: 1 },
]

const paymentMethods = [
  { id: "credit", name: "Cartão de Crédito", icon: CreditCard, description: "Parcele em até 12x" },
  { id: "pix", name: "PIX", icon: QrCode, description: "5% de desconto" },
  { id: "boleto", name: "Boleto", icon: Receipt, description: "Vencimento em 3 dias" },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [formData, setFormData] = useState({
    // Address
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    // Payment
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = paymentMethod === "pix" ? subtotal * 0.05 : 0
  const shipping = subtotal >= 199 ? 0 : 19.90
  const total = subtotal - discount + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/dashboard/loja/carrinho" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Carrinho
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          {[
            { num: 1, label: "Endereço" },
            { num: 2, label: "Pagamento" },
            { num: 3, label: "Confirmação" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
                step >= s.num 
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}>
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span className={cn(
                "hidden sm:block text-sm",
                step >= s.num ? "text-foreground" : "text-muted-foreground"
              )}>
                {s.label}
              </span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {step === 1 && (
              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Endereço de Entrega</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      name="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-3">
                    <Label htmlFor="street">Rua</Label>
                    <Input
                      id="street"
                      name="street"
                      placeholder="Nome da rua"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="123"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      name="complement"
                      placeholder="Apto, bloco, etc."
                      value={formData.complement}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      placeholder="Bairro"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Cidade"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="SP"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-secondary border-0 mt-1"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full h-12 neon-glow-green"
                >
                  Continuar para Pagamento
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Forma de Pagamento</h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="cursor-pointer font-medium">
                          {method.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      {method.id === "pix" && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                          -5%
                        </span>
                      )}
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-secondary border-0 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="Como está no cartão"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="bg-secondary border-0 mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Validade</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="bg-secondary border-0 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          className="bg-secondary border-0 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                    <QrCode className="h-32 w-32 mx-auto text-primary mb-3" />
                    <p className="text-sm text-muted-foreground">
                      O QR Code será gerado após a confirmação
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 h-12 neon-glow-green">
                    Revisar Pedido
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Confirmar Pedido</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4" />
                      Entregar em
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.street}, {formData.number} {formData.complement && `- ${formData.complement}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.neighborhood}, {formData.city} - {formData.state}
                    </p>
                    <p className="text-sm text-muted-foreground">CEP: {formData.cep}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4" />
                      Pagamento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethods.find(m => m.id === paymentMethod)?.name}
                      {paymentMethod === "credit" && formData.cardNumber && ` •••• ${formData.cardNumber.slice(-4)}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                    Voltar
                  </Button>
                  <Link href="/dashboard/loja/pedidos" className="flex-1">
                    <Button className="w-full h-12 neon-glow-green gap-2">
                      <Lock className="h-4 w-4" />
                      Finalizar Compra
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento seguro e criptografado</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6 space-y-4 sticky top-24">
              <h3 className="font-semibold">Resumo do Pedido</h3>

              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm text-primary">
                    <span>Desconto PIX</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className={shipping === 0 ? "text-primary" : ""}>
                    {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
