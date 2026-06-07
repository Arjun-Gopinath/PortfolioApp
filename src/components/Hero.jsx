import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";

const isOpenToWork = import.meta.env.VITE_OPEN_TO_WORK === "true";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-6 py-24 bg-gray-950 overflow-hidden"
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-orb-3" />
      </div>

      <div className="relative max-w-2xl mx-auto w-full">
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

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-4 leading-tight"
        >
          {t("hero.name")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-medium text-gray-300 mb-6"
        >
          {t("hero.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/resume/arjun-gopinath-resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 px-6 py-3 rounded-full text-white text-sm font-medium shadow-lg shadow-sky-900/40"
            aria-label="Download Arjun's resume"
          >
            <FaFileDownload className="text-base" />
            {t("hero.downloadResume")}
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 px-6 py-3 rounded-full text-white text-sm font-medium"
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
