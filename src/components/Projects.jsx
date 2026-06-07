import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaExternalLinkAlt, FaGamepad } from "react-icons/fa";

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

const dotColors = [
  { active: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]", past: "bg-sky-700" },
  { active: "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]", past: "bg-blue-700" },
  { active: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]", past: "bg-violet-700" },
  { active: "bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.7)]", past: "bg-teal-700" },
  { active: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]", past: "bg-emerald-700" },
  { active: "bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.7)]", past: "bg-purple-700" },
];

const FRONTEND = new Set([
  "React", "Next.js", "AngularJS", "Redux", "CSS3", "SASS", "HTML5",
  "Bootstrap", "TailwindCSS", "Tailwind", "TypeScript", "JavaScript",
  "Webpack", "Phaser 3", "WebGL", "Vite", "Framer Motion",
]);
const BACKEND = new Set([
  "Node.js", "Express.js", "FastAPI", "Java", "Spring Boot", "Python", "Flask",
]);
const DATA = new Set(["PostgreSQL", "MySQL", "LightGBM", "Anaconda", "MongoDB"]);

const getTechColor = (tech) => {
  if (FRONTEND.has(tech)) return "text-sky-300 bg-sky-500/10 border-sky-500/20";
  if (BACKEND.has(tech)) return "text-violet-300 bg-violet-500/10 border-violet-500/20";
  if (DATA.has(tech)) return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
  return "text-teal-300 bg-teal-500/10 border-teal-500/20";
};

const DesktopProjects = ({ projects, heading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.min(projects.length - 1, Math.floor(v * projects.length));
    setActiveStep(step);
  });

  const project = projects[activeStep];
  const accent = cardAccents[activeStep % cardAccents.length];
  const dc = dotColors[activeStep % dotColors.length];

  return (
    <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
      <div
        className="sticky top-0 h-screen bg-gray-950 flex flex-col px-8 lg:px-16 xl:px-20 overflow-hidden"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {/* Header */}
        <div className="pt-20 pb-6 shrink-0 flex items-end justify-between border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1">
              Selected
            </p>
            <h2 className="text-2xl font-bold text-white">{heading}</h2>
          </div>
          <div className="font-mono text-gray-600 text-sm tabular-nums">
            <span className="text-white font-semibold text-lg">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-12 lg:gap-20 flex-1 min-h-0 py-10">
          {/* Left: active project */}
          <div className="flex-1 flex items-center min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-2xl"
              >
                {/* Accent line */}
                <div className={`h-0.5 w-12 bg-gradient-to-r ${accent} mb-6 rounded-full`} />

                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {project.name}
                </h3>

                <p className="text-gray-400 text-base mb-6 max-w-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={`${activeStep}-${i}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      className={`border px-2.5 py-1 rounded-full text-xs ${getTechColor(tech)}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {project.links?.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <motion.a
                        key={`${activeStep}-link-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.25 }}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/8 hover:bg-sky-600/30 border border-white/10 hover:border-sky-500/40 px-4 py-2 rounded-full text-sm text-gray-200 hover:text-white transition-all duration-200"
                      >
                        {getLinkIcon(link.url)}
                        {link.text}
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: dot timeline sidebar */}
          <div className="w-52 lg:w-60 shrink-0 flex items-center">
            <div className="relative w-full">
              <div className="absolute left-[5px] top-3 bottom-3 w-px bg-white/8" />
              <motion.div
                className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-sky-400/80 to-purple-500/80 origin-top"
                style={{ scaleY: lineScaleY }}
              />

              <div className="space-y-6 relative">
                {projects.map((proj, i) => {
                  const d = dotColors[i % dotColors.length];
                  return (
                    <div key={i} className="flex items-start gap-4 pl-1">
                      <div
                        className={`w-3 h-3 rounded-full mt-0.5 z-10 relative shrink-0 transition-all duration-500 ${
                          i === activeStep
                            ? `scale-125 ${d.active}`
                            : i < activeStep
                            ? d.past
                            : "bg-white/15"
                        }`}
                      />
                      <div
                        className={`transition-all duration-300 min-w-0 ${
                          i === activeStep ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white truncate">
                          {proj.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true });
  const heading = t("projects.heading");

  return (
    <section id="projects" className="text-white">
      {/* Desktop: pinned scroll journey */}
      <div className="hidden md:block">
        <DesktopProjects projects={projects} heading={heading} />
      </div>

      {/* Mobile: card grid */}
      <div
        className="md:hidden py-16 px-4 sm:px-6 bg-gray-950"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1 text-center">
            Selected
          </p>
          <h2 className="text-3xl font-bold text-white text-center">{heading}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div className="relative overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg p-5 flex flex-col justify-between h-full">
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cardAccents[idx % cardAccents.length]}`}
                />
                <div>
                  <h3 className="text-lg font-semibold text-sky-200 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`border px-2 py-0.5 rounded-full ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.links?.length > 0 && (
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
      </div>
    </section>
  );
};

export default Projects;
