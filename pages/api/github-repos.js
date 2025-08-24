import { githubConfig } from '../../lib/github-config';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Logs de debug para verificar a configuração
  console.log('🔍 Debug GitHub Config:');
  console.log('- Token configurado:', githubConfig.hasToken());
  console.log('- Token length:', githubConfig.token ? githubConfig.token.length : 0);
  console.log('- Token start:', githubConfig.token ? githubConfig.token.substring(0, 10) + '...' : 'N/A');
  console.log('- Headers:', githubConfig.getHeaders());
  console.log('- Rate limit info:', githubConfig.getRateLimitInfo());

  // Cache mais agressivo para evitar rate limits
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=1800, max-age=1800');

  try {
    const username = githubConfig.username;
    
    // Busca repositórios com mais detalhes
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15&type=owner`, {
      headers: githubConfig.getHeaders()
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        // Rate limit atingido - retorna dados em cache se disponível
        console.warn('GitHub API rate limit exceeded, using cached data if available');
        
        // Aqui você pode implementar um cache mais robusto (Redis, banco de dados, etc.)
        // Por enquanto, retorna um erro mais específico
        return res.status(429).json({
          message: 'Rate limit exceeded. Please try again later.',
          error: 'GitHub API rate limit exceeded',
          api_status: 'rate_limited',
          retry_after: '1 hour',
          suggestion: githubConfig.hasToken() 
            ? 'Token configurado, verifique se ainda é válido'
            : 'Configure GITHUB_TOKEN para aumentar o limite de 60 para 5000 requisições/hora',
          timestamp: new Date().toISOString(),
          rate_limit_info: githubConfig.getRateLimitInfo()
        });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filtra e formata os repositórios
    const formattedRepos = repos
      .filter(repo => !repo.fork && !repo.private && repo.size > 0) // Remove forks, privados e vazios
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'Projeto desenvolvido com foco em automação e eficiência.',
        html_url: repo.html_url,
        language: repo.language || 'Outros',
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        topics: repo.topics || [],
        homepage: repo.homepage,
        size: repo.size,
        open_issues_count: repo.open_issues_count,
        default_branch: repo.default_branch,
        archived: repo.archived,
        disabled: repo.disabled
      }))
      .sort((a, b) => {
        // Prioriza por: stars, atualização recente, tamanho
        if (a.stargazers_count !== b.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 12); // Limita a 12 repositórios

    // Adiciona informações de cache e status
    const responseData = {
      repos: formattedRepos,
      total_count: formattedRepos.length,
      fetched_at: new Date().toISOString(),
      user: username,
      api_status: 'success',
      rate_limit_info: githubConfig.getRateLimitInfo(),
      has_token: githubConfig.hasToken()
    };

    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    
    // Resposta de erro mais informativa
    res.status(500).json({ 
      message: 'Erro ao buscar repositórios do GitHub',
      error: error.message,
      api_status: 'error',
      timestamp: new Date().toISOString(),
      suggestion: 'Verificando se o usuário existe e se os repositórios são públicos',
      rate_limit_info: githubConfig.getRateLimitInfo(),
      has_token: githubConfig.hasToken()
    });
  }
}
