#!/bin/bash

# Script para fazer backup dos commits e manter apenas os 2 últimos na main
# Autor: Matheus Renzo
# Data: $(date)

echo "🚀 Iniciando processo de backup e limpeza da branch main..."

# Verificar se estamos na branch main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Erro: Você deve estar na branch 'main' para executar este script"
    echo "Branch atual: $current_branch"
    echo "Execute: git checkout main"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erro: Há mudanças não commitadas. Faça commit ou stash antes de continuar."
    echo "Status atual:"
    git status
    exit 1
fi

# Verificar se há pelo menos 2 commits
commit_count=$(git rev-list --count HEAD)
if [ "$commit_count" -lt 2 ]; then
    echo "❌ Erro: É necessário ter pelo menos 2 commits para executar este script"
    echo "Commits atuais: $commit_count"
    exit 1
fi

echo "📊 Total de commits na branch main: $commit_count"

# Criar branch backup se não existir
if git show-ref --verify --quiet refs/heads/backup; then
    echo "⚠️  Branch 'backup' já existe. Fazendo checkout..."
    git checkout backup
    git merge main --no-edit
    echo "✅ Branch 'backup' atualizada com sucesso"
else
    echo "🔄 Criando branch 'backup' com todos os commits..."
    git checkout -b backup
    echo "✅ Branch 'backup' criada com sucesso"
fi

# Voltar para main
git checkout main

# Fazer reset para manter apenas os 2 últimos commits
echo "🧹 Fazendo reset da branch main para manter apenas os 2 últimos commits..."
git reset --hard HEAD~2

echo "✅ Processo concluído com sucesso!"
echo ""
echo "📋 Resumo das ações:"
echo "   • Branch 'backup' criada/atualizada com todos os commits"
echo "   • Branch 'main' resetada para manter apenas os 2 últimos commits"
echo "   • Total de commits movidos para backup: $((commit_count - 2))"
echo ""
echo "🔍 Para verificar:"
echo "   • Commits na main: git log --oneline"
echo "   • Commits no backup: git checkout backup && git log --oneline"
echo "   • Voltar para main: git checkout main"
echo ""
echo "⚠️  ATENÇÃO: Os commits removidos da main estão seguros na branch 'backup'"
