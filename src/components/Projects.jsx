import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaGamepad } from "react-icons/fa";

const getLinkIcon = (url) => {
  if (url.includes("github.com")) return <FaGithub className="text-xs" />;
  if (url.includes("itch.io")) return <FaGamepad className="text-xs" />;
  return <FaExternalLinkAlt className="text-xs" />;
};

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true });

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {t("projects.heading")}
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            className="w-full px-4 mb-10"
          >
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-sky-500/40 h-full">
              <div>
                <h3 className="text-xl font-semibold text-sky-200 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-sky-200 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white/10 border border-white/10 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.links && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-sky-600/30 border border-white/10 hover:border-sky-500/40 px-3 py-1.5 rounded-full text-xs text-gray-200 hover:text-white transition-all duration-200"
                    >
                      {getLinkIcon(link.url)}
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
