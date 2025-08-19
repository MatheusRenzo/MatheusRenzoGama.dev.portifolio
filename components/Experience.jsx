const Experience = () => {
  const experiences = [
    {
      title: "Analista de E-commerce",
      company: "TRACK&FIELD",
      period: "11 meses",
      location: "São Paulo, SP",
      description: "Desenvolvimento e manutenção de soluções e-commerce, automação de processos e integração de sistemas VTEX.",
      technologies: ["VTEX IO", "Python", "JavaScript", "APIs REST", "Git"],
      achievements: [
        "Desenvolvi aplicações VTEX IO para otimização de performance",
        "Implementei automações Python que reduziram 40% do tempo de processamento",
        "Criei integrações com sistemas ERP via APIs",
        "Mantive scripts de automação para sincronização de dados",
        "Colaborei com equipe de 8 desenvolvedores em metodologia ágil"
      ]
    },
    {
      title: "Técnico de Instalação",
      company: "Solução Comércio e Manutenção",
      period: "3 meses",
      location: "São Paulo, SP",
      description: "Instalação e configuração de sistemas de automação comercial.",
      technologies: ["Sistemas POS", "Redes", "Hardware", "Windows Server"],
      achievements: [
        "Instalei e configurei sistemas POS em mais de 20 estabelecimentos",
        "Realizei manutenção preventiva e corretiva em equipamentos",
        "Configurei redes locais e conectividade com sistemas centrais",
        "Treinei usuários finais no uso dos sistemas instalados"
      ]
    },
    {
      title: "Estoquista Extra",
      company: "Osklen",
      period: "3 meses",
      location: "São Paulo, SP",
      description: "Gestão de estoque e logística em ambiente de varejo.",
      technologies: ["Sistemas ERP", "Excel", "Gestão de Estoque"],
      achievements: [
        "Gerenciou estoque de produtos de moda em loja de alto padrão",
        "Implementou melhorias no controle de inventário",
        "Colaborou com equipe de vendas para otimização de processos",
        "Participou de inventários e auditorias de estoque"
      ]
    },
    {
      title: "Técnico de Suporte e Desenvolvimento de Servidores",
      company: "APS Tecnologia/CloudIce",
      period: "2 anos",
      location: "São Paulo, SP",
      description: "Suporte técnico especializado e desenvolvimento de infraestrutura de servidores.",
      technologies: ["Linux", "Windows Server", "Virtualização", "Redes", "Python"],
      achievements: [
        "Administrei servidores Linux e Windows em ambiente corporativo",
        "Desenvolvi scripts Python para automação de tarefas administrativas",
        "Implementei soluções de virtualização com VMware e Hyper-V",
        "Configurei e mantive redes corporativas e sistemas de backup",
        "Prestei suporte técnico para mais de 100 usuários",
        "Participei de projetos de migração de infraestrutura"
      ]
    }
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

        {/* Estatísticas de Carreira */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Estatísticas da Carreira</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Projetos Concluídos</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-600">Tecnologias Utilizadas</div>
            </div>
            <div className="bg-white p-6 rounded-lg custom-shadow text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfação do Cliente</div>
            </div>
          </div>
        </div>

        {/* Áreas de Especialização */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Áreas de Especialização</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold text-gray-800 mb-4 text-center">Desenvolvimento Backend</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Python & Scripts</span>
                  <span className="text-blue-600 font-medium">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Node.js & APIs</span>
                  <span className="text-blue-600 font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Banco de Dados</span>
                  <span className="text-blue-600 font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold text-gray-800 mb-4 text-center">E-commerce & Integração</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>VTEX IO Platform</span>
                  <span className="text-purple-600 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Integração de APIs</span>
                  <span className="text-purple-600 font-medium">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Automação</span>
                  <span className="text-purple-600 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold text-gray-800 mb-4 text-center">Frontend & Ferramentas</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>React.js</span>
                  <span className="text-green-600 font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>JavaScript</span>
                  <span className="text-green-600 font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span>Ferramentas</span>
                  <span className="text-green-600 font-medium">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;