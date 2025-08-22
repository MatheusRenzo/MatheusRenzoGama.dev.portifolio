const { execSync } = require('child_process');

try {
  console.log('🔄 Fazendo commit das mudanças de teste...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('✅ Arquivos adicionados!');
  console.log('');
  
  console.log('🔄 Fazendo commit...');
  execSync('git commit -m "Add Speed Insights test component"', { stdio: 'inherit' });
  
  console.log('✅ Commit realizado!');
  console.log('');
  
  console.log('🚀 Fazendo push para o GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Push realizado com sucesso!');
  console.log('');
  console.log('🎉 Deploy iniciado! O Vercel fará o deploy automaticamente.');
  console.log('📱 Acompanhe o progresso em: https://vercel.com/dashboard');
  console.log('');
  console.log('🧪 Após o deploy, você verá o componente de teste na página inicial');
  console.log('🔍 Abra o console do navegador (F12) para ver os logs de teste');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}
