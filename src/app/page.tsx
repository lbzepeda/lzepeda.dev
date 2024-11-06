import About from './components/about-section/About';
import Hero from './components/hero-section/Hero';
import Layout from './components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
    </Layout>
  );
}
