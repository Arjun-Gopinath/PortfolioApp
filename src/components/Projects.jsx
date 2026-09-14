import { useTranslation } from "react-i18next";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaGamepad,
  FaFolderOpen,
} from "react-icons/fa";
import { getTechColor } from "../utils/techCategories";

const getLinkIcon = (url) => {
  if (url.includes("github.com")) return <FaGithub className="text-xs" />;
  if (url.includes("itch.io")) return <FaGamepad className="text-xs" />;
  return <FaExternalLinkAlt className="text-xs" />;
};

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) || [];
  const heading = t("projects.heading") || "Projects";

  return (
    <section id="projects" className="text-gray-200 font-mono space-y-6">
      {/* Terminal Directory Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaFolderOpen className="text-[#d29922] text-base" />
          <span className="text-gray-400 text-xs">src/</span>
          <h2 className="text-base font-semibold text-gray-100 tracking-wide">
            {heading.toLowerCase().replace(/\s+/g, "-")}
          </h2>
          <span className="text-xs text-gray-500">
            ({projects.length} entries)
          </span>
        </div>
        <span className="text-[11px] text-gray-500 hidden sm:inline">
          permissions: drwxr-xr-x
        </span>
      </div>

      {/* Terminal Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => {
          const isLast = idx === projects.length - 1;
          const branchChar = isLast ? "└──" : "├──";

          return (
            <article
              key={idx}
              className="group border border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff] rounded p-4 transition-all flex flex-col justify-between"
            >
              {/* Card Header & Branch */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-gray-600 select-none text-xs">
                      {branchChar}
                    </span>
                    <h3 className="text-sm font-semibold text-[#58a6ff] group-hover:underline truncate">
                      {project.name}
                    </h3>
                  </div>

                  {/* Status Indicator */}
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    shipped
                  </span>
                </div>

                {/* Synopsis / Description */}
                <p className="text-xs text-gray-400 leading-relaxed pl-5 mb-4 border-l border-[#30363d]/50">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Tech Tags & Links */}
              <div className="space-y-3 pt-3 border-t border-[#30363d]/40">
                {/* Tech Tags */}
                {Array.isArray(project.tech) && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`text-[10px] px-2 py-0.5 rounded border border-[#30363d] bg-[#161b22] ${
                          getTechColor ? getTechColor(tag) : "text-gray-300"
                        }`}
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                {Array.isArray(project.links) && project.links.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {project.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-[#21262d] hover:bg-[#30363d] px-2.5 py-1 rounded transition-colors"
                      >
                        {getLinkIcon(link.url)}
                        <span>{link.label || "view"}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
