import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900 to-gray-950 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        {t("contact.heading")}
      </h2>

      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-10 shadow-xl text-center space-y-6 border border-white/10">
        <p className="text-gray-300 text-lg leading-relaxed">
          {t("contact.description")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          {/* Email Button */}
          <a
            href="mailto:arjungopinath06@gmail.com?subject=Hey Arjun&body=I loved your portfolio!"
            className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 transition px-5 py-3 rounded-full text-white font-medium text-sm shadow"
            aria-label="Send an email to Arjun"
          >
            <FaEnvelope className="text-base" />
            {t("contact.email")}
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/arjun-g-b3b57b1a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-full text-white font-medium text-sm shadow"
            aria-label="Connect on LinkedIn"
          >
            <FaLinkedin className="text-base" />
            {t("contact.linkedin")}
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/Arjun-Gopinath"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition px-5 py-3 rounded-full text-white font-medium text-sm shadow"
            aria-label="Visit GitHub Profile"
          >
            <FaGithub className="text-base" />
            {t("contact.github")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
