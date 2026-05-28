import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/db'
import { supportTickets } from '@/lib/db/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, date, category, description, protocol, userId } = await request.json()

    if (!name || !email || !description || !protocol || !category) {
      return NextResponse.json(
        { error: 'Campos obrigatorios faltando.' },
        { status: 400 }
      )
    }

    // Salvar ticket no banco de dados
    await db.insert(supportTickets).values({
      userId: userId || null,
      name,
      email,
      category,
      description,
      protocol,
      status: 'open',
    })

    // Enviar email para o suporte (apenas se RESEND_API_KEY estiver configurada)
    if (process.env.RESEND_API_KEY && process.env.SUPPORT_EMAIL) {
      try {
        // Email para a equipe de suporte
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'KaizenFit Suporte <onboarding@resend.dev>',
          to: process.env.SUPPORT_EMAIL,
          subject: `[${protocol}] Novo ticket: ${category} - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #22c55e;">Novo Ticket de Suporte</h2>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Protocolo:</strong> ${protocol}</p>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Data:</strong> ${date}</p>
                <p><strong>Categoria:</strong> ${category}</p>
              </div>
              <h3>Descricao:</h3>
              <p style="white-space: pre-wrap;">${description}</p>
            </div>
          `,
        })

        // Email de confirmacao para o usuario
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'KaizenFit <onboarding@resend.dev>',
          to: email,
          subject: `Seu ticket foi recebido - Protocolo ${protocol}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #22c55e;">Recebemos seu contato!</h2>
              <p>Ola, ${name}!</p>
              <p>Seu ticket foi registrado com o protocolo <strong>${protocol}</strong>.</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Categoria:</strong> ${category}</p>
                <p><strong>Protocolo:</strong> ${protocol}</p>
              </div>
              <p>Nossa equipe respondera em ate 48 horas no email ${email}.</p>
              <br/>
              <p>Atenciosamente,<br/><strong>Equipe KaizenFit</strong></p>
            </div>
          `,
        })
      } catch (emailError) {
        // Log do erro mas nao falhar a requisicao (ticket ja foi salvo)
        console.error('Erro ao enviar email:', emailError)
      }
    }

    return NextResponse.json({ success: true, protocol })
  } catch (error) {
    console.error('Erro ao criar ticket de suporte:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar. Tente novamente.' },
      { status: 500 }
    )
  }
}
