"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "O Kaizen Fit AI funciona para iniciantes?",
    answer: "Absolutamente! Nossa IA adapta os treinos e planos nutricionais para qualquer nível de experiência. Se você nunca pisou numa academia ou se é um atleta experiente, o sistema aprende com você e evolui junto.",
  },
  {
    question: "Preciso de equipamentos de academia?",
    answer: "Não necessariamente. Temos treinos para academia completa, home gym com equipamentos básicos, e até treinos apenas com peso corporal. Você informa o que tem disponível e a IA cria o plano perfeito.",
  },
  {
    question: "Como funciona a IA de nutrição?",
    answer: "Nossa IA analisa seus objetivos, preferências alimentares, restrições e rotina para criar um plano alimentar personalizado. Você pode escanear alimentos com a câmera para registro automático e receber sugestões de receitas.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim! Não temos fidelidade. Você pode cancelar quando quiser diretamente pelo app ou site. Oferecemos garantia de 30 dias - se não gostar, devolvemos 100% do valor.",
  },
  {
    question: "O app funciona offline?",
    answer: "Sim! Você pode baixar seus treinos e planos para acessar offline. A sincronização acontece automaticamente quando você volta a ter conexão.",
  },
  {
    question: "Como funciona o sistema de gamificação?",
    answer: "Você ganha XP completando treinos, batendo metas e participando de desafios. Conforme acumula XP, sobe de nível e desbloqueia medalhas exclusivas. Rankings semanais e mensais mantêm a motivação alta.",
  },
  {
    question: "Posso usar como Personal Trainer para meus alunos?",
    answer: "Sim! O plano Business foi feito para isso. Você pode gerenciar múltiplos alunos, criar treinos personalizados, acompanhar o progresso de todos e até usar nossa marca branca.",
  },
  {
    question: "Os dados são seguros?",
    answer: "Segurança é nossa prioridade. Usamos criptografia de ponta a ponta, servidores seguros e nunca vendemos seus dados. Você tem controle total sobre suas informações.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Perguntas{" "}
            <span className="text-primary text-glow-green">Frequentes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Tire suas dúvidas sobre o Kaizen Fit AI
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass-card rounded-2xl p-6 text-left hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
