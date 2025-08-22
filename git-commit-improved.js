const { execSync } = require('child_process');

try {
  console.log('🔄 Fazendo commit das melhorias no componente de teste...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('✅ Arquivos adicionados!');
  console.log('');
  
  console.log('🔄 Fazendo commit...');
  execSync('git commit -m "Improve Speed Insights test component with better debugging"', { stdio: 'inherit' });
  
  console.log('✅ Commit realizado!');
  console.log('');
  
  console.log('🚀 Fazendo push para o GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Push realizado com sucesso!');
  console.log('');
  console.log('🎉 Deploy iniciado! O Vercel fará o deploy automaticamente.');
  console.log('📱 Acompanhe o progresso em: https://vercel.com/dashboard');
  console.log('');
  console.log('🧪 Após o deploy, recarregue a página e veja os logs melhorados no console');
  console.log('🔍 O componente agora captura mais informações sobre o que está acontecendo');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}
