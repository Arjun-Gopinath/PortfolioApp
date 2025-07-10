import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      name: "Bahmni Customizations",
      description:
        "Contributed to healthcare module enhancements and microfrontend refactors for Bahmni’s open-source EHR platform.",
      tech: ["React", "Webpack", "Node.js"],
      github: "https://github.com/Bahmni",
    },
    {
      name: "Client Admin Portal",
      description:
        "Built frontend-heavy internal tooling with reusable components, role-based routing, and analytics.",
      tech: ["React", "Redux", "Tailwind"],
      github: "https://github.com/your-username/project-repo",
    },
    {
      name: "Portfolio Website",
      description:
        "This site! Designed and developed from scratch using React and Tailwind CSS.",
      tech: ["React", "TailwindCSS", "Vite"],
      github: "https://github.com/your-username/portfolio",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        {t("projects.heading")}
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-2xl"
          >
            <div>
              <h3 className="text-xl font-semibold text-sky-200 mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-sky-200">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-white/10 border border-white/10 px-2 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sky-400 hover:underline text-sm font-medium"
              >
                {t("projects.githubLink")}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
