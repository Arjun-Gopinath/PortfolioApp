import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SiMeta } from "react-icons/si";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const issuerIcon = {
  Meta: <SiMeta className="text-blue-400 text-xl" />,
};

const CertCard = ({ cert, index }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-sky-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
          {issuerIcon[cert.issuer] ?? (
            <span className="text-blue-400 text-xs font-bold">
              {cert.issuer[0]}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-sky-200 leading-snug">
            {cert.name}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">
            {cert.issuer} &middot; {cert.type}
          </p>
          <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
        </div>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 transition-colors duration-200"
        aria-expanded={expanded}
      >
        <span className="bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
          {cert.courses.length} {t("certifications.courses")}
        </span>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
        {expanded ? t("certifications.hideCourses") : t("certifications.showCourses")}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 space-y-1 overflow-hidden"
          >
            {cert.courses.map((course, i) => (
              <li
                key={i}
                className="text-sm text-gray-300 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-sky-500 before:shrink-0"
              >
                {course}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Certifications = () => {
  const { t } = useTranslation();
  const certs = t("certifications.list", { returnObjects: true });

  return (
    <section
      id="certifications"
      className="py-20 px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {t("certifications.heading")}
      </h2>

      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {certs.map((cert, i) => (
          <CertCard key={i} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;
