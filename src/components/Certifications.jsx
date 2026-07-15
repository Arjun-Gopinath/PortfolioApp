import { useTranslation } from "react-i18next";
import { SiMeta } from "react-icons/si";
import ActLabel from "./ActLabel";
import Row from "./Row";
import TitleCard from "./TitleCard";

const issuerIcon = {
  Meta: <SiMeta className="text-blue-400" />,
};

const certAccents = ["from-blue-400 to-sky-500", "from-sky-400 to-blue-500"];

const certTagClass = () => "text-blue-300 bg-blue-500/10 border-blue-500/20";

const Certifications = () => {
  const { t } = useTranslation();
  const certs = t("certifications.list", { returnObjects: true });
  const heading = t("certifications.heading");

  return (
    <section
      id="certifications"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-10">
        <ActLabel act="IV" className="mb-2" />
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {heading}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <Row title={heading} accent="bg-blue-400" ariaLabel={heading}>
          {certs.map((cert, i) => (
            <TitleCard
              key={i}
              title={cert.name}
              subtitle={`${cert.issuer} · ${cert.date}`}
              synopsis={`${cert.courses.length} ${t("certifications.courses")}: ${cert.courses.join(", ")}`}
              tags={[cert.type]}
              tagClassName={certTagClass}
              accent={certAccents[i % certAccents.length]}
              icon={issuerIcon[cert.issuer]}
              width="w-72 sm:w-80"
            />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Certifications;
