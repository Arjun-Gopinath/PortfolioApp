import { useTranslation } from "react-i18next";
import { FaFileDownload, FaTerminal, FaCodeBranch } from "react-icons/fa";

const isOpenToWork = import.meta.env.VITE_OPEN_TO_WORK === "true";
const TOP_SKILLS = ["React", "TypeScript", "Node.js", "Python"];

const Hero = ({ onNavigate }) => {
  const { t } = useTranslation();

  const name = t("hero.name");
  const title = t("hero.title");
  const subtitle = t("hero.subtitle");
  const expBadge = t("hero.experienceBadge");

  const handleNav = (section) => {
    if (onNavigate) {
      onNavigate(section);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="font-mono text-gray-300 space-y-6">
      {/* CLI Command Line Banner */}
      <div className="flex items-center gap-2 text-xs text-gray-500 pb-2 border-b border-[#30363d]/60">
        <FaTerminal className="text-[#3fb950]" />
        <span>system.exec(&quot;whoami --verbose&quot;)</span>
        <span className="text-gray-600 ml-auto">status: 200 OK</span>
      </div>

      {/* Main Terminal Overview Block */}
      <div className="border border-[#30363d] bg-[#0d1117] rounded-lg p-5 sm:p-7 space-y-6">
        {/* Availability & Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">USER:</span>
            <span className="text-[#58a6ff] font-semibold">
              {name.toLowerCase().replace(/\s+/g, ".")}
            </span>
            <span className="text-gray-600">@</span>
            <span className="text-gray-400">portfolio</span>
          </div>

          {isOpenToWork && (
            <div className="inline-flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{t("hero.openToWork")}</span>
            </div>
          )}
        </div>

        {/* Name / Display Output */}
        <div>
          <p className="text-xs text-gray-500 mb-1"># Identity</p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {name}
          </h1>
          <p className="text-sm sm:text-base text-[#58a6ff] mt-1 flex items-center gap-2">
            <span>&gt;</span>
            <span>{title}</span>
          </p>
        </div>

        {/* Bio / Subtitle */}
        <div className="border-l-2 border-[#30363d] pl-4 py-1">
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Technical Stack / System Specs */}
        <div className="space-y-2 pt-2">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <FaCodeBranch className="text-gray-600 text-[10px]" />
            <span>PRIMARY_STACK &amp; METRICS:</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="border border-amber-500/40 bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded">
              {expBadge}
            </span>
            {TOP_SKILLS.map((skill) => (
              <span
                key={skill}
                className="bg-[#161b22] border border-[#30363d] text-gray-300 px-2 py-0.5 rounded"
              >
                [{skill}]
              </span>
            ))}
          </div>
        </div>

        {/* CLI Actions & Resume Download */}
        <div className="pt-4 border-t border-[#30363d]/60 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleNav("experience")}
            className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs px-3.5 py-1.5 rounded font-medium transition-colors"
          >
            <span>./view-experience.sh</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav("projects")}
            className="inline-flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-gray-200 text-xs px-3.5 py-1.5 rounded transition-colors"
          >
            <span>./explore-projects.sh</span>
          </button>

          <a
            href="/resume/arjun-gopinath-resume.pdf"
            download
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#58a6ff] hover:underline px-2 py-1.5 ml-auto transition-colors"
            aria-label="Download resume"
          >
            <FaFileDownload className="text-[11px]" />
            <span>resume.pdf</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
