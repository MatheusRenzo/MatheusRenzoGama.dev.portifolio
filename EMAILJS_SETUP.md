# 📧 Tutorial Completo: Configuração do EmailJS + Vercel

## 🎯 O que é o EmailJS?

O EmailJS é um serviço que permite enviar emails diretamente do frontend JavaScript sem precisar de um backend. É perfeito para portfólios e sites estáticos.

## 📋 Pré-requisitos

- Conta no [EmailJS](https://www.emailjs.com/)
- Conta no [Vercel](https://vercel.com/)
- Projeto já deployado no Vercel

---

## 🚀 Passo a Passo: Configuração do EmailJS

### 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie sua conta
3. Verifique seu email

### 2. Configurar Serviço de Email

1. **Faça login no EmailJS**
2. No dashboard, clique em "Email Services"
3. Clique em "Add New Service"
4. **Escolha seu provedor de email:**
   - **Gmail** (recomendado para começar)
   - **Outlook**
   - **Yahoo**
   - **Outros**

#### Para Gmail:
1. Selecione "Gmail"
2. Digite seu email do Gmail
3. Clique em "Connect Account"
4. Autorize o EmailJS a acessar sua conta
5. **IMPORTANTE:** Ative a verificação em 2 etapas no Gmail primeiro

### 3. Criar Template de Email

1. No dashboard, clique em "Email Templates"
2. Clique em "Create New Template"
3. **Configure o template:**

```html
Template Name: Portfolio Contact Form
Subject: [PORTFOLIO] {{subject}}

Message:
Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada do formulário de contato do seu portfólio.
Timestamp: {{timestamp}}
```

4. **Salve o template** e anote o **Template ID**

### 4. Obter Credenciais

No dashboard do EmailJS, você encontrará:

- **Public Key** (na aba "Account" → "API Keys")
- **Service ID** (na aba "Email Services")
- **Template ID** (na aba "Email Templates")

---

## 🔧 Configuração das Variáveis de Ambiente

### 1. Criar arquivo .env.local (desenvolvimento local)

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
```

### 2. Configurar no Vercel (produção)

1. **Acesse o dashboard do Vercel**
2. **Selecione seu projeto**
3. **Vá para "Settings"**
4. **Clique em "Environment Variables"**
5. **Adicione cada variável:**

| Nome da Variável | Valor | Environment |
|------------------|-------|-------------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `sua_public_key_aqui` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `seu_service_id_aqui` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `seu_template_id_aqui` | Production, Preview, Development |

6. **Clique em "Save"**
7. **Redeploy o projeto** (ou aguarde o auto-deploy)

---

## 🧪 Testando a Configuração

### 1. Teste Local

1. Crie o arquivo `.env.local` com suas credenciais
2. Execute `npm run dev`
3. Acesse o formulário de contato
4. Preencha e envie uma mensagem de teste

### 2. Teste em Produção

1. Após configurar as variáveis no Vercel
2. Acesse seu site deployado
3. Teste o formulário de contato

---

## 🔍 Solução de Problemas Comuns

### Erro: "EmailJS not loaded"
- Verifique se o script está sendo carregado
- Confirme se as variáveis de ambiente estão corretas

### Erro: "Service not found"
- Verifique se o Service ID está correto
- Confirme se o serviço está ativo no EmailJS

### Erro: "Template not found"
- Verifique se o Template ID está correto
- Confirme se o template está publicado

### Emails não chegam
- Verifique a pasta de spam
- Confirme se o serviço de email está conectado
- Teste com diferentes provedores de email

---

## 📱 Exemplo de Uso no Código

Seu componente Contact.jsx já está configurado para usar as variáveis de ambiente:

```javascript
// As variáveis são carregadas automaticamente
const response = await window.emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  templateParams
);
```

---

## 🎉 Próximos Passos

1. **Teste o formulário** em desenvolvimento local
2. **Configure as variáveis** no Vercel
3. **Teste em produção**
4. **Personalize o template** de email conforme necessário
5. **Configure notificações** para receber alertas de novos contatos

---

## 📞 Suporte

- **EmailJS Docs:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Vercel Docs:** [https://vercel.com/docs](https://vercel.com/docs)
- **Comunidade:** Stack Overflow, GitHub Issues

---

## ⚠️ Importante

- **NUNCA** commite suas credenciais reais no Git
- Use sempre variáveis de ambiente
- Mantenha suas chaves seguras
- Monitore o uso da API (EmailJS tem limites gratuitos)

---

**🎯 Status:** Seu projeto está configurado e pronto para receber emails através do EmailJS!
