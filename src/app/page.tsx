import About from './components/about-section/About';
import Career from './components/career-section/Career';
import Hero from './components/hero-section/Hero';
import Layout from './components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Career />
    </Layout>
  );
}
