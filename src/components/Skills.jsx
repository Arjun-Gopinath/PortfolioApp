import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaPython,
  FaJava,
  FaGitAlt,
  FaJenkins,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiMysql,
  SiPostgresql,
  SiFastapi,
  SiSpring,
  SiNextdotjs,
  SiAngular,
  SiSass,
  SiGithubactions,
  SiCircleci,
} from "react-icons/si";

const Skills = () => {
  const { t } = useTranslation();

  const categorizedSkills = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "AngularJS", icon: <SiAngular /> },
        { name: "Redux", icon: <SiRedux /> },
        { name: "Context API" },
        { name: "CSS3", icon: <SiCss3 /> },
        { name: "SASS", icon: <SiSass /> },
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
        { name: "TailwindCSS", icon: <SiTailwindcss /> },
        { name: "TypeScript", icon: <SiTypescript /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express.js" },
        { name: "FastAPI", icon: <SiFastapi /> },
        { name: "Java", icon: <FaJava /> },
        { name: "Spring Boot", icon: <SiSpring /> },
        { name: "Python", icon: <FaPython /> },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MySQL", icon: <SiMysql /> },
      ],
    },
    {
      title: "DevOps & CI/CD",
      skills: [
        { name: "Docker", icon: <FaDocker /> },
        { name: "Jenkins", icon: <FaJenkins /> },
        { name: "CircleCI", icon: <SiCircleci /> },
        { name: "GitHub Actions", icon: <SiGithubactions /> },
        { name: "AWS Basics", icon: <FaAws /> },
        { name: "Git", icon: <FaGitAlt /> },
      ],
    },
    {
      title: "Practices",
      skills: [
        { name: "TDD" },
        { name: "Agile/Scrum" },
        { name: "CI/CD" },
        { name: "Atomic Design" },
        { name: "MFE Architecture" },
      ],
    },
    {
      title: "Other",
      skills: [
        { name: "LLMs" },
        { name: "Chatbot Integration" },
        { name: "Temporal Workflows" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-16 px-6 md:px-12 transition-all duration-500 bg-gray-900 text-white"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        {t("skills.techHeading")}
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categorizedSkills.map((category, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
          >
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/5 text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4"
            >
              <h3 className="text-lg font-bold text-sky-200">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/20 text-white rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:scale-105 transition-transform duration-200"
                  >
                    {skill.icon && (
                      <span className="text-lg text-sky-300">{skill.icon}</span>
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
