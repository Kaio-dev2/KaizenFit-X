# KaizenFit — Plataforma SaaS Fitness

> Plataforma completa de fitness com dashboard, treinos, nutrição, IA Coach, comunidade, loja e painel administrativo.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
  - [Usando Supabase](#usando-supabase)
  - [Usando Neon](#usando-neon)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação e Execução](#instalação-e-execução)
- [Acesso ao Painel Admin](#acesso-ao-painel-admin)
- [Autenticação Social](#autenticação-social)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Segurança](#segurança)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## Visão Geral

O KaizenFit é uma plataforma SaaS completa voltada para fitness e bem-estar. Oferece desde acompanhamento de treinos e nutrição até uma loja integrada com dropshipping e um painel administrativo completo para gerenciar toda a plataforma.

---

## 🛠 Stack Tecnológica

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5.7 |
| Estilização | Tailwind CSS 4 + Shadcn/UI |
| Animações | Framer Motion |
| ORM | Drizzle ORM |
| Banco de Dados | PostgreSQL (Supabase ou Neon) |
| Autenticação | Better Auth |
| Formulários | React Hook Form + Zod |
| Email | Resend |
| Segurança | Jose (JWT) + Rate Limiting |

---

## Funcionalidades

### Para Usuários
- 🏠 **Dashboard** — visão geral de progresso, treinos e nutrição
- 💪 **Treinos** — biblioteca de treinos com execução guiada
- 🥗 **Nutrição** — diário alimentar e acompanhamento de macros
- 🤖 **IA Coach** — assistente inteligente personalizado
- 👥 **Comunidade** — feed social, posts e interações
- 🛍️ **Loja** — e-commerce com carrinho, wishlist e checkout
- 🏆 **Ranking** — leaderboard e conquistas
- ⚙️ **Configurações** — perfil, notificações, aparência e assinatura
- ❓ **Ajuda** — formulário de suporte com protocolo de atendimento

### Para Administradores
- 📊 **Dashboard Admin** — métricas, gráficos e atividade recente
- 👤 **Gestão de Usuários** — editar roles, banir, histórico
- 📝 **Gestão de Conteúdo** — CRUD de treinos, nutrição e comunidade
- 🔧 **Configurações do Site** — editar textos, cores, feature flags
- 🛒 **E-commerce** — integração com Yampi, Shopify, Dropi, Stripe e Mercado Pago
- 🎫 **Tickets** — gerenciar tickets de suporte

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ → [nodejs.org](https://nodejs.org)
- **npm** 9+ (vem com o Node.js)
- **Git** → [git-scm.com](https://git-scm.com)
- Uma conta no **Supabase** ou **Neon** (banco de dados)

---

## 🗄 Configuração do Banco de Dados

### Usando Supabase

O Supabase é recomendado por ter um painel visual completo para gerenciar dados.

**1. Criar conta e projeto**
1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New Project**
3. Defina um nome e uma senha forte para o banco
4. Aguarde a inicialização (~1 minuto)

**2. Obter a Connection String**
1. No painel do projeto, clique no botão **Connect** (topo da página)
2. Selecione a aba **Direct** ou **ORM**
3. Copie a URI no formato:
```
postgresql://postgres.SEU_ID:SUA_SENHA@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```
4. Substitua `SUA_SENHA` pela senha definida na criação do projeto

> **Atenção:** Se sua senha contiver `@`, substitua por `%40` na URL para evitar erros de conexão.

**3. Configurar a variável de ambiente**

Cole a URL no `.env.local`:
```env
DATABASE_URL="postgresql://postgres.SEU_ID:SUA_SENHA@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**4. Criar as tabelas**
```bash
npm run db:push
```

Após executar, acesse **Table Editor** no Supabase para confirmar que as tabelas foram criadas.

---

### Usando Neon

**1. Criar conta e projeto**
1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Clique em **New Project**
3. Escolha a região mais próxima

**2. Obter a Connection String**
1. No painel do projeto, clique em **Connection Details**
2. Selecione **Connection string** no formato URI
3. Copie a string no formato:
```
postgresql://usuario:senha@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**3. Configurar a variável de ambiente**
```env
DATABASE_URL="postgresql://usuario:senha@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**4. Criar as tabelas**
```bash
npm run db:push
```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# ===================================
# BANCO DE DADOS
# ===================================
DATABASE_URL="sua-connection-string-aqui"

# ===================================
# BETTER AUTH
# ===================================
# Gere com: openssl rand -base64 32
BETTER_AUTH_SECRET="string-aleatoria-minimo-32-caracteres"
BETTER_AUTH_URL="http://localhost:3000"

# ===================================
# PAINEL ADMIN (NUNCA COMPARTILHE!)
# ===================================
ADMIN_EMAIL="seu-email-admin@exemplo.com"
ADMIN_PASSWORD="sua-senha-admin-forte"
# Gere com: openssl rand -base64 32
ADMIN_JWT_SECRET="string-aleatoria-minimo-32-caracteres"

# ===================================
# SUPORTE
# ===================================
SUPPORT_EMAIL="email-que-recebe-tickets@exemplo.com"
RESEND_API_KEY=""  # Obter em resend.com

# ===================================
# OAUTH — LOGIN SOCIAL
# ===================================
# Google: console.cloud.google.com
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Facebook: developers.facebook.com
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# ===================================
# E-COMMERCE
# ===================================
YAMPI_API_TOKEN=""
YAMPI_ALIAS=""
SHOPIFY_SHOP_NAME=""
SHOPIFY_API_KEY=""
SHOPIFY_ADMIN_API_TOKEN=""
DROPI_API_KEY=""

# ===================================
# PAGAMENTOS
# ===================================
# Stripe: dashboard.stripe.com
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""

# Mercado Pago: mercadopago.com.br/developers
MERCADOPAGO_ACCESS_TOKEN=""

# ===================================
# RATE LIMITING (produção)
# ===================================
# Upstash: upstash.com
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# ===================================
# PWA — NOTIFICAÇÕES PUSH
# ===================================
VAPID_PUBLIC_KEY=""
VAPID_PRIVATE_KEY=""
```

> **Dica:** Para gerar strings secretas seguras, use o comando:
> ```bash
> openssl rand -base64 32
> ```

---

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/kaizenfit.git
cd kaizenfit

# 2. Instale as dependências
npm install

# 3. Instale dependências de desenvolvimento
npm install -D drizzle-kit dotenv

# 4. Configure o .env.local (veja seção acima)

# 5. Crie as tabelas no banco
npm run db:push

# 6. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

---

## Acesso ao Painel Admin

O painel administrativo é acessado por uma URL dedicada e protegida, **invisível na navegação do site**.

### URL de Acesso
```
http://localhost:3000/admin
```

### Credenciais
As credenciais são definidas no `.env.local`:
```env
ADMIN_EMAIL="seu-email-admin@exemplo.com"
ADMIN_PASSWORD="sua-senha-forte"
```

### Como funciona a segurança
- ✅ Login verificado **100% no servidor** — senha nunca exposta no browser
- ✅ Sessão via **cookie httpOnly** — não acessível por JavaScript
- ✅ Token **JWT assinado** com validade de 8 horas
- ✅ **Rate limiting** — bloqueia IP após 5 tentativas erradas por 15 minutos
- ✅ Nenhum link ou botão visível para usuários comuns
- ✅ Todas as ações registradas em **audit logs**

> ⚠️ **IMPORTANTE:** Nunca use as credenciais de exemplo em produção. Sempre defina credenciais únicas e fortes no `.env.local`.

---

## 🔑 Autenticação Social

O projeto suporta login com Google e Facebook via Better Auth.

### Configurar Google OAuth

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services → Credentials**
4. Clique em **Create Credentials → OAuth Client ID**
5. Selecione **Web Application**
6. Em **Authorized redirect URIs**, adicione:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://seudominio.com/api/auth/callback/google` (produção)
7. Copie o **Client ID** e **Client Secret** para o `.env.local`

### Configurar Facebook OAuth

1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Clique em **My Apps → Create App**
3. Selecione **Consumer**
4. Vá em **Facebook Login → Settings**
5. Em **Valid OAuth Redirect URIs**, adicione:
   - `http://localhost:3000/api/auth/callback/facebook`
6. Copie o **App ID** e **App Secret** para o `.env.local`

---

## 📁 Estrutura do Projeto

```
kaizenfit/
├── app/
│   ├── admin/                    # Painel administrativo
│   │   ├── (dashboard)/          # Layout e páginas do admin
│   │   │   ├── dashboard/        # Métricas e visão geral
│   │   │   ├── usuarios/         # Gestão de usuários
│   │   │   ├── conteudo/         # Gestão de conteúdo
│   │   │   ├── ecommerce/        # Integrações de e-commerce
│   │   │   ├── tickets/          # Tickets de suporte
│   │   │   └── configuracoes/    # Configurações do site
│   │   ├── auth/route.ts         # API de autenticação admin
│   │   └── page.tsx              # Tela de login admin
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth handler
│   │   └── suporte/              # API de tickets de suporte
│   ├── dashboard/                # Área do usuário logado
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── treinos/              # Módulo de treinos
│   │   ├── nutricao/             # Módulo de nutrição
│   │   ├── ia/                   # IA Coach
│   │   ├── comunidade/           # Feed social
│   │   ├── loja/                 # E-commerce
│   │   ├── ranking/              # Leaderboard
│   │   ├── configuracoes/        # Configurações do usuário
│   │   └── ajuda/                # Suporte
│   ├── login/                    # Tela de login
│   ├── cadastro/                 # Tela de cadastro
│   ├── onboarding/               # Onboarding de novos usuários
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/                # Componentes do dashboard
│   ├── landing/                  # Componentes da landing page
│   └── ui/                       # Componentes Shadcn/UI
├── lib/
│   ├── auth.ts                   # Configuração Better Auth
│   ├── auth-client.ts            # Cliente Better Auth
│   ├── admin-auth.ts             # Verificação de sessão admin
│   └── db/
│       ├── index.ts              # Conexão com banco
│       └── schema.ts             # Schema Drizzle ORM
├── middleware.ts                 # Rate limiting + headers de segurança
├── drizzle.config.ts             # Configuração Drizzle Kit
└── .env.local                    # Variáveis de ambiente (não committar!)
```

---

## Segurança

O projeto implementa múltiplas camadas de segurança:

| Camada | Implementação |
|--------|--------------|
| Rate Limiting | In-memory (dev) / Upstash Redis (prod) |
| Headers HTTP | X-Frame-Options, CSP, HSTS, etc. |
| Admin Auth | JWT httpOnly cookie + verificação server-side |
| Brute Force | Bloqueio de IP após 5 tentativas |
| Input Validation | Zod em todos os formulários |
| Audit Logs | Registro de ações críticas no banco |
| Sessões | Better Auth com expiração configurável |
| OAuth | Google e Facebook via Better Auth |

---

## Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
# ... adicionar todas as variáveis do .env.local
```

Após o deploy, atualize `BETTER_AUTH_URL` para a URL de produção:
```env
BETTER_AUTH_URL="https://seudominio.com"
```

---

## 🔧 Troubleshooting

### `ERR_TOO_MANY_REDIRECTS` no login
O middleware está redirecionando a página `/login` infinitamente. Verifique se `/login` está na lista de rotas públicas do `middleware.ts`.

### `Either connection "url" or "host" are required`
O arquivo `.env.local` não está sendo lido. Verifique:
1. O arquivo se chama exatamente `.env.local` (sem pontos extras no final)
2. Está na raiz do projeto (mesma pasta do `package.json`)
3. A `DATABASE_URL` está preenchida corretamente

```bash
# Verificar se o arquivo existe e tem conteúdo
cat .env.local | grep DATABASE_URL
```

### Porta 3000 em uso
```bash
# Ver qual processo está usando a porta
lsof -i :3000

# Matar o processo pelo PID
kill SEU_PID
```

### `invalid password` no admin
Você está tentando logar em `/login` que é para usuários comuns. O acesso admin é em:
```
http://localhost:3000/admin
```

### Servidor para após iniciar
Verifique se há um `pnpm-lock.yaml` ou conflito de lockfiles:
```bash
rm pnpm-lock.yaml
rm -rf node_modules
npm install
npm run dev
```

### Tabelas não criadas no banco
```bash
npm run db:push
```
Se der erro, verifique se a `DATABASE_URL` está correta no `.env.local`.

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica erros de lint |
| `npm run db:push` | Cria/atualiza tabelas no banco |

---

## Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

---

<div align="center">
  Feito com 💚 pela equipe KaizenFit
</div>
