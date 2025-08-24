import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaDatabase, FaHeart, FaRocket } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header do Footer - Centralizado e com mais destaque */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        > 

        </motion.div>

        {/* Grid principal com 3 colunas para melhor distribuição */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mb-12">
          {/* Coluna 1 - Contato e Redes Sociais */}
          <div className="space-y-8">
            <h4 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
              Conecte-se comigo
            </h4>
            
            {/* Redes Sociais com melhor espaçamento */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://github.com/MatheusRenzo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-4 bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                <FaGithub className="text-2xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-4 bg-gray-800/60 text-gray-300 hover:text-blue-400 hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                <FaLinkedin className="text-2xl" />
              </motion.a>
              <motion.a
                href="mailto:matheus.gama.renzo@gmail.com"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-4 bg-gray-800/60 text-gray-300 hover:text-green-400 hover:bg-gray-700/70 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                <FaEnvelope className="text-2xl" />
              </motion.a>
            </div>

            {/* Tech Stack com melhor organização */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tech Stack</h5>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-blue-400 bg-blue-900/20 px-3 py-2 rounded-lg">
                  <FaCode className="mr-2 text-sm" />
                  <span className="text-sm font-medium">Frontend</span>
                </div>
                <div className="flex items-center text-green-400 bg-green-900/20 px-3 py-2 rounded-lg">
                  <FaServer className="mr-2 text-sm" />
                  <span className="text-sm font-medium">Backend</span>
                </div>
                <div className="flex items-center text-purple-400 bg-purple-900/20 px-3 py-2 rounded-lg">
                  <FaDatabase className="mr-2 text-sm" />
                  <span className="text-sm font-medium">Database</span>
                </div>
              </div>
            </div>
          </div>
          {/* Coluna 2 - Status e Disponibilidade */}
          <div className="space-y-8">
            <h4 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
              Status
            </h4>
            {/* Status do desenvolvedor com mais destaque */}
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-500/40 rounded-full shadow-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <FaRocket className="text-green-400 mr-3 text-lg" />
                <span className="text-green-400 font-mono font-medium">Online e disponível</span>
              </div>
            </div>
            {/* Informações adicionais */}
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-sm">
                Disponível para novos projetos
              </p>
              <p className="text-gray-400 text-sm">
                Resposta em até 24h
              </p>
            </div>
          </div>
          {/* Coluna 3 - Navegação e Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
              Navegação
            </h4>
            {/* Links de navegação organizados */}
            <div className="space-y-4">
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors duration-300 py-2 hover:translate-x-1 transform">
                → Sobre mim
              </a>
              <a href="/projects" className="block text-gray-400 hover:text-white transition-colors duration-300 py-2 hover:translate-x-1 transform">
                → Projetos
              </a>
              <a href="/experience" className="block text-gray-400 hover:text-white transition-colors duration-300 py-2 hover:translate-x-1 transform">
                → Experiência
              </a>
              <a href="/skills" className="block text-gray-400 hover:text-white transition-colors duration-300 py-2 hover:translate-x-1 transform">
                → Habilidades
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-300 py-2 hover:translate-x-1 transform">
                → Contato
              </a>
            </div>
          </div>
        </div>
        {/* Copyright com melhor separação e layout */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3">
              <span>© {currentYear} Matheus Renzo Gama - Developer</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Transformando ideias em código
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;