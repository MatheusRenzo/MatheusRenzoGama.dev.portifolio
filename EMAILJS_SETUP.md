# 📧 Configuração Completa do EmailJS

## 🚀 Passo a Passo para Configurar o Sistema de Email

### 1. Criar Conta no EmailJS

1. Acesse [EmailJS](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Verifique seu email de confirmação
4. Faça login na sua conta

### 2. Configurar Serviço de Email

1. No dashboard, vá para "Email Services"
2. Clique em "Add New Service"
3. Escolha seu provedor de email:
   - **Gmail**: Mais comum e fácil de configurar
   - **Outlook**: Para contas corporativas
   - **Outros**: Suporte para diversos provedores

#### Para Gmail:
1. Selecione "Gmail"
2. Digite seu email do Gmail
3. Clique em "Connect Account"
4. Autorize o EmailJS a acessar sua conta
5. Anote o **Service ID** gerado

### 3. Criar Template de Email

1. Vá para "Email Templates"
2. Clique em "Create New Template"
3. Configure o template:

#### Configurações do Template:
- **Template Name**: `Portfolio Contact Form`
- **Subject**: `[PORTFOLIO] {{subject}}`

#### Conteúdo do Template:
```html
<h2>Nova Mensagem do Portfolio</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>

<p><strong>Mensagem:</strong></p>
<p>{{message}}</p>

<hr>
<p><em>Esta mensagem foi enviada através do formulário de contato do seu portfolio.</em></p>
<p><em>Timestamp: {{timestamp}}</em></p>
```

4. Salve o template e anote o **Template ID**

### 4. Obter Credenciais

1. **Public Key**: Vá em "Account" → "API Keys"
2. **Service ID**: Do serviço de email criado
3. **Template ID**: Do template criado

### 5. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione suas credenciais:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
```

### 6. Testar o Sistema

1. Execute o projeto: `npm run dev`
2. Vá para a seção de contato
3. Preencha o formulário e envie
4. Verifique se o email foi recebido

## 🔧 Solução de Problemas

### Email não está sendo enviado?

1. **Verifique as credenciais**:
   - Public Key está correto?
   - Service ID está correto?
   - Template ID está correto?

2. **Verifique o console do navegador**:
   - Há erros JavaScript?
   - As variáveis de ambiente estão sendo carregadas?

3. **Verifique o EmailJS**:
   - O serviço está ativo?
   - O template está publicado?
   - A conta tem créditos suficientes?

### Erro de CORS?

- O EmailJS resolve problemas de CORS automaticamente
- Se persistir, verifique se está usando HTTPS em produção

### Template não está funcionando?

1. **Variáveis do template**:
   - Use exatamente: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
   - Não use espaços extras ou caracteres especiais

2. **Formato do template**:
   - Pode ser HTML ou texto simples
   - Teste primeiro com um template simples

## 📱 Configuração para Produção

### Vercel
1. Vá para as configurações do projeto no Vercel
2. Adicione as variáveis de ambiente em "Environment Variables"
3. Faça deploy novamente

### Netlify
1. Vá para "Site settings" → "Environment variables"
2. Adicione as variáveis necessárias
3. Faça deploy novamente

### Outras Plataformas
- Configure as variáveis de ambiente conforme a documentação da plataforma
- Certifique-se de que as variáveis começam com `NEXT_PUBLIC_`

## 🎯 Exemplos de Uso

### Template Simples (Texto)
```
Assunto: {{subject}}

Nome: {{from_name}}
Email: {{from_email}}
Mensagem: {{message}}

---
Enviado do portfolio em {{timestamp}}
```

### Template Avançado (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nova Mensagem do Portfolio</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nova Mensagem do Portfolio</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Assunto:</strong> {{subject}}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p><strong>Mensagem:</strong></p>
            <p>{{message}}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do seu portfolio.<br>
            Timestamp: {{timestamp}}
        </p>
    </div>
</body>
</html>
```

## 📊 Monitoramento

### EmailJS Dashboard
- Monitore o envio de emails
- Veja estatísticas de uso
- Configure notificações

### Logs do Projeto
- Verifique o console do navegador
- Monitore as respostas da API
- Configure logging em produção

## 🔒 Segurança

### Boas Práticas
1. **Nunca exponha credenciais** em código público
2. **Use variáveis de ambiente** para todas as credenciais
3. **Monitore o uso** da API para detectar abusos
4. **Configure rate limiting** se necessário

### Validação
1. **Valide dados** no frontend e backend
2. **Sanitize inputs** para prevenir injeção
3. **Configure CORS** adequadamente
4. **Use HTTPS** em produção

---

**💡 Dica**: Comece com um template simples e vá adicionando complexidade conforme necessário. Teste sempre em desenvolvimento antes de fazer deploy em produção.
