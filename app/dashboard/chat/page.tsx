"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { 
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Mic,
  Check,
  CheckCheck,
  Circle,
  Plus,
  Users,
  Settings,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  isGroup?: boolean
  members?: number
}

interface Message {
  id: number
  content: string
  time: string
  sender: "me" | "other"
  status: "sent" | "delivered" | "read"
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Grupo Hipertrofia",
    avatar: "GH",
    lastMessage: "Alguém vai treinar amanhã?",
    time: "10:32",
    unread: 5,
    online: true,
    isGroup: true,
    members: 28,
  },
  {
    id: 2,
    name: "Personal - Ricardo",
    avatar: "PR",
    lastMessage: "Seu treino de hoje está pronto!",
    time: "09:15",
    unread: 1,
    online: true,
  },
  {
    id: 3,
    name: "Nutricionista Ana",
    avatar: "NA",
    lastMessage: "Lembre de registrar suas refeições",
    time: "Ontem",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Marina Santos",
    avatar: "MS",
    lastMessage: "Show! Vamos juntos na maratona",
    time: "Ontem",
    unread: 0,
    online: true,
  },
  {
    id: 5,
    name: "Desafio 30 Dias",
    avatar: "D3",
    lastMessage: "Pedro: Dia 15 concluído!",
    time: "Dom",
    unread: 12,
    online: true,
    isGroup: true,
    members: 156,
  },
  {
    id: 6,
    name: "Pedro Oliveira",
    avatar: "PO",
    lastMessage: "Valeu pela dica do supino!",
    time: "Sáb",
    unread: 0,
    online: false,
  },
  {
    id: 7,
    name: "CrossFit Warriors",
    avatar: "CW",
    lastMessage: "WOD de hoje foi insano",
    time: "Sex",
    unread: 0,
    online: true,
    isGroup: true,
    members: 45,
  },
]

const messagesData: Message[] = [
  { id: 1, content: "E aí, tudo bem?", time: "09:00", sender: "other", status: "read" },
  { id: 2, content: "Opa! Tudo sim e você?", time: "09:02", sender: "me", status: "read" },
  { id: 3, content: "Montei seu treino novo focado em hipertrofia", time: "09:05", sender: "other", status: "read" },
  { id: 4, content: "Vou enviar o plano completo agora", time: "09:05", sender: "other", status: "read" },
  { id: 5, content: "Show! To ansioso pra ver", time: "09:10", sender: "me", status: "read" },
  { id: 6, content: "Esse mês vamos focar em costas e ombros que você pediu", time: "09:12", sender: "other", status: "read" },
  { id: 7, content: "Perfeito! Exatamente o que eu precisava", time: "09:13", sender: "me", status: "read" },
  { id: 8, content: "Lembra de manter a hidratação alta hoje", time: "09:14", sender: "other", status: "read" },
  { id: 9, content: "Seu treino de hoje está pronto!", time: "09:15", sender: "other", status: "delivered" },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[1])
  const [messages, setMessages] = useState<Message[]>(messagesData)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: messages.length + 1,
      content: newMessage,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
    }
    
    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setMobileShowChat(true)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Mensagens</h1>
            <p className="text-muted-foreground mt-1">
              Converse com sua comunidade fitness
            </p>
          </div>
          <Button className="gap-2 neon-glow-green">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Conversa</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 glass-card rounded-2xl overflow-hidden flex"
        >
          {/* Chat List */}
          <div className={cn(
            "w-full md:w-80 lg:w-96 border-r border-border flex flex-col",
            mobileShowChat && "hidden md:flex"
          )}>
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
            </div>

            {/* Chats List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat)}
                    className={cn(
                      "w-full p-3 rounded-xl flex items-center gap-3 transition-all text-left",
                      selectedChat?.id === chat.id
                        ? "bg-primary/10"
                        : "hover:bg-secondary"
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm",
                        chat.isGroup 
                          ? "bg-accent/20 text-accent"
                          : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                      )}>
                        {chat.isGroup ? <Users className="h-5 w-5" /> : chat.avatar}
                      </div>
                      {chat.online && !chat.isGroup && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </span>
                        {chat.unread > 0 && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className={cn(
              "flex-1 flex flex-col",
              !mobileShowChat && "hidden md:flex"
            )}>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileShowChat(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      selectedChat.isGroup 
                        ? "bg-accent/20 text-accent"
                        : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                    )}>
                      {selectedChat.isGroup ? <Users className="h-4 w-4" /> : selectedChat.avatar}
                    </div>
                    {selectedChat.online && !selectedChat.isGroup && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedChat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.isGroup 
                        ? `${selectedChat.members} membros` 
                        : selectedChat.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "me" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] sm:max-w-[70%] px-4 py-2 rounded-2xl",
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary rounded-bl-md"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={cn(
                          "flex items-center gap-1 mt-1",
                          message.sender === "me" ? "justify-end" : "justify-start"
                        )}>
                          <span className={cn(
                            "text-xs",
                            message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {message.time}
                          </span>
                          {message.sender === "me" && (
                            message.status === "read" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
                            ) : message.status === "delivered" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/50" />
                            ) : (
                              <Check className="h-3 w-3 text-primary-foreground/50" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20 bg-secondary border-0"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    className="neon-glow-green"
                    size="icon"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Suas Mensagens</h3>
                <p className="text-muted-foreground mt-1">
                  Selecione uma conversa para começar
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
