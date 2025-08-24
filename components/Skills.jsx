import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaCode, FaCogs } from 'react-icons/fa';

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend & APIs",
      skills: [
        { name: "Python Scripts", level: 90 },
        { name: "Node.js", level: 75 },
        { name: "APIs GraphQL", level: 65 },
        { name: "APIs REST", level: 80 },
        ]
    },
    {
      title: "E-commerce",
      skills: [
        { name: "VTEX", level: 85 },
        { name: "shophify", level: 65 },
        { name: "integracao ERP", level: 75 },
        { name: "account Management", level: 80 },

      ]
    },
    {
      title: "Frontend & UI",
      skills: [
        { name: "React.js", level: 65 },
        { name: "Next.js", level: 60 },
        { name: "Tailwind CSS", level: 70 },
        { name: "UI/UX Design", level: 50 }
      ]
    },
    {
      title: "DevOps & Infraestrutura",
      skills: [
        { name: "Git & GitHub", level: 80 },
        { name: "FTP/SFTP", level: 80 },
        { name: "AWS", level: 40 },
        { name: "railway", level: 65 },
        { name: "VPS Management", level: 95 }
      ]
    },
    {
      title: "Automação & Processamento",
      skills: [
        { name: "Web Scraping", level: 75 },
        { name: "Process Automation", level: 90 },
        { name: "Data Processing", level: 70 },
        { name: "Task Scheduling", level: 77 },
        { name: "Bot Development", level: 80 }
      ]
    },
    {
      title: "Banco de Dados & Cloud",
      skills: [
        { name: "PostgreSQL", level: 70 },
        { name: "SQLite", level: 75 },
        { name: "MySQL", level: 87 },
        { name: "MongoDB", level: 50 },
        { name: "Cloud Services", level: 65 }
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
            {[
              { percentage: 85, title: "Python & Automação", level: "Expert Level", color: "green" },
              { percentage: 85, title: "VTEX & E-commerce", level: "Expert Level", color: "blue" },
              { percentage: 75, title: "Backend & APIs", level: "Advanced Level", color: "purple" },
              { percentage: 65, title: "Frontend & React", level: "Intermediate", color: "orange" }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200"
              >
                <div className={`text-4xl font-bold text-${area.color}-600 mb-2`}>{area.percentage}%</div>
                <div className="text-gray-600 font-medium">{area.title}</div>
                <div className="text-gray-500 text-sm mt-1">{area.level}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;