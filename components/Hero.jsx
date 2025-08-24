import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { FaCode, FaRocket, FaChevronDown, FaGithub, FaLinkedin, FaEnvelope, FaJs, FaNodeJs, FaDatabase, FaReact, FaLaptopCode, FaServer, FaCloud } from 'react-icons/fa';

const Hero = ({ onNavigate }) => {
  const [currentStat, setCurrentStat] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const stats = [
    { icon: FaDatabase, value: "75%", label: "Backend & APIs", color: "text-green-400" },
    { icon: FaReact, value: "65%", label: "React & Frontend", color: "text-blue-400" },
    { icon: FaNodeJs, value: "99%", label: "DB & Data", color: "text-purple-400" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Dynamic Background with Mouse Parallax */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}></div>
      </div>

      {/* Complex Floating Elements with 3D Movement */}
      <motion.div
        animate={{ 
          y: [0, -30, 0], 
          x: [0, 20, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
        style={{
          transform: `translateZ(${mousePosition.x * 0.01}px)`
        }}
      ></motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 40, 0], 
          x: [0, -30, 0],
          rotate: [0, -15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-2xl"
        style={{
          transform: `translateZ(${mousePosition.y * 0.01}px)`
        }}
      ></motion.div>

      <motion.div
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 15, 0],
          rotate: [0, 5, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        style={{
          transform: `translateZ(${(mousePosition.x + mousePosition.y) * 0.005}px)`
        }}
      ></motion.div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) rotate(${mousePosition.x * 0.001}deg)`
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Complex Header Section with Layered Animations */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            {/* Floating Badge with Complex Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "backOut" }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600 rounded-full px-8 py-4 mb-8 backdrop-blur-xl shadow-2xl"
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FaCode className="text-green-400 text-xl" />
              </motion.div>
              <span className="text-gray-200 text-lg font-medium">Full Stack Developer</span>
            </motion.div>
            
            {/* Main Title with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-8"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "backOut" }}
                className="text-6xl md:text-8xl font-black mb-6 leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600"
                >
                  Matheus Renzo
                </motion.span>
                <br />
              </motion.h1>
            </motion.div>

            {/* Subtitle with TypeAnimation and Complex Styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-6">
                Especializado em{' '}
                <TypeAnimation
                  sequence={[
                    'React & Next.js',
                    2000,
                    'Microserviços',
                    2000,
                    'VTEX & Shopify',
                    2000,
                    'AWS & vercel',
                    2000,
                    'PostgreSQL & Databases',
                    2000,
                    'Node.js & Python',
                    2000,
                    'API REST & GraphQL & Microserviços',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-bold"
                  repeat={Infinity}
                />
              </p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto">
                Desenvolvedor full stack com expertise em Python, Node.js, PostgreSQL, next.js, React...
                <br />
                Combino backend robusto com frontend elegante para criar experiências digitais excepcionais.
              </p>
            </motion.div>
          </motion.div>

          {/* Advanced 3-Column Grid with Complex Animations */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            
            {/* Left Column - Backend Expertise with Hover Effects */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl h-full"
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaNodeJs className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Backend & APIs</h3>
                  <p className="text-gray-400 text-sm">Expertise Avançada</p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: FaNodeJs, label: "Node.js & Python", color: "green", level: "85%" },
                    { icon: FaJs, label: "JavaScript & TypeScript", color: "blue", level: "85%" },
                    { icon: FaDatabase, label: "Databases & MongoDB", color: "purple", level: "80%" }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                      className="bg-gray-700/40 rounded-xl p-4 border border-gray-600/30"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 bg-${tech.color}-500 rounded-full`}></div>
                          <span className="text-sm font-medium text-white">{tech.label}</span>
                        </div>
                        <span className={`text-${tech.color}-400 font-bold text-sm`}>{tech.level}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Center Column - Interactive Stats & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
              className="lg:col-span-1 text-center"
            >
              {/* Animated Stats Grid */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.5 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -10,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className={`text-center ${index === currentStat ? 'scale-110' : 'scale-100'} transition-all duration-300`}
                  >
                    <motion.div 
                      className={`text-3xl font-bold mb-2 ${stat.color}`}
                      animate={{ 
                        scale: index === currentStat ? [1, 1.2, 1] : 1,
                        color: index === currentStat ? ["#10b981", "#3b82f6", "#8b5cf6"] : undefined
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTAs with Complex Animations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/projects" className="inline-block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-2xl">
                    <FaCode className="inline mr-3 text-2xl" />
                    Ver Projetos
                  </Link>
                </motion.div>
                
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Link href="/experience" className="block w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-4 rounded-xl font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg">
                      <FaRocket className="inline mr-2" />
                      Experiência
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Link href="/skills" className="block w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-4 rounded-xl font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg">
                      <FaLaptopCode className="inline mr-2" />
                      Skills
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2 }}
                className="flex justify-center gap-4 mt-8"
              >
                {[
                  { href: "https://github.com/MatheusRenzo", icon: FaGithub, color: "hover:text-white hover:border-blue-400" },
                  { href: "https://www.linkedin.com/in/matheusrenzo-gama-a396b5367", icon: FaLinkedin, color: "hover:text-blue-400 hover:border-blue-400" },
                  { href: "mailto:matheus.gama.renzo@gmail.com", icon: FaEnvelope, color: "hover:text-green-400 hover:border-green-400" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.15, 
                      y: -8,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 bg-gray-800/80 border border-gray-600 rounded-2xl text-gray-300 transition-all duration-300 shadow-lg backdrop-blur-sm ${social.color}`}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Frontend & Full Stack */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 2.4, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl h-full"
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaReact className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Frontend & UI/UX</h3>
                  <p className="text-gray-400 text-sm">Desenvolvimento Moderno</p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: FaReact, label: "React & Next.js", color: "purple", level: "85%" },
                    { icon: FaJs, label: "JavaScript & TypeScript", color: "blue", level: "85%" },
                    { icon: FaCloud, label: "Deploy & DevOps", color: "green", level: "75%" }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.6 + index * 0.1 }}
                      className="bg-gray-700/40 rounded-xl p-4 border border-gray-600/30"
                      whileHover={{ scale: 1.05, x: -5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 bg-${tech.color}-500 rounded-full`}></div>
                          <span className="text-sm font-medium text-white">{tech.label}</span>
                        </div>
                        <span className={`text-${tech.color}-400 font-bold text-sm`}>{tech.level}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Full Stack Badge */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-600/30 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 3 }}
                >
                  <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-2xl p-4">
                    <h4 className="text-lg font-bold text-blue-300 mb-2">🎯 Full Stack Developer</h4>
                    <p className="text-xs text-blue-200">
                      <strong>JavaScript + Node.js + React</strong><br/>
                      Soluções completas e escaláveis
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-400 cursor-pointer"
          whileHover={{ scale: 1.2 }}
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;