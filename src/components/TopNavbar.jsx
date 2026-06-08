import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ToggleLang from "./ToggleLang";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const TopNavbar = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    { id: "skills", label: t("navbar.skills") },
    { id: "experience", label: t("navbar.experience") },
    { id: "education", label: t("navbar.education") },
    { id: "certifications", label: t("navbar.certifications") },
    { id: "projects", label: t("navbar.projects") },
    { id: "contact", label: t("navbar.contact") },
  ];

  // Scroll-based active section tracking
  useEffect(() => {
    const sectionIds = ["hero", ...sections.map((s) => s.id)];

    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const offset = 80; // below navbar height
      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 px-6 py-3 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/85 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <div className="flex items-center gap-6">
          <a
            href="#hero"
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2"
          >
            <img
              src="images/logo.svg"
              alt="AG Logo"
              className="w-8 h-8 md:w-9 md:h-9 object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => handleNavClick(section.id)}
                className={`relative text-sm font-medium px-3 py-1.5 rounded transition-colors duration-200 ${
                  active === section.id
                    ? "text-sky-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {section.label}
                {active === section.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-sky-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ToggleLang />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xl p-1 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Menu Toggle"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed left-0 top-0 h-full w-72 bg-gray-950/95 backdrop-blur-md z-50 md:hidden flex flex-col shadow-2xl border-r border-white/5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <img
                  src="images/logo.svg"
                  alt="AG Logo"
                  className="w-8 h-8 object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors duration-200 p-1"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col px-4 py-6 gap-0.5">
                {sections.map((section, i) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                    onClick={() => handleNavClick(section.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active === section.id
                        ? "text-sky-400 bg-sky-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {active === section.id && (
                      <span className="w-1 h-4 rounded-full bg-sky-400 shrink-0" />
                    )}
                    {section.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavbar;
