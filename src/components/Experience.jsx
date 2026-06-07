import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";

const accentStyles = [
  {
    badge: "bg-teal-500/10 border-teal-500/30 text-teal-300",
    dot: "bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.7)]",
    bullet: "bg-teal-400",
    pastDot: "bg-teal-700",
    border: "border-teal-500/40",
  },
  {
    badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    dot: "bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.7)]",
    bullet: "bg-purple-400",
    pastDot: "bg-purple-700",
    border: "border-purple-500/40",
  },
  {
    badge: "bg-sky-500/10 border-sky-500/30 text-sky-300",
    dot: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    bullet: "bg-sky-400",
    pastDot: "bg-sky-700",
    border: "border-sky-500/40",
  },
  {
    badge: "bg-gray-500/10 border-gray-500/30 text-gray-400",
    dot: "bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]",
    bullet: "bg-gray-400",
    pastDot: "bg-gray-600",
    border: "border-gray-500/40",
  },
];

const parseRole = (roleStr) => {
  const match = roleStr.match(/^(.+?)\s*\((.+)\)$/);
  return match
    ? { title: match[1].trim(), period: match[2].trim() }
    : { title: roleStr, period: "" };
};

const DesktopExperience = ({ jobs, heading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.min(jobs.length - 1, Math.floor(v * jobs.length));
    setActiveStep(step);
  });

  const accent = accentStyles[activeStep % accentStyles.length];

  return (
    <div
      ref={containerRef}
      style={{ height: `${jobs.length * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen bg-gray-950 flex flex-col px-8 lg:px-16 xl:px-20 overflow-hidden"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {/* Header — sits below the navbar (~64px), pt-20 gives clearance */}
        <div className="pt-20 pb-6 shrink-0 flex items-end justify-between border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1">
              Professional
            </p>
            <h2 className="text-2xl font-bold text-white">{heading}</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-0.5">
                Experience
              </p>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                5+ Years
              </p>
            </div>
            <div className="font-mono text-gray-600 text-sm tabular-nums">
              <span className="text-white font-semibold text-lg">
                {String(activeStep + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(jobs.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-12 lg:gap-20 flex-1 min-h-0 py-10">
          {/* Left: active job */}
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
                <span
                  className={`inline-flex items-center text-xs px-3 py-1 rounded-full border mb-5 font-medium ${accent.badge}`}
                >
                  {parseRole(jobs[activeStep].role).period}
                </span>

                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {jobs[activeStep].title}
                </h3>

                <p className="text-gray-400 mb-8 text-base">
                  {parseRole(jobs[activeStep].role).title}
                </p>

                <ul className="space-y-3 max-w-lg">
                  {jobs[activeStep].responsibilities.map((item, i) => (
                    <motion.li
                      key={`${activeStep}-${i}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accent.bullet}`}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: dot timeline sidebar */}
          <div className="w-52 lg:w-60 shrink-0 flex items-center">
            <div className="relative w-full">
              {/* Background track */}
              <div className="absolute left-[5px] top-3 bottom-3 w-px bg-white/8" />
              {/* Animated fill */}
              <motion.div
                className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-sky-400/80 to-blue-500/80 origin-top"
                style={{ scaleY: lineScaleY }}
              />

              <div className="space-y-8 relative">
                {jobs.map((job, i) => {
                  const a = accentStyles[i % accentStyles.length];
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <div key={i} className="flex items-start gap-4 pl-1">
                      <div
                        className={`w-3 h-3 rounded-full mt-0.5 z-10 relative shrink-0 transition-all duration-500 ${
                          isActive
                            ? `scale-125 ${a.dot}`
                            : isPast
                            ? a.pastDot
                            : "bg-white/15"
                        }`}
                      />
                      <div
                        className={`transition-all duration-300 min-w-0 ${
                          isActive ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {parseRole(job.role).period}
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

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("skills.jobs", { returnObjects: true });
  const heading = t("skills.heading");

  return (
    <section id="experience" className="text-white">
      {/* Desktop: pinned scroll journey */}
      <div className="hidden md:block">
        <DesktopExperience jobs={jobs} heading={heading} />
      </div>

      {/* Mobile: vertical timeline */}
      <div
        className="md:hidden py-16 px-4 sm:px-6 bg-gray-950"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <div className="max-w-lg mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1">
            Professional
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-white">{heading}</h2>
            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
              5+ Years
            </p>
          </div>
        </div>

        <div className="relative max-w-lg mx-auto">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-sky-400/60 via-sky-300/20 to-transparent" />

          <div className="space-y-8">
            {jobs.map((job, idx) => {
              const accent = accentStyles[idx % accentStyles.length];
              const { title: roleTitle, period } = parseRole(job.role);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative pl-10"
                >
                  <div
                    className={`absolute left-2.5 top-2 w-3 h-3 rounded-full z-10 -translate-x-1/2 ${accent.dot}`}
                  />
                  <div
                    className={`backdrop-blur-md bg-white/5 border ${accent.border} rounded-2xl p-5 shadow-md`}
                  >
                    <span
                      className={`inline-flex text-xs px-2 py-0.5 rounded-full border mb-3 ${accent.badge}`}
                    >
                      {period}
                    </span>
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{roleTitle}</p>
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
      </div>
    </section>
  );
};

export default Experience;
