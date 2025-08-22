const { execSync } = require('child_process');

try {
  console.log('🔄 Fazendo commit final removendo o componente de teste...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('✅ Arquivos adicionados!');
  console.log('');
  
  console.log('🔄 Fazendo commit...');
  execSync('git commit -m "Remove Speed Insights test component - main component working in _app.js"', { stdio: 'inherit' });
  
  console.log('✅ Commit realizado!');
  console.log('');
  
  console.log('🚀 Fazendo push para o GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Push realizado com sucesso!');
  console.log('');
  console.log('🎉 Deploy iniciado! O Vercel fará o deploy automaticamente.');
  console.log('📱 Acompanhe o progresso em: https://vercel.com/dashboard');
  console.log('');
  console.log('✅ Speed Insights agora está configurado corretamente no _app.js');
  console.log('🔍 Após o deploy, verifique se está funcionando em produção');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}
