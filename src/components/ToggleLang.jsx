import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const languages = [{ code: "en", label: "English" }];

const ToggleLang = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-sky-600 text-sm"
      >
        🌐{" "}
        {languages.find((l) => l.code === i18n.language)?.label || "Language"}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-36 bg-gray-900 text-white rounded shadow-lg z-10">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 ${
                  i18n.language === lang.code ? "bg-sky-500 font-semibold" : ""
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToggleLang;
