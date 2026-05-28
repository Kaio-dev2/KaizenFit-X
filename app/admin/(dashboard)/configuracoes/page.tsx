"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Globe,
  Mail,
  Bell,
  Shield,
  Database,
  Palette,
  Save,
  AlertTriangle,
  Check,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ConfiguracoesPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Configuracoes gerais
  const [platformName, setPlatformName] = useState("KaizenFit")
  const [platformDescription, setPlatformDescription] = useState("Sua plataforma fitness completa")
  const [supportEmail, setSupportEmail] = useState("suporte@kaizenfit.com")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  
  // Feature flags
  const [featureLoja, setFeatureLoja] = useState(true)
  const [featureComunidade, setFeatureComunidade] = useState(true)
  const [featureIA, setFeatureIA] = useState(true)
  const [featureRanking, setFeatureRanking] = useState(true)
  const [featureChat, setFeatureChat] = useState(true)
  
  // Email settings
  const [emailFromName, setEmailFromName] = useState("KaizenFit")
  const [emailFromAddress, setEmailFromAddress] = useState("noreply@kaizenfit.com")
  
  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)
    
    // Simular salvamento
    await new Promise(r => setTimeout(r, 1500))
    
    setIsSaving(false)
    setSaved(true)
    
    setTimeout(() => setSaved(false), 3000)
  }

  const sections = [
    {
      title: "Configuracoes Gerais",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Nome da Plataforma</Label>
            <Input
              id="platform-name"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform-description">Descricao</Label>
            <Textarea
              id="platform-description"
              value={platformDescription}
              onChange={(e) => setPlatformDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Email de Suporte</Label>
            <Input
              id="support-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Modo Manutencao",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ativar Modo Manutencao</Label>
              <p className="text-sm text-muted-foreground">
                Quando ativado, apenas administradores podem acessar o site
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
          {maintenanceMode && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-500">Atencao!</p>
                <p className="text-muted-foreground">
                  O modo manutencao esta ativo. Usuarios comuns nao conseguem acessar a plataforma.
                </p>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Modulos da Plataforma",
      icon: ToggleRight,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ative ou desative modulos da plataforma conforme necessario
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3V3z"/>
                    <path d="M12 8v8M8 12h8"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Loja</p>
                  <p className="text-sm text-muted-foreground">E-commerce de produtos</p>
                </div>
              </div>
              <Switch checked={featureLoja} onCheckedChange={setFeatureLoja} />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Comunidade</p>
                  <p className="text-sm text-muted-foreground">Posts e grupos</p>
                </div>
              </div>
              <Switch checked={featureComunidade} onCheckedChange={setFeatureComunidade} />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">IA Coach</p>
                  <p className="text-sm text-muted-foreground">Assistente de inteligencia artificial</p>
                </div>
              </div>
              <Switch checked={featureIA} onCheckedChange={setFeatureIA} />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Ranking</p>
                  <p className="text-sm text-muted-foreground">Classificacao de usuarios</p>
                </div>
              </div>
              <Switch checked={featureRanking} onCheckedChange={setFeatureRanking} />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Chat</p>
                  <p className="text-sm text-muted-foreground">Mensagens em tempo real</p>
                </div>
              </div>
              <Switch checked={featureChat} onCheckedChange={setFeatureChat} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Configuracoes de Email",
      icon: Mail,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-from-name">Nome do Remetente</Label>
            <Input
              id="email-from-name"
              value={emailFromName}
              onChange={(e) => setEmailFromName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-from-address">Email do Remetente</Label>
            <Input
              id="email-from-address"
              type="email"
              value={emailFromAddress}
              onChange={(e) => setEmailFromAddress(e.target.value)}
            />
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">
              <strong>Dica:</strong> Configure as variaveis de ambiente RESEND_API_KEY e SUPPORT_EMAIL 
              para habilitar o envio de emails reais.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configuracoes</h1>
          <p className="text-muted-foreground">
            Gerencie as configuracoes da plataforma
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
              Salvando...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alteracoes
            </>
          )}
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <section.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>

      {/* Database Info */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <Database className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Informacoes do Sistema</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">Versao</p>
            <p className="font-semibold">KaizenFit v1.0.0</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">Ambiente</p>
            <p className="font-semibold">Producao</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">Banco de Dados</p>
            <p className="font-semibold">PostgreSQL (Neon)</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground">Framework</p>
            <p className="font-semibold">Next.js 16</p>
          </div>
        </div>
      </div>
    </div>
  )
}
