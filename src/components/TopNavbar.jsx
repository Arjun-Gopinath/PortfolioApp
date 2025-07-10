import { useState } from "react";
import ToggleLang from "./ToggleLang";

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TopNavbar = () => {
  const [active, setActive] = useState("hero");

  return (
    <header
      style={{ fontFamily: "Manrope, sans-serif" }}
      className="sticky top-0 z-50 bg-gray-900 text-white shadow-md px-6 py-3 flex justify-between items-center"
    >
      <div className="flex space-x-4">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => setActive(section.id)}
            className={`text-sm font-medium px-3 py-1 rounded hover:bg-sky-600 transition ${
              active === section.id ? "bg-sky-700" : ""
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <ToggleLang />
      </div>
    </header>
  );
};

export default TopNavbar;
