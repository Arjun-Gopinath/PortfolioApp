import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { FaPlay, FaInfoCircle, FaFileDownload } from "react-icons/fa";
import { CINEMATIC_EASE } from "../motion";

const isOpenToWork = import.meta.env.VITE_OPEN_TO_WORK === "true";

const TOP_SKILLS = ["React", "TypeScript", "Node.js", "Python"];

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

  const scrollToId = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
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
          className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-6"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Meta row — a compact "rating badge" of years + top genre tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-9 text-xs"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <span className="inline-flex items-center border border-gold/30 text-gold/90 px-2.5 py-1 rounded font-semibold uppercase tracking-wide">
            {t("hero.experienceBadge")}
          </span>
          {TOP_SKILLS.map((skill) => (
            <span
              key={skill}
              className="text-gray-500 px-2.5 py-1 border border-white/10 rounded-full"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Streaming-banner CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToId("experience")}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 transition-colors duration-200 px-7 py-3 rounded-md text-gray-950 text-sm font-bold shadow-lg"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <FaPlay className="text-sm" />
            {t("hero.play")}
          </button>

          <button
            type="button"
            onClick={() => scrollToId("projects")}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 transition-all duration-200 px-7 py-3 rounded-md text-white text-sm font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <FaInfoCircle className="text-sm" />
            {t("hero.moreInfo")}
          </button>
        </motion.div>

        <motion.a
          href="/resume/arjun-gopinath-resume.pdf"
          download
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="inline-flex items-center gap-2 mt-5 text-xs text-gray-500 hover:text-sky-400 transition-colors duration-200"
          aria-label="Download Arjun's resume"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <FaFileDownload className="text-xs" />
          {t("hero.downloadResume")}
        </motion.a>

        <div className="mt-10 hidden sm:flex flex-col items-center">
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
