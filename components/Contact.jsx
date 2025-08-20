import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaTerminal, FaPaperPlane, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // EmailJS configuration
  useEffect(() => {
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS
      if (window.emailjs) {
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS service configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Matheus Renzo'
      };

      // Send email using EmailJS
      const response = await window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            <span className="text-blue-600">Entre em</span>{' '}
            <span className="text-gray-800">Contato</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pronto para transformar sua ideia em realidade? Vamos conversar sobre seu próximo projeto.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-light p-8 rounded-lg custom-shadow">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex flex-col sm:flex-row sm:items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-colors"
                  >
                    <FaEnvelope className="text-blue-600 mr-4 text-lg mb-2 sm:mb-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm font-medium mb-1">Email</p>
                      <a 
                        href="mailto:matheus.gama.renzo@gmail.com" 
                        className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm break-all"
                      >
                        matheus.gama.renzo@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  
                  
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex flex-col sm:flex-row sm:items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-green-600 transition-colors"
                  >
                    <FaLinkedin className="text-green-600 mr-4 text-lg mb-2 sm:mb-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm font-medium mb-1">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/matheusrenzo-gama-a396b5367" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 transition-colors font-medium text-sm"
                      >
                        /matheusrenzo-gama
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex flex-col sm:flex-row sm:items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition-colors"
                  >
                    <FaGithub className="text-blue-600 mr-4 text-lg mb-2 sm:mb-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm font-medium mb-1">GitHub</p>
                      <a 
                        href="https://github.com/MatheusRenzo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                      >
                        /MatheusRenzo
                      </a>
                    </div>
                  </motion.div>
                </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-light p-8 rounded-lg custom-shadow">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">Envie uma Mensagem</h3>
                
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium flex items-center text-sm"
                    >
                      <FaCheck className="mr-2" />
                      Mensagem enviada com sucesso! Entrarei em contato em breve.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium flex items-center text-sm"
                    >
                      <FaTimes className="mr-2" />
                      Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="name" className="block mb-2 font-semibold text-gray-800 text-sm font-medium">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                        placeholder="Seu nome completo"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="email" className="block mb-2 font-semibold text-gray-800 text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                        placeholder="seu@email.com"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="subject" className="block mb-2 font-semibold text-gray-800 text-sm font-medium">
                      Assunto <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                      placeholder="Sobre o que você quer conversar?"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="message" className="block mb-2 font-semibold text-gray-800 text-sm font-medium">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 resize-none"
                      placeholder="Conte-me sobre seu projeto..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </motion.button>
                </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;