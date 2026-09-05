import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
