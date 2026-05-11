import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import ChatWithMe from "./ChatWithMe";

const isOpenToWork = import.meta.env.VITE_OPEN_TO_WORK === "true";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-4 py-20 bg-center bg-cover bg-gradient-to-b from-gray-950 to-gray-900"
    >
      <div className="absolute inset-6 rounded-2xl z-0" />

      <div className="relative z-10 p-5 sm:p-8 md:p-14 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl max-w-3xl w-full">
        {isOpenToWork && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t("hero.openToWork")}
            </span>
          </motion.div>
        )}

        <img
          src="images/logo.png"
          alt="AG Logo"
          className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 object-contain animate-slowspin mx-auto mb-4"
        />

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-1"
        >
          {t("hero.name")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg font-medium text-gray-300 mb-4"
        >
          {t("hero.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm md:text-base text-gray-200"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex justify-center"
        >
          <a
            href="/resume/arjun-gopinath-resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 px-5 py-2.5 rounded-full text-white text-sm font-medium shadow"
            aria-label="Download Arjun's resume"
          >
            <FaFileDownload className="text-base" />
            {t("hero.downloadResume")}
          </a>
        </motion.div>

        <div className="mt-8 animate-bounce hidden sm:block">
          <span className="text-sm uppercase tracking-widest text-gray-300">
            {t("hero.scroll")}
          </span>
          <div className="mt-2 w-6 h-6 border-2 border-white rounded-full mx-auto"></div>
        </div>
      </div>

      <ChatWithMe />
    </section>
  );
};

export default Hero;
