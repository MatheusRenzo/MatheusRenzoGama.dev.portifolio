import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [currentSection, setCurrentSection] = useState('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSectionNavigate = (section) => {
    setCurrentSection(section);
    
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Matheus Renzo - Backend Developer | Portfolio Profissional</title>
        <meta name="description" content="Portfólio profissional de Matheus Renzo Gama - Desenvolvedor Backend especializado em Python, VTEX e Automação. Experiência em integração de APIs e desenvolvimento de sistemas e-commerce." />
        <meta name="keywords" content="desenvolvedor backend, python developer, e-commerce, automação, VTEX, API integration, Matheus Renzo, portfolio, desenvolvedor web" />
        <meta name="author" content="Matheus Renzo Gama" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Matheus Renzo - Backend Developer" />
        <meta property="og:description" content="Portfólio profissional com foco em Python, VTEX e Automação. Desenvolvedor Backend experiente em integração de APIs e sistemas e-commerce." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matheusrenzo.dev" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Matheus Renzo Portfolio" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Matheus Renzo - Backend Developer" />
        <meta name="twitter:description" content="Portfólio profissional com foco em Python, VTEX e Automação" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:creator" content="@matheusrenzo" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://matheusrenzo.dev" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Matheus Renzo Gama",
              "jobTitle": "Backend Developer",
              "description": "Desenvolvedor Backend especializado em Python, VTEX e Automação",
              "url": "https://matheusrenzo.dev",
              "email": "matheus.gama.renzo@gmail.com",
              "telephone": "+5511917243080",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "sameAs": [
                "https://github.com/MatheusRenzo",
                "https://www.linkedin.com/in/matheusrenzo-gama-a396b5367"
              ],
              "knowsAbout": [
                "Python",
                "VTEX IO",
                "API Integration",
                "Process Automation",
                "Web Scraping",
                "E-commerce",
                "Database Management"
              ]
            })
          }}
        />
      </Head>

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-white text-gray-800">
          
          
          {/* Header */}
                      <Header onNavigate={handleSectionNavigate} />
          
          {/* Main Content */}
          <main>
            <Hero onNavigate={handleSectionNavigate} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}