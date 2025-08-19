import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBars, FaTimes, FaTerminal, FaCode, FaServer } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'Sobre', icon: '👨‍💻' },
    { href: '/experience', label: 'Experiência', icon: '📚' },
    { href: '/skills', label: 'Skills', icon: '⚡' },
    { href: '/projects', label: 'Projetos', icon: '🚀' },
    { href: '/contact', label: 'Contato', icon: '📧' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo com estilo de dev */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex items-center space-x-2">
                <FaTerminal className="text-blue-400 text-xl" />
                <span className="text-green-400 font-mono text-sm">$</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-mono">
                  &lt;matheus_renzo&gt;
                </span>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation com estilo de código */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div key={item.href} whileHover={{ y: -1 }}>
                <Link 
                  href={item.href} 
                  className="relative group font-mono text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-blue-400 opacity-70 group-hover:opacity-100">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-blue-400 hover:text-blue-300 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </motion.button>
        </div>
        
        {/* Mobile Navigation com estilo de terminal */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4"
            >
              <div className="bg-black border border-gray-600 rounded-lg p-6 font-mono">
                <div className="flex items-center mb-4">
                  <FaTerminal className="text-green-400 mr-2" />
                  <span className="text-green-400 text-xs">$ menu --open</span>
                </div>
                
                <div className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <motion.div key={item.href} whileHover={{ x: 4 }}>
                      <Link 
                        href={item.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className="block p-3 bg-gray-800 rounded border border-gray-600 hover:border-green-400 hover:bg-gray-700 transition-all duration-300 font-medium text-gray-300 hover:text-green-400 text-sm"
                      >
                        <span className="text-green-400 mr-2">→</span>
                        <span className="text-blue-400 mr-2">{item.icon}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-600">
                  <span className="text-gray-500 text-xs">$ menu --close</span>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      
      {/* Status bar com gradiente */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400"></div>
    </motion.header>
  );
};

export default Header;