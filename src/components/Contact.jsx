import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gray-950 text-white overflow-hidden"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            {t("contact.heading")}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            {t("contact.description")}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <a
            href="mailto:arjungopinath06@gmail.com?subject=Kudos%20on%20the%20Portfolio&body=Hi%20Arjun%2C%0A%0AI%20just%20checked%20out%20your%20portfolio%20and%20I%20really%20loved%20the%20work%20you've%20done!%0A%0AJust%20wanted%20to%20reach%20out%20and%20say%20keep%20up%20the%20great%20work!"
            className="flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 px-5 py-3.5 rounded-full text-white font-medium text-sm shadow"
            aria-label="Send an email to Arjun"
          >
            <FaEnvelope className="text-base" />
            {t("contact.email")}
          </a>

          <a
            href="https://www.linkedin.com/in/arjun-g-b3b57b1a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-3.5 rounded-full text-white font-medium text-sm shadow"
            aria-label="Connect on LinkedIn"
          >
            <FaLinkedin className="text-base" />
            {t("contact.linkedin")}
          </a>

          <a
            href="https://github.com/Arjun-Gopinath"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-200 px-5 py-3.5 rounded-full text-white font-medium text-sm"
            aria-label="Visit GitHub Profile"
          >
            <FaGithub className="text-base" />
            {t("contact.github")}
          </a>

          <a
            href="/resume/arjun-gopinath-resume.pdf"
            download
            className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-200 px-5 py-3.5 rounded-full text-white font-medium text-sm"
            aria-label="Download Arjun's resume"
          >
            <FaFileDownload className="text-base" />
            {t("contact.resume")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
