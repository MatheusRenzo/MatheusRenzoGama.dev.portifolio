import Head from 'next/head';
import Header from '../components/Header';
import Experience from '../components/Experience';
import Footer from '../components/Footer';

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experiência - Matheus Renzo Gama</title>
        <meta name="description" content="Experiência profissional de Matheus Renzo Gama" />
      </Head>
      
      <Header />
      <main>
        <Experience />
      </main>
      <Footer />
    </>
  );
}