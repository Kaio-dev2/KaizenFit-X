"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Lucas Mendes",
    role: "Empresário",
    avatar: "LM",
    content: "Em 6 meses perdi 15kg e ganhei massa muscular. A IA realmente entende meu corpo e adapta os treinos perfeitamente. Nunca mais volto para planilhas manuais.",
    rating: 5,
    result: "-15kg em 6 meses",
  },
  {
    name: "Ana Carolina Silva",
    role: "Médica",
    avatar: "AC",
    content: "Como médica, sei a importância de um plano personalizado. O Kaizen Fit AI supera qualquer expectativa. Os insights de nutrição são incríveis.",
    rating: 5,
    result: "+8kg de massa magra",
  },
  {
    name: "Pedro Oliveira",
    role: "Atleta Amador",
    avatar: "PO",
    content: "A gamificação mudou minha relação com exercícios. Agora treino com consistência e os rankings me motivam a ir além todos os dias.",
    rating: 5,
    result: "365 dias de streak",
  },
  {
    name: "Marina Santos",
    role: "Designer",
    avatar: "MS",
    content: "Interface linda e experiência perfeita. Finalmente um app de fitness que não parece feito nos anos 2000. Recomendo para todos!",
    rating: 5,
    result: "Meta de 10km alcançada",
  },
  {
    name: "Roberto Lima",
    role: "Personal Trainer",
    avatar: "RL",
    content: "Uso com todos os meus alunos. A versão Business revolucionou como gerencio meus clientes. Economizo 10h por semana em planejamento.",
    rating: 5,
    result: "50+ alunos gerenciados",
  },
  {
    name: "Juliana Costa",
    role: "Estudante",
    avatar: "JC",
    content: "O plano gratuito já é incrível! Comecei sem pagar nada e em 3 meses vi resultados que nunca tinha conseguido. Agora sou Pro.",
    rating: 5,
    result: "-8kg em 3 meses",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Depoimentos
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Amado por{" "}
            <span className="text-primary text-glow-green">milhares</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Veja o que nossos usuários têm a dizer sobre a transformação que vivenciaram.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-4" />

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {testimonial.content}
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
                <Star className="h-3 w-3 fill-primary" />
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
