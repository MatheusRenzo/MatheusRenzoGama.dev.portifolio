import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // Projetos estáticos como fallback - alinhados com o perfil profissional
  const fallbackProjects = [
    {
      title: "Portfólio Matheus Renzo",
      description: "Portfólio pessoal desenvolvido com Next.js, React e Tailwind CSS. Apresenta projetos, experiências e habilidades de forma moderna e responsiva.",
      technologies: ["Next.js", "React", "Tailwind CSS", "JavaScript", "CSS3"],
      github: "https://github.com/MatheusRenzo/portfolio-matheus-renzo",
      category: "Portfólio & Web",
      stars: "⭐",
      language: "JavaScript",
      featured: true
    },
    {
      title: "VTEX Master Data Integration",
      description: "Sistema de integração e sincronização de dados master para plataformas VTEX. Automatiza sincronização de produtos, categorias e configurações com redução de 70% no tempo de processamento.",
      technologies: ["Python", "VTEX API", "GraphQL", "PostgreSQL", "Docker"],
      github: "https://github.com/MatheusRenzo/vtex-master-data-integration",
      category: "VTEX & E-commerce",
      stars: "⭐",
      language: "Python",
      featured: true
    },
    {
      title: "VTEX Docs Monitor System",
      description: "Sistema de monitoramento e alertas para documentação VTEX com notificações automáticas. Reduziu incidentes de produção em 30%.",
      technologies: ["Python", "VTEX IO", "Web Scraping", "FastAPI", "Redis"],
      github: "https://github.com/MatheusRenzo/vtex-docs-monitor-system",
      category: "VTEX & E-commerce",
      stars: "⭐",
      language: "Python",
      featured: true
    },
    {
      title: "SKU Image Exporter",
      description: "Ferramenta para exportação e gerenciamento de imagens de SKUs em plataformas e-commerce. Otimiza workflow de produtos com automação Python.",
      technologies: ["Python", "Pillow", "VTEX API", "AWS S3", "Docker"],
      github: "https://github.com/MatheusRenzo/sku-image-exporter",
      category: "E-commerce Tools",
      stars: "⭐",
      language: "Python",
      featured: false
    },
    {
      title: "PageSpeed Dashboard",
      description: "Dashboard para monitoramento de performance web com métricas Core Web Vitals. Desenvolvido com Streamlit e integração Google PageSpeed API.",
      technologies: ["Python", "Streamlit", "Google PageSpeed API", "PostgreSQL"],
      github: "https://github.com/MatheusRenzo/pagespeed-dashboard",
      category: "Performance & Analytics",
      stars: "⭐",
      language: "Python",
      featured: false
    },
    {
      title: "Web Performance Analyzer",
      description: "Analisador avançado de performance web com foco em métricas de usuário real. Implementa Web Vitals e análise de dados em tempo real.",
      technologies: ["JavaScript", "Node.js", "Web Vitals", "MongoDB", "Express"],
      github: "https://github.com/MatheusRenzo/web-performance-analyzer",
      category: "Performance & Analytics",
      stars: "⭐",
      language: "JavaScript",
      featured: false
    },
    {
      title: "E-commerce Automation Suite",
      description: "Suite completa de automação para e-commerce incluindo sincronização de estoque, preços e catálogos. Reduziu tempo de operação em 60%.",
      technologies: ["Python", "Selenium", "VTEX API", "Shopify API", "PostgreSQL"],
      github: "https://github.com/MatheusRenzo/ecommerce-automation-suite",
      category: "E-commerce Tools",
      stars: "⭐",
      language: "Python",
      featured: false
    },
    {
      title: "VTEX Logistics Manager",
      description: "Sistema completo de gerenciamento do módulo de logística VTEX com tracking em tempo real e otimização de rotas.",
      technologies: ["Python", "VTEX IO", "React", "Node.js", "PostgreSQL"],
      github: "https://github.com/MatheusRenzo/vtex-logistics-manager",
      category: "VTEX & E-commerce",
      stars: "⭐",
      language: "Python",
      featured: false
    }
  ];

  // Função para determinar categoria baseada no nome e descrição
  const getCategory = (repo) => {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    
    if (name.includes('vtex') || description.includes('vtex')) {
      return 'VTEX & E-commerce';
    }
    if (name.includes('performance') || name.includes('pagespeed') || description.includes('performance')) {
      return 'Performance & Analytics';
    }
    if (name.includes('sku') || name.includes('ecommerce') || description.includes('e-commerce') || name.includes('automation')) {
      return 'E-commerce Tools';
    }
    if (name.includes('portfolio') || name.includes('site')) {
      return 'Portfólio & Web';
    }
    return 'Outros';
  };

  // Função para mapear linguagens para tecnologias
  const getTechnologies = (repo) => {
    const techs = [];
    
    if (repo.language) {
      techs.push(repo.language);
    }
    
    // Adiciona tecnologias baseadas na linguagem
    if (repo.language === 'Python') {
      techs.push('Python', 'API', 'Automation');
    } else if (repo.language === 'JavaScript') {
      techs.push('JavaScript', 'Web', 'Frontend');
    } else if (repo.language === 'HTML') {
      techs.push('HTML', 'CSS', 'Web');
    }
    
    // Adiciona tecnologias baseadas nos topics
    if (repo.topics) {
      techs.push(...repo.topics.slice(0, 3));
    }
    
    return techs.slice(0, 5); // Limita a 5 tecnologias
  };

  // Busca repositórios do GitHub
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setConnectionStatus('connecting');
        
        const response = await fetch('/api/github-repos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repos');
        }
        
        const data = await response.json();
        
        // Verifica se a API retornou dados válidos
        if (data.api_status === 'error') {
          throw new Error(data.message || 'Erro na API');
        }
        
        // Extrai repositórios da resposta
        const reposData = data.repos || data;
        
        // Converte repositórios para o formato dos projetos
        const formattedRepos = reposData.map(repo => ({
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || 'Projeto desenvolvido com foco em automação e eficiência.',
          technologies: getTechnologies(repo),
          github: repo.html_url,
          category: getCategory(repo),
          stars: repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count}` : '⭐',
          language: repo.language || 'Outros',
          updated: repo.updated_at,
          forks: repo.forks_count,
          size: repo.size,
          featured: false
        }));
        
        setRepos(formattedRepos);
        setError(null);
        setConnectionStatus('connected');
        setLastUpdated(new Date().toLocaleString('pt-BR'));
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('Erro ao carregar repositórios do GitHub');
        setConnectionStatus('error');
        // Usa projetos estáticos como fallback
        setRepos(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const categories = ["Todos", "Portfólio & Web", "VTEX & E-commerce", "E-commerce Tools", "Performance & Analytics", "Outros"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtra projetos por categoria
  const filteredProjects = selectedCategory === "Todos" 
    ? repos 
    : repos.filter(project => project.category === selectedCategory);

  // Separa projetos em destaque e regulares
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Projetos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uma seleção dos meus projetos mais relevantes, focados em automação VTEX, 
            ferramentas e-commerce e análise de performance web. Cada projeto demonstra 
            minha expertise em Python, APIs e soluções escaláveis.
          </p>
        </motion.div>

        {/* Status de Conexão com GitHub */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              {/* Indicador de Status */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-spin' :
                  'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {connectionStatus === 'connected' ? 'Conectado ao GitHub' :
                   connectionStatus === 'connecting' ? 'Conectando...' :
                   'Erro na conexão'}
                </span>
              </div>
              
              {/* Última atualização */}
              {lastUpdated && (
                <div className="text-xs text-gray-500 border-l border-gray-300 pl-3">
                  Atualizado: {lastUpdated}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <p className="mt-2 text-gray-600">Carregando projetos do GitHub...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && !loading && (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-gray-600 text-sm">Usando projetos estáticos como fallback</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projetos em Destaque */}
        {!loading && featuredProjects.length > 0 && (
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mb-6 text-center"
              variants={itemVariants}
            >
              Projetos em Destaque
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={`featured-${index}`} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-200 relative"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Badge de Destaque */}
                  <motion.div 
                    className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    Destaque
                  </motion.div>
                  
                  {/* Header do Card */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-500">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-gray-600">{project.language}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{project.category}</span>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + techIndex * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Link GitHub */}
                    <motion.a 
                      href={project.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Ver no GitHub →
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid de Projetos Regulares */}
        {!loading && (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {regularProjects.map((project, index) => (
              <motion.div 
                key={`regular-${index}`} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Header do Card */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-500">{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-gray-600">{project.language}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{project.category}</span>
                  </div>
                </div>

                {/* Descrição */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Link GitHub */}
                  <motion.a 
                    href={project.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Ver no GitHub →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA GitHub */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a 
            href="https://github.com/MatheusRenzo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Ver todos os projetos no GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;