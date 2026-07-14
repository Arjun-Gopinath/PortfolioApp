import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { staggerContainer, riseItem } from "../motion";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "skills", label: t("navbar.skills") },
    { id: "experience", label: t("navbar.experience") },
    { id: "certifications", label: t("navbar.certifications") },
    { id: "projects", label: t("navbar.projects") },
    { id: "contact", label: t("navbar.contact") },
  ];

  return (
    <footer
      className="bg-gray-950 border-t border-white/10 text-white py-10 px-6 md:px-12"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {/* End-credits cascade — lines rise in sequence, once, on scroll into view */}
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
      >
        <motion.p variants={riseItem} className="text-gray-400 text-sm">
          © {year} Arjun Gopinath. All rights reserved.
        </motion.p>

        <motion.div
          variants={riseItem}
          className="flex flex-col items-start md:items-center gap-2"
        >
          <p className="text-xs uppercase tracking-widest text-gray-500">
            {t("footer.quickLinks")}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-gray-300 hover:text-sky-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={riseItem}
          className="flex items-center md:justify-end gap-4"
        >
          <a
            href="https://github.com/Arjun-Gopinath"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/arjun-g-b3b57b1a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="mailto:arjungopinath06@gmail.com"
            className="text-gray-400 hover:text-sky-400 transition-colors duration-200"
            aria-label="Email"
          >
            <FaEnvelope className="text-xl" />
          </a>
        </motion.div>
      </motion.div>

      {/* Closing credit — the one self-aware wink of the cinematic theme */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center text-[11px] uppercase tracking-[0.3em] text-gray-600"
      >
        {t("footer.directedBy")}{" "}
        <span className="text-gold/80">Arjun Gopinath</span>
      </motion.p>
    </footer>
  );
};

export default Footer;
