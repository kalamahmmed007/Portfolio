import Hero from "../components/home/Hero";
import Experience from "./Experience";
import About from "./About";
import Skills from "./skills";
import Projects from "./Projects";
import Contact from "./Contact";


const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
