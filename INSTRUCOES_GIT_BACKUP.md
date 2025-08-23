# 📚 Instruções para o Script de Backup Git

## 🎯 O que o script faz

Este script automatiza o processo de:
1. **Criar/atualizar** uma branch chamada `backup` com todos os commits
2. **Limpar** a branch `main` para manter apenas os **2 últimos commits**
3. **Preservar** todos os commits antigos na branch `backup`

## 🚀 Como usar

### 1. Preparação
```bash
# Certifique-se de estar na branch main
git checkout main

# Verifique se não há mudanças pendentes
git status
```

### 2. Executar o script
```bash
# Dar permissão de execução (apenas na primeira vez)
chmod +x git-backup-script.sh

# Executar o script
./git-backup-script.sh
```

### 3. Verificar o resultado
```bash
# Ver commits na main (deve mostrar apenas 2)
git log --oneline

# Ver commits no backup (deve mostrar todos)
git checkout backup
git log --oneline

# Voltar para main
git checkout main
```

## ⚠️ Requisitos e Segurança

### ✅ O script verifica automaticamente:
- Se você está na branch `main`
- Se não há mudanças não commitadas
- Se há pelo menos 2 commits

### 🔒 Segurança:
- **NUNCA** perde commits - todos ficam na branch `backup`
- Faz backup antes de qualquer alteração
- Mostra resumo detalhado das ações

## 📋 Exemplo de uso

```bash
# Situação inicial: 5 commits na main
$ git log --oneline
abc1234 Commit mais recente
def5678 Commit 2
ghi9012 Commit 3
jkl3456 Commit 4
mno7890 Commit mais antigo

# Executar o script
$ ./git-backup-script.sh

# Resultado: main tem apenas 2 commits
$ git log --oneline
abc1234 Commit mais recente
def5678 Commit 2

# Branch backup tem todos os 5 commits
$ git checkout backup
$ git log --oneline
abc1234 Commit mais recente
def5678 Commit 2
ghi9012 Commit 3
jkl3456 Commit 4
mno7890 Commit mais antigo
```

## 🆘 Em caso de problemas

### Se algo der errado:
1. **NÃO PANIQUE** - seus commits estão seguros na branch `backup`
2. Execute: `git checkout backup` para ver todos os commits
3. Execute: `git checkout main` para voltar à main
4. Os commits antigos ainda estão lá, só não visíveis

### Para reverter completamente:
```bash
# Voltar para backup
git checkout backup

# Recriar main a partir do backup
git checkout -b main-new
git checkout main
git reset --hard backup
```

## 💡 Dicas importantes

- **Sempre** execute na branch `main`
- **Sempre** faça commit das mudanças antes de executar
- Use `git log --oneline` para verificar o resultado
- A branch `backup` é sua "rede de segurança"

## 🔄 Reutilização

O script pode ser executado múltiplas vezes:
- Se a branch `backup` já existir, ela será atualizada
- Cada execução mantém apenas os 2 commits mais recentes na main
- Todos os commits antigos ficam preservados no backup
