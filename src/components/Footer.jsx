import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaEnvelope, FaTerminal } from "react-icons/fa";
const Footer = ({ onNavigate }) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "skills", label: t("navbar.skills") },
    { id: "experience", label: t("navbar.experience") },
    { id: "certifications", label: t("navbar.certifications") },
    { id: "projects", label: t("navbar.projects") },
    { id: "contact", label: t("navbar.contact") },
  ];

  const handleLinkClick = (e, id) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(id);
    }
  };

  return (
    <footer className="border-t border-[#30363d] bg-[#0d1117] text-gray-400 font-mono text-xs py-5 px-4 sm:px-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Terminal Status / Copyright */}
        <div className="flex items-center gap-2 text-gray-400">
          <FaTerminal className="text-[#3fb950] text-[11px]" />
          <span>sh_exit(0)</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">&copy; {year} Arjun Gopinath</span>
        </div>

        {/* Quick Nav Commands */}
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-500">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="hover:text-[#58a6ff] transition-colors"
            >
              .{link.id}()
            </a>
          ))}
        </nav>

        {/* Social Links & Remotes */}
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-[11px] text-gray-600 hidden md:inline">
            git remote:
          </span>
          <a
            href="https://github.com/Arjun-Gopinath"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-sm" />
          </a>
          <a
            href="https://www.linkedin.com/in/arjun-g-b3b57b1a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#58a6ff] transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-sm" />
          </a>
          <a
            href="mailto:arjungopinath06@gmail.com"
            className="hover:text-amber-400 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope className="text-sm" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
