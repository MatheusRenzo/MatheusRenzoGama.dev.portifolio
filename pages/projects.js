import Head from 'next/head';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projetos - Matheus Renzo Gama</title>
        <meta name="description" content="Projetos desenvolvidos por Matheus Renzo Gama" />
      </Head>
      
      <Header />
      <main>
        <Projects />
      </main>
      <Footer />
    </>
  );
}