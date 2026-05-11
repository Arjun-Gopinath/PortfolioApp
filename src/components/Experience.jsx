import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const accents = [
  {
    border: "border-teal-500/40",
    dot: "bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]",
    icon: "text-teal-300 bg-teal-500/10 border-teal-500/30",
    bullet: "bg-teal-400",
  },
  {
    border: "border-purple-500/40",
    dot: "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.6)]",
    icon: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    bullet: "bg-purple-400",
  },
  {
    border: "border-sky-500/40",
    dot: "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]",
    icon: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    bullet: "bg-sky-400",
  },
  {
    border: "border-gray-500/40",
    dot: "bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]",
    icon: "text-gray-300 bg-gray-500/10 border-gray-500/30",
    bullet: "bg-gray-400",
  },
];

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("skills.jobs", { returnObjects: true });

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
        {t("skills.heading")}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical timeline bar */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-sky-400/60 via-sky-300/20 to-transparent" />

        <div className="space-y-10">
          {jobs.map((job, idx) => {
            const isLeft = idx % 2 === 0;
            const accent = accents[idx % accents.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`relative flex ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-7 w-3 h-3 rounded-full z-10 ${accent.dot}`}
                />

                {/* Card */}
                <div
                  className={`w-full md:w-[46%] backdrop-blur-md bg-white/5 border ${accent.border} rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Company + role header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 font-bold text-sm ${accent.icon}`}
                    >
                      {job.title[0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5 leading-snug">
                        {job.role}
                      </p>
                    </div>
                  </div>

                  {/* Responsibilities — always visible */}
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-gray-300">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accent.bullet}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
