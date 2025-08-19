import Head from 'next/head';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Competências - Matheus Renzo Gama</title>
        <meta name="description" content="Competências técnicas de Matheus Renzo Gama" />
      </Head>
      
      <Header />
      <main>
        <Skills />
      </main>
      <Footer />
    </>
  );
}