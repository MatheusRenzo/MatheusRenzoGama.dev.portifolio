import Head from 'next/head';
import Header from '../components/Header';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Sobre - Matheus Renzo Gama</title>
        <meta name="description" content="Informações sobre Matheus Renzo Gama, Desenvolvedor Backend" />
      </Head>
      
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}