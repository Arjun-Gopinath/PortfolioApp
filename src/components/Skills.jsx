import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getTechCategory } from "../utils/techCategories";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaPython,
  FaJava,
  FaGitAlt,
  FaTerminal,
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

const ALL_SKILLS = [
  { name: "React", icon: <FaReact className="text-[#61dafb]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178c6]" /> },
  { name: "JavaScript (ES6+)" },
  { name: "Redux", icon: <SiRedux className="text-[#764abc]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38bdf8]" /> },
  { name: "Material UI", icon: <SiMui className="text-[#007fff]" /> },
  { name: "HTML5", icon: <SiHtml5 className="text-[#e34f26]" /> },
  { name: "CSS3", icon: <SiCss3 className="text-[#1572b6]" /> },
  { name: "Webpack", icon: <SiWebpack className="text-[#8dd6f9]" /> },
  { name: "WCAG 2.1" },
  { name: "Python", icon: <FaPython className="text-[#3776ab]" /> },
  { name: "FastAPI", icon: <SiFastapi className="text-[#059669]" /> },
  { name: "SQLAlchemy ORM" },
  { name: "Node.js", icon: <FaNodeJs className="text-[#5fa04e]" /> },
  { name: "Express.js" },
  { name: "REST APIs" },
  { name: "RabbitMQ", icon: <SiRabbitmq className="text-[#ff6600]" /> },
  { name: "JWT" },
  { name: "OAuth" },
  { name: "Spring Boot", icon: <SiSpring className="text-[#6db33f]" /> },
  { name: "Java", icon: <FaJava className="text-[#e76f00]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169e1]" /> },
  { name: "MySQL", icon: <SiMysql className="text-[#00758f]" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47a248]" /> },
  { name: "Docker", icon: <FaDocker className="text-[#2496ed]" /> },
  { name: "Kubernetes", icon: <SiKubernetes className="text-[#326ce5]" /> },
  { name: "CI/CD" },
  { name: "Git", icon: <FaGitAlt className="text-[#f05032]" /> },
  { name: "Jest", icon: <SiJest className="text-[#c21325]" /> },
  { name: "pytest" },
  { name: "Cypress", icon: <SiCypress className="text-[#17202c]" /> },
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
  frontend: { title: "frontend", badge: "text-sky-400" },
  backend: { title: "backend-and-apis", badge: "text-violet-400" },
  ai: { title: "ai-and-llm", badge: "text-amber-400" },
  data: { title: "data-and-databases", badge: "text-emerald-400" },
  devops: { title: "devops-and-testing", badge: "text-teal-400" },
  practices: { title: "architecture-and-practices", badge: "text-purple-400" },
  other: { title: "miscellaneous", badge: "text-gray-400" },
};

const ROW_ORDER = [
  "frontend",
  "backend",
  "ai",
  "data",
  "devops",
  "practices",
  "other",
];

const Skills = () => {
  const { t } = useTranslation();

  const categories = useMemo(() => {
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
    <section id="skills" className="font-mono text-gray-200 space-y-6">
      {/* CLI Section Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaTerminal className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">tree</span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/skills/inventory
          </h2>
          <span className="text-xs text-gray-500">
            ({ALL_SKILLS.length} packages loaded)
          </span>
        </div>
        <span className="text-[11px] text-gray-500 hidden sm:inline">
          read-only mode
        </span>
      </div>

      {/* Directory Tree Structure */}
      <div className="space-y-6">
        {categories.map((cat, catIdx) => {
          const isLastCategory = catIdx === categories.length - 1;
          const rootBranch = isLastCategory ? "└──" : "├──";

          return (
            <div
              key={cat.key}
              className="border border-[#30363d] bg-[#0d1117] rounded-lg p-4 space-y-3"
            >
              {/* Category Branch Title */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 select-none font-bold">
                  {rootBranch}
                </span>
                <span className={`font-semibold ${cat.badge}`}>
                  {cat.title}/
                </span>
                <span className="text-gray-500 text-[11px]">
                  ({cat.skills.length} modules)
                </span>
              </div>

              {/* Skill Nodes Grid */}
              <div className="pl-5 border-l border-[#30363d]/50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="flex items-center gap-2 bg-[#161b22] border border-[#30363d]/70 hover:border-[#58a6ff] px-2.5 py-1.5 rounded text-xs transition-colors group"
                  >
                    {skill.icon ? (
                      <span className="text-sm shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                        {skill.icon}
                      </span>
                    ) : (
                      <span className="text-gray-600 font-bold shrink-0">
                        &bull;
                      </span>
                    )}
                    <span className="text-gray-300 group-hover:text-white truncate">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
