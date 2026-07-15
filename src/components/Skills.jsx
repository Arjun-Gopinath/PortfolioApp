import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ActLabel from "./ActLabel";
import Row from "./Row";
import TitleCard from "./TitleCard";
import { getTechCategory } from "../utils/techCategories";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaPython,
  FaJava,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiPostgresql,
  SiFastapi,
  SiSpring,
  SiNextdotjs,
  SiMongodb,
  SiMui,
  SiJest,
  SiCypress,
  SiKubernetes,
  SiRabbitmq,
  SiWebpack,
} from "react-icons/si";

// Full, flat skill inventory (unchanged content) — bucketed into rows below
// via the shared techCategories classifier instead of hand-grouped arrays.
const ALL_SKILLS = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript (ES6+)" },
  { name: "Redux", icon: <SiRedux /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Material UI", icon: <SiMui /> },
  { name: "HTML5", icon: <SiHtml5 /> },
  { name: "CSS3", icon: <SiCss3 /> },
  { name: "Webpack", icon: <SiWebpack /> },
  { name: "WCAG 2.1" },
  { name: "Python", icon: <FaPython /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "SQLAlchemy ORM" },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express.js" },
  { name: "REST APIs" },
  { name: "RabbitMQ", icon: <SiRabbitmq /> },
  { name: "JWT" },
  { name: "OAuth" },
  { name: "Spring Boot", icon: <SiSpring /> },
  { name: "Java", icon: <FaJava /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "Kubernetes", icon: <SiKubernetes /> },
  { name: "CI/CD" },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "Jest", icon: <SiJest /> },
  { name: "pytest" },
  { name: "Cypress", icon: <SiCypress /> },
  { name: "TDD" },
  { name: "Micro Frontends (MFE)" },
  { name: "Module Federation" },
  { name: "Design Patterns" },
  { name: "Performance Optimization" },
  { name: "i18n" },
  { name: "BFF" },
  { name: "Agile / XP" },
  { name: "Pair Programming" },
  { name: "LLM" },
  { name: "RAG" },
  { name: "Prompt Engineering" },
  { name: "AI-assisted Development" },
];

const ROW_META = {
  frontend: { title: "Frontend", accent: "bg-sky-400" },
  backend: { title: "Backend & APIs", accent: "bg-violet-400" },
  data: { title: "Data & Databases", accent: "bg-emerald-400" },
  ai: { title: "AI & LLM", accent: "bg-amber-400" },
  devops: { title: "DevOps & Testing", accent: "bg-teal-400" },
  practices: { title: "Architecture & Practices", accent: "bg-purple-400" },
  other: { title: "Other", accent: "bg-gray-400" },
};

const ROW_ORDER = ["frontend", "backend", "ai", "data", "devops", "practices", "other"];

const Skills = () => {
  const { t } = useTranslation();

  const rows = useMemo(() => {
    const grouped = {};
    ALL_SKILLS.forEach((skill) => {
      const lookupName = skill.name.replace(" (ES6+)", "");
      const category = getTechCategory(lookupName);
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(skill);
    });
    return ROW_ORDER.filter((key) => grouped[key]?.length).map((key) => ({
      key,
      ...ROW_META[key],
      skills: grouped[key],
    }));
  }, []);

  return (
    <section
      id="skills"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-12">
        <ActLabel act="I" className="mb-2" />
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {t("skills.techHeading")}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {rows.map((row) => (
          <Row
            key={row.key}
            title={row.title}
            accent={row.accent}
            ariaLabel={`${row.title} skills`}
          >
            {row.skills.map((skill, idx) => (
              <TitleCard key={idx} compact title={skill.name} icon={skill.icon} />
            ))}
          </Row>
        ))}
      </div>
    </section>
  );
};

export default Skills;
