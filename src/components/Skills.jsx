import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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

const categoryAccents = [
  "bg-sky-400",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-purple-400",
  "bg-amber-400",
];

const Skills = () => {
  const { t } = useTranslation();

  const categorizedSkills = [
    {
      title: "Frontend",
      skills: [
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
      ],
    },
    {
      title: "Backend",
      skills: [
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
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MySQL", icon: <SiMysql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
      ],
    },
    {
      title: "DevOps & Testing",
      skills: [
        { name: "Docker", icon: <FaDocker /> },
        { name: "Kubernetes", icon: <SiKubernetes /> },
        { name: "CI/CD" },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Jest", icon: <SiJest /> },
        { name: "pytest" },
        { name: "Cypress", icon: <SiCypress /> },
        { name: "TDD" },
      ],
    },
    {
      title: "Architecture",
      skills: [
        { name: "Micro Frontends (MFE)" },
        { name: "Module Federation" },
        { name: "Design Patterns" },
        { name: "Performance Optimization" },
        { name: "i18n" },
        { name: "BFF" },
      ],
    },
    {
      title: "Practices & AI",
      skills: [
        { name: "Agile / XP" },
        { name: "Pair Programming" },
        { name: "LLM" },
        { name: "RAG" },
        { name: "Prompt Engineering" },
        { name: "AI-assisted Development" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1">
          Technical
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {t("skills.techHeading")}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {categorizedSkills.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
          >
            {/* Desktop: two-column */}
            <div className="hidden md:grid grid-cols-[180px_1fr] gap-8 items-start">
              <div className="flex flex-col gap-2 pt-1">
                <div
                  className={`h-0.5 w-6 rounded-full ${categoryAccents[index % categoryAccents.length]}`}
                />
                <span className="text-xl font-bold text-gray-600">
                  {category.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    title={skill.name}
                    className="flex items-center gap-2 bg-white/8 border border-white/10 text-white rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:scale-105 hover:bg-white/15 transition-all duration-200"
                  >
                    {skill.icon && (
                      <span className="text-base text-sky-300">{skill.icon}</span>
                    )}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: label + rule + pills */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-gray-500 shrink-0">
                  {category.title}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    title={skill.name}
                    className="flex items-center gap-2 bg-white/8 border border-white/10 text-white rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:scale-105 hover:bg-white/15 transition-all duration-200"
                  >
                    {skill.icon && (
                      <span className="text-base text-sky-300">{skill.icon}</span>
                    )}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
