import { useTranslation } from "react-i18next";
import { SiMeta } from "react-icons/si";
import { FaCertificate, FaCheckCircle, FaAward } from "react-icons/fa";

const issuerIcon = {
  Meta: <SiMeta className="text-[#0668E1]" />,
};

const Certifications = () => {
  const { t } = useTranslation();
  const certs = t("certifications.list", { returnObjects: true }) || [];
  const heading = t("certifications.heading") || "Certifications";

  return (
    <section id="certifications" className="font-mono text-gray-200 space-y-6">
      {/* Terminal CLI Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaCertificate className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">gpg --verify</span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/credentials/certificates.sig
          </h2>
          <span className="text-xs text-gray-500">
            ({certs.length} verified credentials)
          </span>
        </div>
        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
          <FaCheckCircle className="text-[10px]" /> valid signatures
        </span>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert, i) => (
          <article
            key={i}
            className="border border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff] rounded-lg p-5 transition-colors flex flex-col justify-between space-y-4"
          >
            {/* Header: Issuer Icon, Name, Date */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg p-1.5 rounded bg-[#161b22] border border-[#30363d]">
                    {issuerIcon[cert.issuer] || (
                      <FaAward className="text-amber-400" />
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-[#58a6ff]">
                      {cert.issuer} &middot;{" "}
                      <span className="text-gray-400">{cert.date}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Badge / Type */}
              <div className="flex items-center gap-2 pt-1">
                {cert.type && (
                  <span className="text-[10px] px-2 py-0.5 rounded border border-blue-500/30 bg-blue-950/40 text-blue-300">
                    [{cert.type}]
                  </span>
                )}
                <span className="text-[10px] text-gray-500 font-mono">
                  ID: CRT-00{i + 1}
                </span>
              </div>
            </div>

            {/* Courses / Modules Breakdown */}
            {Array.isArray(cert.courses) && cert.courses.length > 0 && (
              <div className="pt-3 border-t border-[#30363d]/50 space-y-2">
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                  // {cert.courses.length}{" "}
                  {t("certifications.courses") || "Courses Completed"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.courses.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[11px] bg-[#161b22] border border-[#30363d] text-gray-300 px-2 py-0.5 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
