// Configuração do GitHub API
export const githubConfig = {
  // Token de acesso pessoal do GitHub (GITHUB_TOKEN)
  // Para criar: https://github.com/settings/tokens
  // Permissões necessárias: public_repo, read:user
  token: process.env.GITHUB_TOKEN || null,
  
  // Usuário do GitHub
  username: 'MatheusRenzo',
  
  // Headers padrão para a API
  getHeaders: () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-matheus-renzo'
    };
    
    // Adiciona token se disponível
    if (githubConfig.token) {
      headers['Authorization'] = `token ${githubConfig.token}`;
    }
    
    return headers;
  },
  
  // Verifica se tem token configurado
  hasToken: () => !!githubConfig.token,
  
  // Rate limits baseados na configuração
  getRateLimitInfo: () => {
    return githubConfig.hasToken() 
      ? { limit: 5000, window: '1 hour' }
      : { limit: 60, window: '1 hour' };
  }
};
