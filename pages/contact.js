import Head from 'next/head';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contato - Matheus Renzo Gama</title>
        <meta name="description" content="Entre em contato com Matheus Renzo Gama" />
      </Head>
      
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  );
}