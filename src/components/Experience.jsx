import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaBuilding } from "react-icons/fa";

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t("skills.jobs", { returnObjects: true });

  return (
    <section
      id="experience"
      className="py-16 px-4 sm:px-6 md:px-12 bg-gray-900 text-white"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
        {t("skills.heading")}
      </h2>

      <div className="relative max-w-4xl mx-auto space-y-12">
        {/* Timeline bar for larger screens */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-sky-300" />

        {jobs.map((job, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              className={`w-full ${isLeft ? "md:pr-[55%]" : "md:pl-[55%]"}`}
            >
              <div
                className={`relative group rounded-xl shadow-lg transition-all duration-500 cursor-pointer 
                  backdrop-blur-md bg-white/5 border border-white/10
                  ${isLeft ? "md:ml-auto" : "md:mr-auto"}
                  hover:shadow-xl`}
              >
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-sky-200 flex items-center gap-2">
                    <FaBuilding className="text-sky-400" />
                    {job.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100">
                    {job.role}
                  </p>

                  <div
                    className={`transition-all duration-500 overflow-hidden mt-4 ${
                      // Always expanded on small screens, hover-expand on large
                      "max-h-[1000px] lg:max-h-0 lg:group-hover:max-h-[1000px]"
                    }`}
                  >
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 pt-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
