import { useTranslation } from "react-i18next";
import { FaGithub, FaExternalLinkAlt, FaGamepad } from "react-icons/fa";
import Row from "./Row";
import TitleCard from "./TitleCard";
import { getTechColor } from "../utils/techCategories";

const getLinkIcon = (url) => {
  if (url.includes("github.com")) return <FaGithub className="text-sm" />;
  if (url.includes("itch.io")) return <FaGamepad className="text-sm" />;
  return <FaExternalLinkAlt className="text-sm" />;
};

const cardAccents = [
  "from-sky-400 to-blue-500",
  "from-blue-400 to-violet-500",
  "from-violet-400 to-purple-500",
  "from-teal-400 to-emerald-500",
  "from-emerald-400 to-sky-400",
  "from-purple-400 to-pink-500",
];

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true });
  const heading = t("projects.heading");

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80 font-semibold mb-1">
          Now Showing
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {heading}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <Row title={heading} accent="bg-sky-400" ariaLabel={heading}>
          {projects.map((project, idx) => (
            <TitleCard
              key={idx}
              title={project.name}
              synopsis={project.description}
              tags={project.tech}
              tagClassName={getTechColor}
              accent={cardAccents[idx % cardAccents.length]}
              links={(project.links || []).map((link) => ({
                ...link,
                icon: getLinkIcon(link.url),
              }))}
            />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Projects;
