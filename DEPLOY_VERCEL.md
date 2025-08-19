# 🚀 Deploy no Vercel - Guia Completo

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Projeto no GitHub**: Seu código deve estar em um repositório público ou privado
3. **Node.js**: Versão 16 ou superior

## 🛠️ Passo a Passo

### 1. Preparar o Projeto

```bash
# Certifique-se de que o projeto está funcionando localmente
npm run build
npm start
```

### 2. Fazer Commit e Push

```bash
# Adicionar todas as mudanças
git add .

# Fazer commit
git commit -m "Preparando para deploy no Vercel"

# Fazer push para o GitHub
git push origin main
```

### 3. Deploy no Vercel

#### Opção A: Deploy via Dashboard (Recomendado)

1. **Acesse** [vercel.com](https://vercel.com) e faça login
2. **Clique** em "New Project"
3. **Importe** seu repositório do GitHub
4. **Configure** o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (deixe vazio se o projeto estiver na raiz)
   - **Build Command**: `npm run build` (deve estar correto automaticamente)
   - **Output Directory**: `.next` (deve estar correto automaticamente)
   - **Install Command**: `npm install`

5. **Clique** em "Deploy"

#### Opção B: Deploy via CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### 4. Configurações Importantes

#### Variáveis de Ambiente
Se você tiver variáveis de ambiente (como chaves de API), configure-as no dashboard do Vercel:

1. Vá para **Settings** → **Environment Variables**
2. Adicione suas variáveis:
   ```
   NODE_ENV=production
   EMAILJS_PUBLIC_KEY=sua_chave_aqui
   EMAILJS_PRIVATE_KEY=sua_chave_privada
   ```

#### Domínio Personalizado (Opcional)
1. Vá para **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções

### 5. Verificar o Deploy

Após o deploy:
- ✅ **Build Status**: Deve mostrar "Ready"
- ✅ **URL**: Sua aplicação estará disponível em `https://seu-projeto.vercel.app`
- ✅ **Performance**: Verifique o score de performance no dashboard

### 6. Deploys Automáticos

O Vercel faz deploy automático sempre que você fizer push para a branch principal:
- **Push para `main`** → Deploy automático
- **Pull Request** → Preview automático

## 🔧 Solução de Problemas

### Erro de Build
```bash
# Verificar logs de build
vercel logs

# Testar build localmente
npm run build
```

### Erro de Dependências
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

### Erro de Variáveis de Ambiente
- Verifique se todas as variáveis estão configuradas no Vercel
- Certifique-se de que os nomes estão corretos

## 📱 Monitoramento

### Analytics
- **Vercel Analytics**: Ative para monitorar performance
- **Core Web Vitals**: Acompanhe métricas de performance

### Logs
- **Function Logs**: Para APIs serverless
- **Build Logs**: Para problemas de build

## 🚀 Otimizações

### Performance
- ✅ **Image Optimization**: Next.js otimiza imagens automaticamente
- ✅ **Code Splitting**: Automático com Next.js
- ✅ **CDN Global**: Vercel distribui globalmente

### SEO
- ✅ **Meta Tags**: Configure em cada página
- ✅ **Sitemap**: Gere automaticamente
- ✅ **Robots.txt**: Configure no `public/`

## 💡 Dicas Importantes

1. **Sempre teste localmente** antes do deploy
2. **Use branches** para features e `main` para produção
3. **Monitore performance** regularmente
4. **Configure previews** para Pull Requests
5. **Use variáveis de ambiente** para configurações sensíveis

## 📞 Suporte

- **Documentação**: [vercel.com/docs](https://vercel.com/docs)
- **Comunidade**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://vercel-status.com)

---

🎉 **Seu portfolio está no ar!** Compartilhe o link com recrutadores e colegas!
