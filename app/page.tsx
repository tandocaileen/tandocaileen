import { getContent } from "@/lib/content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import ScrollGirl from "@/components/ScrollGirl";

export default function Home() {
  const c = getContent();
  return (
    <>
      <Nav name={c.name} />
      <ThemeToggle />
      <ScrollGirl email={c.contact.email} />
      <Hero c={c} />
      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        <About text={c.about} highlights={c.highlights} hobbies={c.hobbies} />
        <Experience items={c.experience} education={c.education} />
        <Projects projects={c.projects} />
        <Skills groups={c.skillGroups} />
      </main>
      <Contact c={c} />
      <Footer c={c} />
    </>
  );
}
