"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Camera,
  Loader2,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@/components/user-provider"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const tabs = [
  { id: "perfil", name: "Perfil", icon: User },
  { id: "notificacoes", name: "Notificações", icon: Bell },
  { id: "seguranca", name: "Segurança", icon: Shield },
  { id: "aparencia", name: "Aparência", icon: Palette },
]

export default function ConfiguracoesPage() {
  const { user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("perfil")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Profile state
  const [name, setName] = useState(user.name || "")
  const [bio, setBio] = useState("")
  const [gender, setGender] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [targetWeight, setTargetWeight] = useState("")
  const [goal, setGoal] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  
  // Notification state
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [workoutReminders, setWorkoutReminders] = useState(true)
  const [mealReminders, setMealReminders] = useState(true)
  const [communityUpdates, setCommunityUpdates] = useState(true)
  const [promotionalEmails, setPromotionalEmails] = useState(false)
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // Appearance state
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("pt-BR")

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
    setSaving(true)
    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert("Erro ao alterar senha. Verifique a senha atual.")
    }
    setSaving(false)
  }

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos."
    )
    if (confirmed) {
      await authClient.deleteUser()
      router.push("/")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e informações da conta
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            {/* Profile Tab */}
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Informações do Perfil</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center hover:bg-muted transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Conte um pouco sobre você..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gênero</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="birthDate">Data de nascimento</Label>
                      <Input 
                        id="birthDate" 
                        type="date"
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input 
                        id="height" 
                        type="number"
                        value={height} 
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="175"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="weight">Peso atual (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number"
                        value={weight} 
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="70"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="targetWeight">Peso meta (kg)</Label>
                      <Input 
                        id="targetWeight" 
                        type="number"
                        value={targetWeight} 
                        onChange={(e) => setTargetWeight(e.target.value)}
                        placeholder="65"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal">Objetivo</Label>
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose_weight">Perder peso</SelectItem>
                          <SelectItem value="gain_muscle">Ganhar massa</SelectItem>
                          <SelectItem value="maintain">Manter peso</SelectItem>
                          <SelectItem value="improve_health">Melhorar saúde</SelectItem>
                          <SelectItem value="gain_strength">Ganhar força</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="activityLevel">Nível de atividade</Label>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentário</SelectItem>
                          <SelectItem value="light">Leve (1-2x/semana)</SelectItem>
                          <SelectItem value="moderate">Moderado (3-4x/semana)</SelectItem>
                          <SelectItem value="active">Ativo (5-6x/semana)</SelectItem>
                          <SelectItem value="very_active">Muito ativo (todos os dias)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
                      Salvar alterações
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notificacoes" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Notificações</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Notificações push</p>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas no navegador
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Notificações por email</p>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações por email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Lembretes de treino</p>
                      <p className="text-sm text-muted-foreground">
                        Lembre-se de treinar nos horários programados
                      </p>
                    </div>
                    <Switch 
                      checked={workoutReminders} 
                      onCheckedChange={setWorkoutReminders} 
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Lembretes de refeição</p>
                      <p className="text-sm text-muted-foreground">
                        Lembre-se de registrar suas refeições
                      </p>
                    </div>
                    <Switch 
                      checked={mealReminders} 
                      onCheckedChange={setMealReminders} 
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Atualizações da comunidade</p>
                      <p className="text-sm text-muted-foreground">
                        Novos seguidores, curtidas e comentários
                      </p>
                    </div>
                    <Switch 
                      checked={communityUpdates} 
                      onCheckedChange={setCommunityUpdates} 
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Emails promocionais</p>
                      <p className="text-sm text-muted-foreground">
                        Ofertas e novidades da loja
                      </p>
                    </div>
                    <Switch 
                      checked={promotionalEmails} 
                      onCheckedChange={setPromotionalEmails} 
                    />
                  </div>
                </div>

                <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
                      Salvar preferências
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "seguranca" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Segurança</h2>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Alterar senha</h3>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Senha atual</Label>
                      <Input 
                        id="currentPassword" 
                        type="password"
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">Nova senha</Label>
                      <Input 
                        id="newPassword" 
                        type="password"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite a nova senha"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme a nova senha"
                      />
                    </div>
                  </div>

                  <Button onClick={handleChangePassword} disabled={saving || !currentPassword || !newPassword}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Alterando...
                      </>
                    ) : (
                      "Alterar senha"
                    )}
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium text-destructive mb-2">Zona de perigo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ao excluir sua conta, todos os seus dados serão permanentemente removidos.
                    Esta ação não pode ser desfeita.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                  >
                    Excluir minha conta
                  </Button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "aparencia" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Aparência</h2>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      O tema escuro é otimizado para reduzir o cansaço visual
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
                      Salvar preferências
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
