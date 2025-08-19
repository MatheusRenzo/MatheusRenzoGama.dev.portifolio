@echo off
echo 🚀 Iniciando deploy para o Vercel...
echo.

echo 📦 Fazendo build do projeto...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build! Verifique os erros acima.
    pause
    exit /b 1
)

echo ✅ Build concluído com sucesso!
echo.

echo 🔄 Fazendo commit das mudanças...
git add .
git commit -m "Deploy automático - %date% %time%"
if %errorlevel% neq 0 (
    echo ❌ Erro no commit! Verifique se há mudanças para commitar.
    pause
    exit /b 1
)

echo ✅ Commit realizado!
echo.

echo 🚀 Fazendo push para o GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Erro no push! Verifique sua conexão com o GitHub.
    pause
    exit /b 1
)

echo ✅ Push realizado com sucesso!
echo.
echo 🎉 Deploy iniciado! O Vercel fará o deploy automaticamente.
echo 📱 Acompanhe o progresso em: https://vercel.com/dashboard
echo.
echo 💡 Dica: O deploy pode levar alguns minutos para ser concluído.
echo.
pause
