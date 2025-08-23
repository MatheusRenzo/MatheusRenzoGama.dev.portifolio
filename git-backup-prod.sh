#!/bin/bash

# Script para manter apenas o último commit (produção) na main
# e mover todos os commits anteriores para a branch backup
# Autor: Matheus Renzo
# Data: $(date)

echo "🚀 Iniciando processo de backup - mantendo apenas o último commit (produção) na main..."

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

# Mostrar os commits atuais
echo "📋 Commits atuais na main:"
git log --oneline -5

# Obter o hash do último commit (que será mantido na main)
last_commit_hash=$(git rev-parse HEAD)
last_commit_message=$(git log -1 --pretty=format:"%s")

echo ""
echo "🎯 Último commit que será mantido na main:"
echo "   Hash: $last_commit_hash"
echo "   Mensagem: $last_commit_message"
echo ""

# Confirmar com o usuário
read -p "⚠️  Confirma que quer manter apenas este commit na main? (y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "❌ Operação cancelada pelo usuário"
    exit 0
fi

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

# Fazer reset para manter apenas o último commit
echo "🧹 Fazendo reset da branch main para manter apenas o último commit (produção)..."
git reset --hard HEAD~1

echo "✅ Processo concluído com sucesso!"
echo ""
echo "📋 Resumo das ações:"
echo "   • Branch 'backup' criada/atualizada com todos os commits"
echo "   • Branch 'main' resetada para manter apenas o último commit (produção)"
echo "   • Total de commits movidos para backup: $((commit_count - 1))"
echo ""
echo "🔍 Para verificar:"
echo "   • Commits na main (deve mostrar apenas 1): git log --oneline"
echo "   • Commits no backup (deve mostrar todos): git checkout backup && git log --oneline"
echo "   • Voltar para main: git checkout main"
echo ""
echo "⚠️  ATENÇÃO: O último commit (produção) está na main, todos os outros estão seguros na branch 'backup'"
