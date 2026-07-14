import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SiMeta } from "react-icons/si";
import ActLabel from "./ActLabel";

const issuerIcon = {
  Meta: <SiMeta className="text-blue-400" style={{ fontSize: "2rem" }} />,
};

const issuerAccent = {
  Meta: {
    badge: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    dot: "bg-blue-400",
    glow: "shadow-[0_0_24px_rgba(96,165,250,0.15)]",
  },
};

const defaultAccent = {
  badge: "bg-sky-500/10 border-sky-500/30 text-sky-300",
  dot: "bg-sky-400",
  glow: "",
};

const CertCard = ({ cert, index }) => {
  const { t } = useTranslation();
  const accent = issuerAccent[cert.issuer] ?? defaultAccent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`relative backdrop-blur-lg bg-white/5 border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 ${accent.glow}`}
    >
      {/* Accent top bar */}
      <div className={`h-px w-full ${accent.dot === "bg-blue-400" ? "bg-gradient-to-r from-blue-400/60 via-blue-300/20 to-transparent" : "bg-gradient-to-r from-sky-400/60 via-sky-300/20 to-transparent"}`} />

      <div className="p-6 md:p-8">
        {/* Desktop: two-column */}
        <div className="hidden md:grid grid-cols-[1fr_1.2fr] gap-10">
          {/* Left: cert identity */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                {issuerIcon[cert.issuer] ?? (
                  <span className="text-blue-400 text-xl font-bold">
                    {cert.issuer[0]}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-600 mb-0.5">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-500">{cert.date}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white leading-snug mb-3">
              {cert.name}
            </h3>

            <span className={`self-start text-xs px-3 py-1 rounded-full border font-medium ${accent.badge}`}>
              {cert.type}
            </span>
          </div>

          {/* Right: course list */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-gray-600 mb-4">
              {cert.courses.length} {t("certifications.courses")}
            </p>
            <ul className="grid grid-cols-1 gap-2">
              {cert.courses.map((course, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
                  className="flex items-center gap-2.5 text-sm text-gray-300"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                  {course}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center shrink-0">
              {issuerIcon[cert.issuer] ?? (
                <span className="text-blue-400 text-sm font-bold">
                  {cert.issuer[0]}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500">{cert.issuer} · {cert.date}</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 leading-snug">
            {cert.name}
          </h3>

          <span className={`inline-flex text-xs px-2.5 py-0.5 rounded-full border mb-5 font-medium ${accent.badge}`}>
            {cert.type}
          </span>

          <p className="text-xs uppercase tracking-[0.15em] text-gray-600 mb-3">
            {cert.courses.length} {t("certifications.courses")}
          </p>
          <ul className="space-y-2">
            {cert.courses.map((course, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { t } = useTranslation();
  const certs = t("certifications.list", { returnObjects: true });

  return (
    <section
      id="certifications"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-12">
        <ActLabel act="IV" className="mb-2" />
        <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {t("certifications.heading")}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {certs.map((cert, i) => (
          <CertCard key={i} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;
