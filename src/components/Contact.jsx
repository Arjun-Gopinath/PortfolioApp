import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-gray-950 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {t("contact.heading")}
      </h2>

      <p className="text-gray-400 text-base leading-relaxed text-center max-w-md mx-auto mb-10">
        {t("contact.description")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
        <a
          href="mailto:arjungopinath06@gmail.com?subject=Kudos%20on%20the%20Portfolio&body=Hi%20Arjun%2C%0A%0AI%20just%20checked%20out%20your%20portfolio%20and%20I%20really%20loved%20the%20work%20you've%20done!%0A%0AJust%20wanted%20to%20reach%20out%20and%20say%20keep%20up%20the%20great%20work!"
          className="flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 px-5 py-3 rounded-full text-white font-medium text-sm shadow"
          aria-label="Send an email to Arjun"
        >
          <FaEnvelope className="text-base" />
          {t("contact.email")}
        </a>

        <a
          href="https://www.linkedin.com/in/arjun-g-b3b57b1a1/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-3 rounded-full text-white font-medium text-sm shadow"
          aria-label="Connect on LinkedIn"
        >
          <FaLinkedin className="text-base" />
          {t("contact.linkedin")}
        </a>

        <a
          href="https://github.com/Arjun-Gopinath"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 px-5 py-3 rounded-full text-white font-medium text-sm shadow"
          aria-label="Visit GitHub Profile"
        >
          <FaGithub className="text-base" />
          {t("contact.github")}
        </a>

        <a
          href="/resume/arjun-gopinath-resume.pdf"
          download
          className="flex items-center justify-center gap-3 bg-sky-700 hover:bg-sky-800 transition-colors duration-200 px-5 py-3 rounded-full text-white font-medium text-sm shadow"
          aria-label="Download Arjun's resume"
        >
          <FaFileDownload className="text-base" />
          {t("contact.resume")}
        </a>
      </div>
    </section>
  );
};

export default Contact;
