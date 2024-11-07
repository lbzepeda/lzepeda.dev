import About from './components/about-section/About';
import Career from './components/career-section/Career';
import Contact from './components/contact-section/Contact';
import Hero from './components/hero-section/Hero';
import Layout from './components/layout/Layout';
import Project from './components/project-section/Project';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Career />
      <Project />
      <Contact />
    </Layout>
  );
}
