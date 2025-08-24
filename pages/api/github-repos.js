export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const username = 'MatheusRenzo';
    
    // Busca repositórios com mais detalhes
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15&type=owner`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'portfolio-matheus-renzo'
      }
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
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
      api_status: 'success'
    };

    // Cache por 30 minutos (mais agressivo para evitar rate limits)
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=300');
    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    
    // Resposta de erro mais informativa
    res.status(500).json({ 
      message: 'Erro ao buscar repositórios do GitHub',
      error: error.message,
      api_status: 'error',
      timestamp: new Date().toISOString(),
      suggestion: 'Verificando se o usuário existe e se os repositórios são públicos'
    });
  }
}
