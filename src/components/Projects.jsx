import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      name: "Bahmni Customizations",
      description:
        "Contributed to healthcare module enhancements and microfrontend refactors for Bahmni’s open-source EHR platform.",
      tech: ["React", "Webpack", "Node.js"],
      hasLink: true,
      github: ["https://github.com/Bahmni"],
      linkText: ["View on GitHub →"],
    },
    {
      name: "Client Admin Portal",
      description:
        "Built frontend-heavy internal tooling with reusable components, role-based routing, and analytics.",
      tech: ["React", "Redux", "Tailwind"],
      hasLink: true,
      github: ["https://github.com/Bahmni/openmrs-module-ipd-frontend"],
      linkText: ["View on GitHub →"],
    },
    {
      name: "Portfolio Website",
      description:
        "This site! Designed and developed from scratch using React and Tailwind CSS.",
      tech: ["React", "TailwindCSS", "Vite"],
      hasLink: true,
      github: ["https://github.com/Arjun-Gopinath/PortfolioApp"],
      linkText: ["View on GitHub →"],
    },
    {
      name: "CHA-O-TraffIC",
      description: "A HTML5 WebGL game developed using Godot Engine.",
      tech: ["Python", "Godot", "WebGL"],
      hasLink: true,
      github: [
        "https://github.com/Arjun-Gopinath/CHA-O-TraffIC",
        "https://aaryyn.itch.io/chaotic",
      ],
      linkText: ["View on GitHub →", "Try on itch →"],
    },
    {
      name: "Price-Foreteller-for-Preowned-Cars",
      description:
        "A machine learning based prediction model that is used to predict the price of used cars based on data given by user",
      tech: ["Python", "Flask", "LightGBM", "Anaconda"],
      hasLink: true,
      github: [
        "https://github.com/Arjun-Gopinath/Price-Foreteller-for-Preowned-Cars",
      ],
      linkText: ["View on GitHub →"],
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
            className={`w-full px-4 mb-10`}
          >
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
              {project.hasLink &&
                project.github &&
                project.github.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sky-400 hover:underline text-sm font-medium"
                  >
                    {project.linkText?.[i] || "View Project"}
                  </a>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
