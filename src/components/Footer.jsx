import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "skills", label: t("navbar.skills") },
    { id: "experience", label: t("navbar.experience") },
    { id: "projects", label: t("navbar.projects") },
    { id: "contact", label: t("navbar.contact") },
  ];

  return (
    <footer
      className="bg-gray-950 border-t border-white/10 text-white py-8 px-6 md:px-12"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <p className="text-gray-400 text-sm">
          © {year} Arjun Gopinath. All rights reserved.
        </p>

        <div className="flex flex-col items-start md:items-center gap-2">
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
        </div>

        <div className="flex items-center md:justify-end gap-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
