import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const accents = [
  {
    border: "border-emerald-500/40",
    dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]",
    icon: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    year: "text-emerald-400",
  },
  {
    border: "border-violet-500/40",
    dot: "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.6)]",
    icon: "text-violet-300 bg-violet-500/10 border-violet-500/30",
    year: "text-violet-400",
  },
];

const Education = () => {
  const { t } = useTranslation();
  const educationList = t("education.list", { returnObjects: true });

  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
        {t("education.heading")}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical timeline bar */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/60 via-violet-300/20 to-transparent" />

        <div className="space-y-10">
          {educationList.map((edu, index) => {
            const isLeft = index % 2 === 0;
            const accent = accents[index % accents.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
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
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${accent.icon}`}
                    >
                      <FaGraduationCap className="text-base" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {edu.institution}
                      </p>
                      <p className={`text-xs font-medium mt-1.5 ${accent.year}`}>
                        {edu.years}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
