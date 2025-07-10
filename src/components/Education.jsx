import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Education = () => {
  const { t } = useTranslation();
  const educationList = t("education.list", { returnObjects: true });

  return (
    <section
      id="education"
      className="py-20 bg-gray-900 text-white px-6 md:px-12"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-white">
        {t("education.heading")}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full md:bg-sky-300"></div>

        {educationList.map((edu, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
            >
              <div
                key={index}
                className={`w-full px-4 mb-10 ${
                  isLeft ? "md:pr-[55%]" : "md:pl-[55%]"
                }`}
              >
                <div
                  className={`relative backdrop-blur-md bg-white/5 border border-white/10 text-white p-6 rounded-xl shadow-md ${
                    isLeft
                      ? "md:ml-auto md:mr-0 md:before:right-[-8px]"
                      : "md:ml-0 md:mr-auto md:before:left-[-8px]"
                  }`}
                >
                  <h3 className="text-lg text-sky-200 font-bold">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-300">{edu.institution}</p>
                  <p className="text-sm text-gray-100">{edu.years}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
