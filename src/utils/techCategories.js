// Shared tech classification, lifted out of Projects.jsx so Skills, Projects,
// and Certifications can all bucket/color tags from one source of truth.

export const FRONTEND = new Set([
  "React", "Next.js", "AngularJS", "Redux", "CSS3", "SASS", "HTML5",
  "Bootstrap", "TailwindCSS", "Tailwind", "Tailwind CSS", "TypeScript",
  "JavaScript", "Webpack", "Phaser 3", "WebGL", "Vite", "Framer Motion",
  "Material UI", "WCAG 2.1",
]);

export const BACKEND = new Set([
  "Node.js", "Express.js", "FastAPI", "Java", "Spring Boot", "Python",
  "Flask", "SQLAlchemy ORM", "REST APIs", "RabbitMQ", "JWT", "OAuth",
]);

export const DATA = new Set(["PostgreSQL", "MySQL", "LightGBM", "Anaconda", "MongoDB"]);

export const AI = new Set([
  "LLM", "RAG", "LangGraph", "LangChain", "Ollama", "Temporal", "Streamlit",
  "Prompt Engineering", "AI-assisted Development",
]);

export const DEVOPS_TESTING = new Set([
  "Docker", "Kubernetes", "CI/CD", "Git", "Jest", "pytest", "Cypress", "TDD",
]);

export const PRACTICES = new Set([
  "Micro Frontends (MFE)", "Module Federation", "Design Patterns",
  "Performance Optimization", "i18n", "BFF", "Agile / XP", "Pair Programming",
]);

export const getTechCategory = (tech) => {
  if (FRONTEND.has(tech)) return "frontend";
  if (BACKEND.has(tech)) return "backend";
  if (DATA.has(tech)) return "data";
  if (AI.has(tech)) return "ai";
  if (DEVOPS_TESTING.has(tech)) return "devops";
  if (PRACTICES.has(tech)) return "practices";
  return "other";
};

export const getTechColor = (tech) => {
  switch (getTechCategory(tech)) {
    case "frontend":
      return "text-sky-300 bg-sky-500/10 border-sky-500/20";
    case "backend":
      return "text-violet-300 bg-violet-500/10 border-violet-500/20";
    case "data":
      return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
    case "ai":
      return "text-amber-300 bg-amber-500/10 border-amber-500/20";
    default:
      return "text-teal-300 bg-teal-500/10 border-teal-500/20";
  }
};
