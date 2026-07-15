import { useTranslation } from "react-i18next";
import ActLabel from "./ActLabel";
import Row from "./Row";
import TitleCard from "./TitleCard";

const accentGradients = [
  "from-teal-400 to-emerald-500",
  "from-purple-400 to-pink-500",
  "from-sky-400 to-blue-500",
];

const parseRole = (roleStr) => {
  const match = roleStr.match(/^(.+?)\s*\((.+)\)$/);
  return match
    ? { title: match[1].trim(), period: match[2].trim() }
    : { title: roleStr, period: "" };
};

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("skills.jobs", { returnObjects: true });
  const heading = t("skills.heading");

  return (
    <section
      id="experience"
      className="py-20 px-6 md:px-12 bg-gray-950 text-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <ActLabel act="II" className="mb-2" />
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {heading}
          </h2>
        </div>
        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
          5+ Years
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Row title={heading} accent="bg-teal-400" ariaLabel={heading}>
          {jobs.map((job, idx) => {
            const { title: roleTitle, period } = parseRole(job.role);
            return (
              <TitleCard
                key={idx}
                title={job.title}
                subtitle={`${roleTitle} · ${period}`}
                bullets={job.responsibilities}
                accent={accentGradients[idx % accentGradients.length]}
                width="w-72 sm:w-80"
              />
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default Experience;
