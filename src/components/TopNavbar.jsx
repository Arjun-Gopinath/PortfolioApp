import { useState } from "react";
import ToggleLang from "./ToggleLang";
import { FiMenu, FiX } from "react-icons/fi";

const sections = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TopNavbar = () => {
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    setActive(id);
    setIsOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-gray-950 text-white shadow-md px-6 py-3 flex justify-between items-center"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {/* Logo or Nav Links */}
      <div className="flex items-center gap-4">
        {/* Hamburger for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
          aria-label="Menu Toggle"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Nav */}
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

      {/* Language Toggle */}
      <div className="flex items-center">
        <ToggleLang />
      </div>

      {/* Mobile Nav Dropdown */}
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
