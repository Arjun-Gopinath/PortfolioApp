import { useTranslation } from "react-i18next";
import { FaGraduationCap, FaTerminal } from "react-icons/fa";

const Education = () => {
  const { t } = useTranslation();
  const educationList = t("education.list", { returnObjects: true }) || [];
  const heading = t("education.heading") || "Education";

  return (
    <section id="education" className="font-mono text-gray-200 space-y-6">
      {/* Terminal CLI Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaTerminal className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">cat</span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/records/education.log
          </h2>
          <span className="text-xs text-gray-500">
            ({educationList.length} verified records)
          </span>
        </div>
        <span className="text-[11px] text-gray-500 hidden sm:inline">
          format: ISO-academic
        </span>
      </div>

      {/* Log History Stream */}
      <div className="border border-[#30363d] bg-[#0d1117] rounded-lg p-5 sm:p-6 space-y-6">
        <div className="relative pl-6 border-l-2 border-[#30363d] space-y-8">
          {educationList.map((edu, idx) => {
            const isLatest = idx === 0;

            return (
              <div key={idx} className="relative group">
                {/* Timeline Node Indicator */}
                <div
                  className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border transition-colors ${
                    isLatest
                      ? "bg-[#238636] border-[#3fb950] shadow-[0_0_8px_rgba(63,185,80,0.6)]"
                      : "bg-[#161b22] border-[#30363d] group-hover:border-[#58a6ff]"
                  }`}
                />

                {/* Entry Header: Timestamp & Status */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs text-[#58a6ff] font-semibold">
                    [{edu.years}]
                  </span>
                  {isLatest && (
                    <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-1.5 py-0.2 rounded">
                      latest-degree
                    </span>
                  )}
                  <span className="text-xs text-gray-500 ml-auto">
                    ID: edu-0{idx + 1}
                  </span>
                </div>

                {/* Degree Title */}
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-gray-400 text-sm shrink-0" />
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#58a6ff] transition-colors">
                    {edu.degree}
                  </h3>
                </div>

                {/* Institution & Details */}
                <div className="mt-1 pl-6">
                  <p className="text-xs sm:text-sm text-gray-400">
                    {edu.institution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
