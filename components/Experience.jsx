const Experience = () => {
  const experiences = [
    {
      title: "Analista de E-commerce",
      company: "TRACK&FIELD",
      period: "Nov 2023 - Atual (11 meses)",
      location: "São Paulo, SP",
      description: "Desenvolvimento e manutenção de soluções e-commerce na plataforma VTEX, automação de processos e integração de sistemas. Responsável por implementar soluções escaláveis e otimizar performance em ambiente de alto volume de transações.",
      technologies: ["VTEX IO", "Python", "JavaScript", "TypeScript", "APIs REST", "Node.js", "Git", "AWS", "GraphQL"],
      achievements: [
        "Implementei automações Python que reduziram 70% do tempo de processamento de dados de inventário e cadastro de produtos",
        "Mantive e aprimorei scripts de automação para sincronização de dados entre múltiplos sistemas",
        "Desenvolvi soluções de monitoramento que reduziram incidentes de produção em 30%",
        "Criei soluções que coletavam dados de logística em tempo real para otimização de processos",
        "Desenvolvi um sistema completo de gerenciamento do módulo de logística da VTEX",
      ]
    },
      {
      title: "Técnico de Suporte",
      company: "APS Tecnologia/CloudIce",
      period: "Janeiro 2021 - FREELANCE",
      location: "São Paulo, SP",
      description: "Atuei como técnico de suporte, oferecendo manutenção e suporte para VPS (Servidores Privados Virtuais) da APS Tecnologia e da plataforma CloudIce. Minha função incluía garantir que os servidores estivessem sempre estáveis e funcionando bem, solucionando problemas técnicos de forma rápida para evitar interrupções.",
      technologies: ["Linux", "Windows Server", "VPS", "Monitoramento", "Troubleshooting", "Manutenção Preventiva"],
      achievements: [
        "Mantive 99% de uptime dos servidores VPS da APS Tecnologia",
        "Solucionei problemas técnicos críticos em tempo médio de 15 minutos",
        "Implementei rotinas de monitoramento para detecção proativa de falhas",
        "Realizei manutenções preventivas que reduziram incidentes em 40%",
        "Ofereci suporte técnico 24/7 para garantir estabilidade dos serviços",
        "Documentei procedimentos que agilizaram processos de resolução de problemas"
      ]
    },
    
  ];

  return (
    <section id="experience" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Experiência Profissional</h2>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg custom-shadow p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Timeline Indicator */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                      <span className="font-semibold text-blue-600">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Tecnologias Utilizadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Principais Conquistas:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <span className="text-blue-600 mr-3 mt-1 text-sm">✓</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;