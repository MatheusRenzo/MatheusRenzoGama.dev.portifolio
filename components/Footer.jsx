import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Coluna 1 - Sobre */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://github.com/MatheusRenzo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                href="mailto:matheus.gama.renzo@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-gray-800 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                <FaEnvelope className="text-xl" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Status do desenvolvedor */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-900/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 text-sm font-mono">Status: Online e disponível para projetos</span>
          </div>
        </div>

        {/* Linha de separação */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Matheus Renzo. Todos os direitos reservados.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                Sobre
              </a>
              <a href="/projects" className="text-gray-400 hover:text-white transition-colors">
                Projetos
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;