import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGraduationCap } from "react-icons/fa";

const eduAccents = [
  {
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
    pastDot: "bg-emerald-700",
    border: "border-emerald-500/40",
    icon: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    year: "text-emerald-400",
  },
  {
    badge: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    dot: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]",
    pastDot: "bg-violet-700",
    border: "border-violet-500/40",
    icon: "text-violet-300 bg-violet-500/10 border-violet-500/30",
    year: "text-violet-400",
  },
];

const DesktopEducation = ({ items, heading }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.min(items.length - 1, Math.floor(v * items.length));
    setActiveStep(step);
  });

  const accent = eduAccents[activeStep % eduAccents.length];

  return (
    <div ref={containerRef} style={{ height: `${items.length * 100}vh` }}>
      <div
        className="sticky top-0 h-screen bg-gray-950 flex flex-col px-8 lg:px-16 xl:px-20 overflow-hidden"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {/* Header */}
        <div className="pt-20 pb-6 shrink-0 flex items-end justify-between border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1">
              Educational
            </p>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{heading}</h2>
          </div>
          <div className="font-mono text-gray-600 text-sm tabular-nums">
            <span className="text-white font-semibold text-lg">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(items.length).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-12 lg:gap-20 flex-1 min-h-0 py-10">
          {/* Left: active education entry */}
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
                  {items[activeStep].years}
                </span>

                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {items[activeStep].degree}
                </h3>

                <p className="text-gray-400 text-base">
                  {items[activeStep].institution}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: dot sidebar */}
          <div className="w-52 lg:w-60 shrink-0 flex items-center">
            <div className="relative w-full">
              <div className="absolute left-[5px] top-3 bottom-3 w-px bg-white/8" />
              <motion.div
                className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-400/80 to-violet-500/80 origin-top"
                style={{ scaleY: lineScaleY }}
              />

              <div className="space-y-8 relative">
                {items.map((edu, i) => {
                  const a = eduAccents[i % eduAccents.length];
                  return (
                    <div key={i} className="flex items-start gap-4 pl-1">
                      <div
                        className={`w-3 h-3 rounded-full mt-0.5 z-10 relative shrink-0 transition-all duration-500 ${
                          i === activeStep
                            ? `scale-125 ${a.dot}`
                            : i < activeStep
                            ? a.pastDot
                            : "bg-white/15"
                        }`}
                      />
                      <div
                        className={`transition-all duration-300 min-w-0 ${
                          i === activeStep ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {edu.institution}
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

const Education = () => {
  const { t } = useTranslation();
  const educationList = t("education.list", { returnObjects: true });
  const heading = t("education.heading");

  // Data is already reverse-chronological (latest first) in the source
  const ordered = [...educationList];

  return (
    <section id="education" className="text-white">
      {/* Desktop: pinned scroll journey */}
      <div className="hidden md:block">
        <DesktopEducation items={ordered} heading={heading} />
      </div>

      {/* Mobile: vertical stack */}
      <div
        className="md:hidden py-16 px-4 sm:px-6 bg-gray-950"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-1 text-center">
            Educational
          </p>
          <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{heading}</h2>
        </div>

        <div className="max-w-lg mx-auto space-y-6">
          {ordered.map((edu, i) => {
            const accent = eduAccents[i % eduAccents.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`backdrop-blur-md bg-white/5 border ${accent.border} rounded-2xl p-5 shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${accent.icon}`}
                  >
                    <FaGraduationCap className="text-base" />
                  </div>
                  <div>
                    <span
                      className={`inline-flex text-xs px-2 py-0.5 rounded-full border mb-2 ${accent.badge}`}
                    >
                      {edu.years}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{edu.institution}</p>
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
