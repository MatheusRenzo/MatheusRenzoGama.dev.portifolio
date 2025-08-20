# 🚀 Configuração Rápida no Vercel

## 📍 Passos para Configurar as Variáveis de Ambiente

### 1. Acesse o Dashboard do Vercel
- Vá para [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Faça login na sua conta

### 2. Selecione seu Projeto
- Clique no projeto `portfolio-matheus-renzo`
- Ou procure pelo nome do seu projeto

### 3. Vá para Settings
- No menu lateral, clique em **"Settings"**
- Ou clique na aba **"Settings"** no topo

### 4. Environment Variables
- No menu lateral esquerdo, clique em **"Environment Variables"**
- Você verá uma lista vazia (se for a primeira vez)

### 5. Adicione as Variáveis
Clique em **"Add New"** e adicione cada uma:

#### Variável 1:
- **Name:** `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- **Value:** `sua_public_key_aqui` (substitua pela sua chave real)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Clique em **"Save"**

#### Variável 2:
- **Name:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- **Value:** `seu_service_id_aqui` (substitua pelo seu ID real)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Clique em **"Save"**

#### Variável 3:
- **Name:** `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- **Value:** `seu_template_id_aqui` (substitua pelo seu ID real)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Clique em **"Save"**

### 6. Redeploy (Opcional)
- O Vercel faz auto-deploy quando detecta mudanças
- Se quiser forçar um redeploy, vá para **"Deployments"** e clique em **"Redeploy"**

---

## 🔍 Verificação

Após configurar, você deve ver algo assim:

```
Environment Variables (3)
├── NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
├── NEXT_PUBLIC_EMAILJS_SERVICE_ID
└── NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
```

---

## ⚠️ Importante

- **NUNCA** deixe as variáveis vazias
- **SEMPRE** marque todos os 3 environments (Production, Preview, Development)
- **AGUARDE** alguns minutos para as variáveis serem aplicadas
- **TESTE** o formulário após a configuração

---

## 🎯 Próximo Passo

Após configurar as variáveis no Vercel:
1. Teste o formulário de contato no seu site
2. Envie uma mensagem de teste
3. Verifique se recebeu o email

---

**💡 Dica:** Se algo não funcionar, verifique o console do navegador para erros e confirme se as variáveis estão sendo carregadas corretamente.
