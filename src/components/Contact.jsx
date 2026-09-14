import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaFileDownload,
  FaNetworkWired,
} from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

  const channels = [
    {
      protocol: "SMTP",
      label: t("contact.email"),
      address: "arjungopinath06@gmail.com",
      href: "mailto:arjungopinath06@gmail.com?subject=Kudos%20on%20the%20Portfolio&body=Hi%20Arjun%2C%0A%0AI%20just%20checked%20out%20your%20portfolio%20and%20I%20really%20loved%20the%20work%20you've%20done!%0A%0AJust%20wanted%20to%20reach%20out%20and%20say%20keep%20up%20the%20great%20work!",
      icon: <FaEnvelope className="text-[#58a6ff]" />,
      action: "send_mail()",
      primary: true,
    },
    {
      protocol: "HTTPS",
      label: t("contact.linkedin"),
      address: "in/arjun-g-b3b57b1a1",
      href: "https://www.linkedin.com/in/arjun-g-b3b57b1a1/",
      icon: <FaLinkedin className="text-[#0a66c2]" />,
      action: "connect()",
      target: "_blank",
    },
    {
      protocol: "GIT/SSH",
      label: t("contact.github"),
      address: "github.com/Arjun-Gopinath",
      href: "https://github.com/Arjun-Gopinath",
      icon: <FaGithub className="text-gray-300" />,
      action: "view_profile()",
      target: "_blank",
    },
    {
      protocol: "STATIC/PDF",
      label: t("contact.resume"),
      address: "arjun-gopinath-resume.pdf",
      href: "/resume/arjun-gopinath-resume.pdf",
      icon: <FaFileDownload className="text-[#3fb950]" />,
      action: "curl -O resume",
      download: true,
    },
  ];

  return (
    <section id="contact" className="font-mono text-gray-200 space-y-6">
      {/* Terminal Header */}
      <div className="border-b border-[#30363d] pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaNetworkWired className="text-[#3fb950] text-sm" />
          <span className="text-gray-400 text-xs">netstat --listen</span>
          <h2 className="text-base font-semibold text-gray-100">
            ~/network/open-ports
          </h2>
        </div>
        <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
          PORT: 25, 443 [OPEN]
        </span>
      </div>

      {/* Description / Summary Box */}
      <div className="border border-[#30363d] bg-[#0d1117] rounded-lg p-5 sm:p-6 space-y-5">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">// Handshake Request</p>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            {t("contact.heading")}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
            {t("contact.description")}
          </p>
        </div>

        {/* Network Connection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.href}
              target={ch.target}
              rel={ch.target ? "noopener noreferrer" : undefined}
              download={ch.download}
              className={`group p-3.5 rounded border transition-colors flex items-center justify-between ${
                ch.primary
                  ? "border-[#58a6ff]/40 bg-[#161b22] hover:border-[#58a6ff]"
                  : "border-[#30363d] bg-[#161b22]/50 hover:bg-[#161b22] hover:border-gray-500"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-base shrink-0">{ch.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-gray-500 font-bold">
                      [{ch.protocol}]
                    </span>
                    <span className="text-xs font-semibold text-gray-200 group-hover:text-white truncate">
                      {ch.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    {ch.address}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-[#58a6ff] group-hover:underline ml-2 shrink-0 font-medium">
                {ch.action} &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
