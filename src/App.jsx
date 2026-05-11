import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Skills from "./components/Skills";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <>
      <ScrollProgress />
      <TopNavbar />
      <main style={{ fontFamily: "Manrope, sans-serif" }}>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
