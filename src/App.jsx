import Certifications from "./components/Certifications";
import ChatWithMe from "./components/ChatWithMe";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Education from "./components/Education";
import Experience from "./components/Experience";
import FilmGrain from "./components/FilmGrain";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import MarqueeDivider from "./components/MarqueeDivider";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Skills from "./components/Skills";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <>
      <LoadingScreen />
      <FilmGrain />
      <CustomCursor />
      <ScrollProgress />
      <TopNavbar />
      <main>
        <Hero />
        <MarqueeDivider items={["SKILLS", "TECHNOLOGIES", "EXPERTISE"]} direction="left" />
        <Skills />
        <MarqueeDivider items={["EXPERIENCE", "PROFESSIONAL", "5+ YEARS"]} direction="right" />
        <Experience />
        <MarqueeDivider items={["EDUCATION", "LEARNING", "GROWTH"]} direction="left" />
        <Education />
        <Certifications />
        <Projects />
        <MarqueeDivider items={["PROJECTS", "BUILT", "SHIPPED ⚽"]} direction="right" />
        <Contact />
      </main>
      <ChatWithMe />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
