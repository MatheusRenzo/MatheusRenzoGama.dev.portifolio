const Projects = () => {
  const projects = [
    {
      title: "VTEX Master Data Integration",
      description: "Sistema de integração e sincronização de dados master para plataformas VTEX. Automatiza a sincronização de produtos, categorias e configurações entre sistemas externos e VTEX IO.",
      technologies: ["Python", "VTEX API", "GraphQL", "PostgreSQL", "Docker"],
      features: [
        "Sincronização automática de produtos",
        "Gestão de categorias e atributos",
        "Monitoramento em tempo real",
        "API RESTful para integração"
      ],
      link: "https://github.com/MatheusRenzo/vtex-master-data-integration",
      github: "https://github.com/MatheusRenzo/vtex-master-data-integration",
      image: "vtex-integration",
      category: "VTEX & E-commerce"
    },
    {
      title: "VTEX Docs Monitor System",
      description: "Sistema de monitoramento e alertas para documentação VTEX. Rastreia mudanças, atualizações e disponibilidade de documentação técnica com notificações automáticas.",
      technologies: ["Python", "VTEX IO", "Web Scraping", "FastAPI", "Redis"],
      features: [
        "Monitoramento de documentação",
        "Alertas automáticos",
        "Dashboard de status",
        "Histórico de mudanças"
      ],
      link: "https://github.com/MatheusRenzo/vtex-docs-monitor-system",
      github: "https://github.com/MatheusRenzo/vtex-docs-monitor-system",
      image: "vtex-monitor",
      category: "VTEX & E-commerce"
    },
    {
      title: "SKU Image Exporter",
      description: "Ferramenta para exportação e gerenciamento de imagens de SKUs em plataformas e-commerce. Suporta múltiplos formatos e otimização automática de imagens.",
      technologies: ["Python", "Pillow", "VTEX API", "AWS S3", "Docker"],
      features: [
        "Exportação em lote",
        "Otimização automática",
        "Múltiplos formatos",
        "Integração VTEX"
      ],
      link: "https://github.com/MatheusRenzo/sku-image-exporter",
      github: "https://github.com/MatheusRenzo/sku-image-exporter",
      image: "sku-exporter",
      category: "E-commerce Tools"
    },
    {
      title: "PageSpeed Dashboard",
      description: "Dashboard para monitoramento de performance de páginas web com métricas Core Web Vitals. Acompanha PageSpeed Insights e Google Lighthouse em tempo real.",
      technologies: ["Python", "Streamlit", "Google PageSpeed API", "PostgreSQL", "Docker"],
      features: [
        "Métricas Core Web Vitals",
        "Relatórios automáticos",
        "Alertas de performance",
        "Histórico de métricas"
      ],
      link: "https://github.com/MatheusRenzo/pagespeed-dashboard",
      github: "https://github.com/MatheusRenzo/pagespeed-dashboard",
      image: "pagespeed-dashboard",
      category: "Performance & Analytics"
    },
    {
      title: "Web Performance Analyzer",
      description: "Analisador avançado de performance web com foco em métricas de usuário real. Coleta dados de performance de navegadores reais e gera insights detalhados.",
      technologies: ["JavaScript", "Node.js", "Web Vitals", "MongoDB", "Express"],
      features: [
        "Coleta de métricas reais",
        "Análise de tendências",
        "Relatórios personalizados",
        "API para integração"
      ],
      link: "https://github.com/MatheusRenzo/web-performance-analyzer",
      github: "https://github.com/MatheusRenzo/web-performance-analyzer",
      image: "performance-analyzer",
      category: "Performance & Analytics"
    },
    {
      title: "E-commerce Automation Suite",
      description: "Suite completa de automação para e-commerce incluindo gestão de estoque, processamento de pedidos e sincronização de dados entre plataformas.",
      technologies: ["Python", "VTEX API", "PostgreSQL", "Redis", "Docker"],
      features: [
        "Automação de estoque",
        "Processamento de pedidos",
        "Sincronização de dados",
        "Relatórios automáticos"
      ],
      link: "#",
      github: "#",
      image: "automation-suite",
      category: "E-commerce Tools"
    }
  ];

  const featuredProject = {
    title: "VTEX Master Data Integration",
    description: "Sistema robusto de integração e sincronização de dados master para plataformas VTEX. Este projeto representa a solução mais avançada para automação de processos e-commerce, permitindo sincronização em tempo real entre sistemas externos e VTEX IO.",
    technologies: ["Python", "VTEX API", "GraphQL", "PostgreSQL", "Docker", "Redis"],
    features: [
      "Sincronização automática de produtos com 99.5% de precisão",
      "Gestão inteligente de categorias e atributos personalizados",
      "Monitoramento em tempo real com alertas automáticos",
      "API RESTful completa para integração com sistemas externos",
      "Sistema de cache inteligente para otimização de performance",
      "Dashboard de monitoramento com métricas em tempo real",
      "Suporte a múltiplos ambientes (dev, staging, production)"
    ],
    metrics: [
      { label: "Produtos Sincronizados", value: "25K+", unit: "/dia" },
      { label: "Precisão", value: "99.5", unit: "%" },
      { label: "Tempo de Sincronização", value: "< 10", unit: "min" },
      { label: "Redução de Erros", value: "85", unit: "%" }
    ],
    link: "https://github.com/MatheusRenzo/vtex-master-data-integration",
    github: "https://github.com/MatheusRenzo/vtex-master-data-integration",
    category: "VTEX & E-commerce"
  };

  const projectCategories = [
    "Todos",
    "VTEX & E-commerce",
    "E-commerce Tools", 
    "Performance & Analytics"
  ];

  return (
    <section id="projects" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Projetos Destacados</h2>
        
        {/* Projeto em Destaque */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Projeto em Destaque</h3>
          <div className="bg-white rounded-lg custom-shadow overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <h4 className="text-3xl font-bold mb-2">{featuredProject.title}</h4>
                <p className="text-xl opacity-90">{featuredProject.category}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6 leading-relaxed">{featuredProject.description}</p>
              
              {/* Métricas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {featuredProject.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-light rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metric.value}{metric.unit}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Tecnologias */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Tecnologias Utilizadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Principais Funcionalidades:</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {featuredProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Links */}
              <div className="flex gap-4">
                <a 
                  href={featuredProject.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Ver Demo
                </a>
                <a 
                  href={featuredProject.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Ver Código
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Outros Projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden custom-shadow hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <p className="text-sm opacity-90">{project.category}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Funcionalidades:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1 text-xs">•</span>
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="bg-light px-2 py-1 rounded-full text-xs text-gray-700">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-light px-2 py-1 rounded-full text-xs text-gray-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                  >
                    Demo →
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-medium hover:text-gray-800 transition-colors text-sm"
                  >
                    Código →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Estatísticas dos Projetos */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Estatísticas dos Projetos</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Projetos Concluídos</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-600">Tecnologias Utilizadas</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Taxa de Entrega</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">Quer ver mais projetos?</p>
          <a 
            href="https://github.com/MatheusRenzo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Visite meu GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;