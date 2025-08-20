# 🚀 Portfolio Matheus Renzo - Backend Developer & E-commerce Specialist

[![Next.js](https://img.shields.io/badge/Next.js-13.4.19-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

[![GitHub stars](https://img.shields.io/github/stars/MatheusRenzo/portfolio-matheus-renzo?style=social)](https://github.com/MatheusRenzo/portfolio-matheus-renzo)
[![GitHub forks](https://img.shields.io/github/forks/MatheusRenzo/portfolio-matheus-renzo?style=social)](https://github.com/MatheusRenzo/portfolio-matheus-renzo)
[![GitHub issues](https://img.shields.io/github/issues/MatheusRenzo/portfolio-matheus-renzo)](https://github.com/MatheusRenzo/portfolio-matheus-renzo/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/MatheusRenzo/portfolio-matheus-renzo)](https://github.com/MatheusRenzo/portfolio-matheus-renzo/pulls)

## 📋 Índice

- [🚀 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📁 Estrutura](#-estrutura)
- [🚀 Como Executar](#-como-executar)
- [📧 Configuração Email](#-configuração-email)
- [🎯 Casos de Uso](#-casos-de-uso)
- [🔧 Customização](#-customização)
- [🚀 Deploy](#-deploy)
- [📝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)
- [📞 Contato](#-contato)

## 🚀 Sobre o Projeto

Portfolio profissional interativo desenvolvido com **Next.js**, **React** e **Tailwind CSS**. O projeto inclui uma interface moderna e responsiva com sistema de email integrado via EmailJS, otimizado para performance e SEO.

### 🎯 Objetivos
- **Portfolio Profissional**: Apresentar habilidades técnicas e projetos
- **Sistema de Contato**: Receber mensagens de potenciais clientes/empregadores
- **Performance**: Carregamento rápido e experiência fluida
- **SEO**: Otimizado para motores de busca

## ✨ Funcionalidades

### 🎨 Interface Moderna
- **Design Responsivo** 📱 - Interface adaptável para todos os dispositivos
- **Animações Suaves** ✨ - Transições e efeitos visuais com Framer Motion
- **Tema Escuro** 🌙 - Design elegante com foco na legibilidade
- **Loading Screen Inteligente** ⚡ - Aparece apenas na primeira visita

### 📧 Sistema de Email
- **API de Contato** 📬 - Endpoint `/api/contact` para envio de emails
- **Integração EmailJS** 🔗 - Configuração para envio automático de emails
- **Formulário de Contato** 📝 - Interface amigável para envio de mensagens
- **Validação de Dados** ✅ - Verificação de campos obrigatórios

### 🚀 Performance & SEO
- **SEO Otimizado** 🔍 - Meta tags, Open Graph e dados estruturados
- **Lazy Loading** 🐌 - Carregamento sob demanda de componentes
- **Analytics** 📊 - Integração com Vercel Analytics
- **PWA Ready** 📱 - Preparado para Progressive Web App

## 🛠️ Tecnologias Utilizadas

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-13.4.19-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?logo=tailwind-css&logoColor=white)

### Animações & UX
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-purple?logo=framer&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-4.10.1-blue?logo=react&logoColor=white)
![React Type Animation](https://img.shields.io/badge/React_Type_Animation-3.2.0-green?logo=react&logoColor=white)

### Email & Backend
![EmailJS](https://img.shields.io/badge/EmailJS-4.4.1-orange?logo=email&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9.7-green?logo=node.js&logoColor=white)

### Deploy & Analytics
![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=white)
![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-1.5.0-black?logo=vercel&logoColor=white)

## 📁 Estrutura do Projeto

```
portfolio-matheus-renzo/
├── 📁 components/           # Componentes React reutilizáveis
│   ├── 🎯 About.jsx        # Seção "Sobre Mim"
│   ├── 📞 Contact.jsx      # Formulário de contato
│   ├── 🚀 Experience.jsx   # Experiência profissional
│   ├── 🎨 Footer.jsx       # Rodapé da aplicação
│   ├── 📱 Header.jsx       # Cabeçalho e navegação
│   ├── ⭐ Hero.jsx         # Seção principal/Hero
│   ├── ⚡ LoadingScreen.jsx # Tela de carregamento inteligente
│   ├── 💼 Projects.jsx     # Portfólio de projetos
│   └── 🛠️ Skills.jsx       # Habilidades técnicas
├── 📁 pages/               # Páginas Next.js (App Router)
│   ├── 📁 api/            # API routes
│   │   └── 📧 contact.js  # Endpoint de contato
│   ├── 🏠 index.js        # Página inicial
│   ├── 👤 about.js        # Página sobre
│   ├── 📞 contact.js      # Página de contato
│   ├── 🚀 experience.js   # Página de experiência
│   ├── 💼 projects.js     # Página de projetos
│   └── 🛠️ skills.js       # Página de habilidades
├── 📁 lib/                 # Configurações e utilitários
│   └── 📧 emailjs-config.js # Configuração EmailJS
├── 📁 styles/              # Estilos globais e CSS
├── 📁 public/              # Arquivos estáticos (imagens, favicon)
├── 📁 .next/               # Build do Next.js (não versionado)
├── 📁 node_modules/        # Dependências (não versionado)
├── 🔧 package.json         # Dependências e scripts
├── 🎨 tailwind.config.js   # Configuração Tailwind CSS
├── ⚙️ next.config.js       # Configuração Next.js
├── 🚀 vercel.json          # Configuração Vercel
└── 📖 README.md            # Este arquivo
```

## 🚀 Como Executar

### 📋 Pré-requisitos

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** ou **yarn** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

### 🔧 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/MatheusRenzo/portfolio-matheus-renzo.git

# 2. Entre no diretório
cd portfolio-matheus-renzo

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Execute em desenvolvimento
npm run dev
# ou
yarn dev
```

### 🌐 Acesso

Após a instalação, acesse:
- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://seu-dominio.vercel.app

### 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Opcional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## 📧 Configuração do Sistema de Email

### 1. 🔧 EmailJS Setup

1. **Criar Conta**: Acesse [EmailJS](https://www.emailjs.com/)
2. **Configurar Serviço**: Configure Gmail, Outlook ou outro provedor
3. **Criar Template**: Template com variáveis personalizáveis
4. **Obter Credenciais**: Service ID, Template ID e Public Key

### 2. 📋 Configuração do Template

O template deve incluir as seguintes variáveis:
```html
<!-- Template de exemplo -->
Nome: {{user_name}}
Email: {{user_email}}
Mensagem: {{user_message}}
Data: {{date}}
```

### 3. 🔌 API de Contato

Endpoint `/api/contact` processa as requisições:

```javascript
// pages/api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Envio via EmailJS
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        user_name: name,
        user_email: email,
        user_message: message,
        date: new Date().toLocaleDateString('pt-BR')
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
```

## 🎯 Casos de Uso

### 👨‍💻 Para Desenvolvedores
- **Portfolio Profissional**: Demonstre suas habilidades técnicas e projetos
- **Sistema de Contato**: Receba mensagens de potenciais clientes/empregadores
- **Deploy Simples**: Fácil publicação e manutenção
- **Base para Projetos**: Estrutura reutilizável para outros projetos

### 👥 Para Usuários Finais
- **Navegação Intuitiva**: Interface clara e fácil de usar
- **Informações Completas**: Acesso a todos os dados profissionais
- **Contato Direto**: Formulário integrado para comunicação
- **Experiência Responsiva**: Funciona perfeitamente em todos os dispositivos

## 🔧 Customização

### ➕ Adicionando Novas Seções

```javascript
// Em components/, crie um novo componente
const NewSection = () => {
  return (
    <section id="new-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Nova Seção
        </h2>
        {/* Conteúdo da nova seção */}
      </div>
    </section>
  );
};
```

### 🎨 Modificando Estilos

```javascript
// Em tailwind.config.js, adicione cores customizadas
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color-here',
        secondary: '#another-color',
        // ... outras cores
      },
      fontFamily: {
        custom: ['Your Font', 'sans-serif'],
      }
    }
  }
}
```

## 🚀 Deploy

### ✅ Vercel (Recomendado)

1. **Conectar Repositório**: Conecte seu GitHub ao Vercel
2. **Configurar Variáveis**: Configure as variáveis de ambiente
3. **Deploy Automático**: Deploy automático a cada push
4. **Custom Domain**: Configure domínio personalizado

```bash
# Deploy via CLI (opcional)
npm install -g vercel
vercel
```

### 🌐 Outras Plataformas

- **Netlify**: Suporte completo a Next.js
- **Railway**: Deploy com banco de dados
- **Heroku**: Deploy tradicional (requer build manual)
- **DigitalOcean App Platform**: Deploy escalável

## 📝 Contribuição

Contribuições são sempre bem-vindas! 🎉

### 🔄 Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/portfolio-matheus-renzo.git`
3. **Crie** uma branch: `git checkout -b feature/NovaFuncionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/NovaFuncionalidade`
6. **Abra** um Pull Request

### 📋 Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Siga os padrões de estilo existentes
- Teste suas mudanças antes de submeter
- Adicione testes quando apropriado

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 Matheus Renzo Gama

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contato

- **📧 Email**: [matheus.gama.renzo@gmail.com](mailto:matheus.gama.renzo@gmail.com)
- **🐙 GitHub**: [@MatheusRenzo](https://github.com/MatheusRenzo)
- **💼 LinkedIn**: [Matheus Renzo Gama](https://www.linkedin.com/in/matheusrenzo-gama-a396b5367)
- **🌐 Portfolio**: [matheusrenzo.dev](https://matheusrenzo.dev)

## 🙏 Agradecimentos

- **EmailJS** pela integração de email robusta
- **Framer Motion** pelas animações fluidas e performáticas
- **Tailwind CSS** pelo sistema de design utilitário
- **Next.js** pelo framework robusto e otimizado
- **Vercel** pela plataforma de deploy incrível
- **React Icons** pela biblioteca de ícones completa

## 📊 Estatísticas do Projeto

![GitHub last commit](https://img.shields.io/github/last-commit/MatheusRenzo/portfolio-matheus-renzo)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/MatheusRenzo/portfolio-matheus-renzo)
![GitHub contributors](https://img.shields.io/github/contributors/MatheusRenzo/portfolio-matheus-renzo)
![GitHub repo size](https://img.shields.io/github/repo-size/MatheusRenzo/portfolio-matheus-renzo)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

**Desenvolvido com ❤️ por [Matheus Renzo Gama](https://github.com/MatheusRenzo)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheusrenzo-gama-a396b5367)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MatheusRenzo)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:matheus.gama.renzo@gmail.com)

</div> 
