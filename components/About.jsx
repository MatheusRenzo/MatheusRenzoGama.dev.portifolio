const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Sobre Mim</h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna 1 - Informações Pessoais */}
          <div className="lg:col-span-1">
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 w-24 flex-shrink-0">Nome:</span>
                  <span className="text-gray-800">Matheus Renzo Gama</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 w-24 flex-shrink-0">Localização:</span>
                  <span className="text-gray-800">São Paulo, SP, Brasil</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 w-24 flex-shrink-0">tipo:</span>
                  <span className="text-success font-medium">Full-time, free lance</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 w-24 flex-shrink-0">Idiomas:</span>
                  <span className="text-gray-800">Português (Nativo), Inglês (Intermediário)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-gray-700 w-24 flex-shrink-0">Status:</span>
                  <span className="text-success font-medium">Online e disponível</span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/MatheusRenzo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-center"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          
          {/* Coluna 2 - Resumo Profissional */}
          <div className="lg:col-span-2">
            <div className="bg-light p-6 rounded-lg custom-shadow mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumo Profissional</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Sou um desenvolvedor backend focado em Python e integração de APIs. Tenho experiência sólida 
                com plataformas de e-commerce como VTEX, além de habilidades em automações, 
                bots e desenvolvimento de sistemas.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Minha jornada na tecnologia começou com eletrônica e evoluiu para desenvolvimento de software, 
                onde encontrei minha verdadeira paixão. Sou conhecido por criar soluções robustas e eficientes 
                que resolvem problemas reais dos negócios.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Meu foco é entregar soluções escaláveis</strong> e eficientes. Atualmente focado em Python, 
                integração de APIs VTEX e desenvolvimento backend, sempre buscando aprender novas tecnologias.
              </p>
            </div>

            {/* Formação Acadêmica */}
            <div className="bg-light p-6 rounded-lg custom-shadow mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Formação Acadêmica</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-800">Tecnólogo em Análise e Desenvolvimento de Sistemas</h4>
                  <p className="text-gray-600">Universidade São Judas Tadeu</p>
                  <p className="text-gray-500 text-sm">2024–2026 • Em andamento</p>
                  <p className="text-gray-700 text-sm mt-2">
                    Foco em desenvolvimento de software, arquitetura de sistemas e metodologias ágeis.
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h4 className="font-semibold text-gray-800">Técnico em Eletrônica</h4>
                  <p className="text-gray-600">ETEC Prof. Aprígio Gonzaga</p>
                  <p className="text-gray-500 text-sm">2017–2020 • Concluído</p>
                  <p className="text-gray-700 text-sm mt-2">
                    Base sólida em eletrônica e sistemas embarcados que fundamentou minha transição para TI.
                  </p>
                </div>
              </div>
            </div>

            {/* Certificações e Cursos */}
            <div className="bg-light p-6 rounded-lg custom-shadow mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Certificações e Cursos</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-800">VTEX IO Developer</h4>
                  <p className="text-gray-600 text-sm">VTEX • 2023</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-800">Python for Automation</h4>
                  <p className="text-gray-600 text-sm">Coursera • 2021</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-800">Node.js Basics</h4>
                  <p className="text-gray-600 text-sm">Udemy • 2022</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-800">React Fundamentals</h4>
                  <p className="text-gray-600 text-sm">Pluralsight • 2021</p>
                </div>
              </div>
            </div>

            {/* Objetivos Profissionais */}
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Objetivos Profissionais</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Desenvolver soluções backend robustas e eficientes</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Especializar-me em Python e integração de APIs</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Contribuir para projetos open source</span>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span className="text-gray-700">Criar produtos que melhorem a experiência do usuário</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Habilidades Técnicas Detalhadas */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Habilidades Técnicas Detalhadas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold mb-4 text-gray-800 text-center">Backend Development</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Python (Principal)</li>
                <li>• Node.js (Básico)</li>
                <li>• APIs RESTful</li>
                <li>• Automação</li>
                <li>• Scripts</li>
                <li>• Web Scraping</li>
              </ul>
            </div>
            
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold mb-4 text-gray-800 text-center">Frontend Development</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• React.js (Básico)</li>
                <li>• JavaScript</li>
                <li>• HTML5 & CSS3</li>
                <li>• Tailwind CSS</li>
                <li>• Responsive Design</li>
              </ul>
            </div>
            
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold mb-4 text-gray-800 text-center">E-commerce & APIs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• VTEX IO Platform</li>
                <li>• API Integration</li>
                <li>• Payment Systems</li>
                <li>• Inventory Management</li>
                <li>• Order Processing</li>
              </ul>
            </div>
            
            <div className="bg-light p-6 rounded-lg custom-shadow">
              <h4 className="font-semibold mb-4 text-gray-800 text-center">DevOps & Tools</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Git & GitHub</li>
                <li>• Docker (Básico)</li>
                <li>• Linux (Básico)</li>
                <li>• VS Code</li>
                <li>• Postman</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Destaques Técnicos */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Destaques Técnicos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-3 text-blue-800 text-center">Automação de Processos</h4>
              <p className="text-blue-700 text-sm text-center">
                Desenvolvi scripts Python que reduziram o tempo de processamento de dados em 40%.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3 text-green-800 text-center">Integração VTEX</h4>
              <p className="text-green-700 text-sm text-center">
                Experiência em desenvolvimento de aplicações VTEX IO e integração de APIs.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h4 className="font-semibold mb-3 text-purple-800 text-center">Web Scraping</h4>
              <p className="text-purple-700 text-sm text-center">
                Criação de bots e scripts para coleta e análise de dados web.
              </p>
            </div>
          </div>
        </div>

        {/* Filosofia de Trabalho */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Filosofia de Trabalho</h3>
            <p className="text-gray-700 text-lg italic leading-relaxed max-w-3xl mx-auto">
              "Transformando processos em soluções eficientes com Python. Acredito que a tecnologia deve 
              simplificar, não complicar. Cada linha de código deve ter um propósito claro e resolver 
              um problema real do negócio."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;