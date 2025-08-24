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
    // Dados dos projetos fornecidos pelo usuário
    const staticProjects = [
      {
        id: 1,
        name: "MatheusRenzo",
        full_name: "MatheusRenzo/MatheusRenzo",
        description: "💻 Desenvolvedor full-stack apaixonado por tecnologia, automação e e-commerce. Aqui compartilho projetos, scripts e soluções inovadoras em Python, VTEX e mais. Sempre aprendendo, criando e evoluindo no mundo dev!",
        html_url: "https://github.com/MatheusRenzo/MatheusRenzo",
        language: "Outros",
        stargazers_count: 1,
        forks_count: 0,
        updated_at: "2025-08-24T06:43:35Z",
        created_at: "2025-07-23T01:34:20Z",
        topics: [],
        homepage: "",
        size: 32,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "VTEX & E-commerce",
        featured: true
      },
      {
        id: 2,
        name: "MatheusRenzoGama.dev.portifolio",
        full_name: "MatheusRenzo/MatheusRenzoGama.dev.portifolio",
        description: "Portfólio online de Matheus Gama. Um espaço criado para reunir projetos, ideias e experiências desenvolvidas ao longo da trajetória como profissional de tecnologia. Este repositório serve como vitrine organizada, permitindo acompanhar de forma clara e objetiva a evolução e o estilo de trabalho.",
        html_url: "https://github.com/MatheusRenzo/MatheusRenzoGama.dev.portifolio",
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-08-24T15:36:22Z",
        created_at: "2025-08-24T02:39:01Z",
        topics: [],
        homepage: "https://matheus-renzo-gama-dev-portifolio.vercel.app",
        size: 187,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "Portfólio & Web",
        featured: true
      },
      {
        id: 3,
        name: "vtex-docs-monitor-system",
        full_name: "MatheusRenzo/vtex-docs-monitor-system",
        description: "Dock Monitor é uma aplicação Python que automatiza o monitoramento diário das docas das lojas via VTEX. salva em planilhas Excel, exibe informações em terminal visual com Rich e permite agendamento automático às 8h. Seguro, fácil de configurar e ideal para controle eficiente do uso das docas.",
        html_url: "https://github.com/MatheusRenzo/vtex-docs-monitor-system",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-08-24T06:40:43Z",
        created_at: "2025-07-10T15:40:47Z",
        topics: [],
        homepage: "",
        size: 7,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "VTEX & E-commerce",
        featured: true
      },
      {
        id: 4,
        name: "sku-image-exporter",
        full_name: "MatheusRenzo/sku-image-exporter",
        description: "Ferramenta para exportar imagens de SKUs de forma automatizada, ideal para catálogos e e-commerces.",
        html_url: "https://github.com/MatheusRenzo/sku-image-exporter",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-07-10T18:13:59Z",
        created_at: "2025-07-10T01:51:14Z",
        topics: [],
        homepage: null,
        size: 17,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "E-commerce Tools",
        featured: false
      },
      {
        id: 5,
        name: "pagespeed-dashboard",
        full_name: "MatheusRenzo/pagespeed-dashboard",
        description: "🚀 Projeto para análise automatizada de desempenho de sites utilizando PageSpeed Insights e interface gráfica em Python",
        html_url: "https://github.com/MatheusRenzo/pagespeed-dashboard",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-07-10T02:04:24Z",
        created_at: "2025-07-10T00:36:31Z",
        topics: [],
        homepage: null,
        size: 16,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "Performance & Analytics",
        featured: false
      },
      {
        id: 6,
        name: "web-performance-analyzer",
        full_name: "MatheusRenzo/web-performance-analyzer",
        description: "Aplicativo para análise de desempenho web",
        html_url: "https://github.com/MatheusRenzo/web-performance-analyzer",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-07-09T19:54:04Z",
        created_at: "2025-07-09T19:01:05Z",
        topics: [],
        homepage: null,
        size: 7,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "Performance & Analytics",
        featured: false
      },
      {
        id: 7,
        name: "vtex-master-data-integration",
        full_name: "MatheusRenzo/vtex-master-data-integration",
        description: "Exemplo de integração Python com a API VTEX para atualização em massa de clientes via planilha e interface Streamlit.",
        html_url: "https://github.com/MatheusRenzo/vtex-master-data-integration",
        language: "Python",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-06-23T04:38:13Z",
        created_at: "2025-06-23T03:00:06Z",
        topics: [],
        homepage: null,
        size: 593,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "VTEX & E-commerce",
        featured: false
      },
      {
        id: 8,
        name: "site-de-performance",
        full_name: "MatheusRenzo/site-de-performance",
        description: "Projeto desenvolvido com foco em automação e eficiência.",
        html_url: "https://github.com/MatheusRenzo/site-de-performance",
        language: "HTML",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2025-06-23T04:25:36Z",
        created_at: "2025-06-18T17:52:22Z",
        topics: [],
        homepage: null,
        size: 500,
        open_issues_count: 0,
        default_branch: "main",
        archived: false,
        disabled: false,
        category: "Performance & Analytics",
        featured: false
      }
    ];

    // Filtra e formata os repositórios
    const formattedRepos = staticProjects
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
        disabled: repo.disabled,
        category: repo.category,
        featured: repo.featured
      }))
      .sort((a, b) => {
        // Sistema de pontuação para ordenação inteligente
        const getScore = (repo) => {
          let score = 0;
          
          // Projetos em destaque têm prioridade máxima
          if (repo.featured) score += 1000;
          
          // Pontuação por estrelas (cada estrela = 100 pontos)
          score += repo.stargazers_count * 100;
          
          // Pontuação por forks (cada fork = 50 pontos)
          score += repo.forks_count * 50;
          
          // Pontuação por data de criação (projetos mais novos ganham pontos)
          const daysSinceCreation = (new Date() - new Date(repo.created_at)) / (1000 * 60 * 60 * 24);
          score += Math.max(0, 365 - daysSinceCreation); // Máximo 365 pontos para projetos criados hoje
          
          // Pontuação por atualização recente (mais recente = mais pontos)
          const daysSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
          score += Math.max(0, 365 - daysSinceUpdate); // Máximo 365 pontos para projetos atualizados hoje
          
          // Pontuação por homepage (projetos com demo ganham pontos)
          if (repo.homepage) score += 50;
          
          // Pontuação por tamanho (projetos maiores podem indicar mais complexidade)
          score += Math.min(repo.size / 10, 100); // Máximo 100 pontos para projetos muito grandes
          
          // Pontuação por linguagem (prioriza tecnologias principais)
          if (repo.language === 'Python') score += 30;
          else if (repo.language === 'JavaScript') score += 25;
          else if (repo.language === 'TypeScript') score += 25;
          
          // Pontuação por categoria (prioriza categorias principais)
          if (repo.category === 'VTEX & E-commerce') score += 40;
          else if (repo.category === 'Portfólio & Web') score += 35;
          else if (repo.category === 'Performance & Analytics') score += 30;
          
          return Math.round(score); // Arredonda para números inteiros
        };
        
        const scoreA = getScore(a);
        const scoreB = getScore(b);
        
        // Ordena por pontuação (maior primeiro)
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
        
        // Em caso de empate, ordena por data de atualização (mais recente primeiro)
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

    // Adiciona informações de cache e status
    const responseData = {
      repos: formattedRepos,
      total_count: formattedRepos.length,
      fetched_at: new Date().toISOString(),
      user: "MatheusRenzo",
      api_status: 'success',
      rate_limit_info: githubConfig.getRateLimitInfo(),
      has_token: githubConfig.hasToken(),
      source: 'static_data'
    };

    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Resposta de erro mais informativa
    res.status(500).json({ 
      message: 'Erro ao buscar projetos',
      error: error.message,
      api_status: 'error',
      timestamp: new Date().toISOString(),
      suggestion: 'Verificando se os dados estão disponíveis',
      rate_limit_info: githubConfig.getRateLimitInfo(),
      has_token: githubConfig.hasToken()
    });
  }
}
