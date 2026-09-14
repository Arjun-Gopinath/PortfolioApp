import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { FaGlobe, FaCaretDown } from "react-icons/fa";

const languages = [
  { code: "en", label: "en_US", name: "English" },
  { code: "es", label: "es_ES", name: "Español" },
  { code: "fr", label: "fr_FR", name: "Français" },
  { code: "ml", label: "ml_IN", name: "മലയാളം" },
];

const ToggleLang = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang =
    languages.find((l) => i18n.language?.startsWith(l.code)) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
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
    <div className="relative font-mono text-xs inline-block" ref={dropdownRef}>
      {/* Terminal Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#161b22] hover:bg-[#21262d] text-gray-300 border border-[#30363d] hover:border-[#58a6ff] transition-colors select-none"
        aria-label="Toggle language locale"
        aria-expanded={open}
      >
        <FaGlobe className="text-[#58a6ff] text-[11px]" />
        <span className="text-gray-400">LOCALE:</span>
        <span className="text-white font-semibold">
          {activeLang.code.toUpperCase()}
        </span>
        <FaCaretDown
          className={`text-gray-500 text-[10px] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Terminal Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-1.5 w-44 bg-[#0d1117] border border-[#30363d] rounded shadow-xl py-1 z-50 divide-y divide-[#30363d]/50">
          <div className="px-2.5 py-1 text-[10px] text-gray-500 uppercase tracking-wider">
            export LANG=
          </div>
          <ul className="py-1">
            {languages.map((lang) => {
              const isSelected = activeLang.code === lang.code;
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#161b22] text-[#3fb950] font-semibold"
                        : "text-gray-300 hover:bg-[#21262d] hover:text-white"
                    }`}
                  >
                    <span>
                      {lang.label}{" "}
                      <span className="text-gray-500 text-[11px]">
                        ({lang.name})
                      </span>
                    </span>
                    {isSelected && (
                      <span className="text-[#3fb950] text-xs">✓</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ToggleLang;
