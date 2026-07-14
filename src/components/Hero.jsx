import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import { CINEMATIC_EASE } from "../motion";

const isOpenToWork = import.meta.env.VITE_OPEN_TO_WORK === "true";

const Hero = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const name = t("hero.name");
  const words = name.split(" ");

  // Projector spotlight — track the pointer as CSS vars on the section.
  const handlePointer = (e) => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointer}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-gray-950 overflow-hidden hero-pitch-lines"
    >
      {/* Projector spotlight (desktop pointer only; hidden under reduced motion) */}
      <div className="hero-spotlight hidden md:block" aria-hidden="true" />

      {/* One-time letterbox entrance — thin black bars ease outward on load */}
      {!reduceMotion && (
        <>
          <motion.div
            className="letterbox-bar top"
            initial={{ height: "8vh" }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 0.2 }}
          />
          <motion.div
            className="letterbox-bar bottom"
            initial={{ height: "8vh" }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 0.2 }}
          />
        </>
      )}

      <div className="relative max-w-3xl mx-auto w-full">
        {isOpenToWork && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t("hero.openToWork")}
            </span>
          </motion.div>
        )}

        {/* Opening title — name rises word-by-word from behind a mask */}
        <h1
          className="flex flex-wrap justify-center gap-x-[0.25em]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            lineHeight: 0.92,
            color: "white",
          }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.05em]">
              <motion.span
                className="inline-block"
                initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
                animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: CINEMATIC_EASE,
                  delay: 0.35 + i * 0.12,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* "Starring" credit line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-xs md:text-sm uppercase tracking-[0.25em] text-sky-400 mt-5 mb-6"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {t("hero.title")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/resume/arjun-gopinath-resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 px-6 py-3 rounded-full text-white text-sm font-medium shadow-lg shadow-sky-900/40"
            aria-label="Download Arjun's resume"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <FaFileDownload className="text-base" />
            {t("hero.downloadResume")}
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 px-6 py-3 rounded-full text-white text-sm font-medium"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {t("navbar.contact")}
          </a>
        </motion.div>

        <div className="mt-16 hidden sm:flex flex-col items-center">
          <div className="relative w-px h-12 bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-sky-400 to-sky-400/0"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "50%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
