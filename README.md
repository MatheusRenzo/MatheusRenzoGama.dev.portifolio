# Portfolio Matheus Renzo - Backend Developer & E-commerce Specialist

## 🚀 Sobre o Projeto

Portfolio profissional interativo desenvolvido com Next.js, React e Tailwind CSS. O projeto inclui uma interface moderna e responsiva com sistema de email integrado.

## ✨ Funcionalidades Principais

### 🎨 Interface Moderna
- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **Animações Suaves**: Transições e efeitos visuais com Framer Motion
- **Tema Escuro**: Design elegante com foco na legibilidade

### 📧 Sistema de Email
- **API de Contato**: Endpoint `/api/contact` para envio de emails
- **Integração EmailJS**: Configuração para envio automático de emails
- **Formulário de Contato**: Interface amigável para envio de mensagens

### 🚀 Performance
- **SEO Otimizado**: Meta tags, Open Graph e dados estruturados
- **Responsivo**: Design adaptável para todos os dispositivos
- **Performance**: Otimizado para velocidade e experiência do usuário

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: React Icons
- **Email**: EmailJS
- **Deploy**: Vercel (recomendado)

## 📁 Estrutura do Projeto

```
portfolio-matheus-renzo/
├── components/           # Componentes React
│   ├── Contact.jsx      # Formulário de contato
│   ├── Hero.jsx         # Seção principal
│   ├── About.jsx        # Sobre mim
│   ├── Experience.jsx   # Experiência profissional
│   ├── Skills.jsx       # Habilidades técnicas
│   ├── Projects.jsx     # Projetos realizados
│   ├── LoadingScreen.jsx # Tela de carregamento
│   └── ...              # Outros componentes
├── pages/               # Páginas Next.js
│   ├── api/            # API routes
│   │   └── contact.js  # Endpoint de contato
│   └── ...             # Páginas principais
├── lib/                 # Configurações e utilitários
│   └── emailjs-config.js # Configuração EmailJS
├── styles/              # Estilos globais
└── public/              # Arquivos estáticos
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/MatheusRenzo/portfolio-matheus-renzo.git

# Entre no diretório
cd portfolio-matheus-renzo

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📧 Configuração do Sistema de Email

### 1. EmailJS Setup
1. Acesse [EmailJS](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Configure um serviço de email (Gmail, Outlook, etc.)
4. Crie um template de email
5. Obtenha as credenciais necessárias

### 2. Configuração do Template
O template deve incluir as seguintes variáveis:
- `{{user_name}}` - Nome do usuário
- `{{user_email}}` - Email do usuário
- `{{user_message}}` - Mensagem do usuário

### 3. API de Contato
O endpoint `/api/contact` processa as requisições:

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
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
}
```

## 🎯 Casos de Uso

### Para Desenvolvedores
- **Portfolio Profissional**: Demonstre suas habilidades técnicas e projetos
- **Sistema de Contato**: Receba mensagens de potenciais clientes/empregadores
- **Deploy Simples**: Fácil publicação e manutenção

### Para Usuários Finais
- **Navegação Intuitiva**: Interface clara e fácil de usar
- **Informações Completas**: Acesso a todos os dados profissionais
- **Contato Direto**: Formulário integrado para comunicação

## 🔧 Customização

### Adicionando Novas Seções
```javascript
// Em components/, crie um novo componente
const NewSection = () => {
  return (
    <section id="new-section" className="py-20 bg-white">
      {/* Conteúdo da nova seção */}
    </section>
  );
};
```

### Modificando Estilos
```javascript
// Em tailwind.config.js, adicione cores customizadas
colors: {
  custom: '#your-color-here',
  // ... outras cores
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Suporte completo a Next.js
- **Railway**: Deploy com banco de dados
- **Heroku**: Deploy tradicional (requer build manual)

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Email**: matheus.gama.renzo@gmail.com
- **GitHub**: [@MatheusRenzo](https://github.com/MatheusRenzo)
- **LinkedIn**: [Matheus Renzo Gama](https://www.linkedin.com/in/matheusrenzo-gama-a396b5367)

## 🙏 Agradecimentos

- **EmailJS** pela integração de email
- **Framer Motion** pelas animações fluidas
- **Tailwind CSS** pelo sistema de design
- **Next.js** pelo framework robusto

---

**Desenvolvido com ❤️ por Matheus Renzo Gama** 
