import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-16 overflow-hidden">
      {/* Animated Background Elements - Leves e Elegantes */}
      
      {/* Gradient Transition Layer - Transição suave do Hero para About */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 via-gray-700 via-gray-100 to-white pointer-events-none"></div>
      
      {/* Floating Particles - Efeito sutil */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Particle 1 */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-2 h-2 bg-blue-500/50 rounded-full blur-sm"
        ></motion.div>
        
        {/* Particle 2 */}
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-500/40 rounded-full blur-sm"
        ></motion.div>
        
        {/* Particle 3 */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            x: [0, -8, 0],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-1/4 w-1 h-1 bg-emerald-500/50 rounded-full blur-sm"
        ></motion.div>
        
        {/* Particle 4 */}
        <motion.div
          animate={{ 
            y: [0, 12, 0],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 6
          }}
          className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-500/40 rounded-full blur-sm"
        ></motion.div>
      </div>
      
      {/* Subtle Grid Pattern - Muito leve */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Sobre o Matheus
          </motion.h2>
          
          {/* Layout principal em 2 colunas para melhor distribuição */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Coluna Esquerda - Informações Pessoais e Formação */}
            <div className="space-y-6">
              {/* Informações Pessoais */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-4 text-center text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Informações Pessoais</h3>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-blue-300 w-24 flex-shrink-0">Nome:</span>
                    <span className="text-white font-medium">Matheus Renzo Gama</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-blue-300 w-24 flex-shrink-0">Localização:</span>
                    <span className="text-white font-medium">São Paulo, SP, Brasil</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-blue-300 w-24 flex-shrink-0">Tipo:</span>
                    <span className="text-emerald-400 font-semibold">Full-time, freelance</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-blue-300 w-24 flex-shrink-0">Idiomas:</span>
                    <span className="text-white font-medium">Português (Nativo), Inglês (Intermediário)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-blue-300 w-24 flex-shrink-0">Status:</span>
                    <span className="text-emerald-400 font-semibold">Online e disponível</span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/MatheusRenzo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>

              {/* Formação Acadêmica */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-4 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Formação Acadêmica</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 bg-gray-700/50 p-3 rounded-r-lg">
                    <h4 className="font-semibold text-white">Tecnólogo em Análise e Desenvolvimento de Sistemas</h4>
                    <p className="text-blue-200">Universidade São Judas Tadeu</p>
                    <p className="text-blue-300 text-sm font-medium">2024–2026 • Em andamento</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 bg-gray-700/50 p-3 rounded-r-lg">
                    <h4 className="font-semibold text-white">Técnico em Eletrônica</h4>
                    <p className="text-purple-200">ETEC Prof. Aprígio Gonzaga</p>
                    <p className="text-purple-300 text-sm font-medium">2017–2020 • Concluído</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Coluna Direita - Resumo e Objetivos */}
            <div className="space-y-6">
              {/* Resumo Profissional */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-4 text-white bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Resumo Profissional</h3>
                <p className="text-gray-200 mb-3 leading-relaxed">
                  Desenvolvedor Full-Stack especializado em Python, Node.js, React e Next.js. 
                  Expertise em APIs RESTful, cloud (AWS, Vercel), microserviços e e-commerce (VTEX, Shopify).
                </p>
                <p className="text-gray-200 mb-3 leading-relaxed">
                  Iniciei na tecnologia aos 17 anos com eletrônica, desenvolvendo pensamento analítico 
                  e habilidades de resolução de problemas.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  <strong className="text-emerald-300">Foco em soluções escaláveis e eficientes.</strong> Atualmente especializado em 
                  Python, APIs VTEX, backend e microserviços.
                </p>
              </motion.div>

              {/* Objetivos Profissionais */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-4 text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Objetivos Profissionais</h3>
                <div className="space-y-3">
                  <div className="flex items-start bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-cyan-400 mr-3 mt-1 text-lg">•</span>
                    <span className="text-gray-200 text-sm">Atuar como Desenvolvedor Backend Fullstack em equipes ágeis</span>
                  </div>
                  <div className="flex items-start bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-cyan-400 mr-3 mt-1 text-lg">•</span>
                    <span className="text-gray-200 text-sm">Especializar-me em arquiteturas de microserviços e cloud computing</span>
                  </div>
                  <div className="flex items-start bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-cyan-400 mr-3 mt-1 text-lg">•</span>
                    <span className="text-gray-200 text-sm">Desenvolver soluções escaláveis para e-commerce e fintech</span>
                  </div>
                  <div className="flex items-start bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-cyan-400 mr-3 mt-1 text-lg">•</span>
                    <span className="text-gray-200 text-sm">Implementar práticas DevOps e automação</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Certificações em grid horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Certificações e Cursos</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Udemy */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h4 className="font-semibold text-white mb-3 border-b border-gray-600 pb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Udemy</h4>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">React Fundamentals</h5>
                    <p className="text-blue-200">2022</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Node.js Basics</h5>
                    <p className="text-green-200">2022</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">JavaScript ES6+</h5>
                    <p className="text-yellow-200">2022</p>
                  </div>
                </div>
              </motion.div>

              {/* Coursera */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h4 className="font-semibold text-white mb-3 border-b border-gray-600 pb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Coursera</h4>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Python for Automation</h5>
                    <p className="text-emerald-200">2021</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Git & GitHub</h5>
                    <p className="text-orange-200">2021</p>
                  </div>
                </div>
              </motion.div>

              {/* Instituto de Tecnologia FIT */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl border border-gray-600/60 hover:shadow-3xl hover:border-gray-500/80 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <h4 className="font-semibold text-white mb-3 border-b border-gray-600 pb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Instituto FIT</h4>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Curso Intermediário de IA</h5>
                    <p className="text-purple-200">2022</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Redes de comunicação IoT</h5>
                    <p className="text-cyan-200">2022</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Programação de Software Embarcado em IoT</h5>
                    <p className="text-pink-200">2022</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-700/90 to-gray-600/90 p-3 rounded border border-gray-500/50 text-sm hover:from-gray-600/90 hover:to-gray-500/90 transition-all duration-300">
                    <h5 className="font-semibold text-white">Cloud Computing para IoT</h5>
                    <p className="text-indigo-200">2022</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;