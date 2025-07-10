import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <>
      <TopNavbar />
      <main style={{ fontFamily: "Manrope, sans-serif" }}>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
