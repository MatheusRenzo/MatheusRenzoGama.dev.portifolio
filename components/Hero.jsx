import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { FaCode, FaRocket, FaChevronDown, FaGithub, FaLinkedin, FaEnvelope, FaServer, FaDatabase } from 'react-icons/fa';

const Hero = ({ onNavigate }) => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: FaCode, value: "25+", label: "Projetos", color: "text-blue-400" },
    { icon: FaServer, value: "5+", label: "Anos de experiencia", color: "text-green-400" },
    { icon: FaDatabase, value: "90%", label: "full stack", color: "text-purple-400" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-blue-400">Matheus Renzo</span>
                  <br />
                  <span className="text-white">Fullstack</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Especializado em{' '}
                  <TypeAnimation
                    sequence={[
                      'backend Development',
                      2000,
                      'VTEX Integration',
                      2000,
                      'Front end Development',
                      2000,
                      'Process Automation',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="text-green-400 font-medium"
                    repeat={Infinity}
                  />
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Desenvolvedor focado em soluções backend robustas. Experiência com uma variedade de tecnologias, 
                  integração de APIs VTEX, automação de processos e desenvolvimento de sistemas para e-commerce.
                </p>
              </motion.div>

              {/* Professional Stats - More Realistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`text-center ${index === currentStat ? 'scale-110' : 'scale-100'} transition-all duration-300`}
                  >
                    <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons and Social Links - Compact layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                    <FaCode className="mr-2 text-lg" />
                    Ver Projetos
                  </Link>
                </motion.div>

                {/* Social Links - Compact */}
                <div className="flex gap-2">
                  <motion.a
                    href="https://github.com/MatheusRenzo"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-blue-400 transition-all duration-300"
                  >
                    <FaGithub className="text-lg" />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-blue-400 hover:border-blue-400 transition-all duration-300"
                  >
                    <FaLinkedin className="text-lg" />
                  </motion.a>
                  
                  <motion.a
                    href="mailto:matheus.gama.renzo@gmail.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-green-400 hover:border-green-400 transition-all duration-300"
                  >
                    <FaEnvelope className="text-lg" />
                  </motion.a>
                </div>
              </motion.div>


            </motion.div>

            {/* Right Side - Full Stack Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 text-center">🚀 Full Stack Developer</h3>
                
                <div className="space-y-4">
                  {/* Frontend */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <h4 className="text-base font-semibold text-white">Frontend</h4>
                    </div>
                    <p className="text-gray-300 text-xs">React, Next.js, TypeScript, Tailwind CSS</p>
                  </div>

                  {/* Backend */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <h4 className="text-base font-semibold text-white">Backend</h4>
                    </div>
                    <p className="text-gray-300 text-xs">Python, Node.js, FastAPI, Express</p>
                  </div>

                  {/* Database & Cloud */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <h4 className="text-base font-semibold text-white">Data & Cloud</h4>
                    </div>
                    <p className="text-gray-300 text-xs">PostgreSQL, MongoDB, AWS, Docker</p>
                  </div>

                  {/* E-commerce */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <h4 className="text-base font-semibold text-white">E-commerce</h4>
                    </div>
                    <p className="text-gray-300 text-xs">VTEX IO, Shopify, APIs de pagamento</p>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="mt-6 pt-4 border-t border-gray-600 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">Disponível para novos projetos</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400"
        >
          <FaChevronDown className="text-xl" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;