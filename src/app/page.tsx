import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import PublicProof from '@/components/PublicProof';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <PublicProof />
      <Skills />
      <ContactForm />
    </>
  );
}
