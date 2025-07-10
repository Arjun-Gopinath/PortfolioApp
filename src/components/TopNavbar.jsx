import { useState } from "react";
import ToggleLang from "./ToggleLang";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const TopNavbar = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "hero", label: t("navbar.home") },
    { id: "skills", label: t("navbar.skills") },
    { id: "experience", label: t("navbar.experience") },
    { id: "education", label: t("navbar.education") },
    { id: "projects", label: t("navbar.projects") },
    { id: "contact", label: t("navbar.contact") },
  ];

  const handleNavClick = (id) => {
    setActive(id);
    setIsOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-gray-950 text-white shadow-md px-6 py-3 flex justify-between items-center"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
          aria-label="Menu Toggle"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="hidden md:flex space-x-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className={`text-sm font-medium px-3 py-1 rounded hover:bg-sky-600 transition ${
                active === section.id ? "bg-sky-700" : ""
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center">
        <ToggleLang />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col items-start md:hidden z-40">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className={`w-full py-2 px-2 rounded hover:bg-sky-700 transition ${
                active === section.id ? "bg-sky-800" : ""
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
