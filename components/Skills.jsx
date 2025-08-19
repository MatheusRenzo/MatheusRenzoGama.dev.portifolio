import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaCode, FaCogs } from 'react-icons/fa';

const Skills = () => {
  const skillCategories = [
    {
      title: "Linguagens de Programação",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 65 },
        { name: "TypeScript", level: 50 },
        { name: "PHP", level: 45 },
        { name: "Java", level: 35 }
      ]
    },
    {
      title: "Backend & APIs",
      skills: [
        { name: "Python Scripts", level: 95 },
        { name: "FastAPI", level: 85 },
        { name: "Django/Flask", level: 80 },
        { name: "RESTful APIs", level: 90 },
        { name: "Node.js", level: 60 }
      ]
    },
    {
      title: "E-commerce & Integração",
      skills: [
        { name: "VTEX IO Platform", level: 90 },
        { name: "API Integration", level: 95 },
        { name: "Payment Systems", level: 85 },
        { name: "Inventory Management", level: 85 },
        { name: "Webhook Integration", level: 80 }
      ]
    },
    {
      title: "Banco de Dados",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "SQLite", level: 90 },
        { name: "MySQL", level: 75 },
        { name: "MongoDB", level: 60 },
        { name: "Redis", level: 55 }
      ]
    },
    {
      title: "Frontend (Em Desenvolvimento)",
      skills: [
        { name: "React.js", level: 50 },
        { name: "Next.js", level: 45 },
        { name: "HTML/CSS", level: 55 },
        { name: "Tailwind CSS", level: 40 },
        { name: "UI/UX Design", level: 35 }
      ]
    },
    {
      title: "DevOps & Ferramentas",
      skills: [
        { name: "Git & GitHub", level: 80 },
        { name: "VS Code", level: 90 },
        { name: "Postman", level: 85 },
        { name: "Docker", level: 40 },
        { name: "Linux", level: 50 }
      ]
    },
    {
      title: "Automação & Processamento",
      skills: [
        { name: "Web Scraping", level: 95 },
        { name: "Process Automation", level: 90 },
        { name: "Data Processing", level: 85 },
        { name: "Task Scheduling", level: 80 },
        { name: "Bot Development", level: 75 }
      ]
    }
  ];

  const additionalSkills = [
    {
      category: "Soft Skills",
      skills: [
        "Trabalho em Equipe",
        "Comunicação Efetiva", 
        "Resolução de Problemas",
        "Gestão de Tempo",
        "Aprendizado Contínuo",
        "Pensamento Crítico"
      ]
    },
    {
      category: "Metodologias",
      skills: [
        "Agile/Scrum",
        "Kanban",
        "Code Review",
        "Documentação de APIs",
        "Testes de Integração",
        "Debugging Avançado"
      ]
    },
    {
      category: "Idiomas",
      skills: [
        "Português (Nativo)",
        "Inglês (Intermediário)",
        "Espanhol (Básico)"
      ]
    }
  ];

  const getProgressColor = (level) => {
    if (level >= 80) return "from-green-500 to-emerald-600";
    if (level >= 60) return "from-blue-500 to-blue-600";
    if (level >= 40) return "from-yellow-500 to-orange-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Competências Técnicas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Especializado em desenvolvimento backend e soluções e-commerce. 
            Frontend e DevOps são áreas em constante aprendizado.
          </p>
        </motion.div>
        
        {/* Skills com Barras de Progresso */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">{category.title}</h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700 text-sm">{skill.name}</span>
                      <span className={`font-semibold text-sm ${
                        skill.level >= 80 ? 'text-green-600' : 
                        skill.level >= 60 ? 'text-blue-600' : 
                        skill.level >= 40 ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className={`bg-gradient-to-r ${getProgressColor(skill.level)} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Habilidades Complementares</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalSkills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h4 className="text-lg font-semibold mb-4 text-center text-gray-800">{category.category}</h4>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <span className="text-blue-600 mr-3">•</span>
                      <span className="text-gray-700 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Áreas de Especialização */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Áreas de Especialização</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Backend Development</div>
              <div className="text-gray-500 text-sm mt-1">Expert Level</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <div className="text-gray-600 font-medium">E-commerce APIs</div>
              <div className="text-gray-500 text-sm mt-1">Expert Level</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-gray-600 font-medium">Automação</div>
              <div className="text-gray-500 text-sm mt-1">Advanced Level</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">50%</div>
              <div className="text-gray-600 font-medium">Frontend</div>
              <div className="text-gray-500 text-sm mt-1">Learning</div>
            </div>
          </div>
        </motion.div>

        {/* Certificações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Certificações e Treinamentos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="text-blue-600 font-semibold mb-1">VTEX IO</div>
              <div className="text-gray-600 text-sm">Developer Certification</div>
              <div className="text-gray-500 text-xs mt-1">2023</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="text-green-600 font-semibold mb-1">Python</div>
              <div className="text-gray-600 text-sm">Backend Specialist</div>
              <div className="text-gray-500 text-xs mt-1">2021</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="text-purple-600 font-semibold mb-1">API Development</div>
              <div className="text-gray-600 text-sm">RESTful Services</div>
              <div className="text-gray-500 text-xs mt-1">2022</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="text-orange-600 font-semibold mb-1">E-commerce</div>
              <div className="text-gray-600 text-sm">Integration Specialist</div>
              <div className="text-gray-500 text-xs mt-1">2023</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;