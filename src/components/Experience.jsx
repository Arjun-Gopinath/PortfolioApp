import { useTranslation } from "react-i18next";
import { FaBriefcase, FaTerminal } from "react-icons/fa";

const parseRole = (roleStr = "") => {
  const match = roleStr.match(/^(.+?)\s*\((.+)\)$/);
  return match
    ? { title: match[1].trim(), period: match[2].trim() }
    : { title: roleStr, period: "" };
};

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("skills.jobs", { returnObjects: true }) || [];
  const heading = t("skills.heading") || "Experience";

  return (
    <section id="experience" className="font-mono text-gray-200 space-y-6">
      {/* Terminal Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaTerminal className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">git log</span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/career/timeline
          </h2>
          <span className="text-xs text-gray-500">
            ({jobs.length} deployments)
          </span>
        </div>
        <span className="text-[11px] text-gray-500 hidden sm:inline">
          status: active
        </span>
      </div>

      {/* Experience Stream */}
      <div className="space-y-4">
        {jobs.map((job, idx) => {
          const { title: roleTitle, period } = parseRole(job.role);
          const isLatest = idx === 0;

          return (
            <article
              key={idx}
              className="border border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff] rounded-lg p-5 transition-colors space-y-4"
            >
              {/* Job Header: Company, Role & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d]/50 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-[#58a6ff] text-xs shrink-0" />
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {job.title}
                    </h3>
                    {isLatest && (
                      <span className="text-[10px] bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded">
                        current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#58a6ff] font-medium pl-5">
                    {roleTitle}
                  </p>
                </div>

                {period && (
                  <span className="text-xs text-gray-400 bg-[#161b22] border border-[#30363d] px-2.5 py-1 rounded shrink-0 self-start sm:self-center">
                    [{period}]
                  </span>
                )}
              </div>

              {/* Responsibilities */}
              {Array.isArray(job.responsibilities) &&
                job.responsibilities.length > 0 && (
                  <div className="space-y-2 pt-1 pl-1">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      // Key Deliverables &amp; Impact
                    </p>
                    <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
                      {job.responsibilities.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-[#3fb950] font-bold select-none shrink-0 mt-0.5">
                            ›
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
