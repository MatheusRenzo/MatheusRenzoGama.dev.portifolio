# Configuração do GitHub API para o Portfólio

## Problema: Rate Limit Exceeded

O erro "Rate limit exceeded" acontece porque a API do GitHub tem limites diferentes para usuários autenticados e não autenticados:

- **Sem token**: 60 requisições por hora
- **Com token**: 5.000 requisições por hora

## Solução: Configurar Token de Acesso

### 1. Criar Token no GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Dê um nome como "Portfolio API"
4. Selecione as permissões:
   - `public_repo` (para acessar repositórios públicos)
   - `read:user` (para ler informações do usuário)
5. Clique em "Generate token"
6. **IMPORTANTE**: Copie o token (você não poderá vê-lo novamente)

### 2. Configurar Variável de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione:

```bash
GITHUB_TOKEN=ghp_seu_token_aqui


```

3. Reinicie o servidor de desenvolvimento

### 3. Verificar Configuração

Após configurar o token, você verá no console:
- "Token configurado: true"
- "Rate Limit: 5000 requisições/hora"

## Soluções Alternativas

### Cache Mais Agressivo
- Implementado cache de 1 hora
- Fallback para projetos estáticos em caso de erro

### Tratamento de Erros Melhorado
- Mensagens específicas para rate limits
- Sugestões de como resolver
- Logs informativos no console

## Estrutura dos Arquivos

- `lib/github-config.js` - Configuração centralizada
- `pages/api/github-repos.js` - API com tratamento de rate limits
- `components/Projects.jsx` - Frontend com tratamento de erros

## Monitoramento

Para verificar se está funcionando:
1. Abra o console do navegador
2. Recarregue a página de projetos
3. Procure por logs sobre rate limits e token

## Troubleshooting

### Token não funciona
- Verifique se o token está correto
- Confirme se as permissões estão corretas
- Teste o token em: https://api.github.com/user

### Rate limit persiste
- Aguarde 1 hora para reset
- Verifique se o token expirou
- Confirme se o arquivo `.env.local` está na raiz

### Erro 403
- Token pode ter expirado
- Permissões insuficientes
- Usuário pode estar bloqueado

## Benefícios da Solução

✅ **5.000 requisições/hora** em vez de 60
✅ **Cache inteligente** para reduzir chamadas
✅ **Tratamento robusto** de erros
✅ **Fallback automático** para projetos estáticos
✅ **Logs informativos** para debugging
