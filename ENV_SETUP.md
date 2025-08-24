# 🔧 Configuração de Variáveis de Ambiente

Este documento explica como configurar todas as variáveis de ambiente necessárias para o funcionamento completo do portfolio.

## 📋 Variáveis Obrigatórias

### 1. EmailJS Configuration
```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Como obter:**
- Acesse [EmailJS](https://www.emailjs.com/)
- Crie uma conta gratuita
- Configure um serviço de email (Gmail, Outlook, etc.)
- Crie um template de email
- Copie as credenciais para o arquivo `.env.local`

### 2. GitHub API Token (Opcional mas Recomendado)
```env
# GitHub API Token
GITHUB_TOKEN=your_github_personal_access_token
```

**Como obter:**
- Acesse [GitHub Settings > Tokens](https://github.com/settings/tokens)
- Clique em "Generate new token (classic)"
- Selecione as permissões: `public_repo`, `read:user`
- Copie o token para o arquivo `.env.local`

## 📁 Arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# GitHub API Token (Opcional)
GITHUB_TOKEN=your_github_personal_access_token
```

## 🚀 Configuração por Ambiente

### Desenvolvimento Local
- Use `.env.local` para variáveis locais
- O arquivo `.env.local` não é versionado (está no .gitignore)

### Produção (Vercel)
- Configure as variáveis no dashboard do Vercel
- Vá em Settings > Environment Variables
- Adicione cada variável com seu valor correspondente

## ✅ Verificação da Configuração

Para verificar se as variáveis estão configuradas corretamente:

1. **EmailJS**: Teste o formulário de contato
2. **GitHub**: Verifique se os repositórios são carregados na seção de projetos

## 🔒 Segurança

- **NUNCA** commite o arquivo `.env.local`
- **NUNCA** compartilhe tokens ou chaves privadas
- Use tokens com permissões mínimas necessárias
- Revogue tokens antigos regularmente

## 🆘 Solução de Problemas

### EmailJS não funciona
- Verifique se as credenciais estão corretas
- Confirme se o serviço está ativo
- Teste o template no dashboard do EmailJS

### GitHub API não funciona
- Verifique se o token tem as permissões corretas
- Confirme se o token não expirou
- Verifique os rate limits da API

## 📚 Recursos Adicionais

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
